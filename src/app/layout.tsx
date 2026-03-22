import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bqmedia-kz.vercel.app"),
  title: {
    default: "BQ - съемка, продакшн и студийные проекты в Казахстане",
    template: "%s | BQ",
  },
  description:
    "BQ объединяет съемку, аренду и продажу техники, студию и продакшн для брендов, экспертов и частных проектов в Алматы и Астане.",
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
    title: "BQ - съемка, продакшн и студийные проекты в Казахстане",
    description:
      "Снимаем, оснащаем, записываем и выпускаем проекты - от love story и reels до сериалов и брендового контента.",
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
        className={`font-sans antialiased ${fontSans.variable} ${fontDisplay.variable}`}
      >
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
