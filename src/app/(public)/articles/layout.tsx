import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المقالات | AlphaBreeze",
  description: "اقرأ أحدث المقالات والنصائح في مجال صناعة مستحضرات التجميل.",
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
