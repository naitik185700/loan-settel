import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { faqSchema } from "@/lib/validations";

export async function GET() {
  const faqs = await prisma.fAQ.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(faqs);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = faqSchema.parse(body);

    const faq = await prisma.fAQ.create({
      data: {
        question: data.question,
        answer: data.answer,
        category: data.category,
        order: data.order,
        isActive: data.isActive,
      },
    });

    return NextResponse.json(faq, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}
