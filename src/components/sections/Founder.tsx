"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram } from "lucide-react";

export default function Founder() {
  return (
    <section className="section-pad bg-bq-dark">
      <div className="container-bq max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
        >
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-bq-gray">
              <div className="absolute inset-0 bg-gradient-to-t from-bq-black/60 to-transparent" />
              <Image
                src="/images/founder/buti-portrait-v2.png"
                alt="Основатель BQ"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="absolute -bottom-3 -right-3 h-20 w-20 rounded-full bg-bq-accent/10 blur-2xl sm:-bottom-4 sm:-right-4 sm:h-24 sm:w-24" />
          </div>

          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-bq-accent">
              Основатель
            </p>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Бак-Даулет
              <br />
              Абжатов
            </h2>
            <p className="mt-6 leading-relaxed text-bq-muted">
              Режиссер, продюсер и предприниматель. Он собрал BQ как систему, в
              которой съемка, техника, студия и production не спорят друг с
              другом, а работают как одна команда.
            </p>
            <p className="mt-4 leading-relaxed text-bq-muted">
              Такой подход помогает держать скорость и качество - от частной
              съемки и брендовых роликов до оригинальных проектов и сериалов.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://www.instagram.com/butiabq"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-bq-muted transition-colors hover:text-bq-accent"
              >
                <Instagram size={16} />
                @butiabq
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
