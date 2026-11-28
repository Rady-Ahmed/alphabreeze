"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Send, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, use } from "react";
import { toast } from "sonner";

const serviceData: Record<string, { title: string; description: string; image?: string; benefits: string[]; steps: { title: string; desc: string }[] }> = {
  "raw-materials": {
    title: "توريد خامات تجميل",
    description: "نوفر أجود أنواع الخامات والمواد الأولية لصناعة مستحضرات التجميل بأسعار تنافسية وجودة عالمية.",
    image: "/images/raw-materials-supply.jpg",
    benefits: ["خامات طبيعية 100%", "أسعار جملة تنافسية", "شحن لجميع المحافظات", "شهادات جودة معتمدة", "عينات مجانية", "دعم فني متخصص"],
    steps: [{ title: "اختيار الخامات", desc: "حدد الخامات التي تحتاجها" }, { title: "طلب عروض الأسعار", desc: "نرسل لك أفضل الأسعار" }, { title: "تأكيد الطلب", desc: "أكد طلبك ونبدأ التجهيز" }, { title: "التسليم", desc: "نوصل طلبك بأمان" }],
  },
  "private-label": {
    title: "تصنيع برايفت ليبل",
    description: "خدمة تصنيع كاملة باسم علامتك التجارية من تطوير التركيبة حتى المنتج النهائي الجاهز للبيع.",
    image: "/images/private-label-brand.jpg",
    benefits: ["تركيبات حصرية", "جودة عالمية", "حد أدنى منخفض", "تصميم عبوات مميز", "اختبارات جودة", "دعم تسويقي"],
    steps: [{ title: "الاستشارة", desc: "نفهم احتياجاتك" }, { title: "التطوير", desc: "نطور التركيبة" }, { title: "التصنيع", desc: "ننتج بأعلى جودة" }, { title: "التسليم", desc: "منتج جاهز للسوق" }],
  },
  "formula-development": {
    title: "تطوير التركيبات",
    description: "فريقنا المتخصص يطور تركيبات مبتكرة وفعالة تناسب احتياجاتك الخاصة.",
    image: "/images/formula-development.jpg",
    benefits: ["فريق R&D متخصص", "أحدث التقنيات", "تركيبات فريدة", "اختبارات شاملة", "تعديلات مجانية", "تقارير تحليل"],
    steps: [{ title: "تحديد المتطلبات", desc: "نحدد مواصفات المنتج" }, { title: "البحث والتطوير", desc: "نطور التركيبة" }, { title: "الاختبار", desc: "نختبر الجودة والثبات" }, { title: "التسليم", desc: "تركيبة جاهزة للإنتاج" }],
  },
  "packaging": {
    title: "حلول التعبئة والتغليف",
    description: "حلول تعبئة وتغليف احترافية وشاملة لجميع أنواع منتجات التجميل.",
    image: "/images/packaging-solutions.jpg",
    benefits: ["عبوات متنوعة", "طباعة عالية الجودة", "تصميم ملصقات", "تعبئة آلية", "تغليف حراري", "تخزين آمن"],
    steps: [{ title: "اختيار العبوات", desc: "نساعدك في الاختيار" }, { title: "التصميم", desc: "نصمم الملصقات" }, { title: "التعبئة", desc: "نعبئ بدقة" }, { title: "التسليم", desc: "منتج جاهز" }],
  },
};

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", company: "", details: "" });
  const service = serviceData[resolvedParams.slug] || serviceData["raw-materials"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/manufacturing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.name,
          company_name: formData.company,
          phone: formData.phone,
          product_type: service.title,
          expected_quantity: "-",
          project_details: formData.details
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit request");

      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", company: "", details: "" });
      toast.success("تم إرسال طلبك بنجاح، سنتواصل معك قريباً");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-primary" />
        <div className="container mx-auto px-4 relative z-10">
          <div className={service.image ? "grid lg:grid-cols-12 gap-8 items-center" : ""}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={service.image ? "lg:col-span-7 max-w-3xl" : "max-w-3xl"}
            >
              <Link href="/services" className="inline-flex items-center gap-2 text-sky-300 hover:text-white mb-4 text-sm transition-colors">
                <ArrowLeft className="w-4 h-4 rotate-180" /> العودة للخدمات
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{service.title}</h1>
              <p className="text-white/70 text-lg">{service.description}</p>
            </motion.div>
            {service.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-5"
              >
                <div className="rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-white">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60L1440 60V30C1200 50 960 10 720 30C480 50 240 10 0 30V60Z" fill="white"/></svg>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <h2 className="section-title text-center mb-12">مميزات الخدمة</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {service.benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-sky-50 border border-sky-100"
              >
                <CheckCircle className="w-5 h-5 text-sky-500 shrink-0" />
                <span className="font-medium text-navy-900">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-gray-50/50">
        <div className="container mx-auto">
          <h2 className="section-title text-center mb-12">خطوات العمل</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {service.steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg shadow-lg">
                  {i + 1}
                </div>
                <h3 className="font-bold text-navy-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="section-padding bg-white">
        <div className="container mx-auto max-w-2xl">
          <h2 className="section-title text-center mb-8">طلب الخدمة</h2>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-navy-900 mb-2">تم إرسال طلبك!</h4>
                <p className="text-gray-500">سنتواصل معك قريباً</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>الاسم الكامل</Label><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="أدخل اسمك" className="mt-1" required /></div>
                  <div><Label>رقم الهاتف</Label><Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="01xxxxxxxxx" className="mt-1" required /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>البريد الإلكتروني</Label><Input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" placeholder="email@example.com" className="mt-1" /></div>
                  <div><Label>اسم الشركة (اختياري)</Label><Input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="اسم شركتك" className="mt-1" /></div>
                </div>
                <div><Label>تفاصيل الطلب</Label><Textarea value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} placeholder="اكتب تفاصيل طلبك (المنتج المطلوب، الكمية التقريبية، وأي متطلبات أخرى)..." className="mt-1" rows={5} required /></div>
                <Button type="submit" size="lg" className="w-full h-12 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 ml-2" />
                      إرسال الطلب
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
