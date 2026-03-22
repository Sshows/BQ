import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  CASE_STUDIES,
  type CaseLink,
  getCaseStudyBySlug,
} from "@/lib/cases";
import { SITE_NAME, SITE_URL, WHATSAPP_URL } from "@/lib/site";

type CasePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return CASE_STUDIES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Кейс не найден",
    };
  }

  const imageUrl = caseStudy.heroImage.startsWith("http")
    ? caseStudy.heroImage
    : `${SITE_URL}${caseStudy.heroImage}`;

  return {
    title: `${caseStudy.title} - кейс`,
    description: caseStudy.cardDescription,
    alternates: {
      canonical: `/cases/${caseStudy.slug}`,
    },
    openGraph: {
      title: `${caseStudy.title} | ${SITE_NAME}`,
      description: caseStudy.cardDescription,
      type: "article",
      images: [
        {
          url: imageUrl,
        },
      ],
    },
  };
}

function renderAction(link: CaseLink, isPrimary: boolean) {
  const className = isPrimary ? "btn btn-primary" : "btn btn-ghost";
  const content = (
    <>
      {link.label}
      {isPrimary ? <ArrowRight size={14} /> : null}
    </>
  );

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {content}
    </Link>
  );
}

export default async function CaseDetailPage({ params }: CasePageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const currentIndex = CASE_STUDIES.findIndex((item) => item.slug === slug);
  const nextCase = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];
  const imageUrl = caseStudy.heroImage.startsWith("http")
    ? caseStudy.heroImage
    : `${SITE_URL}${caseStudy.heroImage}`;

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: caseStudy.title,
    description: caseStudy.cardDescription,
    url: `${SITE_URL}/cases/${caseStudy.slug}`,
    image: [imageUrl, ...caseStudy.supportingImages],
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    keywords: [caseStudy.category, caseStudy.tag],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Кейсы",
        item: `${SITE_URL}/cases`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: caseStudy.title,
        item: `${SITE_URL}/cases/${caseStudy.slug}`,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <main className="bg-bq-black pt-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        <section className="section-pad pb-10">
          <div className="container-bq">
            <Link
              href="/cases"
              className="mb-8 inline-flex items-center gap-2 text-sm text-bq-muted transition-colors hover:text-bq-accent"
            >
              <ArrowLeft size={14} />
              Назад к кейсам
            </Link>

            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-bq-accent">
                  {caseStudy.tag} · {caseStudy.category}
                </p>
                <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  {caseStudy.title}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bq-muted">
                  {caseStudy.heroDescription}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {renderAction(caseStudy.primaryCta, true)}
                  {caseStudy.secondaryCta
                    ? renderAction(caseStudy.secondaryCta, false)
                    : null}
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {caseStudy.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="text-2xl font-bold text-gradient">
                        {metric.value}
                      </div>
                      <div className="mt-2 text-sm text-bq-white/65">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative aspect-[16/11] overflow-hidden rounded-[30px] border border-white/10 bg-bq-gray">
                <Image
                  src={caseStudy.heroImage}
                  alt={caseStudy.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad bg-bq-dark">
          <div className="container-bq grid gap-5 lg:grid-cols-3">
            {[
              { title: "Задача", description: caseStudy.challenge },
              { title: "Подход", description: caseStudy.approach },
              { title: "Результат", description: caseStudy.result },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-bq-accent">
                  {item.title}
                </p>
                <p className="mt-4 leading-relaxed text-bq-white/78">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-pad bg-bq-black">
          <div className="container-bq">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-bq-accent">
                Визуальная подача
              </p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Как это выглядит в проекте
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {caseStudy.supportingImages.map((image, index) => (
                <div
                  key={`${caseStudy.slug}-${index}`}
                  className="relative aspect-[16/11] overflow-hidden rounded-[28px] border border-white/10 bg-bq-gray"
                >
                  <Image
                    src={image}
                    alt={`${caseStudy.title} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad bg-bq-dark">
          <div className="container-bq grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-bq-accent">
                Что получает клиент
              </p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Не просто съемку, а готовый материал под задачу
              </h2>
            </div>

            <div className="grid gap-4">
              {caseStudy.deliverables.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-bq-white/78"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad bg-bq-black">
          <div className="container-bq grid gap-6 lg:grid-cols-2">
            <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-bq-accent">
                Следующий шаг
              </p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Хотите похожий результат для своего проекта?
              </h2>
              <p className="mt-4 text-bq-muted">
                Можно обсудить задачу через сайт или сразу перейти в WhatsApp,
                если удобнее решать быстрее.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/#consult" className="btn btn-primary">
                  Оставить заявку
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

            <Link
              href={`/cases/${nextCase.slug}`}
              className="group rounded-[30px] border border-white/10 bg-white/[0.04] p-8 transition-colors hover:border-bq-accent/25 hover:bg-white/[0.06]"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-bq-accent">
                Следующий кейс
              </p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                {nextCase.title}
              </h2>
              <p className="mt-4 text-bq-muted">{nextCase.cardDescription}</p>
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-bq-accent">
                Открыть кейс
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
