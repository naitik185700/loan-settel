"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Loader2, ExternalLink, ArrowRight, Zap } from "lucide-react";
import { BRAND } from "@/lib/constants";

interface HomeZohoSectionProps {
  zohoUrl?: string;
}

export default function HomeZohoSection({
  zohoUrl = BRAND.zohoFormUrl,
}: HomeZohoSectionProps) {
  const activeZohoUrl =
    zohoUrl &&
    zohoUrl.includes("zohopublic.in") &&
    zohoUrl.includes("/formperma/")
      ? zohoUrl
      : "https://forms.zohopublic.in/rddslegalsolutionsopcprivatel1/form/InquiryForm/formperma/HyvqgErILmK-RGLlxZhGBqi2leGDhXEjXaAgyI5RegI";

  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        typeof event.data === "string" &&
        (event.data.includes("submitted") ||
          event.data.includes("form-submitted") ||
          event.data.includes("zf_form_submitted"))
      ) {
        window.location.href = "/consultation-payment?source=zoho_home_embed";
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-card border border-brand-border overflow-hidden">
      {/* Top Banner */}
      <div className="bg-brand-navy p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald-light text-xs font-semibold mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Confidential &amp; Protected
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Confidential Case Evaluation
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
            Speak with an experienced debt resolution advisor. No upfront fees to understand your rights.
          </p>
        </div>

        <Link
          href="/consultation-payment"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-emerald hover:bg-brand-emerald-dark text-white text-xs font-bold transition-colors self-start sm:self-auto shrink-0 shadow-sm"
        >
          <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>Priority Advisory (₹499)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Embedded Zoho Form */}
      <div className="relative w-full min-h-[750px] bg-slate-50 flex flex-col">
        {!iframeLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 p-6 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-brand-emerald" />
            <p className="text-sm font-semibold text-brand-navy">
              Loading secure evaluation form...
            </p>
            <p className="text-xs text-slate-400 text-center max-w-sm">
              Please wait while the official Zoho consultation form loads.
            </p>
          </div>
        )}
        <iframe
          src={activeZohoUrl}
          title="Settle Loan Expert Confidential Debt Consultation"
          className="w-full h-[780px] border-0"
          onLoad={() => setIframeLoaded(true)}
          allow="camera; microphone; geolocation"
        />
      </div>

      {/* Post-submission Razorpay guidance */}
      <div className="py-2.5 px-6 bg-emerald-50/60 border-t border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-emerald-800">
        <span className="flex items-center gap-1.5 font-medium">
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
          <span>Already submitted the form? Complete your priority consultation booking below.</span>
        </span>
        <Link
          href="/consultation-payment"
          className="inline-flex items-center gap-1 font-bold text-brand-emerald hover:underline shrink-0"
        >
          <span>Priority Payment &amp; Confirmation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Footer reassurance badges */}
      <div className="py-3 px-6 bg-brand-surface border-t border-brand-border/60 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] text-slate-500">
        <span>🔒 256-Bit SSL Encryption</span>
        <span>•</span>
        <span>🚫 No Upfront Lender Charges</span>
        <span>•</span>
        <span>🛡️ 100% Confidential</span>
      </div>
    </div>
  );
}
