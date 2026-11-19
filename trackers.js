/* Compliscope: known third-party services, matched by domain.
   cat: analytics, ads, social, session (records visits), embed, fonts, cdn, chat, ai, consent, tag (tag manager) */
(() => {
  const T = [
    ["google-analytics.com", "Google Analytics", "Google", "analytics", "US"], ["analytics.google.com", "Google Analytics", "Google", "analytics", "US"],
    ["googletagmanager.com", "Google Tag Manager", "Google", "tag", "US"], ["doubleclick.net", "Google Ads (DoubleClick)", "Google", "ads", "US"],
    ["googleadservices.com", "Google Ads", "Google", "ads", "US"], ["googlesyndication.com", "Google AdSense", "Google", "ads", "US"], ["adservice.google.com", "Google Ads", "Google", "ads", "US"],
    ["connect.facebook.net", "Meta Pixel", "Meta", "ads", "US"], ["facebook.com/tr", "Meta Pixel", "Meta", "ads", "US"], ["facebook.net", "Meta (Facebook)", "Meta", "social", "US"],
    ["analytics.tiktok.com", "TikTok Pixel", "TikTok", "ads", "SG/CN"], ["snap.licdn.com", "LinkedIn Insight Tag", "LinkedIn (Microsoft)", "ads", "US"], ["px.ads.linkedin.com", "LinkedIn Ads", "LinkedIn (Microsoft)", "ads", "US"],
    ["static.ads-twitter.com", "X (Twitter) Pixel", "X Corp", "ads", "US"], ["analytics.twitter.com", "X (Twitter) Analytics", "X Corp", "ads", "US"], ["ct.pinterest.com", "Pinterest Tag", "Pinterest", "ads", "US"],
    ["sc-static.net", "Snap Pixel", "Snap", "ads", "US"], ["bat.bing.com", "Microsoft Advertising", "Microsoft", "ads", "US"], ["clarity.ms", "Microsoft Clarity", "Microsoft", "session", "US"],
    ["hotjar.com", "Hotjar", "Contentsquare", "session", "FR/MT"], ["hotjar.io", "Hotjar", "Contentsquare", "session", "FR/MT"], ["fullstory.com", "FullStory", "FullStory", "session", "US"],
    ["mouseflow.com", "Mouseflow", "Mouseflow", "session", "DK"], ["smartlook.com", "Smartlook", "Smartlook", "session", "CZ"], ["luckyorange.com", "Lucky Orange", "Lucky Orange", "session", "US"],
    ["mixpanel.com", "Mixpanel", "Mixpanel", "analytics", "US"], ["segment.com", "Segment", "Twilio", "analytics", "US"], ["segment.io", "Segment", "Twilio", "analytics", "US"], ["amplitude.com", "Amplitude", "Amplitude", "analytics", "US"],
    ["heapanalytics.com", "Heap", "Heap", "analytics", "US"], ["plausible.io", "Plausible", "Plausible", "analytics", "EE (EU)"], ["matomo.cloud", "Matomo Cloud", "InnoCraft", "analytics", "NZ/EU"],
    ["criteo.com", "Criteo", "Criteo", "ads", "FR"], ["criteo.net", "Criteo", "Criteo", "ads", "FR"], ["taboola.com", "Taboola", "Taboola", "ads", "US/IL"], ["outbrain.com", "Outbrain", "Outbrain", "ads", "US/IL"],
    ["adnxs.com", "Xandr (AppNexus)", "Microsoft", "ads", "US"], ["rubiconproject.com", "Magnite", "Magnite", "ads", "US"], ["pubmatic.com", "PubMatic", "PubMatic", "ads", "US"], ["amazon-adsystem.com", "Amazon Ads", "Amazon", "ads", "US"],
    ["hubspot.com", "HubSpot", "HubSpot", "analytics", "US"], ["hs-scripts.com", "HubSpot", "HubSpot", "analytics", "US"], ["hs-analytics.net", "HubSpot Analytics", "HubSpot", "analytics", "US"],
    ["youtube.com", "YouTube embed", "Google", "embed", "US"], ["youtube-nocookie.com", "YouTube (privacy-enhanced mode)", "Google", "embed", "US"], ["ytimg.com", "YouTube", "Google", "embed", "US"],
    ["player.vimeo.com", "Vimeo embed", "Vimeo", "embed", "US"], ["maps.googleapis.com", "Google Maps", "Google", "embed", "US"], ["maps.google.com", "Google Maps", "Google", "embed", "US"],
    ["platform.twitter.com", "X (Twitter) embed", "X Corp", "social", "US"], ["platform.instagram.com", "Instagram embed", "Meta", "social", "US"], ["disqus.com", "Disqus", "Disqus", "social", "US"],
    ["fonts.googleapis.com", "Google Fonts", "Google", "fonts", "US"], ["fonts.gstatic.com", "Google Fonts", "Google", "fonts", "US"], ["use.typekit.net", "Adobe Fonts", "Adobe", "fonts", "US"],
    ["recaptcha.net", "Google reCAPTCHA", "Google", "embed", "US"], ["google.com/recaptcha", "Google reCAPTCHA", "Google", "embed", "US"], ["hcaptcha.com", "hCaptcha", "Intuition Machines", "embed", "US"],
    ["intercom.io", "Intercom", "Intercom", "chat", "US/IE"], ["intercomcdn.com", "Intercom", "Intercom", "chat", "US/IE"], ["drift.com", "Drift", "Salesloft", "chat", "US"], ["zdassets.com", "Zendesk", "Zendesk", "chat", "US"],
    ["tidio.co", "Tidio", "Tidio", "chat", "PL/US"], ["crisp.chat", "Crisp", "Crisp", "chat", "FR"], ["tawk.to", "tawk.to", "tawk.to", "chat", "US"], ["livechatinc.com", "LiveChat", "Text", "chat", "PL"], ["hubspot.com/conversations", "HubSpot Chat", "HubSpot", "chat", "US"],
    ["ada.cx", "Ada", "Ada", "chat", "CA"], ["botpress.cloud", "Botpress", "Botpress", "chat", "CA"], ["voiceflow.com", "Voiceflow", "Voiceflow", "chat", "CA"], ["dialogflow", "Google Dialogflow", "Google", "chat", "US"],
    ["chatbase.co", "Chatbase", "Chatbase", "chat", "US"], ["landbot.io", "Landbot", "Landbot", "chat", "ES"], ["kore.ai", "Kore.ai", "Kore.ai", "chat", "US"], ["liveperson.net", "LivePerson", "LivePerson", "chat", "US"],
    ["api.openai.com", "OpenAI API", "OpenAI", "ai", "US"], ["api.anthropic.com", "Anthropic API", "Anthropic", "ai", "US"], ["generativelanguage.googleapis.com", "Google Gemini API", "Google", "ai", "US"],
    ["api.mistral.ai", "Mistral API", "Mistral AI", "ai", "FR"], ["api.cohere.ai", "Cohere API", "Cohere", "ai", "CA"], ["api-inference.huggingface.co", "Hugging Face Inference", "Hugging Face", "ai", "US/FR"],
    ["cdn.cookielaw.org", "OneTrust", "OneTrust", "consent", "US"], ["onetrust.com", "OneTrust", "OneTrust", "consent", "US"], ["consent.cookiebot.com", "Cookiebot", "Usercentrics", "consent", "DE"], ["usercentrics.eu", "Usercentrics", "Usercentrics", "consent", "DE"],
    ["sdk.privacy-center.org", "Didomi", "Didomi", "consent", "FR"], ["quantcast.mgr.consensu.org", "Quantcast Choice", "Quantcast", "consent", "US"], ["consent.trustarc.com", "TrustArc", "TrustArc", "consent", "US"], ["cookieyes.com", "CookieYes", "CookieYes", "consent", "UK"],
    ["osano.com", "Osano", "Osano", "consent", "US"], ["iubenda.com", "iubenda", "iubenda", "consent", "IT"],
  ];
  const TRACKING = new Set(["analytics", "ads", "session", "social", "tag"]);
  function match(url) { let h; try { const u = new URL(url); h = u.hostname + u.pathname; } catch { return null; } for (const [d, name, company, cat, country] of T) { if (h.includes(d)) return { domain: d, name, company, cat, country, tracking: TRACKING.has(cat) }; } return null; }
  const CMP = [[/onetrust|optanon/i, "OneTrust"], [/cookiebot|CybotCookiebot/i, "Cookiebot"], [/usercentrics|uc-banner/i, "Usercentrics"], [/didomi/i, "Didomi"], [/qc-cmp|quantcast/i, "Quantcast Choice"], [/truste|trustarc/i, "TrustArc"], [/osano/i, "Osano"], [/cky-consent|cookieyes/i, "CookieYes"], [/cmplz|complianz/i, "Complianz"], [/iubenda/i, "iubenda"], [/termly/i, "Termly"], [/cookie-?law-?info|cli_/i, "CookieLawInfo"], [/borlabs/i, "Borlabs"], [/klaro/i, "Klaro"]];
  globalThis.COMPLISCOPE_TRACKERS = { list: T, match, CMP, TRACKING };
})();
