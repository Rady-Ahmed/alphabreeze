import { z } from "zod";

// Contact Form
export const contactFormSchema = z.object({
  full_name: z.string().min(2, "الاسم مطلوب"),
  email: z.string().email("بريد إلكتروني غير صحيح").optional().or(z.literal("")),
  phone: z.string().min(10, "رقم هاتف غير صحيح"),
  subject: z.string().optional(),
  message: z.string().min(10, "الرسالة قصيرة جداً"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// Manufacturing Request Form
export const manufacturingFormSchema = z.object({
  full_name: z.string().min(2, "الاسم مطلوب"),
  company_name: z.string().optional(),
  phone: z.string().min(10, "رقم هاتف غير صحيح"),
  product_type: z.string().optional(),
  expected_quantity: z.string().optional(),
  project_details: z.string().optional(),
});

export type ManufacturingFormValues = z.infer<typeof manufacturingFormSchema>;

// Checkout Form
export const checkoutFormSchema = z.object({
  full_name: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(10, "رقم هاتف غير صحيح"),
  governorate: z.string().min(1, "اختر المحافظة"),
  city: z.string().min(2, "المدينة مطلوبة"),
  address: z.string().min(10, "العنوان مطلوب"),
  notes: z.string().optional(),
  payment_method: z.enum(["cod", "bank_transfer", "vodafone_cash", "instapay"]),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

// Product Form (Admin)
export const productFormSchema = z.object({
  name_ar: z.string().min(2, "اسم المنتج مطلوب"),
  name_en: z.string().optional(),
  slug: z.string().min(2, "الرابط مطلوب"),
  description_ar: z.string().optional(),
  category_id: z.string().optional(),
  price: z.number().min(0, "السعر مطلوب"),
  old_price: z.number().optional(),
  package_size: z.string().optional(),
  sku: z.string().optional(),
  stock_quantity: z.number().min(0).default(0),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),
  is_new: z.boolean().default(false),
  is_promotion: z.boolean().default(false),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

// Article Form (Admin)
export const articleFormSchema = z.object({
  title_ar: z.string().min(5, "العنوان مطلوب"),
  slug: z.string().min(2, "الرابط مطلوب"),
  excerpt_ar: z.string().optional(),
  content_ar: z.string().min(50, "المحتوى قصير جداً"),
  category_id: z.string().optional(),
  is_published: z.boolean().default(false),
  is_featured: z.boolean().default(false),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
});

export type ArticleFormValues = z.infer<typeof articleFormSchema>;

// Login Form
export const loginFormSchema = z.object({
  email: z.string().email("بريد إلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور قصيرة جداً"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
