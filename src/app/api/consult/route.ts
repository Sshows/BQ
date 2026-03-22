import { NextResponse } from "next/server";
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

  const googleSheetsUrl =
    process.env.GOOGLE_SHEETS_URL?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL?.trim();

  if (!googleSheetsUrl) {
    return NextResponse.json({ ok: true, storage: "disabled" });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(googleSheetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Сервис временно недоступен. Попробуйте еще раз чуть позже.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, storage: "google-sheets" });
  } catch (error) {
    clearTimeout(timeout);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error && error.name === "AbortError"
            ? "Ответ от сервиса занял слишком много времени. Попробуйте еще раз."
            : "Не удалось отправить заявку. Попробуйте еще раз.",
      },
      { status: 502 }
    );
  }
}
