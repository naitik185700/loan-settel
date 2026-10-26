import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryForm from "@/components/EnquiryForm";
import {
  Scale,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Clock,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Loan Settlement Assistance India | One Time Settlement (OTS) Advisory",
  description:
    "Expert legal and financial advisory for loan settlement in India. Understand bank compromise frameworks, waiver possibilities, CIBIL impacts, and mandatory written terms.",
};

export default function LoanSettlementPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero Banner */}
      <div className="bg-brand-navy py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/#services" },
              { name: "Loan Settlement Assistance" },
            ]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald-light text-xs font-semibold">
            <Scale className="w-4 h-4" />
            One-Time Settlement (OTS) Guidance
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Loan Settlement Assistance
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Professional representation and guidance for borrowers unable to service
            unsecured loans due to documented financial insolvency or critical life events.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-brand-heading">
                What is a Loan Settlement in India?
              </h2>
              <p className="text-sm sm:text-base text-brand-text leading-relaxed">
                A <strong>Loan Settlement</strong> (technically called a One-Time
                Settlement or OTS compromise) is an agreement between an overburdened
                borrower and a commercial bank or NBFC. When an account defaults and the
                borrower provides verifiable proof of financial hardship, the lender&apos;s
                settlement committee may agree to accept a negotiated lump-sum amount
                to close the account, waiving unserviced interest, penal charges, and a
                portion of the principal.
              </p>
              <p className="text-sm sm:text-base text-brand-text leading-relaxed">
                Settlements apply primarily to <strong>unsecured debts</strong> such as
                personal loans and credit cards. Secured debts (home loans, vehicle loans)
                are backed by hypothecated assets and follow separate recovery
                procedures under the SARFAESI Act.
              </p>
            </div>

            {/* When is Settlement Applicable */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-brand-navy">
                When Do Banks Consider Settlement?
              </h3>
              <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                Banks do not grant settlements automatically. You must establish genuine,
                verifiable hardship:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-brand-text">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>Severe Medical Emergencies:</strong> Life-threatening illnesses,
                    critical hospitalizations, or permanent physical disability impacting earnings.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>Involuntary Job Loss / Unemployment:</strong> Extended unemployment
                    exceeding 6–12 months with bank statements demonstrating lack of steady cashflow.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>Business Closure or Insolvency:</strong> Complete breakdown of SME
                    operations, bankruptcy, or acute loss of operating revenue.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>Loss of Primary Breadwinner:</strong> Death of the main earning
                    family member leaving surviving dependents without financial support.
                  </span>
                </li>
              </ul>
            </div>

            {/* Critical Realities */}
            <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Essential Realities You Must Know
              </div>
              <ul className="text-xs sm:text-sm text-amber-950 space-y-2 leading-relaxed">
                <li>
                  • <strong>Credit Score Status:</strong> The lender will report your
                  account as &quot;Settled&quot; or &quot;Written Off&quot; to CIBIL and
                  Experian. This will temporarily lower your score.
                </li>
                <li>
                  • <strong>No Verbal Confirmations:</strong> Never pay a single rupee based
                  on verbal promises from collection agents. A valid settlement requires an
                  official letter from the bank.
                </li>
                <li>
                  • <strong>No Guaranteed Savings:</strong> Any company promising a
                  guaranteed &quot;70% discount&quot; is being dishonest. The compromise sum
                  depends on bank policy and your individual financial standing.
                </li>
              </ul>
            </div>

            {/* How Settle Loan Expert Assists */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-brand-heading">
                How We Assist You Throughout
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-brand-border">
                  <h4 className="font-bold text-xs text-brand-navy">1. Case Assessment</h4>
                  <p className="text-xs text-brand-text mt-1">
                    Reviewing your loan agreements, default notices, and verifying hardship proofs.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-brand-border">
                  <h4 className="font-bold text-xs text-brand-navy">2. Direct Bank Representation</h4>
                  <p className="text-xs text-brand-text mt-1">
                    Communicating with bank nodal settlement desks on legal and formal terms.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-brand-border">
                  <h4 className="font-bold text-xs text-brand-navy">3. Sanction Letter Verification</h4>
                  <p className="text-xs text-brand-text mt-1">
                    Carefully reviewing the settlement letter terms before any payment is authorized.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-brand-border">
                  <h4 className="font-bold text-xs text-brand-navy">4. NOC & Bureau Follow-up</h4>
                  <p className="text-xs text-brand-text mt-1">
                    Ensuring issuance of No Objection Certificate (NOC) and bureau status update.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <EnquiryForm
                defaultCategory="Personal Loan"
                title="Request Loan Settlement Guidance"
                subtitle="Submit your details for a confidential, no-obligation evaluation with our settlement advisors."
                source="loan_settlement_page"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
