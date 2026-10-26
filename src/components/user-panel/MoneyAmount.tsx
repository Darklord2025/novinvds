import { displayUsdNumber } from "@/lib/display-currency";
import { useDisplayCurrency } from "@/contexts/DisplayCurrencyContext";
import { inToman, type Currency } from "@/lib/billing";
import { usePanelCopy } from "./PanelPrimitives";
export default function MoneyAmount({
  value,
  currency = "TOMAN",
  stacked = false,
}: {
  value: number;
  currency?: Currency;
  stacked?: boolean;
}) {
  const { n, s } = usePanelCopy();
  const display = useDisplayCurrency(),
    amount = display.value(inToman(value, currency));
  return (
    <span
      className={
        stacked
          ? "inline-flex flex-col gap-1 max-w-full"
          : "inline-flex items-baseline gap-1.5"
      }
    >
      <bdi dir="ltr" className="tabular-nums whitespace-nowrap font-inherit">
        {amount === null
          ? "—"
          : (display.currency === "USD" ? "≈ " : "") +
            n(
              display.currency === "USD"
                ? displayUsdNumber(amount)
                : amount.toLocaleString("en-US", { maximumFractionDigits: 1 }),
            )}
      </bdi>
      <small className="font-normal text-xs whitespace-nowrap">
        {display.currency === "USD" ? s("دلار", "USD") : s("تومان", "Toman")}
      </small>
    </span>
  );
}
