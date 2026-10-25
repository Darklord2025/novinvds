import { ticketReport } from "@/lib/ticket-report";
import { downloadText } from "@/lib/report-export";
import React, { useState } from "react";
import {
  Ticket,
  Plus,
  MessageSquare,
  CheckCircle,
  Clock,
  Download,
  Search,
  Lock,
} from "lucide-react";
import { usePanelData } from "@/contexts/PanelDataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ColorStat, PanelHeading, usePanelCopy } from "./PanelPrimitives";
import { downloadCsv } from "@/lib/report-export";
export default function TicketsPage({
  onViewTicket,
  onCreateNewTicket,
}: {
  onViewTicket: (id: string) => void;
  onCreateNewTicket: () => void;
}) {
  const { data, closeTicket } = usePanelData();
  const { fa, s, n } = usePanelCopy();
  const [filter, setFilter] = useState("all"),
    [query, setQuery] = useState(""),
    [error, setError] = useState("");
  const labels = {
    open: s("باز / در انتظار پاسخ", "Open / awaiting response"),
    answered: s("پاسخ داده شده", "Answered"),
    closed: s("بسته شده", "Closed"),
  };
  const rows = data.tickets.filter(
    (t) =>
      (filter === "all" || t.status === filter) &&
      (String(t.number) + " " + t.subject).includes(query),
  );
  return (
    <div className="space-y-6">
      <PanelHeading
        title={s("پشتیبانی و تیکت‌ها", "Support tickets")}
        subtitle={s(
          "گفتگوهای شما، مرتب و همیشه در دسترس",
          "All your support conversations in one place",
        )}
        action={
          <Button onClick={onCreateNewTicket} className="rounded-xl">
            <Plus size={17} />
            {s("تیکت جدید", "New ticket")}
          </Button>
        }
      />
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <ColorStat
          title={s("همه تیکت‌ها", "All tickets")}
          value={n(data.tickets.length)}
          icon={Ticket}
        />
        <ColorStat
          title={s("در انتظار پاسخ", "Awaiting response")}
          value={n(data.tickets.filter((t) => t.status === "open").length)}
          icon={Clock}
          color="amber"
        />
        <ColorStat
          title={s("پاسخ داده شده", "Answered")}
          value={n(data.tickets.filter((t) => t.status === "answered").length)}
          icon={MessageSquare}
          color="green"
        />
        <ColorStat
          title={s("بسته شده", "Closed")}
          value={n(data.tickets.filter((t) => t.status === "closed").length)}
          icon={CheckCircle}
          color="purple"
        />
      </div>
      <div className="rounded-2xl border bg-card overflow-hidden">
        <div className="flex flex-wrap gap-2 p-4 border-b">
          {["all", "open", "answered", "closed"].map((v) => (
            <Button
              size="sm"
              key={v}
              variant={filter === v ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setFilter(v)}
            >
              {v === "all" ? s("همه", "All") : labels[v]}
            </Button>
          ))}
          <Button
            size="sm"
            variant="ghost"
            className="ms-auto"
            onClick={() => {
              try {
                downloadText(
                  "novinvds-support-report.csv",
                  ticketReport(rows, fa),
                  "text/csv;charset=utf-8",
                );
                setError(s("فایل گزارش ساخته شد.", "Report file generated."));
              } catch {
                setError(
                  s("ساخت گزارش ممکن نشد.", "Unable to generate the report."),
                );
              }
            }}
          >
            <Download size={15} />
            {s("گزارش", "Report")}
          </Button>
        </div>
        <div className="p-4 border-b">
          <Input
            placeholder={s(
              "جستجوی شماره یا عنوان تیکت…",
              "Search ticket number or subject…",
            )}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="divide-y">
          {rows.map((t) => (
            <article
              key={t.id}
              className="flex flex-wrap justify-between items-center gap-4 p-4"
            >
              <button
                className="text-start flex gap-3 min-w-0"
                onClick={() => onViewTicket(t.id)}
              >
                <span className="p-3 h-fit rounded-xl bg-blue-500/10 text-blue-600">
                  <MessageSquare size={20} />
                </span>
                <div>
                  <strong className="block text-sm">
                    {n(t.number)} · {t.subject}
                  </strong>
                  {t.context?.resourceName && (
                    <small className="block text-muted-foreground mt-1">
                      {t.context.resourceName}
                    </small>
                  )}
                  <span className="text-xs text-muted-foreground mt-2 block">
                    {new Date(t.createdAt).toLocaleDateString(
                      s("fa-IR", "en-US"),
                    )}
                  </span>
                </div>
              </button>
              <div className="flex gap-2 items-center">
                <span
                  className={
                    "text-xs px-3 py-1 rounded-full " +
                    (t.status === "closed"
                      ? "bg-muted"
                      : t.status === "answered"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-amber-500/10 text-amber-600")
                  }
                >
                  {labels[t.status]}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onViewTicket(t.id)}
                >
                  {s("مشاهده", "View")}
                </Button>
                {t.status !== "closed" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label={s("بستن تیکت ", "Close ticket ") + t.number}
                    onClick={async () => {
                      try {
                        await closeTicket(t.id);
                      } catch (e) {
                        setError((e as Error).message);
                      }
                    }}
                  >
                    <Lock size={14} />
                    {s("بستن", "Close")}
                  </Button>
                )}
              </div>
            </article>
          ))}
        </div>
        {!rows.length && (
          <p className="p-12 text-center text-muted-foreground">
            {s("تیکتی یافت نشد.", "No tickets found.")}
          </p>
        )}
      </div>
      <p role="alert">{error}</p>
    </div>
  );
}
