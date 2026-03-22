import Link from "next/link";
import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import WordmarkLogo from "@/components/WordmarkLogo";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  INSTAGRAM_PROFILES,
  PRIMARY_NAV_LINKS,
  WHATSAPP_URL,
} from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bq-dark">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <WordmarkLogo size="lg" />
            <p className="mt-4 text-sm leading-relaxed text-bq-muted">
              Экосистема фото, видео и медиа в Казахстане. Снимаем, оснащаем,
              записываем и продюсируем.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-bq-white/50">
              Направления
            </h4>
            <ul className="space-y-3">
              {PRIMARY_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-bq-muted transition-colors hover:text-bq-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-bq-white/50">
              Контакты
            </h4>
            <ul className="space-y-3 text-sm text-bq-muted">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0 text-bq-accent" />
                <span>Алматы, Коктем-3, 24</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0 text-bq-accent" />
                <span>Астана, Бухар Жырау, 42</span>
              </li>
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
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-bq-accent" />
                <a
                  href="mailto:info@bqmedia.kz"
                  className="transition-colors hover:text-bq-accent"
                >
                  info@bqmedia.kz
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-bq-white/50">
              Социальные сети
            </h4>
            <ul className="space-y-3">
              {INSTAGRAM_PROFILES.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-bq-muted transition-colors hover:text-bq-accent"
                  >
                    <Instagram size={14} />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-bq-muted">
            &copy; {new Date().getFullYear()} BQ Ecosystem. Все права защищены.
          </p>
          <a
            href="https://www.instagram.com/butiabq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-bq-muted transition-colors hover:text-bq-accent"
          >
            Основатель: Бақ-Даулет Абжатов
          </a>
        </div>
      </div>
    </footer>
  );
}
