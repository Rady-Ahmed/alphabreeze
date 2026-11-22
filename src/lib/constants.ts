export const B2B_CATEGORIES = [
  { slug: "all", name_ar: "الكل", name_en: "All Categories", icon: "Package" },
  { slug: "oils-and-extracts", name_ar: "الزيوت والمستخلصات النباتية", name_en: "Oils & Botanical Extracts", icon: "Droplets" },
  { slug: "raw-powders-and-actives", name_ar: "البودرات والمواد الفعالة", name_en: "Raw Powders & Active Ingredients", icon: "Sparkles" },
  { slug: "chemical-liquids-and-solvents", name_ar: "السوائل الكيميائية والمذيبات والسيليكون", name_en: "Chemical Liquids, Solvents & Silicones", icon: "FlaskConical" },
  { slug: "vitamins-and-nutrients", name_ar: "الفيتامينات والأحماض الأمينية والمغذيات", name_en: "Vitamins, Amino Acids & Nutrients", icon: "Atom" },
  { slug: "waxes-and-polymers", name_ar: "الشموع والبوليمرات", name_en: "Waxes & Polymers", icon: "Flame" },
  { slug: "colors-and-pigments", name_ar: "الألوان والأصباغ والمايكا", name_en: "Colors, Pigments & Micas", icon: "Palette" },
  { slug: "fragrances-and-scents", name_ar: "العطور والزيوت العطرية المركزة", name_en: "Fragrances & Essential Scents", icon: "Heart" },
  { slug: "flavors", name_ar: "النكهات الغذائية والصناعية", name_en: "Flavors", icon: "Apple" },
];

export const GOVERNORATES = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", "المنيا", "أسيوط",
  "الغربية", "المنوفية", "البحيرة", "كفر الشيخ", "بني سويف", "الفيوم", "قنا",
  "سوهاج", "الأقصر", "أسوان", "البحر الأحمر", "الوادي الجديد", "مطروح",
  "شمال سيناء", "جنوب سيناء", "بورسعيد", "السويس", "الإسماعيلية", "دمياط",
];

export const ORDER_STATUSES = {
  new: { label: "جديد", color: "bg-sky-100 text-sky-700" },
  under_review: { label: "قيد المراجعة", color: "bg-amber-100 text-amber-700" },
  confirmed: { label: "مؤكد", color: "bg-blue-100 text-blue-700" },
  shipping: { label: "جاري الشحن", color: "bg-purple-100 text-purple-700" },
  delivered: { label: "تم التسليم", color: "bg-emerald-100 text-emerald-700" },
  cancelled: { label: "ملغي", color: "bg-red-100 text-red-700" },
};

export const PAYMENT_METHODS = {
  cod: { label: "الدفع عند الاستلام", icon: "banknote" },
  bank_transfer: { label: "تحويل بنكي", icon: "credit-card" },
  vodafone_cash: { label: "فودافون كاش", icon: "smartphone" },
  instapay: { label: "إنستاباي", icon: "smartphone" },
};

export const SITE_CONFIG = {
  name_ar: "ألفا بريز",
  name_en: "AlphaBreeze",
  phone_1: "01119446474",
  phone_2: "01016067979",
  whatsapp: "01119446474",
  email: "info@alphabreeze.com",
  address_ar: "طريق جسر السويس الرئيسي، أمام محطة مترو نادي الشمس، القاهرة، مصر",
};

export function generateOrderNumber(): string {
  const prefix = "AB";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}${random}`;
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString("ar-EG")} ج.م`;
}

export function calculateShipping(governorate?: string, subtotal: number = 0): number {
  if (subtotal >= 1000) return 0; // شحن مجاني للطلبات 1000 ج.م فما فوق
  if (!governorate) return 50;

  // القاهرة والجيزة
  if (["القاهرة", "الجيزة"].includes(governorate)) {
    return 45;
  }
  // الإسكندرية ومحافظات الدلتا والقناة
  if ([
    "الإسكندرية", "الدقهلية", "الشرقية", "الغربية", "المنوفية",
    "البحيرة", "كفر الشيخ", "دمياط", "بورسعيد", "السويس", "الإسماعيلية"
  ].includes(governorate)) {
    return 55;
  }
  // الصعيد
  if ([
    "الفيوم", "بني سويف", "المنيا", "أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان"
  ].includes(governorate)) {
    return 70;
  }
  // المحافظات الحدودية والنائية
  if ([
    "البحر الأحمر", "الوادي الجديد", "مطروح", "شمال سيناء", "جنوب سيناء"
  ].includes(governorate)) {
    return 85;
  }

  return 50;
}

export function calculateDiscount(price: number, oldPrice: number): number {
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
