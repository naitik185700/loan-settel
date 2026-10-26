import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryForm from "@/components/EnquiryForm";
import {
  Building2,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Briefcase,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Business Loan Assistance & MSME Debt Advisory | Settle Loan Expert",
  description:
    "Assistance for MSMEs, proprietorships, and traders facing business loan defaults, cashflow insolvency, and commercial debt restructuring in India.",
};

export default function BusinessLoanAssistancePage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <div className="bg-brand-navy py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/#services" },
              { name: "Business Loan Assistance" },
            ]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald-light text-xs font-semibold">
            <Building2 className="w-4 h-4" />
            MSME & Commercial Debt Advisory
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Business Loan Assistance
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Strategic debt guidance for Indian entrepreneurs, MSMEs, and business
            proprietors facing working capital defaults and commercial bank recoveries.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-brand-heading">
                Managing Commercial Debt Hardships in India
              </h2>
              <p className="text-sm sm:text-base text-brand-text leading-relaxed">
                Market shifts, delayed receivables, vendor insolvencies, and regulatory
                changes can severely disrupt small business cashflow. When business loans,
                unsecured working capital limits, or fintech merchant advances turn
                delinquent, business owners face personal guarantee invocations and asset
                risk.
              </p>
              <p className="text-sm sm:text-base text-brand-text leading-relaxed">
                We assist MSMEs in reviewing their loan portfolio, distinguishing between
                secured and unsecured exposures, and pursuing viable restructuring or
                one-time compromise settlements under RBI MSME guidelines.
              </p>
            </div>

            <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md border-2 border-white">
              <Image
                src="/images/business-debt.jpg"
                alt="Indian business entrepreneur discussing loan restructuring"
                fill
                className="object-cover"
              />
            </div>

            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-brand-navy">
                Key Advisory Support for Business Owners
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-brand-text">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>Collateral vs. Non-Collateral Segregation:</strong> Assessing which
                    facilities are backed by property mortgages and which are pure unsecured
                    advances, mitigating personal risk.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>Director & Proprietor Guarantees:</strong> Evaluating legal liability
                    under personal guarantees given for business debts.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>Restructuring vs. OTS:</strong> Determining whether a tenure
                    extension with interest holiday is viable or if an outright compromise settlement
                    is required.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <EnquiryForm
                defaultCategory="Business Loan"
                title="Business Debt Consultation"
                subtitle="Share your enterprise loan structure for a confidential corporate review with our senior consultants."
                source="business_loan_page"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
