"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

const locations = [
  {
    city: "Алматы",
    address: "Коктем-3, 24 / ЖК Central Esentai Residence",
    services: ["BQ Media", "BQ Rental", "BQ Studio", "BQ Store"],
  },
  {
    city: "Астана",
    address: "Бухар Жырау, 42, офис 9",
    services: ["BQ Store", "BQ Studio"],
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-bq-dark">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-bq-accent text-sm uppercase tracking-[0.3em] mb-4">
            Где мы
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Контакты и города
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-2xl border border-white/5 bg-bq-black/50"
            >
              <h3 className="text-2xl font-bold mb-4">{loc.city}</h3>
              <div className="space-y-3 text-bq-muted text-sm">
                <p className="flex items-start gap-2">
                  <MapPin
                    size={16}
                    className="text-bq-accent shrink-0 mt-0.5"
                  />
                  {loc.address}
                </p>
                <p className="flex items-start gap-2">
                  <Clock
                    size={16}
                    className="text-bq-accent shrink-0 mt-0.5"
                  />
                  Пн-Сб: 10:00 &ndash; 20:00
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {loc.services.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 text-xs rounded-full border border-bq-accent/20 text-bq-accent"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-bq-muted text-sm">
            <a
              href="tel:+77001234567"
              className="flex items-center gap-2 hover:text-bq-accent transition-colors"
            >
              <Phone size={16} className="text-bq-accent" />
              +7 700 123 45 67
            </a>
            <a
              href="https://wa.me/77001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-bq-accent transition-colors"
            >
              <MessageCircle size={16} className="text-bq-accent" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
