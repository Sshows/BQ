"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Wrench,
  Users,
  Zap,
  Globe,
} from "lucide-react";

const advantages = [
  {
    icon: Layers,
    title: "Единая экосистема",
    desc: "Всё под одной крышей: съёмка, техника, студия, магазин и собственные проекты.",
  },
  {
    icon: Wrench,
    title: "Техника + команда + площадка",
    desc: "Полный цикл: от идеи до готового продукта без привлечения сторонних подрядчиков.",
  },
  {
    icon: Users,
    title: "Бренды и частные клиенты",
    desc: "Работаем с бизнесом, парами, creators, экспертами и продакшн-командами.",
  },
  {
    icon: Zap,
    title: "Creator-first подход",
    desc: "Мы сами создатели контента и понимаем задачи creators изнутри.",
  },
  {
    icon: Globe,
    title: "Казахстан. Локальная экспертиза",
    desc: "Алматы и Астана. Казахоязычная идентичность. Знание рынка.",
  },
];

export default function WhyBQ() {
  return (
    <section className="py-32 bg-bq-black">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-bq-accent text-sm uppercase tracking-[0.3em] mb-4">
            Преимущества
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Почему BQ
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl border border-white/5 hover:border-bq-accent/20 transition-all duration-500"
            >
              <adv.icon
                size={28}
                className="text-bq-accent mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-lg font-semibold mb-2">{adv.title}</h3>
              <p className="text-bq-muted text-sm leading-relaxed">
                {adv.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
