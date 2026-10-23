import { useState } from "react";
import {
  customVpsEstimate,
  customVpsRates,
  locations,
  billingPeriods,
} from "@/data/vpsCatalog";
import { useCart } from "@/contexts/CartContext";
import { normalizeDigits } from "@/lib/localized-number";
import { englishText } from "@/components/LegacyLocale";
import {
  emptyOs,
  validOs,
  osLabel,
  type OsSelection,
} from "@/data/operatingSystems";
import OperatingSystemPicker from "./OperatingSystemPicker";
import { usePanelCopy } from "./PanelPrimitives";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function VpsCustomCalculator() {
  const { s, n, money, fa } = usePanelCopy(),
    { addItem } = useCart();
  const [resources, setResources] = useState({
      cpu: 2,
      ram: 4,
      disk: 50,
      trafficGB: 1000,
    }),
    [locationId, setLocationId] = useState(""),
    [period, setPeriod] = useState("monthly"),
    [os, setOs] = useState<OsSelection>({ ...emptyOs }),
    [panel, setPanel] = useState(""),
    [message, setMessage] = useState("");
  const dc = locations.find((l) => l.id === locationId),
    term = billingPeriods.find((p) => p.id === period)!;
  let monthly: number | null = null;
  try {
    monthly = customVpsEstimate(resources);
  } catch {}
  const subtotal =
      monthly === null ? null : Math.round(monthly * term.multiplier),
    tax = subtotal === null ? 0 : Math.round(subtotal * 0.1);
  const fields = [
    ["cpu", s("پردازنده مجازی — vCPU", "Virtual CPU — vCPU"), 1, 32],
    ["ram", s("حافظه — GB", "Memory — GB"), 1, 128],
    ["disk", s("فضای NVMe — GB", "NVMe storage — GB"), 20, 2000],
    ["trafficGB", s("ترافیک — GB", "Transfer — GB"), 1, 10000],
  ] as const;
  const lines = [
    {
      name: s("پردازنده", "CPU"),
      quantity: resources.cpu,
      rate: customVpsRates.cpu,
    },
    {
      name: s("حافظه", "Memory"),
      quantity: resources.ram,
      rate: customVpsRates.ram,
    },
    {
      name: s("فضای NVMe", "NVMe storage"),
      quantity: resources.disk,
      rate: customVpsRates.disk,
    },
    {
      name: s(
        "ترافیک مازاد؛ ۱۰۰۰ گیگابایت شامل سرویس",
        "Extra transfer; 1000 GB included",
      ),
      quantity: Math.max(0, resources.trafficGB - 1000),
      rate: customVpsRates.extraTrafficGB,
    },
  ];
  return (
    <div className="space-y-5">
      <p className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm leading-7">
        {s(
          "برآورد منابع سفارشی است. دیتاسنترها از همان فهرست سفارش سرور مجازی هستند؛ ظرفیت و نرخ قطعی پیش از پرداخت بررسی می‌شود.",
          "Custom resource estimate. Datacenters use the VPS order catalog; capacity and final rates are checked before payment.",
        )}
      </p>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(260px,.7fr)] gap-5 items-start">
        <section className="rounded-2xl border bg-card p-5 space-y-5">
          <h2 className="font-bold">{s("منابع دلخواه", "Custom resources")}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {fields.map(([key, label, min, max]) => (
              <label key={key} className="text-sm space-y-3 block">
                {label}
                <Input
                  aria-label={label}
                  inputMode="numeric"
                  value={n(resources[key])}
                  onChange={(e) =>
                    setResources({
                      ...resources,
                      [key]: Number(
                        normalizeDigits(e.target.value).replace(/,/g, ""),
                      ),
                    })
                  }
                />
                <input
                  type="range"
                  aria-label={label + " " + s("لغزنده", "slider")}
                  min={min}
                  max={max}
                  step={1}
                  value={resources[key]}
                  className="w-full accent-blue-600"
                  onChange={(e) =>
                    setResources({
                      ...resources,
                      [key]: Number(e.target.value),
                    })
                  }
                />
                <small className="block text-muted-foreground">
                  {n(min)}–{n(max)}
                </small>
              </label>
            ))}
          </div>
          <label className="block text-sm space-y-2">
            {s("دیتاسنتر سرور مجازی", "VPS datacenter")}
            <select
              aria-label={s("دیتاسنتر سرور مجازی", "VPS datacenter")}
              className="w-full block border bg-background rounded-xl p-3"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
            >
              <option value="">
                {s("دیتاسنتر را انتخاب کنید", "Select a datacenter")}
              </option>
              {locations.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.flag} {fa ? l.name : englishText(l.name)} —{" "}
                  {fa ? l.datacenter : englishText(l.datacenter)}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm space-y-2">
            {s("دوره پرداخت", "Billing term")}
            <select
              aria-label={s("دوره پرداخت", "Billing term")}
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full block border bg-background rounded-xl p-3"
            >
              {billingPeriods.map((p) => (
                <option key={p.id} value={p.id}>
                  {fa ? p.name : englishText(p.name)}
                </option>
              ))}
            </select>
          </label>
        </section>
        <aside className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 space-y-4">
          <h2 className="font-bold">{s("محاسبه هزینه", "Cost estimate")}</h2>
          {lines.map((l, i) => (
            <div key={i} className="text-sm border-b pb-3 space-y-2">
              <p>{l.name}</p>
              <div className="flex justify-between gap-3 tabular-nums">
                <small>
                  {n(l.quantity)} × {money(l.rate)}
                </small>
                <strong className="whitespace-nowrap">
                  {money(l.quantity * l.rate)}
                </strong>
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground">
            {s(
              "نرخ‌های بالا ماهانه و پیشنهادی‌اند. تخفیف دوره روی جمع منابع اعمال می‌شود. لایسنس تجاری در استعلام نهایی محاسبه می‌شود.",
              "Rates above are monthly proposals. Term discounts apply to the resource subtotal; commercial licensing is quoted separately.",
            )}
          </p>
          {subtotal !== null ? (
            <>
              <p className="flex flex-wrap justify-between gap-2 text-sm">
                {s("جمع دوره انتخابی", "Selected term subtotal")}
                <strong className="tabular-nums">{money(subtotal)}</strong>
              </p>
              <p className="flex flex-wrap justify-between gap-2 text-sm">
                {s("مالیات ۱۰٪", "10% VAT")}
                <strong>{money(tax)}</strong>
              </p>
              <p className="font-bold text-blue-600">
                {s("مجموع", "Total")}: {money(subtotal + tax)}
              </p>
            </>
          ) : (
            <p role="alert">
              {s(
                "منابع را در محدوده مجاز وارد کنید.",
                "Enter resources within the allowed range.",
              )}
            </p>
          )}
        </aside>
      </div>
      <OperatingSystemPicker
        value={os}
        onChange={setOs}
        panel={panel}
        onPanelChange={setPanel}
      />
      <Button
        disabled={subtotal === null || !dc || !validOs(os)}
        onClick={() => {
          if (subtotal === null || !dc || !validOs(os)) return;
          addItem({
            id: "vps-flex-" + Date.now(),
            name: s("سرور مجازی سفارشی", "Custom VPS"),
            type: "vps",
            price: subtotal,
            period: fa ? term.name : englishText(term.name),
            specs: [
              `${resources.cpu} vCPU · ${resources.ram} GB RAM · ${resources.disk} GB NVMe`,
              dc.datacenter,
              osLabel(os),
            ],
            meta: {
              resources,
              location: dc.id,
              osSelection: os,
              controlPanel: panel,
              billingPeriod: period,
              requiresQuote: true,
              pricingStatus: "proposal",
              inventoryVerified: false,
            },
          });
          setMessage(
            s("پیش‌نویس سفارش به سبد اضافه شد.", "Order draft added to cart."),
          );
        }}
      >
        {s("افزودن پیش‌نویس به سبد", "Add draft to cart")}
      </Button>
      <p role="status" className="text-sm">
        {message}
      </p>
    </div>
  );
}
