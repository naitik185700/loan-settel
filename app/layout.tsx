import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BRAND } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  themeColor: "#173447",
  width: "device-width",
  initialScale: 1,
};

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL &&
  !process.env.NEXT_PUBLIC_APP_URL.includes("localhost")
    ? process.env.NEXT_PUBLIC_APP_URL
    : "https://settleloanexpert.in";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Settle Loan Expert | Debt Settlement & Loan Relief Advisors India",
    template: "%s | Settle Loan Expert",
  },
  description:
    "Confidential, ethical guidance on personal loan settlement, credit card debt resolution, and borrower rights under RBI guidelines in India. Regain financial stability.",
  keywords: [
    "loan settlement India",
    "credit card debt settlement",
    "personal loan settlement",
    "debt settlement experts",
    "RBI recovery agent guidelines",
    "one time settlement OTS",
    "stop recovery harassment",
    "CIBIL score post settlement",
    "debt restructuring India",
    "Settle Loan Expert",
  ],
  authors: [{ name: "Settle Loan Expert Advisory Team" }],
  creator: "Settle Loan Expert",
  publisher: "Settle Loan Expert Advisory Services",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    title: "Settle Loan Expert | Debt Settlement & Loan Relief Advisors India",
    description:
      "Confidential, ethical guidance on personal loan settlement, credit card debt resolution, and borrower rights under RBI guidelines in India.",
    url: "https://settleloanexpert.in",
    siteName: "Settle Loan Expert",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-consultation.jpg",
        width: 1200,
        height: 630,
        alt: "Settle Loan Expert Financial Consultation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Settle Loan Expert | Professional Debt Settlement in India",
    description:
      "Expert loan settlement assistance and borrower rights advocacy under RBI guidelines.",
    images: ["/images/hero-consultation.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo-icon.png",
    shortcut: "/images/logo-icon.png",
    apple: "/images/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: BRAND.name,
    legalName: BRAND.legalEntity,
    url: "https://settleloanexpert.in",
    logo: "https://settleloanexpert.in/images/logo.png",
    image: "https://settleloanexpert.in/images/hero-consultation.jpg",
    description: BRAND.shortDescription,
    telephone: BRAND.phone,
    email: BRAND.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sector 49, Sohna Road",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      postalCode: "122018",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    priceRange: "₹₹",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-brand-surface text-brand-text">
        {/* We render Header and Footer for public pages */}
        <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
      </body>
    </html>
  );
}

// Client wrapper to exclude Header/Footer on /admin pages
import PublicLayoutWrapper from "@/components/PublicLayoutWrapper";
