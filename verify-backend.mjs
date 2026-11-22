/**
 * Alpha Breeze — Full Backend Verification Test
 * يتحقق من عمل كل وظائف الباكيند
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
        'Content-Type': 'application/json', 'Prefer': 'return=representation',
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

let pass = 0, fail = 0;
async function test(name, fn) {
  try {
    const result = await fn();
    if (result.ok) { console.log(`  ✅ ${name}: ${result.msg}`); pass++; }
    else { console.log(`  ❌ ${name}: ${result.msg}`); fail++; }
  } catch(e) { console.log(`  ❌ ${name}: ${e.message}`); fail++; }
}

async function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  ALPHA BREEZE — Full Backend Verification         ');
  console.log('═══════════════════════════════════════════════════\n');

  // ── قراءة المنتجات ─────────────────────────────────────
  console.log('📦 اختبار المنتجات:');
  await test('قراءة كل المنتجات', async () => {
    const r = await rest('/products?select=id,name_ar,price,sku,is_active');
    if (r.status !== 200) return { ok: false, msg: `HTTP ${r.status}` };
    const data = JSON.parse(r.body);
    return { ok: data.length === 7, msg: `${data.length}/7 منتج` };
  });

  await test('المنتج MPG (57-55-6)', async () => {
    const r = await rest("/products?slug=eq.mono-propylene-glycol-mpg&select=name_ar,price,technical_specs");
    if (r.status !== 200) return { ok: false, msg: `HTTP ${r.status}` };
    const data = JSON.parse(r.body);
    return { ok: data.length > 0 && data[0].price === 135, msg: `${data[0]?.name_ar} — ${data[0]?.price} جنيه` };
  });

  await test('منتج IPM (بدون سعر)', async () => {
    const r = await rest("/products?slug=eq.isopropyl-myristate-ipm&select=name_ar,price");
    if (r.status !== 200) return { ok: false, msg: `HTTP ${r.status}` };
    const data = JSON.parse(r.body);
    return { ok: data.length > 0 && data[0].price === 0, msg: `السعر: ${data[0]?.price === 0 ? 'عند الاستفسار ✓' : data[0]?.price}` };
  });

  await test('المنتجات المميزة (is_featured)', async () => {
    const r = await rest('/products?is_featured=eq.true&select=id');
    if (r.status !== 200) return { ok: false, msg: `HTTP ${r.status}` };
    const data = JSON.parse(r.body);
    return { ok: data.length === 7, msg: `${data.length} منتج مميز` };
  });

  // ── كتابة رسالة تسعير ──────────────────────────────────
  console.log('\n📋 اختبار رسائل الاستفسار (RFQ):');
  let testMsgId = null;
  await test('إرسال استفسار تجريبي', async () => {
    const r = await rest('/contact_messages', 'POST', {
      full_name: 'TEST_AGENT_AUTO',
      phone: '01000000000',
      email: 'test@alphabreeze.com',
      subject: 'اختبار باكيند تلقائي - يمكن حذفه',
      message: 'هذه رسالة اختبار آلية من السيستم'
    });
    if (r.status === 201) {
      const data = JSON.parse(r.body);
      testMsgId = data?.[0]?.id || data?.id;
      return { ok: true, msg: `ID: ${testMsgId}` };
    }
    return { ok: false, msg: `HTTP ${r.status}: ${r.body.substring(0, 100)}` };
  });

  await test('قراءة الرسائل', async () => {
    const r = await rest('/contact_messages?select=id,full_name,subject&limit=5');
    if (r.status !== 200) return { ok: false, msg: `HTTP ${r.status}` };
    const data = JSON.parse(r.body);
    return { ok: data.length > 0, msg: `${data.length} رسالة موجودة` };
  });

  // ── اختبار الطلبات ─────────────────────────────────────
  console.log('\n🛒 اختبار الطلبات (Orders):');
  let testOrderId = null;
  await test('إنشاء طلب تجريبي', async () => {
    const r = await rest('/orders', 'POST', {
      order_number: `TEST-${Date.now()}`,
      full_name: 'عميل اختبار',
      phone: '01000000001',
      governorate: 'القاهرة',
      city: 'مدينة نصر',
      address: 'عنوان اختبار',
      notes: 'طلب تجريبي — يمكن حذفه',
      subtotal: 1000,
      shipping_cost: 50,
      total: 1050,
      payment_method: 'cod',
      status: 'new'
    });
    if (r.status === 201) {
      const data = JSON.parse(r.body);
      testOrderId = data?.[0]?.id;
      return { ok: true, msg: `Order #${data?.[0]?.order_number}` };
    }
    return { ok: false, msg: `HTTP ${r.status}: ${r.body.substring(0, 150)}` };
  });

  await test('قراءة الطلبات', async () => {
    const r = await rest('/orders?select=id,order_number,status&limit=5');
    if (r.status !== 200) return { ok: false, msg: `HTTP ${r.status}` };
    const data = JSON.parse(r.body);
    return { ok: data.length > 0, msg: `${data.length} طلب موجود` };
  });

  // ── إعدادات الموقع ─────────────────────────────────────
  console.log('\n⚙️  اختبار إعدادات الموقع:');
  await test('قراءة إعدادات website_settings', async () => {
    const r = await rest('/website_settings?select=key,value');
    if (r.status !== 200) return { ok: false, msg: `HTTP ${r.status}` };
    const data = JSON.parse(r.body);
    return { ok: data.length > 0, msg: `${data.length} إعداد موجود` };
  });

  await test('قراءة إعدادات social_media', async () => {
    const r = await rest('/social_media?select=platform,url');
    if (r.status !== 200) return { ok: false, msg: `HTTP ${r.status}` };
    const data = JSON.parse(r.body);
    return { ok: data.length > 0, msg: `${data.length} منصة اجتماعية` };
  });

  await test('قراءة الخدمات services', async () => {
    const r = await rest('/services?select=title_ar,slug');
    if (r.status !== 200) return { ok: false, msg: `HTTP ${r.status}` };
    const data = JSON.parse(r.body);
    return { ok: data.length === 4, msg: `${data.length}/4 خدمات` };
  });

  // ── النتيجة النهائية ───────────────────────────────────
  console.log('\n═══════════════════════════════════════════════════');
  const total = pass + fail;
  const pct = Math.round((pass / total) * 100);
  console.log(`  النتيجة النهائية: ${pass}/${total} اختبار نجح (${pct}%)`);
  console.log(`  ${fail === 0 ? '🎉 الباكيند يعمل بالكامل — الموقع جاهز للنشر!' : `⚠️  ${fail} اختبار فشل`}`);
  console.log('═══════════════════════════════════════════════════');
}

main().catch(console.error);
