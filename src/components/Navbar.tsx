"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

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
    <nav className="fixed left-0 right-0 top-0 z-50 glass">
      <div className="container-bq flex items-center justify-between py-4">
        <BrandLogo
          className="flex items-center"
          imageClassName="h-14 w-14 object-contain"
          width={56}
          height={56}
          priority
        />

        <div className="hidden items-center gap-8 lg:flex">
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
          <Link href="/#consult" className="btn btn-primary ml-4">
            Консультация
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-bq-white/70 transition-colors hover:text-bq-accent lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="glass border-t border-white/10 lg:hidden">
          <div className="container-bq flex flex-col gap-3 py-6">
            {navLinks.map((link) => {
              const isHash = link.href.startsWith("/#");
              const isActive = !isHash && pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base transition-colors ${
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
              className="btn btn-primary mt-2 w-full"
            >
              Консультация
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
