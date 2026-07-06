import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";

export async function GET() {
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
