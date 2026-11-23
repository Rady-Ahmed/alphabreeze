"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageCircle, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { getSiteSettings } from "@/lib/db";

const WHATSAPP_NUMBER = "201119446474";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    materialNeeded: "",
    message: ""
  });
  const [settings, setSettings] = useState({
    phone1: "01119446474",
    phone2: "01016067979",
    whatsapp: "01119446474",
    email: "info@alphabreeze.com",
    address: "طريق جسر السويس الرئيسي، أمام محطة مترو نادي الشمس، القاهرة، مصر"
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const siteSettings = await getSiteSettings();
        setSettings(prev => ({
          ...prev,
          phone1: siteSettings.phone1 || prev.phone1,
          phone2: siteSettings.phone2 || prev.phone2,
          whatsapp: siteSettings.whatsapp || prev.whatsapp,
          email: siteSettings.email || prev.email,
          address: siteSettings.addressAr || prev.address
        }));
      } catch {}
    };

    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("يرجى إدخال الاسم ورقم الهاتف على الأقل");
      return;
    }

    setLoading(true);

    try {
      // Build WhatsApp message for instant delivery
      const waText = encodeURIComponent(
        `*طلب تسعير / استفسار جديد عبر الموقع*\n` +
        `• الاسم: ${formData.name}\n` +
        `• الهاتف: ${formData.phone}\n` +
        `• الشركة / المعمل: ${formData.company || 'غير محدد'}\n` +
        `• المواد المطلوبة: ${formData.materialNeeded || 'استفسار عام'}\n` +
        `• الملاحظات: ${formData.message || 'لا يوجد'}`
      );

      // Open WhatsApp in new tab
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`, '_blank');
      setSubmitted(true);
      toast.success("تم إرسال طلبك بنجاح! يتم تحويلك إلى واتساب للمتابعة الفورية.");
    } catch {
      toast.error("حدث خطأ أثناء الإرسال، يرجى التواصل مباشرة عبر واتساب.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-l from-[#070e22] via-[#0d1b3e] to-[#070e22] text-white py-16 md:py-24 overflow-hidden border-b border-cyan-500/20">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            التواصل والمبيعات الصناعية
          </div>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-4">
            تواصل مع فريق{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-300 to-sky-400">
              ألفا بريز كيميكالز
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            نسعد بالإجابة على استفساراتكم المعملية، وتوفير عروض أسعار وشهادات التحليل COA لكافة المواد الخام الكيميائية.
          </p>
        </div>
      </section>

      {/* ── Main Layout ── */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          
          {/* Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <h3 className="font-bold text-slate-900 text-lg mb-6">بيانات المقر والتواصل المباشر</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-0.5">العنوان والمستودع</h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{settings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-0.5">هواتف المبيعات</h4>
                    <p dir="ltr" className="text-xs sm:text-sm font-mono text-slate-800 font-bold">{settings.phone1}</p>
                    <p dir="ltr" className="text-xs sm:text-sm font-mono text-slate-800 font-bold">{settings.phone2}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-0.5">البريد الإلكتروني</h4>
                    <p className="text-xs sm:text-sm font-mono text-slate-800">{settings.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-0.5">أوقات العمل واستقبال الطلبات</h4>
                    <p className="text-xs sm:text-sm text-slate-700">السبت - الخميس: من 9:00 صباحاً حتى 6:00 مساءً</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Box */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("مرحباً ألفا بريز، أود الاستفسار عن توريد مواد خام")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  مراسلة سريعة عبر واتساب
                </a>
              </div>
            </div>
          </div>

          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">تم استلام طلبك بنجاح!</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                  يقوم فريق المبيعات الفنية بمراجعة طلبك والتواصل معك عبر الهاتف أو الواتساب خلال أوقات العمل الرسمية.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:border-cyan-500 transition"
                >
                  إرسال طلب آخر
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-bold text-slate-900 text-lg mb-2">نموذج طلب تسعير واستفسار فني</h3>
                <p className="text-xs text-slate-500 mb-6">
                  املأ البيانات التالية وسنقوم بتجهيز عرض السعر والشهادات المطلوبة:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">الاسم بالكامل *</Label>
                    <Input
                      required
                      placeholder="د. أحمد محمود"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="rounded-xl text-xs py-2.5"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">رقم الهاتف / الواتساب *</Label>
                    <Input
                      required
                      dir="ltr"
                      placeholder="01xxxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="rounded-xl text-xs py-2.5 text-right font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">اسم الشركة / المصنع / المعمل</Label>
                  <Input
                    placeholder="مثال: معمل كوزماتيك للتركيبات"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="rounded-xl text-xs py-2.5"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">المواد أو الخامات المطلوبة</Label>
                  <Input
                    placeholder="مثال: زيت جوجوبا 25 كجم، حمض سيتريك، BTMS"
                    value={formData.materialNeeded}
                    onChange={(e) => setFormData({ ...formData, materialNeeded: e.target.value })}
                    className="rounded-xl text-xs py-2.5"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">ملاحظات أو مواصفات خاصة</Label>
                  <Textarea
                    rows={4}
                    placeholder="أي استفسار بخصوص الشهادات، التعبئة، أو تاريخ الاستلام..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="rounded-xl text-xs"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-l from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 text-white font-bold rounded-2xl shadow-md transition"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      جاري الإرسال...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      إرسال طلب التسعير الرسمي
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
