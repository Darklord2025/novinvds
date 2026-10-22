import { normalizeDigits } from "@/lib/localized-number";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { accountApi } from "@/lib/account-api";
import { usePanelCopy } from "./PanelPrimitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Smartphone, Mail, Copy, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { usePanelData } from "@/contexts/PanelDataContext";
export default function AccountSecuritySettings() {
  const { s } = usePanelCopy();
  const { preview } = usePanelData();
  const [loaded, setLoaded] = useState(false);
  const [factors, setFactors] = useState<{ id: string }[]>([]),
    [enroll, setEnroll] = useState<{
      id: string;
      qr: string;
      secret: string;
    } | null>(null),
    [code, setCode] = useState(""),
    [copied, setCopied] = useState(false),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false),
    [emailEnabled, setEmailEnabled] = useState(false),
    [emailCode, setEmailCode] = useState(""),
    [emailFlow, setEmailFlow] = useState("");
  async function refresh() {
    const { data, error } = await supabase.auth.mfa.listFactors();
    if (error) throw error;
    setFactors(data.totp.filter((f) => f.status === "verified"));
    const result = await accountApi("status");
    setEmailEnabled(result.enabled);
    setLoaded(true);
  }
  useEffect(() => {
    if (preview) return;
    void refresh().catch(() =>
      setMessage(
        s("تنظیمات امنیتی دریافت نشد.", "Security settings unavailable."),
      ),
    );
    return () => {
      setEnroll(null);
    };
  }, [preview]);
  async function run(task: () => Promise<void>) {
    if (preview) {
      setMessage(
        s(
          "راه‌اندازی واقعی به حساب واردشده و ایمیل تاییدشده نیاز دارد؛ در پیش‌نمایش تغییری در امنیت حساب ایجاد نمی‌شود.",
          "Real setup requires a signed-in account and verified email. Preview does not change account security.",
        ),
      );
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      await task();
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function start() {
    await run(async () => {
      const { data: all, error: listError } =
        await supabase.auth.mfa.listFactors();
      if (listError) throw listError;
      for (const f of all?.all || [])
        if (f.status === "unverified")
          await supabase.auth.mfa.unenroll({ factorId: f.id });
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "NovinVDS authenticator",
        issuer: "NovinVDS",
      });
      if (error) throw error;
      setEnroll({
        id: data.id,
        qr: data.totp.qr_code,
        secret: data.totp.secret,
      });
      setCopied(false);
      setCode("");
    });
  }
  async function verifyTotp(remove = false) {
    await run(async () => {
      const id = remove ? factors[0]?.id : enroll?.id;
      if (!id) throw Error("No factor");
      const { error } = await supabase.auth.mfa.challengeAndVerify({
        factorId: id,
        code,
      });
      if (error) throw error;
      if (remove) {
        const { error: removed } = await supabase.auth.mfa.unenroll({
          factorId: id,
        });
        if (removed) throw removed;
      }
      setEnroll(null);
      setCode("");
      await refresh();
      setMessage(s("تنظیمات امنیتی ذخیره شد.", "Security settings saved."));
    });
  }
  return (
    <section className="rounded-2xl border bg-card p-5 space-y-5">
      <h2 className="font-bold flex gap-2">
        <ShieldCheck className="text-violet-500" />
        {s("احراز هویت دو مرحله‌ای", "Two-step authentication")}
      </h2>
      {!preview && !loaded && (
        <Button variant="outline" disabled={busy} onClick={() => run(refresh)}>
          {s("دریافت مجدد وضعیت امنیت", "Retry security status")}
        </Button>
      )}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 space-y-4">
          <Smartphone className="text-blue-500" />
          <h3 className="font-bold">
            {s("نرم‌افزار رمزساز", "Authenticator app")}
          </h3>
          <p className="text-xs text-muted-foreground">
            {!loaded
              ? s(
                  "وضعیت: نیازمند دریافت از حساب واقعی",
                  "Status: requires real account data",
                )
              : factors.length
                ? s("فعال", "Enabled")
                : s("غیرفعال", "Disabled")}
          </p>
          <p className="text-sm text-muted-foreground">
            {s(
              "از Google Authenticator، Microsoft Authenticator یا نرم‌افزار سازگار استفاده کنید.",
              "Use Google Authenticator, Microsoft Authenticator or a compatible app.",
            )}
          </p>
          {!factors.length && !enroll && (
            <Button disabled={busy || (!preview && !loaded)} onClick={start}>
              {s("راه‌اندازی نرم‌افزار", "Set up authenticator")}
            </Button>
          )}
          {enroll && (
            <>
              <img
                src={enroll.qr}
                alt={s(
                  "بارکد اتصال نرم‌افزار رمزساز",
                  "Authenticator setup QR code",
                )}
                className="bg-white p-3 rounded-xl w-48 h-48"
              />
              <p className="text-xs">
                {s(
                  "بارکد را اسکن کنید یا کلید راه‌اندازی را وارد کنید. این کلید فقط همین‌جا نمایش داده می‌شود.",
                  "Scan the QR code or enter the setup key. This key is displayed only during setup.",
                )}
              </p>
              <code
                dir="ltr"
                className="block bg-muted p-3 text-xs break-all select-all"
              >
                {enroll.secret}
              </code>
              <Button
                disabled={copied}
                variant="outline"
                onClick={async () => {
                  await navigator.clipboard.writeText(enroll.secret);
                  setCopied(true);
                }}
              >
                <Copy size={16} />
                {copied
                  ? s("کپی شد", "Copied")
                  : s("کپی کلید — یک بار", "Copy key — once")}
              </Button>
            </>
          )}
          {(enroll || factors.length > 0) && (
            <>
              <Input
                aria-label={s("کد نرم‌افزار", "Authenticator code")}
                dir="ltr"
                value={code}
                maxLength={6}
                inputMode="numeric"
                autoComplete="one-time-code"
                onChange={(e) =>
                  setCode(normalizeDigits(e.target.value).replace(/\D/g, ""))
                }
                placeholder="000000"
              />
              {enroll ? (
                <Button
                  disabled={busy || code.length !== 6}
                  onClick={() => verifyTotp()}
                >
                  {s("تایید کد و فعال‌سازی", "Verify code and enable")}
                </Button>
              ) : (
                <>
                  <p className="text-emerald-600 text-sm flex gap-2">
                    <CheckCircle size={16} />
                    {s("فعال", "Enabled")}
                  </p>
                  <Button
                    variant="destructive"
                    disabled={busy || code.length !== 6}
                    onClick={() => verifyTotp(true)}
                  >
                    {s("تایید کد و غیرفعال‌سازی", "Verify code and disable")}
                  </Button>
                </>
              )}
            </>
          )}
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-4">
          <Mail className="text-emerald-500" />
          <h3 className="font-bold">
            {s("تایید با ایمیل", "Email verification")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {s(
              "کد به ایمیل تاییدشده حساب ارسال می‌شود. تغییر این تنظیم با کد تازه تایید می‌شود.",
              "A code is sent to your verified account email. A fresh code is required to change this setting.",
            )}
          </p>
          <p className="text-sm">
            {!loaded
              ? s(
                  "وضعیت: نیازمند دریافت از حساب واقعی",
                  "Status: requires real account data",
                )
              : emailEnabled
                ? s("فعال", "Enabled")
                : s("غیرفعال", "Disabled")}
          </p>
          <Button
            variant="outline"
            disabled={busy || (!preview && !loaded)}
            onClick={() =>
              run(async () => {
                const purpose = emailEnabled ? "disable" : "enable";
                await accountApi("send", { purpose });
                setEmailFlow(purpose);
                setEmailCode("");
                setMessage(
                  s(
                    "کد به ایمیل حساب ارسال شد.",
                    "A code was sent to your account email.",
                  ),
                );
              })
            }
          >
            {emailEnabled
              ? s("درخواست غیرفعال‌سازی", "Request disable")
              : s("فعال‌سازی با کد ایمیل", "Enable with email code")}
          </Button>
          {emailFlow && (
            <>
              <Input
                dir="ltr"
                inputMode="numeric"
                maxLength={6}
                aria-label={s("کد ایمیل", "Email code")}
                value={emailCode}
                onChange={(e) =>
                  setEmailCode(
                    normalizeDigits(e.target.value).replace(/\D/g, ""),
                  )
                }
              />
              <Button
                disabled={busy || emailCode.length !== 6}
                onClick={() =>
                  run(async () => {
                    await accountApi("verify", {
                      code: emailCode,
                      purpose: emailFlow,
                    });
                    setEmailFlow("");
                    setEmailCode("");
                    await refresh();
                    setMessage(s("ذخیره شد.", "Saved."));
                  })
                }
              >
                {s("تایید کد", "Verify code")}
              </Button>
            </>
          )}
        </div>
      </div>
      <p role="status" className="text-sm">
        {message}
      </p>
      <Link to="/recover?kind=mfa" className="text-primary text-sm">
        {s(
          "بازیابی کد دو مرحله‌ای از طریق بررسی هویت پشتیبانی",
          "Recover two-step access through support identity review",
        )}
      </Link>
    </section>
  );
}
