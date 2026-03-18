"use client";

import { useState } from "react";
import Link from "next/link";
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          <span className="text-bq-accent">BQ</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-bq-white/70 hover:text-bq-accent transition-colors duration-300 tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#consult"
            className="ml-4 px-5 py-2.5 bg-bq-accent text-bq-black text-sm font-semibold rounded hover:bg-amber-400 transition-colors duration-300"
          >
            Консультация
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-bq-white/70 hover:text-bq-accent transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass border-t border-white/10">
          <div className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-bq-white/70 hover:text-bq-accent transition-colors text-lg"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#consult"
              onClick={() => setOpen(false)}
              className="mt-2 px-5 py-3 bg-bq-accent text-bq-black text-center font-semibold rounded hover:bg-amber-400 transition-colors"
            >
              Консультация
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
