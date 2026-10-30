import crypto from "crypto";

const key_id =
  process.env.RAZORPAY_KEY_ID ||
  process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
  "rzp_live_Tu2BL8LftIdey0";
const key_secret =
  process.env.RAZORPAY_KEY_SECRET || "P5QWD23B1uSi8ZuMuB8u595o";

export const CONSULTATION_FEE_INR = parseInt(
  process.env.NEXT_PUBLIC_CONSULTATION_FEE || "499",
  10
);

export interface CreateOrderParams {
  amountInRupees?: number;
  receipt: string;
  notes?: Record<string, string>;
}

export async function createConsultationOrder(params: CreateOrderParams) {
  const amount = (params.amountInRupees || CONSULTATION_FEE_INR) * 100; // in paise

  if (!key_id || !key_secret) {
    const mockOrderId = `order_mock_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    return {
      id: mockOrderId,
      amount,
      currency: "INR",
      receipt: params.receipt,
      isMock: true,
      keyId: "rzp_test_settle_loan_expert_demo",
    };
  }

  const authHeader = `Basic ${Buffer.from(`${key_id}:${key_secret}`).toString("base64")}`;

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      currency: "INR",
      receipt: params.receipt,
      notes: params.notes || {},
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData?.error?.description || `Razorpay order creation failed: ${response.statusText}`
    );
  }

  const order = await response.json();

  return {
    id: order.id,
    amount: order.amount,
    currency: order.currency || "INR",
    receipt: order.receipt || params.receipt,
    isMock: false,
    keyId: key_id,
  };
}

export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  if (!key_secret) {
    if (orderId.startsWith("order_mock_") || paymentId.startsWith("pay_mock_")) {
      return true;
    }
  }

  try {
    const generatedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    return generatedSignature === signature;
  } catch (err) {
    console.error("Signature verification error:", err);
    return false;
  }
}
