import { NextResponse } from "next/server";
import { createMessageForDashboard } from "@/lib/db-server";
import { sendAdminContactNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, email, phone, subject, message } = body;

    if (!full_name || !message) {
      return NextResponse.json({ error: "الاسم والرسالة مطلوبان" }, { status: 400 });
    }

    const result = await createMessageForDashboard({ full_name, email, phone, subject, message });

    // Send notification email to admin directly
    try {
      await sendAdminContactNotification(result);
    } catch (e) {
      console.warn("Email notification failed:", e);
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "حدث خطأ" }, { status: 500 });
  }
}
