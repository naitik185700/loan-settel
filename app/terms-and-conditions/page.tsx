import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms and Conditions | Settle Loan Expert",
  description:
    "Terms and Conditions governing the use of Settle Loan Expert advisory website and consultation services.",
};

export default function TermsPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <div className="bg-brand-navy py-12 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ name: "Terms and Conditions" }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Terms and Conditions
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Last Updated: January 2026
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-brand-border shadow-card space-y-8 text-sm sm:text-base text-brand-text leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-brand-navy">1. Acceptance of Terms</h2>
            <p>
              By accessing or using this website (settleloanexpert.in) and submitting an enquiry form, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, please refrain from using this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-brand-navy">2. Nature of Advisory Services</h2>
            <p>
              Settle Loan Expert is an independent debt resolution and credit advisory platform. We provide strategic guidance, documentation review, and assisted negotiation support for borrowers with distressed loans.
            </p>
            <p className="font-semibold text-brand-navy">
              Settle Loan Expert is NOT a bank, non-banking financial company (NBFC), money lender, or recovery agency. We do not provide loans, lines of credit, or debt refinance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-brand-navy">3. No Guaranteed Settlement Outcomes</h2>
            <p>
              You acknowledge and understand that the authority to grant a One-Time Settlement (OTS), interest concession, or penalty waiver rests solely with your creditor bank or NBFC. No advisor or third party can guarantee a specific settlement percentage, approval timeline, or waiver outcome.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-brand-navy">4. Accurate Information Warranty</h2>
            <p>
              You warrant that all financial, identity, and loan data provided by you is accurate, truthful, and complete. Any intentional misrepresentation or fraudulent submission of forged documents is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-brand-navy">5. Governing Law and Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Any dispute arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the competent courts in Gurugram / Haryana, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
