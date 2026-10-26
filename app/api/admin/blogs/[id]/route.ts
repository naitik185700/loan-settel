import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { blogPostSchema } from "@/lib/validations";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const data = blogPostSchema.parse(body);

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        featuredImage: data.featuredImage,
        imageAlt: data.imageAlt,
        author: data.author,
        published: data.published,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        readTime: data.readTime,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        userEmail: session.email,
        action: "UPDATE_POST",
        entityType: "BlogPost",
        entityId: post.id,
        details: `Updated blog post: "${post.title}"`,
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Update blog post error:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.blogPost.delete({
    where: { id },
  });

  await prisma.auditLog.create({
    data: {
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE_POST",
      entityType: "BlogPost",
      entityId: id,
    },
  });

  return NextResponse.json({ success: true });
}
