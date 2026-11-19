const $ = s => document.querySelector(s), { LAWS } = globalThis.COMPLISCOPE_LAWS;
const GC = { A: "#16a34a", B: "#65a30d", C: "#ca8a04", D: "#ea580c", E: "#dc2626", F: "#991b1b" };
const open = h => { chrome.tabs.create({ url: "app.html" + h }); window.close(); };
(async () => {
  $("#ver").textContent = "v" + chrome.runtime.getManifest().version;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let host = ""; try { host = new URL(tab.url).hostname; } catch {}
  const ok = /^https?:/.test(tab?.url || "");
  $("#site").innerHTML = ok ? `<b>${host.replace(/</g, "")}</b><br>${(tab.title || "").replace(/</g, "").slice(0, 80)}` : "<b>Open a website to audit it</b><br>Chrome pages and the Web Store can’t be audited.";
  $("#audit").disabled = !ok;
  const { jurisdictions = ["EU_GDPR", "EU_AIACT"] } = await chrome.storage.sync.get("jurisdictions");
  $("#laws").innerHTML = jurisdictions.map(k => `<span class="chip">${LAWS[k]?.short || k}</span>`).join(" ") + ` <span class="chip">Security</span>`;
  const { audits = {} } = await chrome.storage.local.get("audits");
  const recent = Object.values(audits).sort((a, b) => b.id - a.id).slice(0, 4);
  if (recent.length) { $("#histSec").hidden = false; const R = globalThis.COMPLISCOPE_RULES;
    $("#hist").innerHTML = recent.map(a => { const g = R.score(R.audit(a)).grade; return `<button data-id="${a.id}"><span class="g" style="background:${GC[g]}">${g}</span><span>${a.host.replace(/</g, "")}</span><small>${new Date(a.id).toLocaleDateString()}</small></button>`; }).join("");
    $("#hist").onclick = e => { const b = e.target.closest("button"); if (b) open("#audit=" + b.dataset.id); }; }
})();
$("#audit").onclick = async () => {
  $("#audit").disabled = true; $("#audit").textContent = "Auditing…"; $("#err").hidden = true;
  const r = await chrome.runtime.sendMessage({ type: "audit" });
  if (r?.error) { $("#err").hidden = false; $("#err").textContent = r.error; $("#audit").disabled = false; $("#audit").textContent = "Audit this site"; return; }
  open("#audit=" + r.id);
};
$("#change").onclick = () => open("#laws"); $("#nav").onclick = () => open("#navigator"); $("#history").onclick = () => open("#history"); $("#atlas").onclick = () => open("#atlas");
