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
const SLUG_TO_CAT_NAME: Record<string, string> = {
  "oils-and-extracts": "الزيوت والمستخلصات النباتية",
  "raw-powders-and-actives": "البودرات والمواد الفعالة",
  "chemical-liquids-and-solvents": "السوائل الكيميائية والمذيبات والسيليكون",
  "vitamins-and-nutrients": "الفيتامينات والأحماض الأمينية والمغذيات",
  "waxes-and-polymers": "الشموع والبوليمرات",
  "colors-and-pigments": "الألوان والأصباغ والمايكا",
  "fragrances-and-scents": "العطور والزيوت العطرية المركزة",
  "flavors": "النكهات الغذائية والصناعية",
};

export const INITIAL_CATEGORIES = [
  {
    id: "cat-oils-and-extracts",
    slug: "oils-and-extracts",
    name_ar: "الزيوت والمستخلصات النباتية",
    name_en: "Oils & Botanical Extracts",
    description_ar: "زيوت طبيعية وعطرية وناقلة وخلاصات نباتية تجميلية فائقة النقاء",
    icon: "Droplets",
    sort_order: 1,
    is_active: true
  },
  {
    id: "cat-raw-powders-and-actives",
    slug: "raw-powders-and-actives",
    name_ar: "البودرات والمواد الفعالة",
    name_en: "Raw Powders & Active Ingredients",
    description_ar: "مكونات فعالة وبودرات كيميائية نقية وأحماض تقشير ومستحلبات ومثبتات قوام",
    icon: "Sparkles",
    sort_order: 2,
    is_active: true
  },
  {
    id: "cat-chemical-liquids-and-solvents",
    slug: "chemical-liquids-and-solvents",
    name_ar: "السوائل الكيميائية والمذيبات والسيليكون",
    name_en: "Chemical Liquids, Solvents & Silicones",
    description_ar: "مذيبات تجميلية وصناعية، سلسلة سيليكونات متخصصة، وعوامل ترطيب وتجانس",
    icon: "FlaskConical",
    sort_order: 3,
    is_active: true
  },
  {
    id: "cat-vitamins-and-nutrients",
    slug: "vitamins-and-nutrients",
    name_ar: "الفيتامينات والأحماض الأمينية والمغذيات",
    name_en: "Vitamins, Amino Acids & Nutrients",
    description_ar: "فيتامينات نقية وأحماض أمينية ومغذيات علاجية لصحة البشرة والشعر",
    icon: "Atom",
    sort_order: 4,
    is_active: true
  },
  {
    id: "cat-waxes-and-polymers",
    slug: "waxes-and-polymers",
    name_ar: "الشموع والبوليمرات",
    name_en: "Waxes & Polymers",
    description_ar: "شموع استحلاب طبيعية ومعدنية وبوليمرات لتصنيع الكريمات والمراهم",
    icon: "Flame",
    sort_order: 5,
    is_active: true
  },
  {
    id: "cat-colors-and-pigments",
    slug: "colors-and-pigments",
    name_ar: "الألوان والأصباغ والمايكا",
    name_en: "Colors, Pigments & Micas",
    description_ar: "ألوان زيتية ومائية، بودرات مايكا لامعة، وأصباغ مصرح بها لمستحضرات التجميل",
    icon: "Palette",
    sort_order: 6,
    is_active: true
  },
  {
    id: "cat-fragrances-and-scents",
    slug: "fragrances-and-scents",
    name_ar: "العطور والزيوت العطرية المركزة",
    name_en: "Fragrances & Essential Scents",
    description_ar: "زيوت عطرية مركزة خالية من الكحول وبدائل براندات عالمية وعطور شرقية وزهرية",
    icon: "Heart",
    sort_order: 7,
    is_active: true
  },
  {
    id: "cat-flavors",
    slug: "flavors",
    name_ar: "النكهات الغذائية والصناعية",
    name_en: "Flavors",
    description_ar: "نكهات مركزة معتمدة قابلة للاستخدام في مرطبات الشفاه والتطبيقات الغذائية والدوائية",
    icon: "Apple",
    sort_order: 8,
    is_active: true
  }
];

function detectCategorySlug(p: any, specs: any): string {
  if (specs?.category_slug && SLUG_TO_CAT_NAME[specs.category_slug]) return specs.category_slug;
  if (p.category_slug && SLUG_TO_CAT_NAME[p.category_slug]) return p.category_slug;
  if (typeof p.category === "object" && p.category?.slug && SLUG_TO_CAT_NAME[p.category.slug]) return p.category.slug;

  const catStr = (typeof p.category === "string" ? p.category : "").toLowerCase();
  const nameAr = (p.name_ar || p.name || "").toLowerCase();
  const slug = (p.slug || "").toLowerCase();

  if (slug.includes("mpg") || slug.includes("propylene") || slug.includes("ipm") || slug.includes("glycerin") || slug.includes("silicone") || catStr.includes("سوائل") || catStr.includes("مذيب")) {
    return "chemical-liquids-and-solvents";
  }
  if (slug.includes("panthenol") || slug.includes("vitamin") || slug.includes("hyaluron") || slug.includes("ascorbic") || catStr.includes("فيتامين") || nameAr.includes("فيتامين") || nameAr.includes("بانثينول") || nameAr.includes("هيالورون")) {
    return "vitamins-and-nutrients";
  }
  if (slug.includes("wax") || slug.includes("carnauba") || slug.includes("beeswax") || catStr.includes("شمع") || nameAr.includes("شمع")) {
    return "waxes-and-polymers";
  }
  if (nameAr.startsWith("زيت") || nameAr.startsWith("خلاصة") || slug.includes("oil") || slug.includes("extract") || catStr.includes("زيت") || catStr.includes("مستخلص")) {
    return "oils-and-extracts";
  }
  if (catStr.includes("عطر") || nameAr.includes("مسك") || slug.includes("fragrance") || slug.includes("perfume")) {
    return "fragrances-and-scents";
  }
  if (catStr.includes("لون") || catStr.includes("مايكا") || slug.includes("color") || slug.includes("mica") || slug.includes("pigment")) {
    return "colors-and-pigments";
  }
  if (catStr.includes("نكه") || slug.includes("flavor")) {
    return "flavors";
  }
  return "raw-powders-and-actives";
}

function getEmojiForProduct(categorySlug?: string, form?: string): string {
  if (categorySlug === "oils-and-extracts" || form === "oil") return "🌿";
  if (categorySlug === "fragrances-and-scents") return "🌸";
  if (categorySlug === "colors-and-pigments") return "🎨";
  if (categorySlug === "flavors") return "🍓";
  if (categorySlug === "vitamins-and-nutrients") return "💊";
  if (categorySlug === "waxes-and-polymers" || form === "wax") return "🕯️";
  if (categorySlug === "chemical-liquids-and-solvents" || form === "liquid") return "💧";
  return "🧪";
}

const mapProductFromDB = (p: any) => {
  const specs = typeof p.technical_specs === "object" && p.technical_specs ? p.technical_specs : (p.specs || {});
  const catSlug = detectCategorySlug(p, specs);
  const categoryName = SLUG_TO_CAT_NAME[catSlug] || (typeof p.category === "object" && p.category?.name_ar ? p.category.name_ar : (p.category || "خامات كيميائية"));

  return {
    ...p,
    name: p.name_ar || p.name,
    name_ar: p.name_ar || p.name,
    name_en: p.name_en || p.nameEn || "",
    scientific_name: p.scientific_name || specs.scientific_name || p.name_en || "",
    inci_name: p.inci_name || specs.inci_name || p.name_en || "",
    cas_number: p.cas_number || specs.cas_number || "",
    purity_grade: p.purity_grade || specs.purity_grade || "درجة تجميلية (Cosmetic Grade)",
    origin_country: p.origin_country || specs.origin_country || "",
    manufacturer: p.manufacturer || specs.manufacturer || "",
    package_size: p.package_size || specs.package_size || "تعبئة صناعية معتمدة / حسب الطلب",
    pricing_unit: p.pricing_unit || "",
    category: categoryName,
    category_slug: catSlug,
    subcategory: specs.subcategory || "",
    product_form: specs.product_form || "",
    original_source_text: specs.original_source_text || "",
    industrial_applications: Array.isArray(p.industrial_applications)
      ? p.industrial_applications
      : (typeof p.industrial_applications === "string" ? JSON.parse(p.industrial_applications) : []),
    cosmetic_applications: Array.isArray(p.cosmetic_applications) ? p.cosmetic_applications : [],
    description: p.description_ar || p.description,
    stock: p.stock_quantity ?? p.stock ?? 0,
    emoji: p.emoji || getEmojiForProduct(catSlug, specs.product_form),
    image: p.og_image_url || p.image || null,
    specs: specs,
  };
};

const INITIAL_PRODUCTS = [
  {
    id: "mpg",
    slug: "mono-propylene-glycol-mpg",
    name: "مونو بروبيلين جلايكول (MPG)",
    name_ar: "مونو بروبيلين جلايكول (MPG)",
    name_en: "Mono Propylene Glycol",
    scientific_name: "Propane-1,2-diol",
    inci_name: "Propylene Glycol",
    cas_number: "57-55-6",
    purity_grade: "99.8% MIN",
    origin_country: "الصين",
    package_size: "برميل صناعي (صافي 215 كجم / إجمالي 233 كجم)",
    net_weight: "215 كجم",
    gross_weight: "233 كجم",
    pricing_unit: "",
    category: "مواد فعالة",
    price: 135,
    oldPrice: null,
    emoji: "🧪",
    image: "/images/products/mpg.jpg",
    sku: "RAW-MPG-57556",
    badge: "نقاء 99.8%",
    stock: 2150,
    is_active: true,
    is_featured: true,
    industrial_applications: [
      "مذيب ومرطب أساسي في تصنيع الكريمات واللوشن",
      "تركيبات السيروم المائي ومنتجات العناية بالبشرة",
      "صناعة الشامبو ومستحضرات العناية بالشعر",
      "تثبيت التركيبات وتحسين القوام وتجانس الأطوار"
    ],
    specs: {
      "الاسم التجاري": "Mono Propylene Glycol (MPG)",
      "الاسم الكيميائي (INCI)": "Propylene Glycol",
      "الاختصار": "MPG",
      "رقم CAS الدولي": "57-55-6",
      "درجة النقاء": "99.8% MIN",
      "بلد المنشأ": "الصين",
      "الوزن الصافي": "215 كجم",
      "الوزن الإجمالي": "233 كجم",
      "نوع التعبئة": "برميل صناعي محكم لمادة سائلة"
    }
  },
  {
    id: "d-panthenol",
    slug: "d-panthenol-dexpanthenol",
    name: "البانثينول (D-Panthenol)",
    name_ar: "البانثينول (D-Panthenol)",
    name_en: "D-Panthenol",
    scientific_name: "Dexpanthenol / Pro-Vitamin B5",
    inci_name: "Panthenol",
    cas_number: "81-13-0",
    purity_grade: "Cosmetic / Pharma Grade",
    origin_country: "الصين",
    package_size: "عبوة صناعية (صافي 20 كجم / إجمالي 21 كجم)",
    net_weight: "20 كجم",
    gross_weight: "21 كجم",
    pricing_unit: "",
    category: "مواد فعالة",
    price: 1100,
    oldPrice: null,
    emoji: "💧",
    image: "/images/products/d-panthenol.jpg",
    sku: "ACT-PANTH-81130",
    badge: "برو فيتامين B5",
    stock: 500,
    is_active: true,
    is_featured: true,
    industrial_applications: [
      "ترطيب عميق للبشرة وتحسين مرونتها",
      "دعم وترميم حاجز البشرة الواقي",
      "شامبو وبلسم وسيروم تقوية وتغذية الشعر",
      "منتجات العناية بالبشرة الحساسة والجافة"
    ],
    specs: {
      "الاسم التجاري": "D-Panthenol",
      "الاسم الكيميائي (INCI)": "Panthenol",
      "الاسم العلمي / البديل": "Dexpanthenol (Pro-Vitamin B5)",
      "رقم CAS الدولي": "81-13-0",
      "بلد المنشأ": "الصين",
      "الوزن الصافي": "20 كجم",
      "الوزن الإجمالي": "21 كجم",
      "نوع التعبئة": "عبوة صناعية محكمة لحماية المادة"
    }
  },
  {
    id: "lanette-16",
    slug: "lanette-16-cetyl-alcohol",
    name: "لانيت 16 (Lanette 16)",
    name_ar: "لانيت 16 (Lanette 16 - كحول سيتيلي)",
    name_en: "Lanette 16",
    scientific_name: "Cetyl Alcohol / 1-Hexadecanol",
    inci_name: "Cetyl Alcohol",
    cas_number: "36653-82-4",
    purity_grade: "مصدر نباتي طبيعي (Palm / Vegetable)",
    origin_country: "ماليزيا",
    manufacturer: "Suriachem",
    package_size: "شيكارة صناعية 25 كجم",
    net_weight: "25 كجم",
    pricing_unit: "",
    category: "خامات طبيعية",
    price: 180,
    oldPrice: null,
    emoji: "🕯️",
    image: "/images/products/lanette-16.jpg",
    sku: "EMU-LAN16-36653",
    badge: "Suriachem ماليزي",
    stock: 1500,
    is_active: true,
    is_featured: true,
    industrial_applications: [
      "مادة مكثفة ومحسنة لقوام وملمس الكريمات واللوشن",
      "عامل استحلاب وتثبيت في حمامات كريم وبلسم الشعر",
      "إعطاء ملمس مخملي ناعم في مستحضرات التجميل"
    ],
    specs: {
      "الاسم التجاري": "Lanette 16",
      "الاسم الكيميائي (INCI)": "Cetyl Alcohol",
      "المورد / العلامة التجارية": "Suriachem",
      "المصدر": "نباتي طبيعي (Palm / Vegetable)",
      "بلد المنشأ": "ماليزيا",
      "الوزن": "25 كجم",
      "المظهر": "رقائق أو حبيبات شمعية بيضاء ناصعة"
    }
  },
  {
    id: "lanolin-anhydrous",
    slug: "lanolin-anhydrous",
    name: "اللانولين (Lanolin Anhydrous)",
    name_ar: "اللانولين اللامائي النقي (Lanolin Anhydrous)",
    name_en: "Lanolin Anhydrous",
    scientific_name: "Wool Fat / Refined Lanolin",
    inci_name: "Lanolin",
    cas_number: "8006-54-0",
    purity_grade: "لامائي فائق النقاوة (Anhydrous Grade)",
    origin_country: "الهند",
    package_size: "براميل معدنية (صافي 50 كجم)",
    net_weight: "50 كجم",
    pricing_unit: "",
    category: "خامات طبيعية",
    price: 850,
    oldPrice: null,
    emoji: "🐑",
    image: "/images/products/lanolin.jpg",
    sku: "RAW-LANO-80065",
    badge: "براميل معدنية 50 كجم",
    stock: 600,
    is_active: true,
    is_featured: true,
    industrial_applications: [
      "مادة مطرية ومرطبة فائقة لتقليل الجفاف الشديد والتشققات",
      "كريمات العناية بالقدمين واليدين والبشرة شديدة الجفاف",
      "مراهم الحماية الطبيعية وبلسم الشفاه",
      "مستحضرات تصفيف وتغذية خصلات الشعر"
    ],
    specs: {
      "الاسم التجاري": "Lanolin Anhydrous",
      "الاسم الكيميائي (INCI)": "Lanolin",
      "رقم CAS الدولي": "8006-54-0",
      "بلد المنشأ": "الهند",
      "الوزن الصافي": "50 كجم",
      "نوع التعبئة": "براميل معدنية صناعية محكمة الغلق"
    }
  },
  {
    id: "vitamin-e",
    slug: "vitamin-e-nhu",
    name: "فيتامين E (أسيتات التوكوفيرول)",
    name_ar: "فيتامين E النقي (DL-Alpha Tocopheryl Acetate)",
    name_en: "Vitamin E",
    scientific_name: "DL-Alpha Tocopheryl Acetate",
    inci_name: "Tocopheryl Acetate",
    cas_number: "7695-91-2",
    purity_grade: "Cosmetic / Pharma Grade",
    origin_country: "الصين",
    manufacturer: "Zhejiang NHU",
    package_size: "عبوة صناعية (صافي 20 كجم)",
    net_weight: "20 كجم",
    pricing_unit: "",
    category: "فيتامينات",
    price: 1800,
    oldPrice: null,
    emoji: "✨",
    image: "/images/products/vitamin-e.jpg",
    sku: "VIT-NHU-76959",
    badge: "Zhejiang NHU",
    stock: 450,
    is_active: true,
    is_featured: true,
    industrial_applications: [
      "مضاد أكسدة رئيسي لحماية خلايا البشرة من الشوارد الحرة",
      "حماية الزيوت والمستحلبات والتركيبات من الأكسدة والتلف",
      "سيروم وكريمات نضارة وتغذية البشرة والشعر",
      "مرطبات الشفاه ومستحضرات مكافحة التجاعيد"
    ],
    specs: {
      "الاسم التجاري": "Vitamin E",
      "الاسم العلمي": "DL-Alpha Tocopheryl Acetate",
      "الاسم الكيميائي (INCI)": "Tocopheryl Acetate",
      "الشركة المصنعة": "Zhejiang NHU",
      "رقم CAS الدولي": "7695-91-2",
      "بلد المنشأ": "الصين",
      "الوزن الصافي": "20 كجم",
      "المظهر": "سائل زيتي نقي شفاف مائل للصفرة"
    }
  },
  {
    id: "stearic-acid",
    slug: "stearic-acid-palmera-zanyu",
    name: "حمض الشمع (Stearic Acid)",
    name_ar: "حمض الشمع (Stearic Acid - شمع الاستياريك)",
    name_en: "Stearic Acid",
    scientific_name: "Octadecanoic Acid",
    inci_name: "Stearic Acid",
    cas_number: "57-11-4",
    purity_grade: "درجة تصنيع كيميائي وتجميلي نقية",
    origin_country: "إندونيسيا / ماليزيا",
    manufacturer: "Palmera / Zanyu",
    package_size: "شيكارة صناعية 25 كجم",
    net_weight: "25 كجم",
    pricing_unit: "",
    category: "شموع",
    price: 135,
    oldPrice: null,
    emoji: "🕯️",
    image: "/images/products/stearic-acid.jpg",
    sku: "RAW-STEA-57114",
    badge: "Palmera / Zanyu",
    stock: 2500,
    is_active: true,
    is_featured: true,
    industrial_applications: [
      "ضبط القوام وتغليظ الكريمات واللوشن",
      "قاعدة أساسية في تصنيع الصابون الصلب والسائل",
      "مستحضرات الشامبو والبلسم وكريمات الحلاقة",
      "تثبيت وتجانس المستحلبات التجميلية"
    ],
    specs: {
      "الاسم التجاري": "Stearic Acid",
      "الاسم الكيميائي (INCI)": "Stearic Acid",
      "العلامات التجارية المتاحة": "Palmera / Zanyu",
      "رقم CAS الدولي": "57-11-4",
      "بلد المنشأ": "إندونيسيا / ماليزيا",
      "الوزن": "25 كجم",
      "المظهر": "رقائق أو حبيبات بيضاء دقيقة سهلة الانصهار"
    }
  },
  {
    id: "ipm",
    slug: "isopropyl-myristate-ipm",
    name: "أيزوبروبيل ميرستات (IPM)",
    name_ar: "أيزوبروبيل ميرستات (Isopropyl Myristate - IPM)",
    name_en: "Isopropyl Myristate",
    scientific_name: "Propan-2-yl tetradecanoate",
    inci_name: "Isopropyl Myristate",
    cas_number: "110-27-0",
    purity_grade: "مطرّي ومذيب تجميلي فائق الخفة",
    origin_country: "تعبئة صناعية",
    package_size: "براميل صناعية / عبوات مخصصة",
    pricing_unit: "",
    category: "مواد فعالة",
    price: 0,
    price_upon_request: true,
    oldPrice: null,
    emoji: "🧴",
    image: "/images/products/ipm.jpg",
    sku: "RAW-IPM-11027",
    badge: "اطلب عرض سعر",
    stock: 800,
    is_active: true,
    is_featured: true,
    industrial_applications: [
      "مادة مطرية ومذيبة خفيفة وسريعة الامتصاص",
      "تحسين انتشار المستحضرات وسهولة توزيعها على البشرة",
      "تقليل الأثر والملمس الدهني اللزج في كريمات وزيوت الشعر والبشرة",
      "سيروم الشعر الخفيف ومزيلات المكياج والعطور الزيتية"
    ],
    specs: {
      "الاسم التجاري": "Isopropyl Myristate (IPM)",
      "الاسم الكيميائي (INCI)": "Isopropyl Myristate",
      "الاختصار": "IPM",
      "رقم CAS الدولي": "110-27-0",
      "بلد المنشأ والتعبئة": "تعبئة صناعية معتمدة",
      "المظهر": "سائل زيتي شفاف عديم الرائحة ذو ملمس غير دهني",
      "السعر": "غير معلن — اطلب عرض سعر (RFQ)"
    }
  },
  {
    id: "1",
    name: "زبدة الشيا العضوية الخام",
    name_ar: "زبدة الشيا العضوية الخام غير المكررة",
    name_en: "Unrefined Raw Shea Butter",
    scientific_name: "Butyrospermum Parkii Butter",
    inci_name: "Butyrospermum Parkii (Shea) Butter",
    cas_number: "194043-92-0",
    purity_grade: "خام نقي 100% غير مكرر",
    origin_country: "غانا",
    package_size: "كرتونة بلوك 25 كجم / عبوة 1 كجم",
    pricing_unit: "لكل 1 كجم (توريد صناعي)",
    category: "خامات طبيعية",
    price: 250,
    oldPrice: 320,
    emoji: "🧴",
    sku: "RAW-SHEA-01",
    badge: "الأكثر طلباً للمصانع",
    stock: 2500,
    is_active: true,
    is_featured: true,
    industrial_applications: ["كريمات ولوشن الجسم واليدين", "مرطبات وبلسم الشفاه", "حمامات كريم الشعر المعالج", "صابون زيتي طبيعي"],
    specs: {
      "الاسم الكيميائي (INCI)": "Butyrospermum Parkii (Shea) Butter",
      "رقم CAS الدولي": "194043-92-0",
      "درجة الانصهار": "31 - 38 °C",
      "الرائحة": "رائحة جوزية طبيعية مميزة",
      "شروط التخزين": "مكان جاف وبارد بعيداً عن أشعة الشمس المباشرة",
      "العبوة المتاحة": "كرتونة 25 كجم / عبوة 1 كجم للمختبرات"
    }
  },
  {
    id: "2",
    name: "زيت الأرجان المغربي المعصور على البارد",
    name_ar: "زيت الأرجان المغربي البكر النقي",
    name_en: "Pure Cold-Pressed Moroccan Argan Oil",
    scientific_name: "Argania Spinosa Kernel Oil",
    inci_name: "Argania Spinosa (Argan) Kernel Oil",
    cas_number: "223747-87-3",
    purity_grade: "نقي وطبيعي 100% معصور على البارد (Virgin)",
    origin_country: "المملكة المغربية",
    package_size: "درام 25 لتر / عبوة ألومنيوم 1 لتر",
    pricing_unit: "لكل 1 لتر",
    category: "زيوت طبيعية",
    price: 180,
    oldPrice: null,
    emoji: "🫒",
    sku: "OIL-ARGAN-02",
    badge: "خام أصلي",
    stock: 500,
    is_active: true,
    is_featured: false,
    industrial_applications: ["سيروم وزيوت علاج وتغذية الشعر", "كريمات مضادة للشيخوخة والتجاعيد", "زيوت التدليك الاحترافية"],
    specs: {
      "الاسم الكيميائي (INCI)": "Argania Spinosa Kernel Oil",
      "رقم CAS الدولي": "223747-87-3",
      "طريقة الاستخلاص": "عصر هيدروليكي ميكانيكي على البارد",
      "المظهر": "سائل زيتي ذهبي رائق",
      "نسبة الحموضة الحرة": "أقل من 0.8%"
    }
  },
  {
    id: "3",
    name: "شمع العسل الطبيعي المصفى",
    name_ar: "شمع العسل النقي المصفى (حبيبات)",
    name_en: "Pure Refined Beeswax Pellets",
    scientific_name: "Cera Alba",
    inci_name: "Cera Alba (Beeswax)",
    cas_number: "8012-89-3",
    purity_grade: "Cosmetic Grade (شمع مصفى فائق النقاء)",
    origin_country: "مصر / إسبانيا",
    package_size: "أكياس خيش 25 كجم / أكياس 1 كجم",
    pricing_unit: "لكل 1 كجم",
    category: "شموع",
    price: 150,
    oldPrice: 200,
    emoji: "🍯",
    sku: "WAX-BEES-03",
    badge: "توريد جملة",
    stock: 1200,
    is_active: true,
    is_featured: true,
    industrial_applications: ["مستحضرات التجميل الصلبة والبلسم", "أحمر الشفاه ومرطبات الشفاه", "عامل تكثيف وتثبيت للمراهم والكريمات الشمعية"],
    specs: {
      "الاسم الكيميائي (INCI)": "Cera Alba",
      "رقم CAS الدولي": "8012-89-3",
      "درجة الانصهار": "61 - 65 °C",
      "المظهر": "حبيبات شمعية دقيقة سهلة الصهر",
      "اللون": "أصفر ذهبي طبيعي"
    }
  },
  {
    id: "4",
    name: "حمض الهيالورونيك النقي (بودرة)",
    name_ar: "حمض الهيالورونيك فائق النقاوة (وزن جزيئي منخفض وعالي)",
    name_en: "Sodium Hyaluronate Pure Powder",
    scientific_name: "Sodium Hyaluronate",
    inci_name: "Sodium Hyaluronate",
    cas_number: "9067-32-7",
    purity_grade: "درجة تجميلية ونشطة (Cosmetic Active ≥ 95%)",
    origin_country: "ألمانيا",
    package_size: "عبوة ألومنيوم معقمة 1 كجم / 5 كجم",
    pricing_unit: "لكل 1 كجم (سعر توريد المعامل)",
    category: "مواد فعالة",
    price: 450,
    oldPrice: null,
    emoji: "💧",
    sku: "ACT-HYAL-04",
    badge: "مادة فعالة رئيسية",
    stock: 300,
    is_active: true,
    is_featured: true,
    industrial_applications: ["سيروم الهيالورونيك المائي المركز", "كريمات الترطيب الفائق ومكافحة التجاعيد", "جل العين ومستحلبات النضارة"],
    specs: {
      "الاسم الكيميائي (INCI)": "Sodium Hyaluronate",
      "رقم CAS الدولي": "9067-32-7",
      "النقاوة": "≥ 95.0% (HPLC)",
      "المظهر": "مسحوق بلوري أبيض ناعم",
      "الذوبانية": "يذوب في الماء ليشكل جل شفاف متماسك",
      "نسبة الاستخدام الموصى بها": "0.1% إلى 1.5%",
      "الرقم الهيدروجيني (pH)": "5.5 - 7.5 (محلول 0.5%)"
    }
  },
  {
    id: "5",
    name: "حمض الأسكوربيك النقي (فيتامين سي بودرة)",
    name_ar: "فيتامين سي نقي 99.5% (L-Ascorbic Acid)",
    name_en: "Pure L-Ascorbic Acid Powder (Vitamin C)",
    scientific_name: "L-Ascorbic Acid",
    inci_name: "Ascorbic Acid",
    cas_number: "50-81-7",
    purity_grade: "USP / Cosmetic Grade (≥ 99.5%)",
    origin_country: "فرنسا",
    package_size: "برميل كرتوني محكم 25 كجم / عبوة 1 كجم",
    pricing_unit: "لكل 1 كجم",
    category: "فيتامينات",
    price: 380,
    oldPrice: 450,
    emoji: "✨",
    sku: "VIT-ASCO-05",
    badge: "USP Grade",
    stock: 800,
    is_active: true,
    is_featured: true,
    industrial_applications: ["سيروم فيتامين سي المضاد للأكسدة والتفتيح", "كريمات ومقشرات تفتيح التصبغات", "مستحضرات تحفيز الكولاجين"],
    specs: {
      "الاسم الكيميائي (INCI)": "Ascorbic Acid",
      "رقم CAS الدولي": "50-81-7",
      "النقاوة": "≥ 99.5%",
      "المظهر": "مسحوق أبيض بلوري دقيق",
      "نسبة الاستخدام الموصى بها": "5% إلى 15%",
      "الذوبانية": "سريع الذوبان في الأطوار المائية"
    }
  },
  {
    id: "6",
    name: "زيت جوز الهند العضوي البكر المعصور على البارد",
    name_ar: "زيت جوز الهند البكر الممتاز (Extra Virgin)",
    name_en: "Organic Extra Virgin Coconut Oil",
    scientific_name: "Cocos Nucifera Oil",
    inci_name: "Cocos Nucifera (Coconut) Oil",
    cas_number: "8001-31-8",
    purity_grade: "بكر عضوي نقي 100% غير مهدرج",
    origin_country: "سريلانكا",
    package_size: "برميل درام 190 كجم / جركن 20 كجم / عبوة 1 لتر",
    pricing_unit: "لكل 1 لتر",
    category: "زيوت طبيعية",
    price: 120,
    oldPrice: null,
    emoji: "🥥",
    sku: "OIL-COCO-06",
    badge: "عضوي معتمد",
    stock: 1500,
    is_active: true,
    is_featured: false,
    industrial_applications: ["صناعة زيوت وحمامات كريم الشعر", "قاعدة تصنيع الصابون الصلب والسائل الطبيعي", "مرطبات الجسم والشفاه"],
    specs: {
      "الاسم الكيميائي (INCI)": "Cocos Nucifera (Coconut) Oil",
      "رقم CAS الدولي": "8001-31-8",
      "درجة الانصهار": "24 - 26 °C",
      "المظهر": "صلب كريمي أبيض في الشتاء / سائل زيتي رائق صيفاً"
    }
  },
  {
    id: "7",
    name: "الكولاجين البحري المهدرج (ببتيدات)",
    name_ar: "ببتيدات الكولاجين البحري فائق الامتصاص",
    name_en: "Hydrolyzed Marine Collagen Peptides",
    scientific_name: "Hydrolyzed Collagen",
    inci_name: "Hydrolyzed Collagen",
    cas_number: "92113-31-0",
    purity_grade: "درجة نشطة تجميلية (Cosmetic Grade ≥ 90% Protein)",
    origin_country: "فرنسا",
    package_size: "كرتونة 20 كجم / عبوة 1 كجم",
    pricing_unit: "لكل 1 كجم",
    category: "مواد فعالة",
    price: 550,
    oldPrice: 700,
    emoji: "🐚",
    sku: "ACT-COLL-07",
    badge: "مستورد فرنسي",
    stock: 400,
    is_active: true,
    is_featured: true,
    industrial_applications: ["سيروم شد وترميم حاجز البشرة", "شامبو وبلسم علاج الشعر المتقصف والتالف", "كريمات شد البشرة ومكافحة التجاعيد"],
    specs: {
      "الاسم الكيميائي (INCI)": "Hydrolyzed Collagen",
      "رقم CAS الدولي": "92113-31-0",
      "محتوى البروتين": "≥ 90%",
      "المظهر": "بودرة بيضاء إلى كريمية خفيفة",
      "نسبة الاستخدام الموصى بها": "0.5% إلى 5%"
    }
  },
  {
    id: "8",
    name: "زبدة الكاكاو النقية (ديودورايزد)",
    name_ar: "زبدة الكاكاو الطبيعية النقية منزوعة الرائحة",
    name_en: "Pure Deodorized Cocoa Butter",
    scientific_name: "Theobroma Cacao Seed Butter",
    inci_name: "Theobroma Cacao (Cocoa) Seed Butter",
    cas_number: "8002-31-1",
    purity_grade: "Cosmetic & Food Grade 100% طبيعي",
    origin_country: "ساحل العاج (كوت ديفوار)",
    package_size: "كرتونة بلوك 25 كجم / عبوة 1 كجم",
    pricing_unit: "لكل 1 كجم",
    category: "خامات طبيعية",
    price: 200,
    oldPrice: null,
    emoji: "🍫",
    sku: "RAW-COCO-08",
    badge: "خام درجة أولى",
    stock: 900,
    is_active: true,
    is_featured: true,
    industrial_applications: ["كريمات ولوشن العناية المركزة بالجسم", "أقلام الروج ومستحضرات الشفاه المقاومة للتشقق", "تركيبات العناية بعلامات التمدد (Stretch Marks)"],
    specs: {
      "الاسم الكيميائي (INCI)": "Theobroma Cacao Seed Butter",
      "رقم CAS الدولي": "8002-31-1",
      "درجة الانصهار": "34 - 38 °C (تذوب عند ملامسة حرارة الجسم)",
      "المظهر": "كتلة صلبة صفراء باهتة"
    }
  },
  {
    id: "9",
    name: "زيت اللوز الحلو المكرر النقي",
    name_ar: "زيت اللوز الحلو النقي عديم الرائحة",
    name_en: "Refined Pure Sweet Almond Oil",
    scientific_name: "Prunus Amygdalus Dulcis Oil",
    inci_name: "Prunus Amygdalus Dulcis (Sweet Almond) Oil",
    cas_number: "8007-69-0",
    purity_grade: "نقي 100% مكرر درجة تجميلية وصيدلانية",
    origin_country: "إسبانيا",
    package_size: "برميل صاج 190 كجم / جركن 25 لتر / عبوة 1 لتر",
    pricing_unit: "لكل 1 لتر",
    category: "زيوت طبيعية",
    price: 95,
    oldPrice: 120,
    emoji: "🌰",
    sku: "OIL-ALMD-09",
    badge: "زيت حامل أساسي",
    stock: 2000,
    is_active: true,
    is_featured: false,
    industrial_applications: ["زيت حامل رئيسي في صناعة السيروم والكريمات", "زيوت الأطفال الحساسة والمساج", "منتجات إزالة المكياج والترطيب اللطيف"],
    specs: {
      "الاسم الكيميائي (INCI)": "Prunus Amygdalus Dulcis Oil",
      "رقم CAS الدولي": "8007-69-0",
      "الكثافة": "0.910 - 0.915 g/ml",
      "المظهر": "سائل زيتي رائق أصفر فاتح جداً"
    }
  },
  {
    id: "10",
    name: "الجلسرين النباتي النقي 99.5%",
    name_ar: "جلسرين نباتي فائق النقاوة USP Grade",
    name_en: "Pure Vegetable Glycerin USP 99.5%",
    scientific_name: "Propane-1,2,3-triol",
    inci_name: "Glycerin",
    cas_number: "56-81-5",
    purity_grade: "USP / BP Pharma Grade (≥ 99.5%)",
    origin_country: "ماليزيا",
    package_size: "درام بلاستيكي 250 كجم / جركن 25 كجم / عبوة 5 كجم",
    pricing_unit: "لكل 1 كجم",
    category: "خامات طبيعية",
    price: 85,
    oldPrice: null,
    emoji: "🧪",
    sku: "RAW-GLYC-10",
    badge: "USP 99.5%",
    stock: 10000,
    is_active: true,
    is_featured: false,
    industrial_applications: ["مرطب أساسي ومرطب للرطوبة (Humectant) في جميع المستحضرات", "صناعة الصابون الشفاف وجل الاستحمام والشامبو", "الكريمات واللوشن والأطوار المائية"],
    specs: {
      "الاسم الكيميائي (INCI)": "Glycerin",
      "رقم CAS الدولي": "56-81-5",
      "النقاوة": "≥ 99.5%",
      "الكثافة النوعية": "1.26 g/cm³",
      "المظهر": "سائل لزج شفاف عديم الرائحة واللون"
    }
  },
  {
    id: "11",
    name: "زيت الجوجوبا الذهبي النقي",
    name_ar: "زيت الجوجوبا الذهبي المعصور على البارد",
    name_en: "Pure Golden Jojoba Oil",
    scientific_name: "Simmondsia Chinensis Seed Oil",
    inci_name: "Simmondsia Chinensis (Jojoba) Seed Oil",
    cas_number: "90045-98-0",
    purity_grade: "نقي 100% شمع سائل طبيعي معصور على البارد",
    origin_country: "جمهورية مصر العربية",
    package_size: "برميل 200 لتر / جركن 25 لتر / عبوة 1 لتر",
    pricing_unit: "لكل 1 لتر",
    category: "زيوت طبيعية",
    price: 220,
    oldPrice: null,
    emoji: "🌿",
    sku: "OIL-JOJO-11",
    badge: "إنتاج مصري ممتاز",
    stock: 1800,
    is_active: true,
    is_featured: false,
    industrial_applications: ["تركيبات البشرة الدهنية والمختلطة والمعرضة للحبوب", "سيروم وزيوت تنظيم إفراز الدهون للشعر وفروة الرأس", "مزيلات المكياج ومنتجات ما بعد الحلاقة"],
    specs: {
      "الاسم الكيميائي (INCI)": "Simmondsia Chinensis Seed Oil",
      "رقم CAS الدولي": "90045-98-0",
      "المظهر": "سائل ذهبي لامع مميز",
      "الخصائص": "شمع سائل غير قابل للتزنخ وسريع الامتصاص"
    }
  },
  {
    id: "12",
    name: "النياسيناميد النقي (فيتامين B3)",
    name_ar: "نياسيناميد بودرة نقية ≥ 99% (Niacinamide)",
    name_en: "Pure Niacinamide Powder (Vitamin B3)",
    scientific_name: "Pyridine-3-carboxamide",
    inci_name: "Niacinamide",
    cas_number: "98-92-0",
    purity_grade: "Cosmetic & USP Grade (≥ 99%)",
    origin_country: "سويسرا",
    package_size: "كرتونة 25 كجم / عبوة 1 كجم",
    pricing_unit: "لكل 1 كجم (توريد صناعي)",
    category: "مواد فعالة",
    price: 320,
    oldPrice: 400,
    emoji: "⚗️",
    sku: "ACT-NIAC-12",
    badge: "درجة سويسرية",
    stock: 750,
    is_active: true,
    is_featured: false,
    industrial_applications: ["سيروم تفتيح وتوحيد لون البشرة والمسام", "كريمات تنظيم إفراز الدهون ومكافحة الالتهابات", "مستحضرات تقوية حاجز البشرة الدهني"],
    specs: {
      "الاسم الكيميائي (INCI)": "Niacinamide",
      "رقم CAS الدولي": "98-92-0",
      "النقاوة": "≥ 99.0%",
      "نسبة الاستخدام الموصى بها": "2% إلى 5%",
      "الذوبانية": "يذوب بسهولة في الطور المائي",
      "الرقم الهيدروجيني (pH)": "6.0 - 7.5 (محلول 5%)"
    }
  },
];

export async function getProducts() {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(id, name_ar, slug), images:product_images(*)")
      .eq("is_active", true)
      .order("sort_order")
      .limit(1000);
    if (!error && data && data.length > 0) {
      // Merge with INITIAL_PRODUCTS if not present in DB to guarantee complete catalog
      const existingNames = new Set(data.map((p: any) => (p.name_ar || p.name || "").toLowerCase()));
      const missingInit = INITIAL_PRODUCTS.filter(
        (p) => !existingNames.has(p.name_ar.toLowerCase()) && !existingNames.has(p.name.toLowerCase())
      );
      return [...missingInit.map(mapProductFromDB), ...data.map(mapProductFromDB)];
    }
  }
  // Fallback to client localStorage or SSR INITIAL_PRODUCTS
  if (typeof window !== "undefined") {
    let products = JSON.parse(localStorage.getItem("alphabreeze_products") || "null");
    if (!products || products.length === 0) {
      products = INITIAL_PRODUCTS;
      localStorage.setItem("alphabreeze_products", JSON.stringify(products));
    } else {
      // Merge any missing initial products without duplicating
      const existingIds = new Set(products.map((p: any) => String(p.id)));
      let hasNew = false;
      for (const p of INITIAL_PRODUCTS) {
        if (!existingIds.has(String(p.id))) {
          products.unshift(p);
          existingIds.add(String(p.id));
          hasNew = true;
        }
      }
      if (hasNew) {
        localStorage.setItem("alphabreeze_products", JSON.stringify(products));
      }
    }
    return products.filter((p: any) => p.is_active !== false).map(mapProductFromDB);
  }
  return INITIAL_PRODUCTS.filter((p: any) => p.is_active !== false).map(mapProductFromDB);
}

export async function getAllProducts() {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(id, name_ar, slug), images:product_images(*)")
      .order("created_at", { ascending: false });
    if (!error && data && data.length > 0) return data.map(mapProductFromDB);
  }
  return await getProducts();
}

export async function getProductBySlug(slug: string) {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(id, name_ar, slug), images:product_images(*)")
      .eq("slug", slug)
      .single();
    if (!error && data) return mapProductFromDB(data);
  }
  const all = await getProducts();
  const found = all.find((p: any) => p.slug === slug || String(p.id) === slug);
  if (found) return mapProductFromDB(found);
  return null;
}

export async function getProductById(id: string) {
  const supabase = getSupabase();
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

  if (supabase) {
    try {
      const query = supabase
        .from("products")
        .select("*, category:categories(id, name_ar, slug), images:product_images(*)");
      
      const { data, error } = isUuid 
        ? await query.eq("id", id).maybeSingle()
        : await query.eq("slug", id).maybeSingle();

      if (!error && data) return mapProductFromDB(data);
    } catch (e) {
      console.warn("Could not fetch product directly:", e);
    }
  }
  const all = await getProducts();
  const found = all.find((p: any) => String(p.id) === String(id) || p.slug === id);
  if (found) return mapProductFromDB(found);
  const init = INITIAL_PRODUCTS.find((p: any) => String(p.id) === String(id) || p.slug === id);
  if (init) return mapProductFromDB(init);
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
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn("Supabase categories query failed:", e);
    }
  }
  if (typeof window !== "undefined") {
    const local = JSON.parse(localStorage.getItem("alphabreeze_categories") || "[]");
    if (local && local.length > 0) return local;
  }
  return INITIAL_CATEGORIES;
}

export async function getAllCategories() {
  const categories = await getCategories();
  const allProds = await getProducts();

  return categories.map((cat: any) => {
    const count = allProds.filter((p: any) => p.category_slug === cat.slug || p.category === cat.name_ar).length;
    return {
      ...cat,
      products_count: count,
      products: Array(count).fill({ id: "item" }),
    };
  });
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
