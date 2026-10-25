import { useLanguage } from "@/contexts/LanguageContext";
import { useDisplayCurrency } from "@/contexts/DisplayCurrencyContext";
import { formatMoney, localize } from "@/lib/billing";
import { displayUsdNumber } from "@/lib/display-currency";
export function useSiteCopy() {
  const { language } = useLanguage(),
    display = useDisplayCurrency(),
    fa = language === "fa";
  return {
    fa,
    s: (f: string, en: string) => (fa ? f : en),
    text: (v: readonly string[]) => v[fa ? 0 : 1],
    n: (v: string | number) => localize(v, fa),
    money: (value: number) => {
      if (display.currency === "TOMAN") return formatMoney(value, "TOMAN", fa);
      const usd = display.value(value);
      return usd === null
        ? fa
          ? "نرخ دلار در دسترس نیست"
          : "USD rate unavailable"
        : "≈ " + localize(displayUsdNumber(usd), fa) + (fa ? " دلار" : " USD");
    },
  };
}
