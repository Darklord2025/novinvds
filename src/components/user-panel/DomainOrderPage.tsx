import BackButton from "./BackButton";
import DomainPricing from "@/components/DomainPricing";
import React, { useState } from "react";
import {
  Search,
  Globe,
  ArrowRight,
  ShoppingCart,
  ArrowRightLeft,
  PlusCircle,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { usePanelData } from "@/contexts/PanelDataContext";
import { validDomain, canonicalDomain } from "@/lib/panel-model";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PanelHeading, usePanelCopy } from "./PanelPrimitives";
export default function DomainOrderPage({
  onBack,
  initialMode = "register",
  initialView = "search",
  onOwnedDomains,
}: {
  onBack?: () => void;
  initialMode?: string;
  initialView?: string;
  onOwnedDomains?: () => void;
}) {
  const { s, n, money } = usePanelCopy();
  const { action } = usePanelData();
  const { addItem } = useCart();
  const [selectedTld, setSelectedTld] = useState("com");
  const [view, setView] = useState(initialView);
  const [mode, setMode] = useState(() => {
      const m = new URLSearchParams(location.search).get("mode");
      return ["register", "transfer", "existing"].includes(m || "")
        ? m!
        : initialMode;
    }),
    [domain, setDomain] = useState(
      () => new URLSearchParams(location.search).get("domain") || "",
    ),
    [years, setYears] = useState(1),
    [epp, setEpp] = useState(""),
    [ns, setNs] = useState("default"),
    [ns1, setNs1] = useState(""),
    [ns2, setNs2] = useState(""),
    [quote, setQuote] = useState<any>(null),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  async function check(e: React.FormEvent) {
    e.preventDefault();
    if (!validDomain(domain)) {
      setError(
        s(
          "نام کامل دامنه را وارد کنید؛ مانند example.com",
          "Enter a full domain name, e.g. example.com",
        ),
      );
      return;
    }
    setBusy(true);
    setError("");
    try {
      setQuote(
        await action("domain-check", {
          domain: validDomain(domain)
            ? canonicalDomain(domain)
            : domain.trim().toLowerCase(),
          mode,
          years,
        }),
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const isIr = domain.trim().toLowerCase().endsWith(".ir");
  const own = mode === "existing";
  if (view === "pricing")
    return (
      <div className="space-y-6">
        <PanelHeading
          title={s(
            "تعرفه ثبت، انتقال و تمدید دامنه",
            "Domain registration, transfer and renewal pricing",
          )}
          action={
            onBack && <BackButton onClick={onBack}>{s("بازگشت", "Back")}</BackButton>
          }
        />
        <DomainPricing
          panelMode
          onRenew={onOwnedDomains}
          onSelect={(name, operation) => {
            setMode(operation);
            setSelectedTld(name);
            setDomain("");
            setYears(1);
            setQuote(null);
            setView("search");
          }}
        />
      </div>
    );
  function add() {
    if (!quote && !own) return;
    addItem({
      id: "domain-" + domain + "-" + mode,
      name: domain,
      type: "domain",
      price: own ? 0 : quote.priceToman,
      period: years + " " + s("ساله", "year(s)"),
      specs: [s("دامنه", "Domain"), mode],
      meta: {
        domain,
        mode,
        years,
        nameservers: ns === "custom" ? [ns1, ns2] : undefined,
        quoteId: quote?.id,
      },
    });
    setEpp("");
  }
  return (
    <div className="space-y-6">
      <PanelHeading
        title={s("سفارش و مدیریت دامنه", "Domain registration & transfer")}
        subtitle={s(
          "ثبت دامنه جدید، انتقال یا استفاده از دامنه‌ای که دارید",
          "Register a domain, transfer one, or use your existing domain",
        )}
        action={
          onBack && (
            <BackButton variant="outline" onClick={onBack}>

              {s("بازگشت", "Back")}
            </BackButton>
          )
        }
      />
      <div className="grid sm:grid-cols-3 gap-3">
        {[
          ["register", Globe, s("ثبت دامنه جدید", "Register a new domain")],
          ["transfer", ArrowRightLeft, s("انتقال دامنه", "Transfer a domain")],
          [
            "existing",
            PlusCircle,
            s("دامنه خودم را دارم", "Use my existing domain"),
          ],
        ].map(([v, Icon, label]) => {
          const I = Icon as typeof Globe;
          return (
            <button
              key={String(v)}
              className={
                "rounded-2xl border p-5 text-start " +
                (mode === v
                  ? "border-blue-500 bg-blue-500/5 ring-1 ring-blue-500"
                  : "bg-card")
              }
              onClick={() => {
                setMode(String(v));
                setQuote(null);
              }}
            >
              <I className="text-blue-500 mb-3" />
              <strong className="text-sm">{String(label)}</strong>
            </button>
          );
        })}
      </div>
      <Button variant="outline" onClick={() => setView("pricing")}>
        {s("لیست پسوندها و تعرفه‌ها", "Extension list and prices")}
      </Button>
      <form
        className="rounded-2xl border bg-card p-5 md:p-7 space-y-5"
        onSubmit={check}
      >
        <Label>
          {s("نام کامل دامنه", "Domain name")}
          <div className="flex gap-2 mt-2">
            <Input
              dir="ltr"
              placeholder={"example." + selectedTld}
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                setYears(1);
                setQuote(null);
              }}
              required
            />
            <Button disabled={busy}>
              <Search size={17} />
              {s("بررسی", "Check")}
            </Button>
          </div>
        </Label>
        {!own && (
          <Label className="block">
            {s("مدت ثبت یا انتقال", "Registration / transfer term")}
            <select
              value={years}
              onChange={(e) => {
                setYears(Number(e.target.value));
                setQuote(null);
              }}
              className="block rounded-lg border p-3 bg-card mt-2 w-full"
            >
              {(isIr ? [1, 5] : [1]).map((v) => (
                <option key={v} value={v}>
                  {n(v)} {s("سال", "year(s)")}
                </option>
              ))}
            </select>
          </Label>
        )}
        {mode === "transfer" && (
          <p className="rounded-xl bg-amber-500/10 p-4 text-sm">
            {s(
              "کد EPP را در مرحله امن ثبت‌کننده وارد خواهید کرد. در این مرحله کد انتقال دریافت یا ذخیره نمی‌شود.",
              "Enter your EPP code at the registrar’s secure final step. This form does not collect or store transfer secrets.",
            )}
          </p>
        )}
        <Label>
          {s("نیم‌سرورها", "Nameservers")}
          <select
            className="block w-full p-3 border rounded-lg bg-card mt-2"
            value={ns}
            onChange={(e) => setNs(e.target.value)}
          >
            <option value="default">
              {s("نیم‌سرورهای سرویس میزبانی", "Hosting service nameservers")}
            </option>
            <option value="custom">
              {s("نیم‌سرورهای دلخواه", "Custom nameservers")}
            </option>
          </select>
        </Label>
        {ns === "custom" && (
          <div className="grid sm:grid-cols-2 gap-3">
            <Input
              dir="ltr"
              placeholder="ns1.example.com"
              value={ns1}
              onChange={(e) => setNs1(e.target.value)}
            />
            <Input
              dir="ltr"
              placeholder="ns2.example.com"
              value={ns2}
              onChange={(e) => setNs2(e.target.value)}
            />
          </div>
        )}
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
        {quote && (
          <div className="rounded-xl bg-blue-500/5 border border-blue-500/20 p-4">
            <strong>
              {quote.preview
                ? s(
                    "نتیجه نمونه — موجودی واقعی تایید نشده",
                    "Sample result — live availability unverified",
                  )
                : quote.available
                  ? s("قابل ثبت", "Available")
                  : s("در دسترس نیست", "Not available")}
            </strong>
            <p className="mt-2">{money(quote.priceToman || 0)}</p>
          </div>
        )}
        <Button
          type="button"
          onClick={add}
          disabled={
            !validDomain(domain) ||
            (!own && (!quote || !quote.available)) ||
            (ns === "custom" && (!ns1 || !ns2))
          }
          className="w-full rounded-xl"
        >
          <ShoppingCart size={17} />
          {s("ادامه سفارش و افزودن به سبد", "Continue and add to cart")}
        </Button>
      </form>
    </div>
  );
}
