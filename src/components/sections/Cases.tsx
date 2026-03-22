"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const caseItems = [
  {
    title: "Love Story",
    category: "BQ Media",
    tag: "Wedding",
    image: "/images/portfolio/lovestory-1.jpg",
    href: "/media",
  },
  {
    title: "Сериал «Дос емес»",
    category: "BQ Production",
    tag: "Original",
    image: "https://i.ytimg.com/vi/pX-YThpE6Rc/hqdefault.jpg",
    href: "/production",
  },
  {
    title: "Подкаст-интервью",
    category: "BQ Studio",
    tag: "Podcast",
    image: "/images/founder/buti-onset-v2.png",
    href: "/studio",
  },
];

type CasesProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export default function Cases({
  id = "cases",
  eyebrow = "Портфолио",
  title = "Избранные проекты",
  description,
}: CasesProps) {
  return (
    <section id={id} className="bg-bq-dark py-32">
      <div className="mx-auto max-w-7xl px-6">
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
          {description ? (
            <p className="mx-auto mt-4 max-w-2xl text-bq-muted">
              {description}
            </p>
          ) : null}
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-bq-gray"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-bq-black via-bq-black/20 to-transparent" />
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />

              <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                <span className="text-xs uppercase tracking-wider text-bq-accent">
                  {item.tag}
                </span>
                <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-bq-muted">{item.category}</p>
              </div>

              <Link
                href={item.href}
                className="absolute inset-0 z-30"
                aria-label={item.title}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
