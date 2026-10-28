import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BRAND,
  FOOTER_SERVICES,
  FOOTER_COMPANY,
  FOOTER_LEGAL,
} from "@/lib/constants";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  FileCheck2,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-navy-900 text-slate-300 pt-16 pb-8 border-t border-brand-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-brand-navy-800">
          {/* Col 1: Brand & Bio (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative h-12 w-52 bg-white rounded-lg p-1.5 shadow-sm">
                <Image
                  src="/images/logo.png"
                  alt="Settle Loan Expert"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Settle Loan Expert provides dedicated, confidential debt advisory and loan
              settlement assistance for Indian borrowers experiencing acute financial distress.
              We help you understand institutional settlement frameworks, negotiate fair terms,
              and protect your dignity under RBI regulatory protections.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-emerald shrink-0" />
                <span>100% Confidential Case Evaluations</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-brand-emerald shrink-0" />
                <span>Formal Written Lender Settlements (No Verbal Deals)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_SERVICES.map((s) => (
                <li key={s.name}>
                  <Link
                    href={s.href}
                    className="text-slate-300 hover:text-brand-emerald-light transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company & Information */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_COMPANY.map((c) => (
                <li key={c.name}>
                  <Link
                    href={c.href}
                    className="text-slate-300 hover:text-brand-emerald-light transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Contact Us
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
                    className="text-white hover:text-brand-emerald-light font-medium block"
                  >
                    {BRAND.phone}
                  </a>
                  <span className="text-xs text-slate-400">Direct Advisor Desk</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="text-slate-300 hover:text-brand-emerald-light block text-xs"
                  >
                    {BRAND.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">{BRAND.hours}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400">{BRAND.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer & Ethical Notice */}
        <div className="py-6 border-b border-brand-navy-800 text-xs text-slate-400 leading-relaxed space-y-3">
          <p>
            <strong className="text-slate-200">Legal & Regulatory Disclaimer:</strong> Settle Loan
            Expert is an independent legal and financial advisory consultancy. We are NOT a bank,
            non-banking financial company (NBFC), lending institution, or government entity. We do
            not issue loans or advance credit. Our role is strictly limited to advising borrowers on
            their rights under Indian banking norms and assisting them in negotiating compromise
            settlements (One-Time Settlement) directly with authorized institutional creditors.
          </p>
          <p>
            Settlement outcomes, percentage waivers, and approval timelines depend solely on the
            lender&apos;s internal credit recovery policies and the borrower&apos;s verifiable
            hardship documentation. Settle Loan Expert does NOT guarantee credit score preservation,
            loan forgiveness, or specific settlement ratios. Loan settlements typically result in a
            &quot;Settled&quot; status on your CIBIL/Experian credit profile.
          </p>
        </div>

        {/* Bottom Row */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} {BRAND.legalEntity}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {FOOTER_LEGAL.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-brand-emerald-light transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
