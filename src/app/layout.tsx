import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "BQ — Экосистема фото, видео и медиа в Казахстане",
  description:
    "BQ объединяет продакшн, аренду и продажу техники, подкаст-студии и оригинальные медиапроекты. Для брендов, creators и продакшн-команд.",
  keywords: [
    "видеосъемка Алматы",
    "продакшн Казахстан",
    "аренда видеотехники",
    "магазин видеотехники",
    "подкаст студия Алматы",
    "BQ Media",
    "BQ Rental",
    "BQ Store",
    "BQ Studio",
    "BQ Production",
  ],
  openGraph: {
    title: "BQ — Экосистема фото, видео и медиа в Казахстане",
    description:
      "Снимаем, оснащаем, записываем и продюсируем. Всё в одной экосистеме.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
