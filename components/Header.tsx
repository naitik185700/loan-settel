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
  ArrowRight,
  Scale,
  CreditCard,
  UserCheck,
  Building2,
  Compass,
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
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  const serviceIcons = [Scale, CreditCard, UserCheck, Building2, Compass];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md transition-all duration-200 ${
          isScrolled
            ? "border-b border-brand-border shadow-sm py-2.5 sm:py-3"
            : "border-b border-brand-border/60 py-3 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-emerald rounded-lg"
            >
              <div className="relative h-10 w-44 sm:h-11 sm:w-48">
                <Image
                  src="/images/logo.png"
                  alt="Settle Loan Expert"
                  width={192}
                  height={44}
                  priority
                  loading="eager"
                  fetchPriority="high"
                  sizes="192px"
                  className="h-10 w-auto sm:h-11 object-contain object-left"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {NAV_LINKS.map((link) => {
                if (link.children) {
                  const isServicesActive = pathname.startsWith("/services");
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                        className={`flex items-center gap-1 px-3 py-2 text-xs xl:text-[13px] font-medium rounded-lg transition-colors ${
                          isServicesActive
                            ? "text-brand-emerald font-semibold"
                            : "text-brand-navy/85 hover:text-brand-navy hover:bg-slate-50"
                        }`}
                      >
                        {link.name}
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            servicesDropdownOpen ? "rotate-180 text-brand-emerald" : "text-slate-400"
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {servicesDropdownOpen && (
                        <div className="absolute top-full left-0 pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                          <div className="rounded-xl bg-white shadow-xl border border-brand-border p-2">
                            {link.children.map((child, idx) => {
                              const Icon = serviceIcons[idx] || Scale;
                              return (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-brand-mint transition-colors group"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-brand-emerald group-hover:text-white text-brand-emerald flex items-center justify-center shrink-0 transition-colors mt-0.5">
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-xs font-semibold text-brand-navy group-hover:text-brand-emerald transition-colors">
                                      {child.name}
                                    </div>
                                    <div className="text-[11px] text-brand-muted line-clamp-1 mt-0.5">
                                      {child.description}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
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
                    className={`px-3 py-2 text-xs xl:text-[13px] font-medium rounded-lg transition-colors ${
                      isActive
                        ? "text-brand-emerald font-semibold bg-brand-mint/50"
                        : "text-brand-navy/85 hover:text-brand-navy hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Area */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              {/* Phone Helpline */}
              <a
                href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
                className="hidden xl:flex items-center gap-2 text-xs font-semibold text-brand-navy hover:text-brand-emerald transition-colors group"
              >
                <div className="w-7 h-7 rounded-full bg-brand-mint flex items-center justify-center text-brand-emerald group-hover:scale-105 transition-transform">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>{BRAND.phone}</span>
              </a>

              {/* Single Minimal Primary CTA */}
              <Link
                href="/free-consultation"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-emerald hover:bg-brand-emerald-dark text-white font-semibold text-xs shadow-sm hover:shadow transition-all"
              >
                <span>Free Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Actions & Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/free-consultation"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-emerald text-white sm:hidden"
              >
                Consult
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-brand-navy hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-brand-navy" />
                ) : (
                  <Menu className="w-5 h-5 text-brand-navy" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-brand-border bg-white px-4 pt-3 pb-6 shadow-lg animate-in fade-in duration-150">
            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => {
                if (link.children) {
                  return (
                    <div key={link.name} className="py-2 border-y border-slate-100 my-1">
                      <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-brand-muted">
                        Services
                      </div>
                      <div className="mt-1 space-y-1 pl-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-3 py-1.5 text-xs text-brand-navy hover:text-brand-emerald rounded-lg"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 text-xs font-medium rounded-lg ${
                      isActive
                        ? "text-brand-emerald font-semibold bg-brand-mint"
                        : "text-brand-navy hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4 space-y-2 border-t border-slate-100">
                <a
                  href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
                  className="w-full py-2.5 px-3 rounded-lg bg-slate-50 border border-brand-border text-brand-navy font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-emerald" />
                  Call: {BRAND.phone}
                </a>
                <Link
                  href="/free-consultation"
                  className="w-full py-2.5 px-3 rounded-lg bg-brand-emerald text-white font-bold text-xs flex items-center justify-center gap-1.5 text-center"
                >
                  Book Free Consultation <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Callback Modal */}
      <CallbackModal
        isOpen={callbackModalOpen}
        onClose={() => setCallbackModalOpen(false)}
      />
    </>
  );
}
