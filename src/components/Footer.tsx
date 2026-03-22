import Link from "next/link";
import {
  ArrowUpRight,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";
import WordmarkLogo from "@/components/WordmarkLogo";
import { BQFILMS_CHANNEL_URL } from "@/lib/bqfilms";
import {
  BQ_MEDIA_INSTAGRAM,
  BQ_PRODUCTION_INSTAGRAM,
  BQ_STUDIO_INSTAGRAM,
  CONTACT_EMAIL,
  CONTACT_LOCATIONS,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  PRIMARY_NAV_LINKS,
  WHATSAPP_URL,
} from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bq-dark">
      <div className="container-bq py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <WordmarkLogo size="lg" />
            <p className="mt-4 text-sm leading-relaxed text-bq-muted">
              Снимаем, записываем и выпускаем проекты под задачу: от love story
              и reels до подкастов, YouTube-форматов и брендового контента.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-bq-white/80 transition-colors hover:text-bq-accent"
              >
                <MessageCircle size={15} className="text-bq-accent" />
                Написать в WhatsApp
              </a>
              <a
                href={CONTACT_PHONE_HREF}
                className="inline-flex items-center gap-2 text-sm text-bq-white/80 transition-colors hover:text-bq-accent"
              >
                <Phone size={15} className="text-bq-accent" />
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-bq-white/50">
              Разделы
            </h4>
            <ul className="space-y-3">
              {[...PRIMARY_NAV_LINKS, { href: "/cases", label: "Кейсы" }].map(
                (link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-bq-muted transition-colors hover:text-bq-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-bq-white/50">
              Контакты
            </h4>
            <ul className="space-y-3 text-sm text-bq-muted">
              {CONTACT_LOCATIONS.map((location) => (
                <li key={location.city} className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-bq-accent" />
                  <span>
                    {location.city}, {location.footerAddress}
                  </span>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-bq-accent" />
                <a
                  href={CONTACT_PHONE_HREF}
                  className="transition-colors hover:text-bq-accent"
                >
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={14} className="shrink-0 text-bq-accent" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-bq-accent"
                >
                  Написать в WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-bq-accent" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="transition-colors hover:text-bq-accent"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-bq-white/50">
              Площадки
            </h4>
            <ul className="space-y-3">
              {[BQ_MEDIA_INSTAGRAM, BQ_STUDIO_INSTAGRAM, BQ_PRODUCTION_INSTAGRAM].map(
                (social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-bq-muted transition-colors hover:text-bq-accent"
                    >
                      <Instagram size={14} />
                      {social.label}
                      <span className="text-bq-white/35">@{social.handle}</span>
                    </a>
                  </li>
                )
              )}
              <li>
                <a
                  href={BQFILMS_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-bq-muted transition-colors hover:text-bq-accent"
                >
                  <Youtube size={14} />
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-bq-muted">
            &copy; {new Date().getFullYear()} BQ. Съемка и продакшн в Алматы и Астане.
          </p>
          <a
            href="https://www.instagram.com/butiabq"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-bq-muted transition-colors hover:text-bq-accent"
          >
            Основатель: Бак-Даулет Абжатов
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
