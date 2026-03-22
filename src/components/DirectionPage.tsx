"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface DirectionPageProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  features: { title: string; desc: string }[];
  cta: { label: string; href: string; target?: string; rel?: string };
  secondaryCta?: { label: string; href: string; target?: string; rel?: string };
  faq: { q: string; a: string }[];
  gradient: string;
  children?: ReactNode;
}

export default function DirectionPage({
  badge,
  title,
  subtitle,
  description,
  features,
  cta,
  secondaryCta,
  faq,
  gradient,
  children,
}: DirectionPageProps) {
  return (
    <div className="min-h-screen bg-bq-black">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30`} />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <Link
            href="/#directions"
            className="inline-flex items-center gap-2 text-sm text-bq-muted hover:text-bq-accent transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Все направления
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-bq-accent text-sm uppercase tracking-[0.3em] mb-4">
              {badge}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
              {title}
            </h1>
            <p className="mt-4 text-xl sm:text-2xl text-bq-white/60 font-light">
              {subtitle}
            </p>
            <p className="mt-6 text-bq-muted max-w-2xl leading-relaxed">
              {description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href={cta.href}
                target={cta.target}
                rel={cta.rel}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bq-accent text-bq-black font-semibold rounded hover:bg-amber-400 transition-all duration-300 text-sm"
              >
                {cta.label}
                <ArrowRight size={14} />
              </Link>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  target={secondaryCta.target}
                  rel={secondaryCta.rel}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-bq-white/80 font-medium rounded hover:border-bq-accent hover:text-bq-accent transition-all duration-300 text-sm"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {children}

      <section className="py-24 bg-bq-dark">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            Что мы предлагаем
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-xl border border-white/5 hover:border-bq-accent/20 transition-all duration-500"
              >
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-bq-muted text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-bq-black">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Частые вопросы
          </h2>
          <div className="space-y-6">
            {faq.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-xl border border-white/5"
              >
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-bq-muted text-sm leading-relaxed">
                  {item.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-bq-dark text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
          <p className="text-bq-muted mb-8">
            Свяжитесь с нами для обсуждения вашего проекта
          </p>
          <Link
            href="/#consult"
            className="inline-flex items-center gap-2 px-8 py-4 bg-bq-accent text-bq-black font-semibold rounded hover:bg-amber-400 transition-all duration-300"
          >
            Получить консультацию
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
