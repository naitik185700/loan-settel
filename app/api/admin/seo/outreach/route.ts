import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const pitches = await prisma.outreachPitch.findMany({
      include: {
        prospect: {
          select: { domain: true, title: true, category: true, contactEmail: true, contactName: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, pitches });
  } catch (error: unknown) {
    console.error("Outreach GET error:", error);
    return NextResponse.json({ error: "Failed to fetch pitches" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { prospectId, angleType, pitchSubject, pitchBody, targetAssetUrl } = body;

    if (!prospectId || !angleType || !pitchSubject || !pitchBody || !targetAssetUrl) {
      return NextResponse.json({ error: "All pitch fields are required" }, { status: 400 });
    }

    const created = await prisma.outreachPitch.create({
      data: {
        prospectId,
        angleType,
        pitchSubject,
        pitchBody,
        targetAssetUrl,
        status: "DRAFT", // Always starts in DRAFT awaiting administrator approval
      },
    });

    await prisma.seoProspect.update({
      where: { id: prospectId },
      data: { outreachStatus: "PITCH_DRAFTED" },
    });

    return NextResponse.json({ success: true, pitch: created });
  } catch (error: unknown) {
    console.error("Outreach POST error:", error);
    return NextResponse.json({ error: "Failed to create pitch draft" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, action, responseNotes, followUpDate } = body;

    if (!id || !action) {
      return NextResponse.json({ error: "ID and Action required" }, { status: 400 });
    }

    const currentPitch = await prisma.outreachPitch.findUnique({ where: { id } });
    if (!currentPitch) {
      return NextResponse.json({ error: "Pitch not found" }, { status: 404 });
    }

    let updatedStatus = currentPitch.status;
    let approvedBy = currentPitch.approvedBy;
    let sentAt = currentPitch.sentAt;

    if (action === "approve") {
      updatedStatus = "APPROVED";
      approvedBy = user.name || user.email;
      await prisma.seoProspect.update({
        where: { id: currentPitch.prospectId },
        data: { outreachStatus: "PITCH_APPROVED" },
      });
    } else if (action === "mark-sent") {
      updatedStatus = "SENT";
      sentAt = new Date();
      await prisma.seoProspect.update({
        where: { id: currentPitch.prospectId },
        data: { outreachStatus: "SENT" },
      });
    } else if (action === "record-response") {
      updatedStatus = "REPLIED";
      await prisma.seoProspect.update({
        where: { id: currentPitch.prospectId },
        data: { outreachStatus: "REPLIED" },
      });
    } else if (action === "accept") {
      updatedStatus = "ACCEPTED";
      await prisma.seoProspect.update({
        where: { id: currentPitch.prospectId },
        data: { outreachStatus: "CONVERTED" },
      });
    } else if (action === "reject") {
      updatedStatus = "REJECTED";
      await prisma.seoProspect.update({
        where: { id: currentPitch.prospectId },
        data: { outreachStatus: "DECLINED" },
      });
    }

    const updated = await prisma.outreachPitch.update({
      where: { id },
      data: {
        status: updatedStatus,
        approvedBy,
        sentAt,
        responseNotes: responseNotes !== undefined ? responseNotes : currentPitch.responseNotes,
        followUpDate: followUpDate ? new Date(followUpDate) : currentPitch.followUpDate,
      },
    });

    return NextResponse.json({ success: true, pitch: updated });
  } catch (error: unknown) {
    console.error("Outreach PUT error:", error);
    return NextResponse.json({ error: "Failed to update pitch" }, { status: 500 });
  }
}
