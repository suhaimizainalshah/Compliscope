/* Compliscope service worker: runs passive audits, stores them on this device, and re-tests a
   site as a first-time visitor (clearing only that site's data, with your permission). */
function probe() {
  const libs = [], add = (n, v) => { if (v) libs.push({ name: n, version: String(v) }); };
  try { if (window.jQuery?.fn) add("jQuery", jQuery.fn.jquery); if (window.jQuery?.ui) add("jQuery UI", jQuery.ui.version); } catch {}
  try { const b = window.bootstrap; add("Bootstrap", b?.Tooltip?.VERSION || window.jQuery?.fn?.tooltip?.Constructor?.VERSION); } catch {}
  try { if (window.angular?.version) add("AngularJS", angular.version.full); } catch {}
  try { if (window._?.VERSION) add(typeof window._.flatMapDeep === "function" ? "Lodash" : "Underscore", window._.VERSION); } catch {}
  try { add("Moment.js", window.moment?.version); add("Handlebars", window.Handlebars?.VERSION); add("DOMPurify", window.DOMPurify?.version); add("React", window.React?.version); add("Vue", window.Vue?.version); } catch {}
  // "drift" on its own is a generic word (animation classes, a site's own
  // "drift" variable); only Drift's chat API object counts. The other
  // globals (Intercom, zE, tidioChatApi, $crisp, Tawk_API,
  // HubSpotConversations) are vendor-specific names.
  const drift = window.drift;
  const driftApi = drift && ["identify", "page", "track", "config"].some(m => typeof drift[m] === "function") ? drift : null;
  return { libs, tcf: typeof window.__tcfapi === "function", gpp: typeof window.__gpp === "function",
    chatGlobals: [["Intercom", window.Intercom], ["Drift", driftApi], ["Zendesk", window.zE], ["Tidio", window.tidioChatApi], ["Crisp", window.$crisp], ["tawk.to", window.Tawk_API], ["HubSpot Chat", window.HubSpotConversations]].filter(x => x[1]).map(x => x[0]) };
}
const URL_LIBS = [[/jquery[.-](\d+\.\d+\.\d+)/i, "jQuery"], [/jquery@(\d+\.\d+\.\d+)/i, "jQuery"], [/jquery-ui[.-](\d+\.\d+\.\d+)/i, "jQuery UI"], [/bootstrap[@/.-](\d+\.\d+\.\d+)/i, "Bootstrap"], [/angular(?:js)?[@/.-](1\.\d+\.\d+)/i, "AngularJS"], [/lodash[@/.-](\d+\.\d+\.\d+)/i, "Lodash"], [/moment[@/.-](\d+\.\d+\.\d+)/i, "Moment.js"], [/handlebars[@/.-](\d+\.\d+\.\d+)/i, "Handlebars"], [/underscore[@/.-](\d+\.\d+\.\d+)/i, "Underscore"]];
let lastId = 0;
async function audit(tab, mode = "current") {
  if (!/^https?:/.test(tab?.url || "")) throw new Error("Compliscope can only audit websites (http or https pages).");
  const [{ result: data }] = await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["trackers.js", "collect.js"] });
  if (!data) throw new Error("The page didn’t respond. Reload it and try again.");
  try { const [{ result: p }] = await chrome.scripting.executeScript({ target: { tabId: tab.id }, world: "MAIN", func: probe }); data.libs = p.libs; data.tcf = p.tcf; data.gpp = p.gpp; if (p.chatGlobals.length) data.chat = [...new Set([...(data.chat || []).filter(c => c !== "Chat widget"), ...p.chatGlobals])]; } catch { data.libs = []; }
  for (const r of data.resources) for (const [re, name] of URL_LIBS) { const m = r.url.match(re); if (m && !data.libs.some(l => l.name === name)) data.libs.push({ name, version: m[1], fromUrl: true }); }
  try { data.cookies = (await chrome.cookies.getAll({ url: tab.url })).map(c => ({ name: c.name, domain: c.domain, secure: c.secure, httpOnly: c.httpOnly, sameSite: c.sameSite, session: c.session, expires: c.expirationDate || 0 })); data.cookieSource = "browser"; }
  catch { data.cookies = (data.cookiesJs || []).map(n => ({ name: n, domain: data.host, secure: null, httpOnly: null, sameSite: "unspecified", session: false })); data.cookieSource = "page"; }
  data.resources = data.resources.slice(0, 600); data.mode = mode; data.tabId = tab.id; data.id = Math.max(Date.now(), lastId + 1); lastId = data.id;
  const { audits = {} } = await chrome.storage.local.get("audits"); audits[data.id] = data;
  const keys = Object.keys(audits).sort(); keys.slice(0, Math.max(0, keys.length - 25)).forEach(k => delete audits[k]);
  try { await chrome.storage.local.set({ audits }); }
  catch { const k2 = Object.keys(audits).sort(); k2.slice(0, Math.max(0, k2.length - 10)).forEach(k => delete audits[k]); await chrome.storage.local.set({ audits }); }
  return data.id;
}
const waitLoad = tabId => new Promise(res => { const f = (id, info) => { if (id === tabId && info.status === "complete") { chrome.tabs.onUpdated.removeListener(f); setTimeout(res, 4000); } }; chrome.tabs.onUpdated.addListener(f); setTimeout(() => { chrome.tabs.onUpdated.removeListener(f); res(); }, 30000); });
async function retest(url, tabId) {
  const origin = new URL(url).origin;
  await chrome.browsingData.remove({ origins: [origin] }, { cookies: true, localStorage: true, indexedDB: true, cacheStorage: true, serviceWorkers: true, cache: true });
  let tab = tabId != null ? await chrome.tabs.get(tabId).catch(() => null) : null;
  if (tab && new URL(tab.url).origin === origin) { await chrome.tabs.update(tab.id, { url, active: true }); }
  else tab = await chrome.tabs.create({ url, active: true });
  await waitLoad(tab.id); tab = await chrome.tabs.get(tab.id);
  return audit(tab, "first-visit");
}
chrome.runtime.onMessage.addListener((m, _s, reply) => {
  if (m.type === "audit") { (async () => { try { const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); reply({ id: await audit(tab) }); } catch (e) { reply({ error: e.message }); } })(); return true; }
  if (m.type === "retest") { retest(m.url, m.tabId).then(id => reply({ id })).catch(e => reply({ error: e.message })); return true; }
});
chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  const { jurisdictions } = await chrome.storage.sync.get("jurisdictions"); if (!jurisdictions) chrome.storage.sync.set({ jurisdictions: ["EU_GDPR", "EU_AIACT"] });
  chrome.contextMenus.removeAll(() => { chrome.contextMenus.create({ id: "audit", title: "Audit this site with Compliscope", contexts: ["page"] }); });
  if (reason === "install") chrome.tabs.create({ url: "app.html#welcome" });
});
chrome.contextMenus.onClicked.addListener(async (_i, tab) => { try { const id = await audit(tab); chrome.tabs.create({ url: `app.html#audit=${id}`, index: tab.index + 1 }); } catch {} });
chrome.commands?.onCommand.addListener(async cmd => { if (cmd !== "audit-site") return; const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); try { const id = await audit(tab); chrome.tabs.create({ url: `app.html#audit=${id}`, index: tab.index + 1 }); } catch {} });
