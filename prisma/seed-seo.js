const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding SEO & Backlink Management data...');

  // 1. Initial SEO Prospects
  const existingProspects = await prisma.seoProspect.count();
  if (existingProspects === 0) {
    const prospects = [
      {
        domain: "moneylife.in",
        pageUrl: "https://www.moneylife.in/article/financial-literacy-and-borrower-guidance",
        title: "Moneylife Foundation — Consumer Finance & Borrower Guidance",
        category: "Consumer Rights & Financial Awareness",
        editorialGuidelines: "Strict consumer advocacy; requires factual case citations, RBI circular references, and educational tone without commercial promotion.",
        topicalRelevance: 29,
        editorialCredibility: 19,
        audiencePotential: 14,
        indianRelevance: 10,
        editorialOpportunity: 13,
        websiteQuality: 9,
        priorityScore: 94,
        contactName: "Editorial Desk / Legal Advocacy Cell",
        contactEmail: "foundation@moneylife.in",
        contactUrl: "https://www.moneylife.in/contactus.html",
        estimatedEffort: "High",
        riskIndicators: "CLEAN",
        outreachStatus: "QUALIFIED",
        targetLandingPage: "/blog/rbi-fair-practices-code-borrower-rights",
        notes: "Ideal for editorial collaboration regarding RBI Fair Practices Code for loan recovery agents.",
      },
      {
        domain: "taxguru.in",
        pageUrl: "https://taxguru.in/corporate-law/banking-nbfc-loan-recovery-settlement.html",
        title: "TaxGuru — Professional Finance & Banking Law Platform",
        category: "Legal Info",
        editorialGuidelines: "Welcomes CA, CS, and legal professional submissions analyzing debt recovery laws, SARFAESI Act, and OTS tax implications.",
        topicalRelevance: 28,
        editorialCredibility: 18,
        audiencePotential: 12,
        indianRelevance: 10,
        editorialOpportunity: 14,
        websiteQuality: 8,
        priorityScore: 90,
        contactName: "TaxGuru Editorial Submission Desk",
        contactEmail: "info@taxguru.in",
        contactUrl: "https://taxguru.in/submit-post",
        estimatedEffort: "Medium",
        riskIndicators: "CLEAN",
        outreachStatus: "PITCH_APPROVED",
        targetLandingPage: "/blog/understanding-loan-settlement-in-india-guide",
        notes: "Pitch a comprehensive deep dive: 'Legal & Tax Implications of One-Time Settlement (OTS) for Borrowers in India'.",
      },
      {
        domain: "smefutures.com",
        pageUrl: "https://smefutures.com/finance/msme-debt-restructuring-options/",
        title: "SME Futures — Indian MSME & Business Growth Journal",
        category: "MSME & Business",
        editorialGuidelines: "Covers MSME working capital distress, NPA prevention, and restructured repayments under RBI framework.",
        topicalRelevance: 26,
        editorialCredibility: 17,
        audiencePotential: 13,
        indianRelevance: 10,
        editorialOpportunity: 12,
        websiteQuality: 8,
        priorityScore: 86,
        contactName: "Features Editor",
        contactEmail: "editorial@smefutures.com",
        contactUrl: "https://smefutures.com/contact-us/",
        estimatedEffort: "Medium",
        riskIndicators: "CLEAN",
        outreachStatus: "DISCOVERED",
        targetLandingPage: "/services/business-loan-assistance",
        notes: "Focus on small business debt relief strategies without collateral forfeiture.",
      },
      {
        domain: "jagoinvestor.com",
        pageUrl: "https://www.jagoinvestor.com/debt-free-life",
        title: "Jago Investor — Personal Finance & Debt-Free Living",
        category: "Personal Finance",
        editorialGuidelines: "Case studies on clearing unsecured credit card debt and psychological aspects of financial recovery.",
        topicalRelevance: 28,
        editorialCredibility: 17,
        audiencePotential: 14,
        indianRelevance: 10,
        editorialOpportunity: 13,
        websiteQuality: 8,
        priorityScore: 90,
        contactName: "Manish Chauhan & Editorial Team",
        contactEmail: "contact@jagoinvestor.com",
        contactUrl: "https://www.jagoinvestor.com/contact",
        estimatedEffort: "Low",
        riskIndicators: "CLEAN",
        outreachStatus: "QUALIFIED",
        targetLandingPage: "/blog/credit-card-debt-resolution-strategies",
        notes: "Collaborate on a detailed consumer roadmap for escaping high APR credit card compounding.",
      },
      {
        domain: "paisavaisa.club",
        pageUrl: "https://paisavaisa.club/episodes/",
        title: "Paisa Vaisa Podcast with Anupam Gupta — Debt Advisory Series",
        category: "Podcast & Media",
        editorialGuidelines: "Guest interview format focusing on personal finance dilemmas, debt relief, and credit restoration.",
        topicalRelevance: 28,
        editorialCredibility: 19,
        audiencePotential: 15,
        indianRelevance: 10,
        editorialOpportunity: 13,
        websiteQuality: 9,
        priorityScore: 94,
        contactName: "Anupam Gupta / IVM Podcasts",
        contactEmail: "paisavaisa@ivmpodcasts.com",
        contactUrl: "https://ivmpodcasts.com/contact",
        estimatedEffort: "High",
        riskIndicators: "CLEAN",
        outreachStatus: "QUALIFIED",
        targetLandingPage: "/services/loan-settlement",
        notes: "Pitch a guest expert interview: 'Demystifying Loan Settlement in India: When is it appropriate and how does it actually work?'",
      },
    ];

    for (const p of prospects) {
      const created = await prisma.seoProspect.create({ data: p });
      // If TaxGuru, create an approved pitch
      if (p.domain === "taxguru.in") {
        await prisma.outreachPitch.create({
          data: {
            prospectId: created.id,
            angleType: "RBI_OTS_VERIFICATION",
            pitchSubject: "Legal Perspective: Identifying Valid vs Forged One-Time Settlement (OTS) Letters under RBI Framework",
            pitchBody: `Dear TaxGuru Editorial Team,\n\nWe regularly encounter Indian borrowers deceived by unauthorized collection agents issuing forged OTS letters on counterfeit bank stationery.\n\nWe have compiled an authoritative article detailing the strict verification protocols, RBI circular compliance, and income-tax implications of debt waiver for individual borrowers.\n\nWould you be interested in reviewing the complete draft for TaxGuru's corporate & banking law section?\n\nBest regards,\nAdvisory Team, Settle Loan Expert`,
            targetAssetUrl: "https://settleloanexpert.in/blog/understanding-loan-settlement-in-india-guide",
            status: "APPROVED",
            approvedBy: "Principal Administrator",
          },
        });
      }
    }
    console.log(`Seeded ${prospects.length} initial SEO prospects.`);
  }

  // 2. Directory Listings
  const existingDirectories = await prisma.directoryListing.count();
  if (existingDirectories === 0) {
    const directories = [
      {
        name: "Google Business Profile",
        directoryUrl: "https://business.google.com/",
        category: "Gurugram Local",
        listingUrl: "https://maps.google.com/?cid=settleloanexpert-gurugram",
        status: "LIVE",
        isPaid: false,
        pricing: "Free Official Listing",
        napConsistent: true,
        backlinkVerified: true,
        relAttribute: "follow",
        submissionNotes: "Primary local SEO map asset. Gurugram address verified.",
      },
      {
        name: "JustDial Gurugram",
        directoryUrl: "https://www.justdial.com/Gurugram/Loan-Settlement-Consultants",
        category: "Gurugram Local",
        listingUrl: "https://www.justdial.com/Gurugram/Settle-Loan-Expert",
        status: "APPROVED",
        isPaid: false,
        pricing: "Free Standard Listing",
        napConsistent: true,
        backlinkVerified: true,
        relAttribute: "nofollow",
        submissionNotes: "NAP: Settle Loan Expert, Gurugram, Haryana. Phone: +91 92892 20888.",
      },
      {
        name: "Sulekha Gurugram",
        directoryUrl: "https://www.sulekha.com/financial-services/gurgaon",
        category: "Gurugram Local",
        listingUrl: "https://www.sulekha.com/settle-loan-expert-gurgaon",
        status: "APPROVED",
        isPaid: false,
        pricing: "Free Listing",
        napConsistent: true,
        backlinkVerified: true,
        relAttribute: "nofollow",
        submissionNotes: "Registered under Debt Management & Loan Advisory categories.",
      },
      {
        name: "IndiaMART Financial Services",
        directoryUrl: "https://dir.indiamart.com/gurgaon/financial-consultancy-services.html",
        category: "National Business",
        listingUrl: "https://www.indiamart.com/settleloanexpert/",
        status: "LIVE",
        isPaid: false,
        pricing: "Free Tier",
        napConsistent: true,
        backlinkVerified: true,
        relAttribute: "nofollow",
        submissionNotes: "Verified MSME and loan consultancy profile.",
      },
      {
        name: "TradeIndia Financial Advisory",
        directoryUrl: "https://www.tradeindia.com/city/gurgaon/financial-services.html",
        category: "National Business",
        listingUrl: null,
        status: "SUBMITTED",
        isPaid: false,
        pricing: "Free Listing",
        napConsistent: true,
        backlinkVerified: false,
        relAttribute: "nofollow",
        submissionNotes: "Pending confirmation from TradeIndia listing coordinator.",
      },
    ];

    await prisma.directoryListing.createMany({ data: directories });
    console.log(`Seeded ${directories.length} directories.`);
  }

  // 3. Competitors & Competitor Backlinks
  const existingCompetitors = await prisma.competitorDomain.count();
  if (existingCompetitors === 0) {
    const singleDebt = await prisma.competitorDomain.create({
      data: {
        domain: "singledebt.in",
        companyName: "SingleDebt India",
        marketFocus: "Personal loan settlement, legal advocate notices, debt management",
        notes: "Established presence across consumer finance and law news columns.",
        backlinks: {
          create: [
            {
              referringDomain: "thehindubusinessline.com",
              referringUrl: "https://www.thehindubusinessline.com/portfolio/debt-relief-in-india-what-borrowers-must-know/",
              anchorText: "debt management advisory",
              targetUrl: "https://singledebt.in/",
              linkType: "Editorial",
              gapStatus: "UNEXPLORED",
            },
            {
              referringDomain: "goodreturns.in",
              referringUrl: "https://www.goodreturns.in/personal-finance/how-to-handle-recovery-agents-guidelines.html",
              anchorText: "SingleDebt legal assistance",
              targetUrl: "https://singledebt.in/services",
              linkType: "Editorial",
              gapStatus: "QUALIFIED_PROSPECT",
            },
          ],
        },
      },
    });

    const freed = await prisma.competitorDomain.create({
      data: {
        domain: "freed.care",
        companyName: "Freed Care",
        marketFocus: "Consumer debt relief, app-based tracking, credit card restructuring",
        notes: "Strong digital PR and tech startup coverage.",
        backlinks: {
          create: [
            {
              referringDomain: "yourstory.com",
              referringUrl: "https://yourstory.com/2023/debt-relief-startups-in-india-challenges-and-growth",
              anchorText: "Freed debt resolution",
              targetUrl: "https://freed.care/",
              linkType: "Editorial",
              gapStatus: "QUALIFIED_PROSPECT",
            },
          ],
        },
      },
    });

    console.log(`Seeded competitor intelligence profiles.`);
  }

  // 4. Monitored Backlinks
  const existingMonitored = await prisma.monitoredBacklink.count();
  if (existingMonitored === 0) {
    await prisma.monitoredBacklink.createMany({
      data: [
        {
          referringUrl: "https://dir.indiamart.com/gurgaon/financial-consultancy-services.html",
          targetUrl: "https://settleloanexpert.in",
          anchorText: "Settle Loan Expert Gurugram",
          relAttribute: "nofollow",
          httpStatus: 200,
          isLive: true,
          toxicityScore: 0,
          isDisavowed: false,
          lastCheckedAt: new Date(),
        },
        {
          referringUrl: "https://maps.google.com/?cid=settleloanexpert-gurugram",
          targetUrl: "https://settleloanexpert.in",
          anchorText: "Website",
          relAttribute: "follow",
          httpStatus: 200,
          isLive: true,
          toxicityScore: 0,
          isDisavowed: false,
          lastCheckedAt: new Date(),
        },
      ],
    });
    console.log(`Seeded monitored backlinks.`);
  }

  // 5. Initial Search Console & Analytics Benchmarks
  const existingGsc = await prisma.searchConsoleData.count();
  if (existingGsc === 0) {
    const today = new Date();
    const gscEntries = [
      { query: "loan settlement in gurugram", clicks: 42, impressions: 820, ctr: 5.12, position: 6.4, isEstimated: true },
      { query: "rbi guidelines for recovery agents 2026", clicks: 88, impressions: 1450, ctr: 6.07, position: 4.2, isEstimated: true },
      { query: "how to settle credit card debt in india", clicks: 65, impressions: 1120, ctr: 5.80, position: 5.8, isEstimated: true },
      { query: "one time settlement fake letter check", clicks: 31, impressions: 560, ctr: 5.53, position: 3.9, isEstimated: true },
      { query: "personal loan settlement process", clicks: 54, impressions: 980, ctr: 5.51, position: 7.1, isEstimated: true },
    ];

    for (let i = 0; i < gscEntries.length; i++) {
      const entry = gscEntries[i];
      const entryDate = new Date(today.getTime() - i * 86400000);
      await prisma.searchConsoleData.create({
        data: {
          date: entryDate,
          query: entry.query,
          page: "https://settleloanexpert.in/services/loan-settlement",
          clicks: entry.clicks,
          impressions: entry.impressions,
          ctr: entry.ctr,
          position: entry.position,
          isEstimated: true,
        },
      });
    }

    const analyticsEntries = [
      { channel: "Organic Search", sessions: 480, users: 390, enquiryLeads: 28, bounceRate: 42.1, isEstimated: true },
      { channel: "Direct", sessions: 210, users: 175, enquiryLeads: 14, bounceRate: 38.5, isEstimated: true },
      { channel: "Referral", sessions: 135, users: 110, enquiryLeads: 9, bounceRate: 45.2, isEstimated: true },
      { channel: "Social", sessions: 85, users: 70, enquiryLeads: 4, bounceRate: 52.0, isEstimated: true },
    ];

    for (const an of analyticsEntries) {
      await prisma.analyticsData.create({
        data: {
          date: today,
          channel: an.channel,
          sessions: an.sessions,
          users: an.users,
          enquiryLeads: an.enquiryLeads,
          bounceRate: an.bounceRate,
          isEstimated: true,
        },
      });
    }

    console.log(`Seeded Search Console & Analytics benchmarks.`);
  }

  // 6. Default SEO Settings
  const settings = [
    { key: "SITE_DOMAIN", value: "https://settleloanexpert.in" },
    { key: "MIN_PROSPECT_SCORE", value: "65" },
    { key: "AUTO_CHECK_INTERVAL_HOURS", value: "24" },
    { key: "ALERT_EMAIL", value: "info@settelloanexpert.in" },
    { key: "GSC_CONNECTED", value: "false" },
    { key: "GA4_CONNECTED", value: "false" },
  ];

  for (const s of settings) {
    await prisma.seoSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  console.log('Seeding SEO & Backlink platform completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
