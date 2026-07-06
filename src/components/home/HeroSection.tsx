"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, FlaskConical, Atom, Star, Zap, Shield, Award } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          let start = 0;
          const duration = 2000;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, started]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Animated particles/shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-navy-900/10 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0], x: [0, -20, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl"
          animate={{ y: [0, -40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Floating decorative icons */}
        <motion.div
          className="absolute top-32 left-[15%] text-white/10"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FlaskConical className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-[20%] text-white/10"
          animate={{ y: [0, -15, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <Atom className="w-20 h-20" />
        </motion.div>
        <motion.div
          className="absolute top-[40%] left-[10%] text-white/10"
          animate={{ y: [0, -25, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Sparkles className="w-12 h-12" />
        </motion.div>

        {/* Particle dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 16}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }} />

      <div className="container mx-auto px-4 relative z-10 pt-24 pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content (Right side in RTL) */}
          <div className="flex-1 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                  <Sparkles className="w-4 h-4 text-sky-300" />
                </motion.div>
                <span className="text-sm text-white/90">الشريك الرائد في صناعة التجميل</span>
              </motion.div>

              {/* Headline */}
              <div className="relative">
                <motion.div 
                  className="absolute -inset-1 rounded-lg bg-gradient-to-r from-sky-300 via-white to-sky-300 opacity-20 blur-lg"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "200% 200%" }}
                />
                <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="block"
                  >
                    شريك نجاحك في{" "}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-white drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                  >
                    صناعة التجميل
                  </motion.span>{" "}
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    والخامات
                  </motion.span>
                </h1>
              </div>

              {/* Subheadline */}
              <motion.p
                className="text-lg md:text-xl text-sky-50 mb-8 leading-relaxed max-w-2xl font-medium drop-shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                نجمع بين الفخامة والدقة العلمية. نوفر لك أجود الخامات التجميلية، خدمات التصنيع المتكاملة (Private Label)، وتطوير التركيبات لبناء علامتك التجارية بامتياز.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <Link href="/shop">
                  <Button size="lg" className="bg-white text-navy-900 hover:bg-sky-50 shadow-xl shadow-white/20 hover:shadow-2xl text-base px-8 group h-14">
                    تسوق الآن
                    <motion.span className="inline-block" animate={{ x: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <ArrowLeft className="w-5 h-5 mr-2" />
                    </motion.span>
                  </Button>
                </Link>
                <a href="https://wa.me/201119446474?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A9%20%D8%A7%D9%84%D8%AA%D8%B5%D9%86%D9%8A%D8%B9%20(Private%20Label)" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-base px-8 h-14">
                    طلب خدمة تصنيع
                  </Button>
                </a>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                {[
                  { target: 500, suffix: "+", label: "عميل سعيد", icon: Star },
                  { target: 200, suffix: "+", label: "منتج", icon: Zap },
                  { target: 10, suffix: "+", label: "سنوات خبرة", icon: Shield },
                  { target: 50, suffix: "+", label: "براند ناجح", icon: Award },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {i > 0 && <div className="w-px h-10 bg-white/20 hidden sm:block" />}
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-bold text-white">
                        <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                      </p>
                      <p className="text-xs text-white/60 flex items-center gap-1 justify-center">
                        <stat.icon className="w-3 h-3" />
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Image Content (Left side in RTL) */}
          <motion.div 
            className="flex-1 hidden lg:block relative w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 50 }}
          >
            <div className="relative w-full max-w-[550px] aspect-square mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/30 to-white/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute inset-4 bg-white/10 rounded-[3rem] backdrop-blur-sm border border-white/20 transform rotate-6" />
              <img 
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop" 
                alt="منتجات تجميل طبيعية" 
                className="w-full h-full object-cover rounded-[3rem] border-8 border-white/20 shadow-2xl relative z-10 transform -rotate-3 hover:rotate-0 transition-transform duration-500" 
              />
              {/* Floating Badge */}
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-2xl z-20 border border-gray-100 flex items-center gap-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-sky-500" />
                </div>
                <div>
                  <p className="font-bold text-navy-900">جودة معتمدة</p>
                  <p className="text-xs text-gray-500">مكونات طبيعية 100%</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
