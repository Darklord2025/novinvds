export type HostingLocation = "ir" | "eu";
export type HostingBilling = "monthly" | "yearly" | "usage" | "trial";
export interface HostingResources {
  cpu: number;
  ramGB: number;
  diskGB: number;
  trafficGB: number;
  sites: number;
}
export const hostingPlans = [
  {
    id: "novin-seed",
    fa: "پایه",
    en: "Starter",
    cpu: 1,
    ramGB: 1,
    diskGB: 5,
    trafficGB: 50,
    sites: 1,
    ir: 89000,
    eu: 109000,
  },
  {
    id: "novin-sprout",
    fa: "استاندارد",
    en: "Standard",
    cpu: 2,
    ramGB: 2,
    diskGB: 15,
    trafficGB: 150,
    sites: 3,
    ir: 189000,
    eu: 229000,
  },
  {
    id: "novin-bloom",
    fa: "تجاری",
    en: "Business",
    cpu: 3,
    ramGB: 4,
    diskGB: 30,
    trafficGB: 300,
    sites: 5,
    ir: 329000,
    eu: 389000,
  },
  {
    id: "novin-horizon",
    fa: "سازمانی",
    en: "Enterprise",
    cpu: 4,
    ramGB: 8,
    diskGB: 60,
    trafficGB: 600,
    sites: 10,
    ir: 579000,
    eu: 679000,
  },
] as const;
// Proposed NovinVDS Toman tariffs, not imported competitor prices or verified sale quotes.
export const hostingRates = {
  ir: {
    cpuHour: 30,
    ramGBHour: 12,
    diskGBMonth: 1100,
    trafficGB: 550,
    siteMonth: 8000,
  },
  eu: {
    cpuHour: 38,
    ramGBHour: 16,
    diskGBMonth: 1400,
    trafficGB: 750,
    siteMonth: 10000,
  },
};
export const hostingTrial: HostingResources = {
  cpu: 1,
  ramGB: 0.5,
  diskGB: 0.5,
  trafficGB: 1,
  sites: 1,
};
export function validHostingResources(r: HostingResources) {
  return (
    Number.isInteger(r.cpu) &&
    r.cpu >= 1 &&
    r.cpu <= 8 &&
    Number.isFinite(r.ramGB) &&
    r.ramGB >= 0.5 &&
    r.ramGB <= 16 &&
    Number.isInteger(r.ramGB * 2) &&
    Number.isFinite(r.diskGB) &&
    r.diskGB >= 0.5 &&
    r.diskGB <= 200 &&
    r.diskGB * 2 === Math.floor(r.diskGB * 2) &&
    Number.isInteger(r.trafficGB) &&
    r.trafficGB >= 1 &&
    r.trafficGB <= 2000 &&
    Number.isInteger(r.sites) &&
    r.sites >= 1 &&
    r.sites <= 20
  );
}
export function hostingEstimate(
  r: HostingResources,
  location: HostingLocation,
  hours = 730,
) {
  if (
    !validHostingResources(r) ||
    !Number.isFinite(hours) ||
    hours < 0 ||
    hours > 744
  )
    throw Error("Invalid hosting resources");
  return hostingCostLines(r, location, hours).reduce(
    (sum, line) => sum + line.total,
    0,
  );
}
export function hostingCostLines(
  r: HostingResources,
  location: HostingLocation,
  hours = 730,
) {
  if (
    !validHostingResources(r) ||
    !Number.isFinite(hours) ||
    hours < 0 ||
    hours > 744
  )
    throw Error("Invalid hosting resources");
  const rate = hostingRates[location];
  return [
    {
      key: "cpu",
      quantity: r.cpu,
      unitPrice: rate.cpuHour * hours,
      total: Math.round(r.cpu * rate.cpuHour * hours),
    },
    {
      key: "ramGB",
      quantity: r.ramGB,
      unitPrice: rate.ramGBHour * hours,
      total: Math.round(r.ramGB * rate.ramGBHour * hours),
    },
    {
      key: "diskGB",
      quantity: r.diskGB,
      unitPrice: rate.diskGBMonth,
      total: Math.round(r.diskGB * rate.diskGBMonth),
    },
    {
      key: "trafficGB",
      quantity: r.trafficGB,
      unitPrice: rate.trafficGB,
      total: Math.round(r.trafficGB * rate.trafficGB),
    },
    {
      key: "sites",
      quantity: Math.max(0, r.sites - 1),
      unitPrice: rate.siteMonth,
      total: Math.max(0, r.sites - 1) * rate.siteMonth,
    },
  ];
}
