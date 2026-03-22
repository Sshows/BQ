import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cases from "@/components/sections/Cases";

export const metadata: Metadata = {
  title: "Cases | BQ",
  description:
    "Отдельная страница с кейсами BQ: wedding, original-проекты и подкаст-интервью.",
};

export default function CasesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <Cases
          id="cases-page"
          eyebrow="Cases"
          title="Кейсы BQ"
          description="Отдельная страница с нашими проектами, чтобы открывалось как полноценная вкладка сайта, а не переходом к блоку на главной."
        />
      </main>
      <Footer />
    </>
  );
}
