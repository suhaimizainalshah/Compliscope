/* Compliscope collector. Reads only what this page already exposes to any visitor: its content,
   the resources it has loaded, its own response headers, its readable cookies and its public
   security.txt file. It does not probe, submit forms, or attack anything. */
(async () => {
  const TR = globalThis.COMPLISCOPE_TRACKERS;
  const here = location.hostname.replace(/^www\./, "");
  const sameSite = h => { const a = h.replace(/^www\./, "").split("."), b = here.split("."); return a.slice(-2).join(".") === b.slice(-2).join("."); };
  const vis = e => { if (!e) return false; const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 4 && r.height > 4 && cs.visibility !== "hidden" && cs.display !== "none" && +cs.opacity > .05; };
  const txt = e => (e?.innerText || e?.textContent || "").replace(/\s+/g, " ").trim();
  const abs = u => { try { return new URL(u, location.href).href; } catch { return ""; } };
  const hostOf = u => { try { return new URL(u).hostname; } catch { return ""; } };
  const D = { url: location.href, origin: location.origin, host: location.hostname, https: location.protocol === "https:", title: document.title, lang: document.documentElement.lang || "", time: Date.now(), gpc: !!navigator.globalPrivacyControl };

  /* resources the page has loaded (names only) */
  const entries = performance.getEntriesByType("resource").map(e => ({ url: e.name, type: e.initiatorType }));
  document.querySelectorAll("script[src],iframe[src],img[src],link[href][rel~=stylesheet],video[src],source[src],embed[src]").forEach(e => entries.push({ url: abs(e.getAttribute("src") || e.getAttribute("href")), type: e.tagName.toLowerCase() }));
  const seen = new Set(); D.resources = entries.filter(r => r.url && /^https?:/.test(r.url) && !seen.has(r.url) && seen.add(r.url)).slice(0, 1500);
  D.thirdParties = {}; for (const r of D.resources) { const h = hostOf(r.url); if (!h || sameSite(h)) continue; const m = TR.match(r.url); const key = m ? m.name : h; (D.thirdParties[key] ||= { host: h, ...(m || { name: h, company: "", cat: "unknown", country: "", tracking: false }), count: 0, sample: r.url }).count++; }

  /* consent banner */
  const ACCEPT = /\b(accept|agree|allow( all)?|i agree|got it|ok(ay)?|continue|understand|yes,? i|setuju|terima|akzeptieren|accepter|aceptar|aceitar|accetta|zustimmen|alle akzeptieren)\b/i;
  const REJECT = /\b(reject|decline|deny|refuse|disagree|no,? thanks|necessary only|only necessary|essential only|only essential|strictly necessary only|do not accept|don.?t accept|continue without|tolak|ablehnen|refuser|rechazar|rejeitar|rifiuta|nur notwendige)\b/i;
  const SETTINGS = /\b(settings|preferences|manage|customi[sz]e|options|choices|more info|learn more|details|einstellungen|paramètres|configurar|personali[sz]za)\b/i;
  const COOKIE_WORDS = /\b(cookies?|consent|tracking|personal data|privacy|gdpr|pdpa|datenschutz|kuki|persetujuan)\b/i;
  const cands = [...document.querySelectorAll("body *")].filter(e => {
    if (e.children.length > 80) return false; const s = (e.id + " " + e.className).toString();
    const cs = getComputedStyle(e); const floaty = cs.position === "fixed" || cs.position === "sticky" || e.getAttribute("role") === "dialog" || e.getAttribute("aria-modal") === "true" || e.tagName === "DIALOG";
    return (floaty || /cookie|consent|gdpr|cmp|onetrust|cookiebot|usercentrics|didomi|privacy-banner|cc-window|cky-|cmplz/i.test(s)) && vis(e) && COOKIE_WORDS.test(txt(e).slice(0, 1500)) && txt(e).length < 4000;
  });
  let banner = cands.sort((a, b) => txt(a).length - txt(b).length).find(e => e.querySelector("button,a,[role=button],input[type=button],input[type=submit]"));
  if (banner) { let p = banner; while (p.parentElement && p.parentElement !== document.body && txt(p.parentElement).length < 4000 && vis(p.parentElement) && p.parentElement.querySelectorAll("button,a").length < 25) p = p.parentElement; banner = p; }
  const html = document.documentElement.outerHTML.slice(0, 400000) + [...document.scripts].map(s => s.src).join(" ");
  const cmp = TR.CMP.find(([re]) => re.test(html))?.[1] || Object.values(D.thirdParties).find(t => t.cat === "consent")?.name || "";
  if (banner) {
    const btns = [...banner.querySelectorAll("button,a,[role=button],input[type=button],input[type=submit]")].filter(vis).map(b => ({ label: (txt(b) || b.value || b.getAttribute("aria-label") || "").slice(0, 60), rect: b.getBoundingClientRect() }));
    const acc = btns.filter(b => ACCEPT.test(b.label) && !REJECT.test(b.label)), rej = btns.filter(b => REJECT.test(b.label)), set = btns.filter(b => SETTINGS.test(b.label));
    const pre = [...banner.querySelectorAll("input[type=checkbox],[role=switch][aria-checked=true],[role=checkbox][aria-checked=true]")].filter(c => (c.checked || c.getAttribute("aria-checked") === "true") && !c.disabled && !/necessary|essential|required|strictly/i.test(txt(c.closest("label,li,div")) || ""));
    const area = r => r.width * r.height;
    D.banner = { present: true, visible: vis(banner), cmp, text: txt(banner).slice(0, 500), buttons: btns.map(b => b.label).filter(Boolean).slice(0, 12), hasAccept: acc.length > 0, hasReject: rej.length > 0, hasSettings: set.length > 0, prechecked: pre.length,
      rejectSmaller: acc.length && rej.length ? area(rej[0].rect) < area(acc[0].rect) * .6 : false };
  } else D.banner = { present: !!cmp, visible: false, cmp, text: "", buttons: [], hasAccept: false, hasReject: false, hasSettings: false, prechecked: 0 };

  /* links and contact */
  const links = [...document.querySelectorAll("a[href]")].map(a => ({ text: txt(a).slice(0, 80), href: abs(a.getAttribute("href")) }));
  const L = re => links.filter(l => re.test(l.text) || re.test(l.href)).slice(0, 5);
  D.privacyLinks = L(/privacy|data protection|privasi|datenschutz|confidentialit|privacidad|privacidade|privacy notice/i);
  D.cookieLinks = L(/cookie/i); D.termsLinks = L(/terms|conditions|syarat/i); D.aiLinks = L(/\b(ai|artificial intelligence)\b.*(policy|statement|use|transparen)|responsible ai|use of ai/i);
  D.doNotSell = L(/do not sell|do not share|your privacy choices|opt.?out of (sale|sharing)/i).length > 0;
  const bodyText = (document.body?.innerText || "").slice(0, 400000);
  D.emails = [...new Set([...(bodyText.match(/[\w.+-]+@[\w-]+\.[\w.-]{2,}/g) || []), ...links.filter(l => l.href.startsWith("mailto:")).map(l => l.href.slice(7).split("?")[0])])].slice(0, 20);
  D.dpoMention = /data protection officer|\bdpo\b|privacy officer|information officer|pegawai perlindungan data|encarregado/i.test(bodyText);
  D.contactLinks = L(/contact|hubungi|kontak/i);

  /* forms */
  const SENS = [[/nric|\bfin\b|national id|identity (card|number)|\bic (no|number)|mykad|\bnik\b|aadhaar|passport|social security|\bssn\b|tax (id|number)/i, "national ID or passport number"], [/date.?of.?birth|\bdob\b|birth.?date/i, "date of birth"], [/health|medical|diagnos|disab|allerg|medication/i, "health information"], [/religio|faith|ethnic|race|caste/i, "religion or ethnicity"], [/sexual|gender identity/i, "sexual orientation or gender identity"], [/salary|income|bank account|iban|card number|cvv/i, "financial details"]];
  D.forms = [...document.querySelectorAll("form")].filter(vis).slice(0, 20).map(f => {
    const fields = [...f.querySelectorAll("input,select,textarea")].filter(i => i.type !== "hidden" && i.type !== "submit" && i.type !== "button").map(i => { const lab = (i.labels?.[0] ? txt(i.labels[0]) : "") || i.getAttribute("aria-label") || i.placeholder || ""; return { name: i.name || i.id || "", type: i.type || i.tagName.toLowerCase(), label: lab.slice(0, 60), auto: i.autocomplete || "" }; });
    const action = abs(f.getAttribute("action") || location.href), ah = hostOf(action);
    const sensitive = [...new Set(fields.flatMap(x => SENS.filter(([re]) => re.test(x.name + " " + x.label)).map(s => s[1])))];
    const personal = fields.some(x => /email|e-mail|phone|mobile|name|address|postcode|zip/i.test(x.name + " " + x.label + " " + x.type + " " + x.auto));
    const consentBox = !!f.querySelector("input[type=checkbox]"), preTicked = [...f.querySelectorAll("input[type=checkbox]")].some(c => c.checked && /newsletter|market|offers|updates|promot|subscribe|email me/i.test(txt(c.closest("label,div,p")) || c.name));
    return { action, method: (f.method || "get").toLowerCase(), insecure: action.startsWith("http:") || !D.https, thirdParty: ah && !sameSite(ah) ? ah : "", fields: fields.slice(0, 30), password: fields.some(x => x.type === "password"), sensitive, personal, consentBox, preTicked, nearPrivacyLink: !!f.querySelector("a[href*=privacy i]") || /privacy/i.test(txt(f)) };
  });

  /* mixed content, script integrity, embeds */
  D.mixed = D.https ? D.resources.filter(r => r.url.startsWith("http:")).map(r => r.url).slice(0, 30) : [];
  D.noSri = [...document.querySelectorAll("script[src]")].map(s => ({ src: abs(s.getAttribute("src")), sri: s.hasAttribute("integrity") })).filter(s => s.src && !sameSite(hostOf(s.src)) && !s.sri).map(s => s.src).slice(0, 40);
  D.googleFonts = D.resources.some(r => /fonts\.(googleapis|gstatic)\.com/.test(r.url));
  D.ytNoCookie = D.resources.some(r => /youtube-nocookie\.com/.test(r.url));

  /* personal data sent to third parties in addresses */
  D.piiInUrls = [];
  for (const r of D.resources) { const h = hostOf(r.url); if (!h || sameSite(h)) continue; let u; try { u = new URL(r.url); } catch { continue; } const q = decodeURIComponent(u.search + u.hash);
    if (/[\w.+-]+@[\w-]+\.[a-z]{2,}/i.test(q) || [...u.searchParams.keys()].some(k => /^(e?mail|email_address|phone|tel|first_?name|last_?name|fullname|ic|nric|dob)$/i.test(k))) D.piiInUrls.push({ host: h, sample: r.url.replace(/([\w.+-]+)@([\w-]+\.[a-z.]{2,})/gi, "•••@$2").slice(0, 160) }); if (D.piiInUrls.length > 10) break; }

  /* response headers and security.txt (same-site, public) */
  D.headers = {}; D.headerError = "";
  try { let r = await fetch(location.href, { method: "HEAD", credentials: "include", cache: "no-store" }); if (!r.ok && r.status !== 304) r = await fetch(location.href, { credentials: "include", cache: "no-store" }); r.headers.forEach((v, k) => (D.headers[k] = v)); D.status = r.status; } catch (e) { D.headerError = String(e.message || e); }
  try { const r = await fetch(location.origin + "/.well-known/security.txt", { cache: "no-store", credentials: "omit", redirect: "follow" }); const t = r.ok ? (await r.text()).slice(0, 4000) : ""; D.securityTxt = r.ok && /^contact:/im.test(t); } catch { D.securityTxt = false; }

  /* secrets accidentally published in the page's own scripts */
  const SECRET = [[/\bAKIA[0-9A-Z]{16}\b/g, "AWS access key"], [/\bAIza[0-9A-Za-z_\-]{35}\b/g, "Google API key"], [/\bsk-ant-[A-Za-z0-9_\-]{20,}/g, "Anthropic API key"], [/\bsk-(?:proj-)?(?!ant-)[A-Za-z0-9_\-]{32,}/g, "OpenAI-style secret key"], [/\b(?:sk|rk)_live_[0-9a-zA-Z]{20,}\b/g, "Stripe secret key"], [/\bgh[pousr]_[A-Za-z0-9]{30,}\b/g, "GitHub token"], [/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g, "Slack token"], [/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/g, "Private key"]];
  const mask = s => s.length > 12 ? s.slice(0, 6) + "•••" + s.slice(-2) : s.slice(0, 3) + "•••";
  const sources = [...document.querySelectorAll("script:not([src])")].map((s, i) => ({ where: `inline script ${i + 1}`, text: s.textContent.slice(0, 600000) }));
  const own = [...document.querySelectorAll("script[src]")].map(s => abs(s.getAttribute("src"))).filter(u => u && sameSite(hostOf(u))).slice(0, 12);
  for (const u of own) { try { const r = await fetch(u, { cache: "force-cache" }); if (r.ok) sources.push({ where: u.replace(location.origin, ""), text: (await r.text()).slice(0, 1500000) }); } catch {} }
  D.secrets = []; for (const s of sources) for (const [re, kind] of SECRET) { re.lastIndex = 0; let m; while ((m = re.exec(s.text)) && D.secrets.length < 12) D.secrets.push({ kind, masked: mask(m[0]), where: s.where.slice(0, 80) }); }
  D.scriptsScanned = sources.length;

  /* AI: chat widgets, disclosures, client-side AI calls, sensitive uses */
  const tp = Object.values(D.thirdParties);
  D.chat = tp.filter(t => t.cat === "chat").map(t => t.name);
  const chatEls = [...document.querySelectorAll("iframe,div,section,aside,button")].filter(e => /chat|bot|assistant|messenger|intercom|drift|zendesk|tidio|crisp|tawk|livechat/i.test((e.id + " " + e.className + " " + (e.title || "") + " " + (e.getAttribute("aria-label") || "")).toString()) && vis(e)).slice(0, 10);
  if (chatEls.length && !D.chat.length) D.chat.push("Chat widget");
  const chatText = chatEls.map(e => (e.tagName === "IFRAME" ? e.title || "" : txt(e)) + " " + (e.getAttribute("aria-label") || "")).join(" ").slice(0, 3000);
  D.chatCrossOrigin = chatEls.some(e => e.tagName === "IFRAME" && hostOf(e.src) && !sameSite(hostOf(e.src)));
  const AIWORD = /\b(ai|a\.i\.|artificial intelligence|chat ?bot|bot|virtual assistant|ai assistant|automated assistant|ai-powered|powered by ai|generative|gpt|llm|kecerdasan buatan|ki-assistent|asistente virtual)\b/i;
  D.chatDisclosed = AIWORD.test(chatText);
  D.aiCalls = tp.filter(t => t.cat === "ai").map(t => t.name);
  D.aiMentions = (bodyText.match(/\b(artificial intelligence|ai-generated|generated (by|with) ai|ai-powered|machine learning|chatbot)\b/gi) || []).length;
  const sentences = bodyText.split(/(?<=[.!?])\s+|\n+/).filter(s => s.length > 20 && s.length < 400).slice(0, 4000);
  const AI_IN = /\b(ai|artificial intelligence|automated|algorithm|machine learning|predictive|scoring model|chatgpt|gpt)\b/i;
  const AREAS = [["education", /\b(admission|admissions|applicants?|students?|exams?|grading|marking|assessment|proctor\w*|enrol\w*|learning outcomes)\b/i], ["employment", /\b(recruit\w*|hiring|job applications?|candidates?|cvs?|résumés?|resumes?|interview|volunteer applications?|shortlist\w*)\b/i], ["essential services", /\b(loans?|credit|eligibility|benefits?|welfare|grant applications?|insurance|housing allocation)\b/i]];
  D.highRisk = []; for (const [area, re] of AREAS) { const hit = sentences.find(s => AI_IN.test(s) && re.test(s)); if (hit) D.highRisk.push({ area, evidence: hit.slice(0, 220) }); }
  D.prohibited = sentences.filter(s => /\b(emotion (recognition|detection|analysis|ai)|detect\w* (the )?emotions?|facial expression analysis|mood detection)\b/i.test(s) && /\b(students?|pupils?|employees?|staff|workers?|classroom|workplace)\b/i.test(s)).slice(0, 2).map(s => s.slice(0, 220));
  D.biometric = sentences.filter(s => /\b(facial recognition|face recognition|biometric)\b/i.test(s)).slice(0, 2).map(s => s.slice(0, 220));
  D.children = /\b(school|students|pupils|kids|children|child|parents?|kindergarten|preschool|nursery|primary|secondary|under 1[3-8]|youth|sekolah|anak|murid)\b/i.test(document.title + " " + bodyText.slice(0, 20000)) ? (bodyText.slice(0, 20000).match(/\b(school|students|pupils|kids|children|parents|kindergarten|preschool|youth)\b/gi) || []).length : 0;
  D.aiImagesLabelled = /\b(ai-generated|generated (with|by) ai|image (created|made) (with|using) ai|synthetic (image|media))\b/i.test(bodyText);
  D.charity = /\b(charity|non-?profit|not-for-profit|ngo|foundation|donat\w+|volunteer|registered charity|social enterprise|yayasan)\b/i.test(document.title + " " + bodyText.slice(0, 15000));
  D.cookiesJs = document.cookie ? document.cookie.split(";").map(c => c.split("=")[0].trim()).filter(Boolean) : [];
  return D;
})();
