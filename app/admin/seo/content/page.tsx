"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  FileText,
  ExternalLink,
  Copy,
  Send,
  CheckCircle2,
  BookOpen,
  Scale,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const LINKABLE_ASSETS = [
  {
    title: "RBI Fair Practices Code & Borrower Protections Against Recovery Harassment",
    slug: "rbi-fair-practices-code-borrower-rights",
    canonicalUrl: "https://settleloanexpert.in/blog/rbi-fair-practices-code-borrower-rights",
    category: "Banking Compliance & Consumer Rights",
    icon: Scale,
    summary:
      "A comprehensive legal examination of RBI Circular RBI/2022-23/108 specifying lawful recovery hours (8 AM - 7 PM), strict privacy limits preventing family harassment, and the exact process to register complaints on the RBI CMS Ombudsman portal.",
    targetAudiences: ["Legal publishers (LiveLaw, Bar and Bench)", "Consumer advocacy groups (Moneylife)", "Mainstream business news journalists"],
    hookStats: [
      "Recovery calls legally restricted to 8:00 AM to 7:00 PM only.",
      "Harassment of third-party contacts or family members is an explicit regulatory breach.",
      "Complaints eligible for immediate RBI Ombudsman escalation if lender fails to resolve within 30 days.",
    ],
  },
  {
    title: "Understanding Loan Settlement in India: Legal & Financial Guide to One-Time Settlement (OTS)",
    slug: "understanding-loan-settlement-in-india-guide",
    canonicalUrl: "https://settleloanexpert.in/blog/understanding-loan-settlement-in-india-guide",
    category: "Financial Literacy & Debt Relief",
    icon: BookOpen,
    summary:
      "Detailed consumer guide distinguishing between loan closure and settlement, warning against fake OTS letters issued by unauthorized collection agencies, and detailing the mandatory No Dues Certificate (NOC) issuance protocol.",
    targetAudiences: ["Personal finance blogs (JagoInvestor, SubraMoney)", "Chartered Accountant & tax portals (TaxGuru)", "Consumer awareness forums"],
    hookStats: [
      "Authentic settlement funds are NEVER payable to personal or third-party bank accounts.",
      "An irrevocable written OTS letter on official lender letterhead must precede any payment.",
      "A formal NOC / NDC certificate is legally required to close the debt ledger.",
    ],
  },
  {
    title: "Rebuilding CIBIL Score After 'Settled' Status: A Realistic 12-24 Month Roadmap",
    slug: "rebuilding-cibil-score-post-settlement",
    canonicalUrl: "https://settleloanexpert.in/blog/rebuilding-cibil-score-post-settlement",
    category: "Credit Bureau Education",
    icon: TrendingUp,
    summary:
      "Honest, myth-busting analysis explaining why 'instant credit repair' services are scams, what 'Settled' remarks truly mean on TransUnion CIBIL, Experian, CRIF, and Equifax reports, and how to rebuild to 750+ through secured credit lines.",
    targetAudiences: ["Fintech platforms & personal finance media", "Banking podcast hosts", "Consumer credit educators"],
    hookStats: [
      "Credit repair agencies claiming instant remark erasure are fraudulent under Indian law.",
      "Secured credit cards against Fixed Deposits (FD) offer the most reliable rebuilding path.",
      "Consistent 100% on-time repayment can lift credit scores above 750 within 18 to 24 months.",
    ],
  },
  {
    title: "Escaping the Credit Card Debt Spiral: Strategic Resolution in India",
    slug: "credit-card-debt-resolution-strategies",
    canonicalUrl: "https://settleloanexpert.in/blog/credit-card-debt-resolution-strategies",
    category: "Personal Finance & Debt Management",
    icon: ShieldCheck,
    summary:
      "Mathematical breakdown of minimum amount due traps (36-45% APR compounding), analyzing balance transfer vs. personal loan consolidation vs. hardship settlement options for distressed salaried professionals.",
    targetAudiences: ["Salaried employee personal finance columns", "Urban lifestyle & personal finance websites", "MSME entrepreneur resources"],
    hookStats: [
      "Paying only the Minimum Amount Due can extend repayment past 15-20 years due to finance charges.",
      "GST of 18% is levied continuously on credit card interest charges.",
      "Hardship settlement is mathematically justified when total debt exceeds 50% of annual net income.",
    ],
  },
];

export default function ContentPromotionPage() {
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-brand-navy">Linkable Content Assets & Angles</h1>
            <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
              White-Hat Link Magnets
            </span>
          </div>
          <p className="text-sm text-brand-muted mt-1">
            Authoritative, citation-worthy educational content designed to earn legitimate editorial backlinks and journalistic mentions.
          </p>
        </div>

        <Link
          href="/admin/seo/outreach"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark shadow-sm transition-colors"
        >
          <Send className="w-4 h-4" />
          <span>Launch Outreach with Asset</span>
        </Link>
      </div>

      {/* Asset Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LINKABLE_ASSETS.map((asset) => {
          const Icon = asset.icon;
          return (
            <div
              key={asset.slug}
              className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm flex flex-col justify-between hover:border-brand-emerald transition-all"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-surface text-brand-navy border border-brand-border">
                    {asset.category}
                  </span>
                  <div className="p-2 rounded-xl bg-emerald-50 text-brand-emerald">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-brand-navy mt-3 leading-snug">
                  {asset.title}
                </h3>

                <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                  {asset.summary}
                </p>

                {/* Key Hook Points */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-brand-navy uppercase tracking-wider mb-2">
                    Key Citations & Data Points:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {asset.hookStats.map((stat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                        <span>{stat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Target Publishers */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                    Recommended Outreach Prospects:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {asset.targetAudiences.map((aud, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {aud}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href={`/blog/${asset.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-emerald font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>View Public Article</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyText(asset.canonicalUrl)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-brand-navy hover:bg-slate-100 transition-colors"
                    title="Copy Canonical URL"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    href={`/admin/seo/outreach`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-emerald/10 text-brand-emerald hover:bg-brand-emerald hover:text-white transition-colors"
                  >
                    <Send className="w-3 h-3" />
                    <span>Pitch Editors</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
