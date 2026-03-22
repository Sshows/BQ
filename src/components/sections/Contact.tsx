"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  WHATSAPP_URL,
} from "@/lib/site";

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
    <section id="contact" className="section-pad bg-bq-dark">
      <div className="container-bq max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-bq-accent">
            Где мы
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Контакты и города
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-white/5 bg-bq-black/50 p-6 sm:p-8"
            >
              <h3 className="mb-4 text-2xl font-bold">{loc.city}</h3>
              <div className="space-y-3 text-sm text-bq-muted">
                <p className="flex items-start gap-2">
                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0 text-bq-accent"
                  />
                  {loc.address}
                </p>
                <p className="flex items-start gap-2">
                  <Clock
                    size={16}
                    className="mt-0.5 shrink-0 text-bq-accent"
                  />
                  Пн-Сб: 10:00 - 20:00
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {loc.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-bq-accent/20 px-3 py-1 text-xs text-bq-accent"
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
          <div className="flex flex-col items-center justify-center gap-6 text-sm text-bq-muted sm:flex-row">
            <a
              href={CONTACT_PHONE_HREF}
              className="flex items-center gap-2 transition-colors hover:text-bq-accent"
            >
              <Phone size={16} className="text-bq-accent" />
              {CONTACT_PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-bq-accent/25 bg-bq-accent/10 px-5 py-3 font-medium text-bq-white transition-colors hover:border-bq-accent hover:text-bq-accent"
            >
              <MessageCircle size={16} className="text-bq-accent" />
              Написать в WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
