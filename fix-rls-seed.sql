-- ============================================
-- Alpha Breeze — Fix RLS + Seed Default Data
-- شغّل هذا في Supabase SQL Editor
-- ============================================

-- ── 1. فتح صلاحيات RLS للجداول الناقصة ─────

-- Website Settings
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_settings" ON public.website_settings;
CREATE POLICY "anon_all_settings" ON public.website_settings FOR ALL TO anon USING (true) WITH CHECK (true);

-- Social Media
ALTER TABLE public.social_media ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_social" ON public.social_media;
CREATE POLICY "anon_all_social" ON public.social_media FOR ALL TO anon USING (true) WITH CHECK (true);

-- Services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_services" ON public.services;
CREATE POLICY "anon_all_services" ON public.services FOR ALL TO anon USING (true) WITH CHECK (true);

-- Statistics
ALTER TABLE public.statistics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_stats" ON public.statistics;
CREATE POLICY "anon_all_stats" ON public.statistics FOR ALL TO anon USING (true) WITH CHECK (true);

-- FAQs
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_faqs" ON public.faqs;
CREATE POLICY "anon_all_faqs" ON public.faqs FOR ALL TO anon USING (true) WITH CHECK (true);

-- Banners
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_banners" ON public.banners;
CREATE POLICY "anon_all_banners" ON public.banners FOR ALL TO anon USING (true) WITH CHECK (true);

-- Testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_testimonials" ON public.testimonials;
CREATE POLICY "anon_all_testimonials" ON public.testimonials FOR ALL TO anon USING (true) WITH CHECK (true);

-- Partners
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_partners" ON public.partners;
CREATE POLICY "anon_all_partners" ON public.partners FOR ALL TO anon USING (true) WITH CHECK (true);

-- SEO Settings
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_seo" ON public.seo_settings;
CREATE POLICY "anon_all_seo" ON public.seo_settings FOR ALL TO anon USING (true) WITH CHECK (true);

-- Media
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all_media" ON public.media;
CREATE POLICY "anon_all_media" ON public.media FOR ALL TO anon USING (true) WITH CHECK (true);

-- ── 2. بذر البيانات الافتراضية ───────────────

-- Website Settings
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
  ('address_en', 'Gesr El Suez Main Road, Cairo, Egypt', 'text', 'contact'),
  ('google_maps_url', 'https://maps.google.com', 'text', 'contact'),
  ('currency', 'EGP', 'text', 'general'),
  ('shipping_cost', '50', 'number', 'general'),
  ('min_order', '100', 'number', 'general'),
  ('free_shipping', '500', 'number', 'general')
ON CONFLICT (key) DO NOTHING;

-- Social Media
INSERT INTO public.social_media (platform, url, icon, sort_order, is_active) VALUES
  ('facebook', 'https://facebook.com/alphabreeze', 'facebook', 1, true),
  ('instagram', 'https://instagram.com/alphabreeze', 'instagram', 2, true),
  ('tiktok', 'https://tiktok.com/@alphabreeze', 'tiktok', 3, true),
  ('whatsapp', 'https://wa.me/201119446474', 'whatsapp', 4, true),
  ('youtube', 'https://youtube.com/@alphabreeze', 'youtube', 5, true);

-- Services
INSERT INTO public.services (title_ar, title_en, slug, short_description_ar, short_description_en, icon, sort_order, is_active) VALUES
  ('توريد خامات تجميل', 'Cosmetic Raw Materials Supply', 'raw-materials',
   'نوفر أجود أنواع الخامات والمواد الأولية لصناعة مستحضرات التجميل من مصادر معتمدة عالمياً',
   'We provide the finest raw materials from globally certified sources',
   'flask-conical', 1, true),
  ('تصنيع برايفت ليبل', 'Private Label Manufacturing', 'private-label',
   'خدمة تصنيع كاملة باسم علامتك التجارية الخاصة بجودة عالمية',
   'Complete manufacturing service under your own brand',
   'factory', 2, true),
  ('تطوير التركيبات', 'Formula Development', 'formula-development',
   'فريق متخصص من الكيميائيين في تطوير تركيبات مبتكرة وفعالة',
   'Specialized team of chemists for developing innovative formulations',
   'atom', 3, true),
  ('حلول التعبئة والتغليف', 'Packaging & Filling Solutions', 'packaging',
   'حلول تعبئة وتغليف احترافية ومتكاملة لمنتجاتك النهائية',
   'Professional and comprehensive packaging solutions for your products',
   'package', 4, true)
ON CONFLICT (slug) DO NOTHING;

-- Statistics
INSERT INTO public.statistics (label_ar, label_en, value, icon, sort_order, is_active) VALUES
  ('عملاء سعداء', 'Happy Customers', 500, 'users', 1, true),
  ('مادة خام متوفرة', 'Raw Materials', 200, 'package', 2, true),
  ('سنوات خبرة', 'Years of Experience', 10, 'award', 3, true),
  ('مشروع مكتمل', 'Completed Projects', 1000, 'check-circle', 4, true);

-- FAQs
INSERT INTO public.faqs (question_ar, answer_ar, sort_order, is_active) VALUES
  ('ما هي الحد الأدنى لكمية الطلب؟', 'يختلف الحد الأدنى حسب نوع المادة الخام والكمية المطلوبة. تواصل معنا للحصول على عرض سعر مخصص.', 1, true),
  ('هل تقدمون شهادات تحليل (COA) للمواد الخام؟', 'نعم، جميع مواد خامنا مرفقة بشهادات تحليل (COA) من الشركات المصنعة المعتمدة.', 2, true),
  ('ما هي مدة التسليم المتوقعة؟', 'للمواد المتوفرة عادة 1-3 أيام عمل، وللاستيراد 3-6 أسابيع حسب المادة.', 3, true),
  ('هل يمكنني طلب عينات قبل الشراء بالكميات؟', 'نعم، نوفر عينات للتقييم قبل الشراء بالكميات الكبيرة لمعظم المواد الخام.', 4, true),
  ('هل تقدمون خدمة تطوير التركيبات؟', 'نعم، لدينا فريق متخصص من الكيميائيين لتطوير تركيبات مخصصة لمستحضرات العناية بالبشرة والشعر.', 5, true);

-- ── 3. تحقق نهائي ────────────────────────────
SELECT 'website_settings' as table_name, count(*) as records FROM public.website_settings
UNION ALL SELECT 'social_media', count(*) FROM public.social_media
UNION ALL SELECT 'services', count(*) FROM public.services
UNION ALL SELECT 'statistics', count(*) FROM public.statistics
UNION ALL SELECT 'faqs', count(*) FROM public.faqs
UNION ALL SELECT 'products', count(*) FROM public.products;
