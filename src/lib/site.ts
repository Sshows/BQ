export const SITE_URL = "https://bqmedia-kz.vercel.app";

export const CONTACT_PHONE_DISPLAY = "+7 707 049 05 55";
export const CONTACT_PHONE_HREF = "tel:+77070490555";
export const CONTACT_EMAIL = "info@bqmedia.kz";
export const WHATSAPP_URL =
  "https://wa.me/77070490555?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20%D1%81%20BQ%20Media.";

export type ContactLocation = {
  city: string;
  address: string;
  footerAddress: string;
  services: string[];
};

export const CONTACT_LOCATIONS: ContactLocation[] = [
  {
    city: "Алматы",
    address: "Коктем-3, 24 / ЖК Central Esentai Residence",
    footerAddress: "Коктем-3, 24",
    services: ["BQ Media", "BQ Rental", "BQ Studio", "BQ Store"],
  },
  {
    city: "Астана",
    address: "Бухар Жырау, 42, офис 9",
    footerAddress: "Бухар Жырау, 42",
    services: ["BQ Store", "BQ Studio"],
  },
];

export type InstagramProfile = {
  label: string;
  handle: string;
  href: string;
};

export const BQ_MEDIA_INSTAGRAM: InstagramProfile = {
  label: "BQ Media",
  handle: "bqmediakz",
  href: "https://www.instagram.com/bqmediakz/",
};

export const BQ_RENTAL_INSTAGRAM: InstagramProfile = {
  label: "BQ Rental",
  handle: "bqrental",
  href: "https://www.instagram.com/bqrental/",
};

export const BQ_STORE_INSTAGRAM: InstagramProfile = {
  label: "BQ Store",
  handle: "bqstorekz",
  href: "https://www.instagram.com/bqstorekz/",
};

export const BQ_STUDIO_INSTAGRAM: InstagramProfile = {
  label: "BQ Studio",
  handle: "bqstudio_astana",
  href: "https://www.instagram.com/bqstudio_astana/",
};

export const BQ_PRODUCTION_INSTAGRAM: InstagramProfile = {
  label: "BQ Production",
  handle: "bq_production.kz",
  href: "https://www.instagram.com/bq_production.kz/",
};

export const INSTAGRAM_PROFILES: InstagramProfile[] = [
  BQ_MEDIA_INSTAGRAM,
  BQ_RENTAL_INSTAGRAM,
  BQ_STORE_INSTAGRAM,
  BQ_STUDIO_INSTAGRAM,
  BQ_PRODUCTION_INSTAGRAM,
];

export const PRIMARY_NAV_LINKS = [
  { href: "/media", label: "BQ Media" },
  { href: "/rental", label: "BQ Rental" },
  { href: "/store", label: "BQ Store" },
  { href: "/studio", label: "BQ Studio" },
  { href: "/production", label: "BQ Production" },
];

export const NAV_LINKS = [
  ...PRIMARY_NAV_LINKS,
  { href: "/cases", label: "Кейсы" },
  { href: "/#contact", label: "Контакты" },
];

export const SITEMAP_ROUTES = [
  "/",
  ...PRIMARY_NAV_LINKS.map((link) => link.href),
  "/cases",
];
