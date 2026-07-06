"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Zap, Gift, Star } from "lucide-react";

const promotions = [
  {
    badge: "خصم 25%",
    icon: Zap,
    title: "عرض خامات التجميل",
    description: "خصم حصري 25% على جميع الخامات الطبيعية والزيوت العطرية المختارة لفترة محدودة فقط!",
    items: ["زيوت طبيعية", "زبدات نباتية", "مواد فعالة"],
    buttonLabel: "تسوق الآن",
    href: "/shop",
    gradient: "from-sky-500 via-sky-600 to-blue-700",
    glow: "bg-sky-300/20",
    btnClass: "bg-white text-sky-700 hover:bg-sky-50",
  },
  {
    badge: "عرض خاص",
    icon: Gift,
    title: "خدمة برايفت ليبل",
    description: "ابدأ علامتك التجارية الخاصة! خصم مميز على أول طلب تصنيع Private Label مع دعم مجاني من خبرائنا.",
    items: ["تصنيع كامل", "تغليف مميز", "دعم فني"],
    buttonLabel: "احجز استشارة مجانية",
    href: "/shop",
    gradient: "from-violet-600 via-purple-700 to-indigo-800",
    glow: "bg-purple-300/20",
    btnClass: "bg-sky-400 text-white hover:bg-sky-300",
  },
  {
    badge: "توصيل مجاني",
    icon: Star,
    title: "عروض الشحن المجاني",
    description: "احصل على شحن مجاني لأي طلب يتخطى 500 جنيه! اغتنم الفرصة واملأ سلتك من أجود الخامات.",
    items: ["طلب +500 جنيه", "التوصيل لجميع المحافظات", "ضمان الجودة"],
    buttonLabel: "تسوق الآن",
    href: "/shop",
    gradient: "from-emerald-500 via-green-600 to-teal-700",
    glow: "bg-emerald-300/20",
    btnClass: "bg-white text-emerald-700 hover:bg-emerald-50",
  },
];

export default function PromotionsSection() {
  return (
    <section className="py-20 bg-gray-50" id="promotions">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sky-500 font-bold text-sm mb-3 block uppercase tracking-wider">عروض حصرية</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">العروض والخصومات</h2>
          <p className="text-gray-500 max-w-xl mx-auto">لا تفوت أقوى العروض على خامات ومنتجات التجميل</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {promotions.map((promo, index) => {
            const Icon = promo.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${promo.gradient} p-7 text-white group shadow-xl cursor-pointer`}
              >
                {/* Decorative blobs */}
                <div className={`absolute -top-8 -left-8 w-36 h-36 ${promo.glow} rounded-full blur-2xl`} />
                <div className={`absolute -bottom-8 -right-8 w-48 h-48 ${promo.glow} rounded-full blur-3xl`} />
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
                  backgroundSize: "20px 20px",
                }} />

                <div className="relative z-10">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5 border border-white/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-sm font-bold">{promo.badge}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-white/25 transition-colors">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold mb-3 leading-snug">{promo.title}</h3>
                  <p className="text-white/80 mb-5 text-sm leading-relaxed">{promo.description}</p>

                  {/* Items list */}
                  <ul className="space-y-1.5 mb-6">
                    {promo.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/90">
                        <div className="w-1.5 h-1.5 bg-white rounded-full shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link href={promo.href}>
                    <Button className={`${promo.btnClass} font-bold px-6 h-11 shadow-lg w-full justify-center`}>
                      {promo.buttonLabel}
                      <ArrowLeft className="w-4 h-4 mr-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
