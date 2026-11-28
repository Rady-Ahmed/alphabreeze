import { NextResponse } from "next/server";
import { createMessageForDashboard } from "@/lib/db-server";
import { sendAdminContactNotification } from "@/lib/email";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "البيانات المدخلة غير مكتملة أو غير صحيحة";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { full_name, email, phone, subject, message } = parsed.data;
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
