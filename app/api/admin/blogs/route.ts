import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { blogPostSchema } from "@/lib/validations";

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = blogPostSchema.parse(body);

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        featuredImage: data.featuredImage || "/images/hero-consultation.jpg",
        imageAlt: data.imageAlt || data.title,
        author: data.author || session.name,
        published: data.published,
        metaTitle: data.metaTitle || data.title,
        metaDescription: data.metaDescription || data.excerpt,
        readTime: data.readTime || "5 min read",
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        userEmail: session.email,
        action: "CREATE_POST",
        entityType: "BlogPost",
        entityId: post.id,
        details: `Created blog post: "${post.title}"`,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Create blog post error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
