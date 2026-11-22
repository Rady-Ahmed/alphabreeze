"use client";

import { motion } from "framer-motion";
import { FileCheck, ShieldAlert, Award, Microscope, CheckCircle2, FileSpreadsheet } from "lucide-react";

const assurances = [
  {
    icon: FileCheck,
    title: "شهادات تحليل مخبرية (COA) معتمدة",
    desc: "توثيق رسمي صادر لكل دفعة استيرادية يوضح نسب النقاء الفعلي، الكثافة، معامل الانكسار، درجة الانصهار، والرقم الهيدروجيني.",
  },
  {
    icon: ShieldAlert,
    title: "صحائف بيانات سلامة المواد (MSDS / SDS)",
    desc: "وثائق أمان تفصيلية متوافقة مع معايير النظام المنسق عالمياً (GHS) تحدد تعليمات المناولة، التخزين، وشروط السلامة المهنية.",
  },
  {
    icon: Award,
    title: "مطابقة درجات النقاء التجميلية والصيدلانية",
    desc: "خامات مستوردة من كبرى المصانع العالمية معتمدة ومطابقة لمواصفات الدساتير الصيدلانية (USP / BP) واشتراطات هيئة الدواء المصرية.",
  },
  {
    icon: Microscope,
    title: "عينات اختبار معملية للمصانع والتركيبات",
    desc: "نوفر للشركات والمعامل إمكانية طلب عينات فنية مسبقة (Pre-order Samples) للتجربة على خطوط الإنتاج والتحقق من التوافقية قبل الشراء بالجملة.",
  },
];

export default function QualityComplianceSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-navy-950 to-navy-900 text-white relative overflow-hidden" id="quality">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Right Text Block */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/25 text-sky-300 text-xs font-bold mb-4">
                <span>رقابة الجودة والتوافق الفني</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6 leading-tight">
                التزام صارم بأعلى معايير{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-200">
                  الجودة والسلامة الكيميائية
                </span>
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-8">
                ندرك في <strong>Alpha Breeze</strong> أن استقرار منتجك التجميلي ونجاحه في السوق يعتمد بالدرجة الأولى على نقاء المواد الخام وثبات مواصفاتها من دفعة إلى أخرى. لذلك نخضع جميع وارداتنا لإجراءات الفحص والتوثيق المخبري الدقيق.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-sm text-slate-200 font-medium">تتبع أرقام التشغيلات (Batch Tracking & Lot Numbers)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-sm text-slate-200 font-medium">مستودعات تخزين مجهزة وفق اشتراطات الحرارة والرطوبة القياسية</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-sm text-slate-200 font-medium">جاهزية كاملة لملفات التسجيل بوزارة الصحة وهيئة الدواء المصرية (EDA)</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Left Cards Grid */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-5">
              {assurances.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center mb-4 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
