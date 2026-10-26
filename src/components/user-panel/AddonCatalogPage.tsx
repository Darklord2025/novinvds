import { useServiceCatalog } from "@/contexts/PanelDataContext";
import type { ServiceKind } from "@/data/userServices";
import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";

import { addonsFor, addonCategories, toggleAddon } from "@/data/serviceAddons";
import { categoryLabel } from "@/lib/panel-model";
import { Button } from "@/components/ui/button";
import { PanelHeading, usePanelCopy } from "./PanelPrimitives";
export default function AddonCatalogPage() {
  const { userServices } = useServiceCatalog();
  const { fa, s, money } = usePanelCopy();
  const [kind, setKind] = useState<ServiceKind>("vps"),
    [serviceId, setServiceId] = useState(""),
    [selected, setSelected] = useState<string[]>([]);
  const { addItem } = useCart();
  const items = addonsFor(kind);
  return (
    <div className="space-y-6">
      <PanelHeading
        title={s("ماژول‌های اضافی سرویس", "Service add-ons")}
        subtitle={s(
          "ماژول‌های سازگار با نوع سرویس خود را انتخاب کنید.",
          "Choose add-ons for your service type.",
        )}
      />
      <p className="text-xs text-muted-foreground">
        {s(
          "قیمت و ماژول‌ها مرجع هستند؛ لایسنس، موجودی و سازگاری در استعلام نهایی تایید می‌شود.",
          "Add-ons and prices are reference estimates. Licensing, stock and compatibility require a final quote.",
        )}
      </p>
      <div className="flex flex-wrap gap-2">
        {(
          [
            "vps",
            "dedicated",
            "hosting",
            "cloud",
            "hourly",
            "multilocation",
          ] as ServiceKind[]
        ).map((k) => (
          <Button
            key={k}
            variant={kind === k ? "default" : "outline"}
            onClick={() => {
              setKind(k);
              setSelected([]);
              setServiceId("");
            }}
          >
            {categoryLabel(k, fa)}
          </Button>
        ))}
      </div>
      <select
        className="rounded-xl border bg-card p-3 w-full"
        aria-label={s("سرویس مقصد", "Target service")}
        value={serviceId}
        onChange={(e) => setServiceId(e.target.value)}
      >
        <option value="">
          {s("سرویس مقصد را انتخاب کنید", "Select the target service")}
        </option>
        {userServices
          .filter((v) => v.kind === kind)
          .map((v) => (
            <option key={v.id} value={v.id}>
              {v.id} · {v.name}
            </option>
          ))}
      </select>
      {Object.entries(addonCategories).map(([category, label]) => {
        const options = items.filter((a) => a.category === category);
        return options.length ? (
          <section
            key={category}
            className="rounded-2xl border bg-card p-5 space-y-4"
          >
            <h2 className="font-bold">{label[fa ? 0 : 1]}</h2>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {options.map((a) => (
                <label
                  key={a.id}
                  className={
                    "rounded-xl border p-4 cursor-pointer " +
                    (selected.includes(a.id)
                      ? "border-blue-500 bg-blue-500/5"
                      : "")
                  }
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(a.id)}
                    onChange={() => setSelected((p) => toggleAddon(p, a.id))}
                    className="me-2"
                  />
                  <strong className="text-sm">{a.name}</strong>
                  <p className="text-sm text-muted-foreground mt-2">
                    {money(a.price)} /{" "}
                    {a.period === "یکبار"
                      ? s("نصب و راه‌اندازی یک‌باره", "one-time setup")
                      : s("ماهانه", "month")}
                  </p>
                </label>
              ))}
            </div>
          </section>
        ) : null;
      })}
      <Button
        disabled={!serviceId || !selected.length}
        onClick={() =>
          selected.forEach((id) => {
            const a = items.find((v) => v.id === id)!;
            addItem({
              id: "addon-" + serviceId + "-" + id,
              name: a.name,
              type: "addon",
              price: a.price,
              period:
                a.period === "یکبار"
                  ? fa
                    ? "یکبار"
                    : "OneTime"
                  : fa
                    ? "ماهانه"
                    : "Monthly",
              specs: [serviceId, categoryLabel(kind, fa)],
              meta: {
                serviceId,
                addonId: id,
                requiresQuote: true,
                pricingStatus: "proposal",
              },
            });
          })
        }
      >
        {s("افزودن انتخاب‌ها به سبد خرید", "Add selected add-ons to cart")}
      </Button>
    </div>
  );
}
