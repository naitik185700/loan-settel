import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BRAND } from "@/lib/constants";
import {
  ShieldCheck,
  FileCheck2,
  Scale,
  Award,
  RefreshCw,
  Users,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Editorial Policy & Verification Standards | Settle Loan Expert",
  description:
    "Our editorial standards, fact-checking methodology, and legal compliance principles under Reserve Bank of India (RBI) borrower protection guidelines.",
  alternates: {
    canonical: "https://settleloanexpert.in/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero Header */}
      <div className="bg-brand-navy py-12 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ name: "Editorial Policy" }]} />
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald-light">
              Trust &amp; Transparency
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Editorial Policy &amp; Review Standards
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            At Settle Loan Expert, our mission is to deliver accurate, ethical, and legally grounded debt resolution guidance for Indian borrowers facing acute financial distress.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-slate-700">
            <span>Published: January 15, 2024</span>
            <span>•</span>
            <span>Last Verified &amp; Updated: October 30, 2026</span>
            <span>•</span>
            <span className="text-brand-emerald-light font-medium">Status: In Effect</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-brand-border shadow-card space-y-10 text-sm sm:text-base text-brand-text leading-relaxed">
          {/* Executive Summary Callout */}
          <div className="p-5 bg-brand-mint/60 rounded-xl border border-brand-border flex items-start gap-3.5">
            <ShieldCheck className="w-6 h-6 text-brand-emerald shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="text-sm sm:text-base font-bold text-brand-navy">
                Our Core Editorial Commitment
              </h2>
              <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                Every guide, advisory piece, and regulatory summary published on {BRAND.name} is authored or reviewed by qualified Indian legal advocates and debt resolution specialists. We adhere strictly to the Reserve Bank of India (RBI) Fair Practices Code and do not publish sensational, misleading, or unsubstantiated debt relief claims.
              </p>
            </div>
          </div>

          {/* Section 1: Authorship & Expertise */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-brand-emerald" />
              <h2 className="text-lg sm:text-xl font-bold text-brand-navy">
                1. Author Qualifications &amp; Subject-Matter Expertise
              </h2>
            </div>
            <p>
              Content regarding loan restructuring, One-Time Settlement (OTS), credit score impact, and borrower rights is produced by professionals with specialized backgrounds in banking law, consumer rights advocacy, or institutional debt advisory:
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm list-disc pl-5">
              <li>
                <strong>Legal Reviewers:</strong> Advocates registered with the Bar Council of India with practical experience in the Banking Ombudsman Scheme, the SARFAESI Act, and Section 138 Negotiable Instruments Act dispute resolution.
              </li>
              <li>
                <strong>Financial Advisors:</strong> Certified counsellors experienced in retail banking collections, credit bureau scoring dynamics (CIBIL, Experian), and personal cashflow budgeting.
              </li>
              <li>
                <strong>Attribution:</strong> All substantive financial guides display author bylines, credentials, and date of last factual review.
              </li>
            </ul>
          </section>

          {/* Section 2: Fact-Checking & Regulatory Grounding */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <FileCheck2 className="w-5 h-5 text-brand-emerald" />
              <h2 className="text-lg sm:text-xl font-bold text-brand-navy">
                2. Rigorous Fact-Checking &amp; Regulatory Alignment
              </h2>
            </div>
            <p>
              To ensure accuracy, our editorial board cross-references all claims against official primary sources, including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span className="font-bold text-brand-navy block mb-1">RBI Master Directions</span>
                Circulars on Fair Practices Code for NBFCs and Commercial Banks, Recovery Agent guidelines, and Outsourcing of Financial Services.
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span className="font-bold text-brand-navy block mb-1">Judicial Precedents</span>
                Binding rulings of the Hon&apos;ble Supreme Court of India and High Courts concerning harassment in debt recovery and borrower dignity.
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span className="font-bold text-brand-navy block mb-1">Banking Ombudsman Norms</span>
                Reserve Bank - Integrated Ombudsman Scheme, 2021 protocols for unfair lending practices and procedural grievances.
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span className="font-bold text-brand-navy block mb-1">Credit Information Bureaus</span>
                Official reporting frameworks established by TransUnion CIBIL, Experian, Equifax, and CRIF High Mark.
              </div>
            </div>
          </section>

          {/* Section 3: Independence & No Conflict of Interest */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-brand-emerald" />
              <h2 className="text-lg sm:text-xl font-bold text-brand-navy">
                3. Editorial Independence &amp; Ethical Boundaries
              </h2>
            </div>
            <p>
              Our editorial content is created independently of any lending institution, recovery agency, or commercial partner:
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm list-disc pl-5">
              <li>
                <strong>No Undisclosed Sponsorships:</strong> We do not publish paid native advertisements, undisclosed sponsored posts, or biased promotional material.
              </li>
              <li>
                <strong>Realistic Expectations:</strong> We explicitly reject misleading claims such as &quot;100% debt erasure without consequences&quot; or &quot;instant CIBIL score repair.&quot; We clearly communicate that settlements result in a &quot;Settled&quot; credit bureau mark.
              </li>
              <li>
                <strong>Consumer Dignity First:</strong> We never promote aggressive or illegal tactics against lenders. Our guidance focuses strictly on lawful negotiation, documented financial hardship, and institutional settlement mechanisms.
              </li>
            </ul>
          </section>

          {/* Section 4: Routine Updates & Modifications */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <RefreshCw className="w-5 h-5 text-brand-emerald" />
              <h2 className="text-lg sm:text-xl font-bold text-brand-navy">
                4. Routine Audit &amp; Content Maintenance
              </h2>
            </div>
            <p>
              Indian financial regulations evolve continuously. Our research desk conducts bi-monthly audits of all published content to reflect:
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm list-disc pl-5">
              <li>New Reserve Bank of India policy notifications and benchmark repo rate changes.</li>
              <li>Updated contact procedures for banking ombudsman and internal grievance cells.</li>
              <li>Revisions to institutional One-Time Settlement (OTS) schemes and compromise frameworks.</li>
            </ul>
          </section>

          {/* Section 5: Correction & Feedback Policy */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-brand-emerald" />
              <h2 className="text-lg sm:text-xl font-bold text-brand-navy">
                5. Corrections &amp; Public Feedback
              </h2>
            </div>
            <p>
              We welcome reader scrutiny. If you spot an inaccuracy, outdated statutory reference, or have feedback regarding our educational guides, please contact our editorial desk directly at{" "}
              <a href={`mailto:${BRAND.email}`} className="text-brand-emerald font-semibold underline">
                {BRAND.email}
              </a>
              . Verified factual errors are amended within 48 hours of reporting.
            </p>
          </section>

          {/* Related Links Box */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-4 text-xs font-semibold">
            <Link href="/about" className="text-brand-emerald hover:underline">
              About Our Advisory Team →
            </Link>
            <Link href="/disclaimer" className="text-brand-emerald hover:underline">
              Legal &amp; Regulatory Disclaimer →
            </Link>
            <Link href="/grievance-redressal" className="text-brand-emerald hover:underline">
              Grievance Redressal →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
