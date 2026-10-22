import LegacyLocale from '@/components/LegacyLocale';
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: any; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: any; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: any; error: { message: string } | null }>;
};
const oauth = () => (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<any>(null);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError("درخواست اتصال نامعتبر است.");
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/auth?next=" + encodeURIComponent(next);
        return;
      }
      setEmail(sess.session.user.email ?? "");
      try {
        const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
        if (!active) return;
        if (error) return setError(error.message);
        const immediate = data?.redirect_url ?? data?.redirect_to;
        if (immediate && !data?.client) { window.location.href = immediate; return; }
        setDetails(data);
      } catch (e: any) {
        if (active) setError(e?.message ?? "خطا در دریافت اطلاعات");
      }
    })();
    return () => { active = false; };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    try {
      const { data, error } = approve
        ? await oauth().approveAuthorization(authorizationId)
        : await oauth().denyAuthorization(authorizationId);
      if (error) { setBusy(false); return setError(error.message); }
      const target = data?.redirect_url ?? data?.redirect_to;
      if (!target) { setBusy(false); return setError("پاسخی از سرور دریافت نشد."); }
      window.location.href = target;
    } catch (e: any) {
      setBusy(false);
      setError(e?.message ?? "خطا");
    }
  }

  const clientName = details?.client?.name ?? details?.client?.client_name ?? "یک برنامه";
  const scopes: string[] = String(details?.scope ?? details?.scopes ?? "").split(/[\s,]+/).filter(Boolean);

  return <LegacyLocale>{(
    <main dir="rtl" className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-6 space-y-4">
        {error ? (
          <p className="text-destructive">امکان بارگذاری این درخواست نیست: {error}</p>
        ) : !details ? (
          <p className="text-muted-foreground">در حال بارگذاری…</p>
        ) : (
          <>
            <h1 className="text-xl font-bold text-foreground">اتصال {clientName} به نوین وی‌دی‌اس</h1>
            {email && <p className="text-sm text-muted-foreground">وارد شده با: <span dir="ltr">{email}</span></p>}
            <p className="text-foreground">{clientName} می‌تواند ابزارهای فعال این سایت را به‌جای شما استفاده کند (مثلاً مشاهده سرویس‌های هاست شما).</p>
            {details?.redirect_uri && <p className="text-xs text-muted-foreground" dir="ltr">{details.redirect_uri}</p>}
            {scopes.length > 0 && (
              <ul className="text-sm list-disc pr-5 text-foreground">
                {scopes.map((s) => (
                  <li key={s}>{s === "email" ? "اشتراک ایمیل شما" : s === "profile" ? "اشتراک پروفایل پایه" : s === "openid" ? "تأیید هویت" : `دسترسی اضافه: ${s}`}</li>
                ))}
              </ul>
            )}
            <p className="text-xs text-muted-foreground">این اتصال، دسترسی‌ها و قوانین امنیتی حساب شما را دور نمی‌زند.</p>
            <div className="flex gap-2">
              <Button disabled={busy} onClick={() => decide(true)} className="flex-1">تأیید</Button>
              <Button disabled={busy} variant="outline" onClick={() => decide(false)} className="flex-1">لغو اتصال</Button>
            </div>
          </>
        )}
      </Card>
    </main>
  )}</LegacyLocale>;
}
