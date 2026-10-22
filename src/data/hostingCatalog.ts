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
    fa: "نوین بذر",
    en: "Novin Seed",
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
    fa: "نوین رویش",
    en: "Novin Sprout",
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
    fa: "نوین شکوفا",
    en: "Novin Bloom",
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
    fa: "نوین گستره",
    en: "Novin Horizon",
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
  ir: { cpuHour: 30, ramGBHour: 12, diskGBMonth: 1100, trafficGB: 550 },
  eu: { cpuHour: 38, ramGBHour: 16, diskGBMonth: 1400, trafficGB: 750 },
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
    [0.5, 1, 2, 4, 8, 16].includes(r.ramGB) &&
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
  const rate = hostingRates[location];
  return Math.round(
    (r.cpu * rate.cpuHour + r.ramGB * rate.ramGBHour) * hours +
      r.diskGB * rate.diskGBMonth +
      r.trafficGB * rate.trafficGB,
  );
}
