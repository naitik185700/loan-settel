"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpenIndex?: number;
}

export default function FAQAccordion({
  items,
  defaultOpenIndex = 0,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.id || idx}
            className={`border rounded-xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? "bg-white border-brand-emerald shadow-sm"
                : "bg-white border-brand-border hover:border-brand-navy/30"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(idx)}
              className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-sm sm:text-base text-brand-navy flex items-center gap-2.5">
                <HelpCircle
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isOpen ? "text-brand-emerald" : "text-slate-400"
                  }`}
                />
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-brand-navy shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-brand-emerald" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 sm:px-6 pb-5 pt-1 text-sm text-brand-text leading-relaxed border-t border-brand-border/40 animate-in fade-in duration-150">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
