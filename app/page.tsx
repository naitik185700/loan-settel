import React from "react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { BRAND } from "@/lib/constants";
import EnquiryForm from "@/components/EnquiryForm";
import HomeZohoSection from "@/components/HomeZohoSection";
import FAQAccordion from "@/components/FAQAccordion";
import {
  ShieldCheck,
  ArrowRight,
  CreditCard,
  Building2,
  UserCheck,
  TrendingUp,
  FileCheck2,
  Scale,
  Lock,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  BadgeCheck,
  Compass,
  FileText,
} from "lucide-react";

export const revalidate = 60; // ISR cache revalidation every 60s

export default async function HomePage() {
  // Fetch dynamic FAQs and Testimonials
  const [faqs, testimonials] = await Promise.all([
    prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      take: 8,
    }),
    prisma.testimonial.findMany({
      where: { isActive: true },
      take: 3,
    }),
  ]);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-16 bg-gradient-to-b from-brand-mint/60 via-white to-brand-surface overflow-hidden border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald text-xs font-semibold tracking-wide">
                <ShieldCheck className="w-4 h-4" />
                RBI Compliant Advisory • Confidential Debt Relief
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-heading leading-[1.15] tracking-tight">
                Take Control of Your Debt.{" "}
                <span className="text-brand-emerald">Explore Your Options.</span>
              </h1>

              <p className="text-base sm:text-lg text-brand-text leading-relaxed max-w-2xl">
                Get guidance on loan settlement and debt repayment options based on
                your financial circumstances. Our team can help you understand the
                process, potential outcomes, and next steps under Indian banking
                regulations.
              </p>

              {/* Trust statement */}
              <div className="pt-1 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-brand-muted font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                  Confidential Enquiries
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                  Clear Guidance
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                  Transparent Process
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  href="/free-consultation"
                  className="inline-flex justify-center items-center gap-2.5 px-6 py-3.5 rounded-xl bg-brand-emerald hover:bg-brand-emerald-dark text-white font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all"
                >
                  Request a Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#services"
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-brand-mint text-brand-navy border border-brand-border font-semibold text-sm sm:text-base shadow-card transition-all"
                >
                  Explore Our Services
                </a>
              </div>

              {/* Notice */}
              <p className="text-[11px] text-slate-400 leading-normal pt-1">
                * We do not provide loans or promise guaranteed loan waivers. Settlements depend on bank discretion and verified hardship.
              </p>
            </div>

            {/* Right Column: Authentic Image with Card Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative h-[380px] sm:h-[440px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="/images/hero-consultation.jpg"
                    alt="Senior Indian financial advisor in consultation with client"
                    fill
                    priority
                    loading="eager"
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white p-3.5 bg-brand-navy-900/80 backdrop-blur-md rounded-xl border border-white/20">
                    <p className="text-xs font-semibold text-brand-emerald-light">
                      Senior Debt Advisory Desk
                    </p>
                    <p className="text-xs text-slate-200 mt-0.5">
                      Personalized consultation evaluating loans across Indian banks & NBFCs.
                    </p>
                  </div>
                </div>

                {/* Floating pill badge */}
                <div className="absolute -top-4 -left-4 bg-white p-3 rounded-xl shadow-lg border border-brand-border hidden sm:flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-brand-mint flex items-center justify-center text-brand-emerald">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-navy">Fair Debt Advice</div>
                    <div className="text-[11px] text-brand-muted">RBI Fair Practices Code</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald">
            Comprehensive Debt Advisory
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-heading">
            Tailored Solutions for Your Financial Hardship
          </h2>
          <p className="text-sm sm:text-base text-brand-text">
            Every debt situation is unique. We provide structured guidance based on
            your specific loan portfolio, income disruptions, and legal protections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service Card 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover border border-brand-border transition-all duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-mint text-brand-emerald flex items-center justify-center group-hover:bg-brand-emerald group-hover:text-white transition-colors">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-emerald transition-colors">
                Loan Settlement Assistance
              </h3>
              <p className="text-sm text-brand-text leading-relaxed">
                Step-by-step guidance on negotiating a One-Time Settlement (OTS) with
                scheduled banks and NBFCs for delinquent unsecured debts with written approvals.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/services/loan-settlement"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald hover:text-brand-emerald-dark"
              >
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover border border-brand-border transition-all duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-mint text-brand-emerald flex items-center justify-center group-hover:bg-brand-emerald group-hover:text-white transition-colors">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-emerald transition-colors">
                Credit Card Debt Assistance
              </h3>
              <p className="text-sm text-brand-text leading-relaxed">
                Halt compounding finance charges (36%–48% APR), penal interest, and
                explore formal compromise settlements or restructured EMI conversions.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/services/credit-card-debt-settlement"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald hover:text-brand-emerald-dark"
              >
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Service Card 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover border border-brand-border transition-all duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-mint text-brand-emerald flex items-center justify-center group-hover:bg-brand-emerald group-hover:text-white transition-colors">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-emerald transition-colors">
                Personal Loan Guidance
              </h3>
              <p className="text-sm text-brand-text leading-relaxed">
                Structured legal and financial evaluation for personal loan defaults
                arising from medical emergencies, job loss, or acute income depletion.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/services/personal-loan-settlement"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald hover:text-brand-emerald-dark"
              >
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Service Card 4 */}
          <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover border border-brand-border transition-all duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-mint text-brand-emerald flex items-center justify-center group-hover:bg-brand-emerald group-hover:text-white transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-emerald transition-colors">
                Business Loan Assistance
              </h3>
              <p className="text-sm text-brand-text leading-relaxed">
                Advisory for MSME founders and proprietors grappling with working
                capital defaults, collateral exposure, and commercial loan restructuring.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/services/business-loan-assistance"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald hover:text-brand-emerald-dark"
              >
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Service Card 5 */}
          <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover border border-brand-border transition-all duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-mint text-brand-emerald flex items-center justify-center group-hover:bg-brand-emerald group-hover:text-white transition-colors">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-emerald transition-colors">
                Debt Repayment Planning
              </h3>
              <p className="text-sm text-brand-text leading-relaxed">
                Detailed cashflow analysis, expense prioritization, and repayment
                sequencing to prevent default and minimize long-term credit damage.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/services/debt-counselling-repayment-guidance"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald hover:text-brand-emerald-dark"
              >
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Service Card 6 */}
          <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover border border-brand-border transition-all duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-mint text-brand-emerald flex items-center justify-center group-hover:bg-brand-emerald group-hover:text-white transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-emerald transition-colors">
                Anti-Harassment Support
              </h3>
              <p className="text-sm text-brand-text leading-relaxed">
                Understand statutory borrower protections under RBI directives. Learn
                how to handle aggressive recovery agents respectfully and lawfully.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/blog/rbi-fair-practices-code-borrower-rights"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald hover:text-brand-emerald-dark"
              >
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 EDUCATIONAL BORROWER GUIDE SECTION (Boosts Text Ratio & Readability) */}
      <section className="bg-brand-surface py-16 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald">
              Borrower Education &amp; Legal Literacy
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-heading">
              A Clear Guide to Managing Overwhelming Liabilities
            </h2>
            <p className="text-sm sm:text-base text-brand-text leading-relaxed">
              Facing financial difficulty can feel overwhelming. We provide simple, honest, and practical guidance to help you navigate banking regulations with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-brand-border space-y-3 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand-mint text-brand-emerald flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-brand-navy">
                  Your Rights as a Customer
                </h3>
                <p className="text-xs text-brand-text leading-relaxed">
                  Under the Reserve Bank of India Fair Practices Code, every customer has legal safeguards. Recovery personnel cannot contact you before 8 AM or after 7 PM. They must present proper identification and treat your family with respect at all times.
                </p>
              </div>
              <p className="text-[11px] text-brand-emerald font-semibold pt-2 border-t border-slate-100">
                ✓ Protected under RBI guidelines
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-brand-border space-y-3 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand-mint text-brand-emerald flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-brand-navy">
                  How Hardship Reviews Work
                </h3>
                <p className="text-xs text-brand-text leading-relaxed">
                  Banks recognize that genuine life challenges occur. Sudden job losses, medical emergencies, or family crises affect cash flow. During our review, we assist you in gathering genuine documentation so lenders can evaluate your case fairly.
                </p>
              </div>
              <p className="text-[11px] text-brand-emerald font-semibold pt-2 border-t border-slate-100">
                ✓ Documented hardship review
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-brand-border space-y-3 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand-mint text-brand-emerald flex items-center justify-center font-bold">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-brand-navy">
                  Evaluating Your Alternatives
                </h3>
                <p className="text-xs text-brand-text leading-relaxed">
                  Full repayment is always the primary recommendation when cash flow allows. If repayment is impossible, alternatives include tenure extensions, interest restructuring, or a negotiated one-time compromise to permanently end legal exposure.
                </p>
              </div>
              <p className="text-[11px] text-brand-emerald font-semibold pt-2 border-t border-slate-100">
                ✓ Objective options comparison
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-brand-border space-y-3 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand-mint text-brand-emerald flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-brand-navy">
                  Rebuilding Credit Steadily
                </h3>
                <p className="text-xs text-brand-text leading-relaxed">
                  Resolving delinquent accounts stops late fees and legal notices immediately. Once an official No Objection Certificate is issued by the institution, you can begin rebuilding your credit score step by step through responsible habits.
                </p>
              </div>
              <p className="text-[11px] text-brand-emerald font-semibold pt-2 border-t border-slate-100">
                ✓ Structured 12-24 month path
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="bg-white py-16 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald">
              Our Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-heading">
              How the Consultation Process Works
            </h2>
            <p className="text-sm sm:text-base text-brand-text">
              We follow a transparent, phased approach. We do not rush or force any
              settlement; every step is taken only with your informed consent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-brand-surface rounded-2xl p-6 border border-brand-border relative space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-navy text-white font-bold flex items-center justify-center text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-brand-navy">
                Share Your Situation
              </h3>
              <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                Submit an initial enquiry with basic details about your outstanding
                loans, income state, and the banks involved.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-brand-surface rounded-2xl p-6 border border-brand-border relative space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-emerald text-white font-bold flex items-center justify-center text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-brand-navy">
                Initial Assessment
              </h3>
              <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                Our debt resolution consultants evaluate your documentation to verify
                hardship credentials and determine feasible options.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-brand-surface rounded-2xl p-6 border border-brand-border relative space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-navy text-white font-bold flex items-center justify-center text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-brand-navy">
                Understand Your Options
              </h3>
              <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                We clearly explain potential benefits, CIBIL impacts, timeline
                expectations, costs, and limitations before any commitment.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-brand-surface rounded-2xl p-6 border border-brand-border relative space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-emerald text-white font-bold flex items-center justify-center text-sm">
                04
              </div>
              <h3 className="text-base font-bold text-brand-navy">
                Next Steps & Settlement
              </h3>
              <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                Proceed only after you agree. Formal written settlement letters are
                obtained directly from the creditor before payment.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-emerald transition-colors"
            >
              Read full detailed walkthrough of our 4-step framework
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald">
                Ethical Advisory Standards
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-heading">
                Why Borrowers Trust Settle Loan Expert
              </h2>
              <p className="text-sm sm:text-base text-brand-text leading-relaxed">
                We believe debt resolution should be handled with professional dignity,
                legal accuracy, and complete transparency.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-brand-border shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-brand-mint text-brand-emerald flex items-center justify-center shrink-0 mt-0.5">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-navy">
                    Clear & Honest Communication
                  </h3>
                  <p className="text-xs text-brand-text mt-0.5 leading-relaxed">
                    No misleading promises of 100% debt erasure or magical CIBIL fixes. We give you realistic expectations based on banking practices.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-brand-border shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-brand-mint text-brand-emerald flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-navy">
                    Transparent Service Structure
                  </h3>
                  <p className="text-xs text-brand-text mt-0.5 leading-relaxed">
                    Upfront clarity on advisory scope and fees. No hidden percentage commissions or undisclosed charges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-brand-border shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-brand-mint text-brand-emerald flex items-center justify-center shrink-0 mt-0.5">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-navy">
                    Strict Confidentiality & Data Security
                  </h3>
                  <p className="text-xs text-brand-text mt-0.5 leading-relaxed">
                    Your personal information, loan balances, and discussions remain entirely confidential and encrypted.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-brand-border shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-brand-mint text-brand-emerald flex items-center justify-center shrink-0 mt-0.5">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-navy">
                    Assistance Throughout the Settlement Process
                  </h3>
                  <p className="text-xs text-brand-text mt-0.5 leading-relaxed">
                    From documentation review to verifying the final bank No Objection Certificate (NOC), our team supports you every step.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Authentic Indian Advisors Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <div className="relative h-[420px] sm:h-[480px] w-full">
                <Image
                  src="/images/advisors.jpg"
                  alt="Settle Loan Expert advisory team meeting in modern boardroom"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EDUCATIONAL / CRITICAL REALITY SECTION */}
      <section className="bg-brand-mint/50 py-16 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald">
              Financial Literacy & Consumer Awareness
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-heading">
              What You Must Understand About Loan Settlement
            </h2>
            <p className="text-sm sm:text-base text-brand-text">
              We believe every borrower should make informed decisions with eyes wide
              open to both benefits and limitations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-brand-border space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-brand-navy">
                Credit Score Impact
              </h3>
              <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                When an account is settled for less than the contractual balance, the
                lender marks it as <strong>&quot;SETTLED&quot;</strong> on credit
                bureaus (CIBIL, Experian). This temporarily lowers credit scores,
                though scores can be rehabilitated over 12–24 months.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-brand-border space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-brand-mint text-brand-emerald flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-brand-navy">
                Mandatory Written Approval
              </h3>
              <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                <strong>Never pay on verbal promises</strong> from recovery agents.
                Always demand an official One-Time Settlement (OTS) letter on the
                bank&apos;s letterhead, containing your account number and exact agreed sum.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-brand-border space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-navy flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-brand-navy">
                Settlement vs. Full Closure
              </h3>
              <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                A regular closure involves paying full principal and interest, giving a
                &quot;CLOSED&quot; status. Settlement discharges legal liability with a
                compromise sum, ending harassment and legal exposure when repayment is impossible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS (VERIFIED) */}
      {testimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald">
              Client Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-heading">
              Stories of Relief and Resolution
            </h2>
            <p className="text-xs sm:text-sm text-brand-text">
              Real case outcomes achieved through structured negotiation and verified documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 rounded-2xl border border-brand-border shadow-card flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 bg-brand-mint text-brand-emerald rounded-full">
                      {t.loanType || "Debt Resolution"}
                    </span>
                    <span className="text-xs text-brand-muted">{t.location}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-text leading-relaxed italic">
                    &quot;{t.story}&quot;
                  </p>
                </div>
                <div className="pt-3 border-t border-brand-border/60">
                  <div className="text-xs font-bold text-brand-navy">{t.clientName}</div>
                  <div className="text-[11px] text-brand-emerald font-semibold mt-0.5">
                    ✓ {t.outcome}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-brand-text">
            Straightforward answers regarding the loan settlement process in India.
          </p>
        </div>

        <FAQAccordion items={faqs} />

        <div className="text-center mt-8">
          <Link
            href="/faqs"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-navy hover:text-brand-emerald transition-colors"
          >
            View all frequently asked questions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 8. LEAD-GENERATION FORM SECTION (ZOHO EMBED) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald">
            Take The First Step
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-heading">
            Let&apos;s Discuss Your Financial Situation
          </h2>
          <p className="text-sm text-brand-text max-w-xl mx-auto">
            Tell us a little about your requirements. Our advisory team will review
            your details and contact you to discuss available options.
          </p>
        </div>

        <HomeZohoSection zohoUrl={BRAND.zohoFormUrl} />
      </section>
    </div>
  );
}
