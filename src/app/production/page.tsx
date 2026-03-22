import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BqFilmsGallery from "@/components/BqFilmsGallery";
import DirectionPage from "@/components/DirectionPage";
import { BQFILMS_CHANNEL_URL } from "@/lib/bqfilms";

export const metadata: Metadata = {
  title: "BQ Production - сериалы, шоу и выпуски",
  description:
    "BQ Production объединяет оригинальные сериалы, YouTube-выпуски и спецпроекты в одном разделе с быстрым переходом на YouTube.",
};

export default function ProductionPage() {
  return (
    <>
      <Navbar />
      <DirectionPage
        badge="BQ Production"
        title="Production"
        subtitle="Сериалы, YouTube и оригинальные проекты BQ в одном разделе"
        description="Здесь собраны оригинальные проекты BQ Production и свежая видеолента канала. Можно быстро понять формат направления и сразу открыть нужный выпуск на YouTube."
        gradient="from-red-500/10 to-rose-500/10"
        features={[
          {
            title: "Оригинальные сериалы",
            desc: "Истории с собственным тоном, героями и продюсерским подходом, которые работают как самостоятельный медиапродукт.",
          },
          {
            title: "Актуальные выпуски",
            desc: "Свежие серии и ролики подтягиваются с YouTube-канала и всегда доступны в одном месте.",
          },
          {
            title: "Шоу и спецпроекты",
            desc: "Интервью, короткий формат, авторские выпуски и брендовые истории под единым продюсерским контролем.",
          },
          {
            title: "Полный цикл продакшна",
            desc: "От идеи и сценария до съемки, монтажа, упаковки и публикации - вся цепочка внутри команды BQ.",
          },
          {
            title: "Коллаборации",
            desc: "Открыты к совместным проектам с брендами, каналами, артистами и медиапартнерами.",
          },
          {
            title: "Быстрый переход на YouTube",
            desc: "Каждая карточка ведет прямо к ролику, без лишних промежуточных экранов для зрителя.",
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
            a: "Все свежие ролики и серии собраны на странице BQ Production, а каждая карточка сразу открывает видео на YouTube.",
          },
          {
            q: "Можно ли заказать продакшн у вашей команды?",
            a: "Да. Мы берем в работу коммерческие и брендовые проекты, если формат совпадает с нашей продюсерской экспертизой.",
          },
          {
            q: "Что входит в BQ Production кроме сериалов?",
            a: "Шоу, спецпроекты, короткие форматы, авторские выпуски и совместные истории с внешними партнерами.",
          },
          {
            q: "Как предложить коллаборацию?",
            a: "Оставьте заявку через форму на сайте или напишите в WhatsApp. Мы посмотрим идею и вернемся с удобным форматом сотрудничества.",
          },
        ]}
      >
        <BqFilmsGallery />
      </DirectionPage>
      <Footer />
    </>
  );
}
