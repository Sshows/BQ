import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DirectionPage from "@/components/DirectionPage";
import Image from "next/image";

export const metadata: Metadata = {
  title: "BQ Media — Фото- и видеосъёмка под ключ | BQ",
  description:
    "Профессиональная фото- и видеосъёмка в Алматы. Love story, свадьбы, reels, коммерческие и брендовые проекты. BQ Media — номер один по визуальному контенту.",
};

export default function MediaPage() {
  return (
    <>
      <Navbar />
      <DirectionPage
        badge="BQ Media"
        title="Снимаем под ключ"
        subtitle="Love story, свадьбы, reels, коммерция, бренд-видео"
        description="BQ Media — это профессиональная фото- и видеосъёмка полного цикла. От идеи и раскадровки до съёмки и постпродакшна. Работаем с парами, брендами, компаниями и creators. Каждый проект — это визуальная история, которая работает."
        gradient="from-amber-500/10 to-orange-500/10"
        features={[
          {
            title: "Love Story и свадебная съёмка",
            desc: "Cinematic видео и фотографии, которые передают настоящие эмоции. Полная организация: локации, стиль, монтаж.",
          },
          {
            title: "Коммерческая съёмка",
            desc: "Бренд-видео, рекламные ролики, имиджевый контент. Работали с Exclusive Qurylys, Emir Med, Daredjani и государственными проектами.",
          },
          {
            title: "Reels и короткий формат",
            desc: "Вертикальные видео для Instagram, TikTok, YouTube Shorts. Сценарий, съёмка, монтаж, цветокоррекция.",
          },
          {
            title: "Корпоративное видео",
            desc: "Презентации, внутренние ролики, event-съёмка. Опыт работы с Министерством финансов РК.",
          },
          {
            title: "Полный цикл продакшна",
            desc: "Пре-продакшн, съёмка, монтаж, саунд-дизайн, цветокоррекция — всё внутри команды BQ.",
          },
          {
            title: "Собственная техническая база",
            desc: "Благодаря BQ Rental — у нас всегда доступна лучшая техника. Никаких компромиссов.",
          },
        ]}
        cta={{ label: "Обсудить съёмку", href: "/#consult" }}
        secondaryCta={{ label: "Посмотреть кейсы", href: "/cases" }}
        faq={[
          {
            q: "Сколько стоит съёмка?",
            a: "Стоимость зависит от формата, длительности и задач проекта. Оставьте заявку — мы подготовим индивидуальное предложение.",
          },
          {
            q: "Какие форматы съёмки вы предлагаете?",
            a: "Love story, свадебная съёмка, reels, бренд-видео, корпоративные ролики, клипы, интервью и имиджевый контент.",
          },
          {
            q: "Как долго длится процесс от заказа до готового видео?",
            a: "Обычно от 2 до 4 недель в зависимости от масштаба проекта. Для срочных задач обсуждаем индивидуально.",
          },
          {
            q: "Работаете ли вы за пределами Алматы?",
            a: "Да, мы выезжаем на съёмки по всему Казахстану и за рубеж.",
          },
        ]}
      >
        <section className="py-24 bg-bq-black">
          <div className="container-bq">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-bq-accent text-sm uppercase tracking-[0.3em] mb-3">
                  BQ Media
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Love Story — портфолио
                </h2>
                <p className="mt-3 text-bq-white/60 max-w-2xl">
                  Подборка кадров из love story съёмок. Нажми на фото, чтобы
                  открыть в полном размере.
                </p>
              </div>
              <a href="/#consult" className="btn btn-primary w-full sm:w-auto">
                Записаться на съёмку
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                "/images/portfolio/bqmedia/portfolio-1.png",
                "/images/portfolio/bqmedia/portfolio-2.png",
                "/images/portfolio/bqmedia/portfolio-3.png",
                "/images/portfolio/bqmedia/portfolio-4.png",
                "/images/portfolio/bqmedia/portfolio-5.png",
                "/images/portfolio/bqmedia/portfolio-6.png",
                "/images/portfolio/bqmedia/portfolio-7.png",
              ].map((src, i) => (
                <a
                  key={src}
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Image
                    src={src}
                    alt={`BQ Media portfolio ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </DirectionPage>
      <Footer />
    </>
  );
}
