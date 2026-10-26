import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BRAND } from "@/lib/constants";
import { AlertTriangle, ShieldCheck, Scale, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Legal & Regulatory Disclaimer | Settle Loan Expert",
  description:
    "Important legal and regulatory disclaimer regarding loan settlement, credit score impacts, and advisory limitations under Indian financial regulations.",
};

export default function DisclaimerPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <div className="bg-brand-navy py-12 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ name: "Disclaimer" }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Legal & Regulatory Disclaimer
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Please read this disclaimer carefully before engaging with our services.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-brand-border shadow-card space-y-8 text-sm sm:text-base text-brand-text leading-relaxed">
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-amber-950 font-medium">
              Settle Loan Expert is an independent private consultancy providing financial literacy and negotiation assistance. We are NOT affiliated with the Reserve Bank of India (RBI), Indian Banks&apos; Association (IBA), or any government banking authority.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-brand-navy">
              1. Not a Lending Institution
            </h2>
            <p>
              Settle Loan Expert does not issue loans, advance credit, grant bridge finance, or pay off borrower debts directly. We do not solicit loan applications or collect deposits from the public.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-brand-navy">
              2. No Guaranteed Settlements or Waivers
            </h2>
            <p>
              No communication on this website should be construed as a guarantee that any bank or NBFC will accept a settlement proposal or grant a specific waiver percentage. The decision to accept, modify, or reject a compromise settlement rests entirely within the commercial and credit discretion of your lending institution.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-brand-navy">
              3. Credit Bureau (CIBIL / Experian) Reporting
            </h2>
            <p>
              When a loan is settled for an amount less than the total outstanding balance, lending institutions report the account status as <strong>&quot;SETTLED&quot;</strong> or <strong>&quot;POST-WRITE-OFF SETTLED&quot;</strong> to authorized credit information companies (CIBIL, Experian, CRIF High Mark, Equifax). This remark signals that the debt was closed with a discount and may temporarily hinder future access to prime unsecured credit.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-brand-navy">
              4. Payment Procedures & Written Letters
            </h2>
            <p>
              All compromise settlement sums must be paid directly to your respective lending institution&apos;s designated loan account, against an official, verifiable written settlement letter issued on the bank&apos;s letterhead. Settle Loan Expert does not receive, hold, or escrow your settlement funds.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
