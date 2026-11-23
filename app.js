/* AI Benar app: audit report, law selection, history and welcome. The navigator lives in navigator.js. */
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const { LAWS, DEFAULT } = globalThis.COMPLISCOPE_LAWS, R = globalThis.COMPLISCOPE_RULES;
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const GC = { A: "#16a34a", B: "#65a30d", C: "#ca8a04", D: "#ea580c", E: "#dc2626", F: "#991b1b" };
const ST = { fail: ["✕", "Problem"], warn: ["!", "Check"], info: ["i", "Note"], pass: ["✓", "Good"] };
const CAT = { privacy: "Privacy and cookies", ai: "AI Act", security: "Security", access: "Accessibility" };
function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("on"), 2400); }
async function getJ() { const { jurisdictions } = await chrome.storage.sync.get("jurisdictions"); return jurisdictions?.length ? jurisdictions : DEFAULT; }
async function getAudits() { const { audits = {} } = await chrome.storage.local.get("audits"); return audits; }
/* If Leaves Weave Boards address. Change this if you host If Leaves Weave somewhere else. */
const BOARDS_URL = "https://suhaimizainalshah.github.io/ifleavesweave/boards.html";
function download(name, text, type) { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }

/* ---------- router ---------- */
async function route() {
  const h = location.hash.slice(1) || "history", [view, arg] = h.split("=");
  $$("nav.tabs a").forEach(a => a.setAttribute("aria-current", a.dataset.v === view ? "page" : "false"));
  const v = $("#view"); v.innerHTML = "";
  if (view === "audit") return renderAudit(v, arg);
  if (view === "navigator") return globalThis.COMPLISCOPE_NAV.render(v);
  if (view === "laws") return renderLaws(v);
  if (view === "atlas") return renderAtlas(v, arg);
  if (view === "welcome") return renderWelcome(v);
  return renderHistory(v);
}
addEventListener("hashchange", route);

/* ---------- audit report ---------- */
let filter = "problems";
async function renderAudit(v, id) {
  const audits = await getAudits(); if (!id) id = Object.keys(audits).sort().pop();
  const d = audits[id];
  if (!d) { v.innerHTML = `<div class="empty card"><h1>No audit yet</h1><p class="muted">Open any website, click the AI Benar icon and choose “Audit this site”.</p></div>`; return; }
  const J = await getJ(), F = R.audit(d, J), S = R.score(F);
  const order = { fail: 0, warn: 1, info: 2, pass: 3 }, sev = { high: 0, medium: 1, low: 2 };
  F.sort((a, b) => order[a.status] - order[b.status] || sev[a.severity] - sev[b.severity]);
  const tp = Object.values(d.thirdParties || {});
  const count = (c, s) => F.filter(f => f.cat === c && f.status === s).length;
  v.innerHTML = `
  <section class="card hero">
    <div class="grade" style="background:${GC[S.grade]}" role="img" aria-label="Grade ${S.grade}, score ${S.score} out of 100"><div>${S.grade}<small>${S.score}/100</small></div></div>
    <div><h1>${esc(d.host)}</h1><div class="meta"><span>${esc((d.title || "").slice(0, 90))}</span><span>${new Date(d.id).toLocaleString()}</span><span>${d.mode === "first-visit" ? "Tested as a new visitor" : "Tested in your current session"}</span></div>
      <div class="lawbar"><span class="muted" style="font-size:13px">Checked against</span>${J.map(k => `<span class="lawchip">${esc(LAWS[k]?.short || k)}</span>`).join("")}<span class="lawchip">Security basics</span><a href="#laws" style="font-size:13px;font-weight:650">Change</a></div></div>
    <div class="actions"><button class="btn primary" id="retest" title="Clears this site’s cookies and storage, reloads it and audits again">Re-test as a new visitor</button><button class="btn" id="pdf">Save as PDF</button><button class="btn" id="json">JSON</button><button class="btn" id="csv">CSV</button><button class="btn" id="board" title="Open these findings as an action board in If Leaves Weave Boards">Make an action board</button></div>
  </section>
  ${d.mode !== "first-visit" ? `<p class="card noprint" style="margin-top:12px;padding:12px 16px;font-size:14px">For the most accurate consent results, use <b>Re-test as a new visitor</b>. It clears only this site’s cookies and storage in your browser, reloads the page, and checks what loads before any choice is made.</p>` : ""}
  <section class="sum">${Object.entries(CAT).map(([c, n]) => `<div class="card"><h3><span>${n}</span></h3><div class="pills">${count(c, "fail") ? `<span class="pill"><i class="bgfail"></i>${count(c, "fail")} problem${count(c, "fail") > 1 ? "s" : ""}</span>` : ""}${count(c, "warn") ? `<span class="pill"><i class="bgwarn"></i>${count(c, "warn")} to check</span>` : ""}${count(c, "pass") ? `<span class="pill"><i class="bgpass"></i>${count(c, "pass")} good</span>` : ""}${count(c, "info") ? `<span class="pill"><i class="bginfo"></i>${count(c, "info")} note${count(c, "info") > 1 ? "s" : ""}</span>` : ""}</div></div>`).join("")}</section>
  <div class="filters" role="toolbar" aria-label="Filter findings">${[["problems", "Problems and checks"], ["all", "Everything"], ["privacy", "Privacy"], ["ai", "AI Act"], ["security", "Security"], ["access", "Accessibility"], ["pass", "Passed"]].map(([k, l]) => `<button class="chip" data-f="${k}" aria-pressed="${filter === k}">${l}</button>`).join("")}</div>
  <section id="list"></section>
  <details class="card" style="margin-top:14px"><summary style="cursor:pointer;font-weight:700">Third parties seen (${tp.length}) and cookies (${(d.cookies || []).length})</summary>
    <div style="overflow:auto;margin-top:10px"><table style="width:100%;border-collapse:collapse;font-size:13.5px"><thead><tr style="text-align:left"><th style="padding:6px">Service</th><th style="padding:6px">Company</th><th style="padding:6px">Type</th><th style="padding:6px">Country</th><th style="padding:6px">Requests</th></tr></thead><tbody>${tp.sort((a, b) => (b.tracking - a.tracking) || b.count - a.count).map(t => `<tr style="border-top:1px solid var(--line)"><td style="padding:6px">${esc(t.name)}</td><td style="padding:6px">${esc(t.company || "Unknown")}</td><td style="padding:6px">${esc(t.cat)}</td><td style="padding:6px">${esc(t.country || "")}</td><td style="padding:6px">${t.count}</td></tr>`).join("")}</tbody></table>
    <p class="muted" style="font-size:13px">Cookies, with purposes from the Open Cookie Database where known (${d.cookieSource === "browser" ? "read by the browser" : "only cookies visible to page scripts"}): ${(d.cookies || []).map(c => esc(c.name) + (c.platform || c.purpose ? ` <span class="muted">(${esc([c.platform, c.purpose].filter(Boolean).join(", "))})</span>` : "")).join(", ") || "none"}</p></div></details>
  <p class="disc">AI Benar checks what any visitor’s browser receives, and re-requests the page once for its headers. It also fetches the site’s security.txt file and, for the secrets check, a few of the site’s own scripts — all of these requests go to the site being audited, and nothing is sent anywhere else. Results are indicative, not legal advice, and some issues can only be confirmed by people who run the site. Laws marked “check the official text” have newer or less settled section numbering.</p>`;
  const draw = () => {
    const list = F.filter(f => filter === "all" ? true : filter === "problems" ? f.status === "fail" || f.status === "warn" : filter === "pass" ? f.status === "pass" : f.cat === filter);
    $("#list").innerHTML = list.length ? list.map((f, i) => card(f, J, i < 3 && f.status === "fail")).join("") : `<p class="muted card">Nothing here. ${filter === "problems" ? "No problems found." : ""}</p>`;
  };
  draw();
  v.querySelector(".filters").onclick = e => { const b = e.target.closest("[data-f]"); if (!b) return; filter = b.dataset.f; v.querySelectorAll(".filters .chip").forEach(c => c.setAttribute("aria-pressed", c === b)); draw(); };
  $("#pdf").onclick = () => { $$(".find").forEach(x => (x.open = true)); setTimeout(() => print(), 50); };
  const rows = F.map(f => ({ category: CAT[f.cat], status: ST[f.status][1], severity: f.severity, finding: f.title, evidence: f.found.join(" | "), fix: f.fix || "", laws: R.refsFor(f, J).map(r => `${r.name}: ${r.refs.join("; ")}`).join(" || ") }));
  /* Action board: open the findings in If Leaves Weave Boards. The board travels in the link's "#" part,
     which browsers never send to a server, so the audit stays on this device. */
  $("#board").onclick = async () => {
    const today = new Date(), day = n => { const x = new Date(today); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); }, id = () => Math.random().toString(36).slice(2, 10);
    const cols = [["To fix", "#C2362B"], ["To check", "#B86E00"], ["In progress", "#2453D6"], ["Done", "#2F7D4F"]].map(([name, color]) => ({ id: id(), name, color }));
    const labels = Object.entries(CAT).map(([k, name], i) => ({ id: id(), key: k, name, color: ["#7A4FC2", "#2453D6", "#0E7C7B", "#B86E00"][i % 4] }));
    const cards = F.filter(f => f.status === "fail" || f.status === "warn").map(f => { const laws = R.refsFor(f, J).map(r => `${r.name}: ${r.refs.join("; ")}`);
      return { id: id(), col: cols[f.status === "fail" ? 0 : 1].id, title: f.title, owner: "", start: "", due: day(f.severity === "high" ? 14 : f.severity === "medium" ? 30 : 60), priority: f.severity === "high" ? (f.status === "fail" ? "urgent" : "high") : f.severity === "medium" ? "medium" : "low",
        labels: [labels.find(l => l.key === f.cat)?.id].filter(Boolean), created: Date.now(),
        desc: [`Site: ${d.url}`, f.found?.length ? `Evidence: ${f.found.join(" | ")}` : "", f.why ? `Why it matters: ${f.why}` : "", f.fix ? `How to fix: ${f.fix}` : "", laws.length ? `Laws: ${laws.join(" || ")}` : "", `From an AI Benar audit on ${new Date(d.id).toLocaleDateString()}. A guide, not legal advice.`].filter(Boolean).join("\n\n"),
        checklist: [{ id: id(), t: "Fix applied", done: false }, { id: id(), t: "Re-tested with AI Benar", done: false }] }; });
    if (!cards.length) return alert("No problems or checks to turn into a board.");
    const doc = { id: id(), type: "board", title: `Compliance actions: ${d.host}`, created: Date.now(), updated: Date.now(), data: { view: "kanban", columns: cols, cards, labels: labels.map(({ key, ...l }) => l), people: [] } };
    const json = new TextEncoder().encode(JSON.stringify({ kind: "ifleavesweave-doc", v: 1, from: "ai-benar", doc })), gz = new Uint8Array(await new Response(new Blob([json]).stream().pipeThrough(new CompressionStream("gzip"))).arrayBuffer());
    let bin = ""; for (let i = 0; i < gz.length; i += 8192) bin += String.fromCharCode(...gz.subarray(i, i + 8192));
    const b64 = btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    chrome.tabs.create({ url: `${BOARDS_URL}#import=${b64}` });
  };
  $("#json").onclick = () => download(`ai-benar-${d.host}-${new Date(d.id).toISOString().slice(0, 10)}.json`, JSON.stringify({ site: d.url, audited: new Date(d.id).toISOString(), mode: d.mode, grade: S.grade, score: S.score, jurisdictions: J, findings: rows, thirdParties: tp }, null, 2), "application/json");
  $("#csv").onclick = () => { const cols = Object.keys(rows[0]); download(`ai-benar-${d.host}.csv`, "\ufeff" + [cols, ...rows.map(r => cols.map(c => r[c]))].map(r => r.map(x => { const s = String(x); const q = /^[=+\-@]/.test(s) ? "'" + s : s; return /[",\n]/.test(q) ? `"${q.replace(/"/g, '""')}"` : q; }).join(",")).join("\r\n"), "text/csv"); };
  $("#retest").onclick = async () => {
    const origin = new URL(d.url).origin + "/*";
    let ok = await chrome.permissions.contains({ origins: [origin] }); if (!ok) ok = await chrome.permissions.request({ origins: [origin] });
    if (!ok) return toast("Permission is needed to clear and reload this site.");
    const b = $("#retest"); b.disabled = true; b.textContent = "Re-testing… (this can take up to 30 seconds)";
    let r; try { r = await chrome.runtime.sendMessage({ type: "retest", url: d.url, tabId: d.tabId }); } catch { r = { error: "Could not reach the background service. Try again in a moment." }; }
    if (r?.error) { toast(r.error); b.disabled = false; b.textContent = "Re-test as a new visitor"; return; }
    chrome.tabs.getCurrent(t => t && chrome.tabs.update(t.id, { active: true })); location.hash = "audit=" + r.id;
  };
}
function card(f, J, open) {
  const refs = R.refsFor(f, J), [icon, label] = ST[f.status];
  return `<details class="find" ${open ? "open" : ""}><summary><span class="st bg${f.status}" aria-label="${label}">${icon}</span><div><h3>${esc(f.title)}</h3><div class="sub">${CAT[f.cat]} · ${label}${f.confidence !== "high" ? ` · ${f.confidence} confidence` : ""}</div></div><span class="sev ${f.status === "pass" ? "pass" : f.severity === "high" ? "fail" : f.severity === "medium" ? "warn" : "muted"}">${f.status === "pass" ? "OK" : f.severity}</span></summary>
    <div class="fb">${f.found?.length ? `<div><h4>What we found</h4><ul>${f.found.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>` : ""}${f.why ? `<div><h4>Why it matters</h4><p style="margin:0">${esc(f.why)}</p></div>` : ""}${f.fix ? `<div><h4>How to fix it</h4><p style="margin:0">${esc(f.fix)}</p></div>` : ""}
    ${refs.length ? `<div><h4>${f.status === "pass" ? "Related rules" : "Which rules this may contravene"}</h4><div class="refs">${refs.map(r => `<div class="ref"><b>${esc(r.name)}</b>${r.verify ? ` <span class="vf">check the official text</span>` : ""}<ul>${r.refs.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div></div>` : ""}</div></details>`;
}

/* ---------- laws ---------- */
async function renderLaws(v) {
  const J = await getJ();
  v.innerHTML = `<h1>Which laws should AI Benar check?</h1><p class="muted" style="max-width:70ch">Choose the places where your organisation works or where the people you serve live. The EU GDPR and EU AI Act are on by default. Security basics are always checked. Every finding shows the matching sections for each law you choose.</p>
  <div class="grid2" style="margin-top:18px">${Object.entries(LAWS).map(([k, l]) => `<label class="lawcard"><input type="checkbox" value="${k}" ${J.includes(k) ? "checked" : ""}><span><b>${esc(l.name)}</b><small>${esc(l.region)}${l.verify ? " · section numbers to double-check" : ""}</small>${l.note ? `<small style="margin-top:4px">${esc(l.note)}</small>` : ""}</span></label>`).join("")}</div>
  <div style="display:flex;gap:8px;margin-top:18px"><button class="btn primary" id="saveLaws">Save</button><button class="btn" id="resetLaws">Back to GDPR and AI Act only</button></div>`;
  $("#saveLaws").onclick = async () => { const sel = $$(".lawcard input:checked").map(i => i.value); await chrome.storage.sync.set({ jurisdictions: sel.length ? sel : DEFAULT }); toast("Saved. Reports now show these laws."); let back = false; try { const ref = new URL(document.referrer); back = history.length > 1 && ref.pathname.endsWith("/app.html") && ref.origin === location.origin; } catch {} if (back) history.back(); };
  $("#resetLaws").onclick = async () => { await chrome.storage.sync.set({ jurisdictions: DEFAULT }); renderLaws(v); toast("Reset to GDPR and AI Act"); };
}

/* ---------- AI and data atlas ---------- */
const STATUS = { binding: "Binding AI law or rules", draft: "AI law in draft", guidance: "Guidance or policy only", patchwork: "Patchwork" };
const ATLAS_TO_LAW = { SG: "SG", MY: "MY", ID: "ID", VN: "VN", TH: "TH", PH: "PH", IN: "IN", PK: "PK", CN: "CN", US: "US_FED" };
let atlasRegion = "all";
async function renderAtlas(v, focus) {
  const { list, CHECKED } = globalThis.COMPLISCOPE_ATLAS, J = await getJ();
  const regions = ["all", ...new Set(list.map(c => c.region))];
  const typ = t => t.split(" ")[0].replace(/[^A-Za-z]/g, "");
  v.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:end;gap:12px;flex-wrap:wrap"><div><h1>AI and data security atlas</h1><p class="muted" style="margin:.3rem 0 0;max-width:72ch">How AI and data are regulated across ASEAN, South Asia, China and the United States: what’s binding, what’s voluntary, what’s coming, and what it means for your website and organisation. Last checked ${CHECKED}.</p></div><button class="btn noprint" id="atlasPdf">Save as PDF</button></div>
  <div class="filters noprint" role="toolbar" aria-label="Region">${regions.map(r => `<button class="chip" data-r="${esc(r)}" aria-pressed="${atlasRegion === r}">${r === "all" ? "All regions" : esc(r)}</button>`).join("")}</div>
  <h2 style="margin:6px 0 10px">At a glance</h2>
  <div style="overflow:auto"><table class="cmp"><thead><tr><th>Country</th><th>Status</th><th>AI law</th><th>AI content labels</th><th>Chatbot disclosure</th><th>Breach notice</th><th>DPO</th><th>Data localisation</th></tr></thead><tbody>
  ${list.filter(c => atlasRegion === "all" || c.region === atlasRegion).map(c => `<tr><td><a href="#atlas=${c.id}">${esc(c.name)}</a></td><td><span class="badge b-${c.status}">${STATUS[c.status]}</span></td><td>${esc(c.cmp.ai)}</td><td>${esc(c.cmp.labels)}</td><td>${esc(c.cmp.chatbot)}</td><td>${esc(c.cmp.breach)}</td><td>${esc(c.cmp.dpo)}</td><td>${esc(c.cmp.local)}</td></tr>`).join("")}
  </tbody></table></div>
  <p class="muted" style="font-size:13px">EU and UK rules are in <a href="#laws">Laws</a>. “Binding” means legally enforceable now; “Draft” means proposed and may change; “Voluntary” and “Policy” are guidance and strategy.</p>
  <h2 style="margin:18px 0 10px">Country by country</h2>
  ${list.filter(c => atlasRegion === "all" || c.region === atlasRegion).map(c => { const lk = ATLAS_TO_LAW[c.id], on = lk && J.includes(lk);
    return `<details class="country" id="c-${c.id}" ${focus === c.id ? "open" : ""}><summary><div><h3>${esc(c.name)}</h3><span class="muted" style="font-size:13px">${esc(c.region)}</span></div><span class="badge b-${c.status}">${esc(c.statusText)}</span></summary><div class="cbody">
      <p style="margin:0">${esc(c.summary)}</p>
      ${c.timeline ? `<div><h4 style="margin:0 0 6px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)">Timeline</h4><div class="tl">${c.timeline.map(([d, t]) => `<div><b>${esc(d)}</b>${esc(t)}</div>`).join("")}</div></div>` : ""}
      <div><h4 style="margin:0 0 6px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)">AI rules</h4><div class="inst">${c.ai.map(x => `<div><span class="typ t-${typ(x.type)}">${esc(x.type)}</span><b>${esc(x.name)} <span class="muted" style="font-weight:500;font-size:12.5px">· ${esc(x.date)}</span></b><small>${esc(x.what)}</small></div>`).join("")}</div></div>
      <div><h4 style="margin:0 0 6px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)">Data protection and security</h4><div class="inst">${c.data.map(x => `<div><span class="typ t-${typ(x.type)}">${esc(x.type)}</span><b>${esc(x.name)} <span class="muted" style="font-weight:500;font-size:12.5px">· ${esc(x.date)}</span></b><small>${esc(x.what)}</small></div>`).join("")}</div></div>
      <div><h4 style="margin:0 0 6px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)">What it means for your website and organisation</h4><ul style="margin:0;padding-left:18px">${c.website.map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center" class="noprint">${lk ? `<button class="btn ${on ? "" : "primary"}" data-use="${lk}">${on ? "Included in website audits" : "Check this country in website audits"}</button>` : ""}${c.sources.map(([l, u]) => `<a class="btn" href="${esc(u)}" target="_blank" rel="noopener">${esc(l)} ↗</a>`).join("")}</div>
    </div></details>`; }).join("")}
  <p class="disc">This atlas summarises laws and guidance as of ${CHECKED}, from official sources and reputable legal summaries. It is not legal advice. Laws in draft can change, and many details sit in implementing regulations: always check the official text for decisions that matter.</p>`;
  v.querySelector(".filters").onclick = e => { const b = e.target.closest("[data-r]"); if (!b) return; atlasRegion = b.dataset.r; renderAtlas(v); };
  v.querySelectorAll("[data-use]").forEach(b => (b.onclick = async () => { const J2 = await getJ(); if (!J2.includes(b.dataset.use)) { await chrome.storage.sync.set({ jurisdictions: [...J2, b.dataset.use] }); toast("Added to website audits"); renderAtlas(v, focus); } }));
  $("#atlasPdf").onclick = () => { v.querySelectorAll(".country").forEach(d => (d.open = true)); setTimeout(() => print(), 50); };
  if (focus) setTimeout(() => document.getElementById("c-" + focus)?.scrollIntoView({ block: "start" }), 50);
}

/* ---------- history and welcome ---------- */
async function renderHistory(v) {
  const audits = Object.values(await getAudits()).sort((a, b) => b.id - a.id);
  if (!audits.length) return renderWelcome(v);
  v.innerHTML = `<h1>Past audits</h1><p class="muted">Stored only on this device. The last 25 are kept.</p><div class="hist" style="margin-top:14px">${audits.map(d => { const S = R.score(R.audit(d)); return `<a href="#audit=${d.id}"><span class="g" style="background:${GC[S.grade]}">${S.grade}</span><span><b>${esc(d.host)}</b><br><span class="muted" style="font-size:13px">${esc((d.title || "").slice(0, 80))}</span></span><span class="muted" style="font-size:13px">${d.mode === "first-visit" ? "New visitor" : "Current session"}</span><span class="muted" style="font-size:13px">${new Date(d.id).toLocaleDateString()}</span></a>`; }).join("")}</div>
  <button class="btn" id="clearAll" style="margin-top:14px">Delete all audits</button>`;
  $("#clearAll").onclick = async () => { if (!confirm("Delete all saved audits?")) return; await chrome.storage.local.set({ audits: {} }); route(); };
}
function renderWelcome(v) {
  v.innerHTML = `<section class="welcome"><div><h1>Check any website for privacy, AI Act and security issues</h1><p class="muted" style="font-size:1.08rem;margin-top:10px">AI Benar looks at what a website does in your browser: cookies and trackers, consent banners, AI chatbots, forms, security settings and exposed keys. It shows which sections of which laws may be at stake, and how to fix them.</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px"><a class="btn primary" href="#navigator">Start the readiness navigator</a><a class="btn" href="#atlas">Explore the AI and data atlas</a><a class="btn" href="#laws">Choose your laws</a></div></div>
    <div class="card"><b>Built for small teams</b><p class="muted" style="margin:.4rem 0 0">Schools, charities, NGOs and non-profits across different countries can check their own websites and get a plain-language plan in the Readiness navigator.</p></div></section>
  <section class="steps"><div class="card"><b>1. Open a website</b><p class="muted" style="margin:.3rem 0 0">Your own site, or one you’re assessing, such as a supplier or partner.</p></div><div class="card"><b>2. Click “Audit this site”</b><p class="muted" style="margin:.3rem 0 0">Then “Re-test as a new visitor” to check what loads before consent.</p></div><div class="card"><b>3. Fix and share</b><p class="muted" style="margin:.3rem 0 0">Each finding says why it matters and what to do. Save the report as a PDF for your board or IT provider.</p></div></section>
  <p style="margin-top:20px">Need a hand acting on this? <a href="https://suhaimizainalshah.github.io/AI-Benar-Advisory/" target="_blank" rel="noopener">AI Benar Advisory</a> offers independent AI compliance and governance support.</p>
  <p class="disc">AI Benar checks what any visitor’s browser sees, and re-requests the page once for its headers. It never probes servers or tests for break-ins, and it sends nothing anywhere except the site being audited. For deeper testing, get written permission from the site owner and use a qualified professional. Not legal advice.</p>`;
}
route();
