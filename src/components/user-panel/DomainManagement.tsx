import BackButton from "./BackButton";
import { useState } from "react";
import { useServiceCatalog, usePanelData } from "@/contexts/PanelDataContext";
import {
  Globe,
  Calendar,
  Shield,
  RefreshCw,
  Copy,
  ArrowRight,
} from "lucide-react";
import { PanelHeading, ColorStat, usePanelCopy } from "./PanelPrimitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export interface DomainManagementProps {
  domainId: string;
  onBack: () => void;
  onRenew?: () => void;
}
export default function DomainManagement({
  domainId,
  onBack,
  onRenew,
}: DomainManagementProps) {
  const { getDomainById, preview } = useServiceCatalog(),
    { action } = usePanelData();
  const { fa, s, n } = usePanelCopy();
  const domain = getDomainById(domainId);
  const [nameservers, setNameservers] = useState(
      domain?.nameservers.join("\n") || "",
    ),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  if (!domain)
    return (
      <div>
        <BackButton onClick={onBack}>{s("بازگشت", "Back")}</BackButton>
        <p>{s("دامنه در دسترس نیست.", "Domain unavailable.")}</p>
      </div>
    );
  const status = {
    active: s("فعال", "Active"),
    expiring: s("در حال انقضا", "Expiring"),
    expired: s("منقضی‌شده", "Expired"),
    pending: s("در انتظار", "Pending"),
  }[domain.status];
  return (
    <div className="space-y-6" dir={fa ? "rtl" : "ltr"}>
      <PanelHeading
        title={domain.domain}
        subtitle={s("مدیریت دامنه انتخاب‌شده", "Selected domain management")}
        action={
          <div className="flex gap-2">
            <BackButton variant="outline" onClick={onBack}>

              {s("بازگشت", "Back")}
            </BackButton>
            <Button onClick={onRenew}>
              <RefreshCw size={16} />
              {s("تمدید دامنه", "Renew domain")}
            </Button>
          </div>
        }
      />
      <div className="grid sm:grid-cols-3 gap-3">
        <ColorStat
          title={s("وضعیت", "Status")}
          value={status}
          icon={Globe}
          color={
            domain.status === "expired"
              ? "rose"
              : domain.status === "expiring"
                ? "amber"
                : "green"
          }
        />
        <ColorStat
          title={s("تاریخ انقضا", "Expiry date")}
          value={n(domain.expiry)}
          icon={Calendar}
          color="purple"
        />
        <ColorStat
          title={s("ثبت‌کننده", "Registrar")}
          value={domain.registrar}
          icon={Shield}
        />
      </div>
      {preview && (
        <p className="text-sm text-muted-foreground">
          {s(
            "کاتالوگ نمونه؛ ثبت‌کننده متصل نیست و تغییری واقعی اعمال نمی‌شود.",
            "Sample catalog; the registrar is disconnected and no real changes execute.",
          )}
        </p>
      )}
      <div className="grid lg:grid-cols-2 gap-5">
        <section className="rounded-2xl border bg-card p-6 space-y-5">
          <h2 className="font-bold">
            {s("اطلاعات دامنه", "Domain information")}
          </h2>
          <dl className="space-y-4 text-sm">
            {[
              [s("نام دامنه", "Domain"), domain.domain],
              [s("تاریخ ثبت", "Registered"), n(domain.registrationDate)],
              [
                s("تمدید خودکار", "Auto renewal"),
                domain.autoRenew
                  ? s("فعال", "Enabled")
                  : s("غیرفعال", "Disabled"),
              ],
              [
                s("حریم خصوصی", "Privacy"),
                domain.privacyProtection
                  ? s("فعال", "Enabled")
                  : s("غیرفعال", "Disabled"),
              ],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex flex-wrap justify-between border-b pb-3 gap-2"
              >
                <dt className="text-muted-foreground">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
        <form
          className="rounded-2xl border bg-card p-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            try {
              const ns = nameservers
                .split(/[,\n]/)
                .map((v) => v.trim())
                .filter(Boolean);
              if (
                ns.length < 2 ||
                ns.length > 6 ||
                ns.some((v) => !/^([a-z0-9-]+\.)+[a-z]{2,}$/i.test(v))
              )
                throw Error(
                  s(
                    "۲ تا ۶ نیم‌سرور معتبر وارد کنید.",
                    "Enter 2–6 valid nameservers.",
                  ),
                );
              const result = await action("domain-request", {
                domainId,
                operation: "nameservers",
                nameservers: ns,
              });
              setMessage(
                result.preview
                  ? s(
                      "درخواست نمونه بررسی شد؛ تغییری ذخیره نشده است.",
                      "Preview reviewed; no registrar changes were saved.",
                    )
                  : s(
                      "درخواست برای ثبت‌کننده ارسال شد.",
                      "Request submitted to the registrar.",
                    ),
              );
            } catch (e) {
              setMessage((e as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          <h2 className="font-bold">{s("نیم‌سرورها", "Nameservers")}</h2>
          <p className="text-xs text-muted-foreground">
            {s(
              "هر نیم‌سرور را در یک خط وارد کنید.",
              "Enter one nameserver per line.",
            )}
          </p>
          <textarea
            dir="ltr"
            className="border bg-background rounded-xl p-3 w-full min-h-36"
            value={nameservers}
            onChange={(e) => setNameservers(e.target.value)}
          />
          <Button disabled={busy}>
            {s("ثبت درخواست تغییر نیم‌سرور", "Request nameserver change")}
          </Button>
          <p role="status" className="text-sm">
            {message}
          </p>
        </form>
      </div>
    </div>
  );
}
