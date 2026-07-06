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
