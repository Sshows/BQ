import { WHATSAPP_URL } from "@/lib/site";

export type CaseLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type CaseMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  tag: string;
  cardDescription: string;
  heroDescription: string;
  heroImage: string;
  supportingImages: string[];
  metrics: CaseMetric[];
  challenge: string;
  approach: string;
  result: string;
  deliverables: string[];
  primaryCta: CaseLink;
  secondaryCta?: CaseLink;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "love-story",
    title: "Love Story",
    category: "BQ Media",
    tag: "Wedding",
    cardDescription:
      "Кинематографичная свадебная съемка с мягким цветом, живыми эмоциями и аккуратной подачей.",
    heroDescription:
      "История пары, снятая без лишней постановочности. В центре были настроение, естественные эмоции и визуал, который хочется пересматривать спустя время.",
    heroImage: "/images/portfolio/lovestory-1.jpg",
    supportingImages: [
      "/images/portfolio/lovestory-2.jpg",
      "/images/portfolio/wedding-2.jpg",
    ],
    metrics: [
      { value: "2", label: "локации" },
      { value: "1", label: "съемочный день" },
      { value: "3", label: "формата выдачи" },
    ],
    challenge:
      "Сделать свадебную историю визуально теплой и живой, чтобы в кадре чувствовалась не постановка, а настоящая близость пары.",
    approach:
      "Собрали легкую команду, продумали маршрут по локациям и сняли материал так, чтобы пара чувствовала себя свободно, а не как на длинной съемочной смене.",
    result:
      "Получился деликатный cinematic-материал: основное видео, короткие фрагменты для соцсетей и визуальная история, которую удобно показывать близким и хранить как память.",
    deliverables: [
      "Основной highlight-фильм",
      "Короткие вертикальные фрагменты для Reels",
      "Набор кадров для личного архива и публикаций",
    ],
    primaryCta: {
      label: "Открыть BQ Media",
      href: "/media",
    },
    secondaryCta: {
      label: "Написать в WhatsApp",
      href: WHATSAPP_URL,
      external: true,
    },
  },
  {
    slug: "dos-emes",
    title: 'Сериал "Дос емес"',
    category: "BQ Production",
    tag: "Original",
    cardDescription:
      "Оригинальный сериал BQ Production с прямым переходом на YouTube и акцентом на локальную историю.",
    heroDescription:
      "Оригинальный проект BQ Production, в котором важны не только съемка и монтаж, но и понятная упаковка для зрителя: афиша, превью, выпуск и быстрый переход в YouTube.",
    heroImage: "https://i.ytimg.com/vi/pX-YThpE6Rc/hqdefault.jpg",
    supportingImages: [
      "https://i.ytimg.com/vi/Cjt3PHRtiLU/hqdefault.jpg",
      "https://i.ytimg.com/vi/VuPvcSRkrSY/hqdefault.jpg",
    ],
    metrics: [
      { value: "YouTube", label: "основная площадка" },
      { value: "Series", label: "формат выпуска" },
      { value: "BQ", label: "оригинальный проект" },
    ],
    challenge:
      "Собрать сериал так, чтобы он удерживал внимание казахской аудитории и при этом выглядел цельным брендовым проектом, а не просто набором роликов.",
    approach:
      "Выстроили продюсерский цикл внутри BQ: идея, упаковка, превью, выпуск, дистрибуция и связка с сайтом, где пользователь сразу попадает к нужной серии.",
    result:
      "Проект получил отдельное место на сайте, быстрый сценарий перехода на YouTube и более понятную презентацию для зрителя и потенциальных партнеров.",
    deliverables: [
      "Серии и превью для YouTube",
      "Оформление выпусков и быстрые переходы с сайта",
      "Упаковка проекта как отдельного направления BQ Production",
    ],
    primaryCta: {
      label: "Открыть Production",
      href: "/production",
    },
    secondaryCta: {
      label: "Смотреть 1 серию",
      href: "https://www.youtube.com/watch?v=pX-YThpE6Rc",
      external: true,
    },
  },
  {
    slug: "podcast-interview",
    title: "Подкаст-интервью",
    category: "BQ Studio",
    tag: "Podcast",
    cardDescription:
      "Студийный формат с несколькими камерами, чистым звуком и монтажом под готовый выпуск.",
    heroDescription:
      "Студийный разговорный формат, где важно не только красиво поставить свет, но и дать гостю и ведущему комфорт, чистый звук и ощущение цельного выпуска.",
    heroImage: "/images/founder/buti-onset-v2.png",
    supportingImages: [
      "/images/founder/buti-portrait-v2.png",
      "/images/founder/buti-onset.png",
    ],
    metrics: [
      { value: "Multi-cam", label: "запись" },
      { value: "Studio", label: "контролируемый сетап" },
      { value: "Ready", label: "материал под выпуск" },
    ],
    challenge:
      "Сделать студийный выпуск, который выглядит собранно и профессионально, но при этом остается живым и разговорным, без ощущения холодной постановки.",
    approach:
      "Подготовили свет, несколько камер и звуковую схему так, чтобы после записи материал легко складывался в готовый выпуск без лишней потери времени на исправления.",
    result:
      "Получился студийный формат, который можно выпускать как полноценное интервью, короткие нарезки для соцсетей и имиджевый контент для автора или бренда.",
    deliverables: [
      "Полный студийный выпуск",
      "Короткие вертикальные и горизонтальные нарезки",
      "Чистый звук и единая визуальная упаковка выпуска",
    ],
    primaryCta: {
      label: "Открыть BQ Studio",
      href: "/studio",
    },
    secondaryCta: {
      label: "Забронировать через WhatsApp",
      href: WHATSAPP_URL,
      external: true,
    },
  },
];

export const CASE_ROUTES = CASE_STUDIES.map((item) => `/cases/${item.slug}`);

export function getCaseStudyBySlug(slug: string) {
  return CASE_STUDIES.find((item) => item.slug === slug);
}
