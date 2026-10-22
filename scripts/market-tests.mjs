import test from "node:test";
import assert from "node:assert/strict";
import { fetchMarketSnapshot } from "../supabase/functions/_shared/market-data.ts";
test("market rates keep unavailable sources absent and apply only fresh, cost-bounded competitor quotes", async () => {
  const original = globalThis.fetch;
  const now = new Date().toISOString();
  let calls = 0;
  globalThis.fetch = async (url, options) => {
    calls++;
    const u = String(url);
    const body = u.includes("open.er-api")
      ? {
          result: "success",
          rates: { IRR: 500000, EUR: 0.9 },
          time_last_update_unix: Math.floor(Date.now() / 1000),
        }
      : u.includes("coingecko")
        ? {
            bitcoin: {
              usd: 90000,
              last_updated_at: Math.floor(Date.now() / 1000),
            },
          }
        : u.includes("wallex")
          ? {
              result: { symbols: { USDTTMN: { stats: { lastPrice: 60000 } } } },
            }
          : {
              prices: [
                {
                  extension: "com",
                  baselineToman: 1000000,
                  costFloorToman: 900000,
                  renewToman: 1100000,
                  transferToman: 1000000,
                  asOf: now,
                  source: "https://competitor.example/com",
                },
                {
                  extension: "net",
                  baselineToman: 1000000,
                  costFloorToman: 999000,
                  renewToman: 1100000,
                  asOf: now,
                  source: "https://competitor.example/net",
                },
                {
                  extension: "old",
                  baselineToman: 1000000,
                  costFloorToman: 900000,
                  renewToman: 1100000,
                  asOf: "2020-01-01T00:00:00Z",
                  source: "https://competitor.example/old",
                },
              ],
            };
    return new Response(JSON.stringify(body), { status: 200 });
  };
  try {
    const result = await fetchMarketSnapshot({
      url: "https://operator.example",
      key: "test-only",
    });
    assert.equal(result.usdToman, 50000);
    assert.equal(result.crypto.find((c) => c.symbol === "USDT").toman, 60000);
    assert.equal(result.crypto.find((c) => c.symbol === "ETH").usd, undefined);
    assert.equal(
      result.domainPrices.find((p) => p.extension === "com").register,
      985000,
    );
    assert.equal(
      result.domainPrices.find((p) => p.extension === "net").register,
      999000,
    );
    assert.ok(!result.domainPrices.some((p) => p.extension === "old"));
    assert.equal(await fetchMarketSnapshot(), result);
    assert.equal(calls, 4);
  } finally {
    globalThis.fetch = original;
  }
});
