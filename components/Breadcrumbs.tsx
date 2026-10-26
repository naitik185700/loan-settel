import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-0">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-brand-muted">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-brand-emerald transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.name} className="flex items-center">
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 mx-1 shrink-0" />
              {isLast || !item.href ? (
                <span className="font-semibold text-brand-navy truncate max-w-[200px] sm:max-w-none">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-brand-emerald transition-colors truncate max-w-[160px] sm:max-w-none"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
