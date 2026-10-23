import { useEffect, useState } from "react";
import {
  Shield,
  Lock,
  Bell,
  Monitor,
  Clock,
  KeyRound,
  Mail,
  LogOut,
  Info,
} from "lucide-react";
import { usePanelData } from "@/contexts/PanelDataContext";
import { supabase } from "@/integrations/supabase/client";
import { usePanelCopy } from "./PanelPrimitives";
import AccountSecuritySettings from "./AccountSecuritySettings";
import AuthCaptcha from "@/components/AuthCaptcha";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SecurityCenterPage() {
  const { s, fa } = usePanelCopy();
  const { preview, data, savePreferences } = usePanelData();
  const [session, setSession] = useState<{
    expiresAt?: number;
    lastSignIn?: string;
    email?: string;
  } | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmRevoke, setConfirmRevoke] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  useEffect(() => {
    if (preview) return;
    let active = true;
    void Promise.all([supabase.auth.getSession(), supabase.auth.getUser()])
      .then(([current, user]) => {
        if (!active) return;
        if (
          current.error ||
          user.error ||
          !current.data.session ||
          !user.data.user
        ) {
          setMessage(
            s(
              "دریافت اطلاعات نشست ممکن نشد. دوباره تلاش کنید.",
              "Session details could not be retrieved. Please try again.",
            ),
          );
          return;
        }
        setSession({
          expiresAt: current.data.session.expires_at,
          lastSignIn: user.data.user.last_sign_in_at,
          email: user.data.user.email,
        });
      })
      .catch(() => {
        if (active)
          setMessage(
            s(
              "اطلاعات حساب در دسترس نیست.",
              "Account details are unavailable.",
            ),
          );
      });
    return () => {
      active = false;
    };
  }, [preview, fa]);
  async function run(task: () => Promise<void>) {
    setBusy(true);
    setMessage("");
    try {
      await task();
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  function date(value?: string | number) {
    return value
      ? new Date(value).toLocaleString(fa ? "fa-IR" : "en-GB")
      : s("اطلاعات تاییدشده موجود نیست", "No verified data available");
  }
  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-gradient-to-l from-blue-600 to-indigo-700 text-white p-6 flex gap-4 items-center">
        <Shield size={38} className="shrink-0" />
        <div>
          <h2 className="text-xl font-extrabold">
            {s("مرکز امنیت حساب", "Account security center")}
          </h2>
          <p className="text-sm text-blue-100 mt-2">
            {s(
              "مدیریت رمز عبور، تایید دومرحله‌ای و دسترسی‌های حساب",
              "Manage your password, two-step verification and account access",
            )}
          </p>
        </div>
      </div>
      {preview && (
        <p className="flex gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <Info size={18} className="shrink-0" />
          {s(
            "پیش‌نمایش تنظیمات امنیت؛ وضعیت واقعی عوامل امنیتی، نشست‌ها و سوابق ورود پس از اتصال حساب دریافت می‌شود.",
            "Security settings preview. Actual verification factors, sessions and sign-in records require a connected account.",
          )}
        </p>
      )}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {[
          [
            Lock,
            "رمز عبور",
            "Password",
            "بازیابی امن از طریق ایمیل",
            "Secure email recovery",
            "text-blue-500 bg-blue-500/10",
          ],
          [
            Shield,
            "تایید دومرحله‌ای",
            "Two-step verification",
            "نرم‌افزار رمزساز و ایمیل",
            "Authenticator app and email",
            "text-emerald-500 bg-emerald-500/10",
          ],
          [
            Monitor,
            "مدیریت نشست‌ها",
            "Session management",
            "بررسی دسترسی و خروج دستگاه‌ها",
            "Review access and sign out devices",
            "text-violet-500 bg-violet-500/10",
          ],
          [
            Clock,
            "فعالیت‌های اخیر",
            "Recent activity",
            "بررسی اطلاعات آخرین ورود",
            "Review the latest sign-in",
            "text-amber-500 bg-amber-500/10",
          ],
        ].map(([Icon, title, en, desc, descEn, color]) => {
          const I = Icon as typeof Lock;
          return (
            <div key={String(en)} className="rounded-2xl border bg-card p-4">
              <span className={"inline-flex rounded-xl p-2 mb-3 " + color}>
                <I size={21} />
              </span>
              <h3 className="font-bold text-sm">
                {s(String(title), String(en))}
              </h3>
              <p className="text-xs text-muted-foreground mt-2">
                {s(String(desc), String(descEn))}
              </p>
            </div>
          );
        })}
      </div>
      <Tabs defaultValue="settings" dir={fa ? "rtl" : "ltr"}>
        <TabsList className="flex flex-wrap h-auto gap-1 w-full justify-start p-1 mb-4">
          <TabsTrigger value="settings">
            {s("تنظیمات امنیت", "Security settings")}
          </TabsTrigger>
          <TabsTrigger value="activity">
            {s("فعالیت‌های اخیر", "Recent activity")}
          </TabsTrigger>
          <TabsTrigger value="sessions">
            {s("نشست‌های فعال", "Active sessions")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="settings" className="space-y-5">
          <section className="rounded-2xl border bg-card p-5 space-y-4">
            <div className="flex gap-3 items-start">
              <Lock className="text-blue-500 shrink-0" />
              <div>
                <h3 className="font-bold">
                  {s("تغییر رمز عبور", "Change password")}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {s(
                    "لینک امن تعیین رمز جدید به ایمیل تاییدشده حساب شما ارسال می‌شود.",
                    "A secure password reset link is sent to your verified account email.",
                  )}
                </p>
              </div>
            </div>
            {!preview && session?.email && (
              <AuthCaptcha onToken={setCaptchaToken} reset={captchaReset} />
            )}
            <Button
              disabled={
                busy || (!preview && (!session?.email || !captchaToken))
              }
              variant="outline"
              onClick={() =>
                run(async () => {
                  if (preview) {
                    setMessage(
                      s(
                        "در پیش‌نمایش ایمیلی ارسال نمی‌شود. تغییر رمز به حساب واقعی نیاز دارد.",
                        "Preview does not send email. Password changes require a real account.",
                      ),
                    );
                    return;
                  }
                  try {
                    const { error } = await supabase.auth.resetPasswordForEmail(
                      session!.email!,
                      {
                        redirectTo: location.origin + "/reset-password",
                        captchaToken,
                      },
                    );
                    if (error) throw error;
                  } finally {
                    setCaptchaToken("");
                    setCaptchaReset((v) => v + 1);
                  }
                  setMessage(
                    s(
                      "لینک تعیین رمز جدید به ایمیل حساب ارسال شد.",
                      "A password reset link was sent to your account email.",
                    ),
                  );
                })
              }
            >
              <Mail size={16} className="me-2" />
              {s("ارسال لینک تغییر رمز", "Send password reset link")}
            </Button>
          </section>
          <AccountSecuritySettings />
          <section className="rounded-2xl border bg-card p-5 space-y-5">
            <div className="flex justify-between gap-4 items-center">
              <div className="flex gap-3">
                <Bell className="text-amber-500 shrink-0" />
                <div>
                  <h3 className="font-bold">
                    {s("اطلاع‌رسانی ورود", "Sign-in alerts")}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {s(
                      "ترجیح دریافت اعلان ورود جدید؛ با تنظیمات اعلان حساب هماهنگ است.",
                      "Your new sign-in notification preference, shared with account notification settings.",
                    )}
                  </p>
                </div>
              </div>
              <Switch
                aria-label={s("اطلاع‌رسانی ورود", "Sign-in alerts")}
                checked={data.preferences.login}
                disabled={busy}
                onCheckedChange={(login) =>
                  run(async () => {
                    await savePreferences({ ...data.preferences, login });
                    setMessage(
                      preview
                        ? s(
                            "ترجیح اعلان فقط در پیش‌نمایش ذخیره شد.",
                            "Alert preference saved in preview only.",
                          )
                        : s(
                            "ترجیح اعلان ورود ذخیره شد.",
                            "Sign-in alert preference saved.",
                          ),
                    );
                  })
                }
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {s(
                "ارسال اعلان واقعی به اتصال رویدادهای ورود و سرویس ایمیل نیاز دارد.",
                "Delivering actual alerts requires sign-in event integration and an email service.",
              )}
            </p>
          </section>
          <section className="rounded-2xl border bg-card p-5 flex flex-wrap justify-between gap-4 items-center">
            <div className="flex gap-3">
              <KeyRound className="text-violet-500 shrink-0" />
              <div>
                <h3 className="font-bold">{s("کلیدهای API", "API keys")}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {s(
                    "صدور و لغو کلید پس از اتصال سرویس مدیریت دسترسی فعال می‌شود.",
                    "Key creation and revocation require an access management service.",
                  )}
                </p>
              </div>
            </div>
            <Button variant="outline" disabled>
              {s("نیازمند اتصال سرویس", "Service connection required")}
            </Button>
          </section>
        </TabsContent>
        <TabsContent value="activity">
          <section className="rounded-2xl border bg-card p-5 space-y-4">
            <h3 className="font-bold flex gap-2">
              <Clock className="text-amber-500" />
              {s("آخرین ورود حساب", "Latest account sign-in")}
            </h3>
            <p className="text-sm">{date(session?.lastSignIn)}</p>
            <p className="text-sm text-muted-foreground">
              {s(
                "تاریخچه کامل ورودهای موفق و ناموفق و IP دستگاه‌ها به گزارش واقعی سرویس احراز هویت نیاز دارد.",
                "Full successful and failed sign-in history and device IPs require actual authentication audit records.",
              )}
            </p>
          </section>
        </TabsContent>
        <TabsContent value="sessions">
          <section className="rounded-2xl border bg-card p-5 space-y-4">
            <h3 className="font-bold flex gap-2">
              <Monitor className="text-violet-500" />
              {s("مدیریت نشست‌های فعال", "Manage active sessions")}
            </h3>
            <div className="rounded-xl bg-violet-500/5 border border-violet-500/20 p-4 text-sm space-y-2">
              <p>
                {session
                  ? s("نشست جاری حساب", "Current account session")
                  : s("نشست واقعی متصل نیست", "No real session connected")}
              </p>
              {session?.expiresAt && (
                <p>
                  {s("اعتبار توکن جاری تا: ", "Current token expires: ")}
                  {date(session.expiresAt * 1000)}
                </p>
              )}
              <p className="text-muted-foreground">
                {s(
                  "فهرست و مشخصات دیگر دستگاه‌ها پس از اتصال گزارش نشست‌ها نمایش داده می‌شود.",
                  "Other device details will be displayed after session reporting is connected.",
                )}
              </p>
            </div>
            <Button
              variant="outline"
              disabled={busy}
              onClick={() => {
                setConfirmRevoke(true);
                setMessage("");
              }}
            >
              <LogOut size={16} className="me-2" />
              {s("خروج سایر دستگاه‌ها", "Sign out other devices")}
            </Button>
            {confirmRevoke && (
              <div
                role="alert"
                className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 space-y-3"
              >
                <p className="text-sm">
                  {s(
                    "نشست همین دستگاه حفظ می‌شود. سایر نشست‌ها امکان تمدید دسترسی را از دست می‌دهند؛ توکن قبلی ممکن است تا پایان اعتبارش کار کند.",
                    "This device stays signed in. Other sessions lose refresh access; an existing access token may work until it expires.",
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="destructive"
                    disabled={busy}
                    onClick={() =>
                      run(async () => {
                        if (preview)
                          setMessage(
                            s(
                              "در پیش‌نمایش هیچ نشستی قطع نشد.",
                              "Preview did not revoke any sessions.",
                            ),
                          );
                        else {
                          const { error } = await supabase.auth.signOut({
                            scope: "others",
                          });
                          if (error) throw error;
                          setMessage(
                            s(
                              "دسترسی تمدید سایر نشست‌ها لغو شد.",
                              "Refresh access for other sessions was revoked.",
                            ),
                          );
                        }
                        setConfirmRevoke(false);
                      })
                    }
                  >
                    {s(
                      "تایید خروج سایر دستگاه‌ها",
                      "Confirm other device sign-out",
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    disabled={busy}
                    onClick={() => setConfirmRevoke(false)}
                  >
                    {s("انصراف", "Cancel")}
                  </Button>
                </div>
              </div>
            )}
          </section>
        </TabsContent>
      </Tabs>
      <p
        role="status"
        aria-live="polite"
        className="text-sm empty:hidden rounded-xl bg-blue-500/5 p-3"
      >
        {message}
      </p>
    </div>
  );
}
