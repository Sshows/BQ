"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Camera,
  Clapperboard,
  Film,
  Mic,
  ShoppingBag,
} from "lucide-react";

const directions = [
  {
    icon: Camera,
    title: "BQ Media",
    desc: "Фото- и видеосъёмка под ключ. Love story, свадьбы, reels, коммерция и бренд-видео.",
    href: "/media",
    cta: "Обсудить съёмку",
    accent: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: Film,
    title: "BQ Rental",
    desc: "Аренда профессиональной фото- и видеотехники. Камеры, свет, звук, дроны и полный сетап под задачу.",
    href: "/rental",
    cta: "Открыть каталог",
    accent: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: ShoppingBag,
    title: "BQ Store",
    desc: "Магазин техники для creators: подбор оборудования, консультация и готовые решения под бюджет.",
    href: "/store",
    cta: "Подобрать технику",
    accent: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: Mic,
    title: "BQ Studio",
    desc: "Видео-подкаст студия с multi-cam записью, светом и монтажом в Алматы и Астане.",
    href: "/studio",
    cta: "Забронировать студию",
    accent: "from-purple-500/20 to-violet-500/20",
  },
  {
    icon: Clapperboard,
    title: "BQ Production",
    desc: "Оригинальные сериалы, шоу и актуальные выпуски канала. Production и BQFILMS теперь объединены в одном разделе.",
    href: "/production",
    cta: "Смотреть проекты",
    accent: "from-red-500/20 to-rose-500/20",
  },
];

export default function Directions() {
  return (
    <section id="directions" className="section-pad bg-bq-black">
      <div className="container-bq">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-bq-accent">
            Направления
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Выберите своё
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {directions.map((dir, i) => (
            <motion.div
              key={dir.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={dir.href}
                className={`group block h-full rounded-2xl border border-white/5 bg-gradient-to-br p-6 transition-all duration-500 hover-lift hover:border-bq-accent/30 sm:p-8 ${dir.accent}`}
              >
                <dir.icon
                  size={32}
                  className="mb-6 text-bq-accent"
                  strokeWidth={1.5}
                />
                <h3 className="mb-3 text-xl font-bold">{dir.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-bq-muted">
                  {dir.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-bq-accent transition-all duration-300 group-hover:gap-3">
                  {dir.cta}
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
