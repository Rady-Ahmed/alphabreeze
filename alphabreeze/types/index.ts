export interface Product {
  id: string;
  name: string;
  name_en?: string;
  slug: string;
  description?: string;
  category_id?: string;
  category?: string;
  price: number;
  old_price?: number;
  image_url?: string;
  images?: string[];
  sku?: string;
  package_size?: string;
  stock_quantity: number;
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
  is_promotion: boolean;
  created_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  governorate: string;
  city: string;
  address: string;
  notes?: string;
  payment_method: string;
  subtotal: number;
  shipping_cost: number;
  total: number;
  status: string;
  items: OrderItem[];
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category?: string;
  image_url?: string;
  views: number;
  is_published: boolean;
  is_featured: boolean;
  author?: string;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  sort_order: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email?: string;
  phone: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ManufacturingRequest {
  id: string;
  name: string;
  company_name?: string;
  phone: string;
  product_type: string;
  expected_quantity: string;
  details?: string;
  status: string;
  created_at: string;
}

export interface SiteSettings {
  name_ar: string;
  name_en: string;
  phone_1: string;
  phone_2?: string;
  whatsapp: string;
  email: string;
  address_ar: string;
  google_maps_url?: string;
  shipping_cost: number;
  min_order: number;
  free_shipping_above: number;
}
