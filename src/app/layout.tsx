import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import MobileStickyActions from "@/components/MobileStickyActions";
import PageTransition from "@/components/PageTransition";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - съемка, продакшн и студийные проекты в Казахстане`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  creator: SITE_NAME,
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
    title: `${SITE_NAME} - съемка, продакшн и студийные проекты в Казахстане`,
    description:
      "Съемка, кейсы, reels, YouTube и быстрый путь к заявке в одной системе BQ.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "ru_KZ",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - съемка и продакшн`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - съемка, продакшн и студийные проекты в Казахстане`,
    description:
      "Снимаем проекты под задачу: от love story и reels до подкастов, кейсов и YouTube-форматов.",
    images: ["/twitter-image"],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
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
        className={`font-sans antialiased pb-[92px] lg:pb-0 ${fontSans.variable} ${fontDisplay.variable}`}
      >
        <PageTransition>{children}</PageTransition>
        <MobileStickyActions />
      </body>
    </html>
  );
}
