import BackButton from "./BackButton";
import { useState } from "react";
import { useServiceCatalog } from "@/contexts/PanelDataContext";
import {
  Globe,
  Shield,
  Calendar,
  AlertTriangle,
  Settings,
  RefreshCw,
} from "lucide-react";
import { PanelHeading, ColorStat, usePanelCopy } from "./PanelPrimitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function DomainServicesPage({
  onManageDomain,
  onRenewDomain,
  onBack,
}: {
  onManageDomain: (id: string, kind?: string) => void;
  onRenewDomain: (id: string, kind?: string) => void;
  onBack?: () => void;
}) {
  const { userDomains, preview } = useServiceCatalog();
  const { fa, s, n } = usePanelCopy();
  const [query, setQuery] = useState(""),
    [status, setStatus] = useState("all");
  const states: Record<string, string> = {
    active: s("فعال", "Active"),
    expiring: s("در حال انقضا", "Expiring"),
    expired: s("منقضی‌شده", "Expired"),
    pending: s("در انتظار", "Pending"),
  };
  return (
    <div className="space-y-6" dir={fa ? "rtl" : "ltr"}>
      <PanelHeading
        title={s("دامنه‌های من", "My domains")}
        subtitle={s(
          "مدیریت مستقل هر دامنه و پیگیری تمدید",
          "Manage each domain and its renewal independently",
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
          title={s("همه دامنه‌ها", "All domains")}
          value={n(userDomains.length)}
          icon={Globe}
        />
        <ColorStat
          title={states.active}
          value={n(userDomains.filter((d) => d.status === "active").length)}
          icon={Shield}
          color="green"
        />
        <ColorStat
          title={states.expiring}
          value={n(userDomains.filter((d) => d.status === "expiring").length)}
          icon={Calendar}
          color="amber"
        />
        <ColorStat
          title={states.expired}
          value={n(userDomains.filter((d) => d.status === "expired").length)}
          icon={AlertTriangle}
          color="rose"
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <Input
          className="flex-1 min-w-40"
          placeholder={s("جستجوی دامنه…", "Search domains…")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          aria-label={s("وضعیت دامنه", "Domain status")}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-xl bg-card p-3"
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
        {userDomains
          .filter(
            (d) =>
              (status === "all" || d.status === status) &&
              d.domain.toLowerCase().includes(query.toLowerCase()),
          )
          .map((d) => (
            <article
              key={d.id}
              className={
                "rounded-2xl border bg-card p-5 space-y-4 border-t-4 " +
                (d.status === "expired"
                  ? "border-t-rose-500"
                  : d.status === "expiring"
                    ? "border-t-amber-500"
                    : "border-t-emerald-500")
              }
            >
              <div className="flex justify-between gap-3">
                <strong dir="ltr" className="break-all">
                  {d.domain}
                </strong>
                <span
                  className={
                    "text-xs rounded-full px-2 py-1 " +
                    (d.status === "expired"
                      ? "bg-rose-500/10 text-rose-500"
                      : d.status === "expiring"
                        ? "bg-amber-500/10 text-amber-600"
                        : "bg-emerald-500/10 text-emerald-600")
                  }
                >
                  {states[d.status]}
                </span>
              </div>
              <div className="text-xs text-muted-foreground space-y-3">
                <p>
                  {s("ثبت‌کننده", "Registrar")}: {d.registrar}
                </p>
                <p>
                  {s("تاریخ ثبت", "Registered")}: {n(d.registrationDate)}
                </p>
                <p>
                  {s("تاریخ انقضا", "Expiry")}: {n(d.expiry)}
                </p>
                {preview && (
                  <p>
                    {s(
                      "نمونه طراحی؛ وضعیت واقعی تایید نشده",
                      "Design sample; live status unverified",
                    )}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => onManageDomain(d.id, "domain")}
                >
                  <Settings size={15} />
                  {s("مدیریت", "Manage")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onRenewDomain(d.id, "domain")}
                >
                  <RefreshCw size={15} />
                  {s("تمدید", "Renew")}
                </Button>
              </div>
            </article>
          ))}
      </div>
      {!userDomains.length && (
        <p className="rounded-2xl border p-8 text-muted-foreground text-sm">
          {s(
            "دامنه‌ای از حساب شما دریافت نشده است.",
            "No domains were returned for your account.",
          )}
        </p>
      )}
    </div>
  );
}
