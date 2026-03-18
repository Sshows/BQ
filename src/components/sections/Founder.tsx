"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram } from "lucide-react";

export default function Founder() {
  return (
    <section className="py-32 bg-bq-dark">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl bg-bq-gray overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-bq-black/60 to-transparent" />
              <Image
                src="/images/founder/buti-portrait.png"
                alt="Основатель BQ"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-bq-accent/10 rounded-full blur-2xl" />
          </div>

          <div>
            <p className="text-bq-accent text-sm uppercase tracking-[0.3em] mb-4">
              Основатель
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              Бақ-Даулет
              <br />
              Абжатов
            </h2>
            <p className="mt-6 text-bq-muted leading-relaxed">
              Режиссёр, продюсер, предприниматель. Основатель BQ-экосистемы,
              включающей BQ Media, BQ Rental, BQ Store, BQ Studio и BQ
              Production. Практик индустрии, который создал систему возможностей
              для creators и брендов в Казахстане.
            </p>
            <p className="mt-4 text-bq-muted leading-relaxed">
              Идейный лидер, стоящий за каждым направлением BQ &mdash;
              от свадебной съёмки до собственных сериалов.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://www.instagram.com/butiabq"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-bq-muted hover:text-bq-accent transition-colors"
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
