import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQAccordion from "@/components/FAQAccordion";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { HelpCircle, ArrowRight, Phone } from "lucide-react";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQs) | Settle Loan Expert",
  description:
    "Common questions about loan settlement in India: credit score impact, OTS process, documents required, bank negotiation timelines, and borrower rights.",
};

export const revalidate = 60;

export default async function FAQsPage() {
  const faqs = await prisma.fAQ.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <div className="bg-brand-navy py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ name: "FAQs" }]} />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald-light text-xs font-semibold">
            <HelpCircle className="w-4 h-4" />
            Clear Answers
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Everything you need to know about loan settlement, debt restructuring,
            creditor negotiations, and your statutory rights in India.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <FAQAccordion items={faqs} />

        {/* Still have questions card */}
        <div className="bg-white rounded-2xl p-8 border border-brand-border shadow-card flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-brand-navy">
              Have a Specific Question About Your Case?
            </h3>
            <p className="text-xs sm:text-sm text-brand-text max-w-md">
              Speak directly with an advisor or request a confidential case evaluation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
              className="px-4 py-2.5 rounded-lg border border-brand-border text-brand-navy font-semibold text-xs flex items-center gap-2 hover:bg-brand-mint"
            >
              <Phone className="w-3.5 h-3.5 text-brand-emerald" />
              {BRAND.phone}
            </a>
            <Link
              href="/free-consultation"
              className="px-5 py-2.5 rounded-lg bg-brand-emerald hover:bg-brand-emerald-dark text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
            >
              Consult an Advisor <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
