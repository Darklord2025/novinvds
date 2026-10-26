export interface VpsPlan {
  id: string;
  name: string;
  cpu: number;
  ram: number;
  disk: number;
  diskType: string;
  bandwidth: string;
  port: string;
  price: number;
  period: string;
  popular?: boolean;
}

export const virtualPlans: VpsPlan[] = [
  {
    id: "vp1",
    name: "Compute C1-R1-D20",
    cpu: 1,
    ram: 1,
    disk: 20,
    diskType: "SSD",
    bandwidth: "۵۰۰ گیگ",
    port: "۱ Gbps",
    price: 199000,
    period: "ماهانه",
  },
  {
    id: "vp2",
    name: "Compute C1-R2-D30",
    cpu: 1,
    ram: 2,
    disk: 30,
    diskType: "SSD",
    bandwidth: "۱ ترابایت",
    port: "۱ Gbps",
    price: 299000,
    period: "ماهانه",
  },
  {
    id: "vp3",
    name: "Compute C2-R2-D40",
    cpu: 2,
    ram: 2,
    disk: 40,
    diskType: "NVMe",
    bandwidth: "۱ ترابایت",
    port: "۱ Gbps",
    price: 399000,
    period: "ماهانه",
    popular: true,
  },
  {
    id: "vp4",
    name: "Compute C2-R4-D60",
    cpu: 2,
    ram: 4,
    disk: 60,
    diskType: "NVMe",
    bandwidth: "۲ ترابایت",
    port: "۱ Gbps",
    price: 599000,
    period: "ماهانه",
  },
  {
    id: "vp5",
    name: "Compute C4-R8-D100",
    cpu: 4,
    ram: 8,
    disk: 100,
    diskType: "NVMe",
    bandwidth: "۳ ترابایت",
    port: "۱ Gbps",
    price: 899000,
    period: "ماهانه",
  },
  {
    id: "vp6",
    name: "Compute C4-R12-D150",
    cpu: 4,
    ram: 12,
    disk: 150,
    diskType: "NVMe",
    bandwidth: "۵ ترابایت",
    port: "۱ Gbps",
    price: 1299000,
    period: "ماهانه",
  },
  {
    id: "vp7",
    name: "Compute C6-R16-D200",
    cpu: 6,
    ram: 16,
    disk: 200,
    diskType: "NVMe",
    bandwidth: "۵ ترابایت",
    port: "۱ Gbps",
    price: 1699000,
    period: "ماهانه",
  },
  {
    id: "vp8",
    name: "Compute C8-R32-D300",
    cpu: 8,
    ram: 32,
    disk: 300,
    diskType: "NVMe",
    bandwidth: "۱۰ ترابایت",
    port: "۱ Gbps",
    price: 2999000,
    period: "ماهانه",
  },
];

export const hourlyPlans: VpsPlan[] = [
  {
    id: "hp1",
    name: "Hourly C1-R1-D20",
    cpu: 1,
    ram: 1,
    disk: 20,
    diskType: "SSD",
    bandwidth: "نامحدود",
    port: "۱ Gbps",
    price: 350,
    period: "ساعتی",
  },
  {
    id: "hp2",
    name: "Hourly C1-R2-D30",
    cpu: 1,
    ram: 2,
    disk: 30,
    diskType: "SSD",
    bandwidth: "نامحدود",
    port: "۱ Gbps",
    price: 600,
    period: "ساعتی",
  },
  {
    id: "hp3",
    name: "Hourly C2-R2-D40",
    cpu: 2,
    ram: 2,
    disk: 40,
    diskType: "NVMe",
    bandwidth: "نامحدود",
    port: "۱ Gbps",
    price: 900,
    period: "ساعتی",
    popular: true,
  },
  {
    id: "hp4",
    name: "Hourly C2-R4-D60",
    cpu: 2,
    ram: 4,
    disk: 60,
    diskType: "NVMe",
    bandwidth: "نامحدود",
    port: "۱ Gbps",
    price: 1400,
    period: "ساعتی",
  },
  {
    id: "hp5",
    name: "Hourly C4-R8-D100",
    cpu: 4,
    ram: 8,
    disk: 100,
    diskType: "NVMe",
    bandwidth: "نامحدود",
    port: "۱ Gbps",
    price: 2500,
    period: "ساعتی",
  },
  {
    id: "hp6",
    name: "Hourly C8-R16-D200",
    cpu: 8,
    ram: 16,
    disk: 200,
    diskType: "NVMe",
    bandwidth: "نامحدود",
    port: "۱ Gbps",
    price: 4500,
    period: "ساعتی",
  },
];

export const locations = [
  { id: "iran-asiatech", name: "ایران", flag: "🇮🇷", datacenter: "آسیاتک" },
  { id: "iran-pishgaman", name: "ایران", flag: "🇮🇷", datacenter: "پیشگامان" },
  { id: "iran-shatel", name: "ایران", flag: "🇮🇷", datacenter: "شاتل" },
  { id: "iran-afranet", name: "ایران", flag: "🇮🇷", datacenter: "افرانت" },
  {
    id: "germany-falkenstein",
    name: "آلمان",
    flag: "🇩🇪",
    datacenter: "Hetzner (Falkenstein)",
  },
  {
    id: "germany-nuremberg",
    name: "آلمان",
    flag: "🇩🇪",
    datacenter: "Hetzner (Nuremberg)",
  },
  {
    id: "netherlands-amsterdam",
    name: "هلند",
    flag: "🇳🇱",
    datacenter: "Serverius",
  },
  { id: "france-paris", name: "فرانسه", flag: "🇫🇷", datacenter: "OVH" },
  { id: "uk-london", name: "انگلستان", flag: "🇬🇧", datacenter: "Equinix" },
  {
    id: "usa-dallas",
    name: "آمریکا",
    flag: "🇺🇸",
    datacenter: "ColoCrossing (Dallas)",
  },
  {
    id: "usa-losangeles",
    name: "آمریکا",
    flag: "🇺🇸",
    datacenter: "Psychz (LA)",
  },
  { id: "canada-montreal", name: "کانادا", flag: "🇨🇦", datacenter: "OVH" },
  { id: "singapore", name: "سنگاپور", flag: "🇸🇬", datacenter: "Equinix" },
  { id: "japan-tokyo", name: "ژاپن", flag: "🇯🇵", datacenter: "Equinix" },
  {
    id: "turkey-istanbul",
    name: "ترکیه",
    flag: "🇹🇷",
    datacenter: "TurkTelekom",
  },
  { id: "uae-dubai", name: "امارات", flag: "🇦🇪", datacenter: "Khazna" },
];

export const multilocationPlans: VpsPlan[] = [
  {
    id: "ml1",
    name: "Multi C2-R2-D40",
    cpu: 2,
    ram: 2,
    disk: 40,
    diskType: "SSD",
    bandwidth: "۱ ترابایت",
    port: "۱ Gbps",
    price: 499000,
    period: "ماهانه",
  },
  {
    id: "ml2",
    name: "Multi C2-R4-D60",
    cpu: 2,
    ram: 4,
    disk: 60,
    diskType: "NVMe",
    bandwidth: "۲ ترابایت",
    port: "۱ Gbps",
    price: 799000,
    period: "ماهانه",
    popular: true,
  },
  {
    id: "ml3",
    name: "Multi C4-R8-D100",
    cpu: 4,
    ram: 8,
    disk: 100,
    diskType: "NVMe",
    bandwidth: "۳ ترابایت",
    port: "۱ Gbps",
    price: 1299000,
    period: "ماهانه",
  },
  {
    id: "ml4",
    name: "Multi C6-R16-D200",
    cpu: 6,
    ram: 16,
    disk: 200,
    diskType: "NVMe",
    bandwidth: "۵ ترابایت",
    port: "۱ Gbps",
    price: 1999000,
    period: "ماهانه",
  },
  {
    id: "ml5",
    name: "Multi C8-R32-D300",
    cpu: 8,
    ram: 32,
    disk: 300,
    diskType: "NVMe",
    bandwidth: "۱۰ ترابایت",
    port: "۱ Gbps",
    price: 3499000,
    period: "ماهانه",
  },
];

export const billingPeriods = [
  { id: "monthly", name: "ماهانه", multiplier: 1, discount: 0 },
  { id: "quarterly", name: "سه‌ماهه", multiplier: 2.7, discount: 10 },
  { id: "semiannual", name: "شش‌ماهه", multiplier: 5.1, discount: 15 },
  { id: "yearly", name: "سالانه", multiplier: 9.6, discount: 20 },
];

export const customVpsRates = {
  cpu: 90000,
  ram: 45000,
  disk: 1500,
  extraTrafficGB: 500,
  includedTrafficGB: 1000,
};
export function customVpsEstimate(r: {
  cpu: number;
  ram: number;
  disk: number;
  trafficGB?: number;
}) {
  const traffic = r.trafficGB ?? 1000;
  if (
    !Number.isInteger(r.cpu) ||
    r.cpu < 1 ||
    r.cpu > 32 ||
    !Number.isInteger(r.ram) ||
    r.ram < 1 ||
    r.ram > 128 ||
    !Number.isInteger(r.disk) ||
    r.disk < 20 ||
    r.disk > 2000 ||
    !Number.isInteger(traffic) ||
    traffic < 1 ||
    traffic > 10000
  )
    throw Error("Invalid custom VPS resources");
  return (
    r.cpu * customVpsRates.cpu +
    r.ram * customVpsRates.ram +
    r.disk * customVpsRates.disk +
    Math.max(0, traffic - customVpsRates.includedTrafficGB) *
      customVpsRates.extraTrafficGB
  );
}
