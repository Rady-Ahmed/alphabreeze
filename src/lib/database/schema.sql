-- ============================================
-- AlphaBreeze Database Schema
-- Complete PostgreSQL Schema for Supabase
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. Users & Roles
-- ============================================
CREATE TABLE public.roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) UNIQUE NOT NULL, -- 'super_admin', 'admin'
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role_id UUID REFERENCES public.roles(id) ON DELETE SET NULL,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. Categories
-- ============================================
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  slug VARCHAR(255) UNIQUE NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_categories_parent ON public.categories(parent_id);

-- ============================================
-- 3. Products
-- ============================================
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  slug VARCHAR(255) UNIQUE NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  usage_instructions_ar TEXT,
  usage_instructions_en TEXT,
  technical_specs JSONB DEFAULT '{}',
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  old_price DECIMAL(10, 2),
  discount_percentage INTEGER DEFAULT 0,
  package_size VARCHAR(100),
  sku VARCHAR(100) UNIQUE,
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  is_promotion BOOLEAN DEFAULT false,
  is_best_seller BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT,
  og_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_featured ON public.products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_active ON public.products(is_active) WHERE is_active = true;

-- Product Images
CREATE TABLE public.product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_product_images_product ON public.product_images(product_id);

-- ============================================
-- 4. Customers
-- ============================================
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  governorate VARCHAR(100),
  city VARCHAR(100),
  address TEXT,
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(12, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_customers_phone ON public.customers(phone);

-- ============================================
-- 5. Orders
-- ============================================
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(20) UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  governorate VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  notes TEXT,
  subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL DEFAULT 0,
  payment_method VARCHAR(50) NOT NULL, -- 'cod', 'bank_transfer', 'vodafone_cash', 'instapay'
  status VARCHAR(30) DEFAULT 'new', -- 'new', 'under_review', 'confirmed', 'shipping', 'delivered', 'cancelled'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_customer ON public.orders(customer_id);
CREATE INDEX idx_orders_number ON public.orders(order_number);

-- Order Items
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name VARCHAR(255) NOT NULL,
  product_image TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON public.order_items(order_id);

-- ============================================
-- 6. Services
-- ============================================
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_ar VARCHAR(255) NOT NULL,
  title_en VARCHAR(255),
  slug VARCHAR(255) UNIQUE NOT NULL,
  short_description_ar TEXT,
  short_description_en TEXT,
  description_ar TEXT,
  description_en TEXT,
  icon VARCHAR(100),
  image_url TEXT,
  banner_url TEXT,
  benefits JSONB DEFAULT '[]',
  process_steps JSONB DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_services_slug ON public.services(slug);

-- ============================================
-- 7. Manufacturing Requests
-- ============================================
CREATE TABLE public.manufacturing_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  phone VARCHAR(20) NOT NULL,
  product_type VARCHAR(255),
  expected_quantity VARCHAR(100),
  project_details TEXT,
  status VARCHAR(30) DEFAULT 'new', -- 'new', 'reviewed', 'in_progress', 'completed', 'rejected'
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. Articles (Blog)
-- ============================================
CREATE TABLE public.article_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  slug VARCHAR(255) UNIQUE NOT NULL,
  description_ar TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_ar VARCHAR(255) NOT NULL,
  title_en VARCHAR(255),
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt_ar TEXT,
  excerpt_en TEXT,
  content_ar TEXT,
  content_en TEXT,
  featured_image TEXT,
  category_id UUID REFERENCES public.article_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT,
  og_image_url TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_articles_slug ON public.articles(slug);
CREATE INDEX idx_articles_published ON public.articles(is_published) WHERE is_published = true;
CREATE INDEX idx_articles_category ON public.articles(category_id);

-- ============================================
-- 9. Testimonials
-- ============================================
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  role VARCHAR(255),
  content_ar TEXT NOT NULL,
  content_en TEXT,
  avatar_url TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 10. Partners
-- ============================================
CREATE TABLE public.partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  type VARCHAR(30) DEFAULT 'partner', -- 'partner', 'client'
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 11. FAQs
-- ============================================
CREATE TABLE public.faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_ar TEXT NOT NULL,
  question_en TEXT,
  answer_ar TEXT NOT NULL,
  answer_en TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 12. Contact Messages
-- ============================================
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  admin_reply TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 13. Banners
-- ============================================
CREATE TABLE public.banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_ar VARCHAR(255),
  title_en VARCHAR(255),
  subtitle_ar TEXT,
  subtitle_en TEXT,
  image_url TEXT NOT NULL,
  mobile_image_url TEXT,
  link_url TEXT,
  cta_text_ar VARCHAR(100),
  cta_text_en VARCHAR(100),
  type VARCHAR(30) DEFAULT 'hero', -- 'hero', 'promotion', 'popup'
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 14. Media Library
-- ============================================
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_type VARCHAR(50), -- 'image', 'video', 'document'
  file_size INTEGER,
  mime_type VARCHAR(100),
  alt_text VARCHAR(255),
  folder VARCHAR(100) DEFAULT 'general',
  uploaded_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_media_folder ON public.media(folder);

-- ============================================
-- 15. Website Settings
-- ============================================
CREATE TABLE public.website_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  type VARCHAR(30) DEFAULT 'text', -- 'text', 'number', 'json', 'image', 'boolean'
  group_name VARCHAR(50) DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 16. SEO Settings
-- ============================================
CREATE TABLE public.seo_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255),
  description TEXT,
  keywords TEXT,
  og_image TEXT,
  canonical_url TEXT,
  no_index BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 17. Statistics (Homepage)
-- ============================================
CREATE TABLE public.statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label_ar VARCHAR(100) NOT NULL,
  label_en VARCHAR(100),
  value INTEGER NOT NULL DEFAULT 0,
  icon VARCHAR(50),
  suffix VARCHAR(20) DEFAULT '+',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 18. Social Media Links
-- ============================================
CREATE TABLE public.social_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform VARCHAR(50) NOT NULL, -- 'facebook', 'instagram', 'tiktok', 'whatsapp', 'youtube'
  url TEXT NOT NULL,
  icon VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SEED DATA
-- ============================================

-- Insert default roles
INSERT INTO public.roles (name, permissions) VALUES
  ('super_admin', '{"all": true}'),
  ('admin', '{"products": true, "orders": true, "articles": true, "messages": true}');

-- Insert default statistics
INSERT INTO public.statistics (label_ar, label_en, value, icon, sort_order) VALUES
  ('عملاء سعداء', 'Happy Customers', 500, 'users', 1),
  ('منتج متوفر', 'Products Available', 200, 'package', 2),
  ('سنوات خبرة', 'Years of Experience', 10, 'award', 3),
  ('مشروع مكتمل', 'Completed Projects', 1000, 'check-circle', 4);

-- Insert default website settings
INSERT INTO public.website_settings (key, value, type, group_name) VALUES
  ('site_name_ar', 'ألفا بريز', 'text', 'general'),
  ('site_name_en', 'AlphaBreeze', 'text', 'general'),
  ('site_description_ar', 'شريك نجاحك في صناعة مستحضرات التجميل والخامات', 'text', 'general'),
  ('site_description_en', 'Your Success Partner in Cosmetic Manufacturing and Raw Materials', 'text', 'general'),
  ('phone_1', '01119446474', 'text', 'contact'),
  ('phone_2', '01016067979', 'text', 'contact'),
  ('whatsapp', '01119446474', 'text', 'contact'),
  ('email', 'info@alphabreeze.com', 'text', 'contact'),
  ('address_ar', 'طريق جسر السويس الرئيسي، أمام محطة مترو نادي الشمس، القاهرة، مصر', 'text', 'contact'),
  ('address_en', 'Gesr El Suez Main Road, In Front of Shams Club Metro Station, Cairo, Egypt', 'text', 'contact'),
  ('google_maps_url', 'https://maps.google.com', 'text', 'contact'),
  ('google_maps_embed', '', 'text', 'contact');

-- Insert default services
INSERT INTO public.services (title_ar, title_en, slug, short_description_ar, short_description_en, icon, sort_order) VALUES
  ('توريد خامات تجميل', 'Cosmetic Raw Materials Supply', 'raw-materials', 'نوفر أجود أنواع الخامات والمواد الأولية لصناعة مستحضرات التجميل', 'We provide the finest raw materials for cosmetics manufacturing', 'flask-conical', 1),
  ('تصنيع برايفت ليبل', 'Private Label Manufacturing', 'private-label', 'خدمة تصنيع كاملة باسم علامتك التجارية الخاصة', 'Complete manufacturing service under your own brand', 'factory', 2),
  ('تطوير التركيبات', 'Formula Development', 'formula-development', 'فريق متخصص في تطوير تركيبات مبتكرة وفعالة', 'Specialized team for developing innovative and effective formulations', 'atom', 3),
  ('حلول التعبئة والتغليف', 'Packaging & Filling Solutions', 'packaging', 'حلول تعبئة وتغليف احترافية لمنتجاتك', 'Professional packaging and filling solutions for your products', 'package', 4);

-- Insert default social media
INSERT INTO public.social_media (platform, url, icon, sort_order) VALUES
  ('facebook', 'https://facebook.com/alphabreeze', 'facebook', 1),
  ('instagram', 'https://instagram.com/alphabreeze', 'instagram', 2),
  ('tiktok', 'https://tiktok.com/@alphabreeze', 'tiktok', 3),
  ('whatsapp', 'https://wa.me/201119446474', 'whatsapp', 4),
  ('youtube', 'https://youtube.com/@alphabreeze', 'youtube', 5);

-- Insert default FAQs
INSERT INTO public.faqs (question_ar, answer_ar, sort_order) VALUES
  ('ما هي الحد الأدنى لكمية الطلب؟', 'يختلف الحد الأدنى حسب نوع المنتج والخدمة المطلوبة. تواصل معنا لمعرفة التفاصيل.', 1),
  ('هل تقدمون خدمة التصنيع بالعلامة التجارية الخاصة؟', 'نعم، نقدم خدمة تصنيع برايفت ليبل كاملة تشمل التطوير والتصنيع والتعبئة والتغليف.', 2),
  ('ما هي مدة التسليم المتوقعة؟', 'تعتمد مدة التسليم على حجم الطلب ونوع المنتج، عادة ما تتراوح بين 7 إلى 21 يوم عمل.', 3),
  ('هل يمكنني طلب عينات قبل الطلب بالجملة؟', 'بالتأكيد، نوفر عينات لمعظم منتجاتنا لتقييمها قبل الشراء بالكميات.', 4),
  ('هل تشحنون لجميع المحافظات؟', 'نعم، نقوم بالشحن لجميع محافظات مصر مع خيارات شحن متعددة.', 5);

-- ============================================
-- 20. ROW LEVEL SECURITY (RLS)
-- ============================================
-- ملحوظة: نظراً لأن لوحة التحكم تعتمد على تسجيل دخول مخصص (Custom Auth) وليس Supabase Auth،
-- يجب إعطاء صلاحيات كاملة لمفتاح anon للوصول للبيانات (أو تعطيل RLS).

-- ORDERS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_orders" ON public.orders;
CREATE POLICY "anon_all_orders" ON public.orders FOR ALL TO anon USING (true);

-- ORDER ITEMS
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_items" ON public.order_items;
CREATE POLICY "anon_all_items" ON public.order_items FOR ALL TO anon USING (true);

-- CUSTOMERS
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_customers" ON public.customers;
CREATE POLICY "anon_all_customers" ON public.customers FOR ALL TO anon USING (true);

-- CONTACT MESSAGES
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_messages" ON public.contact_messages;
CREATE POLICY "anon_all_messages" ON public.contact_messages FOR ALL TO anon USING (true);

-- MANUFACTURING REQUESTS
ALTER TABLE public.manufacturing_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_mfg" ON public.manufacturing_requests;
CREATE POLICY "anon_all_mfg" ON public.manufacturing_requests FOR ALL TO anon USING (true);

-- ARTICLES
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_articles" ON public.articles;
CREATE POLICY "anon_all_articles" ON public.articles FOR ALL TO anon USING (true);

-- ARTICLE CATEGORIES
ALTER TABLE public.article_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_article_cats" ON public.article_categories;
CREATE POLICY "anon_all_article_cats" ON public.article_categories FOR ALL TO anon USING (true);

-- PRODUCTS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_products" ON public.products;
CREATE POLICY "anon_all_products" ON public.products FOR ALL TO anon USING (true);
