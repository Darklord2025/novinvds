import { controlPanels } from "./operatingSystems";
import type { ServiceKind } from "./userServices";
export const addonCategories = {
  panel: ["کنترل پنل و لایسنس", "Panels & licenses"],
  backup: ["پشتیبان‌گیری", "Backup"],
  security: ["امنیت و نگهداری", "Security & maintenance"],
  network: ["شبکه و IP", "Network & IP"],
  management: ["مدیریت و پشتیبانی", "Management & support"],
};
export const serviceAddons = [
  ...controlPanels.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    period: p.period === "once" ? "یکبار" : "ماهانه",
    category: "panel",
    kinds: ["vps", "dedicated", "cloud", "hourly", "multilocation"],
  })),
  {
    id: "litespeed",
    name: "LiteSpeed",
    price: 300000,
    period: "ماهانه",
    category: "panel",
    kinds: ["hosting", "vps", "dedicated"],
  },
  {
    id: "backup-50",
    name: "Backup 50 GB",
    price: 60000,
    period: "ماهانه",
    category: "backup",
    kinds: ["hosting", "vps", "dedicated", "cloud", "hourly", "multilocation"],
  },
  {
    id: "backup-100",
    name: "Backup 100 GB",
    price: 100000,
    period: "ماهانه",
    category: "backup",
    kinds: ["hosting", "vps", "dedicated", "cloud", "multilocation"],
  },
  {
    id: "extra-ip",
    name: "IPv4",
    price: 50000,
    period: "ماهانه",
    category: "network",
    kinds: ["vps", "dedicated", "cloud", "multilocation"],
  },
  {
    id: "managed",
    name: "Managed support",
    price: 500000,
    period: "ماهانه",
    category: "management",
    kinds: ["hosting", "vps", "dedicated", "cloud", "hourly", "multilocation"],
  },
  {
    id: "monitoring",
    name: "Monitoring",
    price: 150000,
    period: "ماهانه",
    category: "management",
    kinds: ["vps", "dedicated", "cloud", "hourly", "multilocation"],
  },
  {
    id: "malware",
    name: "Malware scan",
    price: 75000,
    period: "ماهانه",
    category: "security",
    kinds: ["hosting"],
  },
];
export function addonsFor(kind: ServiceKind) {
  return serviceAddons.filter((a) => a.kinds.includes(kind));
}

export function toggleAddon(selected: string[], id: string) {
  const panelIds = controlPanels.map((p) => p.id);
  if (selected.includes(id)) return selected.filter((v) => v !== id);
  return [
    ...selected.filter((v) => !panelIds.includes(id) || !panelIds.includes(v)),
    id,
  ];
}
