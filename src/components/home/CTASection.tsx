"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Rocket } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-accent" />
      
      {/* Animated background elements */}
      <motion.div className="absolute top-10 right-[20%] w-40 h-40 bg-sky-400/10 rounded-full blur-2xl"
        animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity }} />
      <motion.div className="absolute bottom-10 left-[10%] w-60 h-60 bg-white/5 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0] }} transition={{ duration: 7, repeat: Infinity }} />
      
      {/* Grid pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
        backgroundSize: "50px 50px",
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6 border border-white/20"
              whileHover={{ scale: 1.05 }}>
              <Rocket className="w-4 h-4 text-sky-300" />
              <span className="text-sm text-white/90">ابدأ مشروعك اليوم</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              جاهز تبني{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-sky-400">علامتك التجارية</span>
              ؟
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              تواصل معنا الآن واحصل على استشارة مجانية من خبرائنا لمساعدتك في إطلاق منتجاتك
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-navy-900 hover:bg-sky-50 shadow-xl shadow-white/20 px-10 text-base h-14 group">
                  احصل على استشارة مجانية
                  <motion.span animate={{ x: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowLeft className="w-5 h-5 mr-2" />
                  </motion.span>
                </Button>
              </Link>
              <Link href="/shop">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10 text-base h-14">
                  تسوق المنتجات
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
