"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FlaskConical,
  Factory,
  Atom,
  Package,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Phone,
  Rocket,
  Handshake,
  Award,
  Users,
  ChevronLeft,
  MessageCircle,
  FileText
} from "lucide-react";

const WHATSAPP_NUMBER = "201019946409";

const services = [
  {
    icon: FlaskConical,
    slug: "raw-materials",
    title: "توريد المواد الخام الكيميائية بالجملة",
    description: "نوفر أكثر من 431 مادة خام كيميائية وتجميلية معتمدة، من الزيوت الطبيعية والمستخلصات العشبية إلى المكونات الفعالة، المذيبات، المستحلبات، الشموع والمواد الحافظة بأعلى درجات النقاء.",
    features: [
      "شهادات تحليل مخبري COA و MSDS مرفقة مع كل شحنة",
      "أوزان وعبوات مرنة تناسب المعامل الصغيرة والمصانع الكبرى",
      "تتبع دقيق لأرقام الـ CAS والمواصفات الفنية العالمية",
      "ضمان الاستقرار الكيميائي وسرعة التوريد لخطوط الإنتاج"
    ],
    color: "from-cyan-500 to-sky-600",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80",
    badge: "الخدمة الأساسية"
  },
  {
    icon: Factory,
    slug: "private-label",
    title: "التصنيع لحساب الغير (Private Label)",
    description: "خدمة تصنيع تعاقدي متكاملة تبدأ من تطوير فكرة المنتج وتجهيز التركيبة المعملية، مروراً بالتصنيع الفعلي في مصانع معتمدة، وحتى التعبئة والتغليف النهائي تحت علامتك التجارية.",
    features: [
      "تصنيع سيرومات، كريمات، لوشنات، وشامبوهات احترافية",
      "تطوير هوية بصرية وتصميم العبوات والملصقات",
      "مساعدة في إجراءات التسجيل والتراخيص الرسمية",
      "حد أدنى مرن للطلب (MOQ) لتشجيع العلامات التجارية الناشئة"
    ],
    color: "from-blue-600 to-indigo-700",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=900&q=80",
    badge: "حلول متكاملة"
  },
  {
    icon: Atom,
    slug: "formula-development",
    title: "تطوير وضبط التركيبات المعملية (R&D)",
    description: "فريق من الخبراء الكيميائيين المتخصصين في تصحيح عيوب التركيبات، رفع كفاءة الامتصاص والثبات، واستبدال المواد الخام المكلفة ببدائل محلية ودولية ذات كفاءة موازية أو أعلى.",
    features: [
      "اختبارات ثبات حراري واستقرار فيزيائي (Stability Tests)",
      "تعديل اللزوجة، الرقم الهيدروجيني (pH)، وتجانس المستحلبات",
      "تقديم تقارير معملية مفصلة وطرق خلط دقيقة Standard Operating Procedures",
      "استشارات فورية عبر الهاتف والواتساب لحل مشكلات التشغيل"
    ],
    color: "from-teal-500 to-emerald-600",
    image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=900&q=80",
    badge: "دعم فني استشاري"
  },
  {
    icon: Package,
    slug: "packaging",
    title: "حلول التعبئة والتغليف والخامات الأولية",
    description: "توفير حلول تغليف صناعي فاخر تحمي المكونات الفعالة من الأكسدة وأشعة الشمس، تشمل عبوات زجاجية معتمة، زجاجات بلاستيكية متوافقة مع الأدوية والتجميل، ومضخات وسدادات محكمة.",
    features: [
      "عبوات زجاجية قطارة وبخاخات أيرلس (Airless Bottles)",
      "بلاستيك طبي وغذائي عالي الكثافة (HDPE / PET)",
      "طباعة حرارية وسلك سكرين عالية المتانة ومقاومة للمذيبات",
      "فحص مسبق لمدى توافق العبوة مع كيميائية المادة المخزنة"
    ],
    color: "from-sky-500 to-blue-700",
    image: "https://images.unsplash.com/photo-1556760544-74068565f05c?w=900&q=80",
    badge: "جودة التغليف"
  },
];

const pillars = [
  { icon: Award, title: "جودة معملية موثقة", desc: "جميع الخامات خاضعة لفحص النقاء وتطابق الدستور الدوائي والتجميلي." },
  { icon: Users, title: "شريك لأكثر من 500 مصنع ومعمل", desc: "ثقة متجددة من أكبر مصانع مستحضرات التجميل والصيدليات في مصر." },
  { icon: Rocket, title: "جاهزية فورية وسرعة شحن", desc: "مستودعات مركزية تضمن جاهزية البضاعة وشحنها فور اعتماد أمر التوريد." },
  { icon: Handshake, title: "دعم كيميائي مستمر", desc: "استشارات ومتابعة فنية مجانية بعد البيع لضمان نجاح تشغيل الخامات." },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      
      {/* ── Cinematic Hero ── */}
      <section className="relative bg-gradient-to-l from-[#070e22] via-[#0d1b3e] to-[#070e22] text-white overflow-hidden py-20 md:py-28 border-b border-cyan-500/20">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=1600&q=70"
            alt="Chemical Industrial Facility"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              خدمات صناعية متكاملة B2B
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4">
              حلول التوريد والتصنيع{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-300 to-sky-400">
                لمصانع الكيماويات ومستحضرات التجميل
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mb-8">
              من توفير المواد الخام النقية مع شهادات التحليل، إلى تطوير التركيبات والتصنيع لحساب الغير، نرافقك في كل خطوة لبناء منتج منافس عالمياً.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("مرحباً، أود استشارة حول خدمات ألفا بريز الصناعية")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/25 transition-all text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                استشارة فورية عبر واتساب
              </a>
              <Link
                href="/shop"
                className="flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/20 transition-all text-sm"
              >
                <FlaskConical className="w-4 h-4 text-cyan-400" />
                استعراض كتالوج المواد الخام
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Pillars ── */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Detailed Services Grid ── */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-cyan-600 font-bold text-xs uppercase tracking-widest block mb-2">منظومة العمل</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
            خدمات متخصصة تدعم دورة إنتاجك بالكامل
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            صممنا باقة خدماتنا لتلبي احتياجات المختبرات الصغيرة وحتى كبرى خطوط الإنتاج الصناعي.
          </p>
        </div>

        <div className="space-y-12">
          {services.map((svc, index) => (
            <motion.div
              key={svc.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                
                {/* Photo Col */}
                <div className={`lg:col-span-5 relative min-h-[260px] lg:min-h-full ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow">
                    {svc.badge}
                  </span>
                </div>

                {/* Content Col */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center">
                        <svc.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full">
                        خدمة رقم 0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-3 leading-snug">
                      {svc.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {svc.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                      {svc.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`أود الاستفسار وطلب تسعير بخصوص خدمة: ${svc.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      طلب استشارة بخصوص هذه الخدمة
                    </a>
                    <Link
                      href="/contact"
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:border-cyan-500 hover:text-cyan-600 text-xs font-semibold transition-colors"
                    >
                      <span>نموذج طلب التسعير الرسمي</span>
                      <ChevronLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="bg-gradient-to-l from-[#070e22] to-[#0d1b3e] py-16 text-white border-t border-cyan-500/20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <ShieldCheck className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-4xl font-black mb-3">
            هل لديك خطة إنتاج تحتاج إلى خامات أو دعم معملي؟
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            مهندسونا الكيميائيون جاهزون لتقديم المشورة وتوفير عينات للتجربة المخبرية بأسعار الجملة.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("مرحباً، أود استشارة مهندس كيميائي من ألفا بريز")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              تحدث مباشرة مع فريق الدعم الفني
            </a>
            <Link
              href="/shop"
              className="flex items-center gap-2 px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-semibold rounded-xl text-sm border border-cyan-500/40 transition-all"
            >
              <FlaskConical className="w-4 h-4" />
              تصفح الكتالوج (+431 مادة)
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
