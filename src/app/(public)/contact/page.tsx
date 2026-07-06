"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getSiteSettings } from "@/lib/db";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [settings, setSettings] = useState({
    phone: "01119446474",
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
          phone: siteSettings.phone1 || prev.phone,
          whatsapp: siteSettings.whatsapp || prev.whatsapp,
          email: siteSettings.email || prev.email,
          address: siteSettings.addressAr || prev.address
        }));
      } catch (e) {}
    };

    loadSettings();
  }, []);

  const contactInfo = [
    { icon: Phone, label: "الهاتف", value: settings.phone, color: "bg-sky-100 text-sky-600" },
    { icon: MessageCircle, label: "واتساب", value: settings.whatsapp, color: "bg-green-100 text-green-600" },
    { icon: Mail, label: "البريد الإلكتروني", value: settings.email, color: "bg-blue-100 text-blue-600" },
    { icon: MapPin, label: "العنوان", value: settings.address, color: "bg-amber-100 text-amber-600" },
    { icon: Clock, label: "مواعيد العمل", value: "السبت - الخميس: 9 صباحاً - 6 مساءً", color: "bg-purple-100 text-purple-600" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      toast.error("يرجى ملء الاسم والرسالة على الأقل");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      
      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-primary" />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">تواصل معنا</h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">نحن هنا لمساعدتك. تواصل معنا لأي استفسار أو طلب</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60L1440 60V30C1200 50 960 10 720 30C480 50 240 10 0 30V60Z" fill="white"/></svg>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">معلومات الاتصال</h2>
              {contactInfo.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-sky-50/50 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900 mb-1">{item.label}</p>
                    <p className="text-gray-600 text-sm" dir="ltr" style={{ textAlign: "right" }}>{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <h2 className="text-2xl font-bold text-navy-900 mb-6">أرسل لنا رسالة</h2>
                  {submitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-navy-900 mb-2">تم إرسال رسالتك بنجاح!</h4>
                      <p className="text-gray-500">سنتواصل معك في أقرب وقت ممكن</p>
                      <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-6">إرسال رسالة أخرى</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div><Label>الاسم الكامل *</Label><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="أدخل اسمك" className="mt-1.5" required /></div>
                        <div><Label>رقم الهاتف *</Label><Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="01xxxxxxxxx" className="mt-1.5" required /></div>
                      </div>
                      <div><Label>البريد الإلكتروني</Label><Input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" placeholder="email@example.com" className="mt-1.5" /></div>
                      <div><Label>الموضوع</Label><Input value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} placeholder="موضوع الرسالة" className="mt-1.5" /></div>
                      <div><Label>الرسالة *</Label><Textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="اكتب رسالتك هنا بالتفصيل..." className="mt-1.5" rows={6} required /></div>
                      <Button type="submit" size="lg" className="w-full h-12 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 ml-2" />
                          إرسال الرسالة
                        </>
                      )}
                    </Button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.8!2d31.35!3d30.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA0JzQ4LjAiTiAzMcKwMjEnMDAuMCJF!5e0!3m2!1sar!2seg!4v1"
          width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" title="موقعنا"
        />
      </section>
    </>
  );
}
