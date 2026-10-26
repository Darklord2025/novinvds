import MarketRates from "./MarketRates";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Receipt,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { usePanelData } from "@/contexts/PanelDataContext";
import { accountWallet, categoryLabel } from "@/lib/panel-model";
import { panelDate } from "@/lib/panel-date";
import { Button } from "@/components/ui/button";
import { PanelHeading, ColorStat, usePanelCopy } from "./PanelPrimitives";
export default function BillingOverviewPage({
  navigateToServiceOrderPage: go = () => {},
  onNavigateToTransactions,
  onNavigateToInvoices,
  onBack,
}: {
  navigateToServiceOrderPage?: (path: string) => void;
  onNavigateToTransactions?: () => void;
  onNavigateToInvoices?: () => void;
  onBack?: () => void;
}) {
  const { data } = usePanelData();
  const { s, n, money, fa } = usePanelCopy();
  const wallet = accountWallet(data),
    unpaid = data.invoices.filter((i) =>
      ["Unpaid", "Overdue"].includes(i.status),
    );
  return (
    <div className="space-y-6">
      <PanelHeading
        title={s("نمای کلی امور مالی", "Financial overview")}
        subtitle={s(
          "صورت‌حساب‌ها، تراکنش‌ها و موجودی شما در یک نگاه",
          "Your invoices, transactions and account balance at a glance",
        )}
        action={
          <Button onClick={() => go("/wallet-topup")}>
            {s("افزایش موجودی", "Add funds")}
          </Button>
        }
      />
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <ColorStat
          icon={Wallet}
          title={s("موجودی قابل استفاده", "Available balance")}
          value={money(wallet.balance)}
          color="green"
        />
        <ColorStat
          icon={ArrowUpRight}
          title={s("مصرف تاییدشده", "Confirmed spending")}
          value={money(wallet.spent)}
          color="blue"
        />
        <ColorStat
          icon={Receipt}
          title={s("فاکتورهای پرداخت‌نشده", "Outstanding invoices")}
          value={n(unpaid.length)}
          color="rose"
        />
        <ColorStat
          icon={Clock}
          title={s("درخواست‌های در انتظار", "Pending requests")}
          value={n(
            data.requests.filter((r) =>
              ["pending", "approved"].includes(r.status),
            ).length,
          )}
          color="amber"
        />
      </div>
      <MarketRates />
      <div className="grid lg:grid-cols-2 gap-5">
        <section className="rounded-2xl border bg-card p-5 space-y-4">
          <header className="flex justify-between gap-3">
            <h2 className="font-bold">
              {s("تراکنش‌های اخیر", "Recent transactions")}
            </h2>
          </header>
          {data.ledger.slice(0, 5).map((r) => (
            <div
              key={r.id}
              className="rounded-xl border p-4 flex justify-between gap-3"
            >
              <div>
                <p className="font-medium text-sm">
                  {r.description || categoryLabel(r.category, fa)}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {panelDate(r.at, fa)} · {categoryLabel(r.category, fa)}
                </p>
              </div>
              <strong
                className={
                  r.amountToman > 0 ? "text-emerald-600" : "text-rose-500"
                }
              >
                {money(r.amountToman)}
              </strong>
            </div>
          ))}
          {!data.ledger.length && (
            <p className="text-muted-foreground">
              {s("تراکنشی ثبت نشده است.", "No transactions recorded.")}
            </p>
          )}
        </section>
        <section className="rounded-2xl border bg-card p-5 space-y-4">
          <header className="flex justify-between gap-3">
            <h2 className="font-bold">
              {s("فاکتورهای اخیر", "Recent invoices")}
            </h2>
          </header>
          {data.invoices.slice(0, 5).map((i) => (
            <button
              key={i.id}
              className="block text-start w-full rounded-xl border p-4 hover:border-blue-500"
              onClick={() => go("/invoices/" + i.id)}
            >
              <strong>{n(i.id)}</strong>
              <p className="text-xs text-muted-foreground mt-2">
                {panelDate(i.issueDate, fa)} ·{" "}
                {i.status === "Paid"
                  ? s("پرداخت‌شده", "Paid")
                  : s("بررسی صورت‌حساب", "Review invoice")}
              </p>
            </button>
          ))}
        </section>
      </div>
    </div>
  );
}
