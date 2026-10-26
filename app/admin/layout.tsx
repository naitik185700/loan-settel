import React from "react";
import AdminLayout from "@/components/AdminLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Settle Loan Expert",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
