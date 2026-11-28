import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderNumber = (searchParams.get("orderNumber") || "").trim().toUpperCase();
  const phone = (searchParams.get("phone") || "").trim();

  if (!orderNumber || !phone) {
    return NextResponse.json(
      { error: "يرجى إدخال رقم الطلب ورقم الهاتف المسجل" },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const isConfigured =
    !!supabaseUrl &&
    !!supabaseKey &&
    !supabaseUrl.includes("your-project") &&
    !supabaseKey.includes("your-anon-key");

  if (!isConfigured) {
    return NextResponse.json(
      { error: "خدمة متابعة الطلبات غير متصلة بقاعدة البيانات حالياً" },
      { status: 503 }
    );
  }

  try {
    const supabase = createClient(supabaseUrl!, supabaseKey!, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data, error } = await supabase
      .from("orders")
      .select("order_number, status, total, governorate, city, payment_method, created_at")
      .eq("order_number", orderNumber)
      .eq("phone", phone)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json(
        { error: "لم يتم العثور على طلب مطابق لرقم الطلب ورقم الهاتف" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order: data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "حدث خطأ أثناء البحث عن الطلب" },
      { status: 500 }
    );
  }
}
