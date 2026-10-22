import MarketRates from "./MarketRates";
import ReferralReward from "./ReferralReward";
import { useServiceCatalog } from "@/contexts/PanelDataContext";
import React, { useState } from "react";
import {
  Wallet,
  Server,
  Globe,
  Ticket,
  Plus,
  ArrowUpLeft,
  Receipt,
  Activity,
  RefreshCw,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { serviceIPs } from "@/lib/serviceIdentity";
import { accountWallet, categoryLabel } from "@/lib/panel-model";
import { usePanelData } from "@/contexts/PanelDataContext";
import {
  ColorStat,
  UsageDonut,
  PanelHeading,
  usePanelCopy,
} from "./PanelPrimitives";
import { formatMoney } from "@/lib/billing";
export default function Dashboard({
  navigateToServiceOrderPage: onNavigate,
}: {
  navigateToServiceOrderPage: (path: string) => void;
  onResetRequest?: (type: string, id: string) => void;
}) {
  const { userServices, userDomains } = useServiceCatalog();
  const { data, preview } = usePanelData();
  const { fa, s, n, money } = usePanelCopy();
  const [kind, setKind] = useState("all");
  const wallet = accountWallet(data);
  const choices = [
    "all",
    "vps",
    "dedicated",
    "hourly",
    "cloud",
    "multilocation",
    "hosting",
    "license",
    "network",
    "addon",
    "support",
  ];
  const services = userServices.filter(
    (v) => kind === "all" || v.kind === kind,
  );
  return (
    <div className="space-y-6 min-w-0" dir={fa ? "rtl" : "ltr"}>
      <ReferralReward />
      <PanelHeading
        title={s(
          "به پنل نوین وی‌دی‌اس خوش آمدید",
          "Welcome to your NovinVDS panel",
        )}
        subtitle={s(
          "مدیریت آسان سرویس‌ها، صورتحساب و پشتیبانی، در یک نگاه",
          "Your services, billing and support at a glance",
        )}
      />
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
        <ColorStat
          title={s("موجودی کیف پول", "Wallet balance")}
          value={money(wallet.balance)}
          icon={Wallet}
          color="blue"
          hint={s("موجودی تاییدشده به تومان", "Confirmed balance in Toman")}
        />
        <ColorStat
          title={s("سرویس‌های من", "My services")}
          value={n(userServices.length)}
          icon={Server}
          color="green"
          hint={s("مشاهده و مدیریت یکپارچه", "Unified service management")}
        />
        <ColorStat
          title={s("دامنه‌های من", "My domains")}
          value={n(userDomains.length)}
          icon={Globe}
          color="purple"
          hint={s("فعال، در حال انقضا و منقضی", "Active, expiring and expired")}
        />
        <ColorStat
          title={s("تیکت‌های باز", "Open tickets")}
          value={n(data.tickets.filter((t) => t.status !== "closed").length)}
          icon={Ticket}
          color="amber"
          hint={s("همراه شما در تمام مراحل", "We are here to help")}
        />
      </div>
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5 items-start">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex-row justify-between gap-3">
            <CardTitle className="flex gap-2 items-center text-base">
              <Activity className="text-blue-500" size={19} />
              {s("مصرف موجودی بر اساس سرویس", "Wallet spending by service")}
            </CardTitle>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onNavigate("/wallet-usage")}
            >
              {s("گزارش ریز مصرف", "Usage report")}
              <ArrowUpLeft size={15} />
            </Button>
          </CardHeader>
          <CardContent>
            <UsageDonut ledger={data.ledger} />
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">
              {s("دسترسی سریع", "Quick actions")}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {[
              [
                "/wallet",
                Wallet,
                s("مدیریت کیف پول", "Wallet"),
                "text-blue-500 bg-blue-500/10",
              ],
              [
                "/invoices",
                Receipt,
                s("فاکتورها", "Invoices"),
                "text-purple-500 bg-purple-500/10",
              ],
              [
                "/tickets",
                Ticket,
                s("پشتیبانی", "Support"),
                "text-emerald-500 bg-emerald-500/10",
              ],
              [
                "/domains",
                Globe,
                s("دامنه‌ها", "Domains"),
                "text-orange-500 bg-orange-500/10",
              ],
            ].map(([path, Icon, label, color]) => {
              const I = Icon as typeof Wallet;
              return (
                <button
                  key={String(path)}
                  onClick={() => onNavigate(String(path))}
                  className="rounded-xl border p-4 text-start hover:shadow-sm transition-shadow"
                >
                  <span className={"inline-flex p-2 rounded-lg " + color}>
                    <I size={20} />
                  </span>
                  <span className="block mt-3 text-sm font-semibold">
                    {String(label)}
                  </span>
                </button>
              );
            })}
          </CardContent>
        </Card>
      </div>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="gap-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">
              {s("سرویس‌های من", "My services")}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("/servers")}
            >
              {s("مشاهده همه", "View all")}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {choices.map((k) => (
              <Button
                key={k}
                size="sm"
                variant={k === kind ? "default" : "outline"}
                className="rounded-full text-xs"
                onClick={() => setKind(k)}
              >
                {k === "all" ? s("همه", "All") : categoryLabel(k, fa)}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {services.map((v) => (
            <article
              key={v.id}
              className="rounded-xl border p-4 space-y-3 relative overflow-hidden"
            >
              <div
                className={
                  "absolute top-0 inset-x-0 h-1 " +
                  (v.kind === "hosting"
                    ? "bg-purple-500"
                    : v.kind === "dedicated"
                      ? "bg-amber-500"
                      : "bg-blue-500")
                }
              />
              <div className="flex justify-between gap-2">
                <strong className="text-sm">{v.name}</strong>
                <span className="text-xs text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full">
                  {s("نمونه", "Sample")}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {n(v.id)} · {v.productName}
              </p>
              <div className="text-xs text-muted-foreground">
                {serviceIPs(v).map((ip) => (
                  <p key={n(ip.address)} dir="ltr" className="break-all">
                    {n(ip.address)}
                  </p>
                ))}
              </div>
              <p className="text-sm font-bold">
                {formatMoney(v.amount, v.currency, fa)}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 rounded-lg"
                  onClick={() =>
                    onNavigate("/" + v.kind + "-management/" + v.id)
                  }
                >
                  <Settings size={14} />
                  {s("مدیریت", "Manage")}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-lg"
                  onClick={() => onNavigate("/renew/" + v.kind + "/" + v.id)}
                >
                  <RefreshCw size={14} />
                  {s("تمدید", "Renew")}
                </Button>
              </div>
            </article>
          ))}
        </CardContent>
      </Card>
      <MarketRates />
      <div className="grid md:grid-cols-2 gap-5">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">
              {s("فاکتورهای اخیر", "Recent invoices")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.invoices.slice(0, 3).map((i) => (
              <button
                key={i.id}
                className="flex justify-between w-full gap-2 p-3 rounded-xl bg-muted/40 text-sm"
                onClick={() => onNavigate("/invoices/" + i.id)}
              >
                <span>{n(i.id)}</span>
                <span
                  className={
                    i.status === "Paid" ? "text-emerald-600" : "text-amber-600"
                  }
                >
                  {i.status === "Paid"
                    ? s("پرداخت شده", "Paid")
                    : s("بررسی صورتحساب", "Review invoice")}
                </span>
              </button>
            ))}
            {!data.invoices.length && (
              <p className="text-sm text-muted-foreground">
                {s(
                  "هنوز فاکتوری صادر نشده است.",
                  "No invoices have been issued.",
                )}
              </p>
            )}
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">
              {s("آخرین درخواست‌های پشتیبانی", "Recent support tickets")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.tickets.slice(0, 3).map((t) => (
              <button
                key={t.id}
                className="w-full flex justify-between text-sm p-3 bg-muted/40 rounded-xl text-start"
                onClick={() => onNavigate("/tickets/" + t.id)}
              >
                <span>
                  {n(t.number)} · {t.subject}
                </span>
                <ChevronLeft size={17} />
              </button>
            ))}
            {!data.tickets.length && (
              <p className="text-sm text-muted-foreground">
                {s(
                  "با ثبت تیکت، گفتگو را شروع کنید.",
                  "Start a conversation by opening a ticket.",
                )}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
