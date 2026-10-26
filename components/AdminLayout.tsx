"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  HelpCircle,
  Settings,
  ShieldAlert,
  LogOut,
  Menu,
  X,
  ExternalLink,
  UserCheck,
  Bell,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // If on login or setup, just render children
  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/setup";

  useEffect(() => {
    if (isAuthPage) {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          router.push("/admin/login");
        }
      } catch {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [pathname, isAuthPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  if (isAuthPage) {
    return <div className="min-h-screen bg-brand-surface">{children}</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-surface">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-emerald"></div>
      </div>
    );
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      roles: ["SUPER_ADMIN", "ADMIN", "LEAD_MANAGER", "CONTENT_MANAGER"],
    },
    {
      name: "Leads Management",
      href: "/admin/leads",
      icon: Users,
      roles: ["SUPER_ADMIN", "ADMIN", "LEAD_MANAGER"],
    },
    {
      name: "Blog CMS",
      href: "/admin/blogs",
      icon: FileText,
      roles: ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"],
    },
    {
      name: "FAQ Manager",
      href: "/admin/faqs",
      icon: HelpCircle,
      roles: ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"],
    },
    {
      name: "Site Settings",
      href: "/admin/settings",
      icon: Settings,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      name: "Security Audit Logs",
      href: "/admin/audit-logs",
      icon: ShieldAlert,
      roles: ["SUPER_ADMIN"],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-brand-navy-900 border-r border-brand-navy-800 text-slate-300">
        <div className="p-5 border-b border-brand-navy-800">
          <Link href="/" target="_blank" className="flex items-center gap-2">
            <div className="relative h-10 w-44 bg-white rounded-lg p-1">
              <Image
                src="/images/logo.png"
                alt="Settle Loan Expert"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <div className="text-[11px] font-mono text-brand-emerald-light uppercase tracking-wider mt-2.5">
            Admin Workspace
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems
            .filter((item) => !user || item.roles.includes(user.role))
            .map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-brand-emerald text-white shadow-sm"
                      : "text-slate-300 hover:bg-brand-navy-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-brand-navy-800 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-brand-emerald/20 text-brand-emerald flex items-center justify-center font-bold text-xs uppercase">
              {user?.name?.[0] || "A"}
            </div>
            <div className="truncate flex-1">
              <div className="text-xs font-semibold text-white truncate">
                {user?.name}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {user?.role}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-brand-border px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-brand-navy hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-muted hidden sm:inline">
              Control Panel
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-brand-text hover:text-brand-emerald font-semibold transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="h-4 w-px bg-slate-200" />

            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-500 hidden sm:inline">Live Sync</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
