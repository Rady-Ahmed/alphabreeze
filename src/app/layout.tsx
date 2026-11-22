import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Analytics from "@/components/Analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "arial"],
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: {
    default: "AlphaBreeze | توريد المواد الخام الكيميائية لصناعة التجميل B2B",
    template: "%s | AlphaBreeze Raw Materials",
  },
  description:
    "شركة ألفا بريز (Alpha Breeze) - المورد المعتمد للمواد الخام الكيميائية والمكونات الفعالة لمصانع مستحضرات التجميل، معامل التركيبات ومطوري التركيبات (Formulators) في مصر والشرق الأوسط.",
  keywords: [
    "توريد مواد خام تجميل",
    "مواد خام كيميائية",
    "خامات مستحضرات تجميل",
    "Cosmetic Raw Materials",
    "Chemical Suppliers Egypt",
    "CAS Number",
    "شهادات COA",
    "تصنيع برايفت ليبل",
    "تطوير تركيبات كيميائية",
    "AlphaBreeze",
  ],
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "AlphaBreeze",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${cairo.variable}`} suppressHydrationWarning>
      <body className="font-arabic antialiased" suppressHydrationWarning>
        <Analytics />
        <Toaster position="top-center" richColors />
        {children}
      </body>
    </html>
  );
}
