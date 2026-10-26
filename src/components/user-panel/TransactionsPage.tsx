import BackButton from "./BackButton";
import { useState } from "react";
import { usePanelData } from "@/contexts/PanelDataContext";
import { categoryLabel } from "@/lib/panel-model";
import { panelDate } from "@/lib/panel-date";
import { downloadCsv } from "@/lib/report-export";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PanelHeading, usePanelCopy } from "./PanelPrimitives";
export default function TransactionsPage({ onBack }: { onBack?: () => void }) {
  const { data } = usePanelData();
  const { s, n, fa, money } = usePanelCopy();
  const [query, setQuery] = useState(""),
    [status, setStatus] = useState("all"),
    [direction, setDirection] = useState("all");
  const rows = data.ledger.filter(
    (r) =>
      (status === "all" || r.status === status) &&
      (direction === "all" ||
        (direction === "credit" ? r.amountToman > 0 : r.amountToman < 0)) &&
      (r.description + r.id + categoryLabel(r.category, fa))
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const headers = [
      s("شناسه", "Reference"),
      s("تاریخ", "Date"),
      s("نوع تراکنش", "Type"),
      s("شرح", "Description"),
      s("مبلغ — تومان", "Amount — Toman"),
      s("وضعیت", "Status"),
    ],
    cells = rows.map((r) => [
      n(r.id),
      panelDate(r.at, fa),
      categoryLabel(r.category, fa),
      r.description,
      n(r.amountToman),
      r.status === "confirmed"
        ? s("تاییدشده", "Confirmed")
        : s("در انتظار", "Pending"),
    ]);
  return (
    <div className="space-y-5">
      <PanelHeading
        title={s("تراکنش‌های مالی", "Financial transactions")}
        subtitle={s(
          "واریز، برداشت، پرداخت و پورسانت؛ مجزا از گزارش مصرف سرویس‌ها",
          "Deposits, withdrawals, payments and commission, separate from service usage",
        )}
        action={
          onBack && (
            <BackButton variant="outline" onClick={onBack}>
              {s("بازگشت", "Back")}
            </BackButton>
          )
        }
      />
      <div className="flex flex-wrap gap-3">
        <Input
          aria-label={s("جستجوی تراکنش", "Search transactions")}
          placeholder={s(
            "جستجو بر اساس شناسه یا شرح",
            "Search reference or description",
          )}
          className="max-w-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="border rounded-xl bg-card p-3"
          aria-label={s("وضعیت تراکنش", "Transaction status")}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {[
            ["all", "همه وضعیت‌ها", "All statuses"],
            ["confirmed", "تاییدشده", "Confirmed"],
            ["pending", "در انتظار", "Pending"],
          ].map(([id, f, en]) => (
            <option key={id} value={id}>
              {s(f, en)}
            </option>
          ))}
        </select>
        <select
          className="border rounded-xl bg-card p-3"
          aria-label={s("جهت تراکنش", "Transaction direction")}
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
        >
          {[
            ["all", "واریز و برداشت", "All movements"],
            ["credit", "ورودی", "Credits"],
            ["debit", "خروجی", "Debits"],
          ].map(([id, f, en]) => (
            <option key={id} value={id}>
              {s(f, en)}
            </option>
          ))}
        </select>
        <Button
          variant="outline"
          onClick={() => downloadCsv("transactions.csv", headers, cells)}
        >
          {s("دانلود گزارش تراکنش", "Export transactions")}
        </Button>
      </div>
      <div className="overflow-x-auto border rounded-2xl bg-card">
        <table className="w-full text-start text-sm">
          <thead className="bg-blue-500/5">
            <tr>
              {headers.map((h) => (
                <th key={h} className="p-4 text-start">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cells.map((row, i) => (
              <tr key={rows[i].id} className="border-t">
                {row.map((v, j) => (
                  <td
                    key={j}
                    className={
                      "p-4 " +
                      (j === 4
                        ? rows[i].amountToman > 0
                          ? "text-emerald-600"
                          : "text-rose-500"
                        : "")
                    }
                  >
                    {j === 4 ? money(rows[i].amountToman) : v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && (
          <p className="p-8 text-center text-muted-foreground">
            {s(
              "تراکنشی با این فیلتر پیدا نشد.",
              "No transactions match your filters.",
            )}
          </p>
        )}
      </div>
    </div>
  );
}
