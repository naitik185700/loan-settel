import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryForm from "@/components/EnquiryForm";
import {
  Compass,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Debt Counselling & Repayment Guidance India | Settle Loan Expert",
  description:
    "Confidential, personalized debt counselling in India. Practical cashflow budgeting, debt avalanche/snowball planning, and anti-harassment borrower rights support.",
};

export default function DebtCounsellingPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <div className="bg-brand-navy py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/#services" },
              { name: "Debt Counselling & Guidance" },
            ]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald-light text-xs font-semibold">
            <Compass className="w-4 h-4" />
            Financial Health & Guidance
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Debt Counselling & Repayment Planning
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Personalized, unbiased financial counselling to help you regain clarity,
            budget effectively, protect borrower rights, and organize a viable debt exit.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-brand-heading">
                Proactive Guidance Before Total Default
              </h2>
              <p className="text-sm sm:text-base text-brand-text leading-relaxed">
                Settlement is not always the first or only option. When caught early,
                many multi-debt situations can be navigated through disciplined cashflow
                re-engineering, aggressive reduction of high-interest revolving card
                balances, or restructuring loan tenures to lower monthly outgo.
              </p>
              <p className="text-sm sm:text-base text-brand-text leading-relaxed">
                Our counsellors work with you one-on-one to evaluate your household
                income, necessary living expenses, and outstanding debts to create a
                sustainable, realistic roadmap.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-brand-navy">
                What Debt Counselling Covers
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-brand-text">
                <div className="p-4 rounded-xl bg-brand-surface border border-brand-border/60">
                  <h4 className="font-bold text-brand-navy">Debt Prioritization (Snowball vs. Avalanche)</h4>
                  <p className="mt-1">
                    Identifying which debts generate lethal compounding penalties (credit
                    cards) versus low-cost stable loans, establishing an optimal payment
                    order.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-brand-surface border border-brand-border/60">
                  <h4 className="font-bold text-brand-navy">Anti-Harassment Defense Preparation</h4>
                  <p className="mt-1">
                    Equipping you and your family with accurate knowledge of the RBI Fair
                    Practices Code, so you can stop abusive calls and preserve dignity.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-brand-surface border border-brand-border/60">
                  <h4 className="font-bold text-brand-navy">Post-Settlement Credit Rebuilding</h4>
                  <p className="mt-1">
                    A concrete 12-month blueprint to boost your credit score using secured
                    credit products and spotless payment hygiene.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <EnquiryForm
                defaultCategory="Multiple Loans / Mixed"
                title="Schedule Debt Counselling"
                subtitle="Book a session with a certified debt counsellor to review your overall financial picture."
                source="debt_counselling_page"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
