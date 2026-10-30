"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Loader2,
  Zap,
  ArrowRight,
  Lock,
} from "lucide-react";
import { BRAND } from "@/lib/constants";

interface ZohoConsultationEmbedProps {
  zohoUrl?: string;
}

export default function ZohoConsultationEmbed({
  zohoUrl = BRAND.zohoFormUrl,
}: ZohoConsultationEmbedProps) {
  // Use public formperma embed link so it renders cleanly inline on the still page
  const activeFormUrl =
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
          event.data.includes("zf_form_submitted") ||
          event.data.includes("success"))
      ) {
        window.location.href = "/consultation-payment?source=inquiry_form";
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-card border border-brand-border overflow-hidden">
        {/* Clean, 100% White-Label Header (Zero third-party branding) */}
        <div className="bg-brand-navy p-5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-navy-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-brand-emerald-light font-medium mb-1">
              <ShieldCheck className="w-4 h-4 text-brand-emerald" />
              <span>Encrypted &amp; Confidential Case Intake</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Book a Confidential Debt Evaluation
            </h3>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald-light text-xs font-semibold self-start sm:self-auto">
            <Lock className="w-3.5 h-3.5" />
            <span>100% Privacy Protected</span>
          </div>
        </div>

        {/* Inline Still Page Embed (No popups, no new window) */}
        <div className="relative min-h-[780px] w-full bg-slate-50 flex flex-col">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 p-6 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-brand-emerald" />
              <p className="text-sm font-semibold text-brand-navy">
                Loading official evaluation form...
              </p>
              <p className="text-xs text-slate-400 text-center max-w-sm">
                Secure connection established. Please fill out your details below.
              </p>
            </div>
          )}
          <iframe
            src={activeFormUrl}
            title="Settle Loan Expert Confidential Debt Evaluation"
            className="w-full h-[840px] border-0"
            onLoad={() => setIframeLoaded(true)}
            allow="camera; microphone; geolocation"
          />
        </div>

        {/* Post-submission guidance & priority upgrade option */}
        <div className="py-3 px-6 bg-emerald-50/70 border-t border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-900">
          <span className="flex items-center gap-2 font-medium">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
            <span>Submitted your inquiry? You can proceed to priority advisor booking below.</span>
          </span>
          <Link
            href="/consultation-payment"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-brand-emerald text-white font-bold hover:bg-brand-emerald-dark transition-colors shrink-0 shadow-sm"
          >
            <span>Proceed to Confirmation &amp; Payment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
