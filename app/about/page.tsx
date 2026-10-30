import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BRAND } from "@/lib/constants";
import {
  ShieldCheck,
  Scale,
  Users,
  Target,
  FileCheck2,
  Lock,
  ArrowRight,
  HeartHandshake,
  BadgeCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Ethical Debt Advisory & Settlement Guidance India",
  description:
    "Learn about Settle Loan Expert's mission, our commitment to borrower dignity, and how we assist overburdened individuals under RBI fair recovery frameworks.",
};

export default function AboutPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Top Banner with Breadcrumbs */}
      <div className="bg-brand-navy py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ name: "About Us" }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            About Settle Loan Expert
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Dedicated to helping Indian borrowers navigate severe debt distress with
            professional dignity, legal clarity, and ethical advisory standards.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald">
              Our Founding Purpose
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-heading">
              Restoring Peace of Mind for Stressed Borrowers
            </h2>
            <div className="text-sm sm:text-base text-brand-text leading-relaxed space-y-4">
              <p>
                In the Indian credit market, sudden unforeseen life shocks—such as
                catastrophic medical expenses, sudden job loss, or small business
                failures—can quickly plunge honest, hardworking borrowers into a debt
                spiral. High interest rates, compound penalties, and unyielding recovery
                demands frequently cause intense emotional trauma.
              </p>
              <p>
                <strong>Settle Loan Expert</strong> was established to bridge the gap
                between overwhelmed borrowers and formal banking resolution frameworks.
                We believe that financial distress is an economic reality, not a moral
                failing.
              </p>
              <p>
                We provide borrowers with a calm, confidential, and legally grounded
                environment to understand their rights under the Reserve Bank of
                India&apos;s Fair Practices Code, evaluate one-time settlement (OTS) options,
                and negotiate sustainable compromise agreements directly with banks.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-[360px] sm:h-[420px] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="/images/counselling.jpg"
                alt="Compassionate financial counselling for Indian borrower"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-brand-border shadow-card space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald">
              Our Principles
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-brand-navy">
              The Guiding Pillars of Our Service
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3 p-5 rounded-xl bg-brand-surface border border-brand-border/60">
              <div className="w-10 h-10 rounded-lg bg-brand-mint text-brand-emerald flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-brand-navy">
                Absolute Confidentiality
              </h4>
              <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                Your debt details, financial records, and communications remain strictly
                protected. We never share your data with unauthorized third parties or
                employers.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-xl bg-brand-surface border border-brand-border/60">
              <div className="w-10 h-10 rounded-lg bg-brand-mint text-brand-emerald flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-brand-navy">
                Legal & Regulatory Integrity
              </h4>
              <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                All strategies strictly adhere to Reserve Bank of India (RBI) circulars,
                banking ombudsman mechanisms, and contract law. We do not promote evasion
                or fraudulent tactics.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-xl bg-brand-surface border border-brand-border/60">
              <div className="w-10 h-10 rounded-lg bg-brand-mint text-brand-emerald flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-brand-navy">
                Written Documentation Only
              </h4>
              <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                We demand formal settlement sanction letters on the creditor&apos;s
                official letterhead before any settlement payment is made, ensuring no
                ambiguity or residual claims.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Leadership & Editorial Standards */}
        <div id="editorial-board" className="bg-white rounded-2xl p-8 sm:p-10 border border-brand-border shadow-card space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald">
              Legal Leadership &amp; Advisory Panel
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-brand-navy">
              Experienced Minds Behind Our Debt Resolution Practice
            </h3>
            <p className="text-xs sm:text-sm text-brand-text">
              Our advice is authored and vetted by legal professionals who understand both banking statutes and the human cost of debt distress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-brand-surface border border-brand-border/70 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-brand-mint text-brand-emerald flex items-center justify-center font-bold text-xl shrink-0 border border-brand-border">
                  RV
                </div>
                <div>
                  <h4 className="text-base font-bold text-brand-navy">Adv. Rajesh Verma</h4>
                  <p className="text-xs text-brand-emerald font-semibold">
                    Senior Banking Law Advocate &bull; B.A. LL.B.
                  </p>
                  <span className="text-[11px] text-slate-500">Bar Council of Delhi &bull; 14+ Years Advisory</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                Specialist in RBI Fair Practices Code enforcement, SARFAESI Act borrower defense, and institutional One-Time Settlement (OTS) negotiations. Adv. Verma has advised over 3,500 debtors in securing legal immunity against unfair collection harassment.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-brand-surface border border-brand-border/70 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-blue-50 text-brand-navy flex items-center justify-center font-bold text-xl shrink-0 border border-blue-200">
                  EB
                </div>
                <div>
                  <h4 className="text-base font-bold text-brand-navy">Editorial &amp; Legal Review Board</h4>
                  <p className="text-xs text-brand-emerald font-semibold">
                    Fact-Checking &amp; Regulatory Verification
                  </p>
                  <span className="text-[11px] text-slate-500">RBI Master Directions &amp; Consumer Protection</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                Our multidisciplinary review team includes former banking collection managers and consumer finance researchers who verify all published advisory guides against the latest RBI circulars and judicial precedents.
              </p>
              <div className="pt-2">
                <Link
                  href="/editorial-policy"
                  className="text-xs font-bold text-brand-emerald hover:underline inline-flex items-center gap-1"
                >
                  Read Our Editorial Standards &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Box */}
        <div className="bg-brand-navy rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Need Confidential Guidance on Your Loans?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Speak with a dedicated advisor today. We will review your loan agreements
              and help you evaluate feasible next steps.
            </p>
          </div>
          <Link
            href="/free-consultation"
            className="px-6 py-3.5 rounded-xl bg-brand-emerald hover:bg-brand-emerald-dark text-white font-bold text-sm shrink-0 shadow-sm transition-all flex items-center gap-2"
          >
            Book Free Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
