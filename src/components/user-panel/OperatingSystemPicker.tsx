import {
  osCatalog,
  osEditions,
  emptyOs,
  validOs,
  osLabel,
  panelsFor,
  type OsSelection,
} from "@/data/operatingSystems";
import { usePanelCopy } from "./PanelPrimitives";
import { Monitor } from "lucide-react";
export default function OperatingSystemPicker({
  value,
  onChange,
  panel = "",
  onPanelChange,
}: {
  value: OsSelection;
  onChange: (s: OsSelection) => void;
  panel?: string;
  onPanelChange?: (id: string) => void;
}) {
  const { s, n, money } = usePanelCopy();
  const product = osCatalog.find((p) => p.id === value.product);
  const editions = product ? osEditions(product, value.version) : [];
  const change = (v: OsSelection) => {
    onChange(v);
    onPanelChange?.("");
  };
  const select = (
    label: string,
    current: string,
    rows: { id: string; label: string }[],
    cb: (v: string) => void,
    disabled = false,
  ) => (
    <label className="block space-y-2 text-sm">
      {label}
      <select
        aria-label={label}
        value={current}
        disabled={disabled}
        className="block w-full border p-3 rounded-xl bg-background disabled:opacity-50"
        onChange={(e) => cb(e.target.value)}
      >
        <option value="">{s("انتخاب کنید", "Select")}</option>
        {rows.map((r) => (
          <option key={r.id} value={r.id}>
            {n(r.label)}
          </option>
        ))}
      </select>
    </label>
  );
  return (
    <section className="space-y-4 rounded-2xl border bg-card p-5">
      <h3 className="flex gap-2 font-bold">
        <Monitor className="text-blue-500" />
        {s(
          "سیستم‌عامل و نرم‌افزار مدیریت",
          "Operating system and management software",
        )}
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {select(
          s("خانواده سیستم‌عامل", "OS family"),
          value.family,
          [
            { id: "linux", label: s("لینوکس", "Linux") },
            { id: "windows", label: s("ویندوز", "Windows") },
            { id: "appliance", label: s("تجهیزات شبکه", "Network appliances") },
            { id: "hypervisor", label: s("مجازی‌ساز", "Hypervisors") },
          ],
          (family) => change({ ...emptyOs, family }),
        )}
        {select(
          s("توزیع یا محصول", "Distribution or product"),
          value.product,
          osCatalog
            .filter((p) => p.family === value.family)
            .map((p) => ({
              id: p.id,
              label:
                p.id === "windows-client"
                  ? s("ویندوز کلاینت — ۱۰ و ۱۱", "Windows client — 10 and 11")
                  : p.name,
            })),
          (product) => change({ ...value, product, version: "", edition: "" }),
          !value.family,
        )}
        {select(
          s("نسخه سیستم‌عامل", "OS version"),
          value.version,
          (product?.versions || []).map((v) => ({
            id: v,
            label:
              v +
              (product?.legacy?.includes(v)
                ? s(" — قدیمی؛ بررسی پشتیبانی", " — legacy; review support")
                : ""),
          })),
          (version) => change({ ...value, version, edition: "" }),
          !product,
        )}
        {!!editions.length &&
          select(
            s("ویرایش", "Edition"),
            value.edition,
            editions.map((v) => ({ id: v, label: v })),
            (edition) => change({ ...value, edition }),
          )}
        {onPanelChange &&
          select(
            s("کنترل‌پنل اختیاری", "Optional control panel"),
            panel,
            [
              { id: "none", label: s("بدون کنترل‌پنل", "No control panel") },
              ...panelsFor(value).map((p) => ({
                id: p.id,
                label:
                  p.name +
                  " — " +
                  money(p.price) +
                  (p.period === "once"
                    ? s(" / یکبار", " / once")
                    : s(" / ماهانه", " / month")) +
                  (p.license === "free"
                    ? p.id === "aapanel"
                      ? s(
                          " — نصب و راه‌اندازی با هزینه",
                          " — paid setup service",
                        )
                      : s(" — نسخه پایه رایگان", " — free base edition")
                    : s(" — لایسنس تجاری", " — commercial license")),
              })),
            ],
            (v) => onPanelChange(v === "none" ? "" : v),
            !validOs(value),
          )}
      </div>
      <p className="text-xs leading-6 text-muted-foreground">
        {s(
          "فهرست نسخه‌ها برای درخواست نصب است؛ وجود ایمیج، معماری، درایور، لایسنس و سازگاری با دستگاه باید تایید شود. نسخه‌های قدیمی خودکار نصب نمی‌شوند. نصب و پشتیبانی کنترل‌پنل ممکن است هزینه جدا داشته باشد.",
          "These releases are installation requests. Image availability, architecture, drivers, licensing and device compatibility require confirmation. Legacy releases are not automatically installed. Panel installation and support may cost extra.",
        )}
      </p>
      {product && (
        <a
          href={product.source}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-primary underline"
        >
          {s("مرجع رسمی نسخه‌ها", "Official release reference")}
        </a>
      )}
      {validOs(value) && (
        <p className="rounded-xl bg-blue-500/5 p-3 text-sm" dir="ltr">
          {osLabel(value)}
        </p>
      )}
    </section>
  );
}
