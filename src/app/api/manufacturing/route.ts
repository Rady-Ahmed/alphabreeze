import { NextResponse } from "next/server";
import { createManufacturingRequestForDashboard } from "@/lib/db-server";
import { sendAdminManufacturingNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, company_name, phone, product_type, expected_quantity, project_details } = body;

    if (!full_name || !phone) {
      return NextResponse.json({ error: "الاسم ورقم الهاتف مطلوبان" }, { status: 400 });
    }

    const result = await createManufacturingRequestForDashboard({
      full_name, company_name, phone, product_type, expected_quantity, project_details,
    });

    // Send notification email to admin directly
    try {
      await sendAdminManufacturingNotification(result);
    } catch (e) {
      console.warn("Email notification failed:", e);
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "حدث خطأ" }, { status: 500 });
  }
}
