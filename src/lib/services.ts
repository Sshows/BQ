export const SERVICE_OPTIONS = [
  "Съемка (BQ Media)",
  "Аренда техники (BQ Rental)",
  "Покупка техники (BQ Store)",
  "Подкаст-студия (BQ Studio)",
  "Продакшн (BQ Production)",
  "Другое",
] as const;

export const SERVICE_OPTIONS_SET = new Set<string>(SERVICE_OPTIONS);
