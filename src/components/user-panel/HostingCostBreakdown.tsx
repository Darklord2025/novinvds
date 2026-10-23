import {
  hostingCostLines,
  type HostingResources,
  type HostingLocation,
} from "@/data/hostingCatalog";
import { usePanelCopy } from "./PanelPrimitives";
export default function HostingCostBreakdown({
  resources,
  location,
  hours = 730,
  months = 1,
}: {
  resources: HostingResources;
  location: HostingLocation;
  hours?: number;
  months?: number;
}) {
  const { s, n, money } = usePanelCopy();
  const lines = hostingCostLines(resources, location, hours);
  const subtotal = lines.reduce((sum, line) => sum + line.total * months, 0),
    tax = Math.round(subtotal * 0.1);
  const labels: Record<string, string> = {
    cpu: s("پردازنده", "CPU"),
    ramGB: s("حافظه", "Memory"),
    diskGB: s("فضای NVMe", "NVMe storage"),
    trafficGB: s("ترافیک", "Transfer"),
    sites: s(
      "وب‌سایت اضافه؛ یک سایت شامل سرویس است",
      "Extra sites; one site included",
    ),
  };
  return (
    <section className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 space-y-4">
      <h3 className="font-bold">
        {s("ریز محاسبه هزینه منابع", "Itemized resource estimate")}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[430px] text-sm">
          <thead>
            <tr className="text-start text-muted-foreground">
              <th className="text-start p-2">{s("منبع", "Resource")}</th>
              <th className="text-end p-2">{s("مقدار", "Quantity")}</th>
              <th className="text-end p-2">
                {s("نرخ واحد در دوره", "Unit rate for term")}
              </th>
              <th className="text-end p-2">{s("مبلغ", "Amount")}</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => (
              <tr key={line.key} className="border-t border-blue-500/10">
                <td className="p-2">{labels[line.key]}</td>
                <td className="p-2 text-end tabular-nums">
                  {n(line.quantity)}
                </td>
                <td className="p-2 text-end tabular-nums whitespace-nowrap">
                  {money(line.unitPrice * months)}
                </td>
                <td className="p-2 text-end tabular-nums whitespace-nowrap">
                  {money(line.total * months)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid sm:grid-cols-3 gap-3 border-t pt-3 text-sm">
        <p>
          {s("جمع منابع", "Resource subtotal")}
          <strong className="block mt-2 tabular-nums">{money(subtotal)}</strong>
        </p>
        <p>
          {s("مالیات ۱۰٪", "10% VAT")}
          <strong className="block mt-2 tabular-nums">{money(tax)}</strong>
        </p>
        <p>
          {s("مجموع با مالیات", "Total including VAT")}
          <strong className="block mt-2 text-blue-600 tabular-nums">
            {money(subtotal + tax)}
          </strong>
        </p>
      </div>
      <p className="text-xs text-muted-foreground leading-6">
        {s(
          "نرخ‌های CPU و RAM متناسب با ساعت تخصیص محاسبه می‌شوند؛ فضا و سایت اضافه بر مبنای ماه و ترافیک بر مبنای مصرف انتخابی است. قیمت نهایی پیش از پرداخت تأیید می‌شود.",
          "CPU and RAM reflect allocation hours; storage and extra sites use monthly rates, while transfer follows the selected usage. Final prices are confirmed before payment.",
        )}
      </p>
    </section>
  );
}
