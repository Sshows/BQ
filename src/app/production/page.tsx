import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DirectionPage from "@/components/DirectionPage";
import BqFilmsGallery from "@/components/BqFilmsGallery";
import { BQFILMS_CHANNEL_URL } from "@/lib/bqfilms";

export const metadata: Metadata = {
  title: "BQ Production - сериалы, шоу и выпуски",
  description:
    "BQ Production объединяет оригинальные сериалы, шоу и все выпуски канала в одном разделе с быстрым переходом на YouTube.",
};

export default function ProductionPage() {
  return (
    <>
      <Navbar />
      <DirectionPage
        badge="BQ Production"
        title="Production & Series"
        subtitle="Сериалы, шоу и свежие выпуски BQ в одном месте"
        description="BQ Production теперь объединяет и оригинальные проекты, и живую видеоленту канала. Здесь можно быстро понять, чем занимается направление, и сразу открыть нужный выпуск на YouTube."
        gradient="from-red-500/10 to-rose-500/10"
        features={[
          {
            title: "Оригинальные сериалы",
            desc: "Казахоязычные истории, которые работают как самостоятельный медиа-продукт и собирают собственную аудиторию.",
          },
          {
            title: "Актуальные выпуски",
            desc: "Последние серии и ролики автоматически подтягиваются с YouTube-канала и всегда доступны в одном разделе.",
          },
          {
            title: "Шоу и спецпроекты",
            desc: "Интервью, короткий формат, авторские выпуски и брендовые истории под единым продюсерским подходом.",
          },
          {
            title: "Полный цикл продакшна",
            desc: "От идеи и сценария до съёмки, монтажа, упаковки и публикации - вся цепочка внутри команды BQ.",
          },
          {
            title: "Коллаборации",
            desc: "Открыты к совместным проектам с брендами, каналами, артистами и медиапартнёрами.",
          },
          {
            title: "Быстрый выход на YouTube",
            desc: "Каждая карточка выпуска ведёт прямо в YouTube, без лишних промежуточных шагов для зрителя.",
          },
        ]}
        cta={{
          label: "Открыть YouTube-канал",
          href: BQFILMS_CHANNEL_URL,
          target: "_blank",
          rel: "noopener noreferrer",
        }}
        secondaryCta={{ label: "Обсудить проект", href: "/#consult" }}
        faq={[
          {
            q: "Где теперь смотреть выпуски BQ?",
            a: "Все свежие ролики и серии собраны прямо на странице BQ Production, а каждая карточка открывает видео на YouTube.",
          },
          {
            q: "Можно ли заказать производство контента у вашей команды?",
            a: "Да. Мы берём в работу коммерческие и брендовые проекты, если формат совпадает с нашей продюсерской экспертизой.",
          },
          {
            q: "Что входит в BQ Production кроме сериалов?",
            a: "Шоу, спецпроекты, короткие форматы, авторские выпуски и коллаборации с внешними партнёрами.",
          },
          {
            q: "Как предложить коллаборацию?",
            a: "Оставьте заявку через форму на сайте или напишите в WhatsApp. Мы посмотрим идею и вернёмся с форматом сотрудничества.",
          },
        ]}
      >
        <BqFilmsGallery />
      </DirectionPage>
      <Footer />
    </>
  );
}
