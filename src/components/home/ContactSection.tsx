"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  { icon: Phone, label: "الهاتف", value: "01119446474 - 01016067979" },
  { icon: Mail, label: "البريد الإلكتروني", value: "info@alphabreeze.com" },
  { icon: MapPin, label: "العنوان", value: "طريق جسر السويس الرئيسي، أمام محطة مترو نادي الشمس، القاهرة" },
  { icon: Clock, label: "مواعيد العمل", value: "السبت - الخميس: 9 ص - 6 م" },
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="section-padding bg-white" id="contact">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sky-500 font-semibold text-sm mb-2 block">تواصل معنا</span>
          <h2 className="section-title">نحن هنا لمساعدتك</h2>
          <p className="section-subtitle">تواصل معنا لأي استفسار أو طلب</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-sky-50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <p className="font-semibold text-navy-900 mb-1">{item.label}</p>
                  <p className="text-gray-600 text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-navy-900 mb-2">تم إرسال رسالتك بنجاح!</h4>
                  <p className="text-gray-500">سنتواصل معك في أقرب وقت</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>الاسم الكامل</Label>
                      <Input placeholder="أدخل اسمك" className="mt-1" required />
                    </div>
                    <div>
                      <Label>رقم الهاتف</Label>
                      <Input placeholder="01xxxxxxxxx" className="mt-1" required />
                    </div>
                  </div>
                  <div>
                    <Label>البريد الإلكتروني</Label>
                    <Input type="email" placeholder="email@example.com" className="mt-1" />
                  </div>
                  <div>
                    <Label>الموضوع</Label>
                    <Input placeholder="موضوع الرسالة" className="mt-1" />
                  </div>
                  <div>
                    <Label>الرسالة</Label>
                    <Textarea placeholder="اكتب رسالتك هنا..." className="mt-1" rows={5} required />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="w-4 h-4" />
                    إرسال الرسالة
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
