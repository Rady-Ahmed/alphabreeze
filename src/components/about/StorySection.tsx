"use client";

import { motion } from "framer-motion";

export default function StorySection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-sky-500 font-bold text-sm mb-3 block uppercase tracking-wider">قصتنا</span>
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 leading-tight">رحلة النجاح والتميز</h2>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed text-lg">
                بدأت رحلة ألفا بريز برؤية واضحة: أن نكون الشريك الأول والأفضل لكل من يسعى للنجاح في صناعة مستحضرات التجميل. 
                من بداية متواضعة إلى شركة رائدة في مجال توريد خامات التجميل وخدمات التصنيع.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                نؤمن بأن كل علامة تجارية تستحق أن تحصل على أفضل الخامات وأعلى جودة تصنيع. 
                لذلك نعمل بجد لتوفير حلول متكاملة تغطي جميع احتياجات عملائنا لضمان تميزهم في السوق.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg font-medium border-r-4 border-sky-400 pr-4 mt-6">
                اليوم، نفخر بثقة مئات العملاء الذين اختارونا شريكاً لنجاحهم، 
                ونستمر في التطور والابتكار لتقديم أفضل الخدمات والمنتجات.
              </p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative z-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-navy-100 rounded-full blur-3xl -z-10" />
              
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200/50 border-8 border-white group">
                <img 
                  src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1000&auto=format&fit=crop" 
                  alt="AlphaBreeze Factory" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-60" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-3xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-xl shadow-sky-500/20 transform rotate-3 hover:rotate-0 transition-transform">
                <div className="text-white text-center">
                  <p className="text-4xl font-black mb-1">+10</p>
                  <p className="text-sm font-semibold">سنوات خبرة</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
