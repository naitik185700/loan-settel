import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyRazorpaySignature, CONSULTATION_FEE_INR } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      leadId,
      amountPaid = CONSULTATION_FEE_INR,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json(
        { error: "Missing required payment parameters" },
        { status: 400 }
      );
    }

    const isValid = verifyRazorpaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature || "",
    });

    if (!isValid) {
      if (leadId) {
        await prisma.lead.update({
          where: { id: leadId },
          data: {
            paymentStatus: "FAILED",
            notes: {
              create: {
                authorName: "Razorpay Gateway",
                content: `Payment signature verification failed for Order ${razorpay_order_id}`,
              },
            },
          },
        });
      }

      return NextResponse.json(
        { error: "Payment verification failed. Invalid digital signature." },
        { status: 400 }
      );
    }

    // Payment Verified! Generate Paid Lead
    let updatedLead: any = null;

    if (leadId) {
      updatedLead = await prisma.lead.update({
        where: { id: leadId },
        data: {
          paymentStatus: "PAID",
          status: "CONVERTED",
          paymentAmount: amountPaid,
          razorpayPaymentId: razorpay_payment_id,
          razorpayOrderId: razorpay_order_id,
          paidAt: new Date(),
          notes: {
            create: {
              authorName: "Razorpay Gateway",
              content: `Payment of ₹${amountPaid} verified successfully. Payment ID: ${razorpay_payment_id}. Fast-track Priority Consultation Lead generated.`,
            },
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified! Priority Consultation is now active.",
      lead: updatedLead,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount: amountPaid,
    });
  } catch (error: any) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json(
      { error: "Error verifying payment", details: error?.message },
      { status: 500 }
    );
  }
}
