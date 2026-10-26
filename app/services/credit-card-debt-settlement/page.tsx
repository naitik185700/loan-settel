import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryForm from "@/components/EnquiryForm";
import {
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Credit Card Debt Settlement & Relief India | Settle Loan Expert",
  description:
    "Break the compounding credit card interest trap. Guidance on negotiating one-time settlements, restructuring card balances into EMIs, and stopping harassment.",
};

export default function CreditCardSettlementPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <div className="bg-brand-navy py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/#services" },
              { name: "Credit Card Debt Settlement" },
            ]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald-light text-xs font-semibold">
            <CreditCard className="w-4 h-4" />
            Credit Card Debt Resolution
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Credit Card Debt Settlement Assistance
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Halt revolving interest charges (up to 48% APR), late penalties, and
            negotiate an official one-time compromise to permanently close high-interest card accounts.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-brand-heading">
                The Credit Card Debt Spiral in India
              </h2>
              <p className="text-sm sm:text-base text-brand-text leading-relaxed">
                Indian credit cards carry astronomical finance charges typically
                ranging from <strong>3.5% to 4.0% per month (42% to 48% annualized)</strong>,
                plus 18% GST on every rupee of interest, over-limit fines, and late payment
                penalties. Paying only the Minimum Amount Due (MAD) simply services finance
                charges while your principal continues to grow.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-brand-navy">
                Resolution Paths Available
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-brand-text">
                <div className="p-4 rounded-xl bg-brand-surface border border-brand-border/60">
                  <h4 className="font-bold text-brand-navy">1. One-Time Settlement (OTS)</h4>
                  <p className="mt-1">
                    For cardholders in actual default where income cannot support ongoing
                    balances. The bank agrees to close the card upon receiving an agreed
                    lump-sum compromise amount with a formal settlement letter.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-brand-surface border border-brand-border/60">
                  <h4 className="font-bold text-brand-navy">2. Card Balance to Loan EMI Conversion</h4>
                  <p className="mt-1">
                    If default hasn&apos;t set in, converting the outstanding statement
                    into a fixed 12–36 month tenure at reduced rates (14%–18%) stops revolving
                    interest and establishes a predictable repayment timeline.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/60 p-6 rounded-2xl border border-emerald-200 space-y-2">
              <h4 className="font-bold text-sm text-emerald-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-emerald" />
                Protection Against Collection Harassment
              </h4>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                Credit card recovery agents often employ aggressive calling techniques.
                Under RBI rules, representatives cannot call before 8 AM or after 7 PM,
                visit your office without permission, or contact friends and relatives.
                We help you assert these legal rights immediately.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <EnquiryForm
                defaultCategory="Credit Card Debt"
                title="Settle Credit Card Debt"
                subtitle="Provide your card dues and issuer banks. Our specialists will review options to stop interest and negotiate closure."
                source="credit_card_settlement_page"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
