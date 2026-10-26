import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { leadStatusUpdateSchema } from "@/lib/validations";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      notes: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json(lead);
}

export async function PATCH(
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
    const validated = leadStatusUpdateSchema.parse(body);

    const updateData: any = {
      status: validated.status,
    };

    if (validated.assignedTo !== undefined) {
      updateData.assignedTo = validated.assignedTo;
    }

    if (validated.followUpDate !== undefined) {
      updateData.followUpDate = validated.followUpDate
        ? new Date(validated.followUpDate)
        : null;
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: updateData,
    });

    // Add note if provided
    if (validated.note && validated.note.trim()) {
      await prisma.leadNote.create({
        data: {
          leadId: id,
          authorName: session.name || session.email,
          authorId: session.userId,
          content: validated.note.trim(),
        },
      });
    }

    // Log action to audit log
    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        userEmail: session.email,
        action: "UPDATE_LEAD_STATUS",
        entityType: "Lead",
        entityId: id,
        details: `Updated status to ${validated.status}${
          validated.note ? ` with note: "${validated.note.slice(0, 50)}..."` : ""
        }`,
      },
    });

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error updating lead:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || (session.role !== "SUPER_ADMIN" && session.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { id } = await params;
  await prisma.lead.delete({
    where: { id },
  });

  return NextResponse.json({ success: true, message: "Lead removed" });
}
