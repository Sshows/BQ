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
          <p className="text-bq-accent text-sm font-medium uppercase tracking-[0.3em] mb-6">
            Фото &middot; Видео &middot; Медиа &middot; Казахстан
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
            <span className="text-gradient">BQ</span> &mdash; экосистема
            <br />
            <span className="text-bq-white/90">для создателей</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-bq-muted max-w-2xl mx-auto leading-relaxed">
            От love&nbsp;story и коммерческой съёмки до аренды техники,
            подкаст-студии и собственных медиапроектов
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#directions"
              className="px-8 py-4 bg-bq-accent text-bq-black font-semibold rounded hover:bg-amber-400 transition-all duration-300 text-sm tracking-wide"
            >
              Выбрать направление
            </Link>
            <Link
              href="#consult"
              className="px-8 py-4 border border-white/20 text-bq-white/80 font-medium rounded hover:border-bq-accent hover:text-bq-accent transition-all duration-300 text-sm tracking-wide"
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
            className="text-bq-muted hover:text-bq-accent transition-colors"
          >
            <ArrowDown size={20} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
