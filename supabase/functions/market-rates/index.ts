import { fetchMarketSnapshot } from "../_shared/market-data.ts";
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, apikey, content-type, x-client-info",
  "Content-Type": "application/json",
  "Cache-Control": "public,max-age=60",
};
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers });
  if (!["GET", "POST"].includes(req.method))
    return new Response("{}", { status: 405, headers });
  try {
    const url = Deno.env.get("PANEL_PROVIDER_URL"),
      key = Deno.env.get("PANEL_PROVIDER_KEY");
    return new Response(
      JSON.stringify(
        await fetchMarketSnapshot(url && key ? { url, key } : undefined),
      ),
      { headers },
    );
  } catch {
    return new Response(JSON.stringify({ error: "Market rates unavailable" }), {
      status: 503,
      headers,
    });
  }
});
