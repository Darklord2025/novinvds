import { addonsFor, addonCategories, toggleAddon } from "@/data/serviceAddons";
import type { ServiceKind } from "@/data/userServices";
import { usePanelCopy } from "./PanelPrimitives";
export default function AddonPicker({
  kind,
  value,
  onChange,
}: {
  kind: ServiceKind;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const { s, money } = usePanelCopy();
  const options = addonsFor(kind);
  return (
    <div className="space-y-5">
      <p className="text-xs text-muted-foreground">
        {s(
          "ماژول‌ها متناسب با نوع سرویس دسته‌بندی شده‌اند. قیمت‌ها مرجع هستند؛ موجودی، لایسنس و سازگاری باید در استعلام نهایی تایید شود.",
          "Add-ons are grouped for this service. Prices are reference estimates; stock, licensing and compatibility require a final quote.",
        )}
      </p>
      {Object.entries(addonCategories).map(([category, labels]) => {
        const rows = options.filter((v) => v.category === category);
        return rows.length ? (
          <fieldset key={category} className="space-y-3">
            <legend className="font-bold text-sm mb-3">
              {s(labels[0], labels[1])}
            </legend>
            <div className="grid sm:grid-cols-2 gap-3">
              {rows.map((a) => (
                <label
                  key={a.id}
                  className={
                    "flex items-start gap-3 rounded-xl border p-4 cursor-pointer " +
                    (value.includes(a.id)
                      ? "border-blue-500 bg-blue-500/5"
                      : "bg-card")
                  }
                >
                  <input
                    type="checkbox"
                    checked={value.includes(a.id)}
                    onChange={() => onChange(toggleAddon(value, a.id))}
                  />
                  <span className="flex-1 text-sm">
                    <strong className="block">{a.name}</strong>
                    <small className="block mt-2 text-muted-foreground">
                      {money(a.price)} /{" "}
                      {a.period === "یکبار"
                        ? s("نصب و راه‌اندازی یک‌باره", "one-time setup")
                        : s("ماهانه", "monthly")}
                    </small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null;
      })}
    </div>
  );
}
