import type { Metadata } from "next";
import ServicesPage from "@/components/services/ServicesPage";

export const metadata: Metadata = {
  title: "خدماتنا",
  description: "اكتشف خدمات ألفا بريز المتكاملة - توريد خامات تجميل، تصنيع برايفت ليبل، تطوير تركيبات، حلول تعبئة وتغليف",
};

export default function Page() {
  return <ServicesPage />;
}
