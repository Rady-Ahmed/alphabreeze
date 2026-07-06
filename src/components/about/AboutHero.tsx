"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 gradient-primary" />
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }} />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-sky-300 font-semibold text-sm mb-2 block">من نحن</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            تعرف على <span className="text-sky-300">ألفا بريز</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            الشريك الرائد لرواد الأعمال ومصنعي مستحضرات التجميل وأصحاب العلامات التجارية في مصر
          </p>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60L1440 60V30C1200 50 960 10 720 30C480 50 240 10 0 30V60Z" fill="white"/></svg>
      </div>
    </section>
  );
}
