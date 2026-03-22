"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/cases";

type CasesProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export default function Cases({
  id = "cases",
  eyebrow = "Кейсы",
  title = "Проекты, по которым виден почерк BQ",
  description = "Три формата с отдельными страницами: можно зайти в кейс глубже, посмотреть подачу и быстро перейти в нужное направление.",
}: CasesProps) {
  return (
    <section id={id} className="section-pad bg-bq-dark">
      <div className="container-bq">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-bq-accent">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-bq-muted">{description}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-bq-gray"
            >
              <div className="relative aspect-[4/4.6] overflow-hidden">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-bq-black via-bq-black/25 to-transparent" />
                <Image
                  src={item.heroImage}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 z-20 p-6">
                <span className="text-xs uppercase tracking-[0.24em] text-bq-accent">
                  {item.tag}
                </span>
                <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-bq-white/70">{item.category}</p>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-bq-white/78">
                  {item.cardDescription}
                </p>
                <div className="mt-5 text-sm font-medium text-bq-accent">
                  Открыть кейс
                </div>
              </div>

              <Link
                href={`/cases/${item.slug}`}
                className="absolute inset-0 z-30"
                aria-label={item.title}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
