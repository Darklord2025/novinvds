import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";
export const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization,x-client-info,apikey,content-type",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
};
export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...cors,
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
export const admin = () =>
  createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
export function check<T extends { error: any }>(result: T) {
  if (result.error) throw Error("Account operation failed");
  return result as T & { error: null };
}
export async function identity(req: Request) {
  const auth = req.headers.get("Authorization") || "";
  if (!auth.startsWith("Bearer ")) throw Error("Authentication required");
  const client = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    {
      global: { headers: { Authorization: auth } },
      auth: { persistSession: false },
    },
  );
  const { data, error } = await client.auth.getUser();
  if (error || !data.user || !data.user.email_confirmed_at)
    throw Error("Verified account required");
  const token = auth.slice(7),
    claims = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
    );
  if (!claims.session_id) throw Error("Session required");
  return {
    user: data.user,
    sessionId: String(claims.session_id),
    aal: String(claims.aal),
    client,
    db: admin(),
  };
}
export async function nativeGuard(ctx: Awaited<ReturnType<typeof identity>>) {
  const { data, error } = await ctx.db.auth.admin.mfa.listFactors({
    userId: ctx.user.id,
  });
  if (error) throw error;
  if (data.factors.some((f) => f.status === "verified") && ctx.aal !== "aal2")
    throw Error("Authenticator verification required");
}
export async function emailStatus(ctx: Awaited<ReturnType<typeof identity>>) {
  const { data } = check(
    await ctx.db
      .from("panel_security")
      .select("email_enabled")
      .eq("user_id", ctx.user.id)
      .maybeSingle(),
  );
  const { data: grant } = check(
    await ctx.db
      .from("panel_email_grants")
      .select("expires_at")
      .eq("user_id", ctx.user.id)
      .eq("session_id", ctx.sessionId)
      .maybeSingle(),
  );
  return {
    enabled: !!data?.email_enabled,
    required:
      !!data?.email_enabled &&
      (!grant || Date.parse(grant.expires_at) <= Date.now()),
  };
}
export async function guard(req: Request) {
  const ctx = await identity(req);
  await nativeGuard(ctx);
  if ((await emailStatus(ctx)).required)
    throw Error("Email verification required");
  return ctx;
}
export async function provider(kind: string, payload: unknown) {
  const url = Deno.env.get("PANEL_PROVIDER_URL"),
    key = Deno.env.get("PANEL_PROVIDER_KEY");
  if (!url || !key || new URL(url).protocol !== "https:")
    throw Error("ارائه‌دهنده متصل نیست / Provider not connected");
  const response = await fetch(url.replace(/\/$/, "") + "/" + kind, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw Error("Provider request failed");
  return await response.json();
}
export async function sendMail(to: string, subject: string, text: string) {
  const key = Deno.env.get("RESEND_API_KEY"),
    from = Deno.env.get("PANEL_MAIL_FROM");
  if (!key || !from) throw Error("Email delivery is not configured");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, text }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw Error("Unable to deliver email");
}
export const text = (value: unknown, max = 10000) =>
  String(value ?? "")
    .trim()
    .slice(0, max);
export async function hash(value: string) {
  const secret = Deno.env.get("PANEL_OTP_SECRET");
  if (!secret || secret.length < 32) throw Error("Security secret unavailable");
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return Array.from(
    new Uint8Array(
      await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value)),
    ),
  )
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
