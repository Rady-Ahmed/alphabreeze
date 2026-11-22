import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المتجر | AlphaBreeze",
  description: "تصفح أحدث منتجات وخامات مستحضرات التجميل العالية الجودة من ألفا بريز.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
