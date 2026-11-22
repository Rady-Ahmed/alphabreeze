-- ============================================================================
-- ALPHA BREEZE CHEMICALS — COMPREHENSIVE B2B E-COMMERCE DATABASE SETUP
-- Creates:
-- 1. Full RLS permissions on categories, subcategories, products, and quotes
-- 2. catalog_import_manifest table
-- 3. quote_requests and quote_request_items tables
-- 4. Seeds the 8 Official Core Categories
-- ============================================================================

-- 1. Categories RLS & Subcategories support
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_categories" ON public.categories;
CREATE POLICY "anon_all_categories" ON public.categories FOR ALL TO anon USING (true) WITH CHECK (true);

-- 2. Catalog Import Manifest Table
CREATE TABLE IF NOT EXISTS public.catalog_import_manifest (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  original_item_text TEXT NOT NULL,
  normalized_product_name VARCHAR(255) NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  assigned_category VARCHAR(100) NOT NULL,
  assigned_subcategory VARCHAR(100),
  product_form VARCHAR(50),
  import_status VARCHAR(50) DEFAULT 'imported', -- 'imported', 'pending_review', 'failed'
  review_status VARCHAR(50) DEFAULT 'verified', -- 'verified', 'needs_translation_review', 'needs_spec_review'
  duplicate_detection_status VARCHAR(50) DEFAULT 'unique', -- 'unique', 'variant_resolved', 'duplicate_flagged'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.catalog_import_manifest ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_manifest" ON public.catalog_import_manifest;
CREATE POLICY "anon_all_manifest" ON public.catalog_import_manifest FOR ALL TO anon USING (true) WITH CHECK (true);

-- 3. B2B Quote Requests (RFQ) System
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_number VARCHAR(50) UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  notes TEXT,
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'quoted', 'in_discussion', 'closed'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_quote_requests" ON public.quote_requests;
CREATE POLICY "anon_all_quote_requests" ON public.quote_requests FOR ALL TO anon USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.quote_request_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_request_id UUID REFERENCES public.quote_requests(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name VARCHAR(255) NOT NULL,
  quantity VARCHAR(100),
  packaging_type VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.quote_request_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_quote_request_items" ON public.quote_request_items;
CREATE POLICY "anon_all_quote_request_items" ON public.quote_request_items FOR ALL TO anon USING (true) WITH CHECK (true);

-- 4. Ensure products RLS allows anon insert/update
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_products" ON public.products;
CREATE POLICY "anon_all_products" ON public.products FOR ALL TO anon USING (true) WITH CHECK (true);

-- 5. Seed the 8 Official Core Categories
INSERT INTO public.categories (name_ar, name_en, slug, description_ar, sort_order, is_active) VALUES
  ('الزيوت والمستخلصات النباتية', 'Oils & Botanical Extracts', 'oils-and-extracts', 'زيوت طبيعية ونباتية ومستخلصات عشبية نقية لمصانع التجميل والعناية', 1, true),
  ('البودرات والمواد الفعالة', 'Raw Powders & Active Ingredients', 'raw-powders-and-actives', 'خامات وبودرات كيميائية ومواد فعالة ومكثفات ومستحلبات صناعية', 2, true),
  ('السوائل الكيميائية والمذيبات والسيليكون', 'Chemical Liquids, Solvents & Silicones', 'chemical-liquids-and-solvents', 'سوائل كيميائية ومذيبات وسيليكونات ومواد خافضة للتوتر السطحي', 3, true),
  ('الفيتامينات والأحماض الأمينية والمغذيات', 'Vitamins, Amino Acids & Nutrients', 'vitamins-and-nutrients', 'فيتامينات نقية وأحماض أمينية ومغذيات فعالة ومضادات أكسدة', 4, true),
  ('الشموع والبوليمرات', 'Waxes & Polymers', 'waxes-and-polymers', 'شموع طبيعية وبترولية ومستحلبة ومعدلة لضبط القوام', 5, true),
  ('الألوان والأصباغ والمايكا', 'Colors, Pigments & Micas', 'colors-and-pigments', 'ألوان مائية وزيتية وبودرات مايكا لامعة وأكاسيد وأصباغ تجميلية', 6, true),
  ('العطور والزيوت العطرية المركزة', 'Fragrances & Essential Scents', 'fragrances-and-scents', 'زيوت عطرية مركزة وثابتة للتركيبات التجميلية والعطور والصابون', 7, true),
  ('النكهات الغذائية والصناعية', 'Flavors', 'flavors', 'نكهات غذائية وزيتية مركزة معتمدة لمرطبات الشفاه والمنتجات التجميلية', 8, true)
ON CONFLICT (slug) DO UPDATE 
SET name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, description_ar = EXCLUDED.description_ar;
