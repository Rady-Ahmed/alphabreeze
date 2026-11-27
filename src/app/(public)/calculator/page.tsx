"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Calculator,
  FlaskConical,
  Sparkles,
  ArrowRight,
  Package,
  Layers,
  CheckCircle2,
  Share2,
  Download,
  MessageCircle,
  Plus,
  Trash2,
  RefreshCw,
  Scale,
  DollarSign,
  ChevronLeft
} from "lucide-react";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "201119446474";

interface FormulaItem {
  id: string;
  name: string;
  phase: "A" | "B" | "C"; // A: Water, B: Oil, C: Cool down / Actives
  percentage: number;
  cas?: string;
  estimatedPriceKg?: number; // EGP per kg
}

interface FormulaTemplate {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  recommendedBatchKg: number;
  items: FormulaItem[];
  instructions: string[];
}

const FORMULA_TEMPLATES: FormulaTemplate[] = [
  {
    id: "vitamin-c-serum",
    title: "سيروم فيتامين C ومضادات الأكسدة الفائقة",
    subtitle: "تركيبة مائية خفيفة سريعة الامتصاص لحماية البشرة وتوحيد لونها",
    category: "عناية بالبشرة (سيروم)",
    recommendedBatchKg: 50,
    items: [
      { id: "1", name: "ماء مقطر منزوع الأيونات (Distilled Water)", phase: "A", percentage: 80.0, estimatedPriceKg: 5 },
      { id: "2", name: "جلسرين نباتي نقي USP Grade", phase: "A", percentage: 3.5, estimatedPriceKg: 95 },
      { id: "3", name: "دي-بانثينول برو فيتامين B5", phase: "A", percentage: 2.0, estimatedPriceKg: 580 },
      { id: "4", name: "فيتامين C نقي 99.5% (L-Ascorbic Acid)", phase: "C", percentage: 10.0, estimatedPriceKg: 650 },
      { id: "5", name: "حمض الهيالورونيك فائق النقاوة (وزن جزيئي منخفض)", phase: "A", percentage: 1.0, estimatedPriceKg: 1800 },
      { id: "6", name: "مونو بروبيلين جلايكول (MPG) - مذيب ومرطب", phase: "A", percentage: 2.5, estimatedPriceKg: 135 },
      { id: "7", name: "فينوكسي إيثانول - مادة حافظة آمنة", phase: "C", percentage: 1.0, estimatedPriceKg: 280 },
    ],
    instructions: [
      "الطور A: قم بإذابة حمض الهيالورونيك والجلسرين والبانثينول في الماء المقطر مع التقليب لمدة 20 دقيقة حتى الحصول على هلام متجانس تماماً.",
      "الطور C: يتم تذويب بودرة فيتامين C في جزء صغير من الماء البارد أو مونو بروبيلين جلايكول ثم إضافته على البارد (أقل من 35° مئوية) لمنع تفكك الفيتامين.",
      "إضافة المادة الحافظة وضبط الرقم الهيدروجيني (pH) ليكون بين 3.2 إلى 3.6 لضمان أعلى ثباتية وامتصاص جلدي."
    ]
  },
  {
    id: "barrier-hydrating-cream",
    title: "كريم الترطيب الفائق واستعادة حاجز البشرة",
    subtitle: "مستحلب غني بحمض الهيالورونيك، زبدة الشيا، وزيت الأرجان",
    category: "كريمات ومستحلبات",
    recommendedBatchKg: 100,
    items: [
      { id: "1", name: "ماء مقطر (Distilled Water)", phase: "A", percentage: 67.0, estimatedPriceKg: 5 },
      { id: "2", name: "جلسرين نباتي نقي", phase: "A", percentage: 4.0, estimatedPriceKg: 95 },
      { id: "3", name: "دي-بانثينول (B5)", phase: "A", percentage: 2.0, estimatedPriceKg: 580 },
      { id: "4", name: "زيت أرجان مغربي بكر نقي", phase: "B", percentage: 5.0, estimatedPriceKg: 420 },
      { id: "5", name: "زيت جوجوبا ذهبي معصور على البارد", phase: "B", percentage: 4.0, estimatedPriceKg: 380 },
      { id: "6", name: "زبدة الشيا العضوية النقية", phase: "B", percentage: 4.0, estimatedPriceKg: 240 },
      { id: "7", name: "لانيت 16 (Lanette 16 - كحول سيتيلي)", phase: "B", percentage: 3.5, estimatedPriceKg: 160 },
      { id: "8", name: "مستحلب GMS (Glyceryl Monostearate)", phase: "B", percentage: 4.0, estimatedPriceKg: 140 },
      { id: "9", name: "أيزوبروبيل ميريستات (IPM)", phase: "B", percentage: 3.5, estimatedPriceKg: 210 },
      { id: "10", name: "حمض الهيالورونيك النقي", phase: "C", percentage: 1.0, estimatedPriceKg: 1800 },
      { id: "11", name: "فيتامين E النقي (Tocopherol)", phase: "C", percentage: 1.0, estimatedPriceKg: 620 },
      { id: "12", name: "مادة حافظة تجميلية", phase: "C", percentage: 1.0, estimatedPriceKg: 280 },
    ],
    instructions: [
      "تسخين الطور المائي (A) حتى درجة حرارة 75° مئوية.",
      "تسخين الطور الزيتي والمستحلبات (B) في وعاء منفصل حتى 75° مئوية حتى تمام ذوبان الشموع والزبدة.",
      "إضافة الطور الزيتي إلى الطور المائي بالتدريج مع التشغيل الفوري للمجنس (Homogenizer) لمدة 5 إلى 8 دقائق على سرعة عالية.",
      "تبريد المستحلب ببطء مع التقليب المستمر، وعند وصول الحرارة إلى 40° مئوية يتم إضافة الطور (C) ومضادات الأكسدة والمادة الحافظة."
    ]
  },
  {
    id: "conditioning-hair-balm",
    title: "بلسم الشعر المعالج الكاتيوني بـ BTMS والزيوت",
    subtitle: "تركيبة ترطيب وتنعيم الشعر وإزالة الشحنات الساكنة وفك التشابك",
    category: "عناية بالشعر",
    recommendedBatchKg: 100,
    items: [
      { id: "1", name: "ماء مقطر (Distilled Water)", phase: "A", percentage: 76.5, estimatedPriceKg: 5 },
      { id: "2", name: "جلسرين نباتي", phase: "A", percentage: 3.0, estimatedPriceKg: 95 },
      { id: "3", name: "مستحلب كاتيوني BTMS-50", phase: "B", percentage: 4.5, estimatedPriceKg: 380 },
      { id: "4", name: "كحول سيتيلي (Lanette 16)", phase: "B", percentage: 3.5, estimatedPriceKg: 160 },
      { id: "5", name: "زيت جوز هند بكر نقي", phase: "B", percentage: 4.0, estimatedPriceKg: 190 },
      { id: "6", name: "زيت لوز حلو نقي", phase: "B", percentage: 3.0, estimatedPriceKg: 220 },
      { id: "7", name: "زيت خروع طبيعي نقي", phase: "B", percentage: 2.0, estimatedPriceKg: 160 },
      { id: "8", name: "دي-بانثينول (مرطب الشعر)", phase: "C", percentage: 1.5, estimatedPriceKg: 580 },
      { id: "9", name: "فيتامين E نقي", phase: "C", percentage: 0.5, estimatedPriceKg: 620 },
      { id: "10", name: "زيت عطري مركز (لافندر / ياسمين)", phase: "C", percentage: 0.5, estimatedPriceKg: 850 },
      { id: "11", name: "مادة حافظة", phase: "C", percentage: 1.0, estimatedPriceKg: 280 },
    ],
    instructions: [
      "تسخين الماء والجلسرين إلى 75° مئوية.",
      "إذابة BTMS والكحول السيتيلي والزيوت معاً عند 75° مئوية.",
      "دمج الطورين بالمجنس، وتركه يبرد ثم إضافة البانثينول والعطر والمادة الحافظة وضبط الـ pH عند 4.5 إلى 5.0."
    ]
  },
  {
    id: "soothing-aloe-gel",
    title: "جل الصبار الطبيعي النشط (Aloe Vera Hydro-Gel)",
    subtitle: "جل هيدروفيلي فائق الترطيب والتهدئة لتهيج البشرة بعد الحلاقة والشمس",
    category: "جل وهلاميات",
    recommendedBatchKg: 50,
    items: [
      { id: "1", name: "ماء مقطر (Distilled Water)", phase: "A", percentage: 84.0, estimatedPriceKg: 5 },
      { id: "2", name: "خلاصة صبار نقية مركزة (Aloe Vera)", phase: "A", percentage: 8.0, estimatedPriceKg: 180 },
      { id: "3", name: "جلسرين نباتي", phase: "A", percentage: 3.0, estimatedPriceKg: 95 },
      { id: "4", name: "كاربابول 940 (Carbopol Polymer)", phase: "A", percentage: 0.8, estimatedPriceKg: 460 },
      { id: "5", name: "ثلاثي إيثانول أمين (TEA) لضبط القوام والـ pH", phase: "B", percentage: 0.8, estimatedPriceKg: 180 },
      { id: "6", name: "دي-بانثينول (B5)", phase: "C", percentage: 1.4, estimatedPriceKg: 580 },
      { id: "7", name: "مادة حافظة تجميلية", phase: "C", percentage: 1.0, estimatedPriceKg: 280 },
      { id: "8", name: "زيت شجرة الشاي (مضاد بكتيري)", phase: "C", percentage: 1.0, estimatedPriceKg: 650 },
    ],
    instructions: [
      "نثر الكاربابول ببطء على سطح الماء مع التقليب السريع المستمر حتى يتشرب تماماً بدون كتل (لمدة ساعتين).",
      "إضافة الجلسرين وخلاصة الصبار والبانثينول.",
      "إضافة قطرات الـ TEA تدريجياً حيث يتحول الخليط فوراً إلى جل زجاجي ناصع القوام (pH 6.0).",
      "إضافة زيت شجرة الشاي والمادة الحافظة والتقليب الهادئ لمنع احتباس فقاعات الهواء."
    ]
  }
];

export default function FormulationCalculatorPage() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(FORMULA_TEMPLATES[0].id);
  const [batchKg, setBatchKg] = useState<number>(FORMULA_TEMPLATES[0].recommendedBatchKg);
  const [customItems, setCustomItems] = useState<FormulaItem[]>(FORMULA_TEMPLATES[0].items);

  const activeTemplate = useMemo(() => {
    return FORMULA_TEMPLATES.find((t) => t.id === selectedTemplateId) || FORMULA_TEMPLATES[0];
  }, [selectedTemplateId]);

  const handleTemplateChange = (tmplId: string) => {
    setSelectedTemplateId(tmplId);
    const tmpl = FORMULA_TEMPLATES.find((t) => t.id === tmplId);
    if (tmpl) {
      setBatchKg(tmpl.recommendedBatchKg);
      setCustomItems([...tmpl.items]);
    }
  };

  // Calculations
  const calculations = useMemo(() => {
    let totalPercentage = 0;
    let totalEstimatedCost = 0;

    const itemsWithAmounts = customItems.map((item) => {
      totalPercentage += item.percentage;
      const weightKg = (item.percentage / 100) * batchKg;
      const weightGrams = weightKg * 1000;
      const cost = weightKg * (item.estimatedPriceKg || 0);
      totalEstimatedCost += cost;

      return {
        ...item,
        weightKg: Number(weightKg.toFixed(3)),
        weightGrams: Number(weightGrams.toFixed(1)),
        cost: Math.round(cost),
      };
    });

    const costPerKg = batchKg > 0 ? Math.round(totalEstimatedCost / batchKg) : 0;

    return {
      items: itemsWithAmounts,
      totalPercentage: Number(totalPercentage.toFixed(2)),
      totalEstimatedCost: Math.round(totalEstimatedCost),
      costPerKg,
    };
  }, [customItems, batchKg]);

  // Update single ingredient percentage
  const handleUpdatePercentage = (id: string, newPct: number) => {
    setCustomItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, percentage: Math.max(0, newPct) } : it))
    );
  };

  // Export to WhatsApp as official Bulk RFQ
  const handleGenerateRfq = () => {
    let message = `*طلب توريد خامات كيميائية لحجم تشغيلة (${batchKg} كجم)*\n`;
    message += `• التركيبة: ${activeTemplate.title}\n`;
    message += `• الوزن الإجمالي للدفعة: ${batchKg} كجم\n\n`;
    message += `*قائمة الخامات والكميات المطلوبة بالتحديد:*\n`;

    calculations.items.forEach((it, i) => {
      message += `${i + 1}. ${it.name}\n   - النسبة: ${it.percentage}%\n   - الكمية: ${it.weightKg} كجم (${it.weightGrams} جم)\n`;
    });

    message += `\n• تكلفة الخامات التقديرية: حوالي ${calculations.totalEstimatedCost.toLocaleString("ar-EG")} ج.م\n`;
    message += `يرجى إرسال عرض السعر النهائي متضمناً شهادات التحليل COA ومواعيد التسليم لمصنعنا.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
    toast.success("تم تجهيز أمر التوريد وجاري الفتح في واتساب!");
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20" dir="rtl">
      
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-l from-[#070e22] via-[#0d1b3e] to-[#070e22] text-white py-16 md:py-24 overflow-hidden border-b border-cyan-500/20">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-4">
            <Calculator className="w-4 h-4" />
            أداة كيميائيي ومصنعي التجميل B2B
          </div>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight mb-4">
            حاسبة التركيبات وأوامر الشراء{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-300 to-sky-400">
              لمصانع الكيماويات
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            حدد حجم التشغيلة الإنتاجية (بالكيلوجرام)، لتحسب لك الأداة فوراً أوزان المواد الخام الدقيقة، تكاليف الخامات، وتصدر لك أمر شراء وتوريد معتمد بضغطة زر.
          </p>
        </div>
      </section>

      {/* ── Main Workspace ── */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        
        {/* Template Selector Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-200/80 mb-8">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
            اختر تركيبة نموذجية معتمدة معملياً:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {FORMULA_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => handleTemplateChange(tmpl.id)}
                className={`p-4 rounded-2xl text-right transition-all border flex flex-col justify-between ${
                  selectedTemplateId === tmpl.id
                    ? "bg-gradient-to-l from-cyan-500/10 to-sky-500/5 border-cyan-500 text-cyan-950 shadow-md ring-1 ring-cyan-500/30"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 mb-2 inline-block">
                    {tmpl.category}
                  </span>
                  <h4 className="font-bold text-sm leading-snug mb-1">{tmpl.title}</h4>
                </div>
                <span className="text-[11px] text-slate-400 mt-2 block">
                  دفعة قياسية: {tmpl.recommendedBatchKg} كجم
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Calculator Control Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Main Ingredients & Phases Table (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
            
            {/* Header info & Batch Weight Input */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">{activeTemplate.title}</h2>
                <p className="text-xs text-slate-500 mt-1">{activeTemplate.subtitle}</p>
              </div>

              {/* Batch Size Quick Control */}
              <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 shrink-0">
                <span className="text-xs font-bold text-slate-700 px-2">حجم التشغيلة:</span>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={batchKg}
                  onChange={(e) => setBatchKg(Math.max(1, Number(e.target.value)))}
                  className="w-20 h-9 rounded-xl border border-slate-200 text-center font-mono font-bold text-sm bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <span className="text-xs font-bold text-slate-500 pl-2">كجم</span>
              </div>
            </div>

            {/* Percentage Validation Alert */}
            {calculations.totalPercentage !== 100 && (
              <div className="mb-6 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                <span className="font-bold">تنبيه معملي:</span>
                <span>إجمالي النسب الحالية ({calculations.totalPercentage}%)، يجب أن يكون المجموع 100% لضمان توازن التركيبة.</span>
              </div>
            )}

            {/* Ingredients Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">الطور</th>
                    <th className="py-3 px-3">المادة الخام الكيميائية</th>
                    <th className="py-3 px-3">النسبة (%)</th>
                    <th className="py-3 px-3">الوزن المطلوب</th>
                    <th className="py-3 px-3">بالجرام (g)</th>
                    <th className="py-3 px-3">تكلفة تقريبية</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {calculations.items.map((item) => {
                    const phaseBadge =
                      item.phase === "A"
                        ? "bg-cyan-100 text-cyan-800"
                        : item.phase === "B"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-purple-100 text-purple-800";

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition">
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${phaseBadge}`}>
                            طور {item.phase}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-800">
                          {item.name}
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              max="100"
                              value={item.percentage}
                              onChange={(e) => handleUpdatePercentage(item.id, Number(e.target.value))}
                              className="w-16 h-7 rounded-lg border border-slate-200 text-center font-mono font-bold text-xs bg-slate-50 focus:bg-white"
                            />
                            <span className="text-slate-400 font-mono">%</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-cyan-700">
                          {item.weightKg} كجم
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-500">
                          {item.weightGrams.toLocaleString("ar-EG")} جم
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-700">
                          {item.cost.toLocaleString("ar-EG")} ج.م
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Operating Instructions */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                طريقة التحضير والخلط المعملي (SOP):
              </h3>
              <div className="space-y-2.5">
                {activeTemplate.instructions.map((inst, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold text-[10px] shrink-0">
                      {i + 1}
                    </span>
                    <p className="leading-relaxed">{inst}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right / Cost Summary & WhatsApp RFQ CTA (4 cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            
            {/* Summary Box */}
            <div className="bg-[#070e22] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-cyan-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-base font-bold text-cyan-300 mb-6 flex items-center gap-2">
                <Scale className="w-5 h-5 text-cyan-400" />
                ملخص أمر التوريد والتشغيلة
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-slate-400">إجمالي وزن الخامات المطلوبة:</span>
                  <span className="font-mono font-bold text-white text-sm">{batchKg} كجم</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-slate-400">عدد المواد الخام:</span>
                  <span className="font-mono font-bold text-white text-sm">{customItems.length} مواد</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-slate-400">متوسط تكلفة الكيلو جرام:</span>
                  <span className="font-mono font-bold text-cyan-300 text-sm">~ {calculations.costPerKg} ج.م / كجم</span>
                </div>

                <div className="pt-2">
                  <span className="text-slate-400 block mb-1">إجمالي تكلفة الخامات التقديرية:</span>
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-l from-cyan-300 to-sky-400 font-mono">
                    {calculations.totalEstimatedCost.toLocaleString("ar-EG")} ج.م
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    * الأسعار خاضعة للتخفيض حسب حجم الكميات الإجمالية
                  </span>
                </div>
              </div>

              {/* Main Action: WhatsApp Bulk RFQ */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={handleGenerateRfq}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/25 transition-all text-xs sm:text-sm cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>تصدير كأمر شراء رسمي عبر واتساب</span>
                </button>

                <Link
                  href="/shop"
                  className="w-full flex items-center justify-center gap-1.5 py-3 px-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-2xl border border-white/10 transition text-xs"
                >
                  <FlaskConical className="w-4 h-4 text-cyan-400" />
                  <span>تصفح خامات بديلة في الكتالوج</span>
                </Link>
              </div>
            </div>

            {/* Quality Assurance Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm text-xs space-y-3">
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-600" />
                ضمانات ألفا بريز للمصانع
              </h4>
              <p className="text-slate-500 leading-relaxed">
                جميع الخامات المحسوبة في هذه التركيبة مطابقة للمواصفات الدوائية والتجميلية العالمية وتأتي مع شهادات تحليل مخبري COA معتمدة لكل تشغيلة.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
