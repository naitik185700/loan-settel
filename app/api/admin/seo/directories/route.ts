import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const directories = await prisma.directoryListing.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, directories });
  } catch (error: unknown) {
    console.error("Directories GET error:", error);
    return NextResponse.json({ error: "Failed to fetch directories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, directoryUrl, category, listingUrl, status = "DISCOVERED", isPaid = false, pricing, napConsistent = true, submissionNotes } = body;

    if (!name || !directoryUrl) {
      return NextResponse.json({ error: "Directory name and URL required" }, { status: 400 });
    }

    const created = await prisma.directoryListing.create({
      data: {
        name,
        directoryUrl,
        category: category || "National Business",
        listingUrl,
        status,
        isPaid: Boolean(isPaid),
        pricing,
        napConsistent: Boolean(napConsistent),
        submissionNotes,
      },
    });

    return NextResponse.json({ success: true, directory: created });
  } catch (error: unknown) {
    console.error("Directories POST error:", error);
    return NextResponse.json({ error: "Failed to create directory" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, listingUrl, backlinkVerified, relAttribute, submissionNotes } = body;

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const updated = await prisma.directoryListing.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(listingUrl !== undefined ? { listingUrl } : {}),
        ...(backlinkVerified !== undefined ? { backlinkVerified: Boolean(backlinkVerified) } : {}),
        ...(relAttribute ? { relAttribute } : {}),
        ...(submissionNotes !== undefined ? { submissionNotes } : {}),
        lastChecked: new Date(),
      },
    });

    return NextResponse.json({ success: true, directory: updated });
  } catch (error: unknown) {
    console.error("Directories PUT error:", error);
    return NextResponse.json({ error: "Failed to update directory" }, { status: 500 });
  }
}
