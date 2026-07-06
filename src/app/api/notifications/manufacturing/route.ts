import { NextResponse } from "next/server";
import { sendAdminManufacturingNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await sendAdminManufacturingNotification(body.request);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[Notification] Manufacturing email error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
