import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Settle Loan Expert",
  description:
    "Privacy Policy for Settle Loan Expert. Learn how we collect, handle, protect, and encrypt user data and financial communications under Indian IT Act and DPDP Act.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <div className="bg-brand-navy py-12 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ name: "Privacy Policy" }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Last Updated: January 2026 | Compliant with Information Technology Act, 2000 & Digital Personal Data Protection (DPDP) Act, 2023.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-brand-border shadow-card space-y-8 text-sm sm:text-base text-brand-text leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-brand-navy">1. Introduction</h2>
            <p>
              {BRAND.legalEntity} (&quot;Settle Loan Expert&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your personal and financial information. This Privacy Policy outlines our practices regarding data collection, usage, storage, disclosure, and protection when you visit our website (settleloanexpert.in) or use our advisory services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-brand-navy">2. Information We Collect</h2>
            <p>We only collect information necessary to assess your debt situation and communicate our advisory services:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Contact Information:</strong> Full name, telephone/mobile number, and email address.</li>
              <li><strong>Debt Profile Data:</strong> Loan categories (credit card, personal loan, business debt), approximate outstanding balance brackets, and duration of delinquency.</li>
              <li><strong>Hardship Documentation:</strong> Shared voluntarily by you during formal evaluation (e.g., income statements, bank default notices, or medical proofs).</li>
              <li><strong>Technical Logs:</strong> IP address, browser type, and submission timestamps for fraud prevention, spam protection, and audit compliance.</li>
            </ul>
            <div className="p-3.5 bg-brand-surface rounded-xl border border-brand-border text-xs text-brand-text">
              <strong>What We NEVER Collect:</strong> We never ask for, collect, or store your net banking passwords, ATM card PINs, UPI PINs, or One-Time Passwords (OTPs).
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-brand-navy">3. Purpose and Legal Basis of Processing</h2>
            <p>We process your data strictly to:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>Evaluate your eligibility for bank loan restructuring or One-Time Settlement (OTS).</li>
              <li>Communicate via phone, WhatsApp, or email regarding your requested consultation.</li>
              <li>Assist in compiling formal representation to be submitted to your lending institutions.</li>
              <li>Comply with applicable legal, regulatory, and tax obligations under Indian law.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-brand-navy">4. Data Sharing & Third-Party Non-Disclosure</h2>
            <p>
              We maintain a strict <strong>Zero Third-Party Marketing Disclosure Policy</strong>. We do not sell, rent, lease, or monetize your contact or financial details to any third-party telemarketers, credit card issuers, or loan agencies. Information is shared only with authorized creditors upon your express written mandate for settlement negotiation purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-brand-navy">5. Data Retention & Erasure Rights</h2>
            <p>
              You have the right to request access to your personal data, rectify inaccuracies, or request the erasure of your lead records from our active database. Requests can be sent to our Grievance Officer at{" "}
              <a href={`mailto:${BRAND.email}`} className="text-brand-emerald underline font-medium">
                {BRAND.email}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
