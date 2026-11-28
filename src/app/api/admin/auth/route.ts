import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/client";
import { signSessionToken, verifySessionToken } from "@/lib/session";

const MASTER_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@alphabreeze.com").toLowerCase().trim();
const MASTER_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@2024";

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

    const trimmedEmail = String(email).trim().toLowerCase();
    const inputPassword = String(password).trim();

    let authenticatedUser: { name: string; email: string; role: string } | null = null;

    // 1. Check Master Super-Admin
    if (trimmedEmail === MASTER_ADMIN_EMAIL && inputPassword === MASTER_ADMIN_PASSWORD) {
      authenticatedUser = {
        name: "المدير العام",
        email: MASTER_ADMIN_EMAIL,
        role: "super_admin",
      };
    }

    // 2. Fallback check in Supabase database `users` table if not master admin
    if (!authenticatedUser) {
      try {
        const supabase = createClient();
        const { data: dbUser, error } = await supabase
          .from("users")
          .select("id, name, email, role, password")
          .eq("email", trimmedEmail)
          .single();

        if (dbUser && !error) {
          // If password matches database entry or bcrypt/direct string
          if (dbUser.password === inputPassword) {
            authenticatedUser = {
              name: dbUser.name || "مدير النظام",
              email: dbUser.email,
              role: dbUser.role || "admin",
            };
          }
        }
      } catch (dbErr) {
        console.error("Database user check fallback notice:", dbErr);
      }
    }

    if (!authenticatedUser) {
      return NextResponse.json(
        { error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    const isProduction = process.env.NODE_ENV === "production";
    const sessionToken = await signSessionToken(authenticatedUser);

    // Set secure HttpOnly session cookie
    cookieStore.set("alphabreeze_session", sessionToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Set client-facing cookie for fast UI navigation and middleware routing
    cookieStore.set("alphabreeze_auth", "1", {
      httpOnly: false,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: authenticatedUser,
      message: "تم تسجيل الدخول بنجاح",
    });
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
    return NextResponse.json({ success: true, message: "تم تسجيل الخروج بنجاح" });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "حدث خطأ أثناء تسجيل الخروج" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("alphabreeze_session");
    const payload = await verifySessionToken(sessionCookie?.value);
    if (!payload) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    return NextResponse.json({
      authenticated: true,
      user: {
        name: payload.name,
        email: payload.email,
        role: payload.role,
      },
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
