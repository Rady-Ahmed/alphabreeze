"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  Share2,
  Bookmark,
  MessageCircle,
  FlaskConical,
  ChevronLeft,
  BookOpen,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { getArticles } from "@/lib/db";

const WHATSAPP_NUMBER = "201019946409";

const defaultArticles = [
  {
    id: "1",
    title: "أهم 10 خامات أساسية في صناعة مستحضرات التجميل وكيفية التحقق من شهادة الـ COA",
    category: "خامات تجميل",
    date: "15 نوفمبر 2026",
    readTime: "5 دقائق",
    views: 1250,
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80",
    content: `
      <h2>مقدمة في جودة الخامات الكيميائية</h2>
      <p>تعتمد صناعة مستحضرات التجميل الحديثة على الدقة المتناهية في اختيار المواد الأولية. لا يمكن الحصول على منتج نهائي آمن ومستقر دون التحقق الصارم من شهادة التحليل المخبري (COA - Certificate of Analysis).</p>
      
      <h3>1. مستحلبات القوام (Emulsifiers)</h3>
      <p>تشكل المستحلبات مثل <strong>Cetearyl Alcohol</strong> و <strong>GMS (Glyceryl Monostearate)</strong> حجر الزاوية لربط الطور المائي بالطور الزيتي وضمان عدم انفصال المستحلب عبر الزمن وتحت درجات الحرارة المتغيرة.</p>

      <h3>2. المواد الفعالة عالية النقاء (Active Ingredients)</h3>
      <p>تشمل أحماض الفواكه، حمض الهيالورونيك، والنياسيناميد. يجب التأكد من درجة نقائها (Purity Percentage) التي ينبغي ألا تقل عن 99% في التطبيقات التجميلية الدوائية.</p>

      <h3>3. فحص شهادة التحليل المخبري COA</h3>
      <ul>
        <li>مطابقة رقم التشغيلة (Batch Number) المطبوع على البرميل مع الشهادة.</li>
        <li>فحص تاريخ الإنتاج وتاريخ انتهاء الصلاحية (Shelf Life).</li>
        <li>التحقق من نتائج فحص المعادن الثقيلة (Heavy Metals) مثل الرصاص والزرنيخ.</li>
        <li>التأكد من خلو الشحنة من التلوث الميكروبيولوجي (Total Plate Count).</li>
      </ul>

      <h2>خلاصة وتوصية معملية</h2>
      <p>في معامل وشركة <strong>Alpha Breeze Chemicals</strong>، نقوم بإجراء فحص مطابقة دوري لكل دفعة خامات واردة لمستودعاتنا لضمان استقرار خطوط إنتاج عملائنا في مختلف محافظات مصر.</p>
    `,
    published: true,
  },
  {
    id: "2",
    title: "دليل التصنيع التعاقدي (Private Label): كيف تبدأ خط إنتاج تجميلي ناجح؟",
    category: "تصنيع ومعايير",
    date: "10 نوفمبر 2026",
    readTime: "7 دقائق",
    views: 890,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&q=80",
    content: `
      <h2>ما هو التصنيع للغير (Private Label)؟</h2>
      <p>يتيح لك التصنيع التعاقدي إطلاق علامتك التجارية الخاصة دون الحاجة لتأسيس مصنع متكامل برؤوس أموال ضخمة. تتولى ألفا بريز توفير الخامات وتطوير التركيبة وتعبئتها بأعلى المواصفات.</p>

      <h3>مراحل بناء منتجك:</h3>
      <ol>
        <li><strong>تحديد الجمهور المستهدف والمنتج:</strong> هل هو سيروم للوجه، لوشن للجسم، أم زيت معالج للشعر؟</li>
        <li><strong>تطوير عينة مخبرية (Lab Sample):</strong> إعداد تركيبة تجريبية واختبار قوامها ورائحتها وامتصاصها.</li>
        <li><strong>اختبارات الثبات (Stability Testing):</strong> وضع العينة في أفران تحضين لمحاكاة تغيرات الطقس والتأكد من عدم تغير اللون أو القوام.</li>
        <li><strong>اختيار العبوات وتصميم الهوية:</strong> مراعاة نوع البلاستيك أو الزجاج المناسب لحماية المادة الفعالة.</li>
      </ol>
    `,
    published: true,
  },
  {
    id: "3",
    title: "المستحلبات الشمعية والبوليمرات: الفرق بين BTMS و GMS و Cetearyl Alcohol",
    category: "تركيبات معملية",
    date: "05 نوفمبر 2026",
    readTime: "6 دقائق",
    views: 670,
    image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=1200&q=80",
    content: `
      <h2>المقارنة الكيميائية بين المستحلبات الشائعة</h2>
      <p>يخطئ العديد من المبتدئين في استخدام مستحلبات الشعر مع مستحضرات العناية بالبشرة. نوضح هنا الفروق الكيميائية والتطبيقية بدقة:</p>

      <h3>مستحلب BTMS-50 / BTMS-80</h3>
      <p>مستحلب كاتيوني (Cationic) يحمل شحنة موجبة تجعله مثالياً لمنتجات الشعر مثل البلسم وحمامات الكريم، حيث يرتبط بالشعر ذو الشحنة السالبة ويمنحه ملمساً حريرياً ويمنع التطاير الساكن.</p>

      <h3>مستحلب GMS (Glyceryl Monostearate)</h3>
      <p>مستحلب غير أيوني (Non-ionic) يستخدم بشكل واسع في كريمات ومراهم البشرة كعامل تغليظ ومرطب خفيف، ويتميز بقدرته على تكوين بنية صفائحية تحفظ الرطوبة.</p>
    `,
    published: true,
  },
];

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [article, setArticle] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const dbArticles = await getArticles();
        const pool = (dbArticles && dbArticles.length > 0) ? dbArticles : defaultArticles;
        const found = pool.find((a: any) => String(a.id) === resolvedParams.id) || defaultArticles[0];
        setArticle(found);
        setRelated(pool.filter((a: any) => String(a.id) !== resolvedParams.id).slice(0, 3));
      } catch {
        const found = defaultArticles.find((a) => a.id === resolvedParams.id) || defaultArticles[0];
        setArticle(found);
        setRelated(defaultArticles.filter((a) => a.id !== resolvedParams.id).slice(0, 3));
      }
    }
    load();
  }, [resolvedParams.id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center" dir="rtl">
        <p className="text-slate-500 text-sm">جاري تحميل المقال...</p>
      </div>
    );
  }

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("تم نسخ رابط المقال بنجاح!");
    }
  };

  return (
    <article className="min-h-screen bg-slate-50 pb-20" dir="rtl">
      
      {/* ── Breadcrumb & Top Bar ── */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-cyan-600 transition-colors">الرئيسية</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <Link href="/articles" className="hover:text-cyan-600 transition-colors">المقالات</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-slate-800 font-medium truncate max-w-xs">{article.title}</span>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            مشاركة
          </button>
        </div>
      </div>

      {/* ── Header ── */}
      <header className="bg-gradient-to-l from-[#070e22] to-[#0d1b3e] text-white py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold">
              {article.category}
            </span>
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime || "5 دقائق قراءة"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight text-white mb-6">
            {article.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </header>

      {/* ── Main Content Container ── */}
      <div className="container mx-auto px-4 max-w-4xl -mt-8">
        
        {/* Featured Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-slate-200 border-4 border-white mb-10">
          <img
            src={article.image || "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80"}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-12 mb-12">
          <div
            className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed font-sans
              prose-headings:font-bold prose-headings:text-slate-900 prose-headings:mt-8 prose-headings:mb-4
              prose-p:mb-5 prose-p:leading-8
              prose-ul:list-disc prose-ul:pr-6 prose-ul:mb-6
              prose-ol:list-decimal prose-ol:pr-6 prose-ol:mb-6
              prose-li:mb-2
              prose-strong:text-slate-900"
            dangerouslySetInnerHTML={{ __html: article.content || `<p>${article.excerpt}</p>` }}
          />

          {/* Consultation Box inside Article */}
          <div className="mt-12 p-6 rounded-2xl bg-cyan-50/60 border border-cyan-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">هل تحتاج خامات معتمدة مذكورة في هذا المقال؟</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                تواصل مع فريق الكيميائيين لدينا عبر واتساب للحصول على شهادات التحليل COA وعروض أسعار الجملة.
              </p>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`مرحباً، أقرأ مقال: "${article.title}" وأود الاستفسار عن الخامات المذكورة به`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs shrink-0 transition"
            >
              <MessageCircle className="w-4 h-4" />
              تواصل مع الكيميائي المختص
            </a>
          </div>
        </div>

        {/* ── Related Articles ── */}
        {related.length > 0 && (
          <div className="border-t border-slate-200 pt-10">
            <h3 className="text-xl font-bold text-slate-800 mb-6">مقالات تقنية ذات صلة</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/articles/${item.id}`}
                  className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition p-3 flex flex-col"
                >
                  <div className="aspect-video rounded-xl overflow-hidden bg-slate-100 mb-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-cyan-600 mb-1">{item.category}</span>
                  <h4 className="font-bold text-slate-800 text-xs leading-snug line-clamp-2 group-hover:text-cyan-600 transition-colors mb-2">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 mt-auto">{item.date}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
