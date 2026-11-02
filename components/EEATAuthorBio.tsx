import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, Calendar, CheckCircle2, BookOpen, ExternalLink } from "lucide-react";
import { BRAND } from "@/lib/constants";

interface EEATProps {
  publishedDate?: string;
  modifiedDate?: string;
  publishedFormatted?: string;
  modifiedFormatted?: string;
  variant?: "full" | "byline" | "compact";
  authorName?: string;
  authorRole?: string;
}

export default function EEATAuthorBio({
  publishedDate = "2024-01-15T09:00:00+05:30",
  modifiedDate = "2026-10-30T10:00:00+05:30",
  publishedFormatted = "January 15, 2024",
  modifiedFormatted = "October 30, 2026",
  variant = "full",
  authorName = "Adv. Rajesh Verma",
  authorRole = "Senior Banking Law Counsel & Debt Advisory Lead",
}: EEATProps) {
  if (variant === "byline" || variant === "compact") {
    return (
      <div
        className="author-byline flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-300 py-2 border-y border-white/10"
        itemScope
        itemType="https://schema.org/Person"
      >
        <div className="flex items-center gap-1.5 font-medium">
          <span className="text-slate-400">Written &amp; Fact-Checked by:</span>
          <Link
            href="/about#editorial-board"
            rel="author"
            itemProp="author"
            className="text-white hover:text-brand-emerald-light font-bold underline decoration-brand-emerald underline-offset-4"
          >
            <span itemProp="name">{authorName}</span>
          </Link>
          <span className="hidden sm:inline text-brand-emerald-light text-[11px] font-semibold bg-brand-emerald/20 px-2 py-0.5 rounded-full">
            14+ Yrs Banking Law
          </span>
        </div>

        <span className="text-slate-500">•</span>

        <div className="flex items-center gap-1.5 text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-brand-emerald-light shrink-0" />
          <span>Published: </span>
          <time itemProp="datePublished" dateTime={publishedDate} className="font-semibold text-white">
            {publishedFormatted}
          </time>
        </div>

        <span className="text-slate-500">•</span>

        <div className="flex items-center gap-1.5 text-slate-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald-light shrink-0" />
          <span>Last Updated: </span>
          <time itemProp="dateModified" dateTime={modifiedDate} className="font-semibold text-white">
            {modifiedFormatted}
          </time>
        </div>

        <span className="text-slate-500">•</span>

        <div className="flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5 text-brand-emerald-light shrink-0" />
          <Link
            href="/editorial-policy"
            rel="editorial-policy"
            className="text-brand-emerald-light hover:underline font-medium"
          >
            Editorial Policy
          </Link>
        </div>
      </div>
    );
  }

  // Full rich card variant (for homepage & article footer)
  return (
    <div
      className="author-bio-card bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-card space-y-6"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-brand-border/70">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy-900 text-brand-emerald-light flex items-center justify-center font-bold text-xl shrink-0 shadow-md">
            RV
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-brand-emerald font-bold">
              Legal Leadership &amp; Advisory
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-brand-heading">
              <Link
                href="/about#editorial-board"
                rel="author"
                itemProp="author"
                className="hover:text-brand-emerald transition-colors"
              >
                <span itemProp="name">{authorName}</span>
              </Link>
            </h3>
            <p itemProp="jobTitle" className="text-xs sm:text-sm text-brand-text font-medium">
              {authorRole}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <Award className="w-3.5 h-3.5" /> Bar Council of Delhi (D/1428/2010)
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
            <ShieldCheck className="w-3.5 h-3.5" /> 14+ Years Banking Dispute Practice
          </span>
        </div>
      </div>

      <div className="text-xs sm:text-sm text-brand-text leading-relaxed space-y-2" itemProp="description">
        <p>
          Adv. Rajesh Verma specializes in banking debt dispute resolution, borrower rights enforcement under the
          Reserve Bank of India (RBI) Fair Practices Code, and negotiated One-Time Settlement (OTS) structuring. Having
          counselled thousands of Indian borrowers facing aggressive collection agents, he oversees all educational
          content and legal review standards across <strong>{BRAND.name}</strong>.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-brand-border/60 text-xs text-brand-muted">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-brand-emerald" />
            <span>Content Published: </span>
            <time itemProp="datePublished" dateTime={publishedDate} className="font-semibold text-brand-navy">
              {publishedFormatted}
            </time>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" />
            <span>Last Verified &amp; Updated: </span>
            <time itemProp="dateModified" dateTime={modifiedDate} className="font-semibold text-brand-navy">
              {modifiedFormatted}
            </time>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/editorial-policy"
            rel="editorial-policy"
            className="text-brand-emerald font-bold hover:underline inline-flex items-center gap-1"
          >
            Editorial Policy <ExternalLink className="w-3 h-3" />
          </Link>
          <span>•</span>
          <Link
            href="/about"
            className="text-brand-navy font-bold hover:underline"
          >
            Meet the Advisory Team &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
