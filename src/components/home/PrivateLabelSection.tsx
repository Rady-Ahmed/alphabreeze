"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Factory, Send, CheckCircle2, PhoneCall, Sparkles } from "lucide-react";

const privateLabelFeatures = [
  "تطوير تركيبات مبتكرة وحصرية بأيدي كيميائيين متخصصين",
  "اختبارات الاستقرار والتوافقية المعملية (Stability Tests)",
  "المساعدة في إعداد ملفات التسجيل وترخيص هيئة الدواء (EDA)",
  "توفير حلول التعبئة والتغليف والعبوات التجميلية المتوافقة",
  "مرونة في كميات الإنتاج والحد الأدنى (MOQ) لتناسب نمو علامتك",
  "اتفاقيات سرية وحماية الحقوق والتركيبات (Non-Disclosure Agreement)",
];

export default function PrivateLabelSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    productType: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const text = encodeURIComponent(
      `طلب تصنيع لحساب الغير (Private Label):\nالاسم: ${formData.name}\nالشركة / العلامة التجارية: ${formData.company || "غير محدد"}\nالهاتف: ${formData.phone}\nنوع المنتج: ${formData.productType}\nملاحظات: ${formData.notes || "لا يوجد"}`
    );
    window.open(`https://wa.me/201019946409?text=${text}`, "_blank");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="private-label">
      <div className="container mx-auto px-4">
        
        {/* Split Layout: Distinctive Visual Rhythm */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column in RTL (Image & Showcase) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white p-3"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white">
                <img
                  src="/images/private-label-brand.jpg"
                  alt="عايز تبدأ براندك؟ التصنيع لحساب الغير"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column in RTL (Messaging & Consultation Form) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-100 text-navy-900 border border-navy-200 text-xs font-bold mb-5">
                <Factory className="w-3.5 h-3.5 text-navy-700" />
                <span>التصنيع التعاقدي وحلول العلامة التجارية الخاصة</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 mb-6 leading-tight tracking-tight">
                أطلق علامتك التجارية الخاصة{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-navy-900">
                  بأعلى معايير التصنيع
                </span>
              </h2>

              <p className="text-slate-600 leading-relaxed text-base mb-8">
                نقدم خدمة تصنيع متكاملة (Turnkey Private Label) لأصحاب العلامات التجارية ومطوري المشروعات. نتولى عنك كافة مراحل تطوير التركيبة، توريد المواد الخام المعتمدة، اختبارات الثبات، والتعبئة حتى تسليم المنتج جاهزاً للبيع والترخيص.
              </p>

              {/* Feature Checklist */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {privateLabelFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-slate-700 leading-snug">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Consultation Request Form Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-lg">
                <h3 className="text-base font-bold text-navy-950 mb-1">
                  طلب استشارة كيميائية وتصنيع برايفت ليبل
                </h3>
                <p className="text-xs text-slate-500 mb-5">
                  أدخل تفاصيل مشروعك وسيتواصل معك استشاري تركيبات خلال 24 ساعة
                </p>

                {submitted ? (
                  <div className="text-center py-6">
                    <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-navy-950 mb-1">تم إرسال طلبكم بنجاح!</h4>
                    <p className="text-xs text-slate-500">تم تحويل الطلب إلى قسم الاستشارات وسنتواصل معكم فوراً.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs font-bold text-slate-700">الاسم الكريم *</Label>
                        <Input
                          placeholder="الاسم"
                          className="mt-1 h-9 text-xs"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-slate-700">اسم العلامة التجارية</Label>
                        <Input
                          placeholder="اسم البراند (اختياري)"
                          className="mt-1 h-9 text-xs"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs font-bold text-slate-700">رقم الهاتف / واتساب *</Label>
                        <Input
                          placeholder="01xxxxxxxxx"
                          className="mt-1 h-9 text-xs"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-slate-700">نوع المنتج المستهدف *</Label>
                        <Input
                          placeholder="سيروم، كريم، شامبو..."
                          className="mt-1 h-9 text-xs"
                          value={formData.productType}
                          onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-navy-950 hover:bg-sky-600 text-white font-bold h-10 rounded-xl text-xs shadow-md transition-colors gap-2 mt-2"
                    >
                      <Send className="w-4 h-4 ml-1" />
                      طلب استشارة وتحديد موعد مع كيميائي التركيبات
                    </Button>
                  </form>
                )}
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
