import AuthScene from "@/components/AuthScene";
import { useTheme } from "@/contexts/ThemeContext";
import {
  User,
  Zap,
  Sun,
  Moon,
  ArrowRight,
  ArrowLeft,
  Globe,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Server, Headphones, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { oauthReturnPath } from "@/lib/oauth-return-path";
import BrandLogo from "@/components/BrandLogo";
import LanguageControl from "@/components/LanguageControl";
import AccountChallenge from "@/components/AccountChallenge";
import { usePanelCopy } from "@/components/user-panel/PanelPrimitives";
export default function Auth() {
  const { s, fa } = usePanelCopy(),
    navigate = useNavigate();
  const theme = useTheme();
  const [mode, setMode] = useState("login"),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirm, setConfirm] = useState(""),
    [name, setName] = useState(""),
    [username, setUsername] = useState(""),
    [terms, setTerms] = useState(false),
    [show, setShow] = useState(false),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState(""),
    [signed, setSigned] = useState(false);
  const rawNext = new URLSearchParams(location.search).get("next"),
    next = rawNext ? oauthReturnPath(rawNext) : "/user-panel";
  const go = () => {
    if (next.startsWith("/.lovable/")) location.assign(next);
    else navigate(next, { replace: true });
  };
  useEffect(() => {
    void supabase.auth
      .getSession()
      .then(({ data }) => setSigned(!!data.session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        navigate("/reset-password");
        return;
      }
      setSigned(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error)
          throw Error(
            s(
              "ایمیل یا رمز عبور صحیح نیست.",
              "The email or password is incorrect.",
            ),
          );
        sessionStorage.removeItem("novin.panel.deadline");
        setSigned(true);
      } else {
        if (!terms || password !== confirm)
          throw Error(
            s(
              "تکرار رمز و پذیرش شرایط را بررسی کنید.",
              "Check your password confirmation and accept the terms.",
            ),
          );
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: location.origin + "/auth",
            data: {
              full_name: name,
              username,
              referral_code:
                localStorage.getItem("novin.referral") || undefined,
            },
          },
        });
        if (error) throw error;
        if (data.session) setSigned(true);
        else
          setMessage(
            s(
              "برای تایید حساب، ایمیل خود را بررسی کنید.",
              "Check your email to confirm your account.",
            ),
          );
      }
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <main
      dir={fa ? "rtl" : "ltr"}
      className="auth-welcome min-h-dvh bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white relative overflow-x-hidden"
    >
      <Helmet>
        <title>
          {s(
            "ورود و ثبت‌نام | نوین وی‌دی‌اس",
            "Sign in and register | NovinVDS",
          )}
        </title>
      </Helmet>
      <div className="auth-welcome-glow" aria-hidden="true" />
      <header className="relative z-10 max-w-6xl mx-auto px-5 py-5 flex items-center justify-between gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-600"
        >
          {fa ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          <span>{s("بازگشت به صفحه اصلی", "Back to home")}</span>
        </Link>
        <div className="flex items-center gap-1">
          <LanguageControl />
          <Button
            variant="ghost"
            size="icon"
            onClick={theme.toggleTheme}
            aria-label={s("تغییر پوسته", "Toggle theme")}
          >
            {theme.theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>
      </header>
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-7 lg:pt-7">
        <div className="grid md:grid-cols-[1.05fr_.95fr] overflow-hidden rounded-[28px] border border-slate-200/80 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-[0_24px_100px_-45px_rgba(30,64,175,.4)]">
          <section className="px-6 py-8 sm:px-10 sm:py-8 md:px-7 lg:px-12 lg:py-10">
            <Link
              to="/"
              aria-label="NovinVDS"
              className="inline-flex rounded-lg bg-white py-2 px-1"
            >
              <BrandLogo className="h-9 w-auto" />
            </Link>
            <div className="mt-5">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-300 mb-3">
                {s("فضای کار شما در نوین وی‌دی‌اس", "Your NovinVDS workspace")}
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold leading-relaxed">
                {signed
                  ? s("یک قدم تا ورود امن", "One step to secure access")
                  : mode === "login"
                    ? s("خوش آمدید!", "Welcome back!")
                    : s("حساب شما، شروع تازه", "Your account. A fresh start.")}
              </h1>
              <p className="text-sm leading-7 mt-3 text-muted-foreground">
                {signed
                  ? s(
                      "تأیید دومرحله‌ای حساب را تکمیل کنید.",
                      "Complete your account verification.",
                    )
                  : mode === "login"
                    ? s(
                        "وارد شوید و مدیریت سرویس‌ها را از همان‌جا که بودید ادامه دهید.",
                        "Sign in and pick up where you left off.",
                      )
                    : s(
                        "اطلاعاتتان را وارد کنید تا فضای مدیریت سرویس‌های شما ساخته شود.",
                        "Enter your details to create your service workspace.",
                      )}
              </p>
            </div>
            <div className="mt-5">
              {signed ? (
                <AccountChallenge onVerified={go} />
              ) : (
                <>
                  <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-5">
                    {[
                      ["login", "ورود", "Sign in"],
                      ["register", "ثبت نام", "Register"],
                    ].map(([id, fa, en]) => (
                      <Button
                        key={id}
                        variant={mode === id ? "default" : "ghost"}
                        className="rounded-lg transition-none"
                        onClick={() => {
                          setMode(id);
                          setMessage("");
                          setPassword("");
                          setConfirm("");
                        }}
                      >
                        {s(fa, en)}
                      </Button>
                    ))}
                  </div>
                  <form onSubmit={submit} className="space-y-4">
                    {mode === "register" && (
                      <>
                        <Label className="block">
                          {s("نام و نام خانوادگی", "Full name")}
                          <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-2 h-12 rounded-xl border-slate-200 bg-slate-50/60 dark:border-slate-700 dark:bg-slate-900"
                          />
                        </Label>
                        <Label className="block">
                          {s("نام کاربری", "Username")}
                          <Input
                            dir="ltr"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            pattern="[A-Za-z0-9_]{3,32}"
                            required
                            className="mt-2 h-12 rounded-xl border-slate-200 bg-slate-50/60 dark:border-slate-700 dark:bg-slate-900"
                          />
                        </Label>
                      </>
                    )}
                    <Label className="block">
                      {s("ایمیل", "Email")}
                      <Input
                        type="email"
                        dir="ltr"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-2 h-12 rounded-xl border-slate-200 bg-slate-50/60 dark:border-slate-700 dark:bg-slate-900"
                      />
                    </Label>
                    <Label className="block">
                      {s("رمز عبور", "Password")}
                      <div className="relative mt-2">
                        <Input
                          type={show ? "text" : "password"}
                          autoComplete={
                            mode === "login"
                              ? "current-password"
                              : "new-password"
                          }
                          minLength={mode === "register" ? 12 : 1}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pe-12 h-12 rounded-xl border-slate-200 bg-slate-50/60 dark:border-slate-700 dark:bg-slate-900"
                        />
                        <button
                          type="button"
                          className="absolute end-3 top-3.5 text-muted-foreground"
                          onClick={() => setShow((v) => !v)}
                          aria-label={s(
                            "نمایش یا پنهان‌کردن رمز",
                            "Show or hide password",
                          )}
                        >
                          {show ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </Label>
                    {mode === "register" && (
                      <>
                        <Label className="block">
                          {s("تکرار رمز عبور", "Confirm password")}
                          <Input
                            type="password"
                            autoComplete="new-password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                            className="mt-2 h-12 rounded-xl border-slate-200 bg-slate-50/60 dark:border-slate-700 dark:bg-slate-900"
                          />
                        </Label>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={terms}
                            onChange={(e) => setTerms(e.target.checked)}
                            required
                          />
                          {s(
                            "شرایط خدمات را می‌پذیرم.",
                            "I accept the terms of service.",
                          )}
                        </label>
                      </>
                    )}
                    {mode === "login" && (
                      <Link
                        className="block text-sm text-primary"
                        to="/recover"
                      >
                        {s(
                          "رمز، نام کاربری یا کد دو مرحله‌ای را فراموش کرده‌اید؟",
                          "Forgot your password, username or two-step code?",
                        )}
                      </Link>
                    )}
                    <p role="alert" className="text-sm text-destructive">
                      {message}
                    </p>
                    <Button
                      className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 font-bold"
                      disabled={busy}
                    >
                      {mode === "login"
                        ? s("ورود به پنل", "Sign in")
                        : s("ایجاد حساب", "Create account")}
                    </Button>
                  </form>
                </>
              )}
            </div>
            <div className="mt-7 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-start gap-2 text-xs text-muted-foreground leading-6">
              <ShieldCheck
                size={17}
                className="shrink-0 text-emerald-500 mt-1"
              />
              <p>
                {s(
                  "رمز عبور و کد ورودتان را در اختیار دیگران قرار ندهید. بازیابی دسترسی فقط از مسیر رسمی حساب انجام می‌شود.",
                  "Keep your password and verification code private. Recover access through the official account flow.",
                )}
              </p>
            </div>
          </section>
          <aside className="hidden md:flex relative flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-950 text-white p-6 lg:p-10 xl:p-12">
            <div
              className="absolute -top-24 -end-28 w-80 h-80 rounded-full border-[45px] border-white/5"
              aria-hidden="true"
            />
            <div className="relative">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs">
                {s("پنل یکپارچه خدمات", "One connected workspace")}
              </span>
              <h2 className="mt-6 text-3xl xl:text-4xl font-extrabold leading-[1.65]">
                {s("همه‌چیز،", "Everything,")}
                <br />
                <span className="text-blue-200">
                  {s("در کنترل شما.", "in your control.")}
                </span>
              </h2>
              <p className="text-blue-100/80 text-sm leading-8 mt-4 max-w-sm">
                {s(
                  "از اولین دامنه تا زیرساخت کسب‌وکارتان؛ سرویس‌ها، پرداخت‌ها و پشتیبانی را کنار هم مدیریت کنید.",
                  "From your first domain to your business infrastructure. Manage services, billing and support together.",
                )}
              </p>
            </div>
            <div className="relative my-3 flex justify-center">
              <AuthScene />
            </div>
            <div className="relative">
              <div className="flex flex-wrap gap-2">
                {[
                  [Globe, s("میزبانی و دامنه", "Hosting & domains")],
                  [Server, s("سرور و زیرساخت", "Servers & infrastructure")],
                  [Headphones, s("مرکز پشتیبانی", "Support center")],
                ].map(([Icon, label], i) => {
                  const I = Icon as typeof Server;
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs"
                    >
                      <I size={15} className="text-blue-200" />
                      {String(label)}
                    </span>
                  );
                })}
              </div>
              <p className="text-[11px] text-blue-200/60 mt-6">
                NOVINVDS · YOUR CLOUD SPACE
              </p>
            </div>
          </aside>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          {s(
            "نوین وی‌دی‌اس · خدمات ابری، با کنترل شما",
            "NovinVDS · Cloud services, in your control",
          )}
        </p>
      </div>
    </main>
  );
}
