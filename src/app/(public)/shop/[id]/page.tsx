"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  ShieldCheck,
  Package,
  Building2,
  Phone,
  MessageCircle,
  FlaskConical,
  Atom,
  CheckCircle2,
  Clock,
  ArrowRight,
  Globe2,
  Minus,
  Plus,
  ShoppingBag,
  Send,
  X,
  Loader2,
  FileSpreadsheet,
} from "lucide-react";
import { toast } from "sonner";
import { SITE_CONFIG } from "@/lib/constants";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // RFQ Modal State
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [rfqSubmitting, setRfqSubmitting] = useState(false);
  const [rfqForm, setRfqForm] = useState({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    quantity: "25 كجم",
    packagingType: "",
    notes: "",
  });

  useEffect(() => {
    async function loadProduct() {
      try {
        const { getProductById, getProducts } = await import("@/lib/db");
        const data = await getProductById(resolvedParams.id);
        if (data) {
          const mapped = {
            ...data,
            id: String(data.id),
            name: data.name_ar || data.name,
            name_en: data.name_en || "",
            scientific_name: data.scientific_name || data.name_en || "",
            inci_name: data.inci_name || "",
            cas_number: data.cas_number || "",
            purity_grade: data.purity_grade || "درجة تجميلية (Cosmetic Grade)",
            origin_country: data.origin_country || "",
            package_size: data.package_size || "عبوة 1 كجم / براميل صناعية",
            pricing_unit: data.pricing_unit || "لكل 1 كجم",
            industrial_applications: data.industrial_applications || [],
            category: typeof data.category === "object" && data.category ? data.category.name_ar : data.category,
            price: data.price,
            oldPrice: data.old_price || data.oldPrice || null,
            description: data.description_ar || data.description,
            specs: typeof data.specs === "object" && data.specs ? data.specs : (data.technical_specs || {}),
            images: data.images?.length > 0 ? data.images.map((img: any) => img.image_url) : [data.og_image_url || data.image || (data.sku ? data.sku.split("-")[0] : "🧪")],
            emoji: data.sku ? data.sku.split("-")[0] : data.emoji || "🧪",
            sku: data.sku || "AB-CHEM",
            inStock: (data.stock_quantity ?? data.stock ?? 1) > 0,
          };
          setProduct(mapped);

          // load related products
          const allProducts = await getProducts();
          if (allProducts) {
            const mappedRelated = allProducts
              .filter((p: any) => p.id !== data.id)
              .slice(0, 4)
              .map((p: any) => ({
                id: String(p.id),
                name: p.name_ar || p.name,
                inci_name: p.inci_name || "",
                cas_number: p.cas_number || "",
                price: p.price,
                pricing_unit: p.pricing_unit || "لكل 1 كجم",
                emoji: p.sku ? p.sku.split("-")[0] : p.emoji || "🧪",
                image: p.og_image_url || p.image || null,
              }));
            setRelatedProducts(mappedRelated);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    if (resolvedParams.id) {
      loadProduct();
    }
  }, [resolvedParams.id]);

  const handleAddToCart = (redirect: boolean = false) => {
    if (!product) return;
    try {
      const cart = JSON.parse(localStorage.getItem("alphabreeze_cart") || "[]");
      const existingItem = cart.find((item: any) => item.id === product.id);

      if (existingItem) {
        existingItem.qty += quantity;
      } else {
        cart.push({ ...product, qty: quantity, image: product.images[0] });
      }

      localStorage.setItem("alphabreeze_cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cart_updated"));

      if (redirect) {
        router.push("/checkout");
      } else {
        toast.success(`تمت إضافة ${quantity} عبوة من ${product.name} لسلة طلباتك`);
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء إضافة المادة الخام للطلب");
    }
  };

  const handleRfqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfqForm.fullName || !rfqForm.phone) {
      toast.error("يرجى إدخال اسمك ورقم الهاتف للتواصل");
      return;
    }
    setRfqSubmitting(true);
    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: rfqForm.fullName,
          company_name: rfqForm.companyName,
          phone: rfqForm.phone,
          email: rfqForm.email,
          product_name: product.name,
          cas_number: product.cas_number,
          expected_quantity: rfqForm.quantity,
          packaging_type: rfqForm.packagingType,
          notes: rfqForm.notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل إرسال طلب عرض السعر");

      toast.success("تم إرسال طلب عرض السعر بنجاح، سيتواصل معك قسم المبيعات الصناعية في أقرب وقت");
      setIsRfqOpen(false);
      setRfqForm({
        fullName: "",
        companyName: "",
        phone: "",
        email: "",
        quantity: "25 كجم",
        packagingType: "",
        notes: "",
      });
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء إرسال الطلب، يمكنك التواصل مباشرة عبر واتساب");
    } finally {
      setRfqSubmitting(false);
    }
  };

  const getWhatsAppInquiryUrl = () => {
    const phone = SITE_CONFIG.whatsapp || "01119446474";
    const cleanPhone = phone.startsWith("0") ? `20${phone.slice(1)}` : phone;
    const message = `السلام عليكم ورحمة الله،
أود الاستفسار عن توريد المادة الخام التالية من شركة Alpha Breeze:
- اسم المادة: ${product?.name}
- الاسم العلمي (INCI): ${product?.inci_name || product?.name_en || "غير محدد"}
- رقم CAS: ${product?.cas_number || "غير محدد"}
- رابط المنتج: ${typeof window !== "undefined" ? window.location.href : ""}

يرجى تزويدي بالأسعار للكميات المتاحة والتوافر وشهادة التحليل (COA). شكرًا لكم.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-48 bg-slate-50 min-h-screen">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 text-sm font-medium">جاري تحميل المواصفات الفنية للمادة الخام...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-40 bg-slate-50 min-h-screen">
        <h2 className="text-2xl font-bold text-navy-900 mb-2">المادة الخام غير موجودة</h2>
        <p className="text-gray-500 mb-6">يرجى التحقق من الرابط أو تصفح كتالوج المواد الكيميائية.</p>
        <Link href="/shop">
          <Button>العودة لكتالوج المواد الخام</Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="pt-28 pb-20 bg-slate-50/70 min-h-screen font-arabic">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb & B2B Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-sky-600">الرئيسية</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-sky-600">كتالوج المواد الخام</Link>
            <span>/</span>
            <span className="text-navy-900 font-semibold truncate max-w-xs">{product.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100/80 text-sky-800 border border-sky-200">
              <FlaskConical className="w-3.5 h-3.5 text-sky-600" />
              توريد مواد خام كيميائية B2B
            </span>
            {product.cas_number && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-200 text-slate-800">
                CAS: {product.cas_number}
              </span>
            )}
          </div>
        </div>

        {/* Main Product Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden mb-12">
          <div className="grid lg:grid-cols-12 gap-8 p-6 lg:p-10">
            {/* Visuals & Packaging (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-slate-50 via-sky-50/40 to-slate-100 flex items-center justify-center border border-slate-200/60 overflow-hidden relative group">
                {product.images[selectedImage]?.startsWith("http") || product.images[selectedImage]?.startsWith("/") || product.images[selectedImage]?.startsWith("data:image") ? (
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                ) : (
                  <div className="text-center p-6">
                    <span className="text-8xl drop-shadow-sm mb-2 block">{product.images[selectedImage]}</span>
                    <span className="text-xs font-mono text-slate-400 bg-white/80 px-2 py-1 rounded-md border border-slate-200">عبوة صناعية معتمدة</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 flex flex-col gap-1.5">
                  <Badge className="bg-navy-900/90 text-white font-medium border-0">{product.category}</Badge>
                  {product.origin_country && (
                    <Badge variant="outline" className="bg-white/95 text-slate-700 border-slate-200 backdrop-blur-sm">
                      منشأ: {product.origin_country}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((img: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 shrink-0 rounded-xl bg-slate-50 flex items-center justify-center border-2 transition-all overflow-hidden ${
                        selectedImage === i ? "border-sky-500 ring-2 ring-sky-200" : "border-slate-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      {img?.startsWith("http") || img?.startsWith("/") || img?.startsWith("data:image") ? (
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl">{img}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-right">
                  <div className="flex items-center gap-2 text-sky-700 font-bold text-xs mb-1">
                    <FileText className="w-4 h-4 text-sky-600" />
                    شهادة التحليل (COA)
                  </div>
                  <p className="text-[11px] text-slate-500">متوفرة مع كل تشغيلة توريد للمصانع</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-right">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    درجة النقاوة المعتمدة
                  </div>
                  <p className="text-[11px] text-slate-500">{product.purity_grade}</p>
                </div>
              </div>
            </div>

            {/* Technical Information & Procurement (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                {/* Titles */}
                <div className="space-y-1.5 border-b border-slate-100 pb-4 mb-4">
                  <h1 className="text-2xl lg:text-3xl font-extrabold text-navy-900 tracking-tight leading-snug">
                    {product.name}
                  </h1>
                  {(product.inci_name || product.name_en) && (
                    <p className="text-sm font-mono text-sky-700 font-semibold" dir="ltr">
                      INCI: {product.inci_name || product.name_en}
                    </p>
                  )}
                  {product.scientific_name && product.scientific_name !== product.inci_name && (
                    <p className="text-xs text-slate-500 font-mono" dir="ltr">
                      Chemical Name: {product.scientific_name}
                    </p>
                  )}
                </div>

                {/* Key Technical Identifiers Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/70 mb-5 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">رقم CAS:</span>
                    <span className="font-mono font-bold text-slate-800">{product.cas_number || "غير متاح"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">درجة النقاء:</span>
                    <span className="font-semibold text-slate-800 truncate block">{product.purity_grade}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">وحدة التعبئة:</span>
                    <span className="font-semibold text-slate-800 truncate block">{product.package_size}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">بلد المنشأ:</span>
                    <span className="font-semibold text-slate-800 truncate block">{product.origin_country || "مستورد معتمد"}</span>
                  </div>
                </div>

                {/* Pricing & Unit */}
                <div className="flex flex-wrap items-baseline gap-3 mb-4">
                  {product.price && product.price > 0 ? (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-black text-sky-600 tracking-tight">{product.price} جنيه</span>
                      {product.pricing_unit ? (
                        <span className="text-sm text-slate-500 font-medium">/{product.pricing_unit}</span>
                      ) : null}
                    </div>
                  ) : (
                    <span className="text-xl font-bold text-amber-700 bg-amber-50 px-3.5 py-1.5 rounded-xl border border-amber-200">
                      السعر عند الاستفسار (طلب عرض سعر)
                    </span>
                  )}
                  {product.oldPrice && (
                    <span className="text-sm text-slate-400 line-through">{product.oldPrice} جنيه</span>
                  )}
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    أسعار خاصة للطلبيات الصناعية والكميات الكبيرة
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Industrial Applications Tags */}
                {product.industrial_applications && product.industrial_applications.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">التطبيقات في صناعة مستحضرات التجميل:</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.industrial_applications.map((app: string, idx: number) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-sky-50 text-sky-800 border border-sky-100"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* B2B Call-to-Actions (RFQ & Direct Inquiry) */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="grid sm:grid-cols-2 gap-3">
                  {/* RFQ Button */}
                  <Button
                    size="lg"
                    onClick={() => setIsRfqOpen(true)}
                    className="h-13 bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm shadow-md shadow-navy-900/10 flex items-center justify-center gap-2"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-sky-400" />
                    طلب عرض سعر توريد (RFQ)
                  </Button>

                  {/* WhatsApp Direct Chemist/Sales Line */}
                  <a
                    href={getWhatsAppInquiryUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-13 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/15 transition-all text-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    استفسار فني مباشر عبر واتساب
                  </a>
                </div>

                {/* Small Batch / Laboratory Sampling Cart Option */}
                {product.price && product.price > 0 ? (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <span className="text-xs font-semibold text-slate-600">طلب عينة / كمية تجريبية:</span>
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-9 bg-white">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-8 h-full flex items-center justify-center text-slate-500 hover:bg-slate-100"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 h-full flex items-center justify-center text-xs font-bold text-slate-800 border-x border-slate-100">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-8 h-full flex items-center justify-center text-slate-500 hover:bg-slate-100"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddToCart(false)}
                        className="h-9 px-3 text-xs border-slate-300 text-slate-700 hover:bg-slate-100 w-full sm:w-auto"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 ml-1.5 text-sky-600" />
                        أضف للطلبات التجريبية
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(true)}
                        className="h-9 px-3 text-xs bg-sky-600 hover:bg-sky-700 text-white w-full sm:w-auto"
                      >
                        متابعة الشراء
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="text-xs text-amber-900 leading-relaxed font-medium">
                      💡 هذه المادة الخام تتطلب تسعيرًا مباشرًا حسب الكمية ونوع التعبئة الصناعية المطلوبة لمصنعكم.
                    </p>
                    <Button
                      size="sm"
                      onClick={() => setIsRfqOpen(true)}
                      className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shrink-0 h-9"
                    >
                      طلب تسعير فوري
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Data Sheet (TDS) Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 lg:p-8 mb-12">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 font-bold">
                <Atom className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy-900">المواصفات الفنية وبطاقة البيانات (Technical Data)</h2>
                <p className="text-xs text-slate-400">معلومات التحليل والخصائص الفيزيوكيميائية للمادة الخام</p>
              </div>
            </div>
            <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 hidden sm:inline-block">
              TDS Reference: {product.sku}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div className="flex justify-between py-2.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">الاسم التجاري:</span>
              <span className="font-semibold text-navy-900">{product.name}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">الاسم الكيميائي (INCI):</span>
              <span className="font-mono font-semibold text-navy-900" dir="ltr">{product.inci_name || product.name_en || "—"}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">رقم التسجيل الدولي (CAS No.):</span>
              <span className="font-mono font-bold text-sky-700">{product.cas_number || "—"}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">درجة النقاوة والجودة:</span>
              <span className="font-semibold text-navy-900">{product.purity_grade}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">بلد المنشأ / التوريد:</span>
              <span className="font-semibold text-navy-900">{product.origin_country || "—"}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">التعبئة والتغليف المعتمد:</span>
              <span className="font-semibold text-navy-900">{product.package_size}</span>
            </div>

            {/* Custom Specs from Database */}
            {product.specs &&
              Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between py-2.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">{key}:</span>
                  <span className="font-semibold text-navy-900 text-left" dir="auto">{String(val)}</span>
                </div>
              ))}
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-sky-50/60 border border-sky-100 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div className="text-xs text-sky-900 leading-relaxed">
              <span className="font-bold block mb-0.5">ضمان الجودة والمطابقة:</span>
              جميع المواد الخام الموردة من شركة Alpha Breeze تخضع للفحص والتحليل، ومرفقة بشهادة تحليل معتمدة (Certificate of Analysis - COA) وصحيفة بيانات سلامة المادة (MSDS) لكل تشغيلة إنتاجية، لتلبية اشتراطات هيئة الدواء المصرية ومواصفات الجودة العالمية.
            </div>
          </div>
        </div>

        {/* Related Raw Materials */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-navy-900">مواد خام ومكونات كيميائية مكملة</h2>
                <p className="text-xs text-slate-400">تستخدم بشكل شائع مع هذه المادة في التركيبات الكيميائية</p>
              </div>
              <Link href="/shop" className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1">
                تصفح الكتالوج الكامل
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/shop/${p.id}`} className="block h-full group">
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-4 h-full flex flex-col hover:shadow-lg hover:border-sky-300 transition-all">
                    <div className="aspect-square bg-slate-50 rounded-xl flex items-center justify-center mb-3 overflow-hidden relative">
                      {p.image && p.image.startsWith("http") ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      ) : (
                        <span className="text-5xl group-hover:scale-110 transition-transform">{p.emoji}</span>
                      )}
                      {p.cas_number && (
                        <span className="absolute bottom-2 right-2 text-[10px] font-mono font-bold bg-white/90 px-1.5 py-0.5 rounded text-slate-700 border border-slate-200">
                          CAS: {p.cas_number}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-navy-900 text-sm mb-1 line-clamp-1 group-hover:text-sky-600 transition-colors">
                      {p.name}
                    </h3>
                    {p.inci_name && (
                      <p className="text-[11px] font-mono text-slate-400 line-clamp-1 mb-2" dir="ltr">
                        {p.inci_name}
                      </p>
                    )}
                    <div className="mt-auto pt-2 border-t border-slate-100 flex items-baseline justify-between">
                      <span className="font-bold text-sky-600 text-sm">{p.price} ج.م</span>
                      <span className="text-[10px] text-slate-400">/{p.pricing_unit || "كجم"}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RFQ (Request For Quotation) Modal */}
      <AnimatePresence>
        {isRfqOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden relative"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-l from-navy-900 to-navy-800 p-6 text-white relative">
                <button
                  type="button"
                  onClick={() => setIsRfqOpen(false)}
                  className="absolute top-5 left-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase mb-1">
                  <FileSpreadsheet className="w-4 h-4" />
                  طلب تسعير كميات وتوريد B2B
                </div>
                <h3 className="text-xl font-bold">{product.name}</h3>
                {product.cas_number && (
                  <p className="text-xs font-mono text-slate-300 mt-1">CAS Number: {product.cas_number}</p>
                )}
              </div>

              {/* Modal Form */}
              <form onSubmit={handleRfqSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div>
                  <Label className="text-xs font-bold text-slate-700">الاسم والصفة *</Label>
                  <Input
                    required
                    placeholder="مثال: د. أحمد كمال - مسؤول المشتريات / كيميائي"
                    value={rfqForm.fullName}
                    onChange={(e) => setRfqForm({ ...rfqForm, fullName: e.target.value })}
                    className="mt-1 h-11 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-bold text-slate-700">اسم المصنع / الشركة / المعمل</Label>
                    <Input
                      placeholder="اسم المنشأة الصناعية"
                      value={rfqForm.companyName}
                      onChange={(e) => setRfqForm({ ...rfqForm, companyName: e.target.value })}
                      className="mt-1 h-11 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-slate-700">رقم الهاتف / واتساب *</Label>
                    <Input
                      required
                      placeholder="01xxxxxxxxx"
                      dir="ltr"
                      value={rfqForm.phone}
                      onChange={(e) => setRfqForm({ ...rfqForm, phone: e.target.value })}
                      className="mt-1 h-11 text-sm text-right"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-bold text-slate-700">الكمية التقديرية المطلوبة *</Label>
                    <Input
                      required
                      placeholder="مثال: 50 كجم، 2 برميل (200 كجم)"
                      value={rfqForm.quantity}
                      onChange={(e) => setRfqForm({ ...rfqForm, quantity: e.target.value })}
                      className="mt-1 h-11 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-slate-700">البريد الإلكتروني (اختياري)</Label>
                    <Input
                      type="email"
                      placeholder="procurement@company.com"
                      dir="ltr"
                      value={rfqForm.email}
                      onChange={(e) => setRfqForm({ ...rfqForm, email: e.target.value })}
                      className="mt-1 h-11 text-sm text-right"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-bold text-slate-700">ملاحظات إضافية أو متطلبات خاصة بالتشغيلة</Label>
                  <Textarea
                    rows={3}
                    placeholder="مثل: طلب شهادة تحليل مسبقة COA، موعد التسليم المستهدف، نوع التغليف المفضل..."
                    value={rfqForm.notes}
                    onChange={(e) => setRfqForm({ ...rfqForm, notes: e.target.value })}
                    className="mt-1 text-sm"
                  />
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  🔒 بياناتكم تعامل بسرية تامة. سيقوم مهندس المبيعات والتركيبات بالتواصل معكم فور مراجعة متطلبات التوريد.
                </p>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsRfqOpen(false)}
                    className="h-11"
                  >
                    إلغاء
                  </Button>
                  <Button
                    type="submit"
                    disabled={rfqSubmitting}
                    className="h-11 bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 flex items-center gap-2"
                  >
                    {rfqSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        إرسال طلب التسعير
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
