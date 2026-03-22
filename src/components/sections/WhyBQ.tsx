"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Globe,
  Layers,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

const advantages = [
  {
    icon: Layers,
    title: "Один подрядчик вместо пяти",
    desc: "Съемка, техника, студия и продакшн собраны в одной системе, поэтому проект движется ровнее и быстрее.",
  },
  {
    icon: Wrench,
    title: "Техника и команда рядом",
    desc: "Не нужно отдельно искать оборудование, площадку и исполнителей - основные ресурсы уже внутри BQ.",
  },
  {
    icon: Zap,
    title: "Быстрый старт",
    desc: "Можно быстро выйти в подготовку, согласовать формат и приступить к съемке без лишней бюрократии.",
  },
  {
    icon: Users,
    title: "Подходим и брендам, и частным клиентам",
    desc: "Работаем с бизнесом, экспертами, парами, авторами и командами, которым нужен понятный результат.",
  },
  {
    icon: Globe,
    title: "Локальная подача для Казахстана",
    desc: "Понимаем визуальный язык, ритм и ожидания аудитории в Алматы, Астане и шире по рынку.",
  },
  {
    icon: BadgeCheck,
    title: "Доводим до готового выпуска",
    desc: "Помогаем не только снять, но и собрать, оформить, упаковать и выпустить материал без ощущения незавершенности.",
  },
];

export default function WhyBQ() {
  return (
    <section className="section-pad bg-bq-black">
      <div className="container-bq max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-bq-accent">
            Почему BQ
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            С нами удобно запускать и доводить проекты
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-all duration-300 hover:border-bq-accent/20 hover:bg-white/[0.05]"
            >
              <advantage.icon
                size={28}
                className="mb-4 text-bq-accent"
                strokeWidth={1.5}
              />
              <h3 className="mb-2 text-lg font-semibold">{advantage.title}</h3>
              <p className="text-sm leading-relaxed text-bq-muted">
                {advantage.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
