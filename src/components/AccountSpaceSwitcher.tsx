import { Link } from "react-router-dom";
import { Layers3, Server, ShoppingBag, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
export default function AccountSpaceSwitcher({
  current,
}: {
  current: "services" | "shop";
}) {
  const { language } = useLanguage(),
    s = (fa: string, en: string) => (language === "fa" ? fa : en);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={s("جابه‌جایی بین پنل‌ها", "Switch account space")}
        >
          <Layers3 size={19} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="text-xs">
          {s("یک حساب، دو فضای کاری", "One account, two workspaces")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {[
          {
            id: "services",
            to: "/user-panel",
            title: s("پنل سرویس‌ها", "Services panel"),
            Icon: Server,
          },
          {
            id: "shop",
            to: "/shop/account",
            title: s("پنل فروشگاه", "Shop account"),
            Icon: ShoppingBag,
          },
        ].map(({ id, to, title, Icon }) => (
          <DropdownMenuItem asChild key={id}>
            <Link to={to} className="flex items-center gap-3 py-3">
              <Icon size={19} />
              <span>{title}</span>
              {current === id && (
                <Check className="ms-auto text-emerald-600" size={16} />
              )}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
