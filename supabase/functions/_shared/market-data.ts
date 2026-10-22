export interface MarketSnapshot {
  receivedAt: string;
  usdToman?: number;
  eurToman?: number;
  fxAsOf?: string;
  crypto: {
    symbol: string;
    usd?: number;
    toman?: number;
    asOf?: string;
    source: string;
  }[];
  domainPrices?: {
    extension: string;
    register: number;
    renew: number;
    transfer: number | null;
    asOf: string;
    source: string;
    baselineToman: number;
    discountPercent: number;
  }[];
  errors: string[];
}
let cached: MarketSnapshot | null = null;
let pending: Promise<MarketSnapshot> | null = null;
async function json(url: string) {
  const r = await fetch(url, {
    signal: AbortSignal.timeout(8000),
    redirect: "error",
  });
  if (!r.ok) throw Error("Market source unavailable");
  return r.json();
}
const positive = (v: unknown) =>
  Number.isFinite(Number(v)) && Number(v) > 0 ? Number(v) : undefined;
export async function fetchMarketSnapshot(domainProvider?: {
  url: string;
  key: string;
}): Promise<MarketSnapshot> {
  if (cached && Date.now() - Date.parse(cached.receivedAt) < 60000)
    return cached;
  if (pending) return pending;
  pending = (async () => {
    const result: MarketSnapshot = {
      receivedAt: new Date().toISOString(),
      crypto: [],
      errors: [],
    };
    const [fx, coins, local] = await Promise.allSettled([
      json("https://open.er-api.com/v6/latest/USD"),
      json(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd&include_last_updated_at=true",
      ),
      json("https://api.wallex.ir/v1/markets"),
    ]);
    if (
      fx.status === "fulfilled" &&
      fx.value.result === "success" &&
      positive(fx.value.rates?.IRR) &&
      positive(fx.value.time_last_update_unix)
    ) {
      result.usdToman = Number(fx.value.rates.IRR) / 10;
      result.eurToman = positive(fx.value.rates.EUR)
        ? result.usdToman / Number(fx.value.rates.EUR)
        : undefined;
      result.fxAsOf = new Date(
        Number(fx.value.time_last_update_unix) * 1000,
      ).toISOString();
    } else result.errors.push("fx");
    for (const [symbol, id] of [
      ["BTC", "bitcoin"],
      ["ETH", "ethereum"],
      ["USDT", "tether"],
    ]) {
      const usd = coins.status === "fulfilled" ? coins.value[id] : undefined;
      const market =
        local.status === "fulfilled"
          ? local.value.result?.symbols?.[symbol + "TMN"]
          : undefined;
      result.crypto.push({
        symbol,
        usd: positive(usd?.usd),
        toman: positive(market?.stats?.lastPrice),
        asOf: usd?.last_updated_at
          ? new Date(usd.last_updated_at * 1000).toISOString()
          : undefined,
        source: "CoinGecko USD / Wallex TMN",
      });
    }
    if (coins.status === "rejected") result.errors.push("crypto-usd");
    if (local.status === "rejected") result.errors.push("crypto-toman");
    if (domainProvider) {
      try {
        const url = new URL("/domain-pricing", domainProvider.url);
        if (url.protocol !== "https:") throw Error("HTTPS required");
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + domainProvider.key,
          },
          body: JSON.stringify({ discountPercent: 1.5, years: 1 }),
          signal: AbortSignal.timeout(8000),
          redirect: "error",
        });
        if (!response.ok) throw Error("Pricing unavailable");
        const body = await response.json();
        result.domainPrices = (body.prices || [])
          .filter(
            (p: any) =>
              typeof p.extension === "string" &&
              /^[a-z0-9.-]+$/.test(p.extension) &&
              positive(p.baselineToman) &&
              positive(p.costFloorToman) &&
              positive(p.renewToman) &&
              (!p.transferToman || positive(p.transferToman)) &&
              typeof p.source === "string" &&
              p.source.startsWith("https://") &&
              Number.isFinite(Date.parse(p.asOf)) &&
              Date.now() - Date.parse(p.asOf) < 3600000 &&
              Date.parse(p.asOf) <= Date.now() + 60000,
          )
          .map((p: any) => ({
            extension: p.extension.replace(/^\./, ""),
            register: Math.max(
              Math.ceil(p.costFloorToman),
              Math.ceil(p.baselineToman * 0.985),
            ),
            renew: Math.ceil(p.renewToman),
            transfer: p.transferToman ? Math.ceil(p.transferToman) : null,
            asOf: p.asOf,
            source: p.source,
            baselineToman: p.baselineToman,
            discountPercent: 1.5,
          }));
      } catch {
        result.errors.push("domain-prices");
      }
    }
    cached = result;
    return result;
  })();
  try {
    return await pending;
  } finally {
    pending = null;
  }
}
