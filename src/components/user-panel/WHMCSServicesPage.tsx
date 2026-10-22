import BackButton from "./BackButton";
import { useState } from "react";
import { useServiceCatalog } from "@/contexts/PanelDataContext";
import type { ServiceKind } from "@/data/userServices";
import {
  Server,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  Settings,
  RefreshCw,
  Globe,
  Search,
} from "lucide-react";
import { PanelHeading, ColorStat, usePanelCopy } from "./PanelPrimitives";
import { cycleLabel } from "@/lib/service-labels";
import { categoryLabel } from "@/lib/panel-model";
import { serviceIPs } from "@/lib/serviceIdentity";
import { formatMoney } from "@/lib/billing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface Props {
  onManageService: (id: string, kind?: string) => void;
  onRenewService: (id: string, kind?: string) => void;
  onSuspendService?: (id: string) => void;
  onUnsuspendService?: (id: string) => void;
  onTerminateService?: (id: string) => void;
  onViewInvoice?: (id: string) => void;
  onBack?: () => void;
  initialKind?: ServiceKind | "all";
}
export default function WHMCSServicesPage({
  onManageService,
  onRenewService,
  onBack,
  initialKind = "all",
}: Props) {
  const { userServices, preview } = useServiceCatalog(),
    { fa, s, n } = usePanelCopy();
  const [kind, setKind] = useState(initialKind),
    [status, setStatus] = useState("all"),
    [query, setQuery] = useState("");
  const states: Record<string, string> = {
    active: s("فعال", "Active"),
    expiring: s("در حال انقضا", "Expiring"),
    expired: s("منقضی", "Expired"),
    suspended: s("تعلیق‌شده", "Suspended"),
    pending: s("در انتظار", "Pending"),
  };
  const filtered = userServices.filter(
    (v) =>
      (kind === "all" || kind === v.kind) &&
      (status === "all" || status === v.status) &&
      (v.id + " " + v.name + " " + v.productName)
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="space-y-6" dir={fa ? "rtl" : "ltr"}>
      <PanelHeading
        title={s("مدیریت سرویس‌ها", "Service management")}
        subtitle={s(
          "وضعیت، صورتحساب و تمدید همه سرویس‌ها",
          "Status, billing and renewal for every service",
        )}
        action={
          onBack && (
            <BackButton variant="outline" onClick={onBack}>
              {s("بازگشت", "Back")}
            </BackButton>
          )
        }
      />
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <ColorStat
          title={s("همه سرویس‌ها", "All services")}
          value={n(userServices.length)}
          icon={Server}
        />
        <ColorStat
          title={s("سرویس فعال", "Active services")}
          value={n(userServices.filter((v) => v.status === "active").length)}
          icon={ShieldCheck}
          color="green"
        />
        <ColorStat
          title={s("در حال انقضا", "Expiring")}
          value={n(userServices.filter((v) => v.status === "expiring").length)}
          icon={Calendar}
          color="amber"
        />
        <ColorStat
          title={s("نیازمند بررسی", "Needs attention")}
          value={n(
            userServices.filter((v) =>
              ["expired", "suspended"].includes(v.status),
            ).length,
          )}
          icon={AlertTriangle}
          color="rose"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {(
          [
            "all",
            "vps",
            "dedicated",
            "hosting",
            "hourly",
            "cloud",
            "multilocation",
            "license",
            "network",
            "addon",
            "support",
          ] as const
        ).map((k) => (
          <Button
            key={k}
            variant={kind === k ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setKind(k)}
          >
            {k === "all" ? s("همه", "All") : categoryLabel(k, fa)}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Input
          className="flex-1 min-w-40"
          placeholder={s("جستجوی سرویس…", "Search services…")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="rounded-xl border p-3 bg-card"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label={s("وضعیت سرویس", "Service status")}
        >
          <option value="all">{s("همه وضعیت‌ها", "All statuses")}</option>
          {Object.entries(states).map(([id, label]) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((v) => (
          <article
            key={v.id}
            className={
              "rounded-2xl border border-t-4 bg-card p-5 space-y-4 " +
              (v.kind === "dedicated"
                ? "border-t-amber-500"
                : v.kind === "hosting"
                  ? "border-t-violet-500"
                  : "border-t-blue-500")
            }
          >
            <div className="flex gap-3 items-start">
              <span className="rounded-xl bg-blue-500/10 text-blue-500 p-3">
                <Server size={20} />
              </span>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-sm break-words">{n(v.name)}</h2>
                <p className="text-xs text-muted-foreground mt-2" dir="ltr">
                  {n(v.id)}
                </p>
              </div>
              <span className="bg-emerald-500/10 text-emerald-600 rounded-full p-1.5 text-[10px]">
                {states[v.status]}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {n(v.productName)} · {categoryLabel(v.kind, fa)}
            </p>
            <div className="text-xs bg-muted/40 p-3 rounded-xl space-y-2">
              {serviceIPs(v).map((ip) => (
                <p key={n(ip.address)} dir="ltr" className="break-all">
                  {n(ip.address)}
                </p>
              ))}
              <p>
                {s("سررسید", "Due date")}: {n(v.expiry)}
              </p>
            </div>
            <p className="font-bold text-sm">
              {formatMoney(v.amount, v.currency, fa)}{" "}
              <span className="font-normal text-xs text-muted-foreground">
                / {cycleLabel(v.billingCycle, fa)}
              </span>
            </p>
            {preview && (
              <p className="text-[11px] text-muted-foreground">
                {s(
                  "اطلاعات نمونه؛ مصرف و وضعیت زنده نیست.",
                  "Sample data; usage and status are not live.",
                )}
              </p>
            )}
            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() => onManageService(v.id, v.kind)}
              >
                <Settings size={15} />
                {s("مدیریت", "Manage")}
              </Button>
              <Button
                variant="outline"
                onClick={() => onRenewService(v.id, v.kind)}
              >
                <RefreshCw size={15} />
                {s("تمدید", "Renew")}
              </Button>
            </div>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <p className="rounded-2xl border p-8 text-sm text-muted-foreground">
          {s("سرویسی یافت نشد.", "No services found.")}
        </p>
      )}
    </div>
  );
}
