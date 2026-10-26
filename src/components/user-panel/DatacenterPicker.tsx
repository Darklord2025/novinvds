import { datacentersFor, countries } from "@/data/datacenters";
import { usePanelCopy } from "./PanelPrimitives";
export default function DatacenterPicker({
  country,
  value,
  onChange,
}: {
  country: string;
  value: string;
  onChange: (id: string) => void;
}) {
  const { s } = usePanelCopy();
  const c = countries.find((c) => c.id === country);
  return (
    <section className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 space-y-3">
      <label className="text-sm font-semibold block">
        {s("دیتاسنتر انتخابی", "Preferred datacenter")} —{" "}
        {s(c?.fa || "", c?.en || "")}
        <select
          aria-label={s("دیتاسنتر انتخابی", "Preferred datacenter")}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-3 block w-full border bg-card rounded-xl p-3"
        >
          <option value="">
            {s("دیتاسنتر را انتخاب کنید", "Select a datacenter")}
          </option>
          {datacentersFor(country).map((dc) => (
            <option value={dc.id} key={dc.id}>
              {s(dc.fa, dc.en)}
            </option>
          ))}
        </select>
      </label>
      <p className="text-xs text-muted-foreground leading-6">
        {s(
          "محل‌های مرجع برای درخواست هستند؛ قرارداد تأمین، موجودی و امکان ارائه این سرویس هنوز تأیید نشده است.",
          "Reference locations for a request. Supply contracts, stock and availability of this service are unverified.",
        )}
      </p>
    </section>
  );
}
