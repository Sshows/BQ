"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import WordmarkLogo from "@/components/WordmarkLogo";
import { NAV_LINKS } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50">
      <div className="glass border-b border-white/10">
        <div className="container-bq flex min-h-[76px] items-center justify-between py-3">
          <WordmarkLogo />

          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
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
              Оставить заявку
            </Link>
          </div>

          <button
            onClick={() => setOpen((value) => !value)}
            className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl border border-white/10 bg-white/5 text-bq-white/80 transition-colors hover:text-bq-accent lg:hidden"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="glass border-b border-white/10 lg:hidden"
          >
            <div className="container-bq flex max-h-[calc(100svh-76px)] flex-col gap-3 overflow-y-auto py-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              {NAV_LINKS.map((link) => {
                const isHash = link.href.startsWith("/#");
                const isActive = !isHash && pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-[54px] items-center rounded-2xl px-4 text-base transition-colors ${
                      isActive
                        ? "bg-white/10 text-bq-accent"
                        : "bg-white/5 text-bq-white/85 hover:bg-white/10 hover:text-bq-accent"
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
                Оставить заявку
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
