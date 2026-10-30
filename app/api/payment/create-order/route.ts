import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createConsultationOrder, CONSULTATION_FEE_INR } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      leadId,
      fullName = "Consultation Applicant",
      mobile = "",
      email = "",
      loanCategory = "Personal Loan",
      outstandingAmount = "",
      amountInRupees = CONSULTATION_FEE_INR,
      source = "zoho_form",
    } = body;

    let targetLeadId = leadId;

    // If no existing leadId provided, ensure a lead entry is initiated in the database
    if (!targetLeadId) {
      if (mobile) {
        // Check if an entry with this mobile exists in last 24h
        const recent = await prisma.lead.findFirst({
          where: {
            mobile,
            createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
          },
          orderBy: { createdAt: "desc" },
        });

        if (recent) {
          targetLeadId = recent.id;
        }
      }

      if (!targetLeadId) {
        const newLead = await prisma.lead.create({
          data: {
            fullName: fullName || "Zoho Consultation Applicant",
            mobile: mobile || "Pending Payment",
            email: email || null,
            loanCategory: loanCategory || "Personal Loan",
            outstandingAmount: outstandingAmount || null,
            status: "NEW",
            paymentStatus: "PENDING",
            source: source || "zoho_form",
          },
        });
        targetLeadId = newLead.id;
      }
    }

    const receipt = `rcpt_${targetLeadId ? targetLeadId.slice(-8) : Date.now().toString().slice(-8)}`;

    const order = await createConsultationOrder({
      amountInRupees,
      receipt,
      notes: {
        leadId: targetLeadId || "",
        fullName: fullName || "",
        mobile: mobile || "",
        purpose: "Priority Debt Settlement Advisory",
      },
    });

    if (targetLeadId) {
      await prisma.lead.update({
        where: { id: targetLeadId },
        data: {
          razorpayOrderId: order.id,
          paymentStatus: "PENDING",
          paymentAmount: amountInRupees,
        },
      });
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: order.keyId,
      isMock: order.isMock,
      leadId: targetLeadId,
      consultationFee: amountInRupees,
    });
  } catch (error: any) {
    console.error("Create Razorpay Order Error:", error);
    return NextResponse.json(
      {
        error: "Failed to create payment order. Please contact our support team.",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
