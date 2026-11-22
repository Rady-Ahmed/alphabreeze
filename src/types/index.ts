export interface Product {
  id: string;
  name_ar: string;
  name_en?: string;
  scientific_name?: string;
  inci_name?: string;
  cas_number?: string;
  purity_grade?: string;
  origin_country?: string;
  manufacturer?: string;
  package_size?: string;
  net_weight?: string;
  gross_weight?: string;
  pricing_unit?: string;
  industrial_applications?: string[];
  cosmetic_applications?: string[];
  coa_available?: boolean;
  msds_available?: boolean;
  availability_status?: "in_stock" | "on_order" | "request_quote";
  slug: string;
  description_ar?: string;
  description_en?: string;
  usage_instructions_ar?: string;
  technical_specs?: Record<string, string>;
  category_id?: string;
  category?: Category;
  price: number;
  old_price?: number;
  discount_percentage?: number;
  sku?: string;
  stock_quantity: number;
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
  is_promotion: boolean;
  is_best_seller: boolean;
  sort_order: number;
  seo_title?: string;
  seo_description?: string;
  og_image_url?: string;
  images?: ProductImage[];
  created_at: string;
  updated_at: string;
}

export interface QuoteRequest {
  id?: string;
  product_id?: string;
  product_name: string;
  cas_number?: string;
  company_name: string;
  contact_person: string;
  phone: string;
  email?: string;
  facility_type: "factory" | "lab" | "brand_owner" | "formulator" | "distributor" | "other";
  quantity: string;
  target_application?: string;
  notes?: string;
  created_at?: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text?: string;
  sort_order: number;
  is_primary: boolean;
}

export interface Category {
  id: string;
  name_ar: string;
  name_en?: string;
  slug: string;
  description_ar?: string;
  image_url?: string;
  parent_id?: string;
  sort_order: number;
  is_active: boolean;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id?: string;
  full_name: string;
  phone: string;
  governorate: string;
  city: string;
  address: string;
  notes?: string;
  subtotal: number;
  shipping_cost: number;
  total: number;
  payment_method: string;
  status: OrderStatus;
  items?: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  product_name: string;
  product_image?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export type OrderStatus = "new" | "under_review" | "confirmed" | "shipping" | "delivered" | "cancelled";

export interface Customer {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  governorate?: string;
  city?: string;
  address?: string;
  total_orders: number;
  total_spent: number;
  created_at: string;
}

export interface Service {
  id: string;
  title_ar: string;
  title_en?: string;
  slug: string;
  short_description_ar?: string;
  description_ar?: string;
  icon?: string;
  image_url?: string;
  banner_url?: string;
  benefits?: string[];
  process_steps?: { title: string; description: string }[];
  sort_order: number;
  is_active: boolean;
}

export interface ManufacturingRequest {
  id: string;
  full_name: string;
  company_name?: string;
  phone: string;
  product_type?: string;
  expected_quantity?: string;
  project_details?: string;
  status: string;
  admin_notes?: string;
  created_at: string;
}

export interface Article {
  id: string;
  title_ar: string;
  slug: string;
  excerpt_ar?: string;
  content_ar?: string;
  featured_image?: string;
  category_id?: string;
  category?: ArticleCategory;
  is_published: boolean;
  is_featured: boolean;
  views_count: number;
  published_at?: string;
  created_at: string;
}

export interface ArticleCategory {
  id: string;
  name_ar: string;
  slug: string;
  sort_order: number;
  is_active: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  role?: string;
  content_ar: string;
  avatar_url?: string;
  rating: number;
  is_active: boolean;
  sort_order: number;
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
  type: "partner" | "client";
  sort_order: number;
  is_active: boolean;
}

export interface FAQ {
  id: string;
  question_ar: string;
  answer_ar: string;
  sort_order: number;
  is_active: boolean;
}

export interface ContactMessage {
  id: string;
  full_name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Banner {
  id: string;
  title_ar?: string;
  subtitle_ar?: string;
  image_url: string;
  mobile_image_url?: string;
  link_url?: string;
  cta_text_ar?: string;
  type: "hero" | "promotion" | "popup";
  sort_order: number;
  is_active: boolean;
}

export interface MediaItem {
  id: string;
  file_name: string;
  file_url: string;
  file_type?: string;
  file_size?: number;
  alt_text?: string;
  folder: string;
  created_at: string;
}

export interface WebsiteSetting {
  id: string;
  key: string;
  value?: string;
  type: string;
  group_name: string;
}

export interface Statistic {
  id: string;
  label_ar: string;
  label_en?: string;
  value: number;
  icon?: string;
  suffix: string;
  sort_order: number;
  is_active: boolean;
}

export interface SocialMedia {
  id: string;
  platform: string;
  url: string;
  is_active: boolean;
  sort_order: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
