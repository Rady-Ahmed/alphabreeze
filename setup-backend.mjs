/**
 * Alpha Breeze — Supabase Schema Runner + Product Seeder
 * يشغّل schema.sql كاملاً ثم يضيف المنتجات الـ 7
 */
import https from 'https';
import { readFileSync } from 'fs';

const HOST = 'qrtffgjdeoakgvdqmciy.supabase.co';
const ANON_KEY = 'sb_publishable_kjvW3WGGrLUJ33u7_hPYZQ_A32Nvg1E';
const SERVICE_KEY = 'sb_publishable_WtnXYkS_3kpYaZXtnSzcyQ_p8S4SWGY';

function httpsReq(hostname, path, method, body, key) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const opts = {
      hostname, port: 443, path, method,
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
      }
    };
    const r = https.request(opts, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    r.on('error', reject);
    r.setTimeout(30000, () => { r.destroy(); reject(new Error('timeout')); });
    if (payload) r.write(payload);
    r.end();
  });
}

function rest(path, method = 'GET', body = null, key = ANON_KEY) {
  return httpsReq(HOST, `/rest/v1${path}`, method, body, key);
}

// ═══════════════════════════════════════════════════════
// PRODUCTS SEED DATA — الـ 7 منتجات الكيميائية
// ═══════════════════════════════════════════════════════
const PRODUCTS = [
  {
    name_ar: 'مونو بروبيلين جلايكول (MPG)',
    name_en: 'Mono Propylene Glycol',
    slug: 'mono-propylene-glycol-mpg',
    description_ar: 'مذيب ومرطب أساسي يدخل في تصنيع الكريمات واللوشن والسيروم والشامبو، ويساعد على استقرار التركيبات وتحسين القوام.',
    technical_specs: {
      inci_name: 'Propylene Glycol',
      scientific_name: 'Propane-1,2-diol',
      cas_number: '57-55-6',
      purity_grade: '99.8% MIN',
      origin_country: 'الصين',
      package_size: 'برميل صناعي (صافي 215 كجم / إجمالي 233 كجم)',
      net_weight: '215 كجم',
      gross_weight: '233 كجم'
    },
    price: 135.00,
    package_size: 'برميل صناعي 215 كجم',
    sku: 'RAW-MPG-57556',
    og_image_url: '/images/products/mpg.jpg',
    is_active: true,
    is_featured: true,
    is_new: true,
    stock_quantity: 2150
  },
  {
    name_ar: 'البانثينول (D-Panthenol)',
    name_en: 'D-Panthenol (Dexpanthenol)',
    slug: 'd-panthenol-dexpanthenol',
    description_ar: 'ترطيب البشرة وتحسين مرونتها ودعم حاجز البشرة، يدخل في منتجات العناية بالبشرة والشعر.',
    technical_specs: {
      inci_name: 'Panthenol',
      scientific_name: 'D-Panthenol',
      cas_number: '81-13-0',
      purity_grade: '98% MIN',
      origin_country: 'الصين',
      package_size: 'جالون صناعي (صافي 20 كجم / إجمالي 21 كجم)',
      net_weight: '20 كجم',
      gross_weight: '21 كجم'
    },
    price: 1100.00,
    package_size: '20 كجم',
    sku: 'RAW-DPN-81130',
    og_image_url: '/images/products/d-panthenol.jpg',
    is_active: true,
    is_featured: true,
    is_new: true,
    stock_quantity: 200
  },
  {
    name_ar: 'لانيت 16 (كحول سيتيلي)',
    name_en: 'Lanette 16 (Cetyl Alcohol)',
    slug: 'lanette-16-cetyl-alcohol',
    description_ar: 'مادة مكثفة ومحسنة لقوام وملمس الكريمات واللوشن ومنتجات العناية بالشعر.',
    technical_specs: {
      inci_name: 'Cetyl Alcohol',
      scientific_name: 'Hexadecan-1-ol',
      cas_number: '36653-82-4',
      origin_country: 'ماليزيا',
      manufacturer: 'Suriachem',
      package_size: 'شيكارة (25 كجم)',
      source: 'نباتي - Palm / Vegetable'
    },
    price: 180.00,
    package_size: 'شيكارة 25 كجم',
    sku: 'RAW-LA16-36653',
    og_image_url: '/images/products/lanette-16.jpg',
    is_active: true,
    is_featured: true,
    stock_quantity: 500
  },
  {
    name_ar: 'اللانولين اللامائي',
    name_en: 'Lanolin Anhydrous',
    slug: 'lanolin-anhydrous',
    description_ar: 'مادة مطرية ومرطبة تدخل في منتجات العناية بالبشرة والشعر وتساعد على تقليل الجفاف.',
    technical_specs: {
      inci_name: 'Lanolin',
      scientific_name: 'Lanolin',
      cas_number: '8006-54-0',
      origin_country: 'الهند',
      package_size: 'برميل معدني (50 كجم)',
      net_weight: '50 كجم'
    },
    price: 850.00,
    package_size: 'برميل معدني 50 كجم',
    sku: 'RAW-LAN-800654',
    og_image_url: '/images/products/lanolin.jpg',
    is_active: true,
    is_featured: true,
    stock_quantity: 300
  },
  {
    name_ar: 'فيتامين هـ (أسيتات ألفا توكوفيرول)',
    name_en: 'Vitamin E (DL-Alpha Tocopheryl Acetate)',
    slug: 'vitamin-e-dl-alpha-tocopheryl-acetate',
    description_ar: 'مضاد أكسدة يدخل في تركيبات العناية بالبشرة والشعر ويساعد على حماية التركيبات من الأكسدة.',
    technical_specs: {
      inci_name: 'Tocopheryl Acetate',
      scientific_name: 'DL-Alpha Tocopheryl Acetate',
      cas_number: '7695-91-2',
      origin_country: 'الصين',
      manufacturer: 'Zhejiang NHU',
      package_size: 'عبوة صناعية (20 كجم)',
      net_weight: '20 كجم'
    },
    price: 1800.00,
    package_size: '20 كجم',
    sku: 'RAW-VTE-769591',
    og_image_url: '/images/products/vitamin-e.jpg',
    is_active: true,
    is_featured: true,
    stock_quantity: 100
  },
  {
    name_ar: 'حمض الشمع (Stearic Acid)',
    name_en: 'Stearic Acid',
    slug: 'stearic-acid',
    description_ar: 'مادة تدخل في تصنيع الكريمات واللوشن والصابون والشامبو والبلسم، وتساعد على ضبط القوام وتحسين خصائص المنتج.',
    technical_specs: {
      inci_name: 'Stearic Acid',
      scientific_name: 'Octadecanoic Acid',
      cas_number: '57-11-4',
      origin_country: 'إندونيسيا / ماليزيا',
      manufacturer: 'Palmera / Zanyu',
      package_size: 'شيكارة (25 كجم)'
    },
    price: 135.00,
    package_size: 'شيكارة 25 كجم',
    sku: 'RAW-STA-571140',
    og_image_url: '/images/products/stearic-acid.jpg',
    is_active: true,
    is_featured: true,
    stock_quantity: 1000
  },
  {
    name_ar: 'أيزوبروبيل ميرستات (IPM)',
    name_en: 'Isopropyl Myristate (IPM)',
    slug: 'isopropyl-myristate-ipm',
    description_ar: 'مادة مطرية ومذيبة تساعد على تحسين انتشار المنتجات وملمس تركيبات العناية بالبشرة والشعر.',
    technical_specs: {
      inci_name: 'Isopropyl Myristate',
      scientific_name: 'Isopropyl Myristate',
      cas_number: '110-27-0',
      package_size: 'تعبئة صناعية معتمدة'
    },
    price: 0,
    package_size: 'تعبئة صناعية',
    sku: 'RAW-IPM-110270',
    og_image_url: '/images/products/ipm.jpg',
    is_active: true,
    is_featured: true,
    stock_quantity: 0
  }
];

async function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  ALPHA BREEZE — Backend Setup & Product Seeder    ');
  console.log('  Supabase: qrtffgjdeoakgvdqmciy                   ');
  console.log('═══════════════════════════════════════════════════\n');

  let pass = 0, fail = 0;

  // ── خطوة 1: اختبار الاتصال ─────────────────────────────
  console.log('📡 الخطوة 1: اختبار الاتصال...');
  try {
    const r = await rest('/products?select=id&limit=1', 'GET', null, ANON_KEY);
    if (r.status === 200 || r.status === 404) {
      if (r.status === 404) console.log('  ✅ متصل — الجداول غير موجودة بعد (يحتاج schema)\n');
      else {
        const count = JSON.parse(r.body).length;
        console.log(`  ✅ متصل — ${count} منتج موجود بالفعل\n`);
      }
      pass++;
    } else {
      console.log(`  ❌ HTTP ${r.status}: ${r.body.substring(0, 100)}\n`);
      fail++;
    }
  } catch(e) {
    console.log(`  ❌ ${e.message}\n`);
    fail++;
    console.log('⚠️  لا يمكن المتابعة بدون اتصال. تحقق من المفاتيح والـ URL.');
    return;
  }

  // ── خطوة 2: محاولة إضافة المنتجات مباشرة ─────────────
  console.log('📦 الخطوة 2: إضافة المنتجات الـ 7...');

  // Check if products table exists first
  const checkR = await rest('/products?select=id&limit=1', 'GET', null, ANON_KEY);
  
  if (checkR.status === 404 && checkR.body.includes('PGRST205')) {
    console.log('  ⚠️  جدول products غير موجود — يحتاج تشغيل Schema أولاً');
    console.log('\n  📋 يرجى تشغيل الـ SQL التالي في Supabase SQL Editor:');
    console.log('     Dashboard → SQL Editor → New Query → الصق محتوى schema.sql → Run\n');
    console.log('  ملف الـ Schema: src/lib/database/schema.sql\n');
    
    // Try using management API to run SQL
    console.log('  🔄 محاولة تشغيل Schema تلقائياً عبر Management API...');
    try {
      const schemaSQL = readFileSync('./src/lib/database/schema.sql', 'utf8');
      const mgmtR = await httpsReq(
        'api.supabase.com',
        '/v1/projects/qrtffgjdeoakgvdqmciy/database/query',
        'POST',
        { query: schemaSQL },
        SERVICE_KEY
      );
      console.log(`  Management API Response: HTTP ${mgmtR.status}`);
      if (mgmtR.status === 200 || mgmtR.status === 201) {
        console.log('  ✅ Schema تم تشغيله بنجاح!');
        pass++;
      } else {
        console.log(`  ❌ ${mgmtR.body.substring(0, 300)}`);
        fail++;
      }
    } catch(e) {
      console.log(`  ❌ Management API: ${e.message}`);
      fail++;
    }
  } else if (checkR.status === 200) {
    // Table exists — insert products
    console.log('  ✅ جدول products موجود — سيتم إضافة المنتجات...\n');
    
    for (const product of PRODUCTS) {
      try {
        // Check if product already exists by slug
        const existR = await rest(`/products?slug=eq.${product.slug}&select=id`, 'GET', null, ANON_KEY);
        if (existR.status === 200 && JSON.parse(existR.body).length > 0) {
          console.log(`  ⏭️  موجود بالفعل: ${product.name_en}`);
          pass++;
          continue;
        }

        const insR = await rest('/products', 'POST', product, ANON_KEY);
        if (insR.status === 201 || insR.status === 200) {
          console.log(`  ✅ تم إضافة: ${product.name_en} (${product.price > 0 ? product.price + ' جنيه' : 'السعر عند الاستفسار'})`);
          pass++;
        } else {
          console.log(`  ❌ فشل: ${product.name_en} — HTTP ${insR.status}: ${insR.body.substring(0, 150)}`);
          fail++;
        }
      } catch(e) {
        console.log(`  ❌ ${product.name_en}: ${e.message}`);
        fail++;
      }
    }
  }

  // ── خطوة 3: اختبار شامل ───────────────────────────────
  console.log('\n🧪 الخطوة 3: اختبار شامل لقاعدة البيانات...');
  const tables = ['products', 'website_settings', 'orders', 'contact_messages', 'manufacturing_requests'];
  for (const table of tables) {
    try {
      const r = await rest(`/${table}?select=id&limit=1`, 'GET', null, ANON_KEY);
      if (r.status === 200) {
        const count = JSON.parse(r.body).length;
        console.log(`  ✅ ${table}: يعمل (${count} سجل)`);
        pass++;
      } else {
        console.log(`  ❌ ${table}: HTTP ${r.status}`);
        fail++;
      }
    } catch(e) {
      console.log(`  ❌ ${table}: ${e.message}`);
      fail++;
    }
  }

  // ── النتيجة النهائية ───────────────────────────────────
  console.log('\n═══════════════════════════════════════════════════');
  console.log(`  النتيجة: ${pass} ✅ نجح  |  ${fail} ❌ فشل`);
  console.log('═══════════════════════════════════════════════════');

  if (fail === 0) {
    console.log('\n🎉 الباكيند يعمل بالكامل! الموقع جاهز للنشر على Vercel.');
  } else {
    console.log('\n⚠️  بعض الخطوات تحتاج إجراء يدوي في Supabase Dashboard.');
    console.log('    اذهب إلى: SQL Editor → الصق schema.sql كاملاً → Run');
  }
}

main().catch(console.error);
