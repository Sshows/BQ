import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Cases from "@/components/sections/Cases";
import { CASE_STUDIES } from "@/lib/cases";
import { SITE_URL, WHATSAPP_URL } from "@/lib/site";

const CASES_DESCRIPTION =
  "Подборка ключевых кейсов BQ: wedding-съемка, оригинальный сериал и студийный подкаст с отдельными страницами и быстрой заявкой.";

export const metadata: Metadata = {
  title: "Кейсы",
  description: CASES_DESCRIPTION,
  alternates: {
    canonical: "/cases",
  },
  openGraph: {
    title: "Кейсы BQ",
    description: CASES_DESCRIPTION,
    url: `${SITE_URL}/cases`,
    type: "website",
  },
};

const casesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Кейсы BQ",
  itemListElement: CASE_STUDIES.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${SITE_URL}/cases/${item.slug}`,
    name: item.title,
    description: item.cardDescription,
  })),
};

export default function CasesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-bq-black pt-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(casesSchema) }}
        />

        <section className="section-pad pb-10">
          <div className="container-bq max-w-5xl text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-bq-accent">
              Кейсы
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Работы, по которым видно,
              <br />
              как BQ собирает проект под задачу
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-bq-muted">
              Здесь собраны три разных формата: love story, оригинальный сериал и
              студийный подкаст. Каждый кейс раскрыт как отдельная страница с
              подачей, результатом и удобным переходом к следующему действию.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { value: "3", label: "разных формата подачи" },
                { value: "2", label: "города присутствия BQ" },
                { value: "1", label: "команда полного цикла" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="text-3xl font-bold text-gradient">{item.value}</div>
                  <div className="mt-2 text-sm text-bq-white/65">{item.label}</div>
                </div>
              ))}
            </div>

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
          description="От личной истории до сериалов и студийной записи. Каждая карточка ведет в полноценный кейс, где проект раскрыт глубже."
        />
      </main>
      <Footer />
    </>
  );
}
