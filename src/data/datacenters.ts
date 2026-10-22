export interface Country {
  id: string;
  fa: string;
  en: string;
  region: "ir" | "eu" | "na" | "asia" | "oceania";
  flag: string;
}
export const countries: Country[] = [
  { id: "ir", fa: "ایران", en: "Iran", region: "ir", flag: "🇮🇷" },
  { id: "de", fa: "آلمان", en: "Germany", region: "eu", flag: "🇩🇪" },
  { id: "fi", fa: "فنلاند", en: "Finland", region: "eu", flag: "🇫🇮" },
  { id: "fr", fa: "فرانسه", en: "France", region: "eu", flag: "🇫🇷" },
  { id: "gb", fa: "انگلستان", en: "United Kingdom", region: "eu", flag: "🇬🇧" },
  { id: "pl", fa: "لهستان", en: "Poland", region: "eu", flag: "🇵🇱" },
  { id: "us", fa: "آمریکا", en: "United States", region: "na", flag: "🇺🇸" },
  { id: "ca", fa: "کانادا", en: "Canada", region: "na", flag: "🇨🇦" },
  { id: "sg", fa: "سنگاپور", en: "Singapore", region: "asia", flag: "🇸🇬" },
  { id: "au", fa: "استرالیا", en: "Australia", region: "oceania", flag: "🇦🇺" },
];
export interface Datacenter {
  id: string;
  country: string;
  fa: string;
  en: string;
  source: string;
  inventoryVerified: false;
}
// Public operator locations are references; reseller stock and service availability are NOT verified.
export const datacenters: Datacenter[] = [
  {
    id: "ir-asiatech",
    country: "ir",
    fa: "آسیاتک — مرکز داده ایران",
    en: "Asiatech — Iran",
    source: "https://www.asiatech.ir/",
    inventoryVerified: false,
  },
  {
    id: "ir-afranet",
    country: "ir",
    fa: "افرانت — مرکز داده ایران",
    en: "Afranet — Iran",
    source: "https://www.afranet.com/",
    inventoryVerified: false,
  },
  {
    id: "de-fsn",
    country: "de",
    fa: "هتزنر — فالکنشتاین",
    en: "Hetzner — Falkenstein",
    source:
      "https://docs.hetzner.com/general/infrastructure-and-availability/data-centers-and-connection/",
    inventoryVerified: false,
  },
  {
    id: "de-nbg",
    country: "de",
    fa: "هتزنر — نورنبرگ",
    en: "Hetzner — Nuremberg",
    source:
      "https://docs.hetzner.com/general/infrastructure-and-availability/data-centers-and-connection/",
    inventoryVerified: false,
  },
  {
    id: "fi-hel",
    country: "fi",
    fa: "هتزنر — هلسینکی",
    en: "Hetzner — Helsinki",
    source:
      "https://docs.hetzner.com/general/infrastructure-and-availability/data-centers-and-connection/",
    inventoryVerified: false,
  },
  {
    id: "fr-gra",
    country: "fr",
    fa: "OVHcloud — گراولین",
    en: "OVHcloud — Gravelines",
    source: "https://www.ovhcloud.com/en/datacenter/",
    inventoryVerified: false,
  },
  {
    id: "fr-sbg",
    country: "fr",
    fa: "OVHcloud — استراسبورگ",
    en: "OVHcloud — Strasbourg",
    source: "https://www.ovhcloud.com/en/datacenter/",
    inventoryVerified: false,
  },
  {
    id: "gb-lon",
    country: "gb",
    fa: "OVHcloud — لندن",
    en: "OVHcloud — London",
    source: "https://www.ovhcloud.com/en/datacenter/",
    inventoryVerified: false,
  },
  {
    id: "pl-waw",
    country: "pl",
    fa: "OVHcloud — ورشو",
    en: "OVHcloud — Warsaw",
    source: "https://www.ovhcloud.com/en/datacenter/",
    inventoryVerified: false,
  },
  {
    id: "us-vin",
    country: "us",
    fa: "OVHcloud — وینت هیل",
    en: "OVHcloud — Vint Hill",
    source: "https://www.ovhcloud.com/en/datacenter/",
    inventoryVerified: false,
  },
  {
    id: "ca-bhs",
    country: "ca",
    fa: "OVHcloud — بوهرنوا",
    en: "OVHcloud — Beauharnois",
    source: "https://www.ovhcloud.com/en/datacenter/",
    inventoryVerified: false,
  },
  {
    id: "sg-sin",
    country: "sg",
    fa: "OVHcloud — سنگاپور",
    en: "OVHcloud — Singapore",
    source: "https://www.ovhcloud.com/en/datacenter/",
    inventoryVerified: false,
  },
  {
    id: "au-syd",
    country: "au",
    fa: "OVHcloud — سیدنی",
    en: "OVHcloud — Sydney",
    source: "https://www.ovhcloud.com/en/datacenter/",
    inventoryVerified: false,
  },
];
export const datacentersFor = (country: string) =>
  datacenters.filter((dc) => dc.country === country);
export const validDatacenter = (country: string, id: string) =>
  datacenters.some((dc) => dc.country === country && dc.id === id);
export function countryFromCategory(category: string, fallback = "ir") {
  const dc = datacenters.find(
    (item) => category === `order-dedicated-dc-${item.id}`,
  );
  if (dc) return dc.country;
  const match = category.match(/(?:^|-)country-([a-z]{2})(?:-|$)/);
  if (match && countries.some((c) => c.id === match[1])) return match[1];
  const segments = category.split("-");
  if (segments.includes("usa")) return "us";
  if (segments.includes("asia")) return "sg";
  if (segments.includes("europe") || segments.includes("international"))
    return "de";
  return fallback;
}
