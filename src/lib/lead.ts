import "server-only";

export type LeadPayload = {
  name: string;
  phone: string;
  service: string;
  message: string;
  source: string;
  submittedAt: string;
  referrer: string;
  userAgent: string;
  ip: string;
};

type DeliveryChannel = "google-sheets" | "telegram";

type DeliveryResult = {
  channel: DeliveryChannel;
  ok: boolean;
  error?: string;
};

function getTimeoutSignal(timeoutMs: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  return {
    signal: controller.signal,
    clear: () => clearTimeout(timeout),
  };
}

async function sendGoogleSheets(
  payload: LeadPayload,
  googleSheetsUrl: string
): Promise<DeliveryResult> {
  const { signal, clear } = getTimeoutSignal(8000);

  try {
    const response = await fetch(googleSheetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal,
    });

    if (!response.ok) {
      return {
        channel: "google-sheets",
        ok: false,
        error: `Google Sheets responded with ${response.status}`,
      };
    }

    return { channel: "google-sheets", ok: true };
  } catch (error) {
    return {
      channel: "google-sheets",
      ok: false,
      error:
        error instanceof Error && error.name === "AbortError"
          ? "Google Sheets request timed out"
          : "Google Sheets request failed",
    };
  } finally {
    clear();
  }
}

function buildTelegramMessage(payload: LeadPayload) {
  return [
    "Новая заявка с сайта BQ",
    `Имя: ${payload.name}`,
    `Телефон: ${payload.phone}`,
    `Направление: ${payload.service}`,
    payload.message ? `Сообщение: ${payload.message}` : null,
    `Источник: ${payload.source}`,
    `Дата: ${payload.submittedAt}`,
    payload.referrer ? `Referrer: ${payload.referrer}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendTelegram(
  payload: LeadPayload,
  botToken: string,
  chatId: string
): Promise<DeliveryResult> {
  const { signal, clear } = getTimeoutSignal(8000);

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: buildTelegramMessage(payload),
          disable_web_page_preview: true,
        }),
        cache: "no-store",
        signal,
      }
    );

    if (!response.ok) {
      return {
        channel: "telegram",
        ok: false,
        error: `Telegram responded with ${response.status}`,
      };
    }

    return { channel: "telegram", ok: true };
  } catch (error) {
    return {
      channel: "telegram",
      ok: false,
      error:
        error instanceof Error && error.name === "AbortError"
          ? "Telegram request timed out"
          : "Telegram request failed",
    };
  } finally {
    clear();
  }
}

export async function deliverLead(payload: LeadPayload) {
  const googleSheetsUrl =
    process.env.GOOGLE_SHEETS_URL?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL?.trim();
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const telegramChatId = process.env.TELEGRAM_CHAT_ID?.trim();

  const tasks: Promise<DeliveryResult>[] = [];

  if (googleSheetsUrl) {
    tasks.push(sendGoogleSheets(payload, googleSheetsUrl));
  }

  if (telegramBotToken && telegramChatId) {
    tasks.push(sendTelegram(payload, telegramBotToken, telegramChatId));
  }

  if (tasks.length === 0) {
    return { ok: true, channels: [] as DeliveryChannel[], mode: "disabled" };
  }

  const results = await Promise.all(tasks);
  const successful = results.filter((result) => result.ok);

  if (successful.length === 0) {
    return {
      ok: false,
      channels: [] as DeliveryChannel[],
      errors: results.map((result) => result.error).filter(Boolean),
    };
  }

  return {
    ok: true,
    channels: successful.map((result) => result.channel),
    errors: results
      .filter((result) => !result.ok)
      .map((result) => result.error)
      .filter(Boolean),
  };
}
