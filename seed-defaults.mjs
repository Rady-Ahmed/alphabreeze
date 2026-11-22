/**
 * Seed default settings, social media, and services into Supabase
 */
import https from 'https';

const HOST = 'qrtffgjdeoakgvdqmciy.supabase.co';
const KEY = 'sb_publishable_kjvW3WGGrLUJ33u7_hPYZQ_A32Nvg1E';

function rest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: HOST, port: 443, path: `/rest/v1${path}`, method,
      headers: {
        'apikey': KEY, 'Authorization': `Bearer ${KEY}`,
        'Content-Type': 'application/json', 'Prefer': 'return=minimal',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
      }
    };
    const r = https.request(opts, (res) => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    r.on('error', reject);
    r.setTimeout(10000, () => { r.destroy(); reject(new Error('timeout')); });
    if (payload) r.write(payload);
    r.end();
  });
}

async function seedTable(name, checkPath, insertPath, records, label) {
  const check = await rest(checkPath);
  if (check.status === 200 && JSON.parse(check.body).length > 0) {
    console.log(`  ⏭️  ${label}: موجود بالفعل (${JSON.parse(check.body).length} سجل)`);
    return;
  }
  const r = await rest(insertPath, 'POST', records);
  if (r.status === 201 || r.status === 200) {
    console.log(`  ✅ ${label}: تم الإضافة (${records.length} سجل)`);
  } else {
    console.log(`  ❌ ${label}: HTTP ${r.status} — ${r.body.substring(0, 150)}`);
  }
}

async function main() {
  console.log('🌱 بذر البيانات الافتراضية...\n');

  // ── Website Settings ──────────────────────────────────
  console.log('⚙️  إعدادات الموقع:');
  await seedTable('website_settings', '/website_settings?select=id&limit=1', '/website_settings', [
    { key: 'site_name_ar', value: 'ألفا بريز', type: 'text', group_name: 'general' },
    { key: 'site_name_en', value: 'AlphaBreeze', type: 'text', group_name: 'general' },
    { key: 'site_description_ar', value: 'شريك نجاحك في صناعة مستحضرات التجميل والخامات', type: 'text', group_name: 'general' },
    { key: 'site_description_en', value: 'Your Success Partner in Cosmetic Manufacturing and Raw Materials', type: 'text', group_name: 'general' },
    { key: 'phone_1', value: '01119446474', type: 'text', group_name: 'contact' },
    { key: 'phone_2', value: '01016067979', type: 'text', group_name: 'contact' },
    { key: 'whatsapp', value: '01119446474', type: 'text', group_name: 'contact' },
    { key: 'email', value: 'info@alphabreeze.com', type: 'text', group_name: 'contact' },
    { key: 'address_ar', value: 'طريق جسر السويس الرئيسي، أمام محطة مترو نادي الشمس، القاهرة، مصر', type: 'text', group_name: 'contact' },
    { key: 'address_en', value: 'Gesr El Suez Main Road, In Front of Shams Club Metro Station, Cairo, Egypt', type: 'text', group_name: 'contact' },
    { key: 'google_maps_url', value: 'https://maps.google.com', type: 'text', group_name: 'contact' },
    { key: 'google_maps_embed', value: '', type: 'text', group_name: 'contact' },
    { key: 'currency', value: 'EGP', type: 'text', group_name: 'general' },
    { key: 'shipping_cost', value: '50', type: 'number', group_name: 'general' },
    { key: 'min_order', value: '100', type: 'number', group_name: 'general' },
    { key: 'free_shipping', value: '500', type: 'number', group_name: 'general' },
  ], 'website_settings (16 إعداد)');

  // ── Social Media ───────────────────────────────────────
  console.log('\n📱 منصات التواصل الاجتماعي:');
  await seedTable('social_media', '/social_media?select=id&limit=1', '/social_media', [
    { platform: 'facebook', url: 'https://facebook.com/alphabreeze', icon: 'facebook', sort_order: 1, is_active: true },
    { platform: 'instagram', url: 'https://instagram.com/alphabreeze', icon: 'instagram', sort_order: 2, is_active: true },
    { platform: 'tiktok', url: 'https://tiktok.com/@alphabreeze', icon: 'tiktok', sort_order: 3, is_active: true },
    { platform: 'whatsapp', url: 'https://wa.me/201119446474', icon: 'whatsapp', sort_order: 4, is_active: true },
    { platform: 'youtube', url: 'https://youtube.com/@alphabreeze', icon: 'youtube', sort_order: 5, is_active: true },
  ], 'social_media (5 منصات)');

  // ── Services ───────────────────────────────────────────
  console.log('\n🏭 الخدمات:');
  await seedTable('services', '/services?select=id&limit=1', '/services', [
    {
      title_ar: 'توريد خامات تجميل', title_en: 'Cosmetic Raw Materials Supply',
      slug: 'raw-materials',
      short_description_ar: 'نوفر أجود أنواع الخامات والمواد الأولية لصناعة مستحضرات التجميل من مصادر معتمدة عالمياً',
      short_description_en: 'We provide the finest raw materials for cosmetics manufacturing from globally certified sources',
      icon: 'flask-conical', sort_order: 1, is_active: true
    },
    {
      title_ar: 'تصنيع برايفت ليبل', title_en: 'Private Label Manufacturing',
      slug: 'private-label',
      short_description_ar: 'خدمة تصنيع كاملة باسم علامتك التجارية الخاصة بجودة عالمية',
      short_description_en: 'Complete manufacturing service under your own brand with world-class quality',
      icon: 'factory', sort_order: 2, is_active: true
    },
    {
      title_ar: 'تطوير التركيبات', title_en: 'Formula Development',
      slug: 'formula-development',
      short_description_ar: 'فريق متخصص من الكيميائيين في تطوير تركيبات مبتكرة وفعالة',
      short_description_en: 'Specialized team of chemists for developing innovative and effective formulations',
      icon: 'atom', sort_order: 3, is_active: true
    },
    {
      title_ar: 'حلول التعبئة والتغليف', title_en: 'Packaging & Filling Solutions',
      slug: 'packaging',
      short_description_ar: 'حلول تعبئة وتغليف احترافية ومتكاملة لمنتجاتك النهائية',
      short_description_en: 'Professional and comprehensive packaging and filling solutions for your final products',
      icon: 'package', sort_order: 4, is_active: true
    },
  ], 'services (4 خدمات)');

  // ── Statistics ─────────────────────────────────────────
  console.log('\n📊 الإحصائيات:');
  await seedTable('statistics', '/statistics?select=id&limit=1', '/statistics', [
    { label_ar: 'عملاء سعداء', label_en: 'Happy Customers', value: 500, icon: 'users', sort_order: 1, is_active: true },
    { label_ar: 'مادة خام متوفرة', label_en: 'Raw Materials', value: 200, icon: 'package', sort_order: 2, is_active: true },
    { label_ar: 'سنوات خبرة', label_en: 'Years of Experience', value: 10, icon: 'award', sort_order: 3, is_active: true },
    { label_ar: 'مشروع مكتمل', label_en: 'Completed Projects', value: 1000, icon: 'check-circle', sort_order: 4, is_active: true },
  ], 'statistics (4 إحصاءات)');

  // ── FAQs ───────────────────────────────────────────────
  console.log('\n❓ الأسئلة الشائعة:');
  await seedTable('faqs', '/faqs?select=id&limit=1', '/faqs', [
    { question_ar: 'ما هي الحد الأدنى لكمية الطلب؟', answer_ar: 'يختلف الحد الأدنى حسب نوع المادة الخام والكمية المطلوبة. تواصل معنا للحصول على عرض سعر مخصص.', sort_order: 1, is_active: true },
    { question_ar: 'هل تقدمون شهادات تحليل (COA) للمواد الخام؟', answer_ar: 'نعم، جميع مواد خامنا مرفقة بشهادات تحليل (Certificate of Analysis) من الشركات المصنعة المعتمدة.', sort_order: 2, is_active: true },
    { question_ar: 'ما هي مدة التسليم المتوقعة؟', answer_ar: 'تعتمد مدة التسليم على توافر المادة الخام والكمية المطلوبة. للمواد المتوفرة عادة 1-3 أيام عمل، وللاستيراد 3-6 أسابيع.', sort_order: 3, is_active: true },
    { question_ar: 'هل يمكنني طلب عينات قبل الشراء بالكميات؟', answer_ar: 'نعم، نوفر عينات للتقييم قبل الشراء بالكميات الكبيرة لمعظم المواد الخام.', sort_order: 4, is_active: true },
    { question_ar: 'هل تقدمون خدمة تطوير التركيبات (Formulation)?', answer_ar: 'نعم، لدينا فريق متخصص من الكيميائيين لتطوير تركيبات مخصصة لمستحضرات العناية بالبشرة والشعر.', sort_order: 5, is_active: true },
  ], 'faqs (5 أسئلة)');

  // ── Final verification ─────────────────────────────────
  console.log('\n🔍 تحقق نهائي:');
  const checks = [
    ['/website_settings?select=id', 'website_settings'],
    ['/social_media?select=id', 'social_media'],
    ['/services?select=id', 'services'],
    ['/statistics?select=id', 'statistics'],
    ['/faqs?select=id', 'faqs'],
    ['/products?select=id', 'products'],
  ];

  let allGood = true;
  for (const [path, name] of checks) {
    const r = await rest(path);
    const count = r.status === 200 ? JSON.parse(r.body).length : 0;
    const ok = r.status === 200 && count > 0;
    console.log(`  ${ok ? '✅' : '❌'} ${name}: ${count} سجل`);
    if (!ok) allGood = false;
  }

  console.log(`\n${'═'.repeat(51)}`);
  console.log(allGood
    ? '  🎉 الباكيند مكتمل 100% — الموقع جاهز للنشر على Vercel!'
    : '  ⚠️  بعض الجداول فارغة — راجع الأخطاء أعلاه');
  console.log(`${'═'.repeat(51)}`);
}

main().catch(console.error);
