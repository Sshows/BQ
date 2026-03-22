import Link from "next/link";
import { Instagram, Phone, MapPin, Mail, MessageCircle } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const directions = [
  { href: "/media", label: "BQ Media" },
  { href: "/rental", label: "BQ Rental" },
  { href: "/store", label: "BQ Store" },
  { href: "/studio", label: "BQ Studio" },
  { href: "/production", label: "BQ Production" },
  { href: "/bqfilms", label: "BQFILMS" },
];

const socials = [
  {
    href: "https://www.instagram.com/bqmediakz",
    label: "BQ Media",
    icon: Instagram,
  },
  {
    href: "https://www.instagram.com/bqrental",
    label: "BQ Rental",
    icon: Instagram,
  },
  {
    href: "https://www.instagram.com/bqstorekz",
    label: "BQ Store",
    icon: Instagram,
  },
  {
    href: "https://www.instagram.com/bqstudio_astana",
    label: "BQ Studio",
    icon: Instagram,
  },
  {
    href: "https://www.instagram.com/bq_production.kz",
    label: "BQ Production",
    icon: Instagram,
  },
];

const phoneDisplay = "+7 707 049 05 55";
const phoneHref = "tel:+77070490555";
const whatsappHref =
  "https://wa.me/77070490555?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20%D1%81%20BQ%20Media.";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bq-dark">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandLogo
              className="inline-flex items-center"
              imageClassName="h-20 w-20 object-contain"
              width={80}
              height={80}
            />
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
              {directions.map((d) => (
                <li key={d.href}>
                  <Link
                    href={d.href}
                    className="text-sm text-bq-muted transition-colors hover:text-bq-accent"
                  >
                    {d.label}
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
                  href={phoneHref}
                  className="transition-colors hover:text-bq-accent"
                >
                  {phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={14} className="shrink-0 text-bq-accent" />
                <a
                  href={whatsappHref}
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
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-bq-muted transition-colors hover:text-bq-accent"
                  >
                    <s.icon size={14} />
                    {s.label}
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
