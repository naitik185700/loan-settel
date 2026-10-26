import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BRAND } from "@/lib/constants";
import { ShieldCheck, Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Grievance Redressal & Complaints | Settle Loan Expert",
  description:
    "Official Grievance Redressal mechanism for Settle Loan Expert. Contact details of our Grievance Officer, escalation procedure, and resolution timelines.",
};

export default function GrievancePage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <div className="bg-brand-navy py-12 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ name: "Grievance Redressal" }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Grievance Redressal & Complaints Mechanism
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Dedicated framework ensuring timely resolution of client concerns and complaints.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-brand-border shadow-card space-y-8 text-sm sm:text-base text-brand-text leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-brand-navy">
              1. Our Commitment to Fair Customer Service
            </h2>
            <p>
              At {BRAND.name}, we hold ourselves to the highest standards of transparency, confidentiality, and professional integrity. If you have any grievance or complaint regarding our advisory services, representative conduct, or data handling, we have established a formal escalation matrix to resolve your concern promptly.
            </p>
          </section>

          {/* Grievance Officer Box */}
          <section className="p-6 bg-brand-surface rounded-2xl border border-brand-border space-y-4">
            <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-emerald" />
              Designated Grievance Redressal Officer
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-brand-text">
              <p><strong>Officer Name:</strong> Principal Grievance Officer</p>
              <p><strong>Designation:</strong> Head of Client Relations & Regulatory Compliance</p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:grievance@settleloanexpert.in`} className="text-brand-emerald underline font-semibold">
                  grievance@settleloanexpert.in
                </a>{" "}
                (or cc: {BRAND.email})
              </p>
              <p><strong>Direct Helpline:</strong> {BRAND.phone}</p>
              <p><strong>Postal Address:</strong> {BRAND.address}</p>
              <p><strong>Working Hours:</strong> {BRAND.hours}</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-brand-navy">
              2. Escalation Hierarchy & Timelines
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-white border border-brand-border">
                <h4 className="font-bold text-brand-navy">Level 1: Primary Advisor / Desk Support</h4>
                <p className="mt-1 text-brand-text">
                  Submit your query or concern directly to your designated case manager or via our helpline at {BRAND.phone}. Expected response time: <strong>Within 24 to 48 business hours</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-brand-border">
                <h4 className="font-bold text-brand-navy">Level 2: Escalation to Grievance Officer</h4>
                <p className="mt-1 text-brand-text">
                  If the issue is not resolved satisfactorily at Level 1, write to{" "}
                  <strong>grievance@settleloanexpert.in</strong> with your reference number. A senior officer will investigate and furnish a formal written resolution: <strong>Within 7 business days</strong>.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-brand-navy">
              3. Regulatory Complaints Against Lenders
            </h2>
            <p className="text-xs sm:text-sm">
              Please note that complaints regarding unlawful conduct by third-party bank recovery agents (harassment, intimidation, calls outside permissible hours) should also be reported to your lending bank&apos;s Principal Nodal Officer (PNO) and, if unresolved after 30 days, to the <strong>RBI Integrated Ombudsman</strong> (cms.rbi.org.in). Our team assists enrolled clients in drafting these formal regulatory complaints.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
