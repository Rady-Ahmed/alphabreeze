import { NextResponse } from "next/server";
import { sendAdminContactNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    await sendAdminContactNotification(message);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[Notification] Contact email error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
