"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "5", label: "направлений" },
  { value: "215+", label: "единиц техники" },
  { value: "2", label: "города" },
  { value: "1", label: "команда полного цикла" },
];

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
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-bq-accent">
            О BQ
          </p>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Одна команда для съемки,
            <br />
            <span className="text-bq-white/60">техники и продакшна</span>
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-bq-muted">
            BQ - это не один подрядчик, а связанная система направлений.
            Съемка, аренда, магазин техники, студия и production работают
            вместе, чтобы проект не рассыпался между разными исполнителями.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-8 text-center sm:mt-20 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <p className="text-4xl font-bold text-gradient lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-bq-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
