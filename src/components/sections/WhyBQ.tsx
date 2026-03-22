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
import { WHY_BQ_CONTENT } from "@/lib/content";

const icons = [Layers, Wrench, Zap, Users, Globe, BadgeCheck] as const;

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
            {WHY_BQ_CONTENT.eyebrow}
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {WHY_BQ_CONTENT.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_BQ_CONTENT.items.map((advantage, index) => {
            const Icon = icons[index] ?? Layers;

            return (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-all duration-300 hover:border-bq-accent/20 hover:bg-white/[0.05]"
              >
                <Icon
                  size={28}
                  className="mb-4 text-bq-accent"
                  strokeWidth={1.5}
                />
                <h3 className="mb-2 text-lg font-semibold">{advantage.title}</h3>
                <p className="text-sm leading-relaxed text-bq-muted">
                  {advantage.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
