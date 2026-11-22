import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل معنا | AlphaBreeze",
  description: "تواصل مع فريق ألفا بريز لأي استفسارات أو طلبات تخص خدماتنا ومنتجاتنا.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
