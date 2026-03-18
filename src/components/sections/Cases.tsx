"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

const cases = [
  {
    title: "Love Story",
    category: "BQ Media",
    tag: "Wedding",
  },
  {
    title: "Бренд-видео Exclusive Qurylys",
    category: "BQ Media",
    tag: "Commercial",
  },
  {
    title: "Сериал «Дос емес»",
    category: "BQ Production",
    tag: "Original",
  },
  {
    title: "Министерство финансов РК",
    category: "BQ Media",
    tag: "Corporate",
  },
  {
    title: "Подкаст-интервью",
    category: "BQ Studio",
    tag: "Podcast",
  },
  {
    title: "Emir Med — имиджевый ролик",
    category: "BQ Media",
    tag: "Commercial",
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
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-bq-gray"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-bq-black via-bq-black/20 to-transparent z-10" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                <div className="w-16 h-16 rounded-full bg-bq-accent/90 flex items-center justify-center">
                  <Play size={24} className="text-bq-black ml-1" fill="currentColor" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <span className="text-bq-accent text-xs uppercase tracking-wider">
                  {item.tag}
                </span>
                <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                <p className="text-bq-muted text-sm mt-1">{item.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
