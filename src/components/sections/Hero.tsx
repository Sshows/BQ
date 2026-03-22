"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bq-black via-bq-black/95 to-bq-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bq-accent/5 via-transparent to-transparent" />

      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-bq-accent">
            Фото · Видео · Продакшн · Казахстан
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
            <span className="text-gradient">BQ</span> — съёмка
            <br />
            <span className="text-bq-white/90">и продакшн под ключ</span>
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-bq-muted sm:text-xl">
            От love story и рекламных роликов до аренды техники, студии и
            собственных сериалов — всё, что нужно для сильной съёмки в одном
            месте
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#directions"
              className="rounded bg-bq-accent px-8 py-4 text-sm font-semibold tracking-wide text-bq-black transition-all duration-300 hover:bg-amber-400"
            >
              Выбрать направление
            </Link>
            <Link
              href="#consult"
              className="rounded border border-white/20 px-8 py-4 text-sm font-medium tracking-wide text-bq-white/80 transition-all duration-300 hover:border-bq-accent hover:text-bq-accent"
            >
              Обсудить проект
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
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
