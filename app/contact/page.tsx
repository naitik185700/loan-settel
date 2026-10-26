import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryForm from "@/components/EnquiryForm";
import { BRAND } from "@/lib/constants";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Building,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Confidential Loan Advisory | Settle Loan Expert",
  description:
    "Contact Settle Loan Expert. Reach our senior debt resolution advisors via phone, email, or schedule an in-person consultation in Gurugram, India.",
};

export default function ContactPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <div className="bg-brand-navy py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ name: "Contact Us" }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Contact Our Advisory Team
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Reach out confidentially. Whether you have questions regarding loan
            settlement, recovery harassment, or debt restructuring, our team is here
            to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-border shadow-card space-y-6">
              <h2 className="text-xl font-bold text-brand-navy">
                Corporate & Advisory Desk
              </h2>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-mint text-brand-emerald flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-navy">Direct Phone</div>
                    <a
                      href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
                      className="text-brand-emerald font-semibold text-base hover:underline block mt-0.5"
                    >
                      {BRAND.phone}
                    </a>
                    <span className="text-xs text-brand-muted">
                      Direct line for case evaluations & follow-ups
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-mint text-brand-emerald flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-navy">Email Inquiries</div>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="text-brand-navy font-semibold hover:text-brand-emerald block mt-0.5"
                    >
                      {BRAND.email}
                    </a>
                    <a
                      href={`mailto:${BRAND.infoEmail}`}
                      className="text-xs text-brand-muted hover:text-brand-emerald block mt-0.5"
                    >
                      {BRAND.infoEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-mint text-brand-emerald flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-navy">Operating Hours</div>
                    <div className="text-brand-text mt-0.5">{BRAND.hours}</div>
                    <span className="text-xs text-brand-muted">Sunday Closed</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-mint text-brand-emerald flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-navy">Office Address</div>
                    <div className="text-brand-text mt-0.5 leading-relaxed">
                      {BRAND.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-brand-surface border border-brand-border space-y-2 text-xs text-brand-text">
              <div className="font-bold text-brand-navy flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                Commitment to Client Privacy
              </div>
              <p className="leading-relaxed">
                We never contact employers, colleagues, or family members. All
                communications are strictly between you and your designated senior advisor.
              </p>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7">
            <EnquiryForm
              title="Send Us a Message"
              subtitle="Fill out the form below. An advisor will review your requirements and reach out within 2 hours during business times."
              source="contact_page"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
