"use client";

import Link from "next/link";
import { MessageCircle, Phone, Sparkles } from "lucide-react";
import { CONTACT_PHONE_HREF, WHATSAPP_URL } from "@/lib/site";

export default function MobileStickyActions() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-bq-black/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-3xl grid-cols-3 gap-2">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[54px] items-center justify-center gap-2 rounded-2xl bg-bq-accent px-3 text-sm font-semibold text-bq-black"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
        <a
          href={CONTACT_PHONE_HREF}
          className="flex min-h-[54px] items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[0.05] px-3 text-sm font-semibold text-bq-white/85"
        >
          <Phone size={16} />
          Позвонить
        </a>
        <Link
          href="/#consult"
          className="flex min-h-[54px] items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[0.05] px-3 text-sm font-semibold text-bq-white/85"
        >
          <Sparkles size={16} />
          Заявка
        </Link>
      </div>
    </div>
  );
}
