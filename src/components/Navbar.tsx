"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/media", label: "BQ Media" },
  { href: "/rental", label: "BQ Rental" },
  { href: "/store", label: "BQ Store" },
  { href: "/studio", label: "BQ Studio" },
  { href: "/production", label: "BQ Production" },
  { href: "/bqfilms", label: "BQFILMS" },
  { href: "/#contact", label: "Контакты" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container-bq py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          <span className="text-bq-accent">BQ</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isHash = link.href.startsWith("/#");
            const isActive = !isHash && pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors duration-300 ${
                  isActive
                    ? "text-bq-accent"
                    : "text-bq-white/70 hover:text-bq-accent"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/#consult"
            className="ml-4 btn btn-primary"
          >
            Консультация
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-bq-white/70 hover:text-bq-accent transition-colors rounded-lg p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass border-t border-white/10">
          <div className="container-bq py-6 flex flex-col gap-3">
            {navLinks.map((link) => {
              const isHash = link.href.startsWith("/#");
              const isActive = !isHash && pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 transition-colors text-base ${
                    isActive
                      ? "bg-white/5 text-bq-accent"
                      : "text-bq-white/80 hover:bg-white/5 hover:text-bq-accent"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/#consult"
              onClick={() => setOpen(false)}
              className="mt-2 btn btn-primary w-full"
            >
              Консультация
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
