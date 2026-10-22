import ServiceMenuIcon from "./ServiceMenuIcon";
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  PlusCircle,
  CreditCard,
  MessageSquare,
  BookOpen,
  FileText,
  HardDrive,
  ShoppingCart,
  Repeat2,
  Users,
  Server,
  Globe,
  Wallet,
  History,
  Settings,
  Download,
  Bell,
  Megaphone,
  Database,
  Calculator,
  Mail,
  Clock,
  Circle,
  ChevronDown,
  Home,
} from "lucide-react";
const iconMap = {
  home: LayoutDashboard,
  "plus-circle": PlusCircle,
  "credit-card": CreditCard,
  "message-square": MessageSquare,
  "book-open": BookOpen,
  "file-text": FileText,
  "hard-drive": HardDrive,
  "shopping-cart": ShoppingCart,
  "layout-dashboard": LayoutDashboard,
  repeat: Repeat2,
  users: Users,
  server: Server,
  globe: Globe,
  wallet: Wallet,
  history: History,
  settings: Settings,
  download: Download,
  bell: Bell,
  megaphone: Megaphone,
  database: Database,
  calculator: Calculator,
  mail: Mail,
  clock: Clock,
};
import { cn } from "@/lib/utils";
import { SidebarProps, SidebarItem } from "./interfaces";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import BrandLogo from "@/components/BrandLogo";
import { usePanelCopy } from "./PanelPrimitives";
import { translateLegacy } from "@/lib/legacy-i18n";
interface Props extends SidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}
export default function Sidebar({
  items = [],
  activeTab,
  onItemClick,
  setActiveTab,
  isMobile = false,
  isOpen,
  onClose,
  className,
}: Props) {
  const { fa, s } = usePanelCopy();
  const activeParents=(nodes:SidebarItem[],parents:string[]=[]):string[]=>nodes.flatMap(node=>node.id===activeTab?parents:node.submenu?activeParents(node.submenu,[...parents,node.id]):[]);
  const [expanded, setExpanded] = useState<string[]>(()=>activeParents(items));
  useEffect(()=>{setExpanded(v=>Array.from(new Set([...v,...activeParents(items)])));},[activeTab,items]);
  function row(item: SidebarItem, depth = 0) {
    const Icon = iconMap[item.icon as keyof typeof iconMap] || Circle;
    const open = expanded.includes(item.id);
    const select = () => {
      if(item.submenu){setExpanded(v=>open?v.filter(id=>id!==item.id):[...v,item.id]);return;}
      (onItemClick || setActiveTab)?.(item.id);
      onClose?.();
    };
    return (
      <div key={item.id}>
        <div
          className={cn(
            "flex items-center rounded-xl my-1",
            activeTab === item.id
              ? "bg-blue-600 text-white shadow-sm"
              : "hover:bg-blue-500/10",
          )}
        >
          <button
            onClick={select}
            className="flex flex-1 min-w-0 items-center gap-3 px-3 py-2.5 text-start text-sm"
            style={{ paddingInlineStart: 12 + depth * 10 }}
          >
            <ServiceMenuIcon id={item.id} icon={Icon} size={depth?16:18}/>
            <span>
              {fa ? item.label : item.en || translateLegacy(item.label)}
            </span>
          </button>
          {item.submenu && (
            <button
              aria-label={s("باز کردن زیرمنو", "Expand submenu")}
              aria-expanded={open}
              className="p-2 shrink-0"
              title={s("باز و بسته کردن زیرمنو","Toggle submenu")}
              onClick={() =>
                setExpanded((v) =>
                  open ? v.filter((id) => id !== item.id) : [...v, item.id],
                )
              }
            >
              <ChevronDown size={14} className={open ? "rotate-180" : ""} />
            </button>
          )}
        </div>
        {item.submenu && open && (
          <div className="sidebar-submenu ms-2 ps-1">
            {item.submenu.map((i) => row(i, depth + 1))}
          </div>
        )}
      </div>
    );
  }
  const content = (
    <>
      <div className="p-5 border-b shrink-0">
        <Link to="/">
          <BrandLogo />
        </Link>
        <p className="text-xs text-muted-foreground mt-3">
          {s("خدمات ابری، با کنترل شما", "Cloud services, in your control")}
        </p>
      </div>
      <nav
        aria-label={s("منوی پنل", "Panel navigation")}
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3"
      >
        {items.map((i) => row(i))}
      </nav>
      <Link
        to="/"
        className="p-4 border-t text-sm flex items-center gap-2 shrink-0"
      >
        <Home size={16} />
        {s("بازگشت به سایت", "Back to website")}
      </Link>
    </>
  );
  if (isMobile)
    return (
      <Sheet open={isOpen} onOpenChange={(v) => !v && onClose?.()}>
        <SheetContent
          side={fa ? "right" : "left"}
          className="w-72 p-0 flex flex-col h-dvh"
          dir={fa ? "rtl" : "ltr"}
        >
          <SheetTitle className="sr-only">{s("منو", "Menu")}</SheetTitle>
          {content}
        </SheetContent>
      </Sheet>
    );
  return (
    <aside
      className={cn(
        "w-64 h-full min-h-0 shrink-0 overflow-hidden bg-card border-e hidden md:flex md:flex-col",
        className,
      )}
    >
      {content}
    </aside>
  );
}
