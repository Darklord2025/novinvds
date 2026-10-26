import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { accountApi } from "@/lib/account-api";
import BrandLogo from "@/components/BrandLogo";
import LanguageControl from "@/components/LanguageControl";
import AuthCaptcha from "@/components/AuthCaptcha";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePanelCopy } from "@/components/user-panel/PanelPrimitives";
export default function Recover({ reset = false }: { reset?: boolean }) {
  const { s, fa } = usePanelCopy();
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  const [params] = useSearchParams();
  const [kind, setKind] = useState(params.get("kind") || "password"),
    [email, setEmail] = useState(""),
    [name, setName] = useState(""),
    [username, setUsername] = useState(""),
    [details, setDetails] = useState(""),
    [password, setPassword] = useState(""),
    [confirm, setConfirm] = useState(""),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false),
    [recovery, setRecovery] = useState(false);
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setRecovery(true);
    });
    const url = new URL(location.href);
    const code = url.searchParams.get("code");
    if (reset && code) {
      void supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (!error) setRecovery(true);
      });
    }
    if (reset && location.hash.includes("type=recovery"))
      void supabase.auth
        .getSession()
        .then(({ data }) => setRecovery(!!data.session));
    return () => subscription.unsubscribe();
  }, [reset]);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy || (!reset && kind === "password" && !captchaToken)) return;
    setBusy(true);
    setMessage("");
    try {
      if (reset) {
        if (!recovery)
          throw Error(
            s(
              "لینک بازیابی معتبر را از ایمیل باز کنید.",
              "Open a valid recovery link from your email.",
            ),
          );
        if (password !== confirm)
          throw Error(s("تکرار رمز یکسان نیست.", "Passwords do not match."));
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        await supabase.auth.signOut();
        setRecovery(false);
        setMessage(
          s(
            "رمز تغییر کرد. با رمز جدید وارد شوید.",
            "Password updated. Sign in with your new password.",
          ),
        );
      } else if (kind === "password") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: location.origin + "/reset-password",
          captchaToken,
        });
        if (error) throw error;
        setMessage(
          s(
            "اگر حسابی با این ایمیل وجود داشته باشد، لینک بازیابی ارسال می‌شود.",
            "If an account exists, a recovery link will be sent.",
          ),
        );
      } else {
        await accountApi("recover", { kind, email, name, username, details });
        setMessage(
          s(
            "در صورت تطابق مشخصات، ادامه درخواست به ایمیل حساب ارسال می‌شود. بازیابی دو مرحله‌ای پس از بررسی هویت توسط پشتیبانی انجام می‌شود.",
            "If the details match, follow-up instructions will be emailed. MFA recovery requires support identity review.",
          ),
        );
      }
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setCaptchaToken("");
      setCaptchaReset((v) => v + 1);
      setBusy(false);
    }
  }
  return (
    <main
      dir={fa ? "rtl" : "ltr"}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-indigo-50 dark:from-slate-950 dark:to-slate-900 p-5 grid place-items-center"
    >
      <div className="max-w-lg w-full rounded-3xl border bg-card p-6 md:p-9 space-y-6">
        <div className="flex justify-between">
          <Link to="/">
            <BrandLogo />
          </Link>
          <LanguageControl />
        </div>
        <h1 className="text-2xl font-bold">
          {reset
            ? s("تعیین رمز جدید", "Set a new password")
            : s("بازیابی دسترسی", "Recover account access")}
        </h1>
        {!reset && (
          <div className="grid grid-cols-3 gap-2">
            {[
              ["password", "رمز عبور", "Password"],
              ["username", "نام کاربری", "Username"],
              ["mfa", "دو مرحله‌ای", "Two-step"],
            ].map(([id, fa, en]) => (
              <Button
                key={id}
                size="sm"
                variant={kind === id ? "default" : "outline"}
                onClick={() => {
                  setKind(id);
                  setMessage("");
                }}
              >
                {s(fa, en)}
              </Button>
            ))}
          </div>
        )}
        <form onSubmit={submit} className="space-y-4">
          {reset ? (
            <>
              <Label>
                {s("رمز جدید", "New password")}
                <Input
                  type="password"
                  autoComplete="new-password"
                  minLength={12}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Label>
              <Label>
                {s("تکرار رمز", "Confirm password")}
                <Input
                  type="password"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </Label>
            </>
          ) : (
            <>
              <Label>
                {s("ایمیل حساب", "Account email")}
                <Input
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Label>
              {kind === "mfa" && (
                <>
                  <Label>
                    {s("نام کامل مالک حساب", "Account holder full name")}
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Label>
                  <Label>
                    {s("نام کاربری", "Username")}
                    <Input
                      dir="ltr"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Label>
                  <Label>
                    {s(
                      "شناسه سرویس یا فاکتور و شرح مشکل",
                      "Service or invoice reference and issue",
                    )}
                    <textarea
                      className="w-full rounded-lg border bg-background p-3"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      required
                      minLength={20}
                    />
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {s(
                      "مدارک هویتی را در این فرم عمومی وارد نکنید. پشتیبانی روش امن بررسی هویت را پس از تطابق اولیه اعلام می‌کند.",
                      "Do not submit identity documents in this public form. Support provides secure identity verification after initial matching.",
                    )}
                  </p>
                </>
              )}
            </>
          )}
          {!reset && kind === "password" && (
            <AuthCaptcha onToken={setCaptchaToken} reset={captchaReset} />
          )}
          <Button
            className="w-full rounded-xl"
            disabled={busy || (!reset && kind === "password" && !captchaToken)}
          >
            {reset
              ? s("ذخیره رمز جدید", "Save new password")
              : s("ارسال درخواست بازیابی", "Send recovery request")}
          </Button>
        </form>
        <p role="status" className="text-sm leading-7">
          {message}
        </p>
        <Link className="block text-sm text-primary" to="/auth">
          {s("بازگشت به ورود", "Back to sign in")}
        </Link>
      </div>
    </main>
  );
}
