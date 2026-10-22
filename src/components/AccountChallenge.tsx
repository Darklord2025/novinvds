import { normalizeDigits } from "@/lib/localized-number";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { accountApi } from "@/lib/account-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { usePanelCopy } from "@/components/user-panel/PanelPrimitives";
export default function AccountChallenge({
  onVerified,
}: {
  onVerified: () => void;
}) {
  const { s } = usePanelCopy();
  const [factor, setFactor] = useState(""),
    [code, setCode] = useState(""),
    [email, setEmail] = useState(false),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  useEffect(() => {
    let live = true;
    (async () => {
      try {
        const { data, error } =
          await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (error) throw error;
        if (data.nextLevel === "aal2" && data.currentLevel !== "aal2") {
          const factors = await supabase.auth.mfa.listFactors();
          if (factors.error) throw factors.error;
          if (live) setFactor(factors.data.totp[0]?.id || "");
          return;
        }
        const result = await accountApi("status");
        if (result.required) {
          if (live) setEmail(true);
        } else if (live) onVerified();
      } catch {
        if (live)
          setMessage(
            s(
              "بررسی امنیت حساب ممکن نشد. دوباره تلاش کنید.",
              "Unable to check account security. Please retry.",
            ),
          );
      }
    })();
    return () => {
      live = false;
    };
  }, []);
  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (factor) {
        const { error } = await supabase.auth.mfa.challengeAndVerify({
          factorId: factor,
          code,
        });
        if (error) throw error;
        setFactor("");
        const result = await accountApi("status");
        if (result.required) setEmail(true);
        else onVerified();
      } else {
        await accountApi("verify", { code });
        onVerified();
      }
      setCode("");
    } catch {
      setMessage(
        s(
          "کد معتبر نیست یا منقضی شده است.",
          "The code is invalid or has expired.",
        ),
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="w-full max-w-md mx-auto rounded-2xl border bg-card p-6 space-y-5">
      <h1 className="font-bold text-xl">
        {s("تایید دو مرحله‌ای", "Two-step verification")}
      </h1>
      <p className="text-sm text-muted-foreground">
        {factor
          ? s(
              "کد شش‌رقمی نرم‌افزار را وارد کنید.",
              "Enter the six-digit code from your authenticator.",
            )
          : s(
              "کد ارسال‌شده به ایمیل حساب را وارد کنید.",
              "Enter the code sent to your account email.",
            )}
      </p>
      {email && (
        <Button
          variant="outline"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              await accountApi("send");
              setMessage(s("کد ارسال شد.", "Code sent."));
            } catch {
              setMessage(s("ارسال ایمیل ممکن نشد.", "Unable to send email."));
            } finally {
              setBusy(false);
            }
          }}
        >
          {s("ارسال کد ایمیل", "Send email code")}
        </Button>
      )}
      <form onSubmit={verify} className="space-y-4">
        <Input
          aria-label={s("کد تایید", "Verification code")}
          dir="ltr"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]{6}"
          maxLength={6}
          value={code}
          onChange={(e) =>
            setCode(normalizeDigits(e.target.value).replace(/\D/g, ""))
          }
          required
        />
        <Button className="w-full" disabled={busy || (!factor && !email)}>
          {s("تایید و ورود", "Verify and sign in")}
        </Button>
      </form>
      <p role="alert" className="text-sm">
        {message}
      </p>
      <Link className="block text-sm text-primary" to="/recover?kind=mfa">
        {s("دسترسی به کد ندارم", "I cannot access my code")}
      </Link>
      <Button
        variant="ghost"
        onClick={async () => {
          await supabase.auth.signOut();
          window.location.assign("/auth");
        }}
      >
        {s("بازگشت به ورود", "Back to sign in")}
      </Button>
    </section>
  );
}
