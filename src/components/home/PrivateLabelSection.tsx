"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Factory, Send, Sparkles, FileSpreadsheet, ShieldCheck, ArrowLeft } from "lucide-react";

const capabilities = [
  { title: "تطوير تركيبات مبتكرة وحصرية", desc: "تصميم تركيبات كيميائية مخصصة مطابقة لمتطلبات منتجك وتوجهات السوق الحديثة." },
  { title: "اختبارات الاستقرار والتوافقية المعملية", desc: "إجراء اختبارات ثبات اللزوجة، درجة الحرارة، وتوافق العبوة مع المحتوى الداخلي." },
  { title: "المساعدة في التسجيل والترخيص (EDA)", desc: "تجهيز ملفات الأمان الفنية (PIF) وتسهيل إجراءات التسجيل لدى هيئة الدواء المصرية." },
  { title: "حلول تعبئة وتغليف صناعية متكاملة", desc: "توريد عبوات زجاجية وبلاستيكية فاخرة مع مضخات وبخاخات وتغليف مطابق للمواصفات." },
  { title: "مرونة في الحد الأدنى للإنتاج (MOQ)", desc: "خيارات إنتاجية مرنة تناسب الشركات الناشئة وكبرى البراندات الراغبة في التوسع." },
  { title: "سرية تامة وحماية الحقوق الفكرية", desc: "توقيع اتفاقيات عدم إفصاح (NDA) لحماية أسرار التركيبات وهوية علامتك التجارية." },
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
    // WhatsApp redirect fallback
    const text = encodeURIComponent(
      `طلب تصنيع لحساب الغير (Private Label):\nالاسم: ${formData.name}\nالشركة: ${formData.company || "غير محدد"}\nالهاتف: ${formData.phone}\nنوع المنتج المستهدف: ${formData.productType}\nملاحظات: ${formData.notes || "لا توجد"}`
    );
    window.open(`https://wa.me/201119446474?text=${text}`, "_blank");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-sky-950 text-white" id="private-label">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Content (Right in RTL) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6 border border-sky-400/30">
                <Factory className="w-4 h-4 text-sky-300" />
                <span className="text-xs font-bold text-sky-200">التصنيع التعاقدي والتصنيع لحساب الغير</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight">
                أطلق علامتك التجارية الخاصة{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-200">
                  بأعلى المعايير الصناعية
                </span>
              </h2>

              <p className="text-slate-300 leading-relaxed mb-8 text-base">
                سواء كنت صاحب براند ناشئ أو شركة كبرى ترغب في التوسع بخط منتجات جديد، نقدم لك حلاً صناعياً متكاملاً يشمل تطوير التركيبة، اختبارات المعمل، توفير المواد الخام، والتعبئة حتى تسليم المنتج جاهزاً للبيع والترخيص.
              </p>

              {/* Capabilities Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {capabilities.map((cap, index) => (
                  <div key={index} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-sky-400/30 transition-colors">
                    <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white mb-0.5">{cap.title}</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed">{cap.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6 pt-4 border-t border-white/10 text-xs text-slate-400">
                <span>✓ اتفاقيات عدم إفصاح (NDA)</span>
                <span>✓ دعم فني في التسجيل</span>
                <span>✓ استشارات كيميائية مجانية</span>
              </div>
            </motion.div>
          </div>

          {/* Form (Left in RTL) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-2xl text-navy-950 border border-slate-100">
                <div className="mb-6">
                  <h3 className="text-xl font-black text-navy-950 mb-1">طلب استشارة وتصنيع برايفت ليبل</h3>
                  <p className="text-xs text-slate-500">أدخل بيانات مشروعك وسيتواصل معك استشاري تركيبات خلال 24 ساعة</p>
                </div>

                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-navy-950 mb-2">تم استلام طلبكم بنجاح!</h4>
                    <p className="text-xs text-slate-500">تم تحويل الطلب إلى فريق الاستشارات الكيميائية وسيتم الرد فوراً عبر واتساب والهاتف.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs font-bold text-slate-700">الاسم الكريم *</Label>
                        <Input
                          placeholder="الاسم"
                          className="mt-1 h-10 text-xs"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-slate-700">اسم الشركة / البراند</Label>
                        <Input
                          placeholder="اسم العلامة التجارية"
                          className="mt-1 h-10 text-xs"
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
                          className="mt-1 h-10 text-xs"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-slate-700">نوع المنتج المطلوب *</Label>
                        <Input
                          placeholder="سيروم، كريم، شامبو، زيت..."
                          className="mt-1 h-10 text-xs"
                          value={formData.productType}
                          onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs font-bold text-slate-700">تفاصيل إضافية عن المشروع والكمية المستهدفة</Label>
                      <Textarea
                        placeholder="اذكر المواصفات المطلوبة، الفئة المستهدفة، أو أي تفاصيل خاصة..."
                        rows={3}
                        className="mt-1 text-xs"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-sky-500/25 mt-2"
                    >
                      <Send className="w-4 h-4 ml-2" />
                      إرسال الطلب وحجز استشارة كيميائية
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
