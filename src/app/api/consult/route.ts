import { NextResponse } from "next/server";
import { deliverLead } from "@/lib/lead";
import { SERVICE_OPTIONS_SET } from "@/lib/services";

export const runtime = "nodejs";

function sanitizeText(value: unknown, maxLength: number) {
  return String(value ?? "")
    .replace(/[<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function sanitizePhone(value: unknown) {
  return String(value ?? "")
    .replace(/[^\d+\-() ]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 30);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Некорректный формат заявки." },
      { status: 400 }
    );
  }

  const company = sanitizeText(body.company, 120);
  if (company) {
    return NextResponse.json({ ok: true, spam: true });
  }

  const name = sanitizeText(body.name, 80);
  const phone = sanitizePhone(body.phone);
  const service = sanitizeText(body.service, 80);
  const message = sanitizeText(body.message, 1200);

  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Укажите имя." },
      { status: 400 }
    );
  }

  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { ok: false, error: "Укажите корректный номер телефона." },
      { status: 400 }
    );
  }

  if (!SERVICE_OPTIONS_SET.has(service)) {
    return NextResponse.json(
      { ok: false, error: "Выберите направление." },
      { status: 400 }
    );
  }

  const payload = {
    name,
    phone,
    service,
    message,
    source: "bqmedia-site",
    submittedAt: new Date().toISOString(),
    referrer: sanitizeText(request.headers.get("referer"), 200),
    userAgent: sanitizeText(request.headers.get("user-agent"), 200),
    ip: sanitizeText(
      request.headers.get("x-forwarded-for")?.split(",")[0] ?? "",
      80
    ),
  };

  const delivery = await deliverLead(payload);

  if (!delivery.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Не удалось доставить заявку. Попробуйте еще раз или продублируйте запрос в WhatsApp.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    channels: delivery.channels.length > 0 ? delivery.channels : ["disabled"],
  });
}
