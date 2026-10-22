import { useTheme } from "@/contexts/ThemeContext";
import { User, Zap, Sun, Moon, ArrowRight, ArrowLeft } from "lucide-react";
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
      className="auth-classic min-h-dvh bg-slate-950 text-white relative overflow-x-hidden"
    >
      <Helmet><title>{s('ورود و ثبت‌نام | نوین وی‌دی‌اس','Sign in and register | NovinVDS')}</title></Helmet>
      <div aria-hidden="true" className="auth-orb auth-orb-one" />
      <div aria-hidden="true" className="auth-orb auth-orb-two" />
      <header className="relative z-10 mx-auto max-w-6xl px-5 py-6 flex items-center justify-between gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"
        >
          {fa ? <ArrowRight size={17} /> : <ArrowLeft size={17} />}
          <span>{s("بازگشت به صفحه اصلی", "Back to home")}</span>
        </Link>
        <div className="flex items-center gap-2">
          <LanguageControl />
          <Button
            variant="ghost"
            size="icon"
            onClick={theme.toggleTheme}
            aria-label={s("تغییر پوسته", "Toggle theme")}
          >
            {theme.theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </Button>
        </div>
      </header>
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-12 grid lg:grid-cols-2 items-center gap-10 lg:gap-16">
        <section className="auth-classic-card rounded-3xl overflow-hidden border border-white/10 bg-card text-card-foreground shadow-2xl">
          <header className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white p-7 sm:p-9 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 auth-dot-pattern" />
            <div className="relative">
              <div className="rounded-2xl bg-white/15 mx-auto w-16 h-16 grid place-items-center mb-5">
                <User size={32} />
              </div>
              <h1 className="font-extrabold text-2xl">
                {signed
                  ? s("تأیید ورود به حساب", "Verify account access")
                  : mode === "login"
                    ? s("ورود به حساب کاربری", "Sign in to your account")
                    : s("ایجاد حساب کاربری", "Create your account")}
              </h1>
              <p className="text-blue-100 text-sm mt-3">
                {mode === "login"
                  ? s(
                      "خوش آمدید! مدیریت سرویس‌ها از اینجا شروع می‌شود.",
                      "Welcome back. Your services are right here.",
                    )
                  : s(
                      "به خانواده نوین وی‌دی‌اس بپیوندید.",
                      "Join the NovinVDS community.",
                    )}
              </p>
            </div>
          </header>
          <div className="p-6 sm:p-8">
            {signed ? (
              <AccountChallenge onVerified={go} />
            ) : (
              <>
                <div className="grid grid-cols-2 p-1 bg-muted rounded-xl my-7">
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
                <form onSubmit={submit} className="space-y-5">
                  {mode === "register" && (
                    <>
                      <Label className="block">
                        {s("نام و نام خانوادگی", "Full name")}
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="mt-2"
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
                          className="mt-2"
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
                      className="mt-2"
                    />
                  </Label>
                  <Label className="block">
                    {s("رمز عبور", "Password")}
                    <div className="relative mt-2">
                      <Input
                        type={show ? "text" : "password"}
                        autoComplete={
                          mode === "login" ? "current-password" : "new-password"
                        }
                        minLength={mode === "register" ? 12 : 1}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pe-12"
                      />
                      <button
                        type="button"
                        className="absolute end-3 top-3"
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
                          className="mt-2"
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
                    <Link className="block text-sm text-primary" to="/recover">
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
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600"
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
        </section>
        <aside className="space-y-7 lg:py-10 text-center lg:text-start">
          <div className="inline-flex rounded-2xl bg-white p-5">
            <BrandLogo className="h-12" />
          </div>
          <div>
            <p className="text-sm text-blue-300 tracking-wide mb-3">
              NOVINVDS / CLIENT AREA
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-relaxed">
              {s("به نوین وی‌دی‌اس خوش آمدید", "Welcome to NovinVDS")}
            </h2>
            <p className="text-slate-300 leading-8 mt-5">
              {s(
                "سرویس‌های میزبانی، سرورها، دامنه‌ها و امور مالی را با خیال آسوده در یک پنل مدیریت کنید.",
                "Manage hosting, servers, domains and billing together in one place.",
              )}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              [
                Server,
                s("سرورهای قدرتمند", "Powerful servers"),
                s("منابع متناسب با نیاز شما", "Resources for your workload"),
              ],
              [
                ShieldCheck,
                s("دسترسی امن", "Secure access"),
                s(
                  "تأیید ورود با نرم‌افزار و ایمیل",
                  "Authenticator and email verification",
                ),
              ],
              [
                Zap,
                s("کنترل آسان", "Simple controls"),
                s(
                  "مسیر روشن از سفارش تا مدیریت",
                  "From ordering to service management",
                ),
              ],
              [
                Headphones,
                s("پشتیبانی یکپارچه", "Connected support"),
                s(
                  "تیکت‌ها و راهنما در کنار سرویس",
                  "Tickets and guides alongside services",
                ),
              ],
            ].map(([Icon, title, desc], i) => {
              const I = Icon as typeof Server;
              return (
                <div
                  key={i}
                  className="auth-feature text-start rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <I className="text-blue-300 mb-3" size={23} />
                  <h3 className="font-bold text-sm">{String(title)}</h3>
                  <p className="text-xs text-slate-400 leading-6 mt-2">
                    {String(desc)}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-slate-500">
            {s(
              "NovinVDS · خدمات ابری، با کنترل شما",
              "NovinVDS · Cloud services, in your control",
            )}
          </p>
        </aside>
      </div>
    </main>
  );
}
