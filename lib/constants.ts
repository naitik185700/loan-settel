export const BRAND = {
  name: "Settle Loan Expert",
  legalEntity: "Settle Loan Expert Advisory Services",
  tagline: "Take Control of Your Debt. Explore Your Options.",
  shortDescription:
    "Confidential, ethical guidance on debt settlement, credit card relief, and structured repayment solutions under RBI guidelines in India.",
  phone: "+91 88609 41586",
  email: "info@settleloanexpert.in",
  infoEmail: "info@settleloanexpert.in",
  hours: "Monday – Saturday: 10:00 AM – 7:00 PM IST",
  address: "Sector 49, Sohna Road, Gurugram, Haryana 122018, India",
  zohoFormUrl:
    process.env.NEXT_PUBLIC_ZOHO_FORM_URL &&
    process.env.NEXT_PUBLIC_ZOHO_FORM_URL.includes("/formperma/")
      ? process.env.NEXT_PUBLIC_ZOHO_FORM_URL
      : "https://forms.zohopublic.in/rddslegalsolutionsopcprivatel1/form/InquiryForm/formperma/HyvqgErILmK-RGLlxZhGBqi2leGDhXEjXaAgyI5RegI",
  colors: {
    navy: "#173447",
    darkNavy: "#102B3C",
    emerald: "#168963",
    mint: "#F0F8F5",
    surface: "#F7F9FA",
    text: "#465562",
    border: "#DFE7E9",
  },
};

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Services",
    href: "/services/loan-settlement",
    children: [
      {
        name: "Loan Settlement Assistance",
        href: "/services/loan-settlement",
        description: "Negotiate one-time settlements with banks for unsecured loans.",
      },
      {
        name: "Credit Card Debt Settlement",
        href: "/services/credit-card-debt-settlement",
        description: "Halt compounding finance charges and close high-interest cards.",
      },
      {
        name: "Personal Loan Settlement",
        href: "/services/personal-loan-settlement",
        description: "Comprehensive resolution strategies for delinquent personal loans.",
      },
      {
        name: "Business Loan Assistance",
        href: "/services/business-loan-assistance",
        description: "MSME and commercial debt restructuring guidance for entrepreneurs.",
      },
      {
        name: "Debt Counselling & Guidance",
        href: "/services/debt-counselling-repayment-guidance",
        description: "Personalized cashflow restructuring and anti-harassment advice.",
      },
    ],
  },
  { name: "How It Works", href: "/how-it-works" },
  { name: "FAQs", href: "/faqs" },
  { name: "Guides", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export const FOOTER_SERVICES = [
  { name: "Loan Settlement Assistance", href: "/services/loan-settlement" },
  { name: "Credit Card Debt Relief", href: "/services/credit-card-debt-settlement" },
  { name: "Personal Loan Resolution", href: "/services/personal-loan-settlement" },
  { name: "Business Debt Restructuring", href: "/services/business-loan-assistance" },
  { name: "Debt Repayment Planning", href: "/services/debt-counselling-repayment-guidance" },
  { name: "Free Debt Consultation", href: "/free-consultation" },
];

export const FOOTER_COMPANY = [
  { name: "About Settle Loan Expert", href: "/about" },
  { name: "How Our Process Works", href: "/how-it-works" },
  { name: "Frequently Asked Questions", href: "/faqs" },
  { name: "Financial Knowledgebase", href: "/blog" },
  { name: "Editorial Policy", href: "/editorial-policy" },
  { name: "Contact Our Advisors", href: "/contact" },
  { name: "Grievance Redressal", href: "/grievance-redressal" },
];

export const FOOTER_LEGAL = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
  { name: "Editorial Policy", href: "/editorial-policy" },
  { name: "Legal Disclaimer", href: "/disclaimer" },
  { name: "Anti-Harassment Rights", href: "/blog/rbi-fair-practices-code-borrower-rights" },
  { name: "Grievance Officer", href: "/grievance-redressal" },
];
