import { useState } from "react";
import { Gift, Copy, Sparkles } from "lucide-react";
import { usePanelData } from "@/contexts/PanelDataContext";
import { usePanelCopy } from "./PanelPrimitives";
import { Button } from "@/components/ui/button";
export default function ReferralReward() {
  const { data, action } = usePanelData(),
    { s, n, money } = usePanelCopy();
  const [busy, setBusy] = useState(false),
    [message, setMessage] = useState("");
  const reward = data.referralReward;
  if (!reward) return null;
  const coupon = reward.coupon;
  return (
    <section className="rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-rose-500 p-6 text-white space-y-4 relative overflow-hidden">
      <Gift className="absolute end-4 top-4 opacity-15 h-32 w-32" />
      <h2 className="font-bold text-lg relative flex gap-2">
        <Sparkles />
        {s("هدیه خوش‌آمدگویی معرفی‌شده‌ها", "Your referral welcome reward")}
      </h2>
      <p className="text-sm leading-7 relative">
        {s(
          "با رسیدن خریدهای تاییدشده به یک میلیون تومان، یک تخفیف تصادفی ۳، ۵، ۷ یا ۱۰٪ دریافت کنید. سقف تخفیف صد هزار تومان است و فقط یک‌بار برای حساب شما صادر می‌شود.",
          "Reach 1 million Toman in confirmed purchases to receive a random 3%, 5%, 7% or 10% discount. It is capped at 100,000 Toman and issued once per account.",
        )}
      </p>
      {coupon ? (
        <div className="relative rounded-xl bg-white/15 p-4 space-y-3">
          <strong className="text-xl">
            {n(coupon.percent)}
            {s("٪", "%")} · {s("تا سقف", "up to")} {money(coupon.capToman)}
          </strong>
          <code className="block select-all" dir="ltr">
            {coupon.code}
          </code>
          <p className="text-xs">
            {coupon.redeemed
              ? s("استفاده شده", "Used")
              : s("اعتبار تا", "Valid until") +
                " " +
                new Date(coupon.expiresAt).toLocaleDateString(
                  s("fa-IR", "en-US"),
                )}
          </p>
          <Button
            variant="secondary"
            disabled={coupon.redeemed}
            onClick={async () => {
              await navigator.clipboard.writeText(coupon.code);
              setMessage(s("کد کپی شد.", "Code copied."));
            }}
          >
            <Copy size={16} />
            {s("کپی کد تخفیف", "Copy discount code")}
          </Button>
        </div>
      ) : (
        <>
          <p className="text-sm relative">
            {s("خرید تاییدشده", "Confirmed purchases")}:{" "}
            {money(reward.paidToman)} / {money(reward.thresholdToman)}
          </p>
          <Button
            variant="secondary"
            className="relative"
            disabled={busy || !reward.eligible}
            onClick={async () => {
              setBusy(true);
              try {
                await action("reward-claim", {});
              } catch (e) {
                setMessage((e as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          >
            {s("دریافت هدیه شانسی", "Reveal your reward")}
          </Button>
        </>
      )}
      <p className="text-xs relative" role="status">
        {message}
      </p>
    </section>
  );
}
