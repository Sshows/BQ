"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Camera,
  Film,
  ShoppingBag,
  Mic,
  Clapperboard,
  ArrowRight,
} from "lucide-react";

const directions = [
  {
    icon: Camera,
    title: "BQ Media",
    desc: "Фото- и видеосъёмка под ключ. Love story, свадьбы, reels, коммерция, бренд-видео.",
    href: "/media",
    cta: "Обсудить съёмку",
    accent: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: Film,
    title: "BQ Rental",
    desc: "Аренда профессиональной фото- и видеотехники. 215+ позиций: камеры, свет, звук, дроны.",
    href: "/rental",
    cta: "Открыть каталог",
    accent: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: ShoppingBag,
    title: "BQ Store",
    desc: "Магазин техники для creators. Подбор сетапа под задачу и бюджет, консультация, доставка.",
    href: "/store",
    cta: "Подобрать технику",
    accent: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: Mic,
    title: "BQ Studio",
    desc: "Видео-подкаст студия. Запись, multi-cam, монтаж. Алматы и Астана.",
    href: "/studio",
    cta: "Забронировать студию",
    accent: "from-purple-500/20 to-violet-500/20",
  },
  {
    icon: Clapperboard,
    title: "BQ Production",
    desc: "Собственные сериалы, шоу и медиапроекты. Оригинальный контент BQ.",
    href: "/production",
    cta: "Смотреть проекты",
    accent: "from-red-500/20 to-rose-500/20",
  },
];

export default function Directions() {
  return (
    <section id="directions" className="py-32 bg-bq-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-bq-accent text-sm uppercase tracking-[0.3em] mb-4">
            Направления
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Выберите своё
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className={`group block p-8 rounded-2xl bg-gradient-to-br ${dir.accent} border border-white/5 hover:border-bq-accent/30 transition-all duration-500 hover-lift h-full`}
              >
                <dir.icon
                  size={32}
                  className="text-bq-accent mb-6"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl font-bold mb-3">{dir.title}</h3>
                <p className="text-bq-muted text-sm leading-relaxed mb-6">
                  {dir.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-bq-accent text-sm font-medium group-hover:gap-3 transition-all duration-300">
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
