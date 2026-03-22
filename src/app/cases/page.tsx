import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Cases from "@/components/sections/Cases";
import { WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Кейсы",
  description:
    "Подборка ключевых кейсов BQ с отдельными страницами: wedding-съемка, оригинальный сериал и студийный подкаст.",
};

export default function CasesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-bq-black pt-24">
        <section className="section-pad pb-10">
          <div className="container-bq max-w-4xl text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-bq-accent">
              Кейсы
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Работы, по которым
              <br />
              видно подход BQ
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-bq-muted">
              Здесь собраны три разных формата: свадебная история,
              оригинальный сериал и подкаст. Теперь каждый кейс открывается как
              отдельная страница, чтобы проект выглядел не как карточка, а как
              полноценная работа с результатом и контекстом.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/#consult" className="btn btn-primary">
                Обсудить проект
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Написать в WhatsApp
              </a>
            </div>
          </div>
        </section>

        <Cases
          id="cases-page"
          eyebrow="Избранное"
          title="Три формата, три разные задачи"
          description="От личной истории до сериального контента и студийной записи. Каждая карточка теперь ведет в отдельный кейс, где проект раскрыт глубже."
        />
      </main>
      <Footer />
    </>
  );
}
