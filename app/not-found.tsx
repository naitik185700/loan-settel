import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Phone } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-brand-border shadow-card text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-brand-mint text-brand-emerald text-2xl font-black flex items-center justify-center mx-auto">
          404
        </div>
        <h1 className="text-2xl font-bold text-brand-navy">
          Page Not Found
        </h1>
        <p className="text-sm text-brand-text leading-relaxed">
          The requested page may have been moved, updated, or does not exist. You can return to our homepage or consult an advisor directly.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-semibold hover:bg-brand-navy-dark transition-colors flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4" /> Go to Homepage
          </Link>
          <a
            href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-brand-border text-brand-navy text-xs font-semibold hover:bg-brand-mint transition-colors flex items-center justify-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-brand-emerald" /> Call Helpdesk
          </a>
        </div>
      </div>
    </div>
  );
}
