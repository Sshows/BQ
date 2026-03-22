"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, MessageCircle, Send } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/site";
import { SERVICE_OPTIONS } from "@/lib/services";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ConsultForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
    };

    try {
      const response = await fetch("/api/consult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(
          result.error ||
            "Не удалось отправить заявку. Попробуйте еще раз или напишите нам в WhatsApp."
        );
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Не удалось отправить заявку. Попробуйте еще раз."
      );
    }
  }

  if (status === "success") {
    return (
      <section id="consult" className="section-pad bg-bq-black">
        <div className="container-bq max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10"
          >
            <CheckCircle size={64} className="mx-auto mb-6 text-bq-accent" />
            <h2 className="mb-4 text-3xl font-bold">Заявка принята</h2>
            <p className="text-bq-muted">
              Мы свяжемся с вами в ближайшее время. Если вопрос срочный, можно
              сразу написать нам в WhatsApp.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-8 w-full sm:w-auto"
            >
              <MessageCircle size={16} />
              Написать в WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="consult" className="section-pad bg-bq-black">
      <div className="container-bq max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-10 text-center sm:mb-12">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-bq-accent">
              Заявка
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Обсудить проект
            </h2>
            <p className="mt-4 text-bq-muted">
              Напишите пару деталей о задаче - мы быстро свяжемся с вами и
              подскажем удобный формат работы.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              id="company"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="label">
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  className="input"
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <label htmlFor="phone" className="label">
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  minLength={10}
                  maxLength={30}
                  inputMode="tel"
                  autoComplete="tel"
                  className="input"
                  placeholder="+7 707 000 00 00"
                />
              </div>
            </div>

            <div>
              <label htmlFor="service" className="label">
                Направление
              </label>
              <select
                id="service"
                name="service"
                required
                defaultValue=""
                className="input appearance-none"
              >
                <option value="" disabled>
                  Выберите направление
                </option>
                {SERVICE_OPTIONS.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="label">
                Коротко о задаче
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                maxLength={1200}
                className="input min-h-[140px] resize-none"
                placeholder="Опишите формат, сроки, город съемки или то, что хотите снять."
              />
            </div>

            {status === "error" ? (
              <div
                aria-live="polite"
                className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-white/80"
              >
                <p>{errorMessage}</p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-bq-accent"
                >
                  <MessageCircle size={16} />
                  Написать в WhatsApp
                </a>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? (
                "Отправка..."
              ) : (
                <>
                  Отправить заявку
                  <Send size={16} />
                </>
              )}
            </button>

            <p className="text-center text-sm text-bq-white/45">
              Если удобнее, можно не заполнять форму, а сразу перейти в WhatsApp.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
