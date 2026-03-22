import Link from "next/link";
import { PROCESS_CONTENT } from "@/lib/content";
import { WHATSAPP_URL } from "@/lib/site";

export default function ProcessSection() {
  return (
    <section className="section-pad bg-bq-dark">
      <div className="container-bq">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-bq-accent">
            {PROCESS_CONTENT.eyebrow}
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {PROCESS_CONTENT.title.split("\n")[0]}
            <br />
            {PROCESS_CONTENT.title.split("\n")[1]}
          </h2>
          <p className="mt-4 text-bq-muted">{PROCESS_CONTENT.description}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PROCESS_CONTENT.steps.map((step) => (
            <article
              key={step.step}
              className="rounded-[26px] border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-bq-accent">
                {step.step}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-bq-muted">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/#consult" className="btn btn-primary">
            Оставить заявку
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            Обсудить в WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
