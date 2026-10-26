import {
  admin,
  check,
  cors,
  emailStatus,
  hash,
  identity,
  json,
  nativeGuard,
  sendMail,
  text,
} from "../_shared/panel.ts";
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  try {
    const body = await req.json(),
      action = String(body.action);
    if (action === "recover") {
      const db = admin(),
        email = text(body.email, 254).toLowerCase(),
        kind = text(body.kind, 20);
      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        !["username", "mfa"].includes(kind)
      )
        return json({ ok: true });
      const key = await hash("recover:" + email);
      const { data: allowed } = check(
        await db.rpc("panel_rate_limit", { p_key: key, p_seconds: 300 }),
      );
      if (!allowed) return json({ ok: true });
      const { data: userId } = check(
        await db.rpc("panel_find_user", { p_email: email }),
      );
      const { data: record } = userId
        ? check(
            await db
              .from("panel_profiles")
              .select("data")
              .eq("user_id", userId)
              .maybeSingle(),
          )
        : { data: null };
      const match = userId
        ? { user_id: userId, data: record?.data || {} }
        : null;
      if (match) {
        const {
          data: { user },
        } = await db.auth.admin.getUserById(match.user_id);
        if (user?.email?.toLowerCase() === email) {
          if (kind === "username")
            await sendMail(
              email,
              "NovinVDS — بازیابی نام کاربری / Username recovery",
              "نام کاربری / Username: " +
                text(match.data.username || user.user_metadata.username, 32),
            );
          else {
            const name = text(body.name, 150),
              username = text(body.username, 32),
              details = text(body.details, 2000);
            if (
              name === (match.data.name || user.user_metadata.full_name) &&
              username ===
                (match.data.username || user.user_metadata.username) &&
              details.length >= 20
            ) {
              const { data: t } = check(
                await db
                  .from("panel_tickets")
                  .insert({
                    user_id: user.id,
                    subject: "بازیابی دو مرحله‌ای / MFA recovery",
                    department: "security",
                    messages: [
                      {
                        body: details,
                        at: new Date().toISOString(),
                        sender: "customer",
                      },
                    ],
                  })
                  .select("number")
                  .single(),
              );
              await sendMail(
                email,
                "NovinVDS — درخواست بررسی هویت / Identity review",
                "درخواست شماره / Request " +
                  t.number +
                  ". پشتیبانی پیش از هرگونه حذف عامل امنیتی، هویت مالک حساب را بررسی می‌کند. Support will verify identity before resetting any security factor.",
              );
            }
          }
        }
      }
      return json({ ok: true });
    }
    const ctx = await identity(req);
    await nativeGuard(ctx);
    const purpose = ["enable", "disable"].includes(body.purpose)
      ? String(body.purpose)
      : "login";
    if (action === "status") return json(await emailStatus(ctx));
    if (action === "send") {
      const state = await emailStatus(ctx);
      if (
        (purpose === "disable" && !state.enabled) ||
        (purpose === "enable" && state.enabled) ||
        (purpose === "login" && !state.enabled)
      )
        throw Error("Invalid security operation");
      const { data: allowed } = check(
        await ctx.db.rpc("panel_rate_limit", {
          p_key: await hash("otp:" + ctx.user.id),
          p_seconds: 60,
        }),
      );
      if (!allowed) throw Error("یک دقیقه صبر کنید / Wait one minute");
      let random: number;
      const array = new Uint32Array(1);
      do {
        crypto.getRandomValues(array);
        random = array[0];
      } while (random >= 4294000000);
      const code = String(random % 1000000).padStart(6, "0");
      const codeHash = await hash(
        [ctx.user.id, ctx.sessionId, purpose, code].join(":"),
      );
      check(
        await ctx.db
          .from("panel_email_challenges")
          .upsert({
            user_id: ctx.user.id,
            session_id: ctx.sessionId,
            purpose,
            code_hash: codeHash,
            expires_at: new Date(Date.now() + 300000).toISOString(),
            attempts: 0,
            sent_at: new Date().toISOString(),
          }),
      );
      await sendMail(
        ctx.user.email!,
        "NovinVDS — کد تایید / Verification code",
        `کد یک بار مصرف / One-time code: ${code}\nاعتبار: ۵ دقیقه / Valid for 5 minutes.\nOperation: ${purpose}`,
      );
      return json({ ok: true });
    }
    if (action === "verify") {
      const code = text(body.code, 6);
      if (!/^\d{6}$/.test(code)) throw Error("Invalid code");
      const { data } = check(
        await ctx.db.rpc("panel_consume_email_code", {
          p_user: ctx.user.id,
          p_session: ctx.sessionId,
          p_purpose: purpose,
          p_hash: await hash(
            [ctx.user.id, ctx.sessionId, purpose, code].join(":"),
          ),
        }),
      );
      if (!data) throw Error("Invalid or expired code");
      return json({ ok: true });
    }
    return json({ error: "Unknown action" }, 400);
  } catch {
    return json(
      {
        error:
          "عملیات امنیتی انجام نشد / Security operation could not be completed",
      },
      400,
    );
  }
});
