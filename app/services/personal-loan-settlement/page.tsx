import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryForm from "@/components/EnquiryForm";
import {
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Scale,
  FileCheck2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Personal Loan Settlement Assistance India | Settle Loan Expert",
  description:
    "Confidential personal loan settlement assistance for salaried and self-employed borrowers facing severe cashflow disruption in India.",
};

export default function PersonalLoanSettlementPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <div className="bg-brand-navy py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/#services" },
              { name: "Personal Loan Settlement" },
            ]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald-light text-xs font-semibold">
            <UserCheck className="w-4 h-4" />
            Unsecured Personal Debt Resolution
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Personal Loan Settlement Assistance
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Guidance for borrowers facing legal notices, bounce charges, and recovery
            pressure after personal loan defaults caused by unavoidable hardships.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-brand-heading">
                Resolving Defaulted Personal Loans
              </h2>
              <p className="text-sm sm:text-base text-brand-text leading-relaxed">
                Personal loans are unsecured credit extended based on historical salary
                or income proof. When income suddenly disappears or contracts sharply,
                fixed high EMIs become unpayable. Continued defaults result in NACH bounce
                penalties, penal interest, and legal notices under Section 25 of the
                Payment and Settlement Systems Act or Section 138 of the Negotiable
                Instruments Act.
              </p>
              <p className="text-sm sm:text-base text-brand-text leading-relaxed">
                Our advisory team assists you in compiling comprehensive hardship dossiers
                and engaging bank internal settlement desks to achieve a recognized
                One-Time Settlement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-brand-navy">
                Key Components of Personal Loan Settlement
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-brand-text">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>Hardship Documentation:</strong> Salary credit statements,
                    pink slips, medical discharge summaries, or tax returns evidencing income depletion.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>Settlement Matrix Review:</strong> Comparing lender compromise
                    benchmarks against your realistic ability to pay.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>Legal Notice Guidance:</strong> Explaining the difference between
                    routine advocate demand notices and formal court summons, so you respond accurately.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>Full Release NOC:</strong> Confirming the lender executes a complete
                    waiver of remaining liabilities upon payment.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <EnquiryForm
                defaultCategory="Personal Loan"
                title="Personal Loan Consultation"
                subtitle="Submit your loan details for a strategic assessment with our personal debt advisors."
                source="personal_loan_page"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
