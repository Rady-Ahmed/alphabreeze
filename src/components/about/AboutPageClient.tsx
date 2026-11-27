"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FlaskConical, Shield, Truck, Users, Award, ChevronLeft,
  CheckCircle2, MessageCircle, Package, Atom, Layers
} from "lucide-react";

const WHATSAPP = "201019946409";

const STATS = [
  { value: "431+", label: "مادة خام في الكتالوج" },
  { value: "8", label: "فئات متخصصة" },
  { value: "100%", label: "جودة مضمونة" },
  { value: "24/7", label: "دعم فني مستمر" },
];

const STRENGTHS = [
  {
    icon: FlaskConical,
    title: "كتالوج متكامل",
    desc: "أكثر من 431 مادة خام كيميائية وتجميلية بمختلف الأشكال والتركيزات",
  },
  {
    icon: Shield,
    title: "جودة معتمدة",
    desc: "شهادات COA وMSDS متاحة عند الطلب لضمان معايير الجودة والسلامة",
  },
  {
    icon: Truck,
    title: "توريد موثوق",
    desc: "سلسلة توريد متكاملة تضمن التسليم في الوقت المحدد لخطوط الإنتاج",
  },
  {
    icon: Users,
    title: "دعم فني متخصص",
    desc: "فريق من الكيميائيين والمتخصصين لدعمك في اختيار المكونات المناسبة",
  },
  {
    icon: Layers,
    title: "خدمة الليبل الخاص",
    desc: "نساعدك في تطوير تركيباتك وتغليفها تحت علامتك التجارية",
  },
  {
    icon: Award,
    title: "خبرة وثقة",
    desc: "سنوات من الخبرة في خدمة مصانع مستحضرات التجميل والمنظفات في مصر",
  },
];

const TIMELINE = [
  { year: "البداية", title: "التأسيس برؤية واضحة", desc: "بدأت ألفا بريز برؤية واحدة: أن نكون الشريك الأول والأفضل لكل من يسعى للنجاح في صناعة مستحضرات التجميل." },
  { year: "النمو", title: "توسع الكتالوج", desc: "أضفنا مئات المواد الخام الجديدة وطورنا علاقات استراتيجية مع موردين عالميين." },
  { year: "اليوم", title: "منصة B2B متكاملة", desc: "أصبحنا منصة توريد رقمية شاملة تخدم المصانع والعلامات التجارية الصغيرة والكبيرة." },
  { year: "المستقبل", title: "التوسع الإقليمي", desc: "نطمح لأن نكون المورد المفضل في منطقة الشرق الأوسط وشمال أفريقيا." },
];

const SERVICES = [
  { icon: Package, title: "توريد المواد الخام", items: ["زيوت نباتية وعطرية", "مواد فعّالة ومستخلصات", "مستحلبات وعوامل سطحية", "حافظات وثبتات"] },
  { icon: Atom, title: "الدعم التقني", items: ["توصية بالمواد المناسبة", "توفير مواصفات COA", "توجيه في نسب الاستخدام", "دعم ما بعد الشراء"] },
  { icon: Layers, title: "خدمات التصنيع", items: ["تطوير التركيبات", "الليبل الخاص", "التغليف المتخصص", "خدمات ما قبل الإنتاج"] },
];

export default function AboutPageClient() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-l from-[#0d1b3e] via-[#0a2d5e] to-[#0d1b3e] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-500 rounded-full blur-3xl translate-y-1/3" />
        </div>

        {/* Background image */}
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1800&q=60"
            alt="Laboratory"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5">
              <FlaskConical className="h-3.5 w-3.5" />
              من نحن
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
              شريكك الموثوق في
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-300 to-sky-400"> توريد المواد الخام</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl">
              نوفر لك كتالوجًا متكاملًا من المواد الكيميائية والتجميلية الخام لدعم خط إنتاجك بأعلى معايير الجودة.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-cyan-500 to-sky-600 mb-1">
                  {s.value}
                </div>
                <div className="text-sm text-slate-500">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=900&q=80"
                  alt="Alpha Breeze Laboratory"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b3e]/50 to-transparent" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">متاح الآن</p>
                  <p className="text-sm font-bold text-slate-800">431+ مادة خام</p>
                </div>
              </div>
            </motion.div>

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <span className="text-cyan-500 text-xs font-bold uppercase tracking-widest">قصتنا</span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-2 leading-tight">
                  رحلة النجاح والتميز
                </h2>
              </div>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  بدأت رحلة ألفا بريز برؤية واضحة: أن نكون الشريك الأول والأفضل لكل من يسعى للنجاح في صناعة مستحضرات التجميل والمنظفات. من بداية متواضعة إلى شركة رائدة في مجال توريد خامات التجميل وخدمات التصنيع.
                </p>
                <p>
                  نؤمن بأن كل علامة تجارية تستحق أن تحصل على أفضل الخامات وأعلى جودة تصنيع. لذلك نعمل بجد لتوفير حلول متكاملة تغطي جميع احتياجات عملائنا لضمان تميزهم في السوق.
                </p>
              </div>

              {/* Timeline */}
              <div className="space-y-3 mt-6">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="flex-shrink-0 w-16 text-xs font-bold text-cyan-500 bg-cyan-50 border border-cyan-100 rounded-full text-center py-1 mt-0.5">
                      {item.year}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-snug">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Strengths grid ── */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-cyan-500 text-xs font-bold uppercase tracking-widest">لماذا ألفا بريز</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-2">ما يميزنا</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {STRENGTHS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-lg hover:border-cyan-200 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-50 to-sky-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <s.icon className="h-6 w-6 text-cyan-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-base mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-16 md:py-24 bg-gradient-to-l from-[#0d1b3e] to-[#0a2d5e] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">خدماتنا</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2">ما نقدمه لك</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-4">
                  <svc.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="font-bold text-white text-base mb-3">{svc.title}</h3>
                <ul className="space-y-2">
                  {svc.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-l from-slate-50 to-cyan-50 rounded-3xl border border-slate-100 p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-3">
              هل أنت مستعد لبدء التعاون؟
            </h2>
            <p className="text-slate-500 text-sm mb-7 max-w-md mx-auto leading-relaxed">
              تواصل معنا اليوم وسيقوم فريقنا المتخصص بمساعدتك في اختيار المواد المناسبة لخط إنتاجك.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("مرحباً، أود التعرف على خدماتكم والتعاون مع ألفا بريز")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all hover:scale-105 shadow-md text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                تواصل عبر واتساب
              </a>
              <Link
                href="/shop"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-cyan-500 to-sky-600 text-white font-bold rounded-2xl transition-all hover:scale-105 shadow-md text-sm"
              >
                <FlaskConical className="h-4 w-4" />
                تصفح الكتالوج
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
