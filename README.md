# AI Benar

**A passive privacy, EU AI Act and security checker for any website, plus a readiness navigator for schools, charities, NGOs and non-profits.**

AI Benar looks at what a website does in your browser, explains problems in plain language, shows **which sections of which laws** each problem may contravene, and says how to fix it. Everything runs on your device.

Made by [AI Benar Advisory](https://suhaimizainalshah.github.io/AI-Benar-Advisory/) — independent AI compliance and governance support for the EU, Vietnam, South Korea and ASEAN.

## What it checks

### Privacy and cookies
- Tracking, advertising and session-recording tools that load **before consent**, and tracking cookies already set.
- Consent banners: missing banner, **no Reject button on the first screen**, Reject much smaller than Accept, pre-ticked options.
- Missing privacy notice link, no way to contact you about privacy.
- Personal details (such as email addresses) leaking to third parties in web addresses.
- Data sent to companies in other countries, Google Fonts loaded from Google, embedded videos and maps before consent.
- Forms asking for sensitive data (national ID, health, religion), pre-ticked marketing boxes, forms without a privacy link, forms sending data to another company.
- Advertising or session tracking on sites used by children; Global Privacy Control; California “Do Not Sell or Share”.

### EU AI Act
- AI chat assistants that don’t say they’re AI (**Article 50(1)**, in force since 2 August 2026).
- AI services called directly from visitors’ browsers (usually exposed keys).
- Signs of **high-risk** uses in education, employment or essential services (Annex III, duties from 2 December 2027).
- Signs of **banned** uses, such as emotion recognition of students or staff (Article 5(1)(f), banned since 2 February 2025).
- Biometrics, missing AI statements, and labelling of AI-generated media.

### Security basics
HTTPS, insecure files on secure pages, six recommended security headers, server version disclosure, cookie security flags, outdated JavaScript libraries with known CVEs (from the retire.js vulnerability repository), **secret keys published in page code** (masked), scripts without integrity checks, insecure forms, and a security.txt contact.

### Accessibility
Runs **axe-core**, the open-source accessibility engine, on the page and reports barriers that can be found automatically against **WCAG 2.x A and AA** (such as missing image descriptions, unlabelled form fields, buttons without names and low contrast), with the success criterion for each. Findings map to the **European Accessibility Act** (Directive (EU) 2019/882, applying to many consumer services since 28 June 2025), the **Web Accessibility Directive**, the **UK Equality Act 2010** and public sector accessibility regulations, and the **ADA** in the United States. Automated checks find only some problems, so AI Benar also recommends testing with a keyboard, a screen reader and real users.

### Turn findings into an action board
**Make an action board** opens the problems as a board in **If Leaves Weave Boards**: each problem becomes a card in *To fix* or *To check*, with a priority, a due date (14 days for high, 30 for medium), the evidence, the fix, the relevant laws and a short checklist. The board travels in the link’s “#” part, which browsers never send to a server, and If Leaves Weave saves it on your device and removes it from the address bar. Change `BOARDS_URL` in `app.js` if you host If Leaves Weave elsewhere.

### Laws you can choose
EU GDPR and ePrivacy and the EU AI Act are **on by default**. You can add: UK GDPR, DPA 2018 and PECR; Singapore PDPA and AI frameworks; Malaysia PDPA; Indonesia PDP Law; Vietnam PDP Law and AI Law; Thailand PDPA; Philippines Data Privacy Act; India DPDP Act and IT Rules; Pakistan PECA and National AI Policy; China PIPL and AI rules; Australia Privacy Act; California CCPA/CPRA; US federal and other states; Brazil LGPD; South Africa POPIA; Kenya Data Protection Act; Nigeria Data Protection Act. Each finding lists the matching sections for every law you choose. Laws with newer or less settled numbering are marked “check the official text”.

### Re-test as a new visitor
Clears only that site’s cookies and storage in your browser, reloads it, and audits again, so you can see exactly what loads before a visitor makes any choice.

### Reports
Grade (A to F) and score, findings grouped by Privacy, AI Act and Security, filters, a third-party and cookie list, and export to **PDF**, JSON or CSV.

## AI and data security atlas
A detailed, dated guide (last checked 21 November 2026) to how AI and data are regulated in **ASEAN, Singapore, Malaysia, Indonesia, Vietnam, Thailand, the Philippines, India, Pakistan, China, South Korea and the United States**:
- an at-a-glance comparison: AI law status, AI content labelling, chatbot disclosure, breach notification deadlines, DPO requirements and data localisation;
- for each country, a timeline, the AI rules and the data protection and security rules, each marked **Binding**, **Voluntary**, **Draft** or **Policy**, with what they require;
- what each country’s rules mean for your website and organisation, links to official sources, and one click to include that country in website audits.

Highlights: Vietnam’s binding AI Law (in force 1 March 2026), China’s mandatory AI content labels (since 1 September 2025), India’s binding rules on labelling synthetic content (since 20 February 2026) and phased DPDP Act (core duties from 14 May 2027), Malaysia’s draft AI Governance Bill and 72-hour breach notification, Indonesia’s and Thailand’s draft AI rules, Singapore’s agentic AI framework, Pakistan’s National AI Policy (with no data protection law yet), and the US federal and state patchwork.

## Readiness navigator
A plain-language plan for schools, charities, NGOs and non-profits working across countries. Answer a few questions about where you work, who you serve, the data you handle and how you use AI, and get:
- the laws that probably apply (including the GDPR’s reach outside the EU);
- each AI use classified under the EU AI Act (banned, high-risk, transparency or minimal) with what to do;
- an action plan with legal references and progress tracking;
- starter templates: an AI use policy, chatbot disclosure, AI image label, photo and story consent wording, and data breach first steps;
- export to PDF or JSON.

## What AI Benar will not do
It only makes **passive** checks: it reads what any visitor’s browser receives. It never probes servers, submits forms, guesses passwords or tests for break-ins. Testing a site’s defences needs the owner’s written permission and a qualified professional. Results are indicative and **not legal advice**.

## Install for testing
1. Open `chrome://extensions` and turn on **Developer mode**.
2. Click **Load unpacked** and choose this folder.
3. Pin AI Benar, open a website and click **Audit this site**.

Works in Chrome 116 or later and other Chromium browsers. Shortcuts: **Alt+Shift+K** opens AI Benar, **Alt+Shift+U** audits the current site.

## Publish on the Chrome Web Store
Zip the extension files into `ai-benar-extension.zip` and upload it, copy the text from `store/STORE_LISTING.md`, add the screenshots in `store/`, and use `https://github.com/suhaimizainalshah/ai-benar/blob/main/PRIVACY.md` as the privacy policy URL.

## Files
```
manifest.json   Manifest V3 settings
background.js   runs audits, reads cookies, re-tests as a new visitor, stores results
collect.js      passive page collector
trackers.js     known third parties (analytics, ads, session recording, chat, AI, consent tools)
rules.js        findings, severity, fixes and scoring
laws.js         law catalogue: sections by topic for each jurisdiction
atlas.js        AI and data security atlas (dated country profiles)
app.html/js     report, laws, history and welcome
navigator.js    readiness navigator
popup.html/js   toolbar panel
```

## Licence
MIT. Corrections to the law catalogue are especially welcome.

## Open-source data and libraries
- **axe-core** 4.14.1 (Mozilla Public License 2.0): `vendor/axe.min.js`, licence in `vendor/LICENSE-axe-core.txt`.
- **retire.js vulnerability repository** (Apache License 2.0): known vulnerabilities for the JavaScript libraries AI Benar detects, extracted into `vendor/vulns.js`, licence in `vendor/LICENSE-retire.txt`.
- **Open Cookie Database** (Apache License 2.0): cookie names, purposes and platforms in `vendor/cookies.js`, licence in `vendor/LICENSE-open-cookie-database.txt`.
