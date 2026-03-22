import Link from "next/link";
import { MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { PROOF_CONTENT } from "@/lib/content";
import { WHATSAPP_URL } from "@/lib/site";

const icons = [ShieldCheck, Sparkles, MessageCircle] as const;

export default function ProofSection() {
  const [firstLine, secondLine] = PROOF_CONTENT.title.split("\n");

  return (
    <section className="section-pad bg-bq-black">
      <div className="container-bq">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-bq-accent">
            {PROOF_CONTENT.eyebrow}
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {firstLine},
            <br />
            {secondLine}
          </h2>
          <p className="mt-4 text-bq-muted">{PROOF_CONTENT.description}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PROOF_CONTENT.stats.map((stat) => (
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
          {PROOF_CONTENT.items.map((item, index) => {
            const Icon = icons[index] ?? ShieldCheck;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <Icon size={24} className="text-bq-accent" />
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bq-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {PROOF_CONTENT.channels.map((channel) => (
            <article
              key={channel.title}
              className="rounded-[26px] border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="text-xs uppercase tracking-[0.24em] text-bq-accent">
                Площадки
              </div>
              <h3 className="mt-4 text-xl font-semibold">{channel.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-bq-muted">
                {channel.description}
              </p>
              {channel.external ? (
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex text-sm font-medium text-bq-accent"
                >
                  {channel.actionLabel}
                </a>
              ) : (
                <Link
                  href={channel.href}
                  className="mt-5 inline-flex text-sm font-medium text-bq-accent"
                >
                  {channel.actionLabel}
                </Link>
              )}
            </article>
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
