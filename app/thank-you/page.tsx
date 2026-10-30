import React from "react";
import ConsultationPaymentPage from "../consultation-payment/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You — Consultation Received | Settle Loan Expert",
  description:
    "Thank you for submitting your loan consultation enquiry. Complete your priority consultation booking or continue with your free evaluation query.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return <ConsultationPaymentPage />;
}
