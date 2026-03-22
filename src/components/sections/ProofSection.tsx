import Link from "next/link";
import { MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/site";

const proofStats = [
  { value: "215+", label: "единиц техники внутри экосистемы" },
  { value: "2", label: "города присутствия: Алматы и Астана" },
  { value: "3", label: "кейса уже раскрыты как отдельные страницы" },
  { value: "1", label: "точка входа для съемки, студии и production" },
];

const proofItems = [
  {
    title: "Не нужно собирать подрядчиков по частям",
    description:
      "Команду, технику, студию и продакшн можно закрыть внутри BQ, а не координировать через несколько разных людей.",
    icon: ShieldCheck,
  },
  {
    title: "Сайт работает как витрина и как заявка",
    description:
      "Человек может посмотреть кейсы, перейти в Instagram или YouTube, а затем сразу оставить запрос через форму или WhatsApp.",
    icon: Sparkles,
  },
  {
    title: "Коммуникация короче и спокойнее",
    description:
      "Для клиента это удобнее: меньше лишних шагов, понятнее структура, быстрее старт по задаче и проще вернуться к вам повторно.",
    icon: MessageCircle,
  },
];

export default function ProofSection() {
  return (
    <section className="section-pad bg-bq-black">
      <div className="container-bq">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-bq-accent">
            Доверие
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Сайт должен не просто нравиться,
            <br />
            а помогать принимать решение
          </h2>
          <p className="mt-4 text-bq-muted">
            Поэтому мы усилили не только визуал, но и подачу: кейсы, быстрые
            сценарии перехода, понятные контакты и более уверенную структуру
            для клиента.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {proofStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="text-3xl font-bold text-gradient">{stat.value}</div>
              <div className="mt-2 text-sm leading-relaxed text-bq-white/65">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {proofItems.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
            >
              <item.icon size={24} className="text-bq-accent" />
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-bq-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/cases" className="btn btn-primary">
            Открыть кейсы
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            Написать в WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
