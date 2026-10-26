import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BRAND } from "@/lib/constants";
import {
  FileText,
  Search,
  Scale,
  FileCheck2,
  ShieldCheck,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works | 4-Step Debt Advisory Framework | Settle Loan Expert",
  description:
    "Learn the systematic 4-step process of debt assessment, options analysis, bank negotiation, and written settlement confirmation at Settle Loan Expert.",
};

export default function HowItWorksPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Banner */}
      <div className="bg-brand-navy py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ name: "How It Works" }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            How It Works: Our 4-Step Resolution Framework
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            A structured, transparent roadmap from initial distress assessment to
            achieving formal, legally binding bank settlement letters.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Step 1 */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-border shadow-card flex flex-col md:flex-row gap-6 items-start">
          <div className="w-14 h-14 rounded-2xl bg-brand-navy text-white text-xl font-bold flex items-center justify-center shrink-0">
            01
          </div>
          <div className="space-y-3 flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald">
              Phase 1: Confidential Intake
            </span>
            <h2 className="text-xl font-bold text-brand-navy">
              Share Your Financial Situation
            </h2>
            <p className="text-sm text-brand-text leading-relaxed">
              Submit your enquiry via our online evaluation form or request an immediate
              callback. Provide basic details about your loan types (credit card,
              personal loan, business debt), total estimated outstanding amount, and the
              nature of your financial distress.
            </p>
            <div className="bg-brand-surface p-3.5 rounded-xl border border-brand-border/60 text-xs text-brand-text">
              <strong>Data Safety Guarantee:</strong> All submissions are encrypted via 256-bit SSL and handled under strict confidentiality agreements.
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-border shadow-card flex flex-col md:flex-row gap-6 items-start">
          <div className="w-14 h-14 rounded-2xl bg-brand-emerald text-white text-xl font-bold flex items-center justify-center shrink-0">
            02
          </div>
          <div className="space-y-3 flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald">
              Phase 2: Case Evaluation
            </span>
            <h2 className="text-xl font-bold text-brand-navy">
              Initial Case Assessment & Hardship Verification
            </h2>
            <p className="text-sm text-brand-text leading-relaxed">
              Our debt resolution consultants review your financial records (loan
              statements, default notices, medical or income documents) to determine
              whether your situation meets the threshold for institutional One-Time
              Settlement (OTS) or loan restructuring.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-border shadow-card flex flex-col md:flex-row gap-6 items-start">
          <div className="w-14 h-14 rounded-2xl bg-brand-navy text-white text-xl font-bold flex items-center justify-center shrink-0">
            03
          </div>
          <div className="space-y-3 flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald">
              Phase 3: Advisory & Options Briefing
            </span>
            <h2 className="text-xl font-bold text-brand-navy">
              Understand Your Options, Risks & Limitations
            </h2>
            <p className="text-sm text-brand-text leading-relaxed">
              We present a clear, unbiased picture of available options. We explicitly
              discuss potential savings, credit bureau reporting impacts (the
              &quot;Settled&quot; remark on CIBIL), expected timelines (4–12 weeks),
              and transparent advisory fees.
            </p>
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>No Obligations:</strong> You proceed with formal representation only if you are fully satisfied with the strategy and agree to terms in writing.
              </span>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-border shadow-card flex flex-col md:flex-row gap-6 items-start">
          <div className="w-14 h-14 rounded-2xl bg-brand-emerald text-white text-xl font-bold flex items-center justify-center shrink-0">
            04
          </div>
          <div className="space-y-3 flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald">
              Phase 4: Execution & Settlement
            </span>
            <h2 className="text-xl font-bold text-brand-navy">
              Formal Negotiation, Written Sanction Letter & NOC
            </h2>
            <p className="text-sm text-brand-text leading-relaxed">
              We engage with the creditor&apos;s settlement desk and submit formal
              hardship representation. Once the lender sanctions the settlement, they
              issue an official written settlement letter on the bank&apos;s letterhead.
              Payment is made directly to the bank loan account, followed by receipt of
              the No Dues / Settlement Certificate.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-brand-navy rounded-2xl p-8 sm:p-10 text-white text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">
            Ready to Explore Your Debt Options?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Take the first step towards resolving your loan stress. Speak with an
            experienced consultant today.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              href="/free-consultation"
              className="px-6 py-3.5 bg-brand-emerald hover:bg-brand-emerald-dark text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              Start Free Confidential Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
