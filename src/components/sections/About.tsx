"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="section-pad bg-bq-dark">
      <div className="container-bq max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-bq-accent text-sm uppercase tracking-[0.3em] mb-4">
            О бренде
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Не агентство. Не магазин.
            <br />
            <span className="text-bq-white/60">Экосистема.</span>
          </h2>
          <p className="mt-8 text-bq-muted text-lg leading-relaxed max-w-3xl mx-auto">
            BQ объединяет всё, что нужно для создания визуального контента и
            медиа в Казахстане: профессиональную съёмку, технику в аренду и на
            продажу, подкаст-студию и собственный оригинальный контент. Одна
            точка входа &mdash; полный цикл возможностей.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-8 text-center sm:mt-20 sm:grid-cols-4">
          {[
            { value: "5", label: "направлений" },
            { value: "215+", label: "единиц техники" },
            { value: "2", label: "города" },
            { value: "4.9", label: "рейтинг" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p className="text-4xl lg:text-5xl font-bold text-gradient">
                {stat.value}
              </p>
              <p className="mt-2 text-bq-muted text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
