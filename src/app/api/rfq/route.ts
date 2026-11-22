import { NextResponse } from "next/server";
import { createManufacturingRequestForDashboard } from "@/lib/db-server";
import { sendAdminManufacturingNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      full_name,
      company_name,
      phone,
      email,
      product_name,
      cas_number,
      expected_quantity,
      packaging_type,
      notes,
    } = body;

    if (!full_name || !phone || !product_name) {
      return NextResponse.json(
        { error: "الاسم ورقم الهاتف واسم المادة الخام مطلوبة" },
        { status: 400 }
      );
    }

    const projectDetails = `[طلب عرض سعر مادة خام B2B]
المادة: ${product_name}
رقم CAS: ${cas_number || "غير محدد"}
الكمية المطلوبة: ${expected_quantity || "غير محددة"}
نوع التعبئة: ${packaging_type || "حسب المتاح"}
البريد الإلكتروني: ${email || "غير متوفر"}
ملاحظات إضافية: ${notes || "لا توجد"}`;

    const record = await createManufacturingRequestForDashboard({
      full_name,
      company_name: company_name || "مصنع / معمل تركيبات",
      phone,
      product_type: `توريد خام: ${product_name}`,
      expected_quantity: expected_quantity || "كمية تجارية",
      project_details: projectDetails,
    });

    try {
      await sendAdminManufacturingNotification({
        ...record,
        full_name,
        phone,
        company_name: company_name || "جهة تصنيع",
        project_details: projectDetails,
      });
    } catch (mailErr) {
      console.warn("Could not send admin RFQ notification email:", mailErr);
    }

    return NextResponse.json({ success: true, data: record });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "حدث خطأ أثناء إرسال طلب عرض السعر" },
      { status: 500 }
    );
  }
}
