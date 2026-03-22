"use client";

import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "@/lib/content";

export default function About() {
  const [firstLine, secondLine] = ABOUT_CONTENT.title.split("\n");

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
            {ABOUT_CONTENT.eyebrow}
          </p>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {firstLine},
            <br />
            <span className="text-bq-white/60">{secondLine}</span>
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-bq-muted">
            {ABOUT_CONTENT.description}
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-8 text-center sm:mt-20 sm:grid-cols-4">
          {ABOUT_CONTENT.stats.map((stat, index) => (
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
