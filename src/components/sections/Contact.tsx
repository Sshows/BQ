"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_LOCATIONS,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  WHATSAPP_URL,
} from "@/lib/site";

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
            Контакты
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Связаться с нами удобно из любого города
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-bq-muted">
            Работаем в Алматы и Астане. Можно написать в WhatsApp, позвонить
            или оставить заявку на сайте - подскажем по формату и срокам.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {CONTACT_LOCATIONS.map((location, index) => (
            <motion.div
              key={location.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-white/5 bg-bq-black/50 p-6 sm:p-8"
            >
              <h3 className="mb-4 text-2xl font-bold">{location.city}</h3>
              <div className="space-y-3 text-sm text-bq-muted">
                <p className="flex items-start gap-2">
                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0 text-bq-accent"
                  />
                  {location.address}
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
                {location.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-bq-accent/20 px-3 py-1 text-xs text-bq-accent"
                  >
                    {service}
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
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-12 grid gap-4 sm:grid-cols-3"
        >
          <a
            href={CONTACT_PHONE_HREF}
            className="flex min-h-[58px] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-bq-white/85 transition-colors hover:border-bq-accent/30 hover:text-bq-accent"
          >
            <Phone size={16} className="text-bq-accent" />
            {CONTACT_PHONE_DISPLAY}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[58px] items-center justify-center gap-2 rounded-2xl border border-bq-accent/25 bg-bq-accent/10 px-5 py-4 text-sm font-medium text-bq-white transition-colors hover:border-bq-accent hover:text-bq-accent"
          >
            <MessageCircle size={16} className="text-bq-accent" />
            Написать в WhatsApp
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex min-h-[58px] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-bq-white/85 transition-colors hover:border-bq-accent/30 hover:text-bq-accent"
          >
            <Mail size={16} className="text-bq-accent" />
            {CONTACT_EMAIL}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
