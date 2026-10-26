import { useDisplayCurrency } from "@/contexts/DisplayCurrencyContext";
import { useLanguage } from "@/contexts/LanguageContext";
export default function CurrencyControl({
  detailed = false,
}: {
  detailed?: boolean;
}) {
  const { currency, setCurrency, rate, asOf } = useDisplayCurrency(),
    { language } = useLanguage();
  const fa = language === "fa";
  return (
    <div
      className={
        detailed
          ? "rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 space-y-3"
          : "shrink-0"
      }
    >
      <label
        className={
          detailed
            ? "flex flex-wrap gap-3 items-center justify-between"
            : "block"
        }
      >
        {detailed && (
          <span className="text-sm font-semibold">
            {fa ? "واحد نمایش قیمت‌ها" : "Price display currency"}
          </span>
        )}
        <select
          aria-label={fa ? "واحد نمایش قیمت‌ها" : "Price display currency"}
          title={
            fa
              ? "فقط نمایش؛ مبلغ اصلی فاکتور و پرداخت تغییر نمی‌کند."
              : "Display only; invoice and settlement amounts remain unchanged."
          }
          value={currency}
          onChange={(e) => setCurrency(e.target.value as "TOMAN" | "USD")}
          className="h-9 max-w-[110px] rounded-lg border bg-background px-2 text-xs font-semibold"
        >
          <option value="TOMAN">{fa ? "تومان" : "Toman"}</option>
          <option value="USD">{fa ? "دلار ≈" : "USD ≈"}</option>
        </select>
      </label>
      {detailed && (
        <p className="text-xs text-muted-foreground leading-7">
          {fa
            ? "نمایش دلار، برآورد با نرخ مرجع آنلاین است؛ نرخ تسویه درگاه و مبلغ اصلی سند جداگانه تأیید می‌شوند."
            : "USD displays an estimate using online reference FX. Gateway settlement rates and original document amounts are confirmed separately."}
          {currency === "USD" && (
            <span className="block" role="status">
              {rate
                ? `${fa ? "هر دلار:" : "1 USD:"} ${rate.toLocaleString(fa ? "fa-IR" : "en-US", { maximumFractionDigits: 1 })} ${fa ? "تومان" : "Toman"}${asOf ? " · " + new Date(asOf).toLocaleString(fa ? "fa-IR" : "en-GB") : ""}`
                : fa
                  ? "نرخ معتبر فعلاً در دسترس نیست؛ تبدیل دلاری نمایش داده نمی‌شود."
                  : "No valid FX rate is available; USD conversions are unavailable."}
            </span>
          )}
        </p>
      )}
    </div>
  );
}
