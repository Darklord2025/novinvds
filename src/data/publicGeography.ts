import { countries, datacenters, type Country } from "./datacenters";
import { locations } from "./vpsCatalog";
import type { PublicVariant, PublicFamily } from "./publicCatalog";
export const publicRegions = [
  { id: "ir", title: ["ایران", "Iran"] },
  { id: "eu", title: ["اروپا", "Europe"] },
  { id: "na", title: ["آمریکا", "Americas"] },
  { id: "asia", title: ["آسیا", "Asia"] },
  { id: "oceania", title: ["اقیانوسیه", "Oceania"] },
] as const;
export const locationCountries: Country[] = [
  ...countries,
  { id: "nl", fa: "هلند", en: "Netherlands", region: "eu", flag: "🇳🇱" },
  { id: "jp", fa: "ژاپن", en: "Japan", region: "asia", flag: "🇯🇵" },
  { id: "tr", fa: "ترکیه", en: "Türkiye", region: "asia", flag: "🇹🇷" },
  {
    id: "ae",
    fa: "امارات",
    en: "United Arab Emirates",
    region: "asia",
    flag: "🇦🇪",
  },
];
const prefixes: Record<string, string> = {
  iran: "ir",
  germany: "de",
  netherlands: "nl",
  france: "fr",
  uk: "gb",
  usa: "us",
  canada: "ca",
  singapore: "sg",
  japan: "jp",
  turkey: "tr",
  uae: "ae",
};
export function vpsLocationCountry(id: string) {
  return prefixes[id.split("-")[0]] || "";
}
export function offerMode(v: PublicVariant) {
  const id = v.id;
  if (v.family === "hosting")
    return (
      ["custom", "usage", "trial", "wordpress", "windows"].find((k) =>
        id.includes(k),
      ) || "standard"
    );
  if (v.family === "dedicated")
    return id.includes("-dc-")
      ? "hardware"
      : id.includes("gpu")
        ? "gpu"
        : id.includes("storage")
          ? "storage"
          : "fixed";
  return id.replace("order-vps-", "").replace(/-ir$/, "");
}
export const offerModeLabels: Record<string, readonly [string, string]> = {
  standard: ["هاست لینوکس", "Linux hosting"],
  wordpress: ["هاست وردپرس", "WordPress hosting"],
  windows: ["ویندوز", "Windows"],
  custom: ["منابع سفارشی", "Custom resources"],
  usage: ["پرداخت بر اساس مصرف", "Pay as you go"],
  trial: ["تست ۲۴ ساعته", "24-hour trial"],
  hardware: ["سخت‌افزار سفارشی ایران", "Custom hardware · Iran"],
  fixed: ["پلن ثابت خارج", "Fixed international plans"],
  gpu: ["سرور GPU", "GPU servers"],
  storage: ["ذخیره‌سازی", "Storage"],
  linux: ["لینوکس", "Linux"],
  hourly: ["ساعتی", "Hourly"],
  daily: ["روزانه", "Daily"],
  multilocation: ["چند لوکیشن", "Multi-location"],
  managed: ["مدیریت‌شده", "Managed"],
  mikrotik: ["میکروتیک", "MikroTik"],
};
export function offerCountry(v: PublicVariant) {
  const suffix = v.id.match(/-country-([a-z]{2})$/)?.[1];
  if (suffix) return suffix;
  if (v.id.includes("-dc-"))
    return (
      datacenters.find((d) => v.id === "order-dedicated-dc-" + d.id)?.country ||
      ""
    );
  if (v.id.endsWith("-ir")) return "ir";
  if (v.family === "dedicated" && /gpu|storage/.test(v.id)) return "de";
  return "";
}
export function countriesForOffers(items: PublicVariant[], mode: string) {
  const group = items.filter((v) => offerMode(v) === mode),
    ids = new Set<string>();
  for (const v of group) {
    const fixed = offerCountry(v);
    if (fixed) ids.add(fixed);
    else if (v.family === "vps")
      for (const l of locations) ids.add(vpsLocationCountry(l.id));
  }
  return locationCountries.filter((c) => ids.has(c.id));
}
export function choicesForCountry(
  items: PublicVariant[],
  mode: string,
  country: string,
) {
  const rows = items.filter((v) => offerMode(v) === mode),
    exact = rows.filter((v) => offerCountry(v) === country);
  return exact.length
    ? exact
    : rows.filter((v) => v.family === "vps" && !offerCountry(v));
}
export function countryOfferHref(v: PublicVariant, country: string) {
  if (!countriesForOffers([v], offerMode(v)).some((c) => c.id === country))
    throw Error("Country is not in this service catalog");
  return v.href + "&country=" + encodeURIComponent(country);
}
