import { useState } from "react";
import { Link } from "react-router-dom";
import { Globe, ArrowRightLeft, LinkIcon } from "lucide-react";
import { usePanelCopy } from "../user-panel/PanelPrimitives";
import { validDomain, canonicalDomain } from "@/lib/panel-model";
import { Input } from "@/components/ui/input";
export default function PublicDomainOrder({initialMode='register',initialTld='com'}:{initialMode?:string;initialTld?:string}) {
  const { s } = usePanelCopy();
  const [mode, setMode] = useState(initialMode),
    [domain, setDomain] = useState("");
  const next =
    "/user-panel?tab=order-domain&domain=" +
    encodeURIComponent(
      validDomain(domain)
        ? canonicalDomain(domain)
        : domain.trim().toLowerCase(),
    ) +
    "&mode=" +
    mode;
  return (
    <div className="rounded-2xl bg-card text-foreground border shadow-lg p-5 space-y-5 text-start">
      <div className="grid sm:grid-cols-3 gap-3">
        {[
          ["register", "ثبت دامنه جدید", "Register a domain", Globe],
          ["transfer", "انتقال دامنه", "Transfer a domain", ArrowRightLeft],
          [
            "existing",
            "دامنه خودم را دارم",
            "Use my existing domain",
            LinkIcon,
          ],
        ].map(([id, fa, en, Icon]) => {
          const I = Icon as typeof Globe;
          return (
            <button
              type="button"
              key={String(id)}
              onClick={() => setMode(String(id))}
              className={
                "rounded-xl p-4 border text-start " +
                (mode === id ? "bg-blue-500/10 border-blue-500" : "bg-muted/30")
              }
            >
              <I className="text-blue-500 mb-3" />
              <span className="text-sm font-bold">
                {s(String(fa), String(en))}
              </span>
            </button>
          );
        })}
      </div>
      <label className="block text-sm">
        {s("نام کامل دامنه", "Full domain name")}
        <Input
          dir="ltr"
          placeholder={"example."+initialTld}
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="mt-2"
        />
      </label>
      <p className="text-xs text-muted-foreground leading-6">
        {s(
          "موجودی و قیمت نهایی از ثبت‌کننده استعلام می‌شود. برای ادامه و نگهداری امن سفارش وارد پنل شوید.",
          "Final availability and pricing are checked with the registrar. Sign in to continue and keep the order in your account.",
        )}
      </p>
      {validDomain(domain) ? (
        <Link
          className="block rounded-xl bg-blue-600 text-white py-3 px-4 text-center font-bold"
          to={"/auth?next=" + encodeURIComponent(next)}
        >
          {s("ادامه در پنل کاربری", "Continue in the client area")}
        </Link>
      ) : (
        <span className="block text-xs text-muted-foreground">
          {s(
            "یک دامنه کامل مانند example.com وارد کنید.",
            "Enter a full domain such as example.com.",
          )}
        </span>
      )}
    </div>
  );
}
