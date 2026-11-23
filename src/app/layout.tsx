import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/seo/JsonLd";

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
  metadataBase: new URL("https://alphabreeze.vercel.app"),
  title: {
    default: "Alpha Breeze Chemicals | توريد وتوزيع المواد الخام الكيميائية B2B",
    template: "%s | Alpha Breeze Chemicals",
  },
  description:
    "شركة ألفا بريز (Alpha Breeze) - المورد المعتمد للمواد الخام الكيميائية والمكونات الفعالة لمصانع مستحضرات التجميل، معامل التركيبات ومطوري التركيبات في مصر والشرق الأوسط مع شهادات التحليل المعتمدة.",
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
    url: "https://alphabreeze.vercel.app",
    siteName: "Alpha Breeze Chemicals",
    title: "Alpha Breeze Chemicals | توريد وتوزيع المواد الخام الكيميائية B2B",
    description: "أكثر من 431 مادة خام كيميائية وتجميلية معتمدة مع شهادات التحليل COA و MSDS وخدمات التصنيع للغير.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://alphabreeze.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${cairo.variable}`} suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className="font-arabic antialiased" suppressHydrationWarning>
        <Analytics />
        <Toaster position="top-center" richColors />
        {children}
      </body>
    </html>
  );
}
