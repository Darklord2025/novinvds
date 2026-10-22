import type { UnifiedService, UnifiedDomain } from "@/data/userServices";
import type { InvoiceData } from "./billing";
export type TicketState = "open" | "answered" | "closed";
export interface PanelTicket {
  id: string;
  number: number;
  subject: string;
  department: string;
  status: TicketState;
  createdAt: string;
  survey?: { rating: number; comment: string; at: string };
  messages: { body: string; at: string; sender: "customer" | "support" }[];
}
export interface LedgerEntry {
  id: string;
  at: string;
  category: string;
  description: string;
  amountToman: number;
  status: "confirmed" | "pending";
  originalCurrency?: string;
  originalAmount?: number;
  rateToman?: number;
}
export interface AccountProfile {
  kind: "personal" | "company";
  name: string;
  company: string;
  nationalId: string;
  economicCode: string;
  registrationNumber: string;
  postalCode: string;
  address: string;
  email: string;
  username: string;
}
export interface PanelPreferences {
  login: boolean;
  email: boolean;
  inPanel: boolean;
  invoice: boolean;
  renewal: boolean;
  ticket: boolean;
  wallet: boolean;
  marketing: boolean;
  thresholdToman: number;
}
export interface PanelSnapshot {
  notifications?: {
    id: string;
    title: { fa: string; en: string };
    body: { fa: string; en: string };
    at: string;
    read: boolean;
    important: boolean;
  }[];
  referralReward?: {
    eligible: boolean;
    paidToman: number;
    thresholdToman: number;
    coupon?: {
      code: string;
      percent: number;
      capToman: number;
      expiresAt: string;
      redeemed: boolean;
    };
  };
  affiliate?: {
    code: string;
    ratePercent?: number;
    referrals: number;
    clicks: number;
    terms?: string;
    commissions: {
      id: string;
      at: string;
      amountToman: number;
      status: string;
    }[];
  };
  services: UnifiedService[];
  domains: UnifiedDomain[];
  tickets: PanelTicket[];
  ledger: LedgerEntry[];
  invoices: InvoiceData[];
  profile: AccountProfile;
  preferences: PanelPreferences;
  requests: {
    id: string;
    kind: string;
    createdAt: string;
    status: string;
    amountToman?: number;
  }[];
}
export const emptyProfile: AccountProfile = {
  kind: "personal",
  name: "",
  company: "",
  nationalId: "",
  economicCode: "",
  registrationNumber: "",
  postalCode: "",
  address: "",
  email: "",
  username: "",
};
export const defaultPreferences: PanelPreferences = {
  login: true,
  email: true,
  inPanel: true,
  invoice: true,
  renewal: true,
  ticket: true,
  wallet: true,
  marketing: false,
  thresholdToman: 100000,
};
export const emptySnapshot = (): PanelSnapshot => ({
  services: [],
  domains: [],
  tickets: [],
  ledger: [],
  invoices: [],
  profile: { ...emptyProfile },
  preferences: { ...defaultPreferences },
  requests: [],
});
export const VAT_RATE = 0.1;
export function withVat(subtotal: number) {
  if (!Number.isFinite(subtotal) || subtotal < 0) throw Error("Invalid amount");
  const tax = Math.round(subtotal * VAT_RATE);
  return { subtotal, tax, total: subtotal + tax };
}
export function walletSummary(ledger: LedgerEntry[]) {
  const rows = ledger.filter((r) => r.status === "confirmed");
  const deposits = rows
    .filter((r) => r.amountToman > 0)
    .reduce((s, r) => s + r.amountToman, 0);
  const spent = -rows
    .filter((r) => r.amountToman < 0)
    .reduce((s, r) => s + r.amountToman, 0);
  return {
    balance: deposits - spent,
    deposits,
    spent,
    pending: ledger.filter((r) => r.status === "pending").length,
  };
}
export function convertedToman(amount: number, rate: number) {
  if (
    !Number.isFinite(amount) ||
    !Number.isFinite(rate) ||
    amount <= 0 ||
    rate <= 0
  )
    throw Error("A verified quote is required");
  return Math.round(amount * rate);
}
export function usageGroups(ledger: LedgerEntry[]) {
  const groups: Record<string, number> = {};
  ledger
    .filter((r) => r.status === "confirmed" && r.amountToman < 0)
    .forEach(
      (r) => (groups[r.category] = (groups[r.category] ?? 0) - r.amountToman),
    );
  return Object.entries(groups).map(([name, value]) => ({ name, value }));
}
export function canonicalDomain(value: string) {
  const raw = value.trim();
  if (/[\s/:@?#\\]/.test(raw)) throw Error("Invalid domain");
  const host = new URL("https://" + raw).hostname.toLowerCase();
  if (
    host.length > 253 ||
    !host
      .split(".")
      .every((p) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(p)) ||
    !/(?:^|\.)(?:[a-z]{2,63}|xn--[a-z0-9-]{2,59})$/.test(host) ||
    !host.includes(".")
  )
    throw Error("Invalid domain");
  return host;
}
export function validDomain(value: string) {
  try {
    canonicalDomain(value);
    return true;
  } catch {
    return false;
  }
}

export const cycleMonths: Record<string, number> = {
  Monthly: 1,
  Quarterly: 3,
  Annually: 12,
};
export function renewalAmount(
  amountToman: number,
  cycle: string,
  months: number,
) {
  const base = cycleMonths[cycle];
  if (!base || ![1, 3, 6, 12, 24].includes(months))
    throw Error("Unsupported renewal period");
  return withVat(Math.round((amountToman / base) * months));
}
export function officialDetailsValid(p: AccountProfile) {
  return (
    !!p.name.trim() &&
    !!p.address.trim() &&
    /^\d{10}$/.test(p.postalCode) &&
    (p.kind === "company" ? /^\d{11}$/ : /^\d{10}$/).test(p.nationalId) &&
    (p.kind === "personal" || (!!p.company.trim() && !!p.economicCode.trim()))
  );
}
export const categoryLabel = (key: string, fa: boolean) =>
  ({
    vps: ["سرور مجازی", "VPS"],
    dedicated: ["اختصاصی", "Dedicated"],
    hosting: ["میزبانی وب", "Hosting"],
    domain: ["دامنه", "Domains"],
    cloud: ["ابری", "Cloud"],
    hourly: ["ساعتی", "Hourly"],
    multilocation: ["مولتی لوکیشن", "Multi-location"],
    license: ["لایسنس", "Licenses"],
    ssl: ["گواهی امنیت", "SSL certificates"],
    network: ["خدمات شبکه", "Network services"],
    addon: ["افزونه‌ها", "Add-ons"],
    support: ["پشتیبانی تخصصی", "Managed support"],
    deposit:["واریز به کیف پول","Wallet deposit"],
    withdraw:["برداشت از کیف پول","Wallet withdrawal"],
    affiliate:["پورسانت همکاری در فروش","Affiliate commission"],
    refund:["بازگشت وجه","Refund"],
    payment:["پرداخت فاکتور","Invoice payment"],
    other: ["سایر", "Other"],
  })[key]?.[fa ? 0 : 1] ?? key;

export function accountWallet(data: PanelSnapshot) {
  const sum = walletSummary(data.ledger);
  const holds = data.requests.filter(
    (r) => r.kind === "withdraw" && ["pending", "approved"].includes(r.status),
  );
  const reserved = holds.reduce((n, r) => n + (r.amountToman || 0), 0);
  return {
    ...sum,
    reserved,
    balance: sum.balance - reserved,
    pending: sum.pending + holds.length,
  };
}
