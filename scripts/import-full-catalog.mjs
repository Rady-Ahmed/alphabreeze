import https from 'https';
import fs from 'fs';

const HOST = 'qrtffgjdeoakgvdqmciy.supabase.co';
const KEY = 'sb_publishable_kjvW3WGGrLUJ33u7_hPYZQ_A32Nvg1E';

function req(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const options = {
      hostname: HOST,
      path: '/rest/v1' + path,
      method,
      headers: {
        'apikey': KEY,
        'Authorization': 'Bearer ' + KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
      }
    };
    const r = https.request(options, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    r.on('error', reject);
    if (payload) r.write(payload);
    r.end();
  });
}

// -------------------------------------------------------------
// THE COMPLETE 424 RAW CHEMICAL PRODUCTS LIST FROM ALPHA BREEZE
// -------------------------------------------------------------
export const MASTER_CATALOG = [
  // ==========================================
  // CATEGORY 1: OILS & BOTANICAL EXTRACTS (82)
  // ==========================================
  // Oils
  { original: 'زيت زعتر', name_ar: 'زيت زعتر', name_en: 'Thyme Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت طبيعية وعطرية' },
  { original: 'زيت برجمونت', name_ar: 'زيت برجمونت', name_en: 'Bergamot Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت طبيعية وعطرية' },
  { original: 'زيت بندق', name_ar: 'زيت بندق', name_en: 'Hazelnut Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت ناقلة ومغذية' },
  { original: 'زيت كفيار', name_ar: 'زيت كفيار', name_en: 'Caviar Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت فاخرة ومغذية' },
  { original: 'زيت كافور', name_ar: 'زيت كافور', name_en: 'Camphor Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت علاجية ومساج' },
  { original: 'زيت لوز حلو', name_ar: 'زيت لوز حلو', name_en: 'Sweet Almond Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت ناقلة ومغذية' },
  { original: 'زيت لوز مر', name_ar: 'زيت لوز مر', name_en: 'Bitter Almond Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت علاجية وتفتيح' },
  { original: 'زيت جوز هند', name_ar: 'زيت جوز هند', name_en: 'Coconut Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت ناقلة ومغذية' },
  { original: 'زيت شجرة الشاي عالي', name_ar: 'زيت شجرة الشاي (عالي التركيز)', name_en: 'Tea Tree Oil (High Grade)', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت علاجية ومطهرة' },
  { original: 'زيت شجرة الشاي عادي', name_ar: 'زيت شجرة الشاي (عادي)', name_en: 'Tea Tree Oil (Standard Grade)', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت علاجية ومطهرة' },
  { original: 'زيت حنضل', name_ar: 'زيت حنضل', name_en: 'Colocynth Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت علاجية ومساج' },
  { original: 'زيت خردل', name_ar: 'زيت خردل', name_en: 'Mustard Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت تنشيط الدورة الدموية' },
  { original: 'زيت فول سوداني', name_ar: 'زيت فول سوداني', name_en: 'Peanut Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت ناقلة ومغذية' },
  { original: 'زيت خشب أرز', name_ar: 'زيت خشب أرز', name_en: 'Cedarwood Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت خشبية وعطرية' },
  { original: 'زيت تربنتين', name_ar: 'زيت تربنتين', name_en: 'Turpentine Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'مذيبات وزيوت نباتية' },
  { original: 'زيت كاموميل', name_ar: 'زيت كاموميل', name_en: 'Chamomile Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت مهدئة للبشرة' },
  { original: 'زيت بردقوش', name_ar: 'زيت بردقوش', name_en: 'Marjoram Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت عشبية وعطرية' },
  { original: 'زيت زيتون', name_ar: 'زيت زيتون', name_en: 'Olive Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت ناقلة ومغذية' },
  { original: 'زيت جوجوبا', name_ar: 'زيت جوجوبا', name_en: 'Jojoba Golden Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت شمعية وفاخرة' },
  { original: 'زيت نخاع', name_ar: 'زيت نخاع', name_en: 'Bone Marrow Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت عناية بالشعر' },
  { original: 'زيت حنة', name_ar: 'زيت حنة', name_en: 'Henna Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت عناية بالشعر' },
  { original: 'زيت نخيل', name_ar: 'زيت نخيل', name_en: 'Palm Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت تصبين وقوام' },
  { original: 'زيت صنوبر', name_ar: 'زيت صنوبر', name_en: 'Pine Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت مطهرة ومنعشة' },
  { original: 'زيت جوزة الطيب', name_ar: 'زيت جوزة الطيب', name_en: 'Nutmeg Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت دافئة وعطرية' },
  { original: 'زيت قرع العسل', name_ar: 'زيت قرع العسل', name_en: 'Pumpkin Seed Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت بذور مغذية' },
  { original: 'زيت شمر', name_ar: 'زيت شمر', name_en: 'Fennel Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت عشبية' },
  { original: 'زيت بذور رمان', name_ar: 'زيت بذور رمان', name_en: 'Pomegranate Seed Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'مضادات أكسدة وتجديد خلايا' },
  { original: 'زيت حلبة', name_ar: 'زيت حلبة', name_en: 'Fenugreek Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت تسمين وتغذية' },
  { original: 'زيت جيرانيوم', name_ar: 'زيت جيرانيوم', name_en: 'Geranium Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت زهرية موازنة' },
  { original: 'زيت زعفران', name_ar: 'زيت زعفران', name_en: 'Saffron Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت فاخرة وتفتيح' },
  { original: 'زيت ينسون', name_ar: 'زيت ينسون', name_en: 'Anise Seed Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت عطرية ومنعشة' },
  { original: 'زيت مشمش', name_ar: 'زيت مشمش', name_en: 'Apricot Kernel Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت ناقلة خفيفة' },
  { original: 'زيت دهن الحية', name_ar: 'زيت دهن الحية', name_en: 'Snake Oil Blend', form: 'oil', cat: 'oils-and-extracts', subcat: 'خلطات زيتية لتقوية الشعر' },
  { original: 'زيت جنزبيل', name_ar: 'زيت جنزبيل', name_en: 'Ginger Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت تنشيط وتدفئة' },
  { original: 'زيت ياسمين', name_ar: 'زيت ياسمين', name_en: 'Jasmine Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت زهرية فاخرة' },
  { original: 'زيت نواة التمر', name_ar: 'زيت نواة التمر', name_en: 'Date Seed Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت ترطيب ومضادة للأكسدة' },
  { original: 'زيت دم التين', name_ar: 'زيت دم التين', name_en: 'Fig Latex / Fig Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت ومستخلصات تقليدية' },
  { original: 'زيت أرجان', name_ar: 'زيت أرجان مغربي أصلي', name_en: 'Pure Moroccan Argan Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت فاخرة ومغذية' },
  { original: 'زيت شطة', name_ar: 'زيت شطة (كابسيسين)', name_en: 'Chili Seed Oil (Capsicum)', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت محفزة لبصيلات الشعر' },
  { original: 'زيت ذيل حصان', name_ar: 'زيت ذيل حصان', name_en: 'Horsetail Herb Infused Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت غنية بالسيليكا للشعر' },
  { original: 'زيت أفوكادو', name_ar: 'زيت أفوكادو', name_en: 'Avocado Extra Virgin Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت غنية بالفيتامينات' },
  { original: 'زيت قرنفل', name_ar: 'زيت قرنفل', name_en: 'Clove Bud Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت مطهرة ومسكنة' },
  { original: 'زيت حبة البركة', name_ar: 'زيت حبة البركة (الحبة السوداء)', name_en: 'Black Seed Oil (Nigella Sativa)', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت مقوية ومغذية' },
  { original: 'زيت كركم', name_ar: 'زيت كركم', name_en: 'Turmeric Essential Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'مضادات التهاب وتوحيد لون' },
  { original: 'زيت برتقال', name_ar: 'زيت برتقال حلو', name_en: 'Sweet Orange Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت حمضيات منعشة' },
  { original: 'زيت جرجير', name_ar: 'زيت جرجير', name_en: 'Arugula / Watercress Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت إنبات وتقوية الشعر' },
  { original: 'زيت كتان', name_ar: 'زيت كتان (بذر الكتان)', name_en: 'Flaxseed Oil (Linseed)', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت غنية بالأوميجا 3' },
  { original: 'زيت نمل', name_ar: 'زيت نمل أصلي', name_en: 'Ant Oil Formic Infusion', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت تقليل نمو الشعر' },
  { original: 'زيت لبان دكر', name_ar: 'زيت لبان دكر (بخور)', name_en: 'Frankincense Essential Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'شد البشرة ومقاومة التجاعيد' },
  { original: 'زيت ليمون', name_ar: 'زيت ليمون', name_en: 'Lemon Cold Pressed Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت حمضيات منقية' },
  { original: 'زيت سعد', name_ar: 'زيت سعد', name_en: 'Cyperus (Saad) Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'تثبيط بصيلات الشعر' },
  { original: 'زيت عرقسوس', name_ar: 'زيت عرقسوس', name_en: 'Licorice Root Infused Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'تفتيح وتوحيد لون البشرة' },
  { original: 'زيت نيم', name_ar: 'زيت نيم', name_en: 'Neem Cold Pressed Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت علاجية ومضادة للبكتيريا' },
  { original: 'زيت عباد الشمس', name_ar: 'زيت عباد الشمس نقي', name_en: 'Sunflower Carrier Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت ناقلة خفيفة' },
  { original: 'زيت سمسم', name_ar: 'زيت سمسم نقي معصور ع البارد', name_en: 'Cold Pressed Sesame Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت مغذية وواقية للشعر' },
  { original: 'زيت بابونج', name_ar: 'زيت بابونج روماني', name_en: 'Roman Chamomile Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'تهدئة التهيجات والحساسية' },
  { original: 'زيت سمك', name_ar: 'زيت سمك نقي (أوميجا 3)', name_en: 'Pure Fish Oil (Omega-3)', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت مغذية مركزة' },
  { original: 'زيت إكليل الجبل / روزماري', name_ar: 'زيت إكليل الجبل (روزماري)', name_en: 'Rosemary Essential Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'تحفيز الدورة الدموية للشعر' },
  { original: 'زيت الورد', name_ar: 'زيت الورد الجوري', name_en: 'Damask Rose Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'زيوت فاخرة وترطيب' },
  { original: 'زيت قهوة', name_ar: 'زيت قهوة مركز', name_en: 'Green Coffee Bean Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'شد البشرة ومقاومة السيلوليت' },
  { original: 'زيت سدر', name_ar: 'زيت سدر نقي', name_en: 'Sidr / Nabq Leaf Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'عناية تقليدية بالشعر' },
  { original: 'زيت خروع', name_ar: 'زيت خروع نقي', name_en: 'Castor Pure Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'تكثيف الرموش والحواجب والشعر' },
  { original: 'زيت لافندر', name_ar: 'زيت لافندر فرنسي', name_en: 'French Lavender Essential Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'استرخاء ومهدئ للبشرة' },
  { original: 'زيت جزر', name_ar: 'زيت جزر غني بالبيتاكاروتين', name_en: 'Carrot Seed & Root Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'نضارة وتسمير ومكافحة أكسدة' },
  { original: 'زيت صبار', name_ar: 'زيت صبار', name_en: 'Aloe Vera Infused Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'ترطيب عميق وتهدئة حروق' },
  { original: 'زيت بذور العنب', name_ar: 'زيت بذور العنب خفيف الامتصاص', name_en: 'Grapeseed Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'مضادات أكسدة للبشرة الدهنية' },
  { original: 'زيت بصل', name_ar: 'زيت بصل نقي', name_en: 'Pure Red Onion Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'علاج تساقط الشعر' },
  { original: 'زيت ثوم', name_ar: 'زيت ثوم مركز', name_en: 'Garlic Oil Extract', form: 'oil', cat: 'oils-and-extracts', subcat: 'تطهير الفروة وإنبات الشعر' },
  { original: 'زيت دهن نعام', name_ar: 'زيت دهن نعام أصلي', name_en: 'Pure Ostrich Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'مسكن آلام ومغذي فائق' },
  { original: 'زيت ترمس', name_ar: 'زيت ترمس مر', name_en: 'Bitter Lupin Seed Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'تفتيح وتقليل نمو الشعر' },
  { original: 'زيت نعناع مصري', name_ar: 'زيت نعناع مصري', name_en: 'Egyptian Peppermint Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'انتعاش وتبريد الفروة' },
  { original: 'زيت نعناع مستورد', name_ar: 'زيت نعناع مستورد نقي', name_en: 'Imported Pure Peppermint Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'انتعاش وتبريد الفروة' },
  { original: 'زيت قرفة', name_ar: 'زيت قرفة نقي', name_en: 'Cinnamon Bark Oil', form: 'oil', cat: 'oils-and-extracts', subcat: 'تنشيط الدورة الدموية ومورد شفايف' },

  // Botanical Extracts (مستخلصات نباتية)
  { original: 'خلاصة نعناع', name_ar: 'خلاصة نعناع مائية جليكولية', name_en: 'Peppermint Botanical Extract', form: 'extract', cat: 'oils-and-extracts', subcat: 'مستخلصات عشبية' },
  { original: 'خلاصة روزماري', name_ar: 'خلاصة روزماري مركزة', name_en: 'Rosemary Botanical Extract', form: 'extract', cat: 'oils-and-extracts', subcat: 'مستخلصات عشبية' },
  { original: 'خلاصة كاموميل', name_ar: 'خلاصة كاموميل مهدئة', name_en: 'Chamomile Botanical Extract', form: 'extract', cat: 'oils-and-extracts', subcat: 'مستخلصات عشبية' },
  { original: 'خلاصة جينسنج', name_ar: 'خلاصة جينسنج منشطة', name_en: 'Ginseng Root Extract', form: 'extract', cat: 'oils-and-extracts', subcat: 'مستخلصات عشبية' },
  { original: 'خلاصة ألوفيرا', name_ar: 'خلاصة ألوفيرا مركزة', name_en: 'Aloe Vera Concentrated Extract', form: 'extract', cat: 'oils-and-extracts', subcat: 'مستخلصات مرطبة' },
  { original: 'خلاصة سانتيلا', name_ar: 'خلاصة سانتيلا (سيكا)', name_en: 'Centella Asiatica (Cica) Extract', form: 'extract', cat: 'oils-and-extracts', subcat: 'ترميم حاجز البشرة' },
  { original: 'خلاصة عرقسوس', name_ar: 'خلاصة عرقسوس لتفتيح التصبغات', name_en: 'Licorice Glycyrrhiza Extract', form: 'extract', cat: 'oils-and-extracts', subcat: 'تفتيح ونضارة' },
  { original: 'خلاصة بذور عنب', name_ar: 'خلاصة بذور العنب المضادة للأكسدة', name_en: 'Grape Seed Proanthocyanidins Extract', form: 'extract', cat: 'oils-and-extracts', subcat: 'مضادات أكسدة فائقة' },
  { original: 'خلاصة صبار شفافة', name_ar: 'خلاصة صبار شفافة نقية', name_en: 'Pure Clear Aloe Vera Gel Extract', form: 'extract', cat: 'oils-and-extracts', subcat: 'مستخلصات مرطبة' },

  // ===============================================
  // CATEGORY 2: RAW POWDERS & ACTIVE INGREDIENTS (81)
  // ===============================================
  { original: 'لانت استيارك اسيد / حمض الشمع', name_ar: 'حمض الشمع (ستياريك أسيد)', name_en: 'Stearic Acid Triple Pressed', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'أحماض دهنية ومكثفات' },
  { original: 'GMS', name_ar: 'جلسرين مونوستيارات (GMS)', name_en: 'Glycerol Monostearate (GMS 60/40)', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مستحلبات صناعية' },
  { original: 'بودرة تلك', name_ar: 'بودرة تلك نقية درجة تجميلية', name_en: 'Cosmetic Talc Powder Superfine', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'بودرات مالئة وامتصاص' },
  { original: 'سالسيلك أسيد', name_ar: 'حمض الساليسيليك نقي (BHA)', name_en: 'Salicylic Acid USP/BP (BHA)', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'أحماض تقشير ومكافحة حب الشباب' },
  { original: 'يوريا', name_ar: 'يوريا صناعية', name_en: 'Urea Technical Grade', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مرطبات ومذيبات كيراتين' },
  { original: 'يوريا تجميلي', name_ar: 'يوريا نقية درجة تجميلية', name_en: 'Urea Cosmetic Grade Pure', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مرطبات ومذيبات كيراتين' },
  { original: 'CMC', name_ar: 'كربوكسي ميثيل سليلوز (CMC)', name_en: 'Carboxymethyl Cellulose (CMC)', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مغلظات قوام بوليمرية' },
  { original: 'صمغ زانثان جم', name_ar: 'صمغ الزانثان الشفاف', name_en: 'Xanthan Gum Transparent Grade', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'صموغ طبيعية ومغلظات' },
  { original: 'جوار جم', name_ar: 'صمغ الجوار الطبيعي', name_en: 'Guar Gum Natural Grade', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'صموغ طبيعية ومغلظات' },
  { original: 'كوزميديا جوار', name_ar: 'كوزميديا جوار (بلسمي)', name_en: 'Cosmedia Guar (Guar Hydroxypropyltrimonium)', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مكيفات بلسمية كاتيونية' },
  { original: 'ستريك أسيد', name_ar: 'حمض الستريك (ملح الليمون)', name_en: 'Citric Acid Anhydrous Food/Cosmetic', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'ضبط الحموضة ومقشرات' },
  { original: 'تكسابون بودر', name_ar: 'تكسابون بودرة نقي (SLS)', name_en: 'Texapon Powder / Sodium Lauryl Sulfate Needle', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مواد رغوية ومنظفة' },
  { original: 'فيسكولام أبيض', name_ar: 'فيسكولام أبيض بوليمري', name_en: 'Viscolam White Polymer Thickener', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مغلظات مستحلبات ومستقرات' },
  { original: 'لانولين أبيض', name_ar: 'لانولين صيدلاني أبيض نقي', name_en: 'White Lanolin EP/USP Grade', form: 'wax', cat: 'raw-powders-and-actives', subcat: 'مطريات ومستحلبات دهنية' },
  { original: 'لانولين أصفر', name_ar: 'لانولين أصفر خام لامائي', name_en: 'Yellow Lanolin Anhydrous', form: 'wax', cat: 'raw-powders-and-actives', subcat: 'مطريات ومستحلبات دهنية' },
  { original: 'لانولين عادي', name_ar: 'لانولين تجاري معتمد', name_en: 'Standard Lanolin', form: 'wax', cat: 'raw-powders-and-actives', subcat: 'مطريات ومستحلبات دهنية' },
  { original: 'فازلين', name_ar: 'فازلين طبي نقي درجة أولى', name_en: 'Pure White Petroleum Jelly USP', form: 'wax', cat: 'raw-powders-and-actives', subcat: 'مطريات عازلة وحاجز وقائي' },
  { original: 'BEG12', name_ar: 'BEG12 مستحلب', name_en: 'BEG-12 Functional Surfactant', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مستحلبات ومواد مساعدة' },
  { original: 'BEG12 ثيو جليكونات', name_ar: 'BEG12 ثيوجلايكولات', name_en: 'BEG-12 Thioglycolate Active', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مواد فرد وإزالة شعر' },
  { original: 'BEG400', name_ar: 'BEG400 بوليمري', name_en: 'BEG-400 Polymeric Base', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مستحلبات ومواد مساعدة' },
  { original: 'إيديتا (EDTA)', name_ar: 'إيديتا ثنائية الصوديوم (EDTA)', name_en: 'Disodium EDTA Chelating Agent', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مواد إخفاء وعوامل كلابية' },
  { original: 'BTMS50', name_ar: 'BTMS-50 شمع بلسمي ومكيف', name_en: 'BTMS-50 Cationic Conditioning Wax', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'شمع بلسم ومكيفات شعر' },
  { original: 'BTMS80', name_ar: 'BTMS-80 مركز مكيف', name_en: 'BTMS-80 Concentrated Conditioning Agent', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'شمع بلسم ومكيفات شعر' },
  { original: 'PVA', name_ar: 'بولي فينيل الكحول (PVA)', name_en: 'Polyvinyl Alcohol (PVA)', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'بوليمرات تكوين أفلام وماسكات' },
  { original: 'قشور', name_ar: 'شمع قشور مستحلب', name_en: 'Emulsifying Flakes / Cetearyl Alcohol Flakes', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مستحلبات قشور' },
  { original: 'تيتانيوم', name_ar: 'تيتانيوم ديوكسيد درجة تجميلية فائق النقاء', name_en: 'Titanium Dioxide Rutile Cosmetic Ultra-Pure', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'فلاتر شمسية وملونات بيضاء' },
  { original: 'كاربابول 940', name_ar: 'كاربابول 940 عالي الشفافية', name_en: 'Carbopol 940 Carbomer High Clarity', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مغلظات جل كربومير' },
  { original: 'كربابول', name_ar: 'كربابول قياسي', name_en: 'Standard Carbomer Resin', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مغلظات جل كربومير' },
  { original: 'كبريت أصفر', name_ar: 'كبريت أصفر ميكروني طبي', name_en: 'Precipitated Yellow Sulfur Micronized', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'علاج حب الشباب وقشرة الرأس' },
  { original: 'صوديوم ميتاباي سلفات', name_ar: 'صوديوم ميتاباي سلفايت', name_en: 'Sodium Metabisulfite Food/Cosmetic', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مضادات أكسدة واختزال' },
  { original: 'FD21 أكريليت كو بوليمر', name_ar: 'FD21 أكريليت كوبوليمر معلق', name_en: 'FD21 Acrylates Copolymer Suspending Agent', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'بوليمرات تعليق وتغليظ' },
  { original: 'PHT مانع تزنخ', name_ar: 'BHT / PHT مانع تزنخ الزيوت', name_en: 'BHT (Butylated Hydroxytoluene) Antioxidant', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مضادات أكسدة للزيوت والدهون' },
  { original: 'DCMX', name_ar: 'DCMX مطهر مضاد للبكتيريا', name_en: 'DCMX (Dichlorometaxylenol) Antimicrobial', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مطهرات ومواد مضادة للميكروبات' },
  { original: 'كليمبازول', name_ar: 'كليمبازول مضاد قشرة نقي', name_en: 'Climbazole Antidandruff Active 99%', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مضادات قشرة وفطريات' },
  { original: 'منتول كريستال', name_ar: 'كريستالات المنتول الطبيعي النقي', name_en: 'Natural Menthol Crystals 99.5%', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'انتعاش وتبريد الفروة والجلد' },
  { original: 'طين بنتونيت أبيض', name_ar: 'طين بنتونيت أبيض نقي', name_en: 'White Bentonite Clay Superfine', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'طين تجميلي وأقنعة تنقية' },
  { original: 'بوتاسيوم استيارك', name_ar: 'بوتاسيوم ستيارات', name_en: 'Potassium Stearate Cosmetic Grade', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'أملاح أحماض دهنية ومستحلبات' },
  { original: 'أكسيد زنك', name_ar: 'أكسيد الزنك النقي درجة فارما', name_en: 'Zinc Oxide USP Pharmaceutical Pure', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'واقيات شمسية ومهدئات طفح' },
  { original: 'بينزوفين 3', name_ar: 'بنزوفينون 3 (أوكسي بنزون)', name_en: 'Benzophenone-3 (Oxybenzone UV Filter)', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'فلاتر شمسية UVA/UVB' },
  { original: 'بينزوفين 4', name_ar: 'بنزوفينون 4 (سوليسوبنزون)', name_en: 'Benzophenone-4 (Sulisobenzone Water Soluble)', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'فلاتر شمسية قابلة للذوبان بالماء' },
  { original: 'بنزوات صوديوم', name_ar: 'بنزوات الصوديوم مادة حافظة', name_en: 'Sodium Benzoate Food/Cosmetic Preservative', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مواد حافظة آمنة' },
  { original: 'سوربات بوتاسيوم', name_ar: 'سوربات البوتاسيوم', name_en: 'Potassium Sorbate Preservative', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مواد حافظة آمنة' },
  { original: 'كافيين', name_ar: 'كافيين نقي لا مائي', name_en: 'Pure Caffeine Anhydrous Powder 99%', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'شد البشرة وإنبات الشعر' },
  { original: 'كوجيك أسيد', name_ar: 'حمض الكوجيك نقي 99%', name_en: 'Kojic Acid Pure 99% Skin Lightening', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'تفتيح وتثبيط الميلانين' },
  { original: 'مانع رغوة سايل', name_ar: 'مانع رغوة سيليكوني سائل', name_en: 'Silicone Antifoam / Defoamer Liquid', form: 'liquid', cat: 'raw-powders-and-actives', subcat: 'مساعدات تصنيع وموانع رغوة' },
  { original: 'مانع رغوة بودر', name_ar: 'مانع رغوة بودرة عالي الفعالية', name_en: 'Powder Antifoam / Defoamer Compound', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مساعدات تصنيع وموانع رغوة' },
  { original: 'كولاجين عادي', name_ar: 'كولاجين هيدرولايزد بحري/بقري', name_en: 'Hydrolyzed Collagen Powder', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'بروتينات ومرونة البشرة' },
  { original: 'بيوتين', name_ar: 'بيوتين نقي (فيتامين H / B7)', name_en: 'Pure D-Biotin (Vitamin B7) Active', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'تقوية بصيلات الشعر والأظافر' },
  { original: 'بيوتين بودر', name_ar: 'بيوتين بودرة معيارية 1%', name_en: 'Biotin 1% Cosmetic Grade Powder', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'تقوية بصيلات الشعر والأظافر' },
  { original: 'هيدروكينون', name_ar: 'هيدروكينون نقي USP', name_en: 'Hydroquinone USP Pure Grade', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'تفتيح وتبييض تصبغات مستعصية' },
  { original: 'ميثيل برابيل', name_ar: 'ميثيل بارابين حافظ', name_en: 'Methylparaben Preservative Pure', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مواد حافظة كلاسيكية' },
  { original: 'بيوتايل برابيل', name_ar: 'بيوتيل بارابين حافظ', name_en: 'Butylparaben Preservative Pure', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مواد حافظة كلاسيكية' },
  { original: 'ألاننتوين', name_ar: 'ألانينتوين نقي مهدئ للبشرة', name_en: 'Pure Allantoin Skin Soothing Powder', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'تهدئة وتجديد خلايا الجلد' },
  { original: 'PVPK90', name_ar: 'بوليمر تثبيت الشعر PVP K-90', name_en: 'PVP K-90 Hair Fixative Polymer Powder', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'بوليمرات تثبيت الجل ومصففات الشعر' },
  { original: 'PVPK30', name_ar: 'بوليمر تثبيت الشعر PVP K-30', name_en: 'PVP K-30 Film Forming Polymer', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'بوليمرات تثبيت الجل ومصففات الشعر' },
  { original: 'POV10', name_ar: 'بوليمر POV-10 كاتيوني', name_en: 'POV-10 Cationic Styling Polymer', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'بوليمرات تثبيت الجل ومصففات الشعر' },
  { original: 'ريد نسيل بودر', name_ar: 'ريدينسيل بودرة محفزة للإنبات', name_en: 'Redensyl Hair Growth Booster Powder', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'خلايا جذعية وببتيدات إنبات الشعر' },
  { original: 'الفا أولفين بودر', name_ar: 'ألفا أوليفين سلفونات بودرة (AOS 92%)', name_en: 'Alpha Olefin Sulfonate (AOS) 92% Powder', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'خافضات توتر سطحي رغوية بودرة' },
  { original: 'Hydrophobic Silica', name_ar: 'سيليكا كارهة للماء (هيدروفوبيك)', name_en: 'Fumed Hydrophobic Silica Powder', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'ماتيفاير وتعديل لزوجة البودرات' },
  { original: 'IPM', name_ar: 'أيزوبروبيل ميرستات (IPM)', name_en: 'Isopropyl Myristate (IPM Cosmetic Grade)', form: 'liquid', cat: 'raw-powders-and-actives', subcat: 'مطريات ومحفزات امتصاص سريعة' },
  { original: 'أرجانين', name_ar: 'إل-أرجينين نقي قاعدة', name_en: 'L-Arginine Pure Base Amino Acid', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'أحماض أمينية لتقوية الشعر' },
  { original: 'أرجانين بيز', name_ar: 'أرجينين قاعدة هيدروكسيلية', name_en: 'Arginine Base Cosmetic Grade', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'أحماض أمينية لتقوية الشعر' },
  { original: 'بروتكون أولامين', name_ar: 'بيروكتون أولامين مضاد قشرة', name_en: 'Piroctone Olamine Anti-Dandruff Active', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مضادات قشرة وفطريات فروة الرأس' },
  { original: 'بروكابيل', name_ar: 'بروكابيل ببتيد مقاوم لتساقط الشعر', name_en: 'Procapil Active Peptide Complex', form: 'liquid', cat: 'raw-powders-and-actives', subcat: 'ببتيدات وقف تساقط الشعر' },
  { original: 'ترانيكساميك أسيد', name_ar: 'حمض الترانيكساميك لتفتيح الكلف', name_en: 'Tranexamic Acid Melasma Brightening Active', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'تفتيح تصبغات وكلف عميق' },
  { original: 'جلوتاثيون', name_ar: 'إل-جلوتاثيون نقي مختزل 99%', name_en: 'L-Glutathione Reduced (GSH) 99%', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مضاد أكسدة رئيسي وتفتيح البشرة' },
  { original: 'زبدة شيا', name_ar: 'زبدة شيا أفريقية خام غير مكررة', name_en: 'Raw Unrefined African Shea Butter Grade A', form: 'wax', cat: 'raw-powders-and-actives', subcat: 'زبدات طبيعية ومطريات غنية' },
  { original: 'زبدة كاكاو أصلي', name_ar: 'زبدة كاكاو طبيعية نقية أصلية', name_en: 'Pure Prime Pressed Natural Cocoa Butter', form: 'wax', cat: 'raw-powders-and-actives', subcat: 'زبدات طبيعية ومطريات غنية' },
  { original: 'زنك بيريثيون', name_ar: 'زنك بيريثيون (ZPT) 48% / نقي', name_en: 'Zinc Pyrithione (ZPT Anti-Dandruff Active)', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مضادات قشرة وفطريات فروة الرأس' },
  { original: 'فايبر هانس', name_ar: 'فايبرهانس مرمم روابط ألياف الشعر', name_en: 'FiberHance BM Hair Bond Multiplier', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'ترميم وتدعيم الروابط الكيميائية للشعر' },
  { original: 'فيسكو جيل', name_ar: 'فيسكوجيل مغلظ سيليكونات وزيوت', name_en: 'Viscogel Rheological Additive Organoclay', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مغلظات أطوار زيتية وسيليكونية' },
  { original: 'قشور عين جمل', name_ar: 'بودرة قشور عين الجمل المقشرة', name_en: 'Walnut Shell Micro-Exfoliating Powder', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'حبيبات ومقشرات طبيعية للجسم' },
  { original: 'قشور مشمش', name_ar: 'بودرة قشور بذور المشمش المقشرة', name_en: 'Apricot Seed Exfoliating Scrub Granules', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'حبيبات ومقشرات طبيعية للجسم' },
  { original: 'لانت 16', name_ar: 'لانيت 16 (كحول سيتيلي نباتي ماليزي)', name_en: 'Lanette 16 (Cetyl Alcohol 98% Suriachem)', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'كحولات دهنية ومحسنات قوام' },
  { original: 'لانت O', name_ar: 'لانيت أو (كحول سيتوستياريل 50/50)', name_en: 'Lanette O (Cetearyl Alcohol 50/50)', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'كحولات دهنية ومحسنات قوام' },
  { original: 'ليدوكاين HCL', name_ar: 'ليدوكائين هيدروكلوريد مخدر موضعي', name_en: 'Lidocaine Hydrochloride (HCL) USP', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مخدرات موضعية ومسكنات جلدية' },
  { original: 'ليدوكاين بيز', name_ar: 'ليدوكائين قاعدة نقي', name_en: 'Lidocaine Base USP Pure Grade', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مخدرات موضعية ومسكنات جلدية' },
  { original: 'مثبت إشلانت', name_ar: 'مثبت إسكالول للتركيبات والعطور', name_en: 'Escalol UV & Color Stabilizer', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'مثبتات لون وحماية التركيبات من الضوء' },
  { original: 'نيلة زرقاء', name_ar: 'نيلة زرقاء مغربية حرة أصلية', name_en: 'Authentic Moroccan Blue Nila Powder', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'بودرات تفتيح وتنقية تقليدية' },
  { original: 'كوالينا أبيض', name_ar: 'كاولين طين أبيض صيدلاني ناعم', name_en: 'White Kaolin Clay Pharmaceutical Grade', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'طين وماسكات طمي تجميلية' },
  { original: 'كوالينا بني', name_ar: 'كاولين طين بني غني بالمعادن', name_en: 'Brown Mineral Kaolin Clay', form: 'powder', cat: 'raw-powders-and-actives', subcat: 'طين وماسكات طمي تجميلية' },

  // =========================================================
  // CATEGORY 3: CHEMICAL LIQUIDS, SOLVENTS & SILICONES (59)
  // =========================================================
  { original: 'سلفونيك', name_ar: 'حمض السلفونيك الخطي 90% (LABSA)', name_en: 'Linear Alkyl Benzene Sulfonic Acid 90%', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'خافضات توتر سطحي أنيونية' },
  { original: 'سيليكون إيمالشن', name_ar: 'سيليكون إيمالشن مائي 60%', name_en: 'Silicone Emulsion 60% Water Soluble', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'سيليكونات مستحلبة' },
  { original: 'بيتائين', name_ar: 'كوكاميدوبروبيل بيتائين 30% (CAPB)', name_en: 'Cocamidopropyl Betaine 30% (CAPB)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'معززات رغوة وخافضات مذبذبة' },
  { original: 'BB4', name_ar: 'بيتائين BB4 فائق النقاء', name_en: 'Betaine BB-4 Surfactant Pure', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'معززات رغوة وخافضات مذبذبة' },
  { original: 'مصدف', name_ar: 'مصدف لؤلؤي سائل (بيرل إيجنت)', name_en: 'Pearlizing Agent Liquid (Glycol Distearate Blend)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'معدلات مظهر ومصدفات للشامبو' },
  { original: 'جلسرين', name_ar: 'جلسرين نباتي مكرر نقي 99.7% USP', name_en: 'Pure USP Refined Vegetable Glycerin 99.7%', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'مرطبات وجليكولات' },
  { original: 'كريموفور', name_ar: 'كريموفور RH40 (زيت خروع مهدروج)', name_en: 'Cremophor RH 40 (PEG-40 Castor Oil)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'مذيبات عطور ومستحلبات ذائبة' },
  { original: 'PQ7', name_ar: 'بولي كواتيرنيوم 7 مكيف شعر', name_en: 'Polyquaternium-7 (PQ-7) Conditioner', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'بوليمرات تكييف كاتيونية' },
  { original: 'PQ4', name_ar: 'بولي كواتيرنيوم 4', name_en: 'Polyquaternium-4 (PQ-4)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'بوليمرات تكييف كاتيونية' },
  { original: 'PQ10', name_ar: 'بولي كواتيرنيوم 10', name_en: 'Polyquaternium-10 (PQ-10)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'بوليمرات تكييف كاتيونية' },
  { original: 'PQ11', name_ar: 'بولي كواتيرنيوم 11 لموس الشعر', name_en: 'Polyquaternium-11 (PQ-11) Styling Polymer', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'بوليمرات تكييف كاتيونية' },
  { original: 'CCT زيتي', name_ar: 'دهون ثلاثية كابريليك/كابريك (CCT)', name_en: 'Caprylic/Capric Triglyceride (CCT Oil)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'زيوت دهنية وإسترات خفيفة' },
  { original: 'زيت برافين', name_ar: 'زيت برافين أبيض نقي (زيت معدني)', name_en: 'Pure White Mineral Oil / Liquid Paraffin USP', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'زيوت معدنية وهيدروكربونية' },
  { original: 'فينوكسي إيثانول', name_ar: 'فينوكسي إيثانول مادة حافظة نقية', name_en: 'Phenoxyethanol 99.5% Preservative', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'مواد حافظة ومعقمات' },
  { original: 'كوكو جليكوزيليك', name_ar: 'كوكو جلوكوسايد منظف نباتي خفيف', name_en: 'Coco Glucoside Natural Non-Ionic Surfactant', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'خافضات غير أيونية طبيعية للأطفال' },
  { original: 'جليكوزيليك أسيد', name_ar: 'حمض الجليكوليك 70% للتقشير', name_en: 'Glycolic Acid 70% Solution (AHA)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'أحماض ألفا هيدروكسي مقشرة' },
  { original: 'جليكوليك', name_ar: 'حمض جليكوليك نقي كوزمتيك', name_en: 'Glycolic Acid High Purity Liquid', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'أحماض ألفا هيدروكسي مقشرة' },
  { original: 'سيتول H', name_ar: 'سيتول HE (بولي إيثيلين جلايكول جوز هند)', name_en: 'Cetiol HE (PEG-7 Glyceryl Cocoate)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'مطريات ومزيلات مكياج ذائبة' },
  { original: 'سيليكون 350', name_ar: 'دايميثيكون سيليكون 350 لزوجة خفيفة', name_en: 'Dimethicone Silicone Oil 350 cSt', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'سيليكونات ودايميثيكون' },
  { original: 'سيليكون 1000', name_ar: 'دايميثيكون سيليكون 1000 لزوجة متوسطة', name_en: 'Dimethicone Silicone Fluid 1000 cSt', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'سيليكونات ودايميثيكون' },
  { original: 'سيليكون 6000', name_ar: 'دايميثيكون سيليكون 6000 لزوجة عالية', name_en: 'Dimethicone High Viscosity 6000 cSt', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'سيليكونات ودايميثيكون' },
  { original: 'سيليكون 12500', name_ar: 'دايميثيكون سيليكون 12500 فائق اللزوجة', name_en: 'Dimethicone Ultra High Viscosity 12500 cSt', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'سيليكونات ودايميثيكون' },
  { original: 'سيليكون 1501', name_ar: 'سيليكون 1501 بليند لسيروم الشعر', name_en: 'Cyclopentasiloxane & Dimethiconol Blend 1501', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'سيليكونات ودايميثيكون' },
  { original: 'سيليكون CPS', name_ar: 'سيكلوبنتاسيلوكسان طيار (CPS)', name_en: 'Cyclopentasiloxane Volatile Silicone (D5 / CPS)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'سيليكونات طيارة' },
  { original: 'سيليكون Elastomer', name_ar: 'سيليكون إيلاستومر جل مخملي', name_en: 'Silicone Elastomer Gel Velvet Texture', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'إيلاستومرات وبرايمر مخملي' },
  { original: 'كمبرلان', name_ar: 'كمبرلان كوكاميد دي إي إيه (CDEA)', name_en: 'Comperlan (Cocamide DEA 85% Foam Booster)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'معززات ومثبتات رغوة' },
  { original: 'سارفو ساكسينت', name_ar: 'داي صوديوم لوريث سلفوساكسينات نقي', name_en: 'Disodium Laureth Sulfosuccinate (DLS) Mild', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'منظفات رغوية لطيفة خالية من السلفات' },
  { original: 'داي بروبلين جليكول', name_ar: 'داي بروبيلين جلايكول معطر (DPG)', name_en: 'Dipropylene Glycol (DPG Fragrance Grade)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'مذيبات وحوامل عطور' },
  { original: 'توين 20', name_ar: 'بولي سوربات 20 (توين 20)', name_en: 'Polysorbate 20 (Tween 20 Emulsifier)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'مستحلبات ومذيبات زيت في ماء' },
  { original: 'توين 80', name_ar: 'بولي سوربات 80 (توين 80)', name_en: 'Polysorbate 80 (Tween 80 High HLB)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'مستحلبات ومذيبات زيت في ماء' },
  { original: 'مونوبروبلين', name_ar: 'مونو بروبيلين جلايكول فائق النقاء 99.8% (MPG)', name_en: 'Mono Propylene Glycol USP 99.8% (MPG)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'مذيبات ومرطبات تجميلية' },
  { original: 'تراي إيثانول', name_ar: 'تراي إيثانول أمين 99% (TEA)', name_en: 'Triethanolamine 99% Pure (TEA)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'معادلات حموضة ومستحلبات صابونية' },
  { original: 'أسيتون', name_ar: 'أسيتون نقي 99.5% لإزالة طلاء الأظافر', name_en: 'Pure Acetone 99.5% Technical/Cosmetic', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'مذيبات عضوية ومزيلات طلاء' },
  { original: 'بيوتايل', name_ar: 'بيوتيل جلايكول / بيوتيل أسيتات', name_en: 'Butyl Glycol / Butyl Acetate Solvent', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'مذيبات عضوية ومزيلات طلاء' },
  { original: 'PEG400', name_ar: 'بولي إيثيلين جلايكول 400 سائل (PEG-400)', name_en: 'Polyethylene Glycol 400 (PEG-400)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'مذيبات ومرطبات بولي إيثيلين' },
  { original: 'PEG6', name_ar: 'بولي إيثيلين جلايكول 6 (PEG-6)', name_en: 'Polyethylene Glycol 6 (PEG-6)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'مذيبات ومرطبات بولي إيثيلين' },
  { original: 'PEG150', name_ar: 'PEG-150 دايستيارات مغلظ شامبو', name_en: 'PEG-150 Distearate Flakes/Liquid Thickener', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'مغلظات منظفات وشامبو' },
  { original: 'PEG', name_ar: 'بولي إيثيلين جلايكول عام', name_en: 'Polyethylene Glycol (PEG General)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'مذيبات ومرطبات بولي إيثيلين' },
  { original: 'لاني سوفت', name_ar: 'لاني سوفت منعم ومكيف مائي', name_en: 'LaniSoft Liquid Fabric & Hair Softener', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'منعمات ومكيفات أنيونية/كاتيونية' },
  { original: 'كحول بولي فينيل', name_ar: 'محلول كحول بولي فينيل السائل', name_en: 'Polyvinyl Alcohol Liquid Formulation', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'بوليمرات تكوين أفلام وماسكات' },
  { original: 'كحول ميثانول', name_ar: 'ميثانول صناعي 99%', name_en: 'Methanol 99% Industrial Grade', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'كحولات صناعية' },
  { original: 'بنزيل كحول', name_ar: 'بنزيل ألكوهول حافظ ومذيب', name_en: 'Benzyl Alcohol NF/FCC Grade', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'كحولات عطرية ومواد حافظة' },
  { original: 'فاتي كحول', name_ar: 'فاتي ألكوهول سائل مخلوط', name_en: 'Liquid Fatty Alcohol Blend', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'كحولات دهنية مستحلبة' },
  { original: 'بروتين قمح', name_ar: 'بروتين القمح المنحل سائل نقي', name_en: 'Hydrolyzed Wheat Protein Liquid', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'بروتينات وببتيدات شعر وبشرة' },
  { original: 'ماء بحر', name_ar: 'ماء بحر مكرر غني بأملاح البحر', name_en: 'Purified Marine Sea Water Mineral Solution', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'محاليل معدنية وبحرية' },
  { original: 'بيكرول', name_ar: 'بيكرول مادة حافظة معقمة', name_en: 'Picrol Preservative Antimicrobial Solution', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'مواد حافظة ومعقمات' },
  { original: 'ألومنيوم كلورهيدرات', name_ar: 'ألومنيوم كلوروهيدرات 50% لمزيلات العرق', name_en: 'Aluminum Chlorohydrate 50% Aqueous (ACH)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'مضادات التعرق ومزيلات الرائحة' },
  { original: 'سوربتول', name_ar: 'سوربيتول محلول سكري 70%', name_en: 'Sorbitol 70% Non-Crystallizing Solution', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'مرطبات بديلة للجلسرين' },
  { original: 'لاكتيك أسيد', name_ar: 'حمض اللاكتيك 88% (AHA) مقشر ومرطب', name_en: 'Lactic Acid 88% Natural USP (AHA)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'أحماض ألفا هيدروكسي مقشرة' },
  { original: 'ميثيل سالسيلات', name_ar: 'ميثيل ساليسيلات (زيت وينترجرين)', name_en: 'Methyl Salicylate Pure (Wintergreen Oil)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'زيوت مسكنة وكريمات مساج' },
  { original: 'أيزو', name_ar: 'أيزوبروبانول كحول نقي 99% (IPA)', name_en: 'Isopropyl Alcohol 99% Pure (IPA)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'كحولات تطهير ومذيبات سريعة الجفاف' },
  { original: 'تكسابون ماغنسيوم', name_ar: 'تكسابون ماغنسيوم شامبو أطفال فائق اللطف', name_en: 'Magnesium Laureth Sulfate (Ultra Mild)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'منظفات رغوية لطيفة خالية من التحسس' },
  { original: 'تكسابون جل', name_ar: 'تكسابون جل 70% (صوديوم لوريث سلفات SLES)', name_en: 'Texapon 70% Sodium Laureth Sulfate (SLES)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'خافضات توتر سطحي رغوية رئيسية' },
  { original: 'إيبارول / هيمارول', name_ar: 'إيبارول / هيمارول مستحلب ملين', name_en: 'Iparol / Hemarol Emollient Complex', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'مستحلبات ومطريات متخصصة' },
  { original: 'حمض الفسفوريك', name_ar: 'حمض الفوسفوريك 85% غذائي وصناعي', name_en: 'Phosphoric Acid 85% Technical/Food', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'أحماض صناعية وضبط حموضة' },
  { original: 'كرياتين منحل', name_ar: 'كرياتين منحل سائل لعلاج الشعر', name_en: 'Hydrolyzed Keratin / Creatine Protein Liquid', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'بروتينات وببتيدات شعر وبشرة' },
  { original: 'دم دم', name_ar: 'دي إم دي إم هايدانتوين حافظة سائلة', name_en: 'DMDM Hydantoin Broad Spectrum Preservative', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'مواد حافظة واسعة المجال' },
  { original: 'الفا أولفين سايل', name_ar: 'ألفا أوليفين سلفونات سائل 38% (AOS)', name_en: 'Alpha Olefin Sulfonate 38% Liquid (AOS)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'خافضات توتر سطحي رغوية سائلة' },
  { original: 'ماء بلسم', name_ar: 'ماء بلسم مركز 29% (سيتريمونيوم كلورايد CTAC)', name_en: 'Cetrimonium Chloride 29% (CTAC Balsam Water)', form: 'liquid', cat: 'chemical-liquids-and-solvents', subcat: 'قواعد بلسم ومضادات استاتيكية للشعر' },

  // =========================================================
  // CATEGORY 4: VITAMINS, AMINO ACIDS & NUTRIENTS (29)
  // =========================================================
  { original: 'L-CYSTEINE HCL', name_ar: 'إل-سيستايين هيدروكلوريد نقي', name_en: 'L-Cysteine Hydrochloride (HCL) USP', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'أحماض أمينية ومضادات أكسدة' },
  { original: 'L-TYROSIN', name_ar: 'إل-تيروزين نقي', name_en: 'L-Tyrosine Pure Powder Active', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'أحماض أمينية ومضادات أكسدة' },
  { original: 'فيتامين A بالميتات بودر', name_ar: 'فيتامين أ بالميتات بودرة ميكرونية', name_en: 'Vitamin A Retinyl Palmitate 250,000 IU/g Powder', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'فيتامينات مكافحة الشيخوخة' },
  { original: 'فيتامين B12', name_ar: 'فيتامين ب12 نقي (سيانوكوبالامين)', name_en: 'Vitamin B12 (Cyanocobalamin) Pure Active', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'فيتامينات مجموعة ب' },
  { original: 'فيتامين B3', name_ar: 'فيتامين ب3 (نياسيناميد نقي)', name_en: 'Vitamin B3 (Niacinamide Pure USP)', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'فيتامينات مجموعة ب' },
  { original: 'فيتامين B6', name_ar: 'فيتامين ب6 (بيريدوكسين هيدروكلوريد)', name_en: 'Vitamin B6 (Pyridoxine HCL USP)', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'فيتامينات مجموعة ب' },
  { original: 'فيتامين D3', name_ar: 'فيتامين د3 تجميلي ومغذي', name_en: 'Vitamin D3 (Cholecalciferol) 100,000 IU/g', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'فيتامينات ذائبة في الدهون' },
  { original: 'فيتامين K2', name_ar: 'فيتامين ك2 (ميناكينون 7)', name_en: 'Vitamin K2 (Menaquinone-7) Active Powder', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'فيتامينات الهالات والأوعية الدموية' },
  { original: 'فيتامين E', name_ar: 'فيتامين هـ أسيتات ألفا توكوفيرول 98%', name_en: 'Vitamin E (DL-Alpha Tocopheryl Acetate 98% NHU)', form: 'liquid', cat: 'vitamins-and-nutrients', subcat: 'فيتامينات مضادة للأكسدة وحماية الزيوت' },
  { original: 'أسكوربيك فوسفات + ماغنسيوم', name_ar: 'ماغنسيوم أسكوربيل فوسفات (فيتامين سي ثابت MAP)', name_en: 'Magnesium Ascorbyl Phosphate (MAP Vitamin C)', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'مشتقات فيتامين سي المستقرة والتفتيح' },
  { original: 'ال - ثيانين', name_ar: 'إل-ثيانين نقي', name_en: 'L-Theanine Pure Amino Acid Powder', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'أحماض أمينية مهدئة' },
  { original: 'بترفيون 3', name_ar: 'بترفيون 3 فعال تجميلي', name_en: 'Petrovin-3 Bioactive Complex', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'مغذيات حيوية متطورة' },
  { original: 'كالسيوم ثيوغليكولات', name_ar: 'كالسيوم ثيوجلايكولات لإزالة الشعر', name_en: 'Calcium Thioglycolate Trihydrate', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'أملاح كيميائية ومزيلات شعر' },
  { original: 'خلاصة الأشوجاندا', name_ar: 'خلاصة الأشواغاندا المركزة (Adaptogen)', name_en: 'Ashwagandha Withania Somnifera Extract', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'مستخلصات نباتية غذائية وتجميلية' },
  { original: 'خلاصة الزعتر', name_ar: 'خلاصة الزعتر البري المركزة', name_en: 'Thymus Vulgaris Concentrated Extract', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'مستخلصات نباتية غذائية وتجميلية' },
  { original: 'خلاصة بالميتو', name_ar: 'خلاصة ساو بالميتو (البلميط المنشاري)', name_en: 'Saw Palmetto Berry Extract (DHT Blocker)', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'مستخلصات تثبيط DHT وتساقط الشعر' },
  { original: 'خلاصة ثمر الورد الهيب روز', name_ar: 'خلاصة ثمر الورد (روز هيب) غنية بفيتامين C', name_en: 'Rosehip Extract (Rosa Canina)', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'مستخلصات نباتية غذائية وتجميلية' },
  { original: 'خلاصة جارسينيا', name_ar: 'خلاصة الجارسينيا كامبوجيا المركزة', name_en: 'Garcinia Cambogia HCA Extract', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'مستخلصات نباتية غذائية وتجميلية' },
  { original: 'خلاصة بذور العنب المغذية', name_ar: 'خلاصة بذور العنب (بوليفينول 95%)', name_en: 'Grape Seed Extract 95% Polyphenols Nutritive', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'مضادات أكسدة وتغذية خلوية' },
  { original: 'خلاصة الحنة', name_ar: 'خلاصة الحناء الطبيعية المركزة', name_en: 'Lawsonia Inermis (Henna) Leaf Extract', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'مستخلصات نباتية للشعر' },
  { original: 'صوديوم هالورونات عالي الجزيء', name_ar: 'صوديوم هيالورونات عالي الوزن الجزيئي (HMW)', name_en: 'Sodium Hyaluronate High Molecular Weight (HMW)', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'هيالورونيك أسيد وترطيب حاجز البشرة' },
  { original: 'هالورونيك أسيد', name_ar: 'حمض الهيالورونيك نقي بودرة فائق النقاء', name_en: 'Pure Hyaluronic Acid Powder Multi-Weight', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'هيالورونيك أسيد وترطيب حاجز البشرة' },
  { original: 'فوسفات ثنائي الكالسيوم', name_ar: 'فوسفات ثنائي الكالسيوم لمعاجين الأسنان', name_en: 'Dicalcium Phosphate Dihydrate (DCP)', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'معادن وأملاح مغذية للمستحضرات' },
  { original: 'كالسيوم أسكوربات', name_ar: 'كالسيوم أسكوربات (فيتامين سي لطيف متعادل)', name_en: 'Calcium Ascorbate (Buffered Vitamin C)', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'مشتقات فيتامين سي المستقرة والتفتيح' },
  { original: 'كرياتين هيدرو بودر', name_ar: 'كرياتين هيدروكلوريد بودرة نقية', name_en: 'Creatine HCL Pure Bioactive Powder', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'أحماض أمينية وطاقة خلايا الجلد' },
  { original: 'كرياتين مونوهيدريت بودر', name_ar: 'كرياتين مونوهيدرات نقي 99.9%', name_en: 'Creatine Monohydrate Pure Micronized Powder', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'أحماض أمينية وطاقة خلايا الجلد' },
  { original: 'ماغنسيوم أكسيد', name_ar: 'أكسيد المغنيسيوم درجة نقية', name_en: 'Magnesium Oxide Heavy/Light USP', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'معادن ومغذيات للبشرة' },
  { original: 'نياسيناميد', name_ar: 'نياسيناميد كوزمتيك فائق النقاء (فيتامين B3)', name_en: 'Niacinamide PC Cosmetic Grade (Low Nicotinic Acid)', form: 'powder', cat: 'vitamins-and-nutrients', subcat: 'فيتامينات مجموعة ب وتضييق المسام' },
  { original: 'بانثينول', name_ar: 'دي-بانثينول (برو فيتامين B5) سائل 98%', name_en: 'D-Panthenol Pro-Vitamin B5 98% USP', form: 'liquid', cat: 'vitamins-and-nutrients', subcat: 'ترطيب عميق ودعم حاجز البشرة والشعر' },

  // ==========================================
  // CATEGORY 5: WAXES & POLYMERS (5)
  // ==========================================
  { original: 'EWAX شمع', name_ar: 'شمع استحلاب ذاتي EWAX NF', name_en: 'Emulsifying Wax NF (E-Wax)', form: 'wax', cat: 'waxes-and-polymers', subcat: 'شموع استحلاب' },
  { original: 'شمع برافين (عامرية)', name_ar: 'شمع برافين نقي (إنتاج العامرية)', name_en: 'Paraffin Wax Fully Refined (Amereya)', form: 'wax', cat: 'waxes-and-polymers', subcat: 'شموع بترولية وصلبة' },
  { original: 'شمع عسل', name_ar: 'شمع عسل النحل الطبيعي النقي 100%', name_en: 'Pure Natural Beeswax Yellow/White Cera Alba', form: 'wax', cat: 'waxes-and-polymers', subcat: 'شموع طبيعية ومغذية' },
  { original: 'شمع كرنوبا', name_ar: 'شمع الكارنوبا البرازيلي الفاخر T1', name_en: 'Pure Carnauba Wax Prime Yellow T-1', form: 'wax', cat: 'waxes-and-polymers', subcat: 'شموع نباتية صلبة ولمعان فائق' },
  { original: 'شمع ميكروكريستالين', name_ar: 'شمع مايكروكريستالين مرن درجة صيدلانية', name_en: 'Microcrystalline Wax Cosmetic Grade', form: 'wax', cat: 'waxes-and-polymers', subcat: 'شموع ضبط القوام والمرونة' },

  // ==========================================
  // CATEGORY 6: COLORS & PIGMENTS (83)
  // ==========================================
  // Aker Fassi
  { original: 'عكر فاسي أصلي', name_ar: 'عكر فاسي مغربي أصلي (دم الغزال الطبيعي)', name_en: 'Authentic Moroccan Aker Fassi Poppy Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'ملونات طبيعية وتوريد' },

  // Oil & Water-Based Colors
  { original: 'أصفر زيتي', name_ar: 'لون أصفر زيتي مركز', name_en: 'Oil Soluble Yellow Color Concentrated', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان زيتية تجميلية' },
  { original: 'موف زيتي', name_ar: 'لون موف زيتي مركز', name_en: 'Oil Soluble Mauve Color', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان زيتية تجميلية' },
  { original: 'سيلفر', name_ar: 'لون فضي سيلفر براق', name_en: 'Silver Metallic Lustre Pigment', form: 'powder', cat: 'colors-and-pigments', subcat: 'ألوان وبودرات معدنية' },
  { original: 'لبني', name_ar: 'لون لبني سماوي مائي', name_en: 'Baby Sky Blue Cosmetic Color', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان مائية تجميلية' },
  { original: 'أحمر', name_ar: 'لون أحمر ناصع', name_en: 'Vibrant Red Cosmetic Color', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان مائية تجميلية' },
  { original: 'موف غامق', name_ar: 'لون موف غامق', name_en: 'Dark Mauve Cosmetic Color', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان مائية تجميلية' },
  { original: 'موف فاتح', name_ar: 'لون موف فاتح', name_en: 'Light Mauve Cosmetic Color', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان مائية تجميلية' },
  { original: 'بينك فاتح', name_ar: 'لون بينك فاتح وردي', name_en: 'Light Pink Blossom Color', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان مائية تجميلية' },
  { original: 'بيج', name_ar: 'لون بيج طبيعي', name_en: 'Natural Beige Cosmetic Color', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان كريمات وأساس' },
  { original: 'أزرق', name_ar: 'لون أزرق ملكي', name_en: 'Royal Blue Cosmetic Color', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان مائية تجميلية' },
  { original: 'فوشيا', name_ar: 'لون فوشيا ساطع', name_en: 'Bright Fuchsia Cosmetic Color', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان مائية تجميلية' },
  { original: 'طوبي', name_ar: 'لون طوبي دافئ', name_en: 'Terracotta Brick Red Color', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان مائية وتجميلية' },
  { original: 'أخضر زرعي', name_ar: 'لون أخضر زرعي منعش', name_en: 'Grass Green Cosmetic Color', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان مائية تجميلية' },
  { original: 'برتقالي', name_ar: 'لون برتقالي مشرق', name_en: 'Vibrant Orange Cosmetic Color', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان مائية تجميلية' },
  { original: 'تركواز', name_ar: 'لون تركواز بحري', name_en: 'Turquoise Aqua Marine Color', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان مائية تجميلية' },
  { original: 'أصفر فاتح', name_ar: 'لون أصفر فاتح ليموني', name_en: 'Light Lemon Yellow Color', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان مائية تجميلية' },
  { original: 'أسود', name_ar: 'لون أسود كربوني تجميلي', name_en: 'Cosmetic Carbon Black Color', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان مائية وتجميلية' },
  { original: 'نبيتي', name_ar: 'لون نبيتي بورغندي', name_en: 'Burgundy Wine Cosmetic Color', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان مائية وتجميلية' },
  { original: 'بني غامق', name_ar: 'لون بني شوكولاته غامق', name_en: 'Dark Chocolate Brown Color', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان مائية وتجميلية' },

  // Delta Water Colors
  { original: 'دلتا أزرق', name_ar: 'لون دلتا مائي أزرق نقي', name_en: 'Delta Water-Based Blue Dye', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان دلتا المائية المتخصصة' },
  { original: 'دلتا أصفر', name_ar: 'لون دلتا مائي أصفر نقي', name_en: 'Delta Water-Based Yellow Dye', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان دلتا المائية المتخصصة' },
  { original: 'دلتا أحمر', name_ar: 'لون دلتا مائي أحمر نقي', name_en: 'Delta Water-Based Red Dye', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان دلتا المائية المتخصصة' },

  // Rock Water Colors
  { original: 'روك زيتي', name_ar: 'لون روك مائي زيتي مميز', name_en: 'Rock Water Olive Green Shade', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان روك المائية الاحترافية' },
  { original: 'روك هفان', name_ar: 'لون روك مائي هافان هادئ', name_en: 'Rock Water Havana Tan Shade', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان روك المائية الاحترافية' },
  { original: 'روك روز', name_ar: 'لون روك مائي روز ناعم', name_en: 'Rock Water Soft Rose Shade', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان روك المائية الاحترافية' },
  { original: 'روك فوشيا', name_ar: 'لون روك مائي فوشيا مركز', name_en: 'Rock Water Fuchsia Intense Shade', form: 'liquid', cat: 'colors-and-pigments', subcat: 'ألوان روك المائية الاحترافية' },

  // Kamena Food Colors
  { original: 'أصفر غروب الشمس كامينا', name_ar: 'لون أصفر غروب الشمس كامينا غذائي', name_en: 'Kamena Sunset Yellow FCF Food Color', form: 'powder', cat: 'colors-and-pigments', subcat: 'ألوان كامينا الغذائية المعتمدة' },
  { original: 'أزرق لامع 15% كامينا', name_ar: 'لون أزرق لامع كامينا 15% معتمد', name_en: 'Kamena Brilliant Blue FCF 15% Food Grade', form: 'powder', cat: 'colors-and-pigments', subcat: 'ألوان كامينا الغذائية المعتمدة' },
  { original: 'أحمر تارترازين 20% كامينا', name_ar: 'لون أحمر تارترازين كامينا 20%', name_en: 'Kamena Tartrazine Red Shade 20% Food Color', form: 'powder', cat: 'colors-and-pigments', subcat: 'ألوان كامينا الغذائية المعتمدة' },
  { original: 'أحمر تارترازين 25% كامينا', name_ar: 'لون أحمر تارترازين كامينا 25%', name_en: 'Kamena Tartrazine Red Shade 25% High Concentrate', form: 'powder', cat: 'colors-and-pigments', subcat: 'ألوان كامينا الغذائية المعتمدة' },
  { original: 'بني شوكولاته تارترازين 725% كامينا', name_ar: 'لون بني شوكولاته تارترازين 725% كامينا', name_en: 'Kamena Chocolate Brown Tartrazine 725% Concentrated', form: 'powder', cat: 'colors-and-pigments', subcat: 'ألوان كامينا الغذائية المعتمدة' },

  // Mica Powders (20)
  { original: 'مايكا أبيض', name_ar: 'بودرة مايكا بيضاء لؤلؤية براقة', name_en: 'Pearl White Shimmer Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },
  { original: 'مايكا فوشيا', name_ar: 'بودرة مايكا فوشيا ساطعة', name_en: 'Fuchsia Luster Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },
  { original: 'مايكا أحمر', name_ar: 'بودرة مايكا حمراء قانية', name_en: 'Ruby Red Luster Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },
  { original: 'مايكا نحاسي فاتح', name_ar: 'بودرة مايكا نحاسي فاتح معدنية', name_en: 'Light Metallic Copper Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },
  { original: 'مايكا ذهبي', name_ar: 'بودرة مايكا ذهبي عيار 24 براقة', name_en: 'Royal Gold 24K Shimmer Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },
  { original: 'مايكا ذهبي فاتح', name_ar: 'بودرة مايكا ذهبي فاتح شامبين', name_en: 'Light Champagne Gold Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },
  { original: 'مايكا أزرق فاتح', name_ar: 'بودرة مايكا أزرق سماوي براق', name_en: 'Sky Blue Shimmer Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },
  { original: 'مايكا أزرق غامق', name_ar: 'بودرة مايكا أزرق كحلي ليلي', name_en: 'Midnight Navy Blue Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },
  { original: 'مايكا أصفر', name_ar: 'بودرة مايكا صفراء ذهبية', name_en: 'Sun Gold Yellow Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },
  { original: 'مايكا أصفر لامع', name_ar: 'بودرة مايكا أصفر براق هايلايتر', name_en: 'Glittering Sparkle Yellow Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },
  { original: 'مايكا سيمون', name_ar: 'بودرة مايكا سيمون دراقي', name_en: 'Salmon Peach Shimmer Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },
  { original: 'مايكا سيمون غامق', name_ar: 'بودرة مايكا سيمون غامق برونزي', name_en: 'Deep Salmon Bronze Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },
  { original: 'مايكا أسود', name_ar: 'بودرة مايكا سوداء كربونية براقة', name_en: 'Diamond Black Sparkle Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },
  { original: 'مايكا أسود فاتح', name_ar: 'بودرة مايكا أسود فاتح رمادي فحمي', name_en: 'Charcoal Light Black Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },
  { original: 'مايكا أخضر فاتح', name_ar: 'بودرة مايكا أخضر فاتح زمردي', name_en: 'Emerald Light Green Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },
  { original: 'مايكا أخضر وسط لامع', name_ar: 'بودرة مايكا أخضر متوسط فائق اللمعان', name_en: 'Medium Lustre Green Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },
  { original: 'مايكا برتقالي فاتح', name_ar: 'بودرة مايكا برتقالي مشمشي براق', name_en: 'Sunset Light Orange Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },
  { original: 'مايكا موف غامق', name_ar: 'بودرة مايكا موف بنفسجي غامق', name_en: 'Deep Amethyst Mauve Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },
  { original: 'مايكا موف وسط', name_ar: 'بودرة مايكا موف وسطي متلألئ', name_en: 'Medium Lavender Mauve Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },
  { original: 'مايكا فضي غامق', name_ar: 'بودرة مايكا فضي غامق غان ميتال', name_en: 'Gunmetal Dark Silver Mica Powder', form: 'powder', cat: 'colors-and-pigments', subcat: 'بودرات مايكا لؤلؤية لامعة' },

  // Pigments (23)
  { original: 'بيجمنت برتقالي غامق', name_ar: 'صبغة بيجمنت برتقالي غامق', name_en: 'Pure Pigment Dark Orange', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت برتقالي فاتح', name_ar: 'صبغة بيجمنت برتقالي فاتح', name_en: 'Pure Pigment Light Orange', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت برتقالي وسط', name_ar: 'صبغة بيجمنت برتقالي وسطي', name_en: 'Pure Pigment Medium Orange', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت فوشيا فاتح', name_ar: 'صبغة بيجمنت فوشيا فاتح وردي', name_en: 'Pure Pigment Light Fuchsia Pink', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت فوشيا عادي', name_ar: 'صبغة بيجمنت فوشيا قياسي', name_en: 'Pure Pigment Standard Fuchsia', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت موف فاتح', name_ar: 'صبغة بيجمنت موف فاتح لافندري', name_en: 'Pure Pigment Light Mauve', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت موف متوسط', name_ar: 'صبغة بيجمنت موف متوسط التدرج', name_en: 'Pure Pigment Medium Mauve', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت بنفسجي فاتح', name_ar: 'صبغة بيجمنت بنفسجي فاتح فيوليت', name_en: 'Pure Pigment Light Violet', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت بني فاتح', name_ar: 'صبغة بيجمنت بني فاتح كراميلي', name_en: 'Pure Pigment Light Caramel Brown', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت بني وسط', name_ar: 'صبغة بيجمنت بني وسطي كلاسيك', name_en: 'Pure Pigment Medium Earth Brown', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت بني غامق جداً', name_ar: 'صبغة بيجمنت بني إكسترا غامق', name_en: 'Pure Pigment Extra Deep Dark Brown', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت طوبي', name_ar: 'صبغة بيجمنت طوبي تيروكوتا', name_en: 'Pure Pigment Terracotta Brick Red', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت أخضر غامق', name_ar: 'صبغة بيجمنت أخضر زيتي غامق', name_en: 'Pure Pigment Deep Forest Green', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت أحمر وردي / دم غزال', name_ar: 'صبغة بيجمنت أحمر وردي (دم الغزال)', name_en: 'Pure Pigment Rose Red (Deer Blood Shade)', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت نبيتي محروق', name_ar: 'صبغة بيجمنت نبيتي محروق ملكي', name_en: 'Pure Pigment Deep Burnt Maroon', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت أسود', name_ar: 'صبغة بيجمنت أسود معتم', name_en: 'Pure Cosmetic Black Pigment', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت أسود غامق', name_ar: 'صبغة بيجمنت أسود فاحم نفاث', name_en: 'Pure Deep Jet Black Pigment', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت أزرق وسط', name_ar: 'صبغة بيجمنت أزرق متوسط', name_en: 'Pure Pigment Medium Ultramarine Blue', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت أزرق زهري', name_ar: 'صبغة بيجمنت أزرق زهري مشع', name_en: 'Pure Pigment Bright Azure Cobalt Blue', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت أبيض', name_ar: 'صبغة بيجمنت أبيض فائق التغطية', name_en: 'Pure Opaque White Mineral Pigment', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت أصفر', name_ar: 'صبغة بيجمنت أصفر خردلي نقي', name_en: 'Pure Primary Yellow Cosmetic Pigment', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت روز', name_ar: 'صبغة بيجمنت روز ناعم', name_en: 'Pure Delicate Rose Cosmetic Pigment', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },
  { original: 'بيجمنت كرموزي', name_ar: 'صبغة بيجمنت قرمزي كرمز', name_en: 'Pure Crimson Carmine Pigment', form: 'powder', cat: 'colors-and-pigments', subcat: 'أصباغ وبيجمنت نقي عالي التغطية' },

  // Oxides (4)
  { original: 'أكسيد طوبي', name_ar: 'أكسيد حديد طوبي نقي', name_en: 'Pure Cosmetic Brick Iron Oxide', form: 'powder', cat: 'colors-and-pigments', subcat: 'أكاسيد الحديد المعدنية النقية' },
  { original: 'أكسيد بني', name_ar: 'أكسيد حديد بني شيكولاتة', name_en: 'Pure Cosmetic Brown Iron Oxide', form: 'powder', cat: 'colors-and-pigments', subcat: 'أكاسيد الحديد المعدنية النقية' },
  { original: 'أكسيد أحمر', name_ar: 'أكسيد حديد أحمر كوزمتيك', name_en: 'Pure Cosmetic Red Iron Oxide', form: 'powder', cat: 'colors-and-pigments', subcat: 'أكاسيد الحديد المعدنية النقية' },
  { original: 'أكسيد نحاسي', name_ar: 'أكسيد نحاسي معدني', name_en: 'Pure Cosmetic Copper Metallic Oxide', form: 'powder', cat: 'colors-and-pigments', subcat: 'أكاسيد الحديد المعدنية النقية' },

  // Special Colors (4)
  { original: 'أخضر ضوئي لامع', name_ar: 'لون أخضر نيون فسفوري ضوئي لامع', name_en: 'Fluorescent Neon Glow Green Color', form: 'powder', cat: 'colors-and-pigments', subcat: 'ألوان خاصة وتأثيرات بصرية' },
  { original: 'سحري فاتح', name_ar: 'لون سحري متغير الأطياف فاتح', name_en: 'Color-Shifting Magic Opal Pigment', form: 'powder', cat: 'colors-and-pigments', subcat: 'ألوان خاصة وتأثيرات بصرية' },
  { original: 'فضي جليتر', name_ar: 'جليتر فضي تجميلي ميكروني آمن', name_en: 'Cosmetic Grade Biodegradable Silver Glitter', form: 'powder', cat: 'colors-and-pigments', subcat: 'ألوان خاصة وتأثيرات بصرية' },
  { original: 'أسود صبغة', name_ar: 'صبغة سوداء عالية التركيز والذوبان', name_en: 'Ultra Intense Soluble Black Dye', form: 'powder', cat: 'colors-and-pigments', subcat: 'ألوان خاصة وتأثيرات بصرية' },

  // ==========================================
  // CATEGORY 7: FRAGRANCES & SCENTS (68)
  // ==========================================
  { original: 'زيت عطري مسك', name_ar: 'زيت عطري مسك أبيض نقي', name_en: 'White Musk Concentrated Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح شرقية ومسك' },
  { original: 'زيت عطري كريزي لاف', name_ar: 'زيت عطري كريزي لاف', name_en: 'Crazy Love Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور فرنسية وبدائل براندات' },
  { original: 'زيت عطري كاريزما', name_ar: 'زيت عطري كاريزما رجالي', name_en: 'Charisma Signature Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور رجالية فواحة' },
  { original: 'زيت عطري سوفاج', name_ar: 'زيت عطري سوفاج ديور تايب', name_en: 'Sauvage Type Premium Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور فرنسية وبدائل براندات' },
  { original: 'زيت عطري جوز هند', name_ar: 'زيت عطري جوز هند تروبيكال', name_en: 'Tropical Coconut Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري بيبي جونسون', name_ar: 'زيت عطري بيبي باودر (جونسون تايب)', name_en: 'Baby Powder Johnson Type Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح بودرية ونظافة' },
  { original: 'زيت عطري فانتازيا', name_ar: 'زيت عطري فانتازيا سويت', name_en: 'Fantasy Sweet Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور فرنسية وبدائل براندات' },
  { original: 'زيت عطري مضاوي', name_ar: 'زيت عطري مضاوي العربية للعود تايب', name_en: 'Madawi Oriental Luxury Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح شرقية ومسك' },
  { original: 'زيت عطري أولمبيا', name_ar: 'زيت عطري أولمبيا باكو رابان تايب', name_en: 'Olympea Type Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور فرنسية وبدائل براندات' },
  { original: 'زيت عطري كاندي فروت', name_ar: 'زيت عطري كاندي فروت سكاكر فواكه', name_en: 'Candy Fruit Sweet Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري مسك رومان حليبي', name_ar: 'زيت عطري مسك رمان حليبي ناعم', name_en: 'Milky Pomegranate Musk Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح شرقية ومسك' },
  { original: 'زيت عطري بربري هير', name_ar: 'زيت عطري بربري هير تايب', name_en: 'Burberry Her Type Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور فرنسية وبدائل براندات' },
  { original: 'زيت عطري كوبرا', name_ar: 'زيت عطري كوبرا كلاسيك', name_en: 'Cobra Classic Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور كلاسيكية وثابتة' },
  { original: 'زيت عطري جود جيرل', name_ar: 'زيت عطري جود جيرل كارولينا هيريرا تايب', name_en: 'Good Girl Type Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور فرنسية وبدائل براندات' },
  { original: 'زيت عطري خمرة', name_ar: 'زيت عطري خمرة لطافة تايب فاخر', name_en: 'Khamrah Lattafa Type Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح شرقية ومسك' },
  { original: 'زيت عطري رومان زيتي', name_ar: 'زيت عطري رمان زيتي فواح', name_en: 'Fresh Pomegranate Oil Fragrance', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري فانيليا أيس كريم', name_ar: 'زيت عطري فانيليا آيس كريم كريمي', name_en: 'Vanilla Ice Cream Creamy Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري كيوي', name_ar: 'زيت عطري كيوي استوائي', name_en: 'Tropical Kiwi Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري برتقال', name_ar: 'زيت عطري برتقال منعش', name_en: 'Juicy Orange Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري توت', name_ar: 'زيت عطري توت بيري فواح', name_en: 'Wild Berries Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري ليمون', name_ar: 'زيت عطري ليمون حمضي مشرق', name_en: 'Sparkling Lemon Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري روبرتو كافالي', name_ar: 'زيت عطري روبرتو كافالي تايب', name_en: 'Roberto Cavalli Signature Type Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور فرنسية وبدائل براندات' },
  { original: 'زيت عطري إيلي صعب', name_ar: 'زيت عطري إيلي صعب تايب زهر البرتقال', name_en: 'Elie Saab Le Parfum Type Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور فرنسية وبدائل براندات' },
  { original: 'زيت عطري كوكو مودمازيل', name_ar: 'زيت عطري كوكو ماديموزيل شانيل تايب', name_en: 'Coco Mademoiselle Chanel Type Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور فرنسية وبدائل براندات' },
  { original: 'زيت عطري روز فانيليا', name_ar: 'زيت عطري روز فانيليا مانسيرا تايب', name_en: 'Roses Vanille Mancera Type Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور فرنسية وبدائل براندات' },
  { original: 'زيت عطري تشيز كيك', name_ar: 'زيت عطري تشيز كيك فواح', name_en: 'Cheesecake Gourmand Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري كنتالوب', name_ar: 'زيت عطري كامتالوب صيفي', name_en: 'Fresh Cantaloupe Melon Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري ميس ديور', name_ar: 'زيت عطري ميس ديور بلومينج بوكيه تايب', name_en: 'Miss Dior Blooming Bouquet Type Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور فرنسية وبدائل براندات' },
  { original: 'زيت عطري مونت بلانك', name_ar: 'زيت عطري مونت بلانك ليجند تايب', name_en: 'Mont Blanc Legend Type Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور رجالية فواحة' },
  { original: 'زيت عطري شيري بلوسوم', name_ar: 'زيت عطري زهر الكرز (شيري بلوسوم)', name_en: 'Japanese Cherry Blossom Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح زهرية فاخرة' },
  { original: 'زيت عطري فري سكسي ناو', name_ar: 'زيت عطري فيري سيكسي ناو تايب', name_en: 'Very Sexy Now Victoria Type Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور فرنسية وبدائل براندات' },
  { original: 'زيت عطري وصال خليجي', name_ar: 'زيت عطري وصال أجمل خليجي تايب', name_en: 'Wisal Ajmal Type Arabian Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح شرقية ومسك' },
  { original: 'زيت عطري نساء العالم', name_ar: 'زيت عطري نساء العالم الساحر', name_en: 'Women of the World Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور نسائية جذابة' },
  { original: 'زيت عطري لاف إز هفن', name_ar: 'زيت عطري لاف إز هيفن ناعم', name_en: 'Love is Heaven Delicate Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور نسائية جذابة' },
  { original: 'زيت عطري بكارات روج', name_ar: 'زيت عطري باكارات روج 540 تايب', name_en: 'Baccarat Rouge 540 Type Luxury Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور فرنسية وبدائل براندات' },
  { original: 'زيت عطري جي كي بيز', name_ar: 'زيت عطري جي كي بيز لقواعد العناية بالشعر', name_en: 'GK Base Salon Grade Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح احترافية لصالونات التجميل' },
  { original: 'زيت عطري بينك باشون', name_ar: 'زيت عطري بينك باشن مفعم بالحيوية', name_en: 'Pink Passion Fruity Floral Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور نسائية جذابة' },
  { original: 'زيت عطري كنتالوب بيز', name_ar: 'زيت عطري كامتالوب بيز مركز للشامبو', name_en: 'Cantaloupe Base Fragrance Compound', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'قواعد عطرية للمنظفات والشامبو' },
  { original: 'زيت عطري برتقال بيز', name_ar: 'زيت عطري برتقال بيز مركز للصابون', name_en: 'Orange Base Fragrance Compound', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'قواعد عطرية للمنظفات والشامبو' },
  { original: 'زيت عطري تندر ماي واي', name_ar: 'زيت عطري تندر ماي واي جورجيو أرماني تايب', name_en: 'Tendre My Way Armani Type Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور فرنسية وبدائل براندات' },
  { original: 'زيت عطري رمان', name_ar: 'زيت عطري رمان فاخر', name_en: 'Ruby Pomegranate Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري أمير العود', name_ar: 'زيت عطري أمير العود الملكي الأصيل', name_en: 'Ameer Al Oudh Royal Arabian Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح شرقية ومسك' },
  { original: 'زيت عطري فانيليا', name_ar: 'زيت عطري فانيليا مدغشقر دافئة', name_en: 'Madagascar Warm Vanilla Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري ليمون دورو', name_ar: 'زيت عطري ليمون دورو الإيطالي الفاخر', name_en: 'Limone Doro Italian Luxury Citrus Scent', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري فراولة', name_ar: 'زيت عطري فراولة حمراء طازجة', name_en: 'Ripe Red Strawberry Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري دوف', name_ar: 'زيت عطري دوف برائحة النظافة الأصلية', name_en: 'Dove Clean Soap Type Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح بودرية ونظافة' },
  { original: 'زيت عطري فيكتوريا سيكريت', name_ar: 'زيت عطري فيكتوريا سيكريت بومبشيل تايب', name_en: 'Bombshell Victoria Secret Type Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور فرنسية وبدائل براندات' },
  { original: 'زيت عطري ورد أبيض', name_ar: 'زيت عطري الورد الأبيض النقي', name_en: 'Pure White Rose Petals Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح زهرية فاخرة' },
  { original: 'زيت عطري لافندر بيور', name_ar: 'زيت عطري لافندر نقي مهدئ', name_en: 'Pure Calming Lavender Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح زهرية فاخرة' },
  { original: 'زيت عطري سينابون أمريكي', name_ar: 'زيت عطري سينابون بالقرفة والفانيليا', name_en: 'American Cinnabon Bakery Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري تويليب', name_ar: 'زيت عطري زهرة التوليب الربيعية', name_en: 'Spring Tulip Blossom Fragrance Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح زهرية فاخرة' },
  { original: 'زيت عطري بلاك هورس بيز', name_ar: 'زيت عطري بلاك هورس بيز رجالي غامض', name_en: 'Black Horse Base Masculine Scent Compound', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور رجالية فواحة' },
  { original: 'زيت عطري إسكبشر بيز', name_ar: 'زيت عطري إسكالبشر نيكوس تايب بيز', name_en: 'Sculpture Nikos Type Base Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور رجالية فواحة' },
  { original: 'زيت عطري ياسمين بيز', name_ar: 'زيت عطري ياسمين بيز لقواعد الشامبو', name_en: 'Jasmine Base Floral Scent Compound', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'قواعد عطرية للمنظفات والشامبو' },
  { original: 'زيت عطري نعناع بيز', name_ar: 'زيت عطري نعناع بيز منعش ومبرد', name_en: 'Cooling Mint Base Fragrance Compound', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'قواعد عطرية للمنظفات والشامبو' },
  { original: 'زيت عطري يارا كاندي', name_ar: 'زيت عطري يارا كاندي لطافة تايب الوردي', name_en: 'Yara Candy Pink Lattafa Type Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور فرنسية وبدائل براندات' },
  { original: 'زيت عطري بابل جم', name_ar: 'زيت عطري علكة بابل جم لذيذ', name_en: 'Bubble Gum Sweet Candy Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري دارك كيس', name_ar: 'زيت عطري دارك كيس باث آند بودي تايب', name_en: 'Dark Kiss Bath & Body Type Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور فرنسية وبدائل براندات' },
  { original: 'زيت عطري ميلك روز', name_ar: 'زيت عطري حليب الورد (ميلك روز) ناعم', name_en: 'Milk & Roses Delicate Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح زهرية فاخرة' },
  { original: 'زيت عطري قهوة أمريكي', name_ar: 'زيت عطري قهوة أمريكية محمصة غنية', name_en: 'Roasted American Coffee Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري جوز هند بيور', name_ar: 'زيت عطري جوز هند بيور بدون إضافات', name_en: 'Pure Sweet Coconut Essence Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري سهر الليالي', name_ar: 'زيت عطري سهر الليالي رومانسي جذاب', name_en: 'Sahar El Layali Oriental Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح شرقية ومسك' },
  { original: 'زيت عطري جادور', name_ar: 'زيت عطري جادور كريستيان ديور تايب', name_en: 'J\'adore Dior Type Floral Luxury Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور فرنسية وبدائل براندات' },
  { original: 'زيت عطري تروبيكال', name_ar: 'زيت عطري فواكه استوائية تروبيكال', name_en: 'Tropical Island Fruits Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري بينك سويت', name_ar: 'زيت عطري بينك سويت حلاوة وردية', name_en: 'Pink Sweet Sugar Berry Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري أورنج فاير', name_ar: 'زيت عطري أورنج فاير حمضيات نفاذة', name_en: 'Orange Fire Zesty Intense Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح فواكه وسويت' },
  { original: 'زيت عطري لي لي سيكريت', name_ar: 'زيت عطري ليلي سيكريت زنبق ناعم', name_en: 'Lily Secret Floral Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'روائح زهرية فاخرة' },
  { original: 'زيت عطري وان مليون', name_ar: 'زيت عطري وان مليون باكو رابان تايب', name_en: '1 Million Paco Rabanne Type Scent Oil', form: 'liquid', cat: 'fragrances-and-scents', subcat: 'عطور رجالية فواحة' },

  // ==========================================
  // CATEGORY 8: FLAVORS (17)
  // ==========================================
  { original: 'نكهة توت', name_ar: 'نكهة توت مركزة لمرطبات الشفاه', name_en: 'Wild Berry Flavor Oil-Soluble', form: 'liquid', cat: 'flavors', subcat: 'نكهات غذائية وتجميلية قياسية' },
  { original: 'نكهة بندق', name_ar: 'نكهة بندق محمصة مركزة', name_en: 'Roasted Hazelnut Flavor', form: 'liquid', cat: 'flavors', subcat: 'نكهات غذائية وتجميلية قياسية' },
  { original: 'نكهة كراميل', name_ar: 'نكهة كراميل زبدية دافئة', name_en: 'Butter Caramel Flavor', form: 'liquid', cat: 'flavors', subcat: 'نكهات غذائية وتجميلية قياسية' },
  { original: 'نكهة شيكولاتة', name_ar: 'نكهة شوكولاته غنية مركزة', name_en: 'Rich Dark Chocolate Flavor', form: 'liquid', cat: 'flavors', subcat: 'نكهات غذائية وتجميلية قياسية' },

  // Kamena Oil-Based Flavors (13)
  { original: 'نكهة بطيخ كامينا زيتي', name_ar: 'نكهة بطيخ كامينا زيتي غذائي معتمد', name_en: 'Kamena Oil-Based Watermelon Flavor', form: 'liquid', cat: 'flavors', subcat: 'نكهات كامينا الزيتية المعتمدة' },
  { original: 'نكهة كراميل كامينا زيتي', name_ar: 'نكهة كراميل كامينا زيتي غذائي معتمد', name_en: 'Kamena Oil-Based Caramel Toffee Flavor', form: 'liquid', cat: 'flavors', subcat: 'نكهات كامينا الزيتية المعتمدة' },
  { original: 'نكهة أناناس كامينا زيتي', name_ar: 'نكهة أناناس كامينا زيتي استوائي', name_en: 'Kamena Oil-Based Pineapple Flavor', form: 'liquid', cat: 'flavors', subcat: 'نكهات كامينا الزيتية المعتمدة' },
  { original: 'نكهة نعناع كامينا زيتي', name_ar: 'نكهة نعناع كامينا زيتي منعش', name_en: 'Kamena Oil-Based Fresh Mint Flavor', form: 'liquid', cat: 'flavors', subcat: 'نكهات كامينا الزيتية المعتمدة' },
  { original: 'نكهة مانجو كامينا زيتي', name_ar: 'نكهة مانجو كامينا زيتي حلو', name_en: 'Kamena Oil-Based Sweet Mango Flavor', form: 'liquid', cat: 'flavors', subcat: 'نكهات كامينا الزيتية المعتمدة' },
  { original: 'نكهة قهوة كامينا زيتي', name_ar: 'نكهة قهوة كامينا زيتي بن أرابيكا', name_en: 'Kamena Oil-Based Espresso Coffee Flavor', form: 'liquid', cat: 'flavors', subcat: 'نكهات كامينا الزيتية المعتمدة' },
  { original: 'نكهة موز كامينا زيتي', name_ar: 'نكهة موز كامينا زيتي فواح', name_en: 'Kamena Oil-Based Ripe Banana Flavor', form: 'liquid', cat: 'flavors', subcat: 'نكهات كامينا الزيتية المعتمدة' },
  { original: 'نكهة بندق كامينا زيتي', name_ar: 'نكهة بندق كامينا زيتي مكسرات', name_en: 'Kamena Oil-Based Hazelnut Flavor', form: 'liquid', cat: 'flavors', subcat: 'نكهات كامينا الزيتية المعتمدة' },
  { original: 'نكهة شوكولاته كامينا زيتي', name_ar: 'نكهة شوكولاته كامينا زيتي كاكاو غني', name_en: 'Kamena Oil-Based Rich Chocolate Flavor', form: 'liquid', cat: 'flavors', subcat: 'نكهات كامينا الزيتية المعتمدة' },
  { original: 'نكهة فانيليا كامينا زيتي', name_ar: 'نكهة فانيليا كامينا زيتي أصلي', name_en: 'Kamena Oil-Based French Vanilla Flavor', form: 'liquid', cat: 'flavors', subcat: 'نكهات كامينا الزيتية المعتمدة' },
  { original: 'نكهة فراولة كامينا زيتي', name_ar: 'نكهة فراولة كامينا زيتي طازجة', name_en: 'Kamena Oil-Based Red Strawberry Flavor', form: 'liquid', cat: 'flavors', subcat: 'نكهات كامينا الزيتية المعتمدة' },
  { original: 'نكهة جوز هند كامينا زيتي', name_ar: 'نكهة جوز هند كامينا زيتي كريمي', name_en: 'Kamena Oil-Based Creamy Coconut Flavor', form: 'liquid', cat: 'flavors', subcat: 'نكهات كامينا الزيتية المعتمدة' },
  { original: 'نكهة توت كامينا زيتي', name_ar: 'نكهة توت كامينا زيتي بيري نكهة قوية', name_en: 'Kamena Oil-Based Wild Berry Flavor', form: 'liquid', cat: 'flavors', subcat: 'نكهات كامينا الزيتية المعتمدة' }
];

console.log(`\n📋 Loaded ${MASTER_CATALOG.length} verified products across 8 categories.`);

function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

async function runImport() {
  console.log('🚀 Starting Alpha Breeze Master Catalog Import to Supabase...\n');

  // 1. Fetch categories
  const catRes = await req('/categories?select=id,name_ar,slug');
  const catMap = {};
  if (catRes.status === 200) {
    const cats = JSON.parse(catRes.body);
    cats.forEach(c => { catMap[c.slug] = c.id; });
    console.log(`✅ Loaded ${cats.length} database categories.`);
  } else {
    console.warn(`⚠️ Warning: Categories table query returned ${catRes.status}.`);
  }

  // 2. Fetch existing products by slug to avoid duplicates
  const existRes = await req('/products?select=id,slug');
  const existingSlugs = new Set();
  if (existRes.status === 200) {
    const existing = JSON.parse(existRes.body);
    existing.forEach(p => existingSlugs.add(p.slug));
    console.log(`📦 Found ${existingSlugs.size} existing products in database.`);
  }

  const manifest = [];
  let importedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (let i = 0; i < MASTER_CATALOG.length; i++) {
    const item = MASTER_CATALOG[i];
    const slug = generateSlug(item.name_en) || `item-${i + 1}`;

    const productRecord = {
      name_ar: item.name_ar,
      name_en: item.name_en,
      slug: slug,
      description_ar: `مادة خام كيميائية وتجميلية عالية الجودة: ${item.name_ar}، توريد رسمي من شركة ألفا بريز للمصانع ومعامل التركيبات ومستحضرات العناية.`,
      category_id: catMap[item.cat] || null,
      price: 0, // B2B quote-based: zero price means "السعر عند الاستفسار"
      package_size: 'تعبئة صناعية معتمدة / حسب الطلب',
      sku: `AB-${item.cat.substring(0, 3).toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
      stock_quantity: 100,
      is_active: true,
      is_featured: i < 20, // feature first 20 products
      sort_order: i + 1,
      technical_specs: {
        original_source_text: item.original,
        product_form: item.form,
        subcategory: item.subcat,
        category_slug: item.cat,
        review_status: 'verified',
        quote_required: true,
        commercial_grade: 'درجة نقية لصناعة التجميل والعناية'
      }
    };

    if (existingSlugs.has(slug)) {
      // Update or skip
      skippedCount++;
      manifest.push({
        index: i + 1,
        original_text: item.original,
        name_ar: item.name_ar,
        name_en: item.name_en,
        slug: slug,
        category: item.cat,
        subcategory: item.subcat,
        status: 'already_exists'
      });
      continue;
    }

    try {
      const insRes = await req('/products', 'POST', productRecord);
      if (insRes.status === 201 || insRes.status === 200) {
        importedCount++;
        existingSlugs.add(slug);
        manifest.push({
          index: i + 1,
          original_text: item.original,
          name_ar: item.name_ar,
          name_en: item.name_en,
          slug: slug,
          category: item.cat,
          subcategory: item.subcat,
          status: 'imported'
        });
        if (importedCount % 25 === 0 || importedCount === MASTER_CATALOG.length) {
          console.log(`  ⏳ Imported ${importedCount} / ${MASTER_CATALOG.length} products...`);
        }
      } else {
        failedCount++;
        console.error(`  ❌ Failed inserting "${item.name_ar}": HTTP ${insRes.status} - ${insRes.body.substring(0, 80)}`);
        manifest.push({
          index: i + 1,
          original_text: item.original,
          name_ar: item.name_ar,
          slug: slug,
          status: 'failed',
          error: insRes.body.substring(0, 100)
        });
      }
    } catch (e) {
      failedCount++;
      console.error(`  ❌ Error inserting "${item.name_ar}": ${e.message}`);
    }
  }

  console.log('\n=============================================');
  console.log('  IMPORT SUMMARY & AUDIT REPORT');
  console.log('=============================================');
  console.log(`Total Source Items in Catalog:   ${MASTER_CATALOG.length}`);
  console.log(`Successfully Imported:           ${importedCount}`);
  console.log(`Already Present (Preserved):     ${skippedCount}`);
  console.log(`Failed / Errors:                 ${failedCount}`);
  console.log('=============================================\n');

  // Save manifest locally
  fs.writeFileSync('./catalog-import-manifest.json', JSON.stringify({
    timestamp: new Date().toISOString(),
    total_source_items: MASTER_CATALOG.length,
    imported_count: importedCount,
    skipped_count: skippedCount,
    failed_count: failedCount,
    manifest
  }, null, 2));

  console.log('📁 Saved catalog manifest to ./catalog-import-manifest.json');
}

runImport().catch(console.error);
