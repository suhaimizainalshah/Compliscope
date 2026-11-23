/* AI Benar law catalogue. Each law lists the sections that relate to each audit topic.
   This is an indicative map to help non-specialists find the right rule, not legal advice.
   Laws marked verify:true have newer or less settled numbering: always check the official text. */
(() => {
  const LAWS = {
    EU_GDPR: {
      name: "EU GDPR and ePrivacy", short: "GDPR", region: "European Union / EEA", default: true, url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
      note: "Applies to organisations in the EU/EEA, and to organisations elsewhere that offer services to, or monitor, people in the EU (GDPR Art. 3(2)).",
      refs: {
        consent_cookies: ["ePrivacy Directive 2002/58/EC, Art. 5(3) (consent before storing or reading cookies and similar)", "GDPR Art. 6(1)(a) and Art. 7 (valid consent)"],
        dark_patterns: ["GDPR Art. 4(11) (consent must be freely given, specific, informed and unambiguous)", "GDPR Art. 7(3) (withdrawing consent must be as easy as giving it)"],
        prechecked: ["GDPR Art. 4(11) and recital 32 (silence or pre-ticked boxes are not consent)", "CJEU, Planet49 (C-673/17), 2019"],
        transparency: ["GDPR Art. 12–14 (clear privacy information)"],
        contact: ["GDPR Art. 13(1)(a)–(b) (identity and contact details, and DPO contact where appointed)", "GDPR Art. 37–38 (data protection officer, where required)"],
        transfers: ["GDPR Art. 44–49 (transfers outside the EEA need a legal mechanism)"],
        security: ["GDPR Art. 32 (security of processing)", "GDPR Art. 25 (data protection by design and by default)"],
        minimisation: ["GDPR Art. 5(1)(c) (data minimisation)", "GDPR Art. 5(1)(f) (integrity and confidentiality)"],
        special: ["GDPR Art. 9 (special category data)", "GDPR Art. 87 (national identification numbers)"],
        children: ["GDPR Art. 8 (children’s consent for online services)", "GDPR recital 38 (children merit specific protection)"],
        automated: ["GDPR Art. 22 (solely automated decisions with significant effects)"],
        breach: ["GDPR Art. 33 (notify the regulator within 72 hours)", "GDPR Art. 34 (tell affected people when risk is high)"],
        records: ["GDPR Art. 30 (records of processing activities)"], dpia: ["GDPR Art. 35 (data protection impact assessment)"], dpo: ["GDPR Art. 37 (when a DPO is mandatory)"],
        marketing: ["ePrivacy Directive Art. 13 (consent for email and SMS marketing)"],
      },
    },
    EU_AIACT: {
      name: "EU AI Act", short: "AI Act", region: "European Union / EEA", default: true, url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
      note: "Regulation (EU) 2024/1689, as amended by the Digital Omnibus, Regulation (EU) 2026/1744. Prohibitions and AI literacy since 2 Feb 2025; Article 50 transparency since 2 Aug 2026; two new Article 5 bans, and Article 50(2) marking for generative systems already on the market, from 2 Dec 2026; Annex III high-risk duties from 2 Dec 2027; Annex I product duties from 2 Aug 2028.",
      refs: {
        ai_disclosure: ["AI Act Art. 50(1) (people must be told they are interacting with an AI system), applies since 2 Aug 2026", "AI Act Art. 50(3) (deployers of emotion-recognition or biometric categorisation systems must inform the people concerned), applies since 2 Aug 2026"],
        ai_marking: ["AI Act Art. 50(2) (providers of generative AI must mark outputs in a machine-readable, detectable way; required from launch for systems placed on the market from 2 Aug 2026, and by 2 Dec 2026 for systems placed on the market before then, under Art. 111(4))"],
        ai_deepfake: ["AI Act Art. 50(4) (disclose deepfakes and AI-generated text published on matters of public interest)"],
        ai_highrisk: ["AI Act Art. 6 and Annex III (high-risk uses in education, employment, essential services and credit), duties apply from 2 Dec 2027", "AI Act Art. 26 (duties of deployers of high-risk AI)", "AI Act Art. 27 (fundamental rights impact assessment for public bodies and providers of public services)"],
        ai_prohibited: ["AI Act Art. 5(1)(f) (emotion recognition in workplaces and education is banned, except for medical or safety reasons)", "AI Act Art. 5(1)(c) (social scoring is banned)", "AI Act Art. 5(1)(g) (biometric categorisation to infer sensitive traits is banned)", "AI Act Art. 5(1)(ba) (AI systems that generate or manipulate realistic intimate images, video or audio of an identifiable person without their explicit consent are banned, from 2 Dec 2026)", "AI Act Art. 5(1)(bb) (AI systems that generate child sexual abuse material are banned, from 2 Dec 2026)"],
        ai_literacy: ["AI Act Art. 4 (AI literacy), as amended by Regulation (EU) 2026/1744"],
        ai_security: ["AI Act Art. 15 (accuracy, robustness and cybersecurity for high-risk AI)"],
      },
    },
    EU_ACCESS: {
      name: "EU accessibility law", short: "Accessibility", region: "European Union / EEA", default: true, url: "https://eur-lex.europa.eu/eli/dir/2019/882/oj",
      note: "The European Accessibility Act applies to many consumer products and services, such as e-commerce, banking, e-books, transport and communications, since 28 June 2025. Public sector bodies follow the Web Accessibility Directive. Both point to the EN 301 549 standard, which uses WCAG.",
      refs: {
        accessibility: ["European Accessibility Act, Directive (EU) 2019/882, Art. 4 and Annex I (accessibility requirements for products and services, applies since 28 June 2025)", "Web Accessibility Directive (EU) 2016/2102, Art. 4 (public sector websites and apps must be accessible)", "EN 301 549 (harmonised standard, which refers to WCAG 2.1 AA)"],
      },
    },
    UK: {
      name: "UK GDPR, DPA 2018 and PECR", short: "UK", region: "United Kingdom", url: "https://ico.org.uk/for-organisations/",
      note: "The Data (Use and Access) Act 2025 amends these laws, including limited cookie exemptions for some low-risk uses such as certain analytics, with an opt-out. Check the ICO’s current guidance.",
      refs: {
        accessibility: ["Equality Act 2010, s. 20 and s. 29 (service providers must make reasonable adjustments for disabled people, including online)", "Public Sector Bodies (Websites and Mobile Applications) Accessibility Regulations 2018 (public sector, WCAG 2.2 AA)"],
        consent_cookies: ["PECR 2003, reg. 6 (consent for non-essential cookies), as amended by the Data (Use and Access) Act 2025", "UK GDPR Art. 6(1)(a) and Art. 7"],
        dark_patterns: ["UK GDPR Art. 4(11) and Art. 7(3)"], prechecked: ["UK GDPR Art. 4(11) (pre-ticked boxes are not consent)"],
        transparency: ["UK GDPR Art. 12–14"], contact: ["UK GDPR Art. 13(1)(a)–(b)", "UK GDPR Art. 37 (DPO where required)"], transfers: ["UK GDPR Art. 44–49"],
        security: ["UK GDPR Art. 32", "UK GDPR Art. 25"], minimisation: ["UK GDPR Art. 5(1)(c) and (f)"], special: ["UK GDPR Art. 9", "DPA 2018, Schedule 1"],
        children: ["UK GDPR Art. 8", "ICO Age Appropriate Design Code (Children’s Code)"], automated: ["UK GDPR Art. 22, as amended by the Data (Use and Access) Act 2025"],
        breach: ["UK GDPR Art. 33–34 (72 hours)"], records: ["UK GDPR Art. 30"], dpia: ["UK GDPR Art. 35"], dpo: ["UK GDPR Art. 37"], marketing: ["PECR reg. 22 (email and text marketing)"],
      },
    },
    SG: {
      name: "Singapore PDPA 2012", short: "Singapore", region: "Singapore", url: "https://www.pdpc.gov.sg/",
      refs: {
        consent_cookies: ["PDPA s13–15 (consent obligation)", "PDPC Advisory Guidelines on Key Concepts in the PDPA (cookies and online tracking)"],
        dark_patterns: ["PDPA s14(2) (consent must not be obtained through false or misleading information or deceptive practices)"], prechecked: ["PDPA s14 (meaning of consent)"],
        transparency: ["PDPA s20 (notify the purposes of collection)"], contact: ["PDPA s11(3) (appoint a data protection officer)", "PDPA s11(5) (make the DPO’s business contact information available)"],
        transfers: ["PDPA s26 (transfer limitation obligation)"], security: ["PDPA s24 (protection obligation)"], minimisation: ["PDPA s18 (purpose limitation obligation)"],
        special: ["PDPC Advisory Guidelines on the PDPA for NRIC and other national identification numbers"], children: ["PDPC Advisory Guidelines on the PDPA for Children’s Personal Data in the Digital Environment"],
        breach: ["PDPA Part 6A, s26B–26D (notify PDPC within 3 calendar days of assessing a notifiable breach)"], records: ["PDPA s12 (policies and practices)"], dpo: ["PDPA s11(3)"],
        marketing: ["PDPA Part 9 (Do Not Call provisions)", "Spam Control Act 2007"],
        ai_disclosure: ["IMDA Model AI Governance Framework for Generative AI (2024) and for Agentic AI (2026): be transparent with users (voluntary)"],
        ai_deepfake: ["Elections (Integrity of Online Advertising) (Amendment) Act 2024 (deepfakes of election candidates)", "Online Safety (Relief and Accountability) Act (online harms including intimate deepfakes)"],
        ai_highrisk: ["PDPC Advisory Guidelines on personal data in AI recommendation and decision systems (2024)", "IMDA Model AI Governance Framework, 2nd edition (voluntary)"],
        ai_literacy: ["IMDA Model AI Governance Framework: internal governance and staff training (voluntary)"],
      },
    },
    MY: {
      name: "Malaysia PDPA 2010", short: "Malaysia", region: "Malaysia", verify: true, url: "https://www.pdp.gov.my/",
      note: "Amended by the Personal Data Protection (Amendment) Act 2024, which added DPO and breach-notification duties.",
      refs: {
        consent_cookies: ["PDPA 2010 s6 (General Principle: consent)"], dark_patterns: ["PDPA 2010 s6 (General Principle)"], transparency: ["PDPA 2010 s7 (Notice and Choice Principle)"],
        contact: ["PDPA 2010 s12A (data protection officer), added in 2024"], transfers: ["PDPA 2010 s129 (transfer outside Malaysia), as amended in 2024"],
        security: ["PDPA 2010 s9 (Security Principle)"], minimisation: ["PDPA 2010 s6(3) (data must be adequate and not excessive)"], special: ["PDPA 2010 s40 (sensitive personal data)"],
        breach: ["PDPA 2010 s12B (notify the Commissioner within 72 hours where thresholds are met; affected people within 7 days)"], dpo: ["PDPA 2010 s12A and the DPO Appointment Guideline (2025)"],
        dpia: ["PDP Guideline on Data Protection Impact Assessment (2026), which treats AI features as a high-risk factor"],
        automated: ["PDP Guideline on Automated Decision-Making and Profiling (2026)"],
        ai_disclosure: ["National Guidelines on AI Governance and Ethics (AIGE) 2024: transparency principle (voluntary)"], ai_highrisk: ["AIGE 2024 (voluntary); AI Governance Bill in draft"],
      },
    },
    ID: {
      name: "Indonesia Personal Data Protection Law (Law 27/2022)", short: "Indonesia", region: "Indonesia", verify: true, url: "https://peraturan.go.id/",
      refs: {
        consent_cookies: ["Law 27/2022 Art. 20 (lawful bases, including explicit consent)"], dark_patterns: ["Law 27/2022 Art. 22 (consent requirements)"], transparency: ["Law 27/2022 Art. 21 (information to be given)"],
        contact: ["Law 27/2022 Art. 53 (data protection officer)"], transfers: ["Law 27/2022 Art. 56 (cross-border transfers)"], security: ["Law 27/2022 Art. 35–39 (security of personal data)"],
        special: ["Law 27/2022 Art. 4(2) (specific personal data)"], children: ["Law 27/2022 Art. 25 (children’s personal data)"], breach: ["Law 27/2022 Art. 46 (notify within 3 x 24 hours)"], dpo: ["Law 27/2022 Art. 53"],
        ai_disclosure: ["Ministerial Circular on AI Ethics (2023): transparency (voluntary)", "Draft Presidential Regulation on AI Ethics (awaiting signature)"], ai_highrisk: ["Draft Presidential Regulation on AI Ethics (risk-based, awaiting signature)"],
      },
    },
    TH: {
      name: "Thailand PDPA B.E. 2562 (2019)", short: "Thailand", region: "Thailand", url: "https://www.pdpc.or.th/",
      refs: {
        consent_cookies: ["PDPA s19 (consent)"], dark_patterns: ["PDPA s19 (consent must be freely given and as easy to withdraw)"], transparency: ["PDPA s23 (notice)"], contact: ["PDPA s41 (data protection officer)"],
        transfers: ["PDPA s28 (cross-border transfers)"], security: ["PDPA s37(1) (security measures)"], special: ["PDPA s26 (sensitive data)"], children: ["PDPA s20 (minors)"],
        breach: ["PDPA s37(4) (notify within 72 hours)"], dpo: ["PDPA s41"],
        ai_disclosure: ["Draft Artificial Intelligence Act (ETDA, 2026): chatbot transparency (proposed)"], ai_deepfake: ["Draft Artificial Intelligence Act (ETDA, 2026): content marking and deepfake disclosure (proposed)"], ai_highrisk: ["Draft Artificial Intelligence Act (ETDA, 2026): high-risk AI by royal decree (proposed)"],
        security: ["PDPA s37(1) (security measures)", "Cybersecurity Act B.E. 2562 (2019), for critical information infrastructure"],
      },
    },
    PH: {
      name: "Philippines Data Privacy Act 2012 (RA 10173)", short: "Philippines", region: "Philippines", verify: true, url: "https://privacy.gov.ph/",
      refs: {
        consent_cookies: ["DPA s12(a) (consent as a criterion for lawful processing)"], transparency: ["DPA s16 (right to be informed)"], contact: ["DPA s21 (accountability; designate a responsible person)"],
        transfers: ["DPA s21 (accountability for transfers)"], security: ["DPA s20 (security of personal information)"], special: ["DPA s13 (sensitive personal information)"],
        breach: ["DPA s20(f) and NPC Circular 16-03 (notify within 72 hours)"],
        ai_disclosure: ["NPC Advisory on AI systems processing personal data (2024): transparency", "Executive Order 131 (2026): national AI Governance Framework; tell people when they interact with AI"], ai_highrisk: ["NPC Advisory on AI systems processing personal data (2024): fairness and accountability", "Executive Order 131 (2026): National AI Council and AI Governance Framework"],
      },
    },
    IN: {
      name: "India Digital Personal Data Protection Act 2023", short: "India", region: "India", url: "https://www.meity.gov.in/",
      note: "The DPDP Rules 2025 phase the Act in: core duties apply from 13 May 2027. AI-generated content rules under the IT Rules have applied since 20 February 2026.",
      refs: {
        consent_cookies: ["DPDP Act s6 (consent)"], dark_patterns: ["DPDP Act s6(1) (consent must be free, specific, informed, unconditional and unambiguous)"], transparency: ["DPDP Act s5 (notice)"],
        contact: ["DPDP Act s8(9) (publish contact details of the DPO or responsible person)"], transfers: ["DPDP Act s16 (transfers outside India)"], security: ["DPDP Act s8(5) (reasonable security safeguards)"],
        children: ["DPDP Act s9 (verifiable parental consent; no tracking, behavioural monitoring or targeted ads for children)"], breach: ["DPDP Act s8(6) (inform the Board and each affected person)", "CERT-In Directions 2022 (report cyber incidents within 6 hours)"],
        ai_deepfake: ["IT (Intermediary Guidelines and Digital Media Ethics Code) Amendment Rules, 2026: label synthetically generated information"], ai_marking: ["IT Amendment Rules, 2026: metadata or identifiers on synthetic content"],
        ai_disclosure: ["India AI Governance Guidelines (2025): transparency (voluntary)"],
      },
    },
    VN: {
      name: "Vietnam PDP Law and AI Law", short: "Vietnam", region: "Vietnam", url: "https://vanban.chinhphu.vn/",
      note: "Law on Personal Data Protection (Law 91/2025/QH15) and Decree 356/2025, in force since 1 January 2026; Law on Artificial Intelligence (Law 134/2025/QH15), in force since 1 March 2026, with 12 or 18-month grace periods for existing AI. Article numbers are still settling: check the official text.", verify: true,
      refs: {
        consent_cookies: ["Law 91/2025 on Personal Data Protection (consent of the data subject)"], transparency: ["Law 91/2025 (right to be informed)"], contact: ["Law 91/2025 and Decree 356/2025 (data protection personnel / DPO)"],
        transfers: ["Law 91/2025 and Decree 356/2025 (cross-border transfer impact assessment)"], security: ["Law 91/2025 (protection measures)", "Cybersecurity law framework"], special: ["Law 91/2025 (sensitive personal data)"],
        children: ["Law 91/2025 (children’s personal data)"], dpia: ["Law 91/2025 and Decree 356/2025 (processing impact assessment)"], dpo: ["Decree 356/2025 (DPO; 5-year grace for small firms not handling sensitive data)"],
        ai_disclosure: ["Law 134/2025 on Artificial Intelligence (transparency when people interact with AI)"], ai_deepfake: ["Law 134/2025 on Artificial Intelligence (identify AI-generated content and deepfakes)"], ai_marking: ["Law 134/2025 on Artificial Intelligence (labelling AI-generated content)"],
        ai_highrisk: ["Law 134/2025 on Artificial Intelligence (high-risk tier; human oversight of important decisions)"],
      },
    },
    CN: {
      name: "China PIPL and AI rules", short: "China", region: "Mainland China", url: "https://www.cac.gov.cn/",
      note: "Applies to processing in mainland China and to processing abroad aimed at people in China (PIPL Art. 3). AI content labelling has been mandatory since 1 September 2025.",
      refs: {
        consent_cookies: ["PIPL Art. 13–14 (lawful bases and informed consent)"], transparency: ["PIPL Art. 17 (notice before processing)"], contact: ["PIPL Art. 52 (person in charge of personal information protection)"],
        transfers: ["PIPL Art. 38–40 (cross-border transfer mechanisms)"], security: ["PIPL Art. 51", "Data Security Law (2021)", "Cybersecurity Law (amended, in force 1 Jan 2026)"], special: ["PIPL Art. 28–29 (sensitive personal information, separate consent)"],
        children: ["PIPL Art. 31 (under-14s need guardian consent)"], automated: ["PIPL Art. 24 (automated decision-making)"], breach: ["PIPL Art. 57 (remedy and notify)", "Network Data Security Management Regulations (2025)"],
        dpia: ["PIPL Art. 55–56 (personal information protection impact assessment)"],
        ai_deepfake: ["Measures for Labelling AI-Generated and Synthetic Content (in force 1 Sep 2025)", "Provisions on Deep Synthesis Internet Information Services (2023)"], ai_marking: ["Labelling Measures (2025) and mandatory standard GB 45438-2025 (implicit metadata labels)"],
        ai_disclosure: ["Interim Measures for Generative AI Services (2023)"],
      },
    },
    KR: {
      name: "South Korea AI Basic Act and PIPA", short: "South Korea", region: "South Korea", verify: true, url: "https://www.msit.go.kr/eng/index.do",
      note: "Framework Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (AI Basic Act, Act No. 20676), in force since 22 January 2026. MSIT is deferring fines and fact-finding for at least one year except in serious cases. The Personal Information Protection Act (PIPA) also applies.",
      refs: {
        consent_cookies: ["PIPA (consent for collecting and using personal information)"], transparency: ["AI Basic Act Art. 31 (tell users in advance when a product or service uses high-impact or generative AI)"], contact: ["AI Basic Act (domestic representative for overseas operators above the thresholds)"],
        transfers: ["PIPA (cross-border transfer rules)"], security: ["PIPA (security measures for personal information)"], special: ["PIPA (sensitive personal information)"],
        children: ["PIPA (children's personal information)"], breach: ["PIPA (breach notification to the PIPC and affected people)"],
        ai_disclosure: ["AI Basic Act Art. 31 (notify users in advance; label generative AI output, including deepfakes)"],
        ai_deepfake: ["AI Basic Act Art. 31 (label AI-generated output so users can recognise it)", "Act on Special Cases Concerning the Punishment of Sexual Crimes (deepfake offences)"],
        ai_marking: ["AI Basic Act Art. 31 (labelling of generative AI output; visible labels or invisible watermarks)"],
        ai_highrisk: ["AI Basic Act Arts. 33–35 (high-impact AI: risk management, explanation, user protection and human oversight)"],
      },
    },
    PK: {
      name: "Pakistan PECA and National AI Policy", short: "Pakistan", region: "Pakistan", url: "https://moitt.gov.pk/",
      note: "Pakistan has no comprehensive data protection law yet: the Personal Data Protection Bill is pending. The National AI Policy 2025 is not binding. Follow international good practice.",
      refs: {
        security: ["Prevention of Electronic Crimes Act 2016, as amended in 2025 (offences for unauthorised access and data interference)"], minimisation: ["Personal Data Protection Bill (pending): good-practice benchmark"],
        transparency: ["Personal Data Protection Bill (pending): notice duties as a benchmark"], ai_highrisk: ["National AI Policy 2025: risk guidance for high-risk uses (policy, not law)"],
      },
    },
    AU: {
      name: "Australia Privacy Act 1988", short: "Australia", region: "Australia", url: "https://www.oaic.gov.au/",
      note: "Small organisations with turnover under A$3m are often exempt, but many not-for-profits handling health information are covered.",
      refs: {
        consent_cookies: ["APP 3 (collection) and APP 6 (use and disclosure)"], transparency: ["APP 1 (open and transparent management; privacy policy)", "APP 5 (notification of collection)"], contact: ["APP 1.4 (how to contact you and complain)"],
        transfers: ["APP 8 (cross-border disclosure)"], security: ["APP 11 (security of personal information)"], minimisation: ["APP 3 (collect only what is reasonably necessary)"], special: ["APP 3.3 (sensitive information needs consent)"],
        children: ["Children’s Online Privacy Code (being developed under the Privacy and Other Legislation Amendment Act 2024)"], breach: ["Part IIIC (Notifiable Data Breaches scheme)"],
      },
    },
    US_CA: {
      name: "California CCPA / CPRA", short: "California", region: "United States (California)", url: "https://cppa.ca.gov/",
      note: "Applies to for-profit businesses that meet the thresholds. Most non-profits are exempt, unless controlled by a covered business.",
      refs: {
        consent_cookies: ["Cal. Civ. Code §1798.120 (right to opt out of sale or sharing)", "§1798.135 (‘Do Not Sell or Share’ link and opt-out preference signals)", "CCPA Regulations §7025 (honour Global Privacy Control)"],
        transparency: ["Cal. Civ. Code §1798.100 (notice at collection)", "§1798.130 (privacy policy contents)"], security: ["Cal. Civ. Code §1798.100(e) and §1798.150 (reasonable security; liability for breaches)"],
        special: ["Cal. Civ. Code §1798.121 (sensitive personal information)"], children: ["Cal. Civ. Code §1798.120(c) (opt-in for under-16s)"],
        automated: ["CPPA regulations on automated decision-making technology (significant-decision duties from 1 Jan 2027)"],
        breach: ["Cal. Civ. Code §1798.82 (breach notification)"],
      },
    },
    US_FED: {
      name: "US federal and other states", short: "US federal", region: "United States", url: "https://www.ftc.gov/",
      note: "No comprehensive federal privacy or AI law. Federal agencies enforce existing laws; Texas, Illinois, Utah, New York City and Colorado have AI-specific rules; every state has a breach notification law.",
      refs: {
        accessibility: ["Americans with Disabilities Act, Titles II and III (courts and the Department of Justice have applied them to websites)", "ADA Title II rule, 28 CFR Part 35 Subpart H (state and local government web content to WCAG 2.1 AA; check current compliance dates)"],
        transparency: ["FTC Act §5 (deceptive practices, including misleading privacy and AI claims)"], security: ["FTC Act §5 (unfair data security practices)", "Sector rules: HIPAA, GLBA Safeguards Rule"],
        children: ["COPPA and the FTC COPPA Rule (children under 13)", "FERPA (student education records)"], breach: ["State breach notification laws (deadlines vary by state)"],
        ai_deepfake: ["TAKE IT DOWN Act 2025 (non-consensual intimate deepfakes)"], ai_disclosure: ["Utah AI Policy Act (disclose generative AI use in certain contexts)", "FTC Act §5 (don’t mislead people about AI)"],
        ai_highrisk: ["Illinois HB 3773 (AI in employment, from 1 Jan 2026)", "NYC Local Law 144 (bias audits for automated hiring tools)", "Colorado SB 26-189 (automated decisions, from 1 Jan 2027)", "Texas TRAIGA (from 1 Jan 2026)"],
      },
    },
    BR: {
      name: "Brazil LGPD (Law 13.709/2018)", short: "Brazil", region: "Brazil", url: "https://www.gov.br/anpd/",
      refs: {
        consent_cookies: ["LGPD Art. 7(I) and Art. 8 (consent)"], dark_patterns: ["LGPD Art. 8(4)–(5) (consent must be specific and revocable)"], transparency: ["LGPD Art. 9 (clear information)"],
        contact: ["LGPD Art. 41 (data protection officer, ‘encarregado’)"], transfers: ["LGPD Art. 33 (international transfers)"], security: ["LGPD Art. 46 (security measures)"], special: ["LGPD Art. 11 (sensitive data)"],
        children: ["LGPD Art. 14 (children and adolescents)"], automated: ["LGPD Art. 20 (review of automated decisions)"], breach: ["LGPD Art. 48 (breach notification)"],
      },
    },
    ZA: {
      name: "South Africa POPIA 2013", short: "South Africa", region: "South Africa", url: "https://inforegulator.org.za/",
      refs: {
        consent_cookies: ["POPIA s11 (consent, justification and objection)"], transparency: ["POPIA s18 (notification when collecting)"], contact: ["POPIA s55 (information officer)"],
        transfers: ["POPIA s72 (transfers outside South Africa)"], security: ["POPIA s19 (security safeguards)"], special: ["POPIA s26–27 (special personal information)"], children: ["POPIA s34–35 (children’s information)"],
        automated: ["POPIA s71 (automated decision-making)"], breach: ["POPIA s22 (notification of security compromises)"],
      },
    },
    KE: {
      name: "Kenya Data Protection Act 2019", short: "Kenya", region: "Kenya", verify: true, url: "https://www.odpc.go.ke/",
      refs: {
        consent_cookies: ["DPA s30 (lawful processing)", "DPA s32 (conditions of consent)"], transparency: ["DPA s29 (duty to notify)"], contact: ["DPA s24 (data protection officer)"], transfers: ["DPA s48–50 (transfers outside Kenya)"],
        security: ["DPA s41 (data protection by design and by default)"], special: ["DPA s44–46 (sensitive personal data)"], children: ["DPA s33 (children’s data)"], breach: ["DPA s43 (notification of breaches)"],
      },
    },
    NG: {
      name: "Nigeria Data Protection Act 2023", short: "Nigeria", region: "Nigeria", verify: true, url: "https://ndpc.gov.ng/",
      refs: {
        consent_cookies: ["NDPA s25 (lawful basis)", "NDPA s26 (consent)"], transparency: ["NDPA s27 (information to data subjects)"], contact: ["NDPA s32 (data protection officer)"], transfers: ["NDPA s41–43 (cross-border transfers)"],
        security: ["NDPA s39 (security measures)"], special: ["NDPA s30 (sensitive personal data)"], children: ["NDPA s31 (children)"], breach: ["NDPA s40 (breach notification)"],
      },
    },
  };
  const STANDARDS = {
    headers: ["OWASP Top 10 (2021) A05: Security Misconfiguration", "OWASP Secure Headers Project"], https: ["OWASP Top 10 (2021) A02: Cryptographic Failures"],
    libraries: ["OWASP Top 10 (2021) A06: Vulnerable and Outdated Components"], secrets: ["OWASP Top 10 (2021) A02 and A05", "OWASP Top 10 for LLM Applications: LLM02 Sensitive Information Disclosure"],
    cookies: ["OWASP Session Management Cheat Sheet"], sri: ["OWASP Top 10 (2021) A08: Software and Data Integrity Failures"], securitytxt: ["RFC 9116 (security.txt)"],
    forms: ["OWASP Top 10 (2021) A02 and A04"], disclosure: ["OWASP Top 10 (2021) A05 (information disclosure)"], ai_client: ["OWASP Top 10 for LLM Applications: LLM02 and LLM10"],
  };
  globalThis.COMPLISCOPE_LAWS = { LAWS, STANDARDS, DEFAULT: Object.keys(LAWS).filter(k => LAWS[k].default) };
})();
