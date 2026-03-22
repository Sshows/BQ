"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const heroHighlights = [
  "Съемка под ключ",
  "Алматы и Астана",
  "Команда + техника",
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bq-black via-bq-black/95 to-bq-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bq-accent/5 via-transparent to-transparent" />

      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-28 text-center sm:px-6 sm:pb-20 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.26em] text-bq-accent sm:mb-6 sm:text-sm sm:tracking-[0.3em]">
            Фото · Видео · Продакшн · Алматы и Астана
          </p>

          <h1 className="text-[clamp(2.75rem,10vw,5.7rem)] font-bold leading-[0.95] tracking-tight">
            Снимаем проекты,
            <br />
            <span className="text-bq-white/90">которые хочется смотреть</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-bq-muted sm:mt-8 sm:text-xl">
            Love story, reels, брендовые ролики, студийные форматы и
            оригинальные проекты - собираем идею, команду, технику и результат
            в одной системе.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
            <Link href="#consult" className="btn btn-primary w-full sm:w-auto">
              Обсудить съемку
            </Link>
            <Link href="/cases" className="btn btn-ghost w-full sm:w-auto">
              Посмотреть кейсы
            </Link>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-3">
            {heroHighlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-bq-white/75"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
        >
          <a
            href="#about"
            className="text-bq-muted transition-colors hover:text-bq-accent"
          >
            <ArrowDown size={20} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
