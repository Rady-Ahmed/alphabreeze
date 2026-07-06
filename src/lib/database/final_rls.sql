-- ============================================
-- AlphaBreeze - FINAL RLS POLICIES (VERIFIED AGAINST LIVE SCHEMA)
-- Generated: 2026-06-30
-- Run this in: Supabase SQL Editor
-- ============================================
--
-- PURPOSE:
--   The admin dashboard uses a CUSTOM auth system (localStorage + cookies).
--   All Supabase requests use the "anon" role (NOT "authenticated").
--   Every table the app reads from or writes to must have an explicit
--   policy granting the "anon" role the required operation.
--
-- VERIFIED LIVE TABLES (22 confirmed via REST API):
--   orders, order_items, customers, contact_messages,
--   manufacturing_requests, articles, article_categories,
--   products, product_images, categories, roles, users,
--   services, faqs, testimonials, banners, media,
--   seo_settings, statistics, social_media, partners,
--   website_settings
--
-- TABLE "settings" DOES NOT EXIST — excluded from this script.
-- ============================================


-- ============================================
-- 1. ORDERS
-- ============================================
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_orders"         ON public.orders;
DROP POLICY IF EXISTS "anon_insert_orders"      ON public.orders;
DROP POLICY IF EXISTS "anon_select_orders"      ON public.orders;
DROP POLICY IF EXISTS "anon_update_orders"      ON public.orders;
DROP POLICY IF EXISTS "anon_delete_orders"      ON public.orders;
DROP POLICY IF EXISTS "auth_all_orders"         ON public.orders;
CREATE POLICY "anon_all_orders" ON public.orders
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 2. ORDER ITEMS
-- ============================================
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_items"          ON public.order_items;
DROP POLICY IF EXISTS "anon_insert_items"       ON public.order_items;
DROP POLICY IF EXISTS "anon_select_items"       ON public.order_items;
DROP POLICY IF EXISTS "auth_all_items"          ON public.order_items;
CREATE POLICY "anon_all_items" ON public.order_items
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 3. CUSTOMERS
-- ============================================
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_customers"      ON public.customers;
DROP POLICY IF EXISTS "anon_insert_customers"   ON public.customers;
DROP POLICY IF EXISTS "anon_select_customers"   ON public.customers;
DROP POLICY IF EXISTS "anon_update_customers"   ON public.customers;
DROP POLICY IF EXISTS "anon_delete_customers"   ON public.customers;
DROP POLICY IF EXISTS "auth_all_customers"      ON public.customers;
CREATE POLICY "anon_all_customers" ON public.customers
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 4. CONTACT MESSAGES
-- ============================================
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_messages"       ON public.contact_messages;
DROP POLICY IF EXISTS "anon_insert_messages"    ON public.contact_messages;
DROP POLICY IF EXISTS "anon_select_messages"    ON public.contact_messages;
DROP POLICY IF EXISTS "auth_all_messages"       ON public.contact_messages;
CREATE POLICY "anon_all_messages" ON public.contact_messages
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 5. MANUFACTURING REQUESTS
-- ============================================
ALTER TABLE public.manufacturing_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_mfg"            ON public.manufacturing_requests;
DROP POLICY IF EXISTS "anon_insert_mfg"         ON public.manufacturing_requests;
DROP POLICY IF EXISTS "anon_select_mfg"         ON public.manufacturing_requests;
DROP POLICY IF EXISTS "auth_all_mfg"            ON public.manufacturing_requests;
CREATE POLICY "anon_all_mfg" ON public.manufacturing_requests
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 6. ARTICLES
-- ============================================
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_articles"       ON public.articles;
DROP POLICY IF EXISTS "anon_select_articles"    ON public.articles;
DROP POLICY IF EXISTS "auth_all_articles"       ON public.articles;
CREATE POLICY "anon_all_articles" ON public.articles
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 7. ARTICLE CATEGORIES
-- ============================================
ALTER TABLE public.article_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_article_cats"   ON public.article_categories;
CREATE POLICY "anon_all_article_cats" ON public.article_categories
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 8. PRODUCTS
-- ============================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_products"       ON public.products;
DROP POLICY IF EXISTS "anon_select_products"    ON public.products;
DROP POLICY IF EXISTS "auth_all_products"       ON public.products;
CREATE POLICY "anon_all_products" ON public.products
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 9. PRODUCT IMAGES
-- ============================================
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_images"         ON public.product_images;
CREATE POLICY "anon_all_images" ON public.product_images
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 10. CATEGORIES (product categories)
-- ============================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_categories"     ON public.categories;
CREATE POLICY "anon_all_categories" ON public.categories
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 11. ROLES
-- ============================================
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_roles"          ON public.roles;
DROP POLICY IF EXISTS "anon_select_roles"       ON public.roles;
CREATE POLICY "anon_all_roles" ON public.roles
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 12. USERS (admin users — custom auth)
-- ============================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_users"          ON public.users;
DROP POLICY IF EXISTS "anon_select_users"       ON public.users;
CREATE POLICY "anon_all_users" ON public.users
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 13. SERVICES
-- ============================================
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_services"       ON public.services;
DROP POLICY IF EXISTS "anon_select_services"    ON public.services;
CREATE POLICY "anon_all_services" ON public.services
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 14. FAQs
-- ============================================
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_faqs"           ON public.faqs;
DROP POLICY IF EXISTS "anon_select_faqs"        ON public.faqs;
CREATE POLICY "anon_all_faqs" ON public.faqs
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 15. TESTIMONIALS
-- ============================================
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_testimonials"   ON public.testimonials;
DROP POLICY IF EXISTS "anon_select_testimonials" ON public.testimonials;
CREATE POLICY "anon_all_testimonials" ON public.testimonials
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 16. BANNERS
-- ============================================
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_banners"        ON public.banners;
DROP POLICY IF EXISTS "anon_select_banners"     ON public.banners;
CREATE POLICY "anon_all_banners" ON public.banners
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 17. MEDIA (media library)
-- ============================================
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_media"          ON public.media;
DROP POLICY IF EXISTS "anon_select_media"       ON public.media;
CREATE POLICY "anon_all_media" ON public.media
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 18. SEO SETTINGS
-- ============================================
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_seo"            ON public.seo_settings;
DROP POLICY IF EXISTS "anon_select_seo"         ON public.seo_settings;
CREATE POLICY "anon_all_seo" ON public.seo_settings
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 19. STATISTICS
-- ============================================
ALTER TABLE public.statistics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_statistics"     ON public.statistics;
DROP POLICY IF EXISTS "anon_select_statistics"  ON public.statistics;
CREATE POLICY "anon_all_statistics" ON public.statistics
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 20. SOCIAL MEDIA
-- ============================================
ALTER TABLE public.social_media ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_social"         ON public.social_media;
DROP POLICY IF EXISTS "anon_select_social"      ON public.social_media;
CREATE POLICY "anon_all_social" ON public.social_media
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 21. PARTNERS
-- ============================================
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_partners"       ON public.partners;
DROP POLICY IF EXISTS "anon_select_partners"    ON public.partners;
CREATE POLICY "anon_all_partners" ON public.partners
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- 22. WEBSITE SETTINGS
-- (NOTE: table is "website_settings", NOT "settings")
-- ============================================
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_website_settings"  ON public.website_settings;
DROP POLICY IF EXISTS "anon_select_website_settings" ON public.website_settings;
CREATE POLICY "anon_all_website_settings" ON public.website_settings
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ============================================
-- VERIFICATION QUERY (optional — run separately)
-- Lists all active RLS policies for public schema tables
-- ============================================
-- SELECT schemaname, tablename, policyname, roles, cmd, qual
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;
