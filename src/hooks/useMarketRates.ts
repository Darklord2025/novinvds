import { useEffect, useState } from "react";
import type { MarketSnapshot } from "../../supabase/functions/_shared/market-data";
let cache: MarketSnapshot | null = null;
let pending: Promise<MarketSnapshot> | null = null;
export async function getMarketRates() {
  if (cache && Date.now() - Date.parse(cache.receivedAt) < 60000) return cache;
  if (pending) return pending;
  pending = (async () => {
    const r = await fetch(
      import.meta.env.DEV
        ? "/api/market-rates"
        : import.meta.env.VITE_SUPABASE_URL + "/functions/v1/market-rates",
      {
        headers: import.meta.env.DEV
          ? {}
          : { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
        signal: AbortSignal.timeout(15000),
      },
    );
    if (!r.ok) throw Error("Rates unavailable");
    const data = await r.json();
    if (!data.receivedAt || !Array.isArray(data.crypto))
      throw Error("Invalid rates");
    cache = data;
    return data;
  })();
  try {
    return await pending;
  } finally {
    pending = null;
  }
}
export function useMarketRates() {
  const [rates, setRates] = useState(cache),
    [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    const refresh = () => {
      if (document.visibilityState === "hidden") return;
      void getMarketRates()
        .then((r) => {
          if (active) {
            setRates(r);
            setError(false);
          }
        })
        .catch(() => {
          if (active) setError(true);
        });
    };
    refresh();
    const timer = setInterval(refresh, 60000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      active = false;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);
  return {
    rates,
    error,
    stale: !!rates && Date.now() - Date.parse(rates.receivedAt) > 180000,
  };
}
