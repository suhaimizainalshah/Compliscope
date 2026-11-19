/* Compliscope atlas: AI governance and data security rules by country.
   Last checked: 19 November 2026. Laws change quickly; always check the official sources listed.
   type: Binding (law in force), Voluntary (guidance), Draft (proposed), Policy (strategy, not law). */
(() => {
  const CHECKED = "19 November 2026";
  const A = [
    {
      id: "ASEAN", name: "ASEAN (regional)", region: "Southeast Asia", status: "guidance", statusText: "Voluntary regional guidance",
      summary: "ASEAN has no binding regional AI or data law. Its guides set a shared, voluntary baseline that member states build on, so they’re a useful common reference for organisations working across Southeast Asia.",
      ai: [
        { name: "ASEAN Guide on AI Governance and Ethics", type: "Voluntary", date: "Feb 2024", what: "Seven guiding principles and a risk-based framework for organisations designing, developing and deploying traditional AI." },
        { name: "Expanded ASEAN Guide on AI Governance and Ethics: Generative AI", type: "Voluntary", date: "2025", what: "Extends the guide to generative AI across nine dimensions, including accountability, data, incident reporting, testing, security, content provenance and AI for public good." },
      ],
      data: [
        { name: "ASEAN Framework on Personal Data Protection", type: "Voluntary", date: "2016", what: "Common data protection principles for member states." },
        { name: "ASEAN Model Contractual Clauses for Cross-Border Data Flows", type: "Voluntary", date: "2021", what: "Template contract terms for moving personal data between ASEAN countries." },
        { name: "ASEAN Data Management Framework", type: "Voluntary", date: "2021", what: "Guidance on classifying data and applying proportionate protections." },
      ],
      cmp: { ai: "Voluntary guides", labels: "Recommended (provenance)", chatbot: "Recommended", breach: "Set nationally", dpo: "Set nationally", local: "Set nationally" },
      website: ["Use the ASEAN guides as a common baseline when you work in several member states, then add each country’s binding rules.", "For cross-border data transfers, the ASEAN Model Contractual Clauses are a practical starting point."],
      sources: [["ASEAN Guide on AI Governance and Ethics", "https://asean.org/book/asean-guide-on-ai-governance-and-ethics/"]],
    },
    {
      id: "SG", name: "Singapore", region: "Southeast Asia", status: "guidance", statusText: "No AI statute; detailed voluntary frameworks plus binding data, online-safety and election rules",
      summary: "Singapore governs AI through layered voluntary frameworks and testing tools, while binding duties come from the PDPA, cybersecurity, online-safety and election laws.",
      timeline: [["Jan 2020", "Model AI Governance Framework, 2nd edition"], ["May 2024", "Model AI Governance Framework for Generative AI"], ["Oct 2024", "CSA Guidelines on Securing AI Systems"], ["22 Jan 2026", "Model AI Governance Framework for Agentic AI (v1.5, May 2026)"], ["29 Jun 2026", "Online Safety (Relief and Accountability) Act partly in force; Online Safety Commission opens"]],
      ai: [
        { name: "Model AI Governance Framework (2nd edition)", type: "Voluntary", date: "2020", what: "Practical guidance on internal governance, human involvement, operations and stakeholder communication for AI." },
        { name: "Model AI Governance Framework for Generative AI", type: "Voluntary", date: "May 2024", what: "Nine dimensions for trustworthy generative AI, including content provenance and incident reporting." },
        { name: "Model AI Governance Framework for Agentic AI", type: "Voluntary", date: "Jan 2026, v1.5 May 2026", what: "For AI agents that plan and act: bound agent permissions, keep humans accountable with approval checkpoints before consequential actions, test and monitor." },
        { name: "AI Verify and Project Moonshot", type: "Voluntary", date: "2022 onwards", what: "Open-source testing tools to check AI systems against governance principles and test language models." },
        { name: "PDPC Advisory Guidelines on personal data in AI recommendation and decision systems", type: "Voluntary", date: "Mar 2024", what: "How the PDPA’s consent, notification and accountability duties apply when personal data is used to build or run AI systems." },
        { name: "Online Safety (Relief and Accountability) Act", type: "Binding", date: "Partly in force 29 Jun 2026", what: "Creates an Online Safety Commission that can act on online harms such as intimate image abuse, including deepfakes." },
        { name: "Elections (Integrity of Online Advertising) (Amendment) Act", type: "Binding", date: "2024", what: "Bans digitally manipulated content, including deepfakes, that realistically depicts election candidates saying or doing things they didn’t." },
      ],
      data: [
        { name: "Personal Data Protection Act 2012 (PDPA)", type: "Binding", date: "In force", what: "Consent, notification, purpose limitation, protection and transfer obligations; every organisation must appoint a DPO." },
        { name: "PDPA data breach notification (Part 6A)", type: "Binding", date: "In force", what: "Notify the PDPC within 3 calendar days of assessing that a breach is notifiable, and tell affected people where there’s significant harm." },
        { name: "Cybersecurity Act 2018 (amended 2024)", type: "Binding", date: "Amended May 2024", what: "Duties for owners of critical information infrastructure, with wider incident reporting, including supply-chain incidents." },
        { name: "CSA Cyber Essentials and Cyber Trust marks", type: "Voluntary", date: "In force", what: "Certification schemes that suit small organisations and charities wanting to show good cyber hygiene." },
      ],
      cmp: { ai: "Voluntary frameworks", labels: "Elections and online-safety rules", chatbot: "Recommended", breach: "3 calendar days (PDPC)", dpo: "Always required", local: "No general rule" },
      website: ["Appoint a DPO and publish their business contact details (PDPA s11).", "Don’t collect full NRIC numbers unless required by law or truly necessary.", "If you use AI agents, set clear limits on what they can do and require human approval before consequential actions.", "Never publish deepfakes of election candidates during elections."],
      sources: [["IMDA: AI governance frameworks", "https://www.imda.gov.sg/"], ["PDPC", "https://www.pdpc.gov.sg/"], ["Cyber Security Agency", "https://www.csa.gov.sg/"]],
    },
    {
      id: "MY", name: "Malaysia", region: "Southeast Asia", status: "draft", statusText: "No AI law yet; AI Governance Bill in draft",
      summary: "Malaysia has voluntary AI guidelines and a draft AI Governance Bill, but strong binding data rules after the 2024 PDPA amendments, plus a Cyber Security Act.",
      timeline: [["26 Jun 2024", "Cyber Security Act 2024 gazetted"], ["20 Sep 2024", "National Guidelines on AI Governance and Ethics (AIGE)"], ["1 Jun 2025", "PDPA amendments on DPOs and breach notification in operation"], ["30 Apr 2026", "PDP guidelines on DPIAs and automated decisions and profiling"], ["Jul 2026", "National AI Action Plan 2026–2030; AI Governance Bill consultation"], ["Sep 2026", "Draft AI Governance Bill submitted to Cabinet; tabling hoped for early 2027"]],
      ai: [
        { name: "National Guidelines on AI Governance and Ethics (AIGE)", type: "Voluntary", date: "Sep 2024", what: "Seven principles: fairness; reliability, safety and control; privacy and security; inclusiveness; transparency; accountability; and human benefit." },
        { name: "AI Governance Bill", type: "Draft", date: "Draft submitted to Cabinet Sep 2026", what: "Proposed binding AI framework. Not law yet." },
        { name: "PDP guidelines on automated decision-making and profiling, and on DPIAs", type: "Binding guidance under PDPA", date: "Apr 2026", what: "AI-driven features are treated as a high-risk factor for data protection impact assessments." },
      ],
      data: [
        { name: "Personal Data Protection Act 2010, amended 2024", type: "Binding", date: "Phased to Jun 2025", what: "Seven data protection principles, now with mandatory DPOs, breach notification, data portability and security duties on processors." },
        { name: "Breach notification (s12B)", type: "Binding", date: "Jun 2025", what: "Notify the Commissioner as soon as practicable and within 72 hours where there’s significant harm or more than 1,000 people affected; tell affected people within 7 days of that notice." },
        { name: "Cyber Security Act 2024 (Act 854)", type: "Binding", date: "2024", what: "Duties for national critical information infrastructure, including risk assessments, audits and incident reporting." },
      ],
      cmp: { ai: "Draft bill", labels: "Not yet required", chatbot: "Recommended (AIGE)", breach: "72 hours (where thresholds met)", dpo: "Required above thresholds", local: "Transfer rules (s129)" },
      website: ["Check whether you must appoint a DPO under the PDP guidelines.", "Prepare a 72-hour breach routine, including for incidents at AI and cloud vendors.", "Screen AI and profiling projects against the 2026 DPIA and automated decision-making guidelines."],
      sources: [["PDP Commissioner", "https://www.pdp.gov.my/"], ["National AI Office", "https://ai.gov.my/"]],
    },
    {
      id: "ID", name: "Indonesia", region: "Southeast Asia", status: "draft", statusText: "AI presidential regulations drafted, awaiting signature",
      summary: "Indonesia relies on AI ethics guidance and its Personal Data Protection Law, with two presidential regulations, on AI ethics and a 2026–2029 national AI roadmap, drafted and awaiting the President’s signature.",
      timeline: [["Dec 2023", "Ministerial circular on AI ethics"], ["17 Oct 2024", "Personal Data Protection Law fully in force"], ["Aug 2025", "National AI Roadmap white paper consultation"], ["Jul 2026", "Drafts of AI Ethics and AI Roadmap presidential regulations completed and submitted"], ["2026", "Presidential regulation on a Personal Data Protection Authority being finalised"]],
      ai: [
        { name: "Circular on AI ethics (Kominfo, now Komdigi)", type: "Voluntary", date: "Dec 2023", what: "Ethical values for AI providers and users: inclusivity, humanity, security, transparency, accountability and more." },
        { name: "Presidential Regulation on AI Ethics", type: "Draft", date: "Awaiting signature", what: "Would make AI ethics principles binding at presidential-regulation level, with a risk-based approach." },
        { name: "Presidential Regulation on the National AI Roadmap 2026–2029", type: "Draft", date: "Awaiting signature", what: "Strategic direction, programmes and a national AI coordination task force." },
      ],
      data: [
        { name: "Personal Data Protection Law (Law 27/2022, UU PDP)", type: "Binding", date: "Fully in force Oct 2024", what: "GDPR-style rights and duties, specific (sensitive) personal data, DPO duties, cross-border transfer rules and heavy sanctions." },
        { name: "Breach notification (UU PDP)", type: "Binding", date: "In force", what: "Notify affected people and the authority within 3 x 24 hours of a personal data protection failure." },
        { name: "Electronic Information and Transactions Law (amended 2024) and GR 71/2019", type: "Binding", date: "In force", what: "Duties for electronic system operators, including registration and security." },
      ],
      cmp: { ai: "Draft regulations", labels: "Expected", chatbot: "Recommended", breach: "3 x 24 hours", dpo: "Required in some cases", local: "Some sectors" },
      website: ["Treat specific (sensitive) data such as health, biometrics and children’s data with extra care.", "Prepare to notify within 3 x 24 hours if personal data is compromised.", "Watch for the AI Ethics presidential regulation, which would make ethics principles binding."],
      sources: [["Komdigi", "https://www.komdigi.go.id/"]],
    },
    {
      id: "VN", name: "Vietnam", region: "Southeast Asia", status: "binding", statusText: "Binding AI law in force since 1 March 2026",
      summary: "Vietnam has Southeast Asia’s first comprehensive, binding AI law, alongside a new Personal Data Protection Law and a Data Law, all enforced mainly by the Ministry of Public Security.",
      timeline: [["1 Jul 2025", "Data Law (Law 60/2024) in force"], ["1 Jan 2026", "Personal Data Protection Law (Law 91/2025) and Decree 356/2025 in force; Law on Digital Technology Industry in force"], ["1 Mar 2026", "Law on Artificial Intelligence (Law 134/2025) in force"], ["Mar 2027", "Grace period ends for existing AI systems in most fields (12 months)"], ["Sep 2027", "Grace period ends for existing AI in healthcare, education and finance (18 months)"]],
      ai: [
        { name: "Law on Artificial Intelligence (No. 134/2025/QH15)", type: "Binding", date: "In force 1 Mar 2026", what: "Three risk tiers; human oversight of important decisions; transparency rules for AI-generated content and deepfakes; foreign providers of some high-risk systems need a local presence or representative; regulatory sandbox." },
        { name: "Grace periods for existing AI systems", type: "Binding", date: "To Mar 2027 / Sep 2027", what: "AI already operating before 1 March 2026 may continue for 12 months, or 18 months in healthcare, education and finance, while it’s brought into line." },
        { name: "Implementing decrees", type: "Draft", date: "Ongoing", what: "Much of the operational detail is set by decrees still being issued. Check the latest." },
      ],
      data: [
        { name: "Personal Data Protection Law (No. 91/2025/QH15) and Decree 356/2025", type: "Binding", date: "In force 1 Jan 2026", what: "Rights to be informed, consent and access; impact assessments; stricter cross-border transfer procedures; DPO duties. Small businesses and start-ups get a 5-year grace period for some duties unless they handle sensitive data or large volumes." },
        { name: "Data Law (No. 60/2024/QH15)", type: "Binding", date: "In force 1 Jul 2025", what: "Rules for core and important data, data classification and cross-border data." },
        { name: "Cybersecurity law framework", type: "Binding", date: "In force", what: "Cybersecurity duties and data localisation requirements for some online services." },
      ],
      cmp: { ai: "Binding law in force", labels: "Required", chatbot: "Required", breach: "Required (see Decree 356)", dpo: "Required (grace for small firms)", local: "Yes, for some data" },
      website: ["Label AI-generated content, and make sure people know when they’re dealing with AI.", "Check whether your AI use is high-risk, and whether you need a local representative as a foreign provider.", "Prepare impact assessments for personal data processing and cross-border transfers, and appoint a DPO unless exempt."],
      sources: [["Law on AI (Government legal portal)", "https://vanban.chinhphu.vn/"], ["Ministry of Public Security", "https://bocongan.gov.vn/"]],
    },
    {
      id: "TH", name: "Thailand", region: "Southeast Asia", status: "draft", statusText: "Draft AI Act after public hearing; moving towards Cabinet",
      summary: "Thailand has no AI law in force. A full draft AI Act went to public hearing in July–August 2026, while the PDPA and Cybersecurity Act already apply.",
      timeline: [["Jun 2022", "PDPA fully in force"], ["Jun 2025", "Draft principles of an AI law put to public hearing"], ["Jun 2026", "ETDA AI governance guideline for executives"], ["Jul 2026", "Full draft AI Act released for public hearing"], ["14 Aug 2026", "Hearing closed; draft heads towards Cabinet and Parliament"]],
      ai: [
        { name: "Draft Artificial Intelligence Act (ETDA)", type: "Draft", date: "Hearing closed 14 Aug 2026", what: "Risk tiers (prohibited and high-risk, with high-risk sectors set by royal decree), duties for providers and deployers including overseas providers, content-marking and transparency for deepfakes and chatbots, serious-incident duties, and fines of up to THB 5 million in the draft." },
        { name: "AI governance guideline for executives (ETDA)", type: "Voluntary", date: "Jun 2026", what: "Turns Thailand’s AI ethics principles into practical steps for leaders deploying AI." },
        { name: "National AI Strategy and Action Plan", type: "Policy", date: "2022", what: "National direction for AI development." },
      ],
      data: [
        { name: "Personal Data Protection Act B.E. 2562 (2019)", type: "Binding", date: "In force Jun 2022", what: "Consent, notice, sensitive data rules, DPO duties and cross-border transfer rules." },
        { name: "Breach notification (PDPA s37(4))", type: "Binding", date: "In force", what: "Notify the PDPC within 72 hours of becoming aware, unless the breach is unlikely to risk people’s rights." },
        { name: "Cybersecurity Act B.E. 2562 (2019)", type: "Binding", date: "In force", what: "Duties for critical information infrastructure and powers to respond to cyber threats." },
      ],
      cmp: { ai: "Draft act", labels: "Proposed", chatbot: "Proposed", breach: "72 hours", dpo: "Required in some cases", local: "Transfer rules" },
      website: ["Get ready for AI labelling and chatbot disclosure, which the draft AI Act proposes.", "Check whether you need a DPO under the PDPA and keep a 72-hour breach plan."],
      sources: [["ETDA", "https://www.etda.or.th/"], ["PDPC Thailand", "https://www.pdpc.or.th/"]],
    },
    {
      id: "PH", name: "Philippines", region: "Southeast Asia", status: "draft", statusText: "AI bills in Congress; data privacy guidance applies to AI",
      summary: "The Philippines has a national AI roadmap and AI bills pending in Congress. The Data Privacy Act and the regulator’s guidance already apply to AI that uses personal data.",
      timeline: [["2012", "Data Privacy Act and Cybercrime Prevention Act"], ["2024", "National AI Strategy Roadmap 2.0"], ["Dec 2024", "NPC advisory on applying the Data Privacy Act to AI systems"], ["2026", "Consolidated AI bill pending in Congress"]],
      ai: [
        { name: "National AI Strategy Roadmap 2.0", type: "Policy", date: "2024", what: "National direction for AI adoption and research." },
        { name: "NPC advisory on AI systems processing personal data", type: "Voluntary", date: "Dec 2024", what: "How the Data Privacy Act’s transparency, accountability and fairness duties apply to AI." },
        { name: "AI bills (consolidated)", type: "Draft", date: "Pending in Congress", what: "Proposed AI development and regulation framework. Not law yet." },
      ],
      data: [
        { name: "Data Privacy Act 2012 (RA 10173)", type: "Binding", date: "In force", what: "Lawful processing, sensitive personal information, rights of data subjects and security duties." },
        { name: "Breach notification (NPC Circular 16-03)", type: "Binding", date: "In force", what: "Notify the NPC and affected people within 72 hours of knowing about a breach involving sensitive data that’s likely to cause harm." },
        { name: "Cybercrime Prevention Act 2012 (RA 10175)", type: "Binding", date: "In force", what: "Offences for illegal access, interception, data interference and more." },
      ],
      cmp: { ai: "Bills pending", labels: "Not yet required", chatbot: "Recommended (NPC)", breach: "72 hours", dpo: "Required (register with NPC)", local: "No general rule" },
      website: ["Designate a data protection officer and register with the NPC where required.", "Apply the NPC’s AI advisory: explain AI use, avoid unfair outcomes and keep humans accountable."],
      sources: [["National Privacy Commission", "https://privacy.gov.ph/"]],
    },
    {
      id: "IN", name: "India", region: "South Asia", status: "patchwork", statusText: "No AI Act; binding deepfake labelling rules and a phased data law",
      summary: "India has chosen not to pass a standalone AI Act for now. It governs AI through guidelines, binding IT Rules on synthetic content, and the DPDP Act, whose core duties start in May 2027.",
      timeline: [["Apr 2022", "CERT-In directions: report cyber incidents within 6 hours"], ["Aug 2023", "DPDP Act passed"], ["5 Nov 2025", "India AI Governance Guidelines released"], ["14 Nov 2025", "DPDP Rules notified; phased commencement"], ["20 Feb 2026", "IT Rules amendment on synthetically generated information in force"], ["Nov 2026", "Consent Manager phase begins"], ["14 May 2027", "Core DPDP duties apply"]],
      ai: [
        { name: "India AI Governance Guidelines (MeitY)", type: "Voluntary", date: "5 Nov 2025", what: "Seven principles (‘sutras’), proposed institutions such as an AI Governance Group and an AI Safety Institute, and reliance on existing laws rather than a standalone AI Act." },
        { name: "IT (Intermediary Guidelines) Amendment Rules, 2026", type: "Binding", date: "In force 20 Feb 2026", what: "Defines synthetically generated information; platforms that enable it must label it prominently and attach metadata; very short removal deadlines for unlawful deepfakes." },
        { name: "Further amendment on continuous labels and provenance", type: "Draft", date: "Consulted Mar–May 2026", what: "Proposed stronger, continuous labelling and permanent provenance metadata." },
      ],
      data: [
        { name: "Digital Personal Data Protection Act 2023 and DPDP Rules 2025", type: "Binding (phased)", date: "Core duties from 14 May 2027", what: "Notice and consent, security safeguards, breach notification, children’s data (verifiable parental consent, no tracking or targeted ads at children) and a Data Protection Board." },
        { name: "CERT-In Directions (IT Act s70B)", type: "Binding", date: "Apr 2022", what: "Report specified cyber incidents to CERT-In within 6 hours and keep logs for 180 days." },
        { name: "Information Technology Act 2000", type: "Binding", date: "In force", what: "Cyber offences and duties for intermediaries." },
      ],
      cmp: { ai: "No AI Act; binding IT Rules", labels: "Required for platforms", chatbot: "Recommended", breach: "6 hours to CERT-In (cyber incidents)", dpo: "Significant fiduciaries", local: "Some sectors" },
      website: ["If your platform lets people create or share AI images, audio or video, label it and keep provenance metadata.", "Report qualifying cyber incidents to CERT-In within 6 hours.", "Prepare for DPDP: plain-language notices, consent records, and no tracking of children."],
      sources: [["MeitY", "https://www.meity.gov.in/"], ["CERT-In", "https://www.cert-in.org.in/"]],
    },
    {
      id: "PK", name: "Pakistan", region: "South Asia", status: "guidance", statusText: "National AI Policy only; no data protection law yet",
      summary: "Pakistan approved a National AI Policy in July 2025, but it isn’t binding, and the Personal Data Protection Bill hasn’t been passed. Cybercrime law is the main binding framework.",
      timeline: [["Aug 2016", "Prevention of Electronic Crimes Act (PECA)"], ["Jan 2025", "PECA amendment passed"], ["Jul 2025", "National AI Policy 2025 approved by Cabinet"], ["2026", "Personal Data Protection Bill still pending"]],
      ai: [
        { name: "National Artificial Intelligence Policy 2025", type: "Policy", date: "Approved Jul 2025", what: "Six-pillar roadmap with a National AI Fund, Centres of Excellence, regulatory sandboxes and risk guidance for high-risk uses. Not binding." },
      ],
      data: [
        { name: "Personal Data Protection Bill", type: "Draft", date: "Pending", what: "Would create a National Commission for Personal Data Protection and GDPR-style duties. Not law yet." },
        { name: "Prevention of Electronic Crimes Act 2016, amended 2025", type: "Binding", date: "In force", what: "Criminal offences for unauthorised access, data interference and some disclosures of personal data; investigated by the National Cyber Crime Investigation Agency." },
      ],
      cmp: { ai: "Policy only", labels: "Not required", chatbot: "Not required", breach: "No general duty", dpo: "Not required", local: "Some sectors" },
      website: ["With no data protection law, follow international good practice (such as GDPR principles), especially if you serve people in other countries.", "Watch the Personal Data Protection Bill, which the AI policy relies on."],
      sources: [["Ministry of IT and Telecommunication", "https://moitt.gov.pk/"]],
    },
    {
      id: "CN", name: "China", region: "East Asia", status: "binding", statusText: "Targeted binding AI rules, including mandatory AI content labels",
      summary: "China has no single AI law but a dense set of binding rules: on algorithms, deep synthesis, generative AI and, since September 2025, mandatory labelling of AI-generated content. The amended Cybersecurity Law adds AI provisions and higher fines.",
      timeline: [["1 Mar 2022", "Algorithmic recommendation provisions"], ["10 Jan 2023", "Deep synthesis provisions"], ["15 Aug 2023", "Interim Measures for Generative AI Services"], ["1 Jan 2025", "Network Data Security Management Regulations"], ["1 Sep 2025", "AI content labelling measures and standard GB 45438-2025"], ["1 Jan 2026", "Amended Cybersecurity Law in force"]],
      ai: [
        { name: "Measures for Labelling AI-Generated and Synthetic Content", type: "Binding", date: "In force 1 Sep 2025", what: "Visible labels on AI-generated text, images, audio, video and virtual scenes, plus hidden metadata labels; platforms must check and show labels; users must declare AI content when publishing." },
        { name: "GB 45438-2025 labelling standard", type: "Binding (mandatory standard)", date: "1 Sep 2025", what: "Technical method for explicit and implicit AI content labels." },
        { name: "Interim Measures for Generative AI Services", type: "Binding", date: "15 Aug 2023", what: "Content, training-data and security duties for public-facing generative AI services." },
        { name: "Deep synthesis and algorithmic recommendation provisions", type: "Binding", date: "2022–2023", what: "Rules for deepfakes and recommendation algorithms, including algorithm filing." },
        { name: "Amended Cybersecurity Law", type: "Binding", date: "1 Jan 2026", what: "Adds AI governance provisions and higher fines." },
      ],
      data: [
        { name: "Personal Information Protection Law (PIPL)", type: "Binding", date: "Nov 2021", what: "Consent and separate consent for sensitive data, impact assessments, and strict cross-border transfer mechanisms." },
        { name: "Data Security Law", type: "Binding", date: "Sep 2021", what: "Data classification, with stricter rules for important and core data." },
        { name: "Network Data Security Management Regulations", type: "Binding", date: "1 Jan 2025", what: "Detailed network data security duties, including incident reporting." },
      ],
      cmp: { ai: "Targeted binding rules", labels: "Required (visible and metadata)", chatbot: "Required for some services", breach: "Required (prompt reporting)", dpo: "Required above thresholds", local: "Yes, for important data and some operators" },
      website: ["If your content reaches people in mainland China, label AI-generated text, images, audio and video, visibly and in metadata.", "Check cross-border transfer rules before moving personal information out of China."],
      sources: [["Cyberspace Administration of China", "https://www.cac.gov.cn/"]],
    },
    {
      id: "US", name: "United States", region: "Americas", status: "patchwork", statusText: "No federal AI Act; federal policy plus a growing state patchwork",
      summary: "There’s no comprehensive federal AI law. Federal policy favours light regulation and is challenging state AI laws, but several state laws are in force and federal agencies still enforce existing laws against harmful AI practices.",
      timeline: [["May 2025", "TAKE IT DOWN Act (federal) on non-consensual intimate imagery, including deepfakes"], ["11 Dec 2025", "Executive Order 14365 targets state AI laws through a DOJ litigation task force"], ["1 Jan 2026", "Texas TRAIGA, California SB 53 and AB 2013, and Illinois HB 3773 in force"], ["14 May 2026", "Colorado repeals and replaces its AI Act with SB 26-189"], ["1 Jan 2027", "Colorado automated decision-making law and California ADMT ‘significant decision’ duties begin"]],
      ai: [
        { name: "Executive Order 14365 and federal AI policy", type: "Policy", date: "Dec 2025 onwards", what: "Seeks a national framework and challenges state AI laws in court. An executive order doesn’t itself override state laws." },
        { name: "TAKE IT DOWN Act", type: "Binding (federal)", date: "May 2025", what: "Criminalises publishing non-consensual intimate images, including AI deepfakes, and requires platforms to remove them quickly on request." },
        { name: "FTC Act Section 5", type: "Binding (federal)", date: "In force", what: "The FTC acts against deceptive AI claims and unfair AI practices." },
        { name: "Texas Responsible AI Governance Act (TRAIGA)", type: "Binding (state)", date: "1 Jan 2026", what: "Bans AI developed or used with intent to cause listed harms, plus disclosure duties for government and health-care AI." },
        { name: "California SB 53 and AB 2013", type: "Binding (state)", date: "1 Jan 2026", what: "Frontier model developers must publish safety frameworks and report incidents (SB 53); generative AI developers must disclose training-data information (AB 2013)." },
        { name: "Illinois HB 3773 and NYC Local Law 144", type: "Binding (state and city)", date: "In force", what: "Rules on AI in employment decisions, including bias audits for automated hiring tools in New York City." },
        { name: "Colorado SB 26-189", type: "Binding (state)", date: "From 1 Jan 2027", what: "Replaces the 2024 Colorado AI Act with narrower rules on automated decision-making in consequential decisions." },
        { name: "Utah AI Policy Act", type: "Binding (state)", date: "In force", what: "Disclosure duties when generative AI is used with consumers in certain contexts." },
      ],
      data: [
        { name: "State data breach notification laws", type: "Binding (all 50 states)", date: "In force", what: "Notify affected residents, and often the state attorney general, within set deadlines that vary by state." },
        { name: "California CCPA/CPRA and CPPA regulations", type: "Binding (state)", date: "In force; ADMT duties from 1 Jan 2027", what: "Privacy rights, opt-out of sale or sharing, risk assessments, cybersecurity audits and automated decision-making rules. Most non-profits are exempt." },
        { name: "Sector laws: HIPAA, COPPA, GLBA Safeguards Rule, FERPA", type: "Binding (federal)", date: "In force", what: "Health, children’s online data, financial and student records each have their own security and privacy rules." },
      ],
      cmp: { ai: "No federal act; state laws", labels: "Some states and contexts", chatbot: "Some states (e.g. Utah)", breach: "Varies by state", dpo: "Not generally required", local: "No general rule" },
      website: ["Check which states your users are in: Texas, California, Illinois, Utah, New York City and Colorado have specific AI rules.", "If you use AI in hiring, check bias-audit and notice duties.", "Remove non-consensual intimate deepfakes quickly when asked (TAKE IT DOWN Act).", "Schools must protect student records (FERPA); services for children under 13 must follow COPPA."],
      sources: [["FTC", "https://www.ftc.gov/"], ["California Privacy Protection Agency", "https://cppa.ca.gov/"]],
    },
  ];
  globalThis.COMPLISCOPE_ATLAS = { list: A, CHECKED };
})();
