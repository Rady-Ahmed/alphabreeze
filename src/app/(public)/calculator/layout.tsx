import { Metadata } from "next";

export const metadata: Metadata = {
  title: "حاسبة التركيبات وأوامر الشراء لمصانع التجميل | AlphaBreeze",
  description: "أداة تفاعلية لحساب كميات الخامات الكيميائية وأوزان التشغيلات (Batch Size) ونسب الخلط الدقيقة وتصدير أوامر الشراء B2B مباشرة عبر واتساب.",
  keywords: [
    "حاسبة تركيبات تجميل",
    "حساب كميات المواد الخام",
    "Cosmetic Batch Calculator",
    "حساب نسب الخامات",
    "توريد خامات تجميل بالجملة",
    "AlphaBreeze",
  ],
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
