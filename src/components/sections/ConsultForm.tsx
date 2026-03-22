"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  MessageCircle,
  Phone,
  RotateCcw,
  Send,
} from "lucide-react";
import { CONSULT_CONTENT } from "@/lib/content";
import { WHATSAPP_URL } from "@/lib/site";
import { SERVICE_OPTIONS } from "@/lib/services";

type FormStatus = "idle" | "submitting" | "success" | "error";
type DeliveryMode = "disabled" | "delivered" | "partial";

const CHANNEL_LABELS: Record<string, string> = {
  telegram: "Telegram",
  "google-sheets": "таблица",
  disabled: "веб-форма",
};

export default function ConsultForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("disabled");
  const [deliveryChannels, setDeliveryChannels] = useState<string[]>([]);
  const [deliveryWarnings, setDeliveryWarnings] = useState<string[]>([]);

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
        channels?: string[];
        deliveryMode?: DeliveryMode;
        warnings?: string[];
      };

      if (!response.ok || !result.ok) {
        throw new Error(
          result.error ||
            "Не удалось отправить заявку. Попробуйте еще раз или напишите нам в WhatsApp."
        );
      }

      form.reset();
      setDeliveryMode(result.deliveryMode ?? "disabled");
      setDeliveryChannels(result.channels ?? []);
      setDeliveryWarnings(result.warnings ?? []);
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
    const successMessage =
      deliveryMode === "disabled"
        ? "Заявка принята на сайте. Чтобы ускорить ответ, можно сразу написать нам в WhatsApp."
        : deliveryMode === "partial"
          ? "Заявка уже передана команде BQ. Один из внутренних каналов сработал неидеально, поэтому для срочных задач лучше продублировать запрос в WhatsApp."
          : "Заявка уже передана команде BQ. Мы посмотрим задачу и вернемся к вам с удобным форматом работы.";

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
            <p className="text-bq-muted">{successMessage}</p>

            {deliveryChannels.length > 0 ? (
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {deliveryChannels.map((channel) => (
                  <span
                    key={channel}
                    className="rounded-full border border-bq-accent/25 bg-bq-accent/10 px-3 py-1 text-xs text-bq-accent"
                  >
                    {CHANNEL_LABELS[channel] ?? channel}
                  </span>
                ))}
              </div>
            ) : null}

            {deliveryWarnings.length > 0 ? (
              <p className="mt-4 text-sm text-bq-white/45">
                {deliveryWarnings.join(" ")}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="btn btn-ghost w-full sm:w-auto"
              >
                <RotateCcw size={16} />
                Описать еще проект
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full sm:w-auto"
              >
                <MessageCircle size={16} />
                Написать в WhatsApp
              </a>
            </div>
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
              {CONSULT_CONTENT.eyebrow}
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              {CONSULT_CONTENT.title}
            </h2>
            <p className="mt-4 text-bq-muted">{CONSULT_CONTENT.description}</p>
          </div>

          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            {CONSULT_CONTENT.hints.map((hint) => (
              <div
                key={hint}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-bq-white/72"
              >
                {hint}
              </div>
            ))}
          </div>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            {CONSULT_CONTENT.secondaryActions.map((action) => {
              const isPhone = action.href.startsWith("tel:");
              const Icon = isPhone ? Phone : MessageCircle;

              return (
                <a
                  key={action.label}
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noopener noreferrer" : undefined}
                  className="btn btn-ghost w-full sm:w-auto"
                >
                  <Icon size={16} />
                  {action.label}
                </a>
              );
            })}
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
                placeholder="Опишите формат, сроки, город съемки или то, что хотите получить на выходе."
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
                "Отправляем..."
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
