import { countries, datacenters } from "@/data/datacenters";
export function selectedLocation(value: string | null) {
  return countries.find((c) => c.id === (value || "").trim().toLowerCase());
}
export function locationHref(id: string) {
  const c = selectedLocation(id);
  return c ? "/datacenter?country=" + c.id : "/datacenter";
}
export function locationServiceLinks(value: string) {
  const country = selectedLocation(value);
  if (!country) throw Error("Unknown location");
  const id = country.id;
  const dc = datacenters.find((d) => d.country === id);
  return {
    hosting:
      "/hosting-plans?profile=" +
      encodeURIComponent(
        id === "ir" ? "order-hosting-linux-ir" : "order-hosting-country-" + id,
      ) +
      "&country=" +
      id,
    dedicated:
      "/dedicated-plans?profile=" +
      encodeURIComponent(
        id === "ir"
          ? "order-dedicated-dc-" + dc!.id
          : "order-dedicated-country-" + id,
      ) +
      "&country=" +
      id,
  };
}

export function withCountryHeading(base: string, countryName?: string) {
  return countryName && !base.includes(countryName)
    ? base + " · " + countryName
    : base;
}
