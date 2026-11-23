import { Metadata } from "next";
import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "من نحن — ألفا بريز للمواد الخام الكيميائية",
  description: "تعرف على قصة ألفا بريز، شريكك الموثوق في توريد المواد الخام الكيميائية ومستلزمات التصنيع منذ سنوات.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
