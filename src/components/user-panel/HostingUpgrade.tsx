import { useState } from "react";
import { TrendingUp, Check, Calendar } from "lucide-react";
import { hostingPlans } from "@/data/hostingCatalog";
import type { UnifiedService } from "@/data/userServices";
import { cycleMonths } from "@/lib/panel-model";
import { inToman } from "@/lib/billing";
import { panelDate } from "@/lib/panel-date";
import { proratedHostingUpgrade } from "../../../supabase/functions/_shared/hosting-upgrade";
import { usePanelData } from "@/contexts/PanelDataContext";
import { usePanelCopy } from "./PanelPrimitives";
import { Button } from "@/components/ui/button";
export default function HostingUpgrade({
  service,
}: {
  service: UnifiedService;
}) {
  const { s, n, money, fa } = usePanelCopy(),
    { action, preview } = usePanelData();
  const [open, setOpen] = useState(false),
    [selected, setSelected] = useState(""),
    [estimateAt, setEstimateAt] = useState(Date.now),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState("");
  const current = hostingPlans.find((p) => p.id === service.hostingPlanId);
  const location =
    service.country === "ir" || service.datacenterId?.startsWith("ir-")
      ? "ir"
      : "eu";
  const months = cycleMonths[service.billingCycle];
  const options = hostingPlans.filter((p) =>
    current
      ? p.cpu >= current.cpu &&
        p.ramGB >= current.ramGB &&
        p.diskGB >= current.diskGB &&
        p[location] > current[location]
      : true,
  );
  const target = options.find((p) => p.id === selected);
  let estimate: ReturnType<typeof proratedHostingUpgrade> | null = null;
  if (
    target &&
    months &&
    service.billingPeriodStart &&
    service.billingPeriodEnd
  ) {
    try {
      estimate = proratedHostingUpgrade(
        inToman(service.amount, service.currency),
        target[location] * months,
        service.billingPeriodStart,
        service.billingPeriodEnd,
        estimateAt,
      );
    } catch {
      estimate = null;
    }
  }
  return (
    <section className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="font-bold flex gap-2 items-center">
            <TrendingUp className="text-violet-500" size={20} />
            {s("ارتقای پلن میزبانی", "Upgrade hosting plan")}
          </h2>
          <p className="text-sm text-muted-foreground mt-2 leading-7">
            {s(
              "پلن بالاتر را انتخاب کنید؛ فقط اختلاف هزینه برای زمان باقی‌مانده دوره محاسبه می‌شود.",
              "Choose a higher plan. Only the price difference for the remaining billing period is charged.",
            )}
          </p>
        </div>
        <Button
          onClick={() => setOpen((v) => !v)}
          variant={open ? "outline" : "default"}
        >
          {open
            ? s("بستن گزینه‌های ارتقا", "Hide upgrade options")
            : s("انتخاب پلن بالاتر", "Choose a higher plan")}
        </Button>
      </div>
      {open && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {options.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelected(p.id);
                  setEstimateAt(Date.now());
                  setMessage("");
                }}
                className={
                  "rounded-2xl border bg-card text-start p-5 " +
                  (selected === p.id
                    ? "border-violet-500 ring-1 ring-violet-500"
                    : "")
                }
              >
                <strong>{s(p.fa, p.en)}</strong>
                <p className="text-sm my-3">
                  {n(p.cpu)} vCPU · {n(p.ramGB)} GB RAM · {n(p.diskGB)} GB NVMe
                </p>
                <p className="font-bold text-violet-600">
                  {money(p[location])} /{" "}
                  {s("ماهانه، پیشنهادی", "month, proposed")}
                </p>
              </button>
            ))}
          </div>
          {!options.length && (
            <p className="text-sm">
              {s(
                "پلن بزرگ‌تر در کاتالوگ وجود ندارد؛ برای ارتقای سفارشی تیکت بزنید.",
                "No larger catalog plan is available. Contact support for a custom upgrade.",
              )}
            </p>
          )}
          {estimate ? (
            <div className="rounded-xl border bg-card p-5 space-y-3 text-sm">
              <p className="flex gap-2">
                <Calendar size={16} />
                {s("پایان دوره فعلی", "Current period ends")}:{" "}
                {panelDate(service.billingPeriodEnd!, fa)}
              </p>
              <p>
                {s("زمان باقی‌مانده", "Time remaining")}:{" "}
                {n(estimate.remainingDays.toFixed(2))} {s("روز", "days")}
              </p>
              <p>
                {s("اختلاف متناسب با زمان", "Prorated difference")}:{" "}
                {money(estimate.subtotal)}
              </p>
              <p>
                {s("مالیات ۱۰٪", "10% VAT")}: {money(estimate.tax)}
              </p>
              <p className="font-bold text-lg">
                {s("برآورد هزینه ارتقا", "Estimated upgrade cost")}:{" "}
                {money(estimate.total)}
              </p>
            </div>
          ) : (
            selected && (
              <p className="text-sm rounded-xl bg-amber-500/10 p-4">
                {s(
                  "برای محاسبه قطعی، قیمت و تاریخ شروع و پایان دوره پرداخت باید از ارائه‌دهنده دریافت شود. مبلغی حدس زده نمی‌شود.",
                  "A final calculation requires provider-confirmed prices and billing-period start/end dates. No amount is guessed.",
                )}
              </p>
            )
          )}
          <p className="text-xs leading-6 text-muted-foreground">
            {s(
              "فرمول: اختلاف قیمت دو پلن در همان دوره × نسبت زمان باقی‌مانده. تاریخ سررسید حفظ می‌شود. مبلغ نهایی با استعلام ارائه‌دهنده تعیین و تغییر منابع پس از پرداخت تأییدشده انجام می‌شود.",
              "Formula: same-period plan price difference × remaining-time fraction. The due date is retained. Provider quoting determines the final amount; resources change only after verified payment.",
            )}
          </p>
          <Button
            disabled={!target || busy || service.status !== "active"}
            onClick={async () => {
              setBusy(true);
              try {
                const result = await action("hosting-upgrade", {
                  serviceId: service.id,
                  targetPlanId: selected,
                });
                setMessage(
                  preview
                    ? s(
                        "درخواست ارتقا فقط در پیش‌نمایش ثبت شد؛ منابع و موجودی حساب تغییر نکرد.",
                        "Upgrade request recorded in preview only; resources and account funds did not change.",
                      )
                    : s(
                        "پیش‌فاکتور ارتقا صادر شد؛ از بخش فاکتورها پرداخت کنید: ",
                        "Upgrade proforma created. Pay from Invoices: ",
                      ) + (result.invoiceId || ""),
                );
              } catch (e) {
                setMessage((e as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          >
            <Check size={16} className="me-2" />
            {s("دریافت پیش‌فاکتور ارتقا", "Request upgrade proforma")}
          </Button>
          <p role="status" className="text-sm">
            {message}
          </p>
        </div>
      )}
    </section>
  );
}
