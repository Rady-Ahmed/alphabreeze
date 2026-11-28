import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseConfigured =
    !!supabaseUrl &&
    !supabaseUrl.includes("your-project") &&
    supabaseUrl !== "YOUR_SUPABASE_URL";

  return NextResponse.json({
    ok: true,
    service: "alphabreeze-web",
    timestamp: new Date().toISOString(),
    supabaseConfigured,
    emailConfigured: !!process.env.RESEND_API_KEY,
  });
}
