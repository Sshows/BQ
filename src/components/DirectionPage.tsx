"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
      <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30`}
        />
        <div className="container-bq relative z-10 max-w-5xl">
          <Link
            href="/#directions"
            className="mb-8 inline-flex items-center gap-2 text-sm text-bq-muted transition-colors hover:text-bq-accent"
          >
            <ArrowLeft size={14} />
            Все направления
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-bq-accent">
              {badge}
            </p>
            <h1 className="text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-4 text-lg font-light text-bq-white/60 sm:text-2xl">
              {subtitle}
            </p>
            <p className="mt-6 max-w-2xl leading-relaxed text-bq-muted">
              {description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href={cta.href}
                target={cta.target}
                rel={cta.rel}
                className="btn btn-primary w-full sm:w-auto"
              >
                {cta.label}
                <ArrowRight size={14} />
              </Link>
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  target={secondaryCta.target}
                  rel={secondaryCta.rel}
                  className="btn btn-ghost w-full sm:w-auto"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </motion.div>
        </div>
      </section>

      {children}

      <section className="section-pad bg-bq-dark">
        <div className="container-bq max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold sm:mb-16">
            Что входит в направление
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-all duration-300 hover:border-bq-accent/20 hover:bg-white/[0.05]"
              >
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-bq-muted">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-bq-black">
        <div className="container-bq max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Частые вопросы</h2>
          <div className="space-y-6">
            {faq.map((item, index) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-6"
              >
                <h3 className="mb-2 font-semibold">{item.q}</h3>
                <p className="text-sm leading-relaxed text-bq-muted">
                  {item.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-bq-dark text-center">
        <div className="container-bq max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold">Готовы обсудить проект?</h2>
          <p className="mb-8 text-bq-muted">
            Расскажите задачу, формат и город съемки - мы быстро предложим
            удобное решение.
          </p>
          <Link href="/#consult" className="btn btn-primary">
            Оставить заявку
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
