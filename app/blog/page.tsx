import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { prisma } from "@/lib/prisma";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blogs & Financial Guides | Settle Loan Expert",
  description:
    "Expert articles and guides on loan settlement, RBI borrower guidelines, credit score rebuilding, and overcoming credit card debt in India.",
};

export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <div className="bg-brand-navy py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ name: "Financial Guides" }]} />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald-light text-xs font-semibold">
            <BookOpen className="w-4 h-4" />
            Educational Resources
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Blogs & Financial Guides
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Practical, legally grounded knowledge to help Indian consumers navigate
            debt repayment, credit scores, and fair banking practices.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-brand-border shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={post.featuredImage || "/images/hero-consultation.jpg"}
                    alt={post.imageAlt || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-brand-navy/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-brand-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime || "5 min read"}
                    </span>
                    <span>•</span>
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-brand-navy group-hover:text-brand-emerald transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-brand-text line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald hover:text-brand-emerald-dark"
                >
                  Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
