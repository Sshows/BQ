export const SITE_URL = "https://bqmedia-kz.vercel.app";

export const CONTACT_PHONE_DISPLAY = "+7 707 049 05 55";
export const CONTACT_PHONE_HREF = "tel:+77070490555";
export const WHATSAPP_URL =
  "https://wa.me/77070490555?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20%D1%81%20BQ%20Media.";

export const PRIMARY_NAV_LINKS = [
  { href: "/media", label: "BQ Media" },
  { href: "/rental", label: "BQ Rental" },
  { href: "/store", label: "BQ Store" },
  { href: "/studio", label: "BQ Studio" },
  { href: "/production", label: "BQ Production" },
];

export const NAV_LINKS = [
  ...PRIMARY_NAV_LINKS,
  { href: "/#contact", label: "Контакты" },
];

export const SITEMAP_ROUTES = [
  "/",
  ...PRIMARY_NAV_LINKS.map((link) => link.href),
];
