import { useEffect, useRef, useState } from "react";
import { usePanelCopy } from "@/components/user-panel/PanelPrimitives";
import { useTheme } from "@/contexts/ThemeContext";
import { captchaSiteKey } from "@/lib/signup-activation";
import { RotateCw, ShieldCheck } from "lucide-react";

type Turnstile = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}
let loading: Promise<Turnstile> | undefined;
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (loading) return loading;
  loading = new Promise<Turnstile>((resolve, reject) => {
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    const timer = window.setTimeout(() => fail(), 15000);
    const fail = () => {
      clearTimeout(timer);
      script.remove();
      loading = undefined;
      reject(Error("captcha_unavailable"));
    };
    script.onerror = fail;
    script.onload = () => {
      clearTimeout(timer);
      if (window.turnstile) resolve(window.turnstile);
      else fail();
    };
    document.head.appendChild(script);
  });
  return loading;
}
export default function AuthCaptcha({
  onToken,
  reset,
}: {
  onToken: (token: string) => void;
  reset: number;
}) {
  const { s, fa } = usePanelCopy();
  const { theme } = useTheme();
  const host = useRef<HTMLDivElement>(null);
  const callback = useRef(onToken);
  callback.current = onToken;
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  const [compact, setCompact] = useState(false);
  const sitekey = captchaSiteKey(
    import.meta.env.VITE_TURNSTILE_SITE_KEY,
    import.meta.env.DEV,
    location.hostname,
  );
  const test = /^[123]x0{10,}/i.test(sitekey);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const observer = new ResizeObserver(() =>
      setCompact(element.clientWidth < 300),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [sitekey]);
  useEffect(() => {
    let active = true,
      widget: string | undefined,
      api: Turnstile | undefined;
    callback.current("");
    setFailed(false);
    if (!sitekey) return;
    void loadTurnstile()
      .then((loaded) => {
        if (!active || !host.current) return;
        api = loaded;
        const clear = () => {
          if (active) callback.current("");
        };
        widget = api.render(host.current, {
          sitekey,
          theme,
          language: fa ? "fa" : "en",
          size: compact ? "compact" : "flexible",
          "response-field": false,
          callback: (token: string) => {
            if (active) {
              setFailed(false);
              callback.current(token);
            }
          },
          "expired-callback": clear,
          "timeout-callback": clear,
          "error-callback": () => {
            clear();
            if (active) setFailed(true);
          },
        });
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
      callback.current("");
      if (api && widget !== undefined) api.remove(widget);
    };
  }, [sitekey, theme, fa, reset, retry, compact]);
  return (
    <div
      className="auth-captcha min-h-[78px]"
      aria-label={s("بررسی امنیتی کپچا", "CAPTCHA security check")}
    >
      {!sitekey ? (
        <p
          role="alert"
          className="rounded-xl bg-amber-50 p-3 text-xs leading-6 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200"
        >
          <ShieldCheck className="inline me-1" size={14} />
          {s(
            "ورود امن هنوز آماده نیست. لطفاً با پشتیبانی تماس بگیرید.",
            "Secure sign-in is not ready. Please contact support.",
          )}
        </p>
      ) : (
        <div ref={host} dir="ltr" className="min-h-[65px] w-full" />
      )}
      {test && (
        <p className="text-[10px] text-muted-foreground">
          {s(
            "کپچای آزمایشی — فقط پیش‌نمایش محلی",
            "Test CAPTCHA · local preview only",
          )}
        </p>
      )}
      {failed && (
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-300"
          onClick={() => setRetry((v) => v + 1)}
        >
          <RotateCw size={13} />
          {s("کپچا بارگیری نشد؛ تلاش مجدد", "CAPTCHA unavailable. Try again")}
        </button>
      )}
    </div>
  );
}
