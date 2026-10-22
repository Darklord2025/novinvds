import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatMoney, localize } from "@/lib/billing";
import {
  usageGroups,
  type LedgerEntry,
  categoryLabel,
} from "@/lib/panel-model";
export function usePanelCopy() {
  const { language } = useLanguage();
  return {
    fa: language === "fa",
    s: (fa: string, en: string) => (language === "fa" ? fa : en),
    n: (v: string | number) => localize(v, language === "fa"),
    money: (v: number) => formatMoney(v, "TOMAN", language === "fa"),
  };
}
export function PanelHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex flex-wrap justify-between items-center gap-4 mb-6">
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>
        )}
      </div>
      {action}
    </header>
  );
}
export function ColorStat({
  title,
  value,
  icon: Icon,
  color = "blue",
  hint,
}: {
  title: string;
  value: React.ReactNode;
  icon: React.ComponentType<any>;
  color?: string;
  hint?: string;
}) {
  const colors: Record<string, string> = {
    blue: "from-blue-600 to-indigo-600",
    green: "from-emerald-500 to-teal-600",
    purple: "from-violet-500 to-purple-600",
    amber: "from-amber-400 to-orange-500",
    rose: "from-rose-500 to-pink-600",
  };
  return (
    <article className="rounded-2xl border bg-card p-4 md:p-5 shadow-sm relative overflow-hidden">
      <div
        className={
          "absolute inset-x-0 top-0 h-1 bg-gradient-to-r " + colors[color]
        }
      />
      <div className="flex items-start gap-2">
        <p className="text-xs text-muted-foreground flex-1 min-w-0">{title}</p>
        <div
          className={
            "shrink-0 rounded-xl p-2 md:p-3 text-white bg-gradient-to-br " +
            colors[color]
          }
        >
          <Icon size={20} />
        </div>
      </div>
      <div className="font-extrabold text-base sm:text-xl md:text-2xl mt-3 [overflow-wrap:anywhere]">
        {value}
      </div>
      {hint && <p className="text-xs text-muted-foreground mt-3">{hint}</p>}
    </article>
  );
}
export function UsageDonut({ ledger }: { ledger: LedgerEntry[] }) {
  const { fa, s, money } = usePanelCopy();
  const groups = usageGroups(ledger);
  const total = groups.reduce((n, g) => n + g.value, 0);
  let offset = 0;
  const colors = [
    "#2563eb",
    "#8b5cf6",
    "#14b8a6",
    "#f59e0b",
    "#f43f5e",
    "#64748b",
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <div className="relative w-44 h-44 shrink-0">
        <svg
          viewBox="0 0 120 120"
          role="img"
          aria-label={s("نمودار مصرف موجودی", "Wallet usage chart")}
          className="w-full h-full -rotate-90"
        >
          <circle
            cx="60"
            cy="60"
            r="46"
            fill="none"
            stroke="currentColor"
            className="text-muted"
            strokeWidth="13"
          />
          {groups.map((g, i) => {
            const pct = (g.value / total) * 100;
            const start = offset;
            offset += pct;
            return (
              <circle
                key={g.name}
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke={colors[i % colors.length]}
                strokeWidth="13"
                pathLength="100"
                strokeDasharray={pct + " " + (100 - pct)}
                strokeDashoffset={-start}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <strong className="text-sm">{money(total)}</strong>
          <span className="text-[11px] text-muted-foreground">
            {s("مصرف تاییدشده", "Confirmed usage")}
          </span>
        </div>
      </div>
      <ul className="space-y-3 text-sm min-w-32">
        {groups.length ? (
          groups.map((g, i) => (
            <li key={g.name} className="flex gap-2 items-center">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: colors[i % colors.length] }}
              />
              {categoryLabel(g.name, fa)}
              <strong className="ms-auto ps-3 text-xs">{money(g.value)}</strong>
            </li>
          ))
        ) : (
          <li className="text-muted-foreground">
            {s("هنوز مصرفی ثبت نشده", "No usage recorded")}
          </li>
        )}
      </ul>
    </div>
  );
}
