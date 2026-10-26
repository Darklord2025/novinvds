import BackButton from "./BackButton";
import { useServiceCatalog } from "@/contexts/PanelDataContext";
import React, { useState } from "react";
import { RefreshCw, ArrowRight, ShieldCheck, Receipt } from "lucide-react";

import { renewalAmount, withVat, cycleMonths } from "@/lib/panel-model";
import { inToman } from "@/lib/billing";
import { usePanelData } from "@/contexts/PanelDataContext";
import { Button } from "@/components/ui/button";
import { PanelHeading, usePanelCopy } from "./PanelPrimitives";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function ServiceRenewalPage({
  serviceId,
  onBack,
  onInvoice,
  onWallet,
}: {
  serviceId: string;
  onBack: () => void;
  onInvoice: (id: string) => void;
  onWallet?: () => void;
}) {
  const { getServiceById, getDomainById } = useServiceCatalog();
  const { action } = usePanelData();
  const { s, n, money } = usePanelCopy();
  const service = getServiceById(serviceId),
    domain = getDomainById(serviceId);
  const [months, setMonths] = useState(domain ? 12 : 1),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  if (!service && !domain)
    return (
      <div>
        <BackButton onClick={onBack}>{s("بازگشت", "Back")}</BackButton>
        <p>{s("سرویس در دسترس نیست.", "Service unavailable.")}</p>
      </div>
    );
  const hourly = service?.billingCycle === "Hourly",
    daily = service?.billingCycle === "Daily",
    oneTime = service?.billingCycle === "OneTime";
  const totals = domain
    ? withVat(domain.recurringAmount * (months / 12))
    : daily
      ? withVat(inToman(service!.amount, service!.currency) * months)
      : hourly || !cycleMonths[service!.billingCycle]
        ? withVat(0)
        : renewalAmount(
            inToman(service!.amount, service!.currency),
            service!.billingCycle,
            months,
          );
  async function request() {
    setBusy(true);
    try {
      const r = await action("renewal", {
        serviceId,
        months: oneTime ? undefined : months,
        unit: oneTime ? "provider" : daily ? "days" : "months",
      });
      if (r.invoiceId) onInvoice(r.invoiceId);
      else
        setMessage(
          r.preview
            ? s(
                "پیش‌نویس تمدید آماده شد. تاریخ سرویس تا تایید پرداخت تغییر نمی‌کند.",
                "Renewal draft prepared. Service expiry changes only after payment confirmation.",
              )
            : s("درخواست تمدید ثبت شد.", "Renewal request created."),
        );
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="space-y-6">
      <PanelHeading
        title={s("تمدید سرویس", "Renew service")}
        subtitle={s(
          "انتخاب دوره، بررسی مبلغ و صدور پیش‌فاکتور",
          "Choose a term, review the cost and create a proforma",
        )}
        action={
          <BackButton variant="outline" onClick={onBack}>

            {s("بازگشت به سرویس", "Back to service")}
          </BackButton>
        }
      />
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-5">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base flex gap-2">
              <RefreshCw className="text-blue-500" />
              {service?.name || domain?.domain}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-sm text-muted-foreground" dir="ltr">
              {serviceId}
            </p>
            <p>
              {s("سررسید فعلی", "Current due date")}:{" "}
              {n(service?.expiry || domain!.expiry)}
            </p>
            {oneTime ? (
              <p className="rounded-xl bg-amber-500/10 p-4">
                {s(
                  "این سرویس خرید یک‌باره دارد. تمدید یا پوشش نگهداری فقط در صورت پشتیبانی ارائه‌دهنده و پس از استعلام قابل صدور است.",
                  "This is a one-time purchase. Renewal or maintenance coverage requires provider eligibility and a verified quote.",
                )}
              </p>
            ) : hourly ? (
              <p className="rounded-xl bg-blue-500/10 p-4">
                {s(
                  "سرویس ساعتی از موجودی کیف پول استفاده می‌کند و دوره تمدید ماهانه ندارد.",
                  "Hourly services use wallet credit and do not have monthly renewal terms.",
                )}
              </p>
            ) : (
              <>
                <h3 className="font-bold">{s("دوره تمدید", "Renewal term")}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(domain
                    ? domain.domain.toLowerCase().endsWith(".ir")
                      ? [12, 60]
                      : [12]
                    : daily
                      ? [1, 7, 30, 90]
                      : [1, 3, 6, 12]
                  ).map((m) => (
                    <Button
                      key={m}
                      variant={months === m ? "default" : "outline"}
                      className="h-16 rounded-xl"
                      onClick={() => setMonths(m)}
                    >
                      {n(domain ? m / 12 : m)}{" "}
                      {domain
                        ? s("سال", "year(s)")
                        : daily
                          ? s("روز", "day(s)")
                          : s("ماه", "month(s)")}
                    </Button>
                  ))}
                </div>
              </>
            )}
            <p className="text-xs text-muted-foreground leading-6">
              {s(
                "برای دامنه منقضی، امکان تمدید و هزینه بازیابی باید توسط ثبت‌کننده تایید شود. قیمت نمونه جایگزین استعلام نهایی نیست.",
                "Expired domains require registrar confirmation of renewal and redemption fees. Sample pricing does not replace a final quote.",
              )}
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-5 text-white">
            <Receipt />
            <h2 className="font-bold mt-3">
              {s(
                "برآورد تمدید — پیش از استعلام نهایی",
                "Renewal estimate — before final quote",
              )}
            </h2>
          </div>
          <CardContent className="space-y-4 pt-5">
            <div className="flex justify-between text-sm">
              <span>{s("مبلغ پایه", "Subtotal")}</span>
              <span>
                {oneTime
                  ? s("پس از استعلام", "After quote")
                  : money(totals.subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{s("مالیات ارزش افزوده ۱۰٪", "VAT 10%")}</span>
              <span>
                {oneTime
                  ? s("پس از استعلام", "After quote")
                  : money(totals.tax)}
              </span>
            </div>
            <div className="flex justify-between border-t pt-4 font-bold">
              <span>{s("قابل پرداخت", "Total")}</span>
              <span>
                {oneTime
                  ? s("پس از استعلام", "After quote")
                  : money(totals.total)}
              </span>
            </div>
            <Button
              className="w-full rounded-xl"
              disabled={busy}
              onClick={hourly ? onWallet : request}
            >
              <ShieldCheck size={17} />
              {hourly
                ? s("شارژ برای ادامه سرویس", "Top up to continue service")
                : oneTime
                  ? s("بررسی امکان تمدید / پوشش", "Check renewal / coverage")
                  : s("صدور پیش‌فاکتور تمدید", "Create renewal proforma")}
            </Button>
            <p role="status" className="text-sm">
              {message}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
