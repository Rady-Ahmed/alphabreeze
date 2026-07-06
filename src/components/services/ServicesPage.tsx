"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FlaskConical, Factory, Atom, Package, ArrowLeft, CheckCircle, Sparkles, Phone, Rocket, Handshake, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: FlaskConical, slug: "raw-materials", title: "توريد خامات تجميل",
    description: "نوفر أجود أنواع الخامات والمواد الأولية لصناعة مستحضرات التجميل. من الزيوت الطبيعية والزبدات إلى المواد الفعالة والمواد الحافظة.",
    features: ["زيوت طبيعية ومكررة", "زبدات ومواد شمعية", "مواد فعالة ومركزات", "مواد حافظة ومستحلبات", "عطور وألوان", "مواد تغليف أولية"],
    color: "from-sky-400 to-sky-600",
    bgColor: "bg-sky-50",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Factory, slug: "private-label", title: "تصنيع برايفت ليبل",
    description: "خدمة تصنيع كاملة باسم علامتك التجارية الخاصة من التطوير حتى التعبئة والتغليف. نساعدك في إطلاق منتجاتك بأعلى جودة.",
    features: ["تطوير تركيبة حصرية", "تصنيع بأعلى معايير الجودة", "تعبئة وتغليف احترافية", "تصميم عبوات مميزة", "اختبارات جودة شاملة", "دعم فني مستمر"],
    color: "from-violet-500 to-purple-700",
    bgColor: "bg-violet-50",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Atom, slug: "formula-development", title: "تطوير التركيبات",
    description: "فريقنا المتخصص يطور تركيبات مبتكرة وفعالة تناسب السوق المصري والعربي مع مراعاة أحدث التوجهات العالمية.",
    features: ["تركيبات مخصصة حسب الطلب", "اختبارات ثبات واستقرار", "تطوير بناءً على أحدث الأبحاث", "مطابقة للمعايير الدولية", "تقارير تحليل شاملة", "تعديلات غير محدودة"],
    color: "from-emerald-400 to-emerald-600",
    bgColor: "bg-emerald-50",
    image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Package, slug: "packaging", title: "حلول التعبئة والتغليف",
    description: "نقدم حلول تعبئة وتغليف شاملة تشمل اختيار العبوات، التصميم، الطباعة، والتعبئة بأحدث الماكينات.",
    features: ["عبوات بأشكال متنوعة", "طباعة عالية الجودة", "تصميم ملصقات مميزة", "تعبئة آلية دقيقة", "تغليف حراري", "حلول تخزين آمنة"],
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-50",
    image: "https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=800&auto=format&fit=crop",
  },
];

const whyChooseUs = [
  { icon: Award, title: "+10 سنوات خبرة", desc: "خبرة عميقة في صناعة التجميل المصرية والعربية" },
  { icon: Users, title: "+500 عميل راضٍ", desc: "قاعدة عملاء واسعة ومتنامية من رواد الأعمال" },
  { icon: Rocket, title: "إطلاق سريع", desc: "نساعدك في إطلاق منتجاتك في أقصر وقت ممكن" },
  { icon: Handshake, title: "دعم مستمر", desc: "فريق دعم متخصص يرافقك في كل خطوة" },
];

const processSteps = [
  { step: "01", title: "استشارة مجانية", desc: "نفهم احتياجاتك ونقدم لك خطة عمل مفصلة" },
  { step: "02", title: "تطوير وتصنيع", desc: "نبدأ في تطوير التركيبة والتصنيع وفق أعلى المعايير" },
  { step: "03", title: "اختبار الجودة", desc: "اختبارات شاملة لضمان سلامة وفعالية المنتج" },
  { step: "04", title: "التسليم والدعم", desc: "نسلمك المنتج النهائي مع دعم فني مستمر" },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-primary" />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        
        {/* Floating shapes */}
        <motion.div className="absolute top-20 left-[10%] w-40 h-40 bg-white/5 rounded-full blur-xl"
          animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }} />
        <motion.div className="absolute bottom-20 right-[15%] w-60 h-60 bg-sky-300/10 rounded-full blur-2xl"
          animate={{ y: [0, 20, 0] }} transition={{ duration: 7, repeat: Infinity }} />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6 border border-white/20 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span className="text-sm text-white/90">حلول شاملة لصناعة التجميل</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-md">
              خدماتنا{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-white">المتكاملة</span>
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              من الفكرة حتى المنتج النهائي — نقدم لك كل ما تحتاجه لإطلاق علامتك التجارية في عالم التجميل
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60L1440 60V30C1200 50 960 10 720 30C480 50 240 10 0 30V60Z" fill="white"/></svg>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 space-y-24">
          {services.map((service, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`grid lg:grid-cols-2 gap-12 items-center`}
            >
              <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 shadow-lg shadow-sky-500/20`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">{service.title}</h2>
                <p className="text-gray-500 leading-relaxed mb-8 text-lg">{service.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {service.features.map((f, j) => (
                    <motion.div key={j} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100"
                      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: j * 0.05 }}
                    >
                      <CheckCircle className="w-5 h-5 text-sky-500 shrink-0" />
                      <span className="text-sm font-medium text-gray-700">{f}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Link href={`/services/${service.slug}`}>
                    <Button className="h-12 px-6 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition-all text-base">
                      تفاصيل الخدمة
                      <ArrowLeft className="w-4 h-4 mr-2" />
                    </Button>
                  </Link>
                  <a href={`https://wa.me/201119446474?text=${encodeURIComponent('مرحباً، أود الاستفسار عن خدمة ' + service.title)}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="h-12 px-6 text-base border-gray-200 hover:bg-gray-50">
                      <Phone className="w-4 h-4 mr-2" />
                      طلب عرض سعر
                    </Button>
                  </a>
                </div>
              </div>
              <div className={`${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                <motion.div
                  className={`w-full aspect-[4/3] rounded-[2.5rem] flex items-center justify-center relative overflow-hidden shadow-2xl shadow-gray-200/50 group`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  <div className={`absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent`} />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold">{service.title}</p>
                        <p className="text-white/80 text-sm">جودة مضمونة ومعتمدة</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100 rounded-full blur-3xl opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sky-500 font-semibold text-sm mb-2 block tracking-wider uppercase">كيف نعمل؟</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">خطوات بسيطة لإطلاق منتجك</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">من الاستشارة المجانية وحتى التسليم النهائي</p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="relative text-center group"
              >
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-gradient-to-l from-sky-200 to-transparent -translate-x-1/2" />
                )}
                <motion.div 
                  className="w-20 h-20 rounded-2xl bg-white border-2 border-sky-100 shadow-xl shadow-sky-100/50 flex items-center justify-center mx-auto mb-6 relative z-10 group-hover:border-sky-400 group-hover:shadow-sky-300/50 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-sky-600">{step.step}</span>
                </motion.div>
                <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-sky-600 transition-colors">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sky-500 font-semibold text-sm mb-2 block tracking-wider uppercase">لماذا ألفا بريز؟</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">الاختيار الأمثل لعلامتك التجارية</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">نلتزم بتقديم أعلى معايير الجودة والخدمة في كل خطوة</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-2 transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center mx-auto mb-6 group-hover:bg-sky-500 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-8 h-8 text-sky-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/50 to-transparent" />
        <motion.div className="absolute top-10 right-[20%] w-64 h-64 bg-sky-500/20 rounded-full blur-3xl"
          animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">جاهز تبدأ مشروعك في عالم التجميل؟</h2>
            <p className="text-sky-100/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">تواصل معنا الآن واحصل على استشارة مجانية من خبرائنا لمساعدتك في إطلاق علامتك التجارية</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/201119446474?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white text-navy-900 hover:bg-sky-50 shadow-xl shadow-white/10 px-10 h-14 text-lg">
                  تواصل عبر واتساب
                  <Phone className="w-5 h-5 mr-2" />
                </Button>
              </a>
              <Link href="/shop">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10 h-14 text-lg">
                  تسوق المنتجات
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
