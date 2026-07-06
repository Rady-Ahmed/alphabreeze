import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Analytics from "@/components/Analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AlphaBreeze | شريك نجاحك في صناعة مستحضرات التجميل",
    template: "%s | AlphaBreeze",
  },
  description:
    "ألفا بريز - الشريك الرائد لرواد الأعمال ومصنعي مستحضرات التجميل وأصحاب العلامات التجارية في مصر. خامات تجميل، تصنيع برايفت ليبل، تطوير تركيبات.",
  keywords: [
    "خامات تجميل",
    "تصنيع مستحضرات تجميل",
    "برايفت ليبل",
    "cosmetic raw materials",
    "private label",
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
