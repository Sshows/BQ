import Link from "next/link";
import { Instagram, Phone, MapPin, Mail, Github } from "lucide-react";

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
  { href: "https://www.instagram.com/bqrental", label: "BQ Rental", icon: Instagram },
  { href: "https://www.instagram.com/bqstorekz", label: "BQ Store", icon: Instagram },
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
  { href: "https://github.com/Sshows/BQ.git", label: "GitHub", icon: Github },
];

export default function Footer() {
  return (
    <footer className="bg-bq-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="text-3xl font-bold tracking-tight">
              <span className="text-bq-accent">BQ</span>
            </Link>
            <p className="mt-4 text-bq-muted text-sm leading-relaxed">
              Экосистема фото, видео и медиа в Казахстане. Снимаем, оснащаем,
              записываем и продюсируем.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-bq-white/50 mb-4">
              Направления
            </h4>
            <ul className="space-y-3">
              {directions.map((d) => (
                <li key={d.href}>
                  <Link
                    href={d.href}
                    className="text-bq-muted hover:text-bq-accent transition-colors text-sm"
                  >
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-bq-white/50 mb-4">
              Контакты
            </h4>
            <ul className="space-y-3 text-sm text-bq-muted">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-bq-accent shrink-0" />
                <span>Алматы, Коктем-3, 24</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-bq-accent shrink-0" />
                <span>Астана, Бухар Жырау, 42</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-bq-accent shrink-0" />
                <a href="tel:+77001234567" className="hover:text-bq-accent transition-colors">
                  +7 700 123 45 67
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-bq-accent shrink-0" />
                <a href="mailto:info@bqmedia.kz" className="hover:text-bq-accent transition-colors">
                  info@bqmedia.kz
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-bq-white/50 mb-4">
              Социальные сети
            </h4>
            <ul className="space-y-3">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-bq-muted hover:text-bq-accent transition-colors"
                  >
                    <s.icon size={14} />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-bq-muted text-xs">
            &copy; {new Date().getFullYear()} BQ Ecosystem. Все права защищены.
          </p>
          <a
            href="https://www.instagram.com/butiabq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bq-muted text-xs hover:text-bq-accent transition-colors"
          >
            Основатель: Бақ-Даулет Абжатов
          </a>
        </div>
      </div>
    </footer>
  );
}
