import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - الصفحة غير موجودة",
  description: "عذراً، الصفحة التي تبحث عنها غير موجودة",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero opacity-10" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-navy-900/5 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[180px] md:text-[220px] font-black leading-none select-none"
              style={{
                backgroundImage: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 50%, #0f1642 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                opacity: 0.15,
              }}>
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl md:text-9xl">🌬️</span>
          </div>
        </div>

        {/* Text */}
        <div className="mb-10 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
            عذراً! الصفحة غير موجودة
          </h2>
          <p className="text-lg text-gray-500 max-w-md mx-auto leading-relaxed">
            يبدو أن الصفحة التي تبحث عنها قد انتقلت إلى مكان آخر أو لم تعد موجودة.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-lg transition-all duration-300 shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            العودة للرئيسية
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-sky-200 text-sky-600 hover:bg-sky-50 font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 7H4l1-7z" />
            </svg>
            تصفح المتجر
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400 mb-4">روابط سريعة:</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            {[
              { href: "/about", label: "من نحن" },
              { href: "/services", label: "خدماتنا" },
              { href: "/articles", label: "المقالات" },
              { href: "/contact", label: "تواصل معنا" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-500 hover:text-sky-500 transition-colors font-medium hover:underline underline-offset-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
