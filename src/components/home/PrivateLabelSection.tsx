"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Factory, Send } from "lucide-react";

const benefits = [
  "تصنيع باسم علامتك التجارية",
  "جودة عالية ومعايير دولية",
  "أسعار تنافسية للجملة",
  "دعم فني كامل",
  "تسليم سريع ومضمون",
  "تركيبات حصرية ومبتكرة",
];

export default function PrivateLabelSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="section-padding relative overflow-hidden" id="private-label">
      <div className="absolute inset-0 gradient-accent opacity-95" />
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
        backgroundSize: "30px 30px",
      }} />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6 border border-white/20">
              <Factory className="w-4 h-4 text-sky-300" />
              <span className="text-sm text-white/90">تصنيع برايفت ليبل</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ابدأ علامتك التجارية الخاصة{" "}
              <span className="text-sky-300">بكل سهولة</span>
            </h2>

            <p className="text-white/80 leading-relaxed mb-8">
              نقدم لك خدمة تصنيع متكاملة باسم علامتك التجارية الخاصة. من تطوير التركيبة 
              إلى التعبئة والتغليف، نحن نتولى كل شيء لتحصل على منتج جاهز للسوق.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-300 shrink-0" />
                  <span className="text-white/90 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-navy-900 mb-6">طلب خدمة تصنيع</h3>
              
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-navy-900 mb-2">تم إرسال طلبك بنجاح!</h4>
                  <p className="text-gray-500">سنتواصل معك في أقرب وقت ممكن</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>الاسم الكامل</Label>
                      <Input placeholder="أدخل اسمك" className="mt-1" required />
                    </div>
                    <div>
                      <Label>اسم الشركة</Label>
                      <Input placeholder="اسم الشركة (اختياري)" className="mt-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>رقم الهاتف</Label>
                      <Input placeholder="01xxxxxxxxx" className="mt-1" required />
                    </div>
                    <div>
                      <Label>نوع المنتج</Label>
                      <Input placeholder="مثال: كريم ترطيب" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label>الكمية المتوقعة</Label>
                    <Input placeholder="مثال: 1000 قطعة" className="mt-1" />
                  </div>
                  <div>
                    <Label>تفاصيل المشروع</Label>
                    <Textarea placeholder="اكتب تفاصيل مشروعك هنا..." className="mt-1" rows={4} />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="w-4 h-4" />
                    إرسال الطلب
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
