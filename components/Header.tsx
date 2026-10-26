"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  ShieldCheck,
  Clock,
  ArrowRight,
} from "lucide-react";
import CallbackModal from "./CallbackModal";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Notification / Trust Bar */}
      <div className="bg-brand-navy-900 text-slate-200 text-xs py-2 px-4 border-b border-brand-navy-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald" />
              Confidential Enquiries • Transparent Guidance • RBI Compliant
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {BRAND.hours}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 text-white font-medium hover:text-brand-emerald transition-colors"
            >
              <Phone className="w-3 h-3 text-brand-emerald" />
              {BRAND.phone}
            </a>
            <button
              onClick={() => setCallbackModalOpen(true)}
              className="text-brand-emerald-light hover:underline font-medium text-xs hidden sm:inline"
            >
              Request a Callback
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 z-40 bg-white transition-all duration-200 ${
          isScrolled
            ? "shadow-nav border-b border-brand-border py-2.5"
            : "border-b border-brand-border/60 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-emerald rounded-lg p-1"
            >
              <div className="relative h-12 w-44 sm:h-14 sm:w-56 overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Settle Loan Expert Logo"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((link) => {
                if (link.children) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          pathname.startsWith("/services")
                            ? "text-brand-emerald font-semibold"
                            : "text-brand-navy hover:text-brand-emerald"
                        }`}
                        onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                      >
                        {link.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            servicesDropdownOpen ? "rotate-180 text-brand-emerald" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {servicesDropdownOpen && (
                        <div className="absolute left-0 mt-1 w-80 rounded-xl bg-white shadow-xl border border-brand-border py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                          {link.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-3 hover:bg-brand-mint transition-colors group"
                            >
                              <div className="text-sm font-semibold text-brand-navy group-hover:text-brand-emerald transition-colors">
                                {child.name}
                              </div>
                              <div className="text-xs text-brand-text mt-0.5 leading-relaxed">
                                {child.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "text-brand-emerald font-semibold"
                        : "text-brand-navy hover:text-brand-emerald"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => setCallbackModalOpen(true)}
                className="hidden xl:inline-flex items-center text-xs font-semibold px-3 py-2 rounded-lg text-brand-navy hover:bg-brand-mint border border-brand-border transition-colors"
              >
                Callback
              </button>
              <Link
                href="/free-consultation"
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-lg bg-brand-emerald text-white hover:bg-brand-emerald-dark shadow-sm hover:shadow transition-all"
              >
                Get Expert Assistance
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/free-consultation"
                className="text-xs font-semibold px-3 py-2 rounded-lg bg-brand-emerald text-white sm:hidden"
              >
                Consult Now
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-brand-navy hover:bg-brand-mint focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-brand-navy" />
                ) : (
                  <Menu className="w-6 h-6 text-brand-navy" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-out Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-brand-border bg-white px-4 pt-3 pb-6 shadow-lg animate-in fade-in duration-150">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-brand-navy hover:bg-brand-mint rounded-lg"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 text-sm font-medium text-brand-navy hover:bg-brand-mint rounded-lg"
              >
                About Us
              </Link>

              {/* Mobile Services Accordion */}
              <div className="border-y border-brand-border/60 py-2 my-1">
                <span className="block px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-muted">
                  Our Services
                </span>
                <div className="mt-1 pl-2 space-y-1">
                  <Link
                    href="/services/loan-settlement"
                    className="block px-3 py-1.5 text-sm text-brand-navy hover:text-brand-emerald"
                  >
                    • Loan Settlement Assistance
                  </Link>
                  <Link
                    href="/services/credit-card-debt-settlement"
                    className="block px-3 py-1.5 text-sm text-brand-navy hover:text-brand-emerald"
                  >
                    • Credit Card Debt Settlement
                  </Link>
                  <Link
                    href="/services/personal-loan-settlement"
                    className="block px-3 py-1.5 text-sm text-brand-navy hover:text-brand-emerald"
                  >
                    • Personal Loan Settlement
                  </Link>
                  <Link
                    href="/services/business-loan-assistance"
                    className="block px-3 py-1.5 text-sm text-brand-navy hover:text-brand-emerald"
                  >
                    • Business Loan Assistance
                  </Link>
                  <Link
                    href="/services/debt-counselling-repayment-guidance"
                    className="block px-3 py-1.5 text-sm text-brand-navy hover:text-brand-emerald"
                  >
                    • Debt Counselling & Planning
                  </Link>
                </div>
              </div>

              <Link
                href="/how-it-works"
                className="px-3 py-2 text-sm font-medium text-brand-navy hover:bg-brand-mint rounded-lg"
              >
                How It Works
              </Link>
              <Link
                href="/free-consultation"
                className="px-3 py-2 text-sm font-medium text-brand-emerald font-semibold hover:bg-brand-mint rounded-lg"
              >
                Free Consultation (Zoho & Direct)
              </Link>
              <Link
                href="/faqs"
                className="px-3 py-2 text-sm font-medium text-brand-navy hover:bg-brand-mint rounded-lg"
              >
                FAQs
              </Link>
              <Link
                href="/blog"
                className="px-3 py-2 text-sm font-medium text-brand-navy hover:bg-brand-mint rounded-lg"
              >
                Financial Guides
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 text-sm font-medium text-brand-navy hover:bg-brand-mint rounded-lg"
              >
                Contact Us
              </Link>

              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCallbackModalOpen(true);
                  }}
                  className="w-full text-center py-2.5 rounded-lg border border-brand-border text-brand-navy font-semibold text-sm hover:bg-brand-mint"
                >
                  Request a Quick Callback
                </button>
                <Link
                  href="/free-consultation"
                  className="w-full text-center py-2.5 rounded-lg bg-brand-emerald text-white font-semibold text-sm hover:bg-brand-emerald-dark"
                >
                  Book Free Evaluation
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Reusable Callback Modal */}
      <CallbackModal
        isOpen={callbackModalOpen}
        onClose={() => setCallbackModalOpen(false)}
      />
    </>
  );
}
