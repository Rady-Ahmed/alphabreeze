-- AlphaBreeze - Fix RLS Policies
-- Run this in Supabase SQL Editor

-- ORDERS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_orders" ON public.orders;
DROP POLICY IF EXISTS "anon_select_orders" ON public.orders;
DROP POLICY IF EXISTS "auth_all_orders" ON public.orders;
CREATE POLICY "anon_insert_orders" ON public.orders FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_select_orders" ON public.orders FOR SELECT TO anon USING (true);
CREATE POLICY "auth_all_orders" ON public.orders FOR ALL TO authenticated USING (true);

-- ORDER ITEMS
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_items" ON public.order_items;
DROP POLICY IF EXISTS "auth_all_items" ON public.order_items;
CREATE POLICY "anon_insert_items" ON public.order_items FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "auth_all_items" ON public.order_items FOR ALL TO authenticated USING (true);

-- CUSTOMERS
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_customers" ON public.customers;
DROP POLICY IF EXISTS "anon_select_customers" ON public.customers;
DROP POLICY IF EXISTS "anon_update_customers" ON public.customers;
DROP POLICY IF EXISTS "auth_all_customers" ON public.customers;
CREATE POLICY "anon_insert_customers" ON public.customers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_select_customers" ON public.customers FOR SELECT TO anon USING (true);
CREATE POLICY "anon_update_customers" ON public.customers FOR UPDATE TO anon USING (true);
CREATE POLICY "auth_all_customers" ON public.customers FOR ALL TO authenticated USING (true);

-- CONTACT MESSAGES
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "auth_all_messages" ON public.contact_messages;
CREATE POLICY "anon_insert_messages" ON public.contact_messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "auth_all_messages" ON public.contact_messages FOR ALL TO authenticated USING (true);

-- MANUFACTURING REQUESTS
ALTER TABLE public.manufacturing_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_mfg" ON public.manufacturing_requests;
DROP POLICY IF EXISTS "auth_all_mfg" ON public.manufacturing_requests;
CREATE POLICY "anon_insert_mfg" ON public.manufacturing_requests FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "auth_all_mfg" ON public.manufacturing_requests FOR ALL TO authenticated USING (true);

-- ARTICLES (read-only for public, full for authenticated)
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_articles" ON public.articles;
DROP POLICY IF EXISTS "auth_all_articles" ON public.articles;
CREATE POLICY "anon_select_articles" ON public.articles FOR SELECT TO anon USING (is_published = true);
CREATE POLICY "auth_all_articles" ON public.articles FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- PRODUCTS (read-only for public)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_products" ON public.products;
DROP POLICY IF EXISTS "auth_all_products" ON public.products;
CREATE POLICY "anon_select_products" ON public.products FOR SELECT TO anon USING (true);
CREATE POLICY "auth_all_products" ON public.products FOR ALL TO authenticated USING (true);
