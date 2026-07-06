/**
 * Database Service Layer
 * Provides a unified API for data operations.
 * Uses Supabase when configured, falls back to localStorage for local development.
 */

import { createClient } from "@/lib/supabase/client";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const isSupabaseConfigured = !!SUPABASE_URL && SUPABASE_URL !== "YOUR_SUPABASE_URL";

export function getSupabase() {
  if (!isSupabaseConfigured) return null;
  try {
    return createClient();
  } catch {
    return null;
  }
}

// ============================================
// PRODUCTS
// ============================================
const mapProductFromDB = (p: any) => ({
  ...p,
  name: p.name_ar || p.name,
  description: p.description_ar || p.description,
  stock: p.stock_quantity ?? p.stock ?? 0,
  emoji: p.sku ? p.sku.split('-')[0] : p.emoji || "📦",
  image: p.og_image_url || p.image || null,
});

const INITIAL_PRODUCTS = [
  { id: "1", name: "زبدة الشيا الخام", name_ar: "زبدة الشيا الخام", category: "خامات طبيعية", price: 250, oldPrice: 320, emoji: "🧴", sku: "🧴-1", badge: "الأكثر مبيعاً", stock: 100, is_active: true, is_featured: true },
  { id: "2", name: "زيت الأرجان المغربي", name_ar: "زيت الأرجان المغربي", category: "زيوت طبيعية", price: 180, oldPrice: null, emoji: "🫒", sku: "🫒-2", badge: "جديد", stock: 100, is_active: true, is_featured: false },
  { id: "3", name: "شمع العسل الطبيعي", name_ar: "شمع العسل الطبيعي", category: "شموع", price: 150, oldPrice: 200, emoji: "🍯", sku: "🍯-3", badge: "عرض", stock: 100, is_active: true, is_featured: true },
  { id: "4", name: "حمض الهيالورونيك", name_ar: "حمض الهيالورونيك", category: "مواد فعالة", price: 450, oldPrice: null, emoji: "💧", sku: "💧-4", badge: "مميز", stock: 100, is_active: true, is_featured: true },
  { id: "5", name: "فيتامين سي بودرة", name_ar: "فيتامين سي بودرة", category: "فيتامينات", price: 380, oldPrice: 450, emoji: "✨", sku: "✨-5", badge: "عرض", stock: 100, is_active: true, is_featured: true },
  { id: "6", name: "زيت جوز الهند العضوي", name_ar: "زيت جوز الهند العضوي", category: "زيوت طبيعية", price: 120, oldPrice: null, emoji: "🥥", sku: "🥥-6", badge: "جديد", stock: 100, is_active: true, is_featured: false },
  { id: "7", name: "الكولاجين البحري", name_ar: "الكولاجين البحري", category: "مواد فعالة", price: 550, oldPrice: 700, emoji: "🐚", sku: "🐚-7", badge: "عرض", stock: 100, is_active: true, is_featured: true },
  { id: "8", name: "زبدة الكاكاو", name_ar: "زبدة الكاكاو", category: "خامات طبيعية", price: 200, oldPrice: null, emoji: "🍫", sku: "🍫-8", badge: "مميز", stock: 100, is_active: true, is_featured: true },
  { id: "9", name: "زيت اللوز الحلو", name_ar: "زيت اللوز الحلو", category: "زيوت طبيعية", price: 95, oldPrice: 120, emoji: "🌰", sku: "🌰-9", badge: "عرض", stock: 100, is_active: true, is_featured: false },
  { id: "10", name: "الجلسرين النباتي", name_ar: "الجلسرين النباتي", category: "خامات طبيعية", price: 85, oldPrice: null, emoji: "🧪", sku: "🧪-10", badge: null, stock: 100, is_active: true, is_featured: false },
  { id: "11", name: "زيت الجوجوبا", name_ar: "زيت الجوجوبا", category: "زيوت طبيعية", price: 220, oldPrice: null, emoji: "🌿", sku: "🌿-11", badge: "جديد", stock: 100, is_active: true, is_featured: false },
  { id: "12", name: "النياسيناميد", name_ar: "النياسيناميد", category: "مواد فعالة", price: 320, oldPrice: 400, emoji: "⚗️", sku: "⚗️-12", badge: "عرض", stock: 100, is_active: true, is_featured: false },
];

export async function getProducts() {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(id, name_ar, slug), images:product_images(*)")
      .eq("is_active", true)
      .order("sort_order");
    if (!error && data) return data.map(mapProductFromDB);
  }
  // Fallback
  if (typeof window !== "undefined") {
    let products = JSON.parse(localStorage.getItem("alphabreeze_products") || "null");
    if (!products || products.length === 0) {
      products = INITIAL_PRODUCTS;
      localStorage.setItem("alphabreeze_products", JSON.stringify(products));
    }
    return products.filter((p: any) => p.is_active !== false);
  }
  return [];
}

export async function getAllProducts() {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(id, name_ar, slug), images:product_images(*)")
      .order("created_at", { ascending: false });
    if (!error && data) return data.map(mapProductFromDB);
  }
  // Fallback
  if (typeof window !== "undefined") {
    let products = JSON.parse(localStorage.getItem("alphabreeze_products") || "null");
    if (!products || products.length === 0) {
      products = INITIAL_PRODUCTS;
      localStorage.setItem("alphabreeze_products", JSON.stringify(products));
    }
    return products;
  }
  return [];
}

export async function getProductBySlug(slug: string) {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(id, name_ar, slug), images:product_images(*)")
      .eq("slug", slug)
      .single();
    if (!error && data) return data;
  }
  return null;
}

export async function getProductById(id: string) {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(id, name_ar, slug), images:product_images(*)")
      .eq("id", id)
      .single();
    if (!error && data) return data;
  }
  return null;
}

export async function createProduct(product: any) {
  const supabase = getSupabase();
  if (supabase) {
    const supabasePayload = {
      name_ar: product.name,
      slug: product.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
      description_ar: product.description || null,
      price: product.price,
      stock_quantity: product.stock,
      is_active: product.is_active,
      is_featured: product.is_featured,
      sku: (product.emoji || "📦") + "-" + Date.now(), // Store emoji uniquely
      og_image_url: product.image || null,
    };
    // Fetch category ID by name or create it
    if (product.category) {
      const { data: cat } = await supabase.from("categories").select("id").eq("name_ar", product.category).single();
      if (cat) {
        (supabasePayload as any).category_id = cat.id;
      } else {
        const { data: newCat } = await supabase.from("categories").insert({
          name_ar: product.category,
          slug: product.category.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
        }).select().single();
        if (newCat) (supabasePayload as any).category_id = newCat.id;
      }
    }

    const { data, error } = await supabase.from("products").insert(supabasePayload).select().single();
    if (error) throw new Error(error.message);
    return data;
  }
  // Fallback
  if (typeof window !== "undefined") {
    const products = JSON.parse(localStorage.getItem("alphabreeze_products") || "[]");
    const newProduct = { id: crypto.randomUUID(), ...product, created_at: new Date().toISOString() };
    products.push(newProduct);
    localStorage.setItem("alphabreeze_products", JSON.stringify(products));
    return newProduct;
  }
  return product;
}

export async function updateProduct(id: string, updates: any) {
  const supabase = getSupabase();
  if (supabase) {
    const supabasePayload: any = {};
    if (updates.name !== undefined) supabasePayload.name_ar = updates.name;
    if (updates.description !== undefined) supabasePayload.description_ar = updates.description;
    if (updates.price !== undefined) supabasePayload.price = updates.price;
    if (updates.stock !== undefined) supabasePayload.stock_quantity = updates.stock;
    if (updates.is_active !== undefined) supabasePayload.is_active = updates.is_active;
    if (updates.is_featured !== undefined) supabasePayload.is_featured = updates.is_featured;
    if (updates.emoji !== undefined) supabasePayload.sku = updates.emoji + "-" + Date.now();
    if (updates.image !== undefined) supabasePayload.og_image_url = updates.image;
    
    if (updates.category !== undefined) {
      const { data: cat } = await supabase.from("categories").select("id").eq("name_ar", updates.category).single();
      if (cat) {
        supabasePayload.category_id = cat.id;
      } else {
        const { data: newCat } = await supabase.from("categories").insert({
          name_ar: updates.category,
          slug: updates.category.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
        }).select().single();
        if (newCat) supabasePayload.category_id = newCat.id;
      }
    }

    const { data, error } = await supabase.from("products").update(supabasePayload).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    return data;
  }
  if (typeof window !== "undefined") {
    const products = JSON.parse(localStorage.getItem("alphabreeze_products") || "[]");
    const idx = products.findIndex((p: any) => p.id === id);
    if (idx >= 0) products[idx] = { ...products[idx], ...updates };
    localStorage.setItem("alphabreeze_products", JSON.stringify(products));
    return products[idx];
  }
  return updates;
}

export async function deleteProduct(id: string) {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return true;
  }
  if (typeof window !== "undefined") {
    const products = JSON.parse(localStorage.getItem("alphabreeze_products") || "[]");
    localStorage.setItem("alphabreeze_products", JSON.stringify(products.filter((p: any) => p.id !== id)));
    return true;
  }
  return true;
}

// ============================================
// ORDERS
// ============================================
export async function getOrders() {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("orders")
      .select("*, items:order_items(*)")
      .order("created_at", { ascending: false });
    if (!error && data) return data;
  }
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("alphabreeze_all_orders") || "[]");
  }
  return [];
}

export async function createOrder(orderData: any, items: any[]) {
  const supabase = getSupabase();
  if (supabase) {
    // Create or find customer
    let customerId = null;
    const { data: existingCustomer } = await supabase
      .from("customers")
      .select("id, total_orders, total_spent")
      .eq("phone", orderData.phone)
      .single();

    if (existingCustomer) {
      customerId = existingCustomer.id;
      await supabase
        .from("customers")
        .update({
          total_orders: (existingCustomer.total_orders || 0) + 1,
          total_spent: (existingCustomer.total_spent || 0) + orderData.total,
        })
        .eq("id", customerId);
    } else {
      const { data: newCustomer } = await supabase
        .from("customers")
        .insert({
          full_name: orderData.full_name,
          phone: orderData.phone,
          governorate: orderData.governorate,
          city: orderData.city,
          address: orderData.address,
          total_orders: 1,
          total_spent: orderData.total,
        })
        .select()
        .single();
      customerId = newCustomer?.id;
    }

    // Create order
    const { data: order, error } = await supabase
      .from("orders")
      .insert({ ...orderData, customer_id: customerId })
      .select()
      .single();
    if (error) throw new Error(error.message);

    // Create order items
    if (order && items.length > 0) {
      await supabase.from("order_items").insert(
        items.map((item) => ({ ...item, order_id: order.id }))
      );
    }

    return order;
  }
  // Fallback
  if (typeof window !== "undefined") {
    const allOrders = JSON.parse(localStorage.getItem("alphabreeze_all_orders") || "[]");
    const newOrder = { ...orderData, id: orderData.order_number, items, date: new Date().toLocaleDateString("ar-EG") };
    allOrders.unshift(newOrder);
    localStorage.setItem("alphabreeze_all_orders", JSON.stringify(allOrders));

    const newOrders = JSON.parse(localStorage.getItem("alphabreeze_new_orders") || "[]");
    newOrders.unshift(newOrder);
    localStorage.setItem("alphabreeze_new_orders", JSON.stringify(newOrders));

    window.dispatchEvent(new Event("new_order_placed"));
    return newOrder;
  }
  return orderData;
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("orders")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", orderId)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }
  if (typeof window !== "undefined") {
    const orders = JSON.parse(localStorage.getItem("alphabreeze_all_orders") || "[]");
    const idx = orders.findIndex((o: any) => o.id === orderId);
    if (idx >= 0) orders[idx].status = status;
    localStorage.setItem("alphabreeze_all_orders", JSON.stringify(orders));
    return orders[idx];
  }
  return null;
}

// ============================================
// CONTACT MESSAGES
// ============================================
export async function getMessages() {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) return data;
  }
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("alphabreeze_messages") || "[]");
  }
  return [];
}

export async function createMessage(message: any) {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("contact_messages").insert(message).select().single();
    if (error) throw new Error(error.message);
    return data;
  }
  if (typeof window !== "undefined") {
    const messages = JSON.parse(localStorage.getItem("alphabreeze_messages") || "[]");
    const newMsg = { id: crypto.randomUUID(), ...message, is_read: false, created_at: new Date().toISOString() };
    messages.unshift(newMsg);
    localStorage.setItem("alphabreeze_messages", JSON.stringify(messages));
    return newMsg;
  }
  return message;
}

// ============================================
// MANUFACTURING REQUESTS
// ============================================
export async function getManufacturingRequests() {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("manufacturing_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) return data;
  }
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("alphabreeze_manufacturing_requests") || "[]");
  }
  return [];
}

export async function createManufacturingRequest(request: any) {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("manufacturing_requests").insert(request).select().single();
    if (error) throw new Error(error.message);
    return data;
  }
  if (typeof window !== "undefined") {
    const requests = JSON.parse(localStorage.getItem("alphabreeze_manufacturing_requests") || "[]");
    const newReq = { id: crypto.randomUUID(), ...request, status: "new", created_at: new Date().toISOString() };
    requests.unshift(newReq);
    localStorage.setItem("alphabreeze_manufacturing_requests", JSON.stringify(requests));
    return newReq;
  }
  return request;
}

// ============================================
// ARTICLES
// ============================================
const INITIAL_ARTICLES = [
  { id: 1, title: "أهم 10 خامات أساسية في صناعة مستحضرات التجميل", title_ar: "أهم 10 خامات أساسية في صناعة مستحضرات التجميل", excerpt: "تعرف على أهم الخامات التي يحتاجها كل مصنع مستحضرات تجميل لإنتاج منتجات عالية الجودة.", excerpt_ar: "تعرف على أهم الخامات التي يحتاجها كل مصنع مستحضرات تجميل لإنتاج منتجات عالية الجودة.", date: "15 يونيو 2026", views: 1250, category: "خامات تجميل", is_published: true, published: true, created_at: new Date().toISOString() },
  { id: 2, title: "كيف تبدأ مشروع مستحضرات تجميل ناجح", title_ar: "كيف تبدأ مشروع مستحضرات تجميل ناجح", excerpt: "دليل شامل لبدء مشروعك الخاص في صناعة مستحضرات التجميل من الصفر حتى الاحتراف.", excerpt_ar: "دليل شامل لبدء مشروعك الخاص في صناعة مستحضرات التجميل من الصفر حتى الاحتراف.", date: "10 يونيو 2026", views: 890, category: "ريادة أعمال", is_published: true, published: true, created_at: new Date().toISOString() },
  { id: 3, title: "فوائد زيت الأرجان في العناية بالبشرة والشعر", title_ar: "فوائد زيت الأرجان في العناية بالبشرة والشعر", excerpt: "اكتشف الفوائد المذهلة لزيت الأرجان وكيفية استخدامه في منتجات العناية الشخصية.", excerpt_ar: "اكتشف الفوائد المذهلة لزيت الأرجان وكيفية استخدامه في منتجات العناية الشخصية.", date: "5 يونيو 2026", views: 670, category: "معلومات", is_published: true, published: true, created_at: new Date().toISOString() },
];

export async function getArticles(publishedOnly = true) {
  const supabase = getSupabase();
  if (supabase) {
    let query = supabase.from("articles").select("*, category:article_categories(id, name_ar, slug)");
    if (publishedOnly) query = query.eq("is_published", true);
    const { data, error } = await query.order("created_at", { ascending: false });
    if (!error && data) return data;
  }
  if (typeof window !== "undefined") {
    let articles = JSON.parse(localStorage.getItem("alphabreeze_articles") || "null");
    if (!articles || articles.length === 0) {
      articles = INITIAL_ARTICLES;
      localStorage.setItem("alphabreeze_articles", JSON.stringify(articles));
    }
    return publishedOnly ? articles.filter((a: any) => a.published !== false && a.is_published !== false) : articles;
  }
  return [];
}

export async function createArticle(article: any) {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("articles").insert(article).select().single();
    if (error) throw new Error(error.message);
    return data;
  }
  if (typeof window !== "undefined") {
    const articles = JSON.parse(localStorage.getItem("alphabreeze_articles") || "[]");
    const newArticle = { id: Date.now(), ...article, views: 0, published: true, date: new Date().toLocaleDateString("en-GB"), created_at: new Date().toISOString() };
    articles.unshift(newArticle);
    localStorage.setItem("alphabreeze_articles", JSON.stringify(articles));
    return newArticle;
  }
  return article;
}

export async function deleteArticle(id: string) {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return true;
  }
  if (typeof window !== "undefined") {
    const articles = JSON.parse(localStorage.getItem("alphabreeze_articles") || "[]");
    localStorage.setItem("alphabreeze_articles", JSON.stringify(articles.filter((a: any) => a.id !== Number(id) && a.id !== id)));
    return true;
  }
  return true;
}

// ============================================
// CATEGORIES
// ============================================
export async function getCategories() {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order");
    if (!error && data) return data;
  }
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("alphabreeze_categories") || "[]");
  }
  return [];
}

export async function getAllCategories() {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("categories")
      .select("*, products:products(id)")
      .order("sort_order");
    if (!error && data) return data;
  }
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("alphabreeze_categories") || "[]");
  }
  return [];
}

export async function createCategory(category: any) {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("categories")
      .insert({
        name_ar: category.name,
        slug: category.slug,
        is_active: category.is_active ?? true,
        sort_order: category.sort_order ?? 0,
        description_ar: category.description || null,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }
  if (typeof window !== "undefined") {
    const cats = JSON.parse(localStorage.getItem("alphabreeze_categories") || "[]");
    const newCat = { id: crypto.randomUUID(), ...category, created_at: new Date().toISOString() };
    cats.unshift(newCat);
    localStorage.setItem("alphabreeze_categories", JSON.stringify(cats));
    return newCat;
  }
  return category;
}

export async function updateCategory(id: string, updates: any) {
  const supabase = getSupabase();
  if (supabase) {
    const payload: any = {};
    if (updates.name !== undefined) payload.name_ar = updates.name;
    if (updates.slug !== undefined) payload.slug = updates.slug;
    if (updates.is_active !== undefined) payload.is_active = updates.is_active;
    if (updates.description !== undefined) payload.description_ar = updates.description;
    payload.updated_at = new Date().toISOString();
    const { data, error } = await supabase.from("categories").update(payload).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    return data;
  }
  if (typeof window !== "undefined") {
    const cats = JSON.parse(localStorage.getItem("alphabreeze_categories") || "[]");
    const idx = cats.findIndex((c: any) => c.id === id);
    if (idx >= 0) cats[idx] = { ...cats[idx], ...updates };
    localStorage.setItem("alphabreeze_categories", JSON.stringify(cats));
    return cats[idx];
  }
  return updates;
}

export async function deleteCategory(id: string) {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return true;
  }
  if (typeof window !== "undefined") {
    const cats = JSON.parse(localStorage.getItem("alphabreeze_categories") || "[]");
    localStorage.setItem("alphabreeze_categories", JSON.stringify(cats.filter((c: any) => c.id !== id)));
    return true;
  }
  return true;
}

// ============================================
// CUSTOMERS
// ============================================
export async function getCustomers() {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) return data;
  }
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("alphabreeze_customers") || "[]");
  }
  return [];
}

// ============================================
// DASHBOARD STATS
// ============================================
export async function getDashboardStats() {
  const supabase = getSupabase();
  if (supabase) {
    const [products, orders, customers, messages, manufacturing, articles] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("orders").select("id, total", { count: "exact" }),
      supabase.from("customers").select("id", { count: "exact", head: true }),
      supabase.from("contact_messages").select("id", { count: "exact", head: true }),
      supabase.from("manufacturing_requests").select("id", { count: "exact", head: true }),
      supabase.from("articles").select("id", { count: "exact", head: true }),
    ]);

    const totalRevenue = orders.data?.reduce((sum: number, o: any) => sum + (o.total || 0), 0) || 0;

    return {
      products: products.count || 0,
      orders: orders.count || 0,
      customers: customers.count || 0,
      messages: messages.count || 0,
      manufacturing: manufacturing.count || 0,
      articles: articles.count || 0,
      revenue: totalRevenue,
    };
  }
  return null; // Page will use localStorage fallback
}

// ============================================
// BANNERS
// ============================================
const INITIAL_BANNERS = [
  {
    id: "promo-1",
    title: "عرض خامات التجميل",
    title_ar: "عرض خامات التجميل",
    description: "خصم خاص على جميع الخامات الطبيعية والزيوت العطرية",
    description_ar: "خصم خاص على جميع الخامات الطبيعية والزيوت العطرية",
    type: "promotion",
    image_url: "",
    link_url: "/shop",
    is_active: true,
    sort_order: 1,
  },
  {
    id: "promo-2",
    title: "خدمة برايفت ليبل",
    title_ar: "خدمة برايفت ليبل",
    description: "احصل على خصم خاص عند طلب تصنيع أول منتج باسم علامتك",
    description_ar: "احصل على خصم خاص عند طلب تصنيع أول منتج باسم علامتك",
    type: "promotion",
    image_url: "",
    link_url: "/shop",
    is_active: true,
    sort_order: 2,
  },
];

export async function getBanners() {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .order("sort_order");
    if (!error && data) return data;
  }
  if (typeof window !== "undefined") {
    let banners = JSON.parse(localStorage.getItem("alphabreeze_banners") || "null");
    if (!banners || banners.length === 0) {
      banners = INITIAL_BANNERS;
      localStorage.setItem("alphabreeze_banners", JSON.stringify(banners));
    }
    return banners;
  }
  return [];
}

export async function createBanner(banner: any) {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("banners")
      .insert({
        title_ar: banner.title,
        type: banner.type || "hero",
        image_url: banner.image_url || "https://placehold.co/1200x400",
        link_url: banner.link_url || null,
        is_active: banner.is_active ?? true,
        sort_order: banner.sort_order ?? 0,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }
  if (typeof window !== "undefined") {
    const banners = JSON.parse(localStorage.getItem("alphabreeze_banners") || "[]");
    const newBanner = { id: crypto.randomUUID(), ...banner, created_at: new Date().toISOString() };
    banners.push(newBanner);
    localStorage.setItem("alphabreeze_banners", JSON.stringify(banners));
    return newBanner;
  }
  return banner;
}

export async function updateBanner(id: string, updates: any) {
  const supabase = getSupabase();
  if (supabase) {
    const payload: any = { updated_at: new Date().toISOString() };
    if (updates.title !== undefined) payload.title_ar = updates.title;
    if (updates.type !== undefined) payload.type = updates.type;
    if (updates.image_url !== undefined) payload.image_url = updates.image_url;
    if (updates.link_url !== undefined) payload.link_url = updates.link_url;
    if (updates.is_active !== undefined) payload.is_active = updates.is_active;
    const { data, error } = await supabase.from("banners").update(payload).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    return data;
  }
  if (typeof window !== "undefined") {
    const banners = JSON.parse(localStorage.getItem("alphabreeze_banners") || "[]");
    const idx = banners.findIndex((b: any) => b.id === id);
    if (idx >= 0) banners[idx] = { ...banners[idx], ...updates };
    localStorage.setItem("alphabreeze_banners", JSON.stringify(banners));
    return banners[idx];
  }
  return updates;
}

export async function deleteBanner(id: string) {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("banners").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return true;
  }
  if (typeof window !== "undefined") {
    const banners = JSON.parse(localStorage.getItem("alphabreeze_banners") || "[]");
    localStorage.setItem("alphabreeze_banners", JSON.stringify(banners.filter((b: any) => b.id !== id)));
    return true;
  }
  return true;
}

// ============================================
// WEBSITE SETTINGS / SOCIAL / SEO
// ============================================
const DEFAULT_SITE_SETTINGS = {
  siteNameAr: "ألفا بريز",
  siteNameEn: "AlphaBreeze",
  siteDescAr: "شريك نجاحك في صناعة مستحضرات التجميل والخامات",
  phone1: "01119446474",
  phone2: "01016067979",
  whatsapp: "01119446474",
  email: "info@alphabreeze.com",
  addressAr: "طريق جسر السويس الرئيسي، أمام محطة مترو نادي الشمس، القاهرة، مصر",
  mapsLink: "https://maps.google.com",
  mapsEmbed: "",
  shippingCost: "50",
  minOrder: "100",
  freeShipping: "500",
  currency: "EGP",
  primaryColor: "#0ea5e9",
  facebookUrl: "",
  instagramUrl: "",
  tiktokUrl: "",
  youtubeUrl: "",
  headerBanner: "",
  footerText: "جميع الحقوق محفوظة © 2024 AlphaBreeze",
};

const DEFAULT_SOCIAL_LINKS = [
  { platform: "Facebook", id: "facebook", url: "https://facebook.com/alphabreeze", color: "bg-blue-100 text-blue-600" },
  { platform: "Instagram", id: "instagram", url: "https://instagram.com/alphabreeze", color: "bg-pink-100 text-pink-600" },
  { platform: "TikTok", id: "tiktok", url: "https://tiktok.com/@alphabreeze", color: "bg-gray-100 text-gray-800" },
  { platform: "WhatsApp", id: "whatsapp", url: "https://wa.me/201119446474", color: "bg-green-100 text-green-600" },
  { platform: "YouTube", id: "youtube", url: "https://youtube.com/@alphabreeze", color: "bg-red-100 text-red-600" },
];

function mapSiteSettingsFromRows(rows: any[] = []) {
  const mapped: Record<string, string> = {};
  rows.forEach((row) => {
    if (row?.key) mapped[row.key] = row.value ?? "";
  });

  return {
    ...DEFAULT_SITE_SETTINGS,
    siteNameAr: mapped.site_name_ar || DEFAULT_SITE_SETTINGS.siteNameAr,
    siteNameEn: mapped.site_name_en || DEFAULT_SITE_SETTINGS.siteNameEn,
    siteDescAr: mapped.site_description_ar || DEFAULT_SITE_SETTINGS.siteDescAr,
    phone1: mapped.phone_1 || DEFAULT_SITE_SETTINGS.phone1,
    phone2: mapped.phone_2 || DEFAULT_SITE_SETTINGS.phone2,
    whatsapp: mapped.whatsapp || DEFAULT_SITE_SETTINGS.whatsapp,
    email: mapped.email || DEFAULT_SITE_SETTINGS.email,
    addressAr: mapped.address_ar || DEFAULT_SITE_SETTINGS.addressAr,
    mapsLink: mapped.google_maps_url || DEFAULT_SITE_SETTINGS.mapsLink,
    mapsEmbed: mapped.google_maps_embed || DEFAULT_SITE_SETTINGS.mapsEmbed,
    facebookUrl: mapped.facebook_url || "",
    instagramUrl: mapped.instagram_url || "",
    tiktokUrl: mapped.tiktok_url || "",
    youtubeUrl: mapped.youtube_url || "",
    headerBanner: mapped.header_banner || "",
    footerText: mapped.footer_text || DEFAULT_SITE_SETTINGS.footerText,
    shippingCost: mapped.shipping_cost || DEFAULT_SITE_SETTINGS.shippingCost,
    minOrder: mapped.min_order || DEFAULT_SITE_SETTINGS.minOrder,
    freeShipping: mapped.free_shipping || DEFAULT_SITE_SETTINGS.freeShipping,
    currency: mapped.currency || DEFAULT_SITE_SETTINGS.currency,
    primaryColor: mapped.primary_color || DEFAULT_SITE_SETTINGS.primaryColor,
  };
}

function mapSiteSettingsToRows(settings: any) {
  return [
    { key: "site_name_ar", value: settings.siteNameAr ?? "", type: "text", group_name: "general" },
    { key: "site_name_en", value: settings.siteNameEn ?? "", type: "text", group_name: "general" },
    { key: "site_description_ar", value: settings.siteDescAr ?? "", type: "text", group_name: "general" },
    { key: "phone_1", value: settings.phone1 ?? "", type: "text", group_name: "contact" },
    { key: "phone_2", value: settings.phone2 ?? "", type: "text", group_name: "contact" },
    { key: "whatsapp", value: settings.whatsapp ?? "", type: "text", group_name: "contact" },
    { key: "email", value: settings.email ?? "", type: "text", group_name: "contact" },
    { key: "address_ar", value: settings.addressAr ?? "", type: "text", group_name: "contact" },
    { key: "google_maps_url", value: settings.mapsLink ?? "", type: "text", group_name: "contact" },
    { key: "google_maps_embed", value: settings.mapsEmbed ?? "", type: "text", group_name: "contact" },
    { key: "shipping_cost", value: settings.shippingCost ?? "", type: "text", group_name: "shipping" },
    { key: "min_order", value: settings.minOrder ?? "", type: "text", group_name: "shipping" },
    { key: "free_shipping", value: settings.freeShipping ?? "", type: "text", group_name: "shipping" },
    { key: "currency", value: settings.currency ?? "", type: "text", group_name: "general" },
    { key: "primary_color", value: settings.primaryColor ?? "", type: "text", group_name: "general" },
    { key: "facebook_url", value: settings.facebookUrl ?? "", type: "text", group_name: "social" },
    { key: "instagram_url", value: settings.instagramUrl ?? "", type: "text", group_name: "social" },
    { key: "tiktok_url", value: settings.tiktokUrl ?? "", type: "text", group_name: "social" },
    { key: "youtube_url", value: settings.youtubeUrl ?? "", type: "text", group_name: "social" },
    { key: "header_banner", value: settings.headerBanner ?? "", type: "text", group_name: "general" },
    { key: "footer_text", value: settings.footerText ?? "", type: "text", group_name: "general" },
  ];
}

export async function getSiteSettings() {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("website_settings").select("key,value");
    if (!error && data) {
      return mapSiteSettingsFromRows(data);
    }
  }

  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("alphabreeze_settings");
      if (saved) return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(saved) };
    } catch {}
  }

  return { ...DEFAULT_SITE_SETTINGS };
}

export async function saveSiteSettings(settings: any) {
  const supabase = getSupabase();
  if (supabase) {
    const rows = mapSiteSettingsToRows(settings);
    for (const row of rows) {
      const { error } = await supabase.from("website_settings").upsert({ ...row }, { onConflict: "key" });
      if (error) throw new Error(error.message);
    }
    return settings;
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("alphabreeze_settings", JSON.stringify(settings));
  }
  return settings;
}

export async function getSocialLinks() {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("social_media").select("platform,url").order("sort_order");
    if (!error && data) {
      return DEFAULT_SOCIAL_LINKS.map((item) => {
        const match = data.find((row: any) => row.platform?.toLowerCase() === item.id.toLowerCase());
        return { ...item, url: match?.url || item.url };
      });
    }
  }

  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("alphabreeze_social_settings");
      if (saved) return JSON.parse(saved);
    } catch {}
  }

  return DEFAULT_SOCIAL_LINKS;
}

export async function saveSocialLinks(socials: any[]) {
  const supabase = getSupabase();
  if (supabase) {
    for (const social of socials) {
      const platform = social.id || social.platform?.toLowerCase();
      const { data: existing } = await supabase.from("social_media").select("id").eq("platform", platform).maybeSingle();
      if (existing?.id) {
        const { error } = await supabase.from("social_media").update({ url: social.url, updated_at: new Date().toISOString() }).eq("id", existing.id);
        if (error) throw new Error(error.message);
      } else {
        const { error } = await supabase.from("social_media").insert({ platform, url: social.url, icon: platform, is_active: true, sort_order: socials.findIndex((item) => item.id === social.id) + 1 });
        if (error) throw new Error(error.message);
      }
    }
    return socials;
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("alphabreeze_social_settings", JSON.stringify(socials));
  }
  return socials;
}

export async function getSeoSettings(pagePath = "home") {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("seo_settings").select("*").eq("page_path", pagePath).maybeSingle();
    if (!error && data) {
      return {
        title: data.title || "AlphaBreeze | شريك نجاحك في صناعة مستحضرات التجميل",
        description: data.description || "ألفا بريز - الشريك الرائد لرواد الأعمال ومصنعي مستحضرات التجميل في مصر.",
        keywords: data.keywords || "خامات تجميل, تصنيع مستحضرات تجميل, برايفت ليبل, AlphaBreeze",
        ogImage: data.og_image || "",
        canonicalUrl: data.canonical_url || "https://alphabreeze.com",
      };
    }
  }

  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("alphabreeze_seo_settings");
      if (saved) return JSON.parse(saved);
    } catch {}
  }

  return {
    title: "AlphaBreeze | شريك نجاحك في صناعة مستحضرات التجميل",
    description: "ألفا بريز - الشريك الرائد لرواد الأعمال ومصنعي مستحضرات التجميل في مصر.",
    keywords: "خامات تجميل, تصنيع مستحضرات تجميل, برايفت ليبل, AlphaBreeze",
    ogImage: "",
    canonicalUrl: "https://alphabreeze.com",
  };
}

export async function saveSeoSettings(settings: any, pagePath = "home") {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("seo_settings").upsert({
      page_path: pagePath,
      title: settings.title ?? "",
      description: settings.description ?? "",
      keywords: settings.keywords ?? "",
      og_image: settings.ogImage ?? "",
      canonical_url: settings.canonicalUrl ?? "",
      updated_at: new Date().toISOString(),
    }, { onConflict: "page_path" });
    if (error) throw new Error(error.message);
    return settings;
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("alphabreeze_seo_settings", JSON.stringify(settings));
  }
  return settings;
}

// ============================================
// AUTH
// ============================================
export async function signIn(email: string, password: string) {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);

    // Get user role from our users table
    const { data: userData } = await supabase
      .from("users")
      .select("*, role:roles(name, permissions)")
      .eq("email", email)
      .single();

    return { session: data.session, user: userData };
  }
  return null; // Page will use localStorage fallback
}

export async function signOut() {
  const supabase = getSupabase();
  if (supabase) {
    await supabase.auth.signOut();
  }
}

export async function getCurrentUser() {
  const supabase = getSupabase();
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("users")
        .select("*, role:roles(name, permissions)")
        .eq("email", user.email)
        .single();
      return data;
    }
  }
  return null;
}
