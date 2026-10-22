import BackButton from "./BackButton";
import React, { useState } from "react";
import {
  Receipt,
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  Eye,
  Download,
  FileBadge,
  ArrowRight,
  X,
} from "lucide-react";
import { usePanelData } from "@/contexts/PanelDataContext";
import { ColorStat, PanelHeading, usePanelCopy } from "./PanelPrimitives";
import {
  InvoiceData,
  invoiceTotals,
  formatMoney,
  statusLabels,
  canPayInvoice,
} from "@/lib/billing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { InvoiceDocument } from "./InvoiceDocument";
import InvoiceActions from "./InvoiceActions";
import OfficialInvoiceRequest from "./OfficialInvoiceRequest";
import PaymentOptions from "./PaymentOptions";
import type { InvoicePaymentMethod } from "@/data/paymentMethods";
import { downloadCsv } from "@/lib/report-export";
export default function InvoicesPage({
  onBack,
  initialInvoiceId,
  initialMode = "view",
}: {
  onBack?: () => void;
  initialInvoiceId?: string;
  initialMode?: "view" | "pay";
}) {
  const { data, preview, action } = usePanelData();
  const { fa, s, n, money } = usePanelCopy();
  const [selectedId, setSelectedId] = useState<string | null>(
      initialInvoiceId ?? null,
    ),
    [mode, setMode] = useState(initialMode),
    [query, setQuery] = useState(""),
    [filter, setFilter] = useState("all"),
    [formal, setFormal] = useState<string | null>(null),
    [method, setMethod] = useState<InvoicePaymentMethod>("card"),
    [message, setMessage] = useState("");
  const invoices = data.invoices;
  const selected = invoices.find((i) => i.id === selectedId);
  const rows = invoices.filter(
    (i) =>
      (filter === "all" || i.status === filter) &&
      (i.id + " " + i.items.map((x) => x.name).join(" "))
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const amount = (status: string) =>
    invoices
      .filter((i) => i.status === status)
      .reduce(
        (n, i) =>
          n +
          (i.currency === "IRR"
            ? invoiceTotals(i).total / 10
            : invoiceTotals(i).total),
        0,
      );
  async function pay() {
    if (!selected || !canPayInvoice(selected.status)) return;
    try {
      const r = await action("invoice-pay", { invoiceId: selected.id, method });
      setMessage(
        r.preview
          ? s(
              "بررسی نمونه انجام شد؛ پرداخت واقعی انجام نشده است.",
              "Preview reviewed; no actual payment was made.",
            )
          : s(
              "درخواست پرداخت ثبت شد. وضعیت تایید را بررسی کنید.",
              "Payment request created. Check confirmation status.",
            ),
      );
      if (r.checkoutUrl) {
        const u = new URL(r.checkoutUrl);
        if (u.protocol === "https:") location.assign(u.href);
      }
    } catch (e) {
      setMessage((e as Error).message);
    }
  }
  const decorate = (i: InvoiceData): InvoiceData => ({
    ...i,
    customer:
      data.profile.kind === "company"
        ? data.profile.company
        : data.profile.name,
    buyer: i.buyer || data.profile,
  });
  return (
    <div className="space-y-6">
      <PanelHeading
        title={s("فاکتورها و صورتحساب‌ها", "Invoices and billing")}
        subtitle={s(
          "پیگیری پرداخت، دریافت سند و درخواست فاکتور رسمی",
          "Track payments, download documents and request official invoices",
        )}
        action={
          <div className="flex gap-2">
            {onBack && (
              <BackButton variant="outline" onClick={onBack}>

                {s("بازگشت", "Back")}
              </BackButton>
            )}
            <Button
              variant="outline"
              onClick={() =>
                downloadCsv(
                  "invoices.csv",
                  [s("شناسه", "ID"), s("وضعیت", "Status"), s("تومان", "Toman")],
                  rows.map((i) => [
                    n(i.id),
                    statusLabels[i.status][fa ? 0 : 1],
                    n(
                      i.currency === "IRR"
                        ? invoiceTotals(i).total / 10
                        : invoiceTotals(i).total,
                    ),
                  ]),
                )
              }
            >
              <Download size={16} />
              {s("دانلود گزارش", "Download report")}
            </Button>
          </div>
        }
      />
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <ColorStat
          title={s("همه فاکتورها", "All invoices")}
          value={n(invoices.length)}
          icon={Receipt}
        />
        <ColorStat
          title={s("پرداخت شده", "Paid")}
          value={money(amount("Paid"))}
          icon={CheckCircle}
          color="green"
        />
        <ColorStat
          title={s("در انتظار پرداخت", "Unpaid")}
          value={money(amount("Unpaid"))}
          icon={Clock}
          color="purple"
        />
        <ColorStat
          title={s("سررسید گذشته", "Overdue")}
          value={money(amount("Overdue"))}
          icon={AlertTriangle}
          color="amber"
        />
      </div>
      <div className="rounded-2xl border bg-card overflow-hidden">
        <div className="p-4 flex flex-wrap gap-3 border-b">
          <Input
            className="flex-1 min-w-40"
            placeholder={s(
              "جستجوی شماره یا شرح فاکتور…",
              "Search invoice number or service…",
            )}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="rounded-lg border bg-card p-2"
            aria-label={s("وضعیت فاکتور", "Invoice status")}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">{s("همه وضعیت‌ها", "All statuses")}</option>
            {Object.entries(statusLabels).map(([k, v]) => (
              <option key={k} value={k}>
                {v[fa ? 0 : 1]}
              </option>
            ))}
          </select>
        </div>
        <div className="divide-y">
          {rows.map((i) => (
            <article
              key={i.id}
              className="flex flex-wrap items-center justify-between gap-4 p-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={
                    "p-3 rounded-xl " +
                    (i.status === "Paid"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : i.status === "Overdue"
                        ? "bg-rose-500/10 text-rose-500"
                        : "bg-blue-500/10 text-blue-600")
                  }
                >
                  <Receipt size={20} />
                </span>
                <div>
                  <strong className="text-sm">{n(i.id)}</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    {n(i.items[0]?.name || "")}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {n(i.dueDate)}
                  </span>
                </div>
              </div>
              <div>
                <strong>
                  {formatMoney(invoiceTotals(i).total, i.currency, fa)}
                </strong>
                <p className="text-xs mt-2 text-muted-foreground">
                  {statusLabels[i.status][fa ? 0 : 1]}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  aria-label={s("مشاهده ", "View ") + i.id}
                  onClick={() => {
                    setSelectedId(i.id);
                    setMode("view");
                    setMessage("");
                  }}
                >
                  <Eye size={15} />
                  {s("نمایش", "View")}
                </Button>
                <InvoiceActions invoice={decorate(i)} compact />
                {canPayInvoice(i.status) && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedId(i.id);
                      setMode("pay");
                      setMessage("");
                    }}
                  >
                    {s("پرداخت", "Pay")}
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setFormal(i.id)}
                >
                  <FileBadge size={15} />
                  {s("رسمی", "Official")}
                </Button>
              </div>
            </article>
          ))}
        </div>
        {!rows.length && (
          <div className="p-12 text-center text-muted-foreground">
            {s("فاکتوری یافت نشد.", "No invoices found.")}
          </div>
        )}
      </div>
      <Dialog
        open={!!selectedId}
        onOpenChange={(v) => {
          if (!v) {
            setSelectedId(null);
            setMessage("");
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[92dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{s("نمایش صورتحساب", "Invoice preview")}</DialogTitle>
            <DialogDescription>
              {s(
                "مشخصات صورتحساب و روش‌های پرداخت",
                "Invoice details and payment methods",
              )}
            </DialogDescription>
          </DialogHeader>
          {selected ? (
            <>
              <InvoiceDocument invoice={decorate(selected)} />
              <div className="flex flex-wrap justify-between gap-3">
                <InvoiceActions invoice={decorate(selected)} />
                <Button variant="outline" onClick={() => setSelectedId(null)}>
                  <X size={16} />
                  {s("بستن نمایش فاکتور", "Close invoice preview")}
                </Button>
              </div>
              {mode === "pay" && canPayInvoice(selected.status) && (
                <div className="rounded-xl border p-4 space-y-4">
                  <PaymentOptions
                    includeWallet
                    value={method}
                    onChange={setMethod}
                  />
                  <Button onClick={pay}>
                    {s("ادامه پرداخت", "Continue payment")}
                  </Button>
                  <p role="status">{message}</p>
                </div>
              )}
            </>
          ) : (
            <p>{s("فاکتور در دسترس نیست.", "Invoice unavailable.")}</p>
          )}
        </DialogContent>
      </Dialog>
      {formal && (
        <OfficialInvoiceRequest
          key={formal}
          invoiceId={formal}
          open
          onClose={() => setFormal(null)}
        />
      )}
    </div>
  );
}
