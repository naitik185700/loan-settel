import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ZohoConsultationEmbed from "@/components/ZohoConsultationEmbed";
import { BRAND } from "@/lib/constants";
import {
  ShieldCheck,
  Phone,
  Clock,
  Lock,
  FileCheck2,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Free Confidential Debt Consultation | Settle Loan Expert",
  description:
    "Schedule a no-cost, confidential debt consultation with our loan settlement advisors. Evaluate your unsecured loans, credit card balances, and legal protections.",
};

export default function FreeConsultationPage() {
  const zohoUrl =
    process.env.NEXT_PUBLIC_ZOHO_FORM_URL ||
    "https://forms.zohopublic.in/rddslegalsolutionsopcprivatel1/form/InquiryForm/formperma/HyvqgErILmK-RGLlxZhGBqi2leGDhXEjXaAgyI5RegI";

  return (
    <div className="space-y-10 sm:space-y-12 pb-16">
      {/* Banner */}
      <div className="bg-brand-navy py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ name: "Free Consultation" }]} />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald-light text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            100% Confidential • Zero Obligation
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Book a Free Debt Consultation
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Take the first step to regain control of your financial life. Complete the
            consultation form below to schedule a preliminary case review with a senior
            advisor.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-brand-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-mint text-brand-emerald flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-brand-navy">Strictly Confidential</div>
              <div className="text-[11px] text-brand-muted">Private case evaluation</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-brand-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-mint text-brand-emerald flex items-center justify-center shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-brand-navy">No Hidden Upfront Fees</div>
              <div className="text-[11px] text-brand-muted">Understand options freely</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-brand-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-mint text-brand-emerald flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-brand-navy">Direct Helpdesk</div>
              <div className="text-[11px] text-brand-muted">{BRAND.phone}</div>
            </div>
          </div>
        </div>

        {/* The Zoho / Direct Consultation Component */}
        <ZohoConsultationEmbed zohoUrl={zohoUrl} />

        {/* Ethical / Advisory Notice */}
        <div className="p-5 rounded-2xl bg-brand-surface border border-brand-border text-xs text-brand-text space-y-2">
          <div className="font-bold text-brand-navy flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-brand-emerald" />
            What to expect after booking:
          </div>
          <p className="leading-relaxed">
            A debt resolution specialist will contact you during our operating hours ({BRAND.hours}).
            They will listen to your concerns, review your loan types (banks, tenure,
            delinquency duration), and provide a realistic overview of settlement
            feasibility, RBI fair recovery rights, and structured repayment solutions.
          </p>
        </div>
      </div>
    </div>
  );
}
