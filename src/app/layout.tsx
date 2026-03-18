import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import { Inter, Manrope } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://bqmedia-kz.vercel.app"),
  title: {
    default: "BQ — Экосистема фото, видео и медиа в Казахстане",
    template: "%s | BQ",
  },
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
  alternates: {
    canonical: "/",
  },
};

export const viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark" as const,
  width: "device-width",
  initialScale: 1,
};

const fontSans = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-display",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body
        className={`antialiased ${fontSans.variable} ${fontDisplay.variable} font-sans`}
      >
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
