import BackButton from "./BackButton";
import { useState } from "react";
import {
  Bell,
  CheckCheck,
  MailOpen,
  Megaphone,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { usePanelData } from "@/contexts/PanelDataContext";
import { usePanelCopy } from "./PanelPrimitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function PanelNotifications({
  importantOnly = false,
  onView,
}: {
  importantOnly?: boolean;
  onView?: (notification: any) => void;
}) {
  const { data, action } = usePanelData(),
    { fa, s, n } = usePanelCopy();
  const [query, setQuery] = useState(""),
    [filter, setFilter] = useState("all"),
    [selected, setSelected] = useState(""),
    [message, setMessage] = useState("");
  const items = data.notifications || [],
    notification = items.find((v) => v.id === selected);
  async function read(ids: string[]) {
    try {
      await action("notifications-read", { ids });
    } catch (e) {
      setMessage((e as Error).message);
    }
  }
  if (notification)
    return (
      <div className="space-y-5" dir={fa ? "rtl" : "ltr"}>
        <BackButton variant="outline" onClick={() => setSelected("")}>
          {fa ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}{" "}
          {s("بازگشت به اعلان‌ها", "Back to notifications")}
        </BackButton>
        <article className="rounded-2xl border bg-card p-6 space-y-5">
          <h1 className="text-xl font-bold">
            {notification.title[fa ? "fa" : "en"]}
          </h1>
          <p className="text-xs text-muted-foreground">
            {new Date(notification.at).toLocaleString(fa ? "fa-IR" : "en-US")}
          </p>
          <p className="text-sm leading-9 whitespace-pre-wrap">
            {notification.body[fa ? "fa" : "en"]}
          </p>
        </article>
      </div>
    );
  const rows = items.filter(
    (v) =>
      (!importantOnly || v.important) &&
      (filter === "all" ||
        (filter === "unread" && !v.read) ||
        (filter === "read" && v.read)) &&
      (v.title[fa ? "fa" : "en"] + " " + v.body[fa ? "fa" : "en"])
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="space-y-6" dir={fa ? "rtl" : "ltr"}>
      <header className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold flex gap-2">
            {importantOnly ? <Megaphone /> : <Bell />}
            {importantOnly
              ? s("اطلاعیه‌های مهم", "Important announcements")
              : s("مرکز اعلان‌ها", "Notification center")}
          </h1>
          <p className="mt-3 text-blue-100 text-sm">
            {n(items.filter((v) => !v.read).length)}{" "}
            {s("اعلان خوانده‌نشده", "unread notifications")}
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => read(items.filter((v) => !v.read).map((v) => v.id))}
        >
          <CheckCheck size={17} />
          {s("علامت همه به عنوان خوانده‌شده", "Mark all as read")}
        </Button>
      </header>
      <div className="flex flex-wrap gap-3">
        <Input
          className="flex-1 min-w-40"
          placeholder={s("جستجوی اعلان…", "Search notifications…")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {[
          ["all", "همه", "All"],
          ["unread", "خوانده‌نشده", "Unread"],
          ["read", "خوانده‌شده", "Read"],
        ].map(([id, f, en]) => (
          <Button
            key={id}
            variant={filter === id ? "default" : "outline"}
            onClick={() => setFilter(id)}
          >
            {s(f, en)}
          </Button>
        ))}
      </div>
      <div className="space-y-3">
        {rows.map((v) => (
          <button
            key={v.id}
            onClick={() => {
              void read([v.id]);
              setSelected(v.id);
            }}
            className={
              "w-full rounded-2xl border p-5 text-start flex items-start gap-4 " +
              (v.read ? "bg-card" : "bg-blue-500/5 border-blue-500/20")
            }
          >
            <span className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
              <MailOpen size={20} />
            </span>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-sm">{v.title[fa ? "fa" : "en"]}</h2>
              <p className="text-sm text-muted-foreground mt-3 leading-7 line-clamp-2">
                {v.body[fa ? "fa" : "en"]}
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                {new Date(v.at).toLocaleString(fa ? "fa-IR" : "en-US")}
              </p>
            </div>
            {!v.read && (
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
            )}
          </button>
        ))}
      </div>
      {!rows.length && (
        <p className="rounded-2xl border bg-card p-10 text-center text-muted-foreground">
          {s(
            "اعلانی برای نمایش وجود ندارد.",
            "There are no notifications to show.",
          )}
        </p>
      )}
      <p role="status">{message}</p>
    </div>
  );
}
