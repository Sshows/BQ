"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

const services = [
  "Съёмка (BQ Media)",
  "Аренда техники (BQ Rental)",
  "Покупка техники (BQ Store)",
  "Подкаст-студия (BQ Studio)",
  "Продакшн (BQ Production)",
  "Другое",
];

export default function ConsultForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      date: new Date().toLocaleString("ru-RU"),
    };

    try {
      const sheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
      if (sheetUrl) {
        await fetch(sheetUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section id="consult" className="py-32 bg-bq-black">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle size={64} className="text-bq-accent mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Заявка отправлена</h2>
            <p className="text-bq-muted">
              Мы свяжемся с вами в ближайшее время. Спасибо за интерес к BQ!
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="consult" className="py-32 bg-bq-black">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <p className="text-bq-accent text-sm uppercase tracking-[0.3em] mb-4">
              Связаться
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Получить консультацию
            </h2>
            <p className="mt-4 text-bq-muted">
              Расскажите о вашем проекте &mdash; мы подберём лучшее решение
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-bq-muted mb-2"
                >
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-bq-dark border border-white/10 rounded-lg text-bq-white focus:border-bq-accent focus:outline-none transition-colors"
                  placeholder="Ваше имя"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm text-bq-muted mb-2"
                >
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 bg-bq-dark border border-white/10 rounded-lg text-bq-white focus:border-bq-accent focus:outline-none transition-colors"
                  placeholder="+7 ..."
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="service"
                className="block text-sm text-bq-muted mb-2"
              >
                Направление
              </label>
              <select
                id="service"
                name="service"
                required
                className="w-full px-4 py-3 bg-bq-dark border border-white/10 rounded-lg text-bq-white focus:border-bq-accent focus:outline-none transition-colors appearance-none"
              >
                <option value="">Выберите направление</option>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm text-bq-muted mb-2"
              >
                Сообщение
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-3 bg-bq-dark border border-white/10 rounded-lg text-bq-white focus:border-bq-accent focus:outline-none transition-colors resize-none"
                placeholder="Расскажите о вашем проекте..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-bq-accent text-bq-black font-semibold rounded-lg hover:bg-amber-400 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                "Отправка..."
              ) : (
                <>
                  Отправить заявку
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
