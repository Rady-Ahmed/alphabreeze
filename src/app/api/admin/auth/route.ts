import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@alphabreeze.com";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@2024";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "يرجى إدخال البريد الإلكتروني وكلمة المرور" },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const isValidAdmin =
      trimmedEmail === DEFAULT_ADMIN_EMAIL.toLowerCase() &&
      password === DEFAULT_ADMIN_PASSWORD;

    if (!isValidAdmin) {
      return NextResponse.json(
        { error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" },
        { status: 401 }
      );
    }

    const user = {
      name: "المدير العام",
      email: trimmedEmail,
      role: "super_admin",
    };

    const cookieStore = await cookies();
    const isProduction = process.env.NODE_ENV === "production";

    // Set secure HttpOnly session cookie
    cookieStore.set("alphabreeze_session", `auth_${Date.now()}_${Buffer.from(trimmedEmail).toString("base64")}`, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Set client-facing cookie for fast UI and middleware routing
    cookieStore.set("alphabreeze_auth", "1", {
      httpOnly: false,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "حدث خطأ أثناء تسجيل الدخول" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("alphabreeze_session");
    cookieStore.delete("alphabreeze_auth");
    return NextResponse.json({ success: true, message: "تم تسجيل الخروج" });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "حدث خطأ" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("alphabreeze_session");
    if (!session || !session.value) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    return NextResponse.json({
      authenticated: true,
      user: {
        name: "المدير العام",
        email: DEFAULT_ADMIN_EMAIL,
        role: "super_admin",
      },
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
