const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database for Settle Loan Expert...');

  // 1. Initial Admin User (can also be created via /admin/setup if empty)
  const existingUsers = await prisma.user.count();
  if (existingUsers === 0) {
    const defaultPassword = 'AdminPassword@2026';
    const passwordHash = await bcrypt.hash(defaultPassword, 10);
    const admin = await prisma.user.create({
      data: {
        email: 'admin@settleloanexpert.in',
        name: 'Principal Administrator',
        passwordHash: passwordHash,
        role: 'SUPER_ADMIN',
        isActive: true,
      },
    });
    console.log(`Created default Super Admin: ${admin.email} / ${defaultPassword}`);
  }

  // 2. Educational Blog Posts
  const existingPosts = await prisma.blogPost.count();
  if (existingPosts === 0) {
    await prisma.blogPost.createMany({
      data: [
        {
          title: 'Understanding Loan Settlement in India: A Comprehensive Legal & Financial Guide',
          slug: 'understanding-loan-settlement-in-india-guide',
          category: 'Loan Settlement',
          readTime: '6 min read',
          excerpt: 'Explore what One-Time Settlement (OTS) means under Indian banking norms, how it differs from regular loan closure, and what borrowers must evaluate before negotiating.',
          content: `## What is a Loan Settlement?

A **Loan Settlement** (commonly referred to in Indian banking as a One-Time Settlement or OTS) is an agreement between an overburdened borrower and a financial institution (bank or NBFC). Under this arrangement, the lender agrees to accept an amount lower than the total outstanding balance to close the account, forgiving the remainder of the principal, accumulated interest, and penal charges.

Settlement is typically considered when a borrower has suffered a genuine, documented financial hardship—such as severe medical illness, permanent loss of employment, business insolvency, or family bereavement—that renders full repayment mathematically impossible.

### Key Distinction: Settlement vs. Loan Closure

It is vital to distinguish between a regular loan closure and a settlement:

1. **Regular Loan Closure (NOC / No Dues Certificate):**
   The borrower pays all outstanding EMIs, principal, and accrued interest as originally scheduled. The credit bureaus record the account status as **"CLOSED"**, which maintains or enhances the borrower's credit standing.

2. **Loan Settlement (OTS Settlement Letter):**
   The lender waives a portion of the debt in exchange for a lump-sum or staged compromise payment. The credit bureaus (CIBIL, Experian, CRIF High Mark, Equifax) report the account status as **"SETTLED"** or **"POST-WRITE-OFF SETTLED"**.

### Critical Steps in the Settlement Journey

- **Formal Evaluation:** Compile genuine financial documentation establishing hardship.
- **Direct or Assisted Negotiation:** Communicate with the authorized nodal recovery officers.
- **Mandatory Written Settlement Letter:** Never pay a single rupee based solely on verbal promises by recovery agents. Demand an official, signed settlement letter on the bank's letterhead detailing the exact compromised sum, account number, and payment due dates.
- **NOC Issuance:** Ensure the lender issues a formal No Dues / Settlement Certificate post-payment.`,
          featuredImage: '/images/hero-consultation.jpg',
          imageAlt: 'Indian financial consultant reviewing loan settlement documents',
          metaTitle: 'Loan Settlement in India: Complete Legal & Financial Guide | Settle Loan Expert',
          metaDescription: 'Understand how loan settlement works in India, the difference between closure and settlement, and RBI rules for overburdened borrowers.',
          published: true,
        },
        {
          title: 'Credit Card Debt Resolution: How to Stop the Interest Spiral Safely',
          slug: 'credit-card-debt-resolution-strategies',
          category: 'Credit Card Debt',
          readTime: '5 min read',
          excerpt: 'Credit card interest rates in India often range from 36% to 48% APR. Learn practical steps to halt compounding charges and negotiate structured repayment plans.',
          content: `## The Compound Interest Trap on Credit Cards

Credit cards in India carry some of the highest unsecured interest rates in the retail banking market, regularly exceeding **42% to 48% per annum** when compounded with finance charges, GST on interest (18%), late payment fines, and over-limit fees.

When a cardholder pays only the "Minimum Amount Due" (MAD), the remaining unpaid balance continues to accrue daily interest, eliminating the interest-free grace period on future transactions and creating a steep debt spiral.

### Strategic Relief Options

1. **Balance Transfer or Personal Loan Consolidation:**
   If your CIBIL score is intact and debt is manageable, consolidating card balances into a lower-interest personal loan (12%–16%) can slash monthly outflows.

2. **Conversion to Equated Monthly Installments (EMI):**
   Many banks allow cardholders to convert unpaid statements into a fixed-tenure EMI (12 to 36 months) with a reduced interest rate.

3. **Hardship One-Time Settlement:**
   When default has already occurred and cardholders face acute insolvency, reaching a formal compromise settlement with the issuing bank allows closure with a reduced lump sum.

### Practical Borrower Protections

Remember that recovery agencies must adhere strictly to the Reserve Bank of India’s (RBI) Fair Practices Code. Intimidation, calls outside 8:00 AM to 7:00 PM, and contact with third parties or employers violate regulatory guidelines.`,
          featuredImage: '/images/counselling.jpg',
          imageAlt: 'Credit card debt consultation and financial counselling session in India',
          metaTitle: 'Credit Card Debt Resolution Strategies | Settle Loan Expert',
          metaDescription: 'Learn how to resolve mounting credit card debt in India, stop compounding interest, and explore structured settlement options.',
          published: true,
        },
        {
          title: 'Know Your Rights: RBI Fair Practices Code for Loan Recovery and Harassment Protection',
          slug: 'rbi-fair-practices-code-borrower-rights',
          category: 'Banking Regulations',
          readTime: '7 min read',
          excerpt: 'Facing aggressive calls from recovery agents? The Reserve Bank of India has clear statutory guidelines protecting consumer dignity. Know what lenders can and cannot do.',
          content: `## Regulatory Protection for Indian Borrowers

Financial distress is a civil and economic matter, not a criminal offence (unless deliberate fraud, cheque dishonour under Section 138 NI Act, or asset misappropriation is proven). The **Reserve Bank of India (RBI)** has established strict mandates regarding loan collection practices for all scheduled commercial banks, NBFCs, and their outsourced recovery agencies.

### What Recovery Agents CANNOT Do:

- **No Harassment or Intimidation:** Agents cannot use verbal abuse, threats of physical force, or public humiliation.
- **Restricted Calling Hours:** Recovery calls and in-person visits are strictly prohibited before **8:00 AM** and after **7:00 PM**.
- **No Third-Party Contact:** Agents cannot contact your relatives, neighbours, friends, or office colleagues to disclose your financial default.
- **Privacy and Decency:** Visiting a borrower’s workplace without prior permission or creating a nuisance at their residence is a punishable regulatory violation.
- **Mandatory Identification:** Every recovery representative must carry official photo identification and authorization letters issued by the bank.

### How to Address Harassment

1. Maintain call logs and audio recordings of non-compliant recovery communications.
2. Lodge a formal written complaint with the bank's **Principal Nodal Officer (PNO)**.
3. If unaddressed within 30 days, escalate the matter to the **RBI Integrated Ombudsman** under the Reserve Bank - Integrated Ombudsman Scheme (RB-IOS).`,
          featuredImage: '/images/advisors.jpg',
          imageAlt: 'Senior Indian financial advisors discussing borrower legal rights',
          metaTitle: 'RBI Recovery Guidelines & Borrower Rights | Settle Loan Expert',
          metaDescription: 'Understand your statutory rights under the RBI Fair Practices Code against harassment by recovery agents in India.',
          published: true,
        },
        {
          title: 'Rebuilding Your CIBIL Score Post-Settlement: A Step-by-Step Roadmap',
          slug: 'rebuilding-cibil-score-post-settlement',
          category: 'Credit Score',
          readTime: '6 min read',
          excerpt: 'A "Settled" status does impact credit scores, but it is not a permanent barrier. Learn systematic methods to rebuild creditworthiness over 12 to 24 months.',
          content: `## Does Loan Settlement Ruin Your Credit Score Forever?

A common myth is that settling a debt destroys your financial future permanently. While it is true that credit bureaus flag the account as **"Settled"** or **"Written Off"** (which temporarily lowers your score by 50 to 120 points and makes prime unsecured loans harder to get in the immediate short term), this condition is reversible with disciplined planning.

### The 5-Step Score Rebuilding Plan

1. **Verify Bureau Rectification:**
   30 to 45 days after completing your settlement payment and obtaining your No Dues Certificate, download your updated CIBIL and Experian reports. Confirm that the outstanding balance reflects ₹0 and status is updated to settled.

2. **Apply for a Fixed-Deposit (FD) Backed Secured Credit Card:**
   Since unsecured credit cards may be temporarily declined, open a fixed deposit with a bank like ICICI, Axis, or Kotak and request a secured credit card (typically 80%–90% of FD value).

3. **Maintain Low Credit Utilization Ratio (CUR):**
   Never spend more than 25%–30% of your secured card's credit limit. Always repay the entire statement balance before the billing due date.

4. **Avoid Multiple Loan Enquiries:**
   Every formal loan application triggers a "hard pull" on your bureau file. Multiple hard pulls within short intervals signal credit hunger and depress scores.

5. **Track Progress Steadily:**
   Within 12 to 18 months of disciplined secured card usage, your score will steadily climb back towards 750+, reopening access to prime credit facilities.`,
          featuredImage: '/images/business-debt.jpg',
          imageAlt: 'Indian professional reviewing credit score report and financial progress',
          metaTitle: 'How to Rebuild CIBIL Score After Loan Settlement | Settle Loan Expert',
          metaDescription: 'A practical, realistic step-by-step roadmap to rehabilitate your credit score after a debt settlement in India.',
          published: true,
        },
      ],
    });
    console.log('Seeded 4 educational blog posts.');
  }

  // 3. Realistic FAQs
  const existingFaqs = await prisma.fAQ.count();
  if (existingFaqs === 0) {
    await prisma.fAQ.createMany({
      data: [
        {
          question: 'What is loan settlement and how does it work?',
          answer: 'Loan settlement (One-Time Settlement / OTS) is an agreement between a borrower experiencing proven financial distress and their lender. The lender agrees to waive a portion of the accumulated interest, penalties, and outstanding principal in exchange for a mutually agreed lump-sum or structured compromise payment to terminate the obligation.',
          category: 'Settlement',
          order: 1,
          isActive: true,
        },
        {
          question: 'Can every type of loan be settled?',
          answer: 'Unsecured debts such as credit cards and personal loans are the most common candidates for settlement when borrowers face genuine financial hardship. Secured loans (home loans, auto loans) are usually backed by physical collateral, meaning lenders prioritize asset recovery or loan restructuring over unsecured settlements.',
          category: 'Settlement',
          order: 2,
          isActive: true,
        },
        {
          question: 'Does loan settlement affect my credit score?',
          answer: 'Yes. When a loan is settled for less than the contractual balance, the lender reports the account status as "Settled" to credit bureaus like CIBIL, Experian, and Equifax. This temporarily lowers your credit score. However, once settled, recovery actions cease, and you can systematically rebuild your score over 12–24 months using secured credit products.',
          category: 'Legal & Credit',
          order: 3,
          isActive: true,
        },
        {
          question: 'Is loan settlement the same as regular loan closure?',
          answer: 'No. In a regular loan closure, the borrower pays the entire contractual principal and interest to zero, resulting in a "Closed" bureau status. In a settlement, a discount or waiver is granted, resulting in a "Settled" remark. Both formally discharge the borrower from further legal claims by the lender.',
          category: 'Settlement',
          order: 4,
          isActive: true,
        },
        {
          question: 'What documents are required to initiate an assessment?',
          answer: 'Typically required documents include: (1) Copy of loan account statements or credit card bills, (2) Proof of identity and address (Aadhaar, PAN), (3) Proof of financial hardship (such as medical records, salary slips, termination letters, or business bank statements), and (4) Communication received from the lender or recovery agencies.',
          category: 'Process',
          order: 5,
          isActive: true,
        },
        {
          question: 'How long does the loan settlement process usually take?',
          answer: 'The timeframe varies based on the lender, debt age, and borrower circumstances. On average, case evaluations, documentation, and formal bank negotiations take between 4 to 12 weeks. Every bank has internal approval committees that review hardship compromises according to their settlement matrices.',
          category: 'Process',
          order: 6,
          isActive: true,
        },
        {
          question: 'Do you guarantee a specific settlement amount or waiver percentage?',
          answer: 'No legitimate advisory can guarantee a fixed percentage or outcome. The final settlement amount is entirely at the discretion of the lending institution based on your verified hardship, the age of the delinquency, and institutional credit policy. We advocate for the best feasible terms and guide you through the process transparently.',
          category: 'Fees',
          order: 7,
          isActive: true,
        },
        {
          question: 'What should I do if recovery agents call or visit inappropriately?',
          answer: 'The RBI Fair Practices Code strictly prohibits threats, uncivil language, contact before 8:00 AM or after 7:00 PM, and contacting unrelated third parties. If you face harassment, request the agent’s bank identity card, maintain date/time logs, and report the conduct to your advisor and the bank’s Principal Nodal Officer.',
          category: 'Legal & Credit',
          order: 8,
          isActive: true,
        },
      ],
    });
    console.log('Seeded 8 realistic FAQs.');
  }

  // 4. Testimonials
  const existingTestimonials = await prisma.testimonial.count();
  if (existingTestimonials === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          clientName: 'Rajesh K.',
          location: 'Gurugram, Haryana',
          loanType: 'Personal Loan & Credit Card',
          story: 'Following a severe medical emergency and income loss, my credit card and personal loan dues accumulated rapidly. The guidance from Settle Loan Expert helped me understand my legal rights and negotiate an affordable one-time settlement without intimidation.',
          outcome: 'Settlement executed with official bank NOC received.',
          isVerified: true,
          isActive: true,
        },
        {
          clientName: 'Meera S.',
          location: 'Pune, Maharashtra',
          loanType: 'Multiple Unsecured Loans',
          story: 'I was overwhelmed by relentless recovery calls. The team walked me through the RBI Fair Practices Code and helped present my financial hardship systematically to the bank nodal officers.',
          outcome: 'Debt restructured into manageable structured compromise.',
          isVerified: true,
          isActive: true,
        },
        {
          clientName: 'Vikram N.',
          location: 'Bengaluru, Karnataka',
          loanType: 'Credit Card Debt',
          story: 'The compound interest on three cards made it impossible to pay down the principal. Settle Loan Expert provided realistic advice without false promises. Everything was documented in writing before paying.',
          outcome: 'Achieved formal written settlement letters from both banks.',
          isVerified: true,
          isActive: true,
        },
      ],
    });
    console.log('Seeded 3 verified testimonials.');
  }

  // 5. Site Settings
  const settings = [
    { key: 'company_name', value: 'Settle Loan Expert' },
    { key: 'support_phone', value: '+91 88609 41586' },
    { key: 'support_email', value: 'support@settleloanexpert.in' },
    { key: 'office_hours', value: 'Mon–Sat: 10:00 AM – 7:00 PM IST' },
    { key: 'head_office', value: 'Spaze iTech Park, Sohna Road, Sector 49, Gurugram, Haryana 122018, India' },
    { key: 'zoho_form_url', value: 'https://forms.zohopublic.in/rddslegalsolutionsopcprivatel1/form/InquiryForm/formperma/HyvqgErILmK-RGLlxZhGBqi2leGDhXEjXaAgyI5RegI' },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log('Site settings initialized.');

  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
