import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getMarketRates } from "@/hooks/useMarketRates";
import {
  referenceUsdRate,
  displayCurrencyValue,
  type DisplayCurrency,
} from "@/lib/display-currency";
import type { MarketSnapshot } from "../../supabase/functions/_shared/market-data";
const fallback = {
  currency: "TOMAN" as DisplayCurrency,
  setCurrency: (_currency: DisplayCurrency) => {},
  rate: null as number | null,
  asOf: undefined as string | undefined,
  value: (toman: number) => toman,
};
const DisplayCurrencyContext = createContext(fallback);
export function DisplayCurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<DisplayCurrency>(() => {
      try {
        return localStorage.getItem("novin.displayCurrency") === "USD"
          ? "USD"
          : "TOMAN";
      } catch {
        return "TOMAN";
      }
    }),
    [snapshot, setSnapshot] = useState<MarketSnapshot | null>(null),
    [at, setAt] = useState(Date.now);
  useEffect(() => {
    try {
      localStorage.setItem("novin.displayCurrency", currency);
    } catch {}
  }, [currency]);
  useEffect(() => {
    if (currency !== "USD") return;
    let active = true;
    const refresh = () => {
      setAt(Date.now());
      void getMarketRates()
        .then((s) => {
          if (active) {
            setSnapshot(s);
            setAt(Date.now());
          }
        })
        .catch(() => {
          if (active) setAt(Date.now());
        });
    };
    refresh();
    const timer = setInterval(refresh, 60000);
    const visible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", visible);
    return () => {
      active = false;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", visible);
    };
  }, [currency]);
  const rate = referenceUsdRate(snapshot, at);
  return (
    <DisplayCurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        rate,
        asOf: snapshot?.fxAsOf,
        value: (toman) => displayCurrencyValue(toman, currency, rate),
      }}
    >
      {children}
    </DisplayCurrencyContext.Provider>
  );
}
export const useDisplayCurrency = () => useContext(DisplayCurrencyContext);
