import type { MarketSnapshot } from "../../supabase/functions/_shared/market-data";
export type DisplayCurrency = "TOMAN" | "USD";
export function displayUsdNumber(value: number) {
  return value.toLocaleString(
    "en-US",
    value !== 0 && Math.abs(value) < 0.01
      ? { maximumSignificantDigits: 3 }
      : { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  );
}
export function referenceUsdRate(
  snapshot: MarketSnapshot | null,
  at = Date.now(),
): number | null {
  if (
    !snapshot ||
    !Number.isFinite(snapshot.usdToman) ||
    snapshot.usdToman! <= 0
  )
    return null;
  const received = Date.parse(snapshot.receivedAt),
    source = Date.parse(snapshot.fxAsOf || "");
  if (
    !Number.isFinite(received) ||
    !Number.isFinite(source) ||
    received > at + 60000 ||
    source > at + 60000 ||
    at - received > 180000 ||
    at - source > 48 * 3600000
  )
    return null;
  return snapshot.usdToman!;
}
export function displayCurrencyValue(
  toman: number,
  currency: DisplayCurrency,
  rate: number | null,
) {
  if (!Number.isFinite(toman)) throw Error("Invalid display amount");
  if (currency === "TOMAN") return toman;
  return rate !== null && Number.isFinite(rate) && rate > 0
    ? toman / rate
    : null;
}
