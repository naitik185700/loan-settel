import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryForm from "@/components/EnquiryForm";
import { prisma } from "@/lib/prisma";
import { Clock, Calendar, ArrowLeft, Share2, ShieldCheck } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      images: [post.featuredImage || "/images/hero-consultation.jpg"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage || "https://settleloanexpert.in/images/hero-consultation.jpg",
    author: {
      "@type": "Organization",
      name: post.author || "Settle Loan Expert Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Settle Loan Expert",
      logo: {
        "@type": "ImageObject",
        url: "https://settleloanexpert.in/images/logo.png",
      },
    },
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
  };

  return (
    <div className="space-y-10 sm:space-y-12 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Banner */}
      <div className="bg-brand-navy py-12 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs
            items={[
              { name: "Financial Guides", href: "/blog" },
              { name: post.title },
            ]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald-light text-xs font-semibold">
            {post.category}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
            <span>By {post.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.createdAt).toLocaleDateString("en-IN", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {post.featuredImage && (
              <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={post.featuredImage}
                  alt={post.imageAlt || post.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}

            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-brand-border shadow-card">
              <div className="prose prose-slate max-w-none text-brand-text leading-relaxed space-y-4 text-sm sm:text-base">
                {post.content.split("\n\n").map((para, idx) => {
                  if (para.startsWith("## ")) {
                    return (
                      <h2
                        key={idx}
                        className="text-xl sm:text-2xl font-bold text-brand-heading pt-4 pb-2 border-b border-brand-border"
                      >
                        {para.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (para.startsWith("### ")) {
                    return (
                      <h3
                        key={idx}
                        className="text-lg font-bold text-brand-navy pt-3 pb-1"
                      >
                        {para.replace("### ", "")}
                      </h3>
                    );
                  }
                  if (para.startsWith("- ") || para.startsWith("1. ")) {
                    return (
                      <div
                        key={idx}
                        className="pl-4 border-l-2 border-brand-emerald my-2 space-y-1 text-sm leading-relaxed"
                      >
                        {para}
                      </div>
                    );
                  }
                  return <p key={idx}>{para}</p>;
                })}
              </div>

              {/* Author and Disclaimer Note */}
              <div className="mt-8 pt-6 border-t border-brand-border/60 text-xs text-slate-400 space-y-2">
                <p>
                  <strong>Editorial Note:</strong> This guide is published for educational and general information purposes under Indian banking conventions and does not constitute formal legal counsel. For specific legal advice, consult an advocate or banking professional.
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-navy hover:text-brand-emerald"
              >
                <ArrowLeft className="w-4 h-4" /> Back to all articles
              </Link>
            </div>
          </div>

          {/* Sidebar CTA (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <EnquiryForm
                defaultCategory="Personal Loan"
                title="Struggling with Debt?"
                subtitle="Speak confidentially with our advisory team to review your loans."
                source="blog_sidebar_lead"
              />

              <div className="bg-brand-mint p-5 rounded-2xl border border-brand-border space-y-2 text-xs text-brand-text">
                <div className="font-bold text-brand-navy flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                  RBI Compliance First
                </div>
                <p>
                  We assist borrowers in accordance with the Reserve Bank of India’s Fair Practices Code. No upfront lender fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
