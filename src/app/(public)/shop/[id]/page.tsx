"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowRight, FlaskConical, ShieldCheck, FileText, Tag,
  MessageCircle, ChevronLeft, Loader2, CheckCircle2, Package, Atom, X, Send
} from "lucide-react";
import { toast } from "sonner";
import { getProductById, getProducts } from "@/lib/db";
import ChemicalVisual from "@/components/ui/ChemicalVisual";

const WHATSAPP = "201019946409";

const CATEGORY_IMAGES: Record<string, string> = {
  oils: "https://images.unsplash.com/photo-1608181831688-8e3fc5bab4cf?w=1200&q=85",
  powders: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=85",
  emulsifiers: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=85",
  actives: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=85",
  fragrances: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=1200&q=85",
  colors: "https://images.unsplash.com/photo-1550159930-40066082a4fc?w=1200&q=85",
  preservatives: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&q=85",
  flavors: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=85",
  default: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85",
};

function getImage(product: any) {
  if (product?.og_image_url) return product.og_image_url;
  const slug = product?.category_slug ?? product?.technical_specs?.category_slug ?? "default";
  return CATEGORY_IMAGES[slug] ?? CATEGORY_IMAGES.default;
}

function SpecBadge({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-0.5 p-3 bg-slate-50 rounded-xl border border-slate-100">
      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-sm font-medium text-slate-700 font-mono">{value}</span>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-50 last:border-0">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center">
        <Icon className="h-4 w-4 text-cyan-600" />
      </div>
      <div>
        <p className="text-xs text-slate-400 mb-0.5">{label}</p>
        <p className="text-sm font-medium text-slate-700">{value}</p>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [rfqOpen, setRfqOpen] = useState(false);
  const [rfqSending, setRfqSending] = useState(false);
  const [rfqForm, setRfqForm] = useState({
    full_name: "",
    company_name: "",
    phone: "",
    expected_quantity: "",
    packaging_type: "عبوة معملية / 25 كجم",
    notes: "",
  });

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const p = await getProductById(id);
        setProduct(p);
        if (p) {
          const all = await getProducts();
          const slug = p.category_slug ?? p.technical_specs?.category_slug;
          const rel = all
            .filter((x: any) => x.id !== p.id && (x.category_slug ?? x.technical_specs?.category_slug) === slug)
            .slice(0, 4);
          setRelated(rel);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50" dir="rtl">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
          <span className="text-sm">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50" dir="rtl">
        <div className="text-center">
          <FlaskConical className="h-16 w-16 text-slate-200 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-700 mb-2">المنتج غير موجود</h2>
          <Link href="/shop" className="text-cyan-600 text-sm hover:underline">← العودة للكتالوج</Link>
        </div>
      </div>
    );
  }

  const nameAr = product.name_ar ?? product.name ?? "مادة خام";
  const nameEn = product.name_en ?? product.inci_name ?? "";
  const imgSrc = getImage(product);

  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `مرحباً، أود الاستفسار عن: ${nameAr}\nرقم CAS: ${product.cas_number ?? "—"}\nالكمية المطلوبة: \nاسم الشركة: `
  )}`;

  const handleRfqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfqForm.full_name || !rfqForm.phone) {
      toast.error("يرجى إدخال الاسم ورقم الهاتف");
      return;
    }
    setRfqSending(true);
    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...rfqForm,
          product_name: nameAr,
          cas_number: product.cas_number || "",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "تعذر إرسال الطلب");
      toast.success("تم إرسال طلب عرض السعر / شهادة COA بنجاح!");
      setRfqOpen(false);
      setRfqForm({
        full_name: "",
        company_name: "",
        phone: "",
        expected_quantity: "",
        packaging_type: "عبوة معملية / 25 كجم",
        notes: "",
      });
    } catch (err: any) {
      toast.error(err?.message || "حدث خطأ أثناء إرسال الطلب");
    } finally {
      setRfqSending(false);
    }
  };

  const specs = product.technical_specs ?? {};
  const hasSpecs = product.cas_number || product.inci_name || specs.purity || specs.origin || specs.appearance || specs.ph || specs.solubility;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white" dir="rtl">
      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-cyan-600 transition-colors">الرئيسية</Link>
          <ChevronLeft className="h-3 w-3" />
          <Link href="/shop" className="hover:text-cyan-600 transition-colors">الكتالوج</Link>
          <ChevronLeft className="h-3 w-3" />
          <span className="text-slate-600 font-medium line-clamp-1">{nameAr}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* ── LEFT: Image / 3D Icon ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-square bg-slate-900 shadow-2xl border border-slate-200">
              <ChemicalVisual product={product} />
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: Package, label: "توريد مباشر", sub: "من المصنع" },
                { icon: FileText, label: "COA متاح", sub: "عند الطلب" },
                { icon: CheckCircle2, label: "معتمد", sub: "مختبريًا" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center gap-1 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
                  <Icon className="h-5 w-5 text-cyan-500" />
                  <span className="text-xs font-semibold text-slate-700">{label}</span>
                  <span className="text-[10px] text-slate-400">{sub}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Details ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            {/* Category tag */}
            {product.category && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 bg-cyan-50 border border-cyan-200 rounded-full px-3 py-1">
                <FlaskConical className="h-3 w-3" />
                {product.category}
              </span>
            )}

            {/* Name */}
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight mb-1">{nameAr}</h1>
              {nameEn && <p className="text-base text-slate-400 font-mono">{nameEn}</p>}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-slate-600 leading-relaxed text-sm border-r-4 border-cyan-400 pr-4 py-1">
                {product.description}
              </p>
            )}

            {/* Specs grid */}
            {hasSpecs && (
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">المواصفات الفنية</h3>
                <div className="grid grid-cols-2 gap-2">
                  <SpecBadge label="رقم CAS" value={product.cas_number} />
                  <SpecBadge label="INCI Name" value={product.inci_name} />
                  <SpecBadge label="النقاء" value={specs.purity} />
                  <SpecBadge label="المنشأ" value={specs.origin} />
                  <SpecBadge label="المظهر" value={specs.appearance} />
                  <SpecBadge label="الرقم الهيدروجيني" value={specs.ph} />
                  <SpecBadge label="الذوبانية" value={specs.solubility} />
                  <SpecBadge label="شكل المنتج" value={product.product_form} />
                </div>
              </div>
            )}

            {/* Info rows */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <InfoRow icon={Package} label="التغليف المتاح" value={product.packaging_options ?? specs.packaging} />
              <InfoRow icon={Atom} label="الاستخدامات" value={product.applications ?? specs.applications} />
              <InfoRow icon={CheckCircle2} label="المعايير" value={specs.standards} />
            </div>

            {/* CTA */}
            <div className="space-y-3 pt-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-emerald-500/20 text-base"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                طلب تسعير عبر واتساب
              </a>

              <button
                type="button"
                onClick={() => setRfqOpen(true)}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-navy-950 hover:bg-navy-900 text-white font-bold rounded-2xl transition-colors text-sm shadow-md"
              >
                <FileText className="h-4 w-4 text-sky-400" />
                طلب عرض سعر رسمي وشهادة COA / MSDS
              </button>

              <Link
                href="/shop"
                className="flex items-center justify-center gap-2 w-full py-3 border border-slate-200 text-slate-600 font-medium rounded-2xl hover:border-cyan-400 hover:text-cyan-600 transition-colors text-sm"
              >
                <ArrowRight className="h-4 w-4" />
                العودة إلى الكتالوج
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── Direct RFQ & COA Modal ── */}
        {rfqOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setRfqOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 border border-slate-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">طلب عرض سعر وشهادة COA</h3>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{nameAr}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setRfqOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <form onSubmit={handleRfqSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="الاسم الكامل *"
                  value={rfqForm.full_name}
                  onChange={(e) => setRfqForm({ ...rfqForm, full_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="tel"
                  required
                  placeholder="رقم الهاتف / واتساب *"
                  value={rfqForm.phone}
                  onChange={(e) => setRfqForm({ ...rfqForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="text"
                  placeholder="اسم المصنع أو المعمل (اختياري)"
                  value={rfqForm.company_name}
                  onChange={(e) => setRfqForm({ ...rfqForm, company_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="text"
                  placeholder="الكمية المطلوبة (مثال: 25 كجم / 200 كجم)"
                  value={rfqForm.expected_quantity}
                  onChange={(e) => setRfqForm({ ...rfqForm, expected_quantity: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-cyan-500"
                />
                <textarea
                  rows={2}
                  placeholder="ملاحظات أو طلب شهادة COA / MSDS..."
                  value={rfqForm.notes}
                  onChange={(e) => setRfqForm({ ...rfqForm, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  disabled={rfqSending}
                  className="w-full py-3 rounded-xl bg-gradient-to-l from-cyan-500 to-sky-600 text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {rfqSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span>{rfqSending ? "جاري الإرسال..." : "إرسال الطلب"}</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">منتجات من نفس الفئة</h2>
              <Link href="/shop" className="text-cyan-600 text-sm hover:underline flex items-center gap-1">
                عرض الكل <ChevronLeft className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => {
                const pSlug = p.category_slug ?? p.technical_specs?.category_slug ?? "default";
                const pImg = p.og_image_url || CATEGORY_IMAGES[pSlug] || CATEGORY_IMAGES.default;
                const pName = p.name_ar ?? p.name ?? "مادة خام";
                return (
                  <Link
                    key={p.id}
                    href={`/shop/${p.id}`}
                    className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="h-32 overflow-hidden bg-slate-900">
                      <ChemicalVisual product={p} showBadge={false} />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-slate-700 group-hover:text-cyan-600 transition-colors line-clamp-2 leading-snug">{pName}</p>
                      {p.cas_number && <p className="text-[10px] text-slate-400 mt-1 font-mono">CAS: {p.cas_number}</p>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
