import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabase } from "@/lib/db";
import { verifySessionToken } from "@/lib/session";

export async function GET() {
  const cookieStore = await cookies();
  const session = await verifySessionToken(cookieStore.get("alphabreeze_session")?.value);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "No supabase" });

  try {
    // We can query the pg_class or information_schema directly through rpc if available
    // OR we can just try to select 1 row from every possible table and see if it fails.
    const possibleTables = [
      "orders", "order_items", "customers", "contact_messages", 
      "manufacturing_requests", "articles", "article_categories", 
      "products", "product_images", "settings", "faqs", "categories"
    ];

    const results: any = {};
    for (const t of possibleTables) {
      const { error } = await supabase.from(t).select("*").limit(1);
      if (error && error.code === "42P01") {
        results[t] = false; // Does not exist
      } else {
        results[t] = true; // Exists (even if RLS blocked it, error would be different)
      }
    }

    return NextResponse.json({ tables: results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
