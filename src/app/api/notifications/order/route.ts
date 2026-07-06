import { NextResponse } from "next/server";
import { sendOrderConfirmation, sendAdminOrderNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { order } = await request.json();
    
    // Send confirmation to customer
    await sendOrderConfirmation(order);
    
    // Send notification to admin
    await sendAdminOrderNotification(order);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[Notification] Order email error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
