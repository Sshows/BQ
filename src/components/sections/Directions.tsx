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
    kind: "Съемка",
    title: "BQ Media",
    desc: "Фото- и видеосъемка под ключ: love story, reels, брендовый контент, мероприятия и рекламные ролики.",
    href: "/media",
    cta: "Обсудить съемку",
    accent: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: Film,
    kind: "Аренда",
    title: "BQ Rental",
    desc: "Камеры, свет, звук, дроны и полный сетап в аренду для съемок разного масштаба.",
    href: "/rental",
    cta: "Открыть каталог",
    accent: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: ShoppingBag,
    kind: "Покупка",
    title: "BQ Store",
    desc: "Подбор и продажа техники для тех, кто собирает свой рабочий сетап или обновляет оборудование.",
    href: "/store",
    cta: "Подобрать технику",
    accent: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: Mic,
    kind: "Студия",
    title: "BQ Studio",
    desc: "Подкаст-студия и камерное пространство для интервью, разговорных форматов и записи выпусков.",
    href: "/studio",
    cta: "Забронировать студию",
    accent: "from-purple-500/20 to-violet-500/20",
  },
  {
    icon: Clapperboard,
    kind: "Продакшн",
    title: "BQ Production",
    desc: "Сериалы, шоу, YouTube-выпуски и оригинальный контент под единым продюсерским контролем.",
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
            Направления BQ
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Выберите формат под свою задачу
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-bq-muted">
            От точечной аренды до полного цикла производства - можно зайти с
            одной потребностью и закрыть весь проект внутри BQ.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {directions.map((direction, index) => (
            <motion.div
              key={direction.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                href={direction.href}
                className={`group block h-full rounded-2xl border border-white/5 bg-gradient-to-br p-6 transition-all duration-500 hover-lift hover:border-bq-accent/30 sm:p-8 ${direction.accent}`}
              >
                <span className="mb-5 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-bq-white/75">
                  {direction.kind}
                </span>
                <direction.icon
                  size={32}
                  className="mb-6 text-bq-accent"
                  strokeWidth={1.5}
                />
                <h3 className="mb-3 text-xl font-bold">{direction.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-bq-muted">
                  {direction.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-bq-accent transition-all duration-300 group-hover:gap-3">
                  {direction.cta}
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
