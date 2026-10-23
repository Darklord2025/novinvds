import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  Globe,
  Headphones,
  KeyRound,
  Loader2,
  Mail,
  Moon,
  Server,
  ShieldCheck,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "@/contexts/ThemeContext";
import BrandLogo from "@/components/BrandLogo";
import LanguageControl from "@/components/LanguageControl";
import AuthScene from "@/components/AuthScene";
import AuthCaptcha from "@/components/AuthCaptcha";
import AccountChallenge from "@/components/AccountChallenge";
import { usePanelCopy } from "@/components/user-panel/PanelPrimitives";
import {
  ACTIVATION_KEY,
  activationCode,
  authDestination,
  pendingActivation,
  readActivation,
  resendRemaining,
  verifyAccountCode,
} from "@/lib/signup-activation";
import { localizedDigits } from "@/lib/localized-number";

const field =
  "mt-1.5 h-11 rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white dark:border-slate-700 dark:bg-slate-950/50 dark:focus:bg-slate-950 text-sm";
export default function Auth({ activation = false }: { activation?: boolean }) {
  const { s, fa } = usePanelCopy(),
    navigate = useNavigate(),
    theme = useTheme();
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
    [notice, setNotice] = useState(""),
    [signed, setSigned] = useState(false),
    [captchaToken, setCaptchaToken] = useState(""),
    [captchaReset, setCaptchaReset] = useState(0),
    [code, setCode] = useState("");
  const [pending, setPending] = useState(() =>
    readActivation(sessionStorage.getItem(ACTIVATION_KEY)),
  );
  const [now, setNow] = useState(Date.now());
  const [showResend, setShowResend] = useState(false);
  const submittingSignup = useRef(false),
    verifying = useRef(false),
    formArea = useRef<HTMLFieldSetElement>(null);
  const next =
    activation && pending
      ? pending.next
      : authDestination(new URLSearchParams(location.search).get("next"));
  const remaining = resendRemaining(pending?.sentAt || 0, now);
  const go = () => {
    if (next.startsWith("/.lovable/")) location.assign(next);
    else navigate(next, { replace: true });
  };
  const remember = (value: ReturnType<typeof pendingActivation>) => {
    setPending(value);
    sessionStorage.setItem(ACTIVATION_KEY, JSON.stringify(value));
  };
  useEffect(() => {
    let live = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (live) setSigned(!!data.session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        navigate("/reset-password");
        return;
      }
      if (!submittingSignup.current && !verifying.current) setSigned(!!session);
    });
    return () => {
      live = false;
      subscription.unsubscribe();
    };
  }, [navigate]);
  useEffect(() => {
    setMessage("");
    setNotice("");
    setCode("");
    setShowResend(false);
    setCaptchaToken("");
    setCaptchaReset((v) => v + 1);
    if (activation) setEmail(pending?.email || "");
  }, [activation]);
  useEffect(() => {
    if (showResend)
      formArea.current?.scrollTo({
        top: formArea.current.scrollHeight,
        behavior: "smooth",
      });
  }, [showResend]);
  useEffect(() => {
    if (!activation) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [activation]);
  function switchMode(id: string) {
    if (busy) return;
    setMode(id);
    setPassword("");
    setConfirm("");
    setShow(false);
    setTerms(false);
    setMessage("");
    setNotice("");
    setCaptchaToken("");
    setCaptchaReset((v) => v + 1);
    formArea.current?.scrollTo({ top: 0 });
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy || (!activation && !captchaToken)) return;
    setBusy(true);
    setMessage("");
    setNotice("");
    try {
      if (activation) {
        verifying.current = true;
        await verifyAccountCode(supabase.auth, email, code);
        sessionStorage.removeItem(ACTIVATION_KEY);
        sessionStorage.removeItem("novin.panel.deadline");
        setSigned(true);
        setCode("");
      } else if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
          options: { captchaToken },
        });
        if (error?.code === "email_not_confirmed") {
          remember(pendingActivation(email, next, Date.now(), false));
          navigate("/activate-account");
          return;
        }
        if (error) throw error;
        sessionStorage.removeItem("novin.panel.deadline");
        setSigned(true);
        setPassword("");
      } else {
        if (!terms || password !== confirm) {
          setMessage(
            s(
              "تکرار رمز و پذیرش شرایط را بررسی کنید.",
              "Check your password confirmation and accept the terms.",
            ),
          );
          return;
        }
        submittingSignup.current = true;
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            captchaToken,
            emailRedirectTo:
              location.origin + "/auth?next=" + encodeURIComponent(next),
            data: {
              full_name: name.trim(),
              username: username.trim(),
              referral_code:
                localStorage.getItem("novin.referral") || undefined,
            },
          },
        });
        if (error) throw error;
        setPassword("");
        setConfirm("");
        if (data.session) {
          // Email confirmation must be enabled on the server. Never pretend that a code was sent by an auto-confirm project.
          await supabase.auth.signOut({ scope: "local" });
          setSigned(false);
          setMessage(
            s(
              "فعال‌سازی ایمیل هنوز توسط سایت آماده نشده است. لطفاً با پشتیبانی تماس بگیرید.",
              "Email activation is not configured yet. Please contact support.",
            ),
          );
          return;
        }
        remember(pendingActivation(email, next));
        navigate("/activate-account");
      }
    } catch (error) {
      const id = (error as { code?: string }).code;
      setMessage(
        id === "over_email_send_rate_limit" || id === "over_request_rate_limit"
          ? s(
              "درخواست‌ها زیاد بوده است. کمی بعد دوباره تلاش کنید.",
              "Too many attempts. Please try again shortly.",
            )
          : id === "captcha_failed"
            ? s(
                "کپچا تأیید نشد. دوباره انجام دهید.",
                "CAPTCHA verification failed. Please retry.",
              )
            : activation
              ? s(
                  "کد نادرست یا منقضی شده است؛ کد جدید درخواست کنید.",
                  "The code is incorrect or expired. Request a new code.",
                )
              : mode === "login"
                ? s(
                    "ورود ممکن نشد. اطلاعات یا اتصال خود را بررسی کنید.",
                    "Unable to sign in. Check your details or connection.",
                  )
                : s(
                    "ثبت‌نام ممکن نشد. اطلاعات و اتصال خود را بررسی کنید یا از بازیابی حساب استفاده کنید.",
                    "Unable to register. Check your details and connection, or recover your existing account.",
                  ),
      );
    } finally {
      submittingSignup.current = false;
      verifying.current = false;
      setCaptchaToken("");
      setCaptchaReset((v) => v + 1);
      setBusy(false);
    }
  }
  async function resend() {
    if (busy || remaining || !captchaToken || !email) return;
    setBusy(true);
    setMessage("");
    setNotice("");
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email.trim(),
        options: {
          captchaToken,
          emailRedirectTo:
            location.origin + "/auth?next=" + encodeURIComponent(next),
        },
      });
      if (error) throw error;
      remember(pendingActivation(email, next));
      setNow(Date.now());
      setCode("");
      setNotice(
        s(
          "اگر حساب در انتظار تأیید باشد، کد جدید ارسال می‌شود. پوشهٔ هرزنامه را هم بررسی کنید.",
          "If the account is awaiting confirmation, a new code will be sent. Check your spam folder too.",
        ),
      );
    } catch {
      setMessage(
        s(
          "ارسال مجدد ممکن نشد. کمی بعد دوباره تلاش کنید.",
          "Unable to resend. Please try again shortly.",
        ),
      );
    } finally {
      setCaptchaToken("");
      setCaptchaReset((v) => v + 1);
      setBusy(false);
    }
  }
  return (
    <main
      dir={fa ? "rtl" : "ltr"}
      className="auth-welcome relative min-h-dvh overflow-x-hidden bg-[#f4f7fc] text-slate-900 dark:bg-slate-950 dark:text-white"
    >
      <Helmet>
        <title>
          {activation
            ? s("فعال‌سازی حساب | نوین وی‌دی‌اس", "Activate account | NovinVDS")
            : s(
                "ورود و ثبت‌نام | نوین وی‌دی‌اس",
                "Sign in and register | NovinVDS",
              )}
        </title>
      </Helmet>
      <div className="auth-welcome-glow" aria-hidden="true" />
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-blue-600"
        >
          {fa ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}{" "}
          {s("بازگشت به صفحه اصلی", "Back to home")}
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
      <div className="relative z-10 mx-auto max-w-6xl px-3 pb-5 sm:px-5 lg:pt-3">
        <div
          data-auth-shell
          className="auth-access-card grid h-[760px] md:h-[min(790px,calc(100dvh-112px))] md:min-h-[640px] md:grid-cols-[1.05fr_.95fr] overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_24px_90px_-35px_rgba(30,64,175,.24)] dark:border-slate-800 dark:bg-slate-900"
        >
          <section className="flex min-h-0 min-w-0 flex-col px-5 py-6 sm:px-9 md:px-6 lg:px-10 lg:py-8">
            <div data-auth-heading className="shrink-0">
              <Link
                to="/"
                aria-label="NovinVDS"
                className="inline-flex rounded-lg bg-white p-1"
              >
                <BrandLogo className="h-8 w-auto" />
              </Link>
              <h1 className="mt-4 text-2xl font-extrabold leading-relaxed sm:text-[26px]">
                {s("به نوین وی‌دی‌اس خوش آمدید", "Welcome to NovinVDS")}
              </h1>
              <p className="mt-1 text-xs leading-6 text-muted-foreground">
                {s(
                  "یک حساب برای مدیریت همهٔ سرویس‌های شما.",
                  "One account for all your services.",
                )}
              </p>
            </div>
            <div
              className="mt-5 mb-4 grid h-11 shrink-0 grid-cols-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-800"
              role="group"
              aria-label={s("ورود یا ثبت‌نام", "Sign in or register")}
            >
              {activation ? (
                <div className="col-span-2 flex items-center justify-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-300">
                  <Mail size={17} />
                  {s(
                    "فعال‌سازی حساب با ایمیل",
                    "Activate your account by email",
                  )}
                </div>
              ) : (
                [
                  ["login", "ورود به حساب", "Sign in"],
                  ["register", "ایجاد حساب", "Create account"],
                ].map(([id, f, en]) => (
                  <button
                    key={id}
                    type="button"
                    disabled={busy || signed}
                    aria-pressed={mode === id}
                    onClick={() => switchMode(id)}
                    className={
                      "rounded-lg text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 " +
                      (mode === id
                        ? "bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-blue-200"
                        : "text-slate-500 hover:text-blue-600 dark:text-slate-400")
                    }
                  >
                    {s(f, en)}
                  </button>
                ))
              )}
            </div>
            <div
              data-auth-form-area
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain pe-1 pb-1"
            >
              {signed ? (
                <AccountChallenge onVerified={go} />
              ) : (
                <form
                  onSubmit={submit}
                  className="flex h-full min-h-0 flex-col"
                >
                  <fieldset
                    ref={formArea}
                    disabled={busy}
                    className="min-h-0 min-w-0 flex-1 space-y-2 overflow-y-auto overscroll-contain pe-1 disabled:opacity-75"
                  >
                    {activation ? (
                      <>
                        <div className="mb-4 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 dark:border-blue-900 dark:bg-blue-950/30">
                          <div className="rounded-xl bg-blue-600 p-2.5 text-white">
                            <Mail size={21} />
                          </div>
                          <div>
                            <h2 className="text-sm font-bold">
                              {s("ایمیلتان را تأیید کنید", "Verify your email")}
                            </h2>
                            <p className="mt-1 text-xs leading-6 text-muted-foreground">
                              {s(
                                "کد فعال‌سازی ایمیل خود را وارد کنید. پس از تأیید، به‌صورت خودکار وارد پنل می‌شوید.",
                                "Enter your email activation code. You will continue to your panel automatically after verification.",
                              )}
                            </p>
                          </div>
                        </div>
                        <Label className="block text-xs">
                          {s("ایمیل ثبت‌نام", "Registration email")}
                          <Input
                            className={field}
                            type="email"
                            dir="ltr"
                            autoComplete="email"
                            value={email}
                            required
                            maxLength={254}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setCode("");
                              setMessage("");
                            }}
                          />
                        </Label>
                        <Label className="block text-xs">
                          {s(
                            "کد شش‌رقمی فعال‌سازی",
                            "Six-digit activation code",
                          )}
                          <Input
                            className={
                              field +
                              " h-14 text-center font-mono text-2xl tracking-[.4em]"
                            }
                            dir="ltr"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            pattern="[0-9۰-۹٠-٩]{6}"
                            maxLength={6}
                            value={localizedDigits(code, fa)}
                            onChange={(e) =>
                              setCode(activationCode(e.target.value))
                            }
                            required
                          />
                        </Label>
                      </>
                    ) : (
                      <>
                        {mode === "register" && (
                          <div className="grid grid-cols-2 gap-3">
                            <Label className="block text-xs">
                              {s("نام و نام خانوادگی", "Full name")}
                              <Input
                                className={field}
                                value={name}
                                autoComplete="name"
                                maxLength={100}
                                onChange={(e) => setName(e.target.value)}
                                required
                              />
                            </Label>
                            <Label className="block text-xs">
                              {s("نام کاربری", "Username")}
                              <Input
                                className={field}
                                dir="ltr"
                                autoComplete="username"
                                value={username}
                                pattern="[A-Za-z0-9_]{3,32}"
                                title={s(
                                  "۳ تا ۳۲ حرف انگلیسی، عدد یا زیرخط",
                                  "3–32 letters, numbers or underscores",
                                )}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                              />
                            </Label>
                          </div>
                        )}
                        <Label className="block text-xs">
                          {s("آدرس ایمیل", "Email address")}
                          <div className="relative" dir="ltr">
                            <Input
                              className={field + " ps-10"}
                              type="email"
                              dir="ltr"
                              placeholder="you@example.com"
                              autoComplete="email"
                              maxLength={254}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <Mail
                              size={16}
                              className="pointer-events-none absolute start-3 top-3.5 text-slate-400"
                            />
                          </div>
                        </Label>
                        <div
                          className={
                            mode === "register" ? "grid grid-cols-2 gap-3" : ""
                          }
                        >
                          <Label className="block text-xs">
                            {s("رمز عبور", "Password")}
                            <div className="relative">
                              <Input
                                className={field + " pe-10"}
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
                              />
                              <button
                                type="button"
                                className="absolute end-0 top-0 flex h-11 w-10 items-center justify-center rounded-xl text-slate-400 hover:text-blue-600"
                                onClick={() => setShow((v) => !v)}
                                aria-label={s(
                                  "نمایش یا پنهان‌کردن رمز",
                                  "Show or hide password",
                                )}
                              >
                                {show ? (
                                  <EyeOff size={17} />
                                ) : (
                                  <Eye size={17} />
                                )}
                              </button>
                            </div>
                          </Label>
                          {mode === "register" && (
                            <Label className="block text-xs">
                              {s("تکرار رمز عبور", "Confirm password")}
                              <Input
                                className={field}
                                type="password"
                                autoComplete="new-password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                required
                              />
                            </Label>
                          )}
                        </div>
                        {mode === "register" ? (
                          <>
                            <p className="text-[11px] text-muted-foreground">
                              {s(
                                "رمز عبور حداقل ۱۲ کاراکتر باشد.",
                                "Use at least 12 characters for your password.",
                              )}
                            </p>
                            <label className="flex items-center gap-2 text-xs leading-5">
                              <input
                                type="checkbox"
                                className="h-4 w-4 accent-blue-600"
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
                        ) : (
                          <Link
                            className="inline-flex items-center gap-1 text-xs leading-6 text-blue-600 dark:text-blue-300"
                            to="/recover"
                          >
                            <KeyRound size={13} />
                            {s(
                              "بازیابی رمز، نام کاربری یا ورود دومرحله‌ای",
                              "Recover password, username or two-step access",
                            )}
                          </Link>
                        )}
                      </>
                    )}
                    {(!activation || showResend) && (
                      <AuthCaptcha
                        onToken={setCaptchaToken}
                        reset={captchaReset}
                      />
                    )}
                    {message && (
                      <p
                        role="alert"
                        className="rounded-lg bg-red-50 p-2 text-xs leading-6 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                      >
                        {message}
                      </p>
                    )}
                    {notice && (
                      <p
                        role="status"
                        className="text-xs leading-6 text-emerald-700 dark:text-emerald-300"
                      >
                        {notice}
                      </p>
                    )}
                  </fieldset>
                  <div className="shrink-0 space-y-2 pt-3">
                    <Button
                      type="submit"
                      className="h-12 w-full gap-2 rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                      disabled={
                        busy ||
                        (!activation && !captchaToken) ||
                        (activation && code.length !== 6)
                      }
                    >
                      {busy ? (
                        <Loader2 size={17} className="animate-spin" />
                      ) : activation ? (
                        <Check size={17} />
                      ) : (
                        <ShieldCheck size={17} />
                      )}{" "}
                      {activation
                        ? s("تأیید و ورود به پنل", "Verify and open panel")
                        : mode === "login"
                          ? s("ورود به پنل", "Open your panel")
                          : s(
                              "ثبت‌نام و دریافت کد",
                              "Register and receive code",
                            )}
                      {!busy &&
                        (fa ? (
                          <ArrowLeft className="ms-auto" size={17} />
                        ) : (
                          <ArrowRight className="ms-auto" size={17} />
                        ))}
                    </Button>
                    {activation && (
                      <div className="space-y-2">
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-auto w-full whitespace-normal text-xs leading-6"
                          disabled={
                            busy ||
                            remaining > 0 ||
                            (showResend && !captchaToken) ||
                            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
                          }
                          onClick={() => {
                            if (!showResend) setShowResend(true);
                            else void resend();
                          }}
                        >
                          {remaining
                            ? s("ارسال مجدد در ", "Resend in ") +
                              localizedDigits(remaining, fa) +
                              s(" ثانیه", " seconds")
                            : s(
                                showResend
                                  ? "ارسال کد جدید"
                                  : "کد را دریافت نکردم؛ ارسال مجدد",
                                showResend
                                  ? "Send a new code"
                                  : "No code received? Resend",
                              )}
                        </Button>
                        <Link
                          className="block text-center text-xs text-blue-600 dark:text-blue-300"
                          to={"/auth?next=" + encodeURIComponent(next)}
                        >
                          {s(
                            "بازگشت به ورود یا ثبت‌نام",
                            "Back to sign in or register",
                          )}
                        </Link>
                      </div>
                    )}
                  </div>
                </form>
              )}
            </div>
            <div className="mt-4 flex shrink-0 items-center gap-2 border-t border-slate-100 pt-3 text-[10px] leading-5 text-muted-foreground dark:border-slate-800">
              <ShieldCheck size={15} className="shrink-0 text-emerald-500" />
              {s(
                "رمز عبور و کد ورودتان را در اختیار دیگران قرار ندهید.",
                "Keep your password and verification code private.",
              )}
            </div>
          </section>
          <aside
            data-auth-aside
            className="relative hidden min-h-0 flex-col justify-between overflow-hidden bg-[#0e245a] p-7 text-white md:flex lg:p-10"
          >
            <div
              aria-hidden="true"
              className="absolute -end-32 -top-28 h-[490px] w-[490px] rounded-full bg-blue-500/25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-32 -start-24 h-80 w-80 rounded-full border-[60px] border-blue-400/10"
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/20 bg-white/5 px-3 py-2 text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                {s(
                  "از یک شروع ساده، تا یک زیرساخت بزرگ",
                  "FROM YOUR FIRST IDEA TO YOUR NEXT BIG THING",
                )}
              </span>
              <h2 className="mt-7 text-3xl font-extrabold leading-[1.7] lg:text-[38px]">
                {s("فضای رشد شما،", "Room to grow.")}
                <br />
                <span className="text-blue-300">
                  {s("همیشه در دسترس.", "Always within reach.")}
                </span>
              </h2>
              <p className="mt-3 max-w-sm text-xs leading-7 text-blue-100/70">
                {s(
                  "سرویس‌ها، پرداخت‌ها و پشتیبانی؛ همه در یک فضای مرتب و ساده، برای تمرکز روی کارهای مهم‌تر.",
                  "Services, billing and support in one clear workspace. More room to focus on what matters.",
                )}
              </p>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center py-2 [&>svg]:h-full [&>svg]:max-h-full [&>svg]:w-full">
              <AuthScene />
            </div>
            <div className="relative space-y-2">
              {[
                [
                  Server,
                  s("زیرساخت و میزبانی", "Infrastructure & hosting"),
                  "text-blue-300 bg-blue-400/15",
                ],
                [
                  Globe,
                  s("دامنه‌های کسب‌وکار شما", "Your business domains"),
                  "text-cyan-300 bg-cyan-400/15",
                ],
                [
                  Headphones,
                  s(
                    "پشتیبانی در کنار سرویس‌ها",
                    "Support alongside your services",
                  ),
                  "text-violet-300 bg-violet-400/15",
                ],
              ].map(([Icon, label, color], i) => {
                const I = Icon as typeof Server;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.035] px-3 py-2"
                  >
                    <span className={"rounded-lg p-2 " + color}>
                      <I size={16} />
                    </span>
                    <span className="text-xs text-blue-50">
                      {String(label)}
                    </span>
                    <ChevronRight
                      size={14}
                      className="ms-auto text-blue-200/40"
                    />
                  </div>
                );
              })}
              <p className="pt-3 text-[9px] tracking-[.22em] text-blue-200/40">
                NOVINVDS · YOUR CLOUD SPACE
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
