import BackButton from "./BackButton";
import { panelDate, panelDateInput } from "@/lib/panel-date";
import React, { useState } from "react";
import { Printer, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePanelData } from "@/contexts/PanelDataContext";
import { categoryLabel, walletSummary } from "@/lib/panel-model";
import { PanelHeading, UsageDonut, usePanelCopy } from "./PanelPrimitives";
import { downloadCsv, printReport } from "@/lib/report-export";
export default function WalletUsagePage({ onBack }: { onBack: () => void }) {
  const { data, preview } = usePanelData();
  const { fa, s, n, money } = usePanelCopy();
  const [from, setFrom] = useState(""),
    [to, setTo] = useState(""),
    [category, setCategory] = useState("all"),
    [error, setError] = useState("");
  const fromIso = panelDateInput(from, fa),
    toIso = panelDateInput(to, fa);
  const rows = data.ledger.filter(
    (r) =>
      (!fromIso || r.at.slice(0, 10) >= fromIso) &&
      (!toIso || r.at.slice(0, 10) <= toIso) &&
      (category === "all" || r.category === category),
  );
  const headers = [
    s("تاریخ", "Date"),
    s("سرویس", "Service"),
    s("شرح", "Description"),
    s("معادل تومان", "Toman equivalent"),
    s("وضعیت", "Status"),
  ];
  const cells = rows.map((r) => [
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
        title={s("گزارش ریز مصرف کیف پول", "Wallet usage report")}
        action={
          <BackButton variant="outline" onClick={onBack}>

            {s("بازگشت", "Back")}
          </BackButton>
        }
      />
      <div className="flex flex-wrap gap-3">
        <Input
          aria-label={s("از تاریخ", "From date")}
          type={fa ? "text" : "date"}
          placeholder={fa ? "۱۴۰۵/۰۱/۰۱" : "YYYY-MM-DD"}
          className="w-44"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <Input
          aria-label={s("تا تاریخ", "To date")}
          type={fa ? "text" : "date"}
          placeholder={fa ? "۱۴۰۵/۰۱/۰۱" : "YYYY-MM-DD"}
          className="w-44"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <select
          aria-label={s("دسته‌بندی", "Category")}
          className="rounded-lg border bg-card px-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">{s("همه", "All")}</option>
          {[...new Set(data.ledger.map((r) => r.category))].map((c) => (
            <option key={c} value={c}>
              {categoryLabel(c, fa)}
            </option>
          ))}
        </select>
        <Button
          variant="outline"
          onClick={() => downloadCsv("wallet-usage.csv", headers, cells)}
        >
          <Download size={16} />
          {s("دانلود گزارش", "Download report")}
        </Button>
        <Button
          onClick={() => {
            try {
              printReport(
                s("گزارش کیف پول", "Wallet report"),
                headers,
                cells,
                fa,
                preview,
              );
            } catch {
              setError(
                s(
                  "باز شدن پنجره چاپ مسدود شده است.",
                  "The print window was blocked.",
                ),
              );
            }
          }}
        >
          <Printer size={16} />
          {s("چاپ گزارش", "Print report")}
        </Button>
      </div>
      <div className="rounded-2xl border bg-card p-5">
        <UsageDonut ledger={rows} />
      </div>
      <div className="rounded-2xl border overflow-x-auto">
        <table className="w-full text-sm text-start">
          <thead className="bg-muted">
            <tr>
              {headers.map((h) => (
                <th key={h} className="p-3 text-start">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cells.map((row, i) => (
              <tr key={i} className="border-t">
                {row.map((v, j) => (
                  <td key={j} className="p-3">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {!cells.length && (
          <p className="p-6 text-center text-muted-foreground">
            {s("رکوردی در این بازه نیست.", "No records in this period.")}
          </p>
        )}
      </div>
      <p role="status">
        {error ||
          ((from && !fromIso) || (to && !toIso)
            ? s("تاریخ معتبر وارد کنید؛ سال/ماه/روز.", "Enter a valid date.")
            : "")}
      </p>
    </div>
  );
}
