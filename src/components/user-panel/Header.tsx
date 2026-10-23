import CurrencyControl from "@/components/CurrencyControl";
import HeaderMenus from "./HeaderMenus";
import { usePanelData } from "@/contexts/PanelDataContext";
import React, { useState } from "react";
import { Menu, Clock, Sun, Moon, Search } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LanguageControl from "@/components/LanguageControl";
import { usePanelCopy } from "./PanelPrimitives";
import { useNavigate } from "react-router-dom";
export default function Header({
  activeTab,
  onNavigate,
  onToggleMobileSidebar,
  sessionTimeLeft = "00:00",
}: {
  activeTab?: string;
  onNavigate?: (tab: string) => void;
  onToggleMobileSidebar?: () => void;
  sessionTimeLeft?: string;
}) {
  const { data, preview } = usePanelData();
  const { s, n } = usePanelCopy(),
    { theme, toggleTheme } = useTheme(),
    navigate = useNavigate();
  const [query, setQuery] = useState("");
  const search = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.toLowerCase();
    onNavigate?.(
      /invoice|فاکتور/.test(q)
        ? "invoices"
        : /ticket|تیکت/.test(q)
          ? "tickets"
          : /domain|دامنه/.test(q)
            ? "domains"
            : /wallet|کیف|موجودی/.test(q)
              ? "wallet"
              : "servers",
    );
    setQuery("");
  };
  return (
    <header className="shrink-0 border-b bg-card px-3 md:px-6 py-3 flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label={s("منو", "Menu")}
        onClick={onToggleMobileSidebar}
      >
        <Menu />
      </Button>
      <div className="hidden lg:block text-sm font-semibold">
        {data.profile.name || s("پنل کاربری", "Client area")}
        {data.profile.kind === "company" && (
          <small className="block text-xs text-muted-foreground mt-1">
            {data.profile.company}
          </small>
        )}
      </div>
      <form
        onSubmit={search}
        className="hidden md:flex max-w-sm flex-1 mx-auto relative"
      >
        <Input
          aria-label={s("جستجو", "Search")}
          placeholder={s(
            "جستجوی سرویس، فاکتور، تیکت…",
            "Find services, invoices, tickets…",
          )}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="absolute end-3 top-3"
          aria-label={s("جستجو", "Search")}
        >
          <Search size={16} />
        </button>
      </form>
      <div className="flex flex-wrap justify-end gap-1 items-center ms-auto">
        <span
          className="flex items-center gap-1 text-xs rounded-lg bg-blue-500/10 text-blue-600 p-2 tabular-nums"
          aria-label={s("زمان نشست", "Session time")}
        >
          <Clock size={14} />
          {n(sessionTimeLeft)}
        </span>
        <LanguageControl />
        <CurrencyControl />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={s("تغییر پوسته", "Toggle theme")}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
        <HeaderMenus
          activeTab={activeTab}
          onNavigate={onNavigate}
          onSignOut={async () => {
            if (!preview) {
              const { supabase } = await import(
                "@/integrations/supabase/client"
              );
              const { error } = await supabase.auth.signOut();
              if (error) throw error;
            }
            sessionStorage.removeItem("novin.panel.deadline");
            navigate("/auth", { replace: true });
          }}
        />
      </div>
    </header>
  );
}
