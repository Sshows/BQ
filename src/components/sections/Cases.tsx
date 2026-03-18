"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const cases = [
  {
    title: "Love Story",
    category: "BQ Media",
    tag: "Wedding",
    image: "/images/portfolio/bqmedia/portfolio-1.png",
    href: "/media",
  },
  {
    title: "Бренд-видео Exclusive Qurylys",
    category: "BQ Media",
    tag: "Commercial",
    image: "/images/portfolio/bqmedia/portfolio-2.png",
    href: "/media",
  },
  {
    title: "Сериал «Дос емес»",
    category: "BQ Production",
    tag: "Original",
    image: "/images/portfolio/bqmedia/portfolio-3.png",
    href: "/production",
  },
  {
    title: "Министерство финансов РК",
    category: "BQ Media",
    tag: "Corporate",
    image: "/images/portfolio/bqmedia/portfolio-4.png",
    href: "/media",
  },
  {
    title: "Подкаст-интервью",
    category: "BQ Studio",
    tag: "Podcast",
    image: "/images/portfolio/bqmedia/portfolio-5.png",
    href: "/studio",
  },
  {
    title: "Emir Med — имиджевый ролик",
    category: "BQ Media",
    tag: "Commercial",
    image: "/images/portfolio/bqmedia/portfolio-6.png",
    href: "/media",
  },
];

export default function Cases() {
  return (
    <section id="cases" className="py-32 bg-bq-dark">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-bq-accent text-sm uppercase tracking-[0.3em] mb-4">
            Портфолио
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Избранные проекты
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-bq-gray"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-bq-black via-bq-black/20 to-transparent z-10" />
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />

              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <span className="text-bq-accent text-xs uppercase tracking-wider">
                  {item.tag}
                </span>
                <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                <p className="text-bq-muted text-sm mt-1">{item.category}</p>
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
