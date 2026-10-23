import { useEffect, useState } from "react";
import {
  Bell,
  BellRing,
  CheckCheck,
  ChevronDown,
  Headphones,
  LayoutDashboard,
  LogOut,
  MailOpen,
  Settings,
  ShieldCheck,
  User,
  Wallet,
} from "lucide-react";
import { usePanelData } from "@/contexts/PanelDataContext";
import { accountWallet } from "@/lib/panel-model";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePanelCopy } from "./PanelPrimitives";

export default function HeaderMenus({
  activeTab,
  onNavigate,
  onSignOut,
}: {
  activeTab?: string;
  onNavigate?: (tab: string) => void;
  onSignOut: () => Promise<void>;
}) {
  const { data, action, ready, preview } = usePanelData();
  const { fa, s, n, money } = usePanelCopy();
  const [open, setOpen] = useState<"notifications" | "account" | null>(null),
    [selected, setSelected] = useState(""),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState("");
  const items = [...(data.notifications || [])].sort(
    (a, b) => Date.parse(b.at) - Date.parse(a.at),
  );
  const unread = items.filter((item) => !item.read),
    notification = items.find((item) => item.id === selected);
  const name =
    data.profile.name ||
    data.profile.username ||
    s("حساب کاربری", "Your account");
  const lang = fa ? "fa" : "en";
  useEffect(() => {
    setOpen(null);
    setSelected("");
    setMessage("");
  }, [activeTab]);
  function change(menu: "notifications" | "account", value: boolean) {
    setOpen((current) => (value ? menu : current === menu ? null : current));
    if (value) {
      setSelected("");
      setMessage("");
    }
  }
  function navigate(tab: string) {
    setOpen(null);
    onNavigate?.(tab);
  }
  function date(at: string) {
    return Number.isFinite(Date.parse(at))
      ? new Date(at).toLocaleString(fa ? "fa-IR" : "en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "—";
  }
  async function markRead(ids: string[]) {
    if (busy || !ids.length) return;
    setBusy(true);
    setMessage("");
    try {
      await action("notifications-read", { ids });
    } catch {
      setMessage(
        s(
          "ثبت وضعیت خوانده‌شده ممکن نشد. دوباره تلاش کنید.",
          "Unable to save read status. Please retry.",
        ),
      );
    } finally {
      setBusy(false);
    }
  }
  async function signOut() {
    if (busy) return;
    setBusy(true);
    setMessage("");
    try {
      await onSignOut();
      setOpen(null);
    } catch {
      setMessage(
        s(
          "خروج انجام نشد. دوباره تلاش کنید.",
          "Unable to sign out. Please retry.",
        ),
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <Popover
        open={open === "notifications"}
        onOpenChange={(value) => change("notifications", value)}
      >
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-xl data-[state=open]:bg-blue-500/10 data-[state=open]:text-blue-600"
            aria-label={
              s("اعلان‌ها", "Notifications") +
              (unread.length
                ? ` (${n(unread.length)} ${s("خوانده‌نشده", "unread")})`
                : "")
            }
          >
            <Bell size={19} />
            {unread.length > 0 && (
              <span
                aria-hidden="true"
                className="absolute -top-0.5 -end-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-card bg-rose-500 px-0.5 text-[9px] font-bold text-white"
              >
                {n(unread.length > 99 ? "99+" : unread.length)}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          dir={fa ? "rtl" : "ltr"}
          aria-label={s("اعلان‌های اخیر", "Recent notifications")}
          align="end"
          sideOffset={10}
          collisionPadding={12}
          className="w-[360px] max-w-[calc(100vw-24px)] overflow-hidden rounded-2xl p-0 shadow-xl"
        >
          <div className="flex items-center justify-between gap-2 border-b bg-blue-500/5 px-4 py-3">
            <div>
              <h2 className="text-sm font-bold">
                {s("اعلان‌ها", "Notifications")}
              </h2>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {n(unread.length)} {s("پیام خوانده‌نشده", "unread messages")}
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 gap-1 text-[11px] text-blue-600 dark:text-blue-300"
              disabled={busy || !unread.length}
              onClick={() => void markRead(unread.map((item) => item.id))}
            >
              <CheckCheck size={15} />
              {s("خواندن همه", "Read all")}
            </Button>
          </div>
          <div
            className="max-h-[min(55dvh,380px)] overflow-y-auto overscroll-contain"
            aria-busy={!ready || busy}
          >
            {notification ? (
              <article className="space-y-3 p-4">
                <button
                  type="button"
                  className="text-xs text-blue-600 dark:text-blue-300"
                  onClick={() => setSelected("")}
                >
                  {s("بازگشت به اعلان‌ها", "Back to notifications")}
                </button>
                <h3 className="text-sm font-bold leading-7">
                  {notification.title[lang]}
                </h3>
                <time
                  dateTime={notification.at}
                  className="block text-[10px] text-muted-foreground"
                >
                  {date(notification.at)}
                </time>
                <p className="whitespace-pre-wrap break-words text-sm leading-8">
                  {notification.body[lang]}
                </p>
              </article>
            ) : items.length ? (
              items.slice(0, 8).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  disabled={busy}
                  onClick={() => {
                    setSelected(item.id);
                    if (!item.read) void markRead([item.id]);
                  }}
                  className={
                    "flex w-full items-start gap-3 border-b px-4 py-3 text-start transition-colors hover:bg-muted/70 focus-visible:bg-muted focus-visible:outline-none disabled:opacity-60 " +
                    (!item.read ? "bg-blue-500/[.04]" : "")
                  }
                >
                  <span
                    className={
                      "mt-1 rounded-xl p-2 " +
                      (item.important
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-300"
                        : "bg-blue-500/10 text-blue-600 dark:text-blue-300")
                    }
                  >
                    {item.important ? (
                      <BellRing size={17} />
                    ) : (
                      <MailOpen size={17} />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-xs font-bold leading-6">
                      {item.title[lang]}
                      {!item.read && (
                        <span className="ms-auto h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                      )}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-[11px] leading-6 text-muted-foreground">
                      {item.body[lang]}
                    </span>
                    <time
                      dateTime={item.at}
                      className="mt-1 block text-[10px] text-muted-foreground"
                    >
                      {date(item.at)}
                    </time>
                  </span>
                </button>
              ))
            ) : (
              <div className="px-6 py-10 text-center">
                <Bell className="mx-auto mb-3 text-slate-300" size={30} />
                <p className="text-xs text-muted-foreground">
                  {ready
                    ? s("هنوز اعلانی ندارید.", "You have no notifications yet.")
                    : s("در حال دریافت اعلان‌ها…", "Fetching notifications…")}
                </p>
              </div>
            )}
          </div>
          {message && (
            <p
              role="alert"
              className="px-4 py-2 text-xs leading-6 text-destructive"
            >
              {message}
            </p>
          )}
          <div className="border-t p-2">
            <Button
              variant="ghost"
              className="w-full text-xs text-blue-600 dark:text-blue-300"
              onClick={() => navigate("notifications")}
            >
              {s("مشاهدهٔ همهٔ اعلان‌ها", "View all notifications")}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <DropdownMenu
        dir={fa ? "rtl" : "ltr"}
        open={open === "account"}
        onOpenChange={(value) => change("account", value)}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-10 gap-1.5 rounded-xl px-2 data-[state=open]:bg-blue-500/10"
            aria-label={s("منوی حساب کاربری", "Account menu")}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
              {Array.from(name.trim())[0]?.toUpperCase() || <User size={17} />}
            </span>
            <ChevronDown size={13} className="text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={10}
          collisionPadding={12}
          className="w-[280px] max-w-[calc(100vw-24px)] rounded-2xl p-2 shadow-xl"
        >
          <DropdownMenuLabel className="px-3 py-3 font-normal">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{name}</p>
                {data.profile.email && (
                  <bdi
                    dir="ltr"
                    className="mt-1 block truncate text-[11px] text-muted-foreground"
                  >
                    {data.profile.email}
                  </bdi>
                )}
                {data.profile.kind === "company" && (
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {data.profile.company}
                  </p>
                )}
              </div>
              <span className="shrink-0 rounded-md bg-blue-500/10 px-2 py-1 text-[10px] text-blue-600 dark:text-blue-300">
                {preview
                  ? s("نمونه", "Preview")
                  : data.profile.kind === "company"
                    ? s("حقوقی", "Business")
                    : s("حقیقی", "Personal")}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem
            className="mx-1 mb-2 flex cursor-pointer flex-col items-stretch gap-1 rounded-xl bg-emerald-500/10 p-3 text-emerald-700 focus:bg-emerald-500/15 dark:text-emerald-300"
            onSelect={() => navigate("wallet")}
          >
            <span className="flex items-center gap-2 text-[11px]">
              <Wallet size={15} />
              {s("موجودی کیف پول", "Wallet balance")}
            </span>
            <bdi className="text-sm font-bold">
              {money(accountWallet(data).balance)}
            </bdi>
          </DropdownMenuItem>
          {[
            [
              "dashboard",
              LayoutDashboard,
              "نمای کلی پنل",
              "Panel overview",
              "text-blue-500",
            ],
            [
              "profile",
              Settings,
              "تنظیمات حساب کاربری",
              "Account settings",
              "text-violet-500",
            ],
            [
              "security",
              ShieldCheck,
              "امنیت و ورود دومرحله‌ای",
              "Security & two-step access",
              "text-emerald-500",
            ],
            [
              "tickets",
              Headphones,
              "تیکت‌های پشتیبانی",
              "Support tickets",
              "text-amber-500",
            ],
          ].map(([tab, Icon, f, en, color]) => {
            const I = Icon as typeof User;
            return (
              <DropdownMenuItem
                key={String(tab)}
                onSelect={() => navigate(String(tab))}
                className="cursor-pointer gap-2.5 rounded-lg px-3 py-2.5 text-xs"
              >
                <I size={16} className={String(color)} />
                {s(String(f), String(en))}
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          {message && (
            <p
              role="alert"
              className="px-3 py-2 text-xs leading-6 text-destructive"
            >
              {message}
            </p>
          )}
          <DropdownMenuItem
            disabled={busy}
            onSelect={(event) => {
              event.preventDefault();
              void signOut();
            }}
            className="cursor-pointer gap-2.5 rounded-lg px-3 py-2.5 text-xs text-rose-600 focus:bg-rose-500/10 focus:text-rose-600 dark:text-rose-300"
          >
            <LogOut size={16} />
            {s("خروج از حساب", "Sign out")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
