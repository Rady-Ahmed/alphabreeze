import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import MobileAppNavBar from "@/components/layout/MobileAppNavBar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen pb-16 md:pb-0">{children}</main>
      <Footer />
      <FloatingButtons />
      <MobileAppNavBar />
    </>
  );
}
