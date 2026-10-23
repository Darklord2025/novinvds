import AffiliateTerms from "./AffiliateTerms";
import MarketingBanners from "./MarketingBanners";
import ReferralReward from "./ReferralReward";
import { useState } from "react";
import {
  Users,
  Coins,
  TrendingUp,
  MousePointerClick,
  Copy,
  Download,
  Link as LinkIcon,
  Megaphone,
  FileText,
} from "lucide-react";
import { usePanelData } from "@/contexts/PanelDataContext";
import { PanelHeading, ColorStat, usePanelCopy } from "./PanelPrimitives";
import { downloadText, downloadCsv } from "@/lib/report-export";
import { referralUrl, escapeMarkup } from "@/lib/affiliate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BrandLogo from "@/components/BrandLogo";
export default function AffiliateCenter({
  onWallet,
}: {
  onWallet?: () => void;
}) {
  const { fa, s, n, money } = usePanelCopy();
  const { data, preview, createTicket } = usePanelData();
  const program = data.affiliate;
  const [tab, setTab] = useState("overview"),
    [campaign, setCampaign] = useState(""),
    [path, setPath] = useState("/vps"),
    [message, setMessage] = useState("");
  const code = program?.code || "",
    url = code ? referralUrl(location.origin, code, path, campaign) : "",
    rows = program?.commissions || [];
  const paid = rows
      .filter((r) => r.status === "paid")
      .reduce((sum, r) => sum + r.amountToman, 0),
    pending = rows
      .filter((r) => r.status !== "paid")
      .reduce((sum, r) => sum + r.amountToman, 0);
  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setMessage(s("کپی شد.", "Copied."));
    } catch {
      setMessage(
        s(
          "کپی ممکن نشد؛ متن را انتخاب کنید.",
          "Select and copy the text manually.",
        ),
      );
    }
  }

  const text =
    s(
      "با نوین وی‌دی‌اس، سرویس میزبانی مناسب کسب‌وکارتان را انتخاب کنید.",
      "Find hosting for your business with NovinVDS.",
    ) +
    "\n" +
    url;
  return (
    <div className="space-y-6" dir={fa ? "rtl" : "ltr"}>
      <ReferralReward />
      <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-3">
        <h2 className="font-bold">
          {s("پورسانت در کیف پول شما", "Commission in your wallet")}
        </h2>
        <p className="text-sm leading-7">
          {s(
            "پورسانت خرید تأییدشده، پس از تأیید همکاری و نرخ قرارداد، مستقیم به کیف پول واریز می‌شود؛ برای خرید سرویس یا درخواست برداشت از همان موجودی استفاده کنید.",
            "Commission on verified purchases is credited directly to your wallet after program and contract-rate approval. Use that balance to buy services or request a withdrawal.",
          )}
        </p>
        <Button onClick={onWallet}>
          {s("مدیریت کیف پول", "Manage wallet")}
        </Button>
      </section>
      <PanelHeading
        title={s("مرکز همکاری در فروش", "Affiliate center")}
        subtitle={s(
          "معرفی سرویس‌ها، ابزار بازاریابی و پیگیری پورسانت",
          "Referrals, marketing tools and commission tracking",
        )}
        action={
          <Button
            variant="outline"
            onClick={() => {
              try {
                downloadCsv(
                  "novinvds-commissions.csv",
                  fa
                    ? ["شناسه", "تاریخ", "وضعیت", "تومان"]
                    : ["ID", "Date", "Status", "Toman"],
                  rows.map((r) => [
                    n(r.id),
                    n(r.at),
                    r.status,
                    n(r.amountToman),
                  ]),
                );
                setMessage(s("فایل گزارش ساخته شد.", "Report file generated."));
              } catch {
                setMessage(
                  s("ساخت گزارش ممکن نشد.", "Unable to generate report."),
                );
              }
            }}
          >
            <Download size={16} />
            {s("دانلود گزارش پورسانت", "Download commission report")}
          </Button>
        }
      />
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <ColorStat
          title={s("واریز شده به کیف پول", "Credited to wallet")}
          value={money(paid)}
          icon={Coins}
          color="green"
        />
        <ColorStat
          title={s("در انتظار تایید", "Pending commission")}
          value={money(pending)}
          icon={TrendingUp}
          color="purple"
        />
        <ColorStat
          title={s("معرفی‌های ثبت‌شده", "Recorded referrals")}
          value={n(program?.referrals || 0)}
          icon={Users}
          color="blue"
        />
        <ColorStat
          title={s("کلیک‌های معتبر", "Valid clicks")}
          value={n(program?.clicks || 0)}
          icon={MousePointerClick}
          color="amber"
        />
      </div>
      {!code ? (
        <section className="rounded-2xl border bg-card p-7 space-y-4">
          <Megaphone className="text-blue-500" />
          <h2 className="font-bold">{s("شروع همکاری", "Join the program")}</h2>
          <p className="text-sm text-muted-foreground">
            {s(
              "کد معرفی و نرخ پورسانت پس از تایید شرایط همکاری از سرور دریافت می‌شود.",
              "Your referral code and commission rate appear after program approval.",
            )}
          </p>
          <Button
            onClick={async () => {
              try {
                const t = await createTicket(
                  s(
                    "درخواست عضویت همکاری در فروش",
                    "Affiliate enrollment request",
                  ),
                  "sales",
                  s(
                    "لطفاً شرایط و نرخ پورسانت همکاری را برای حساب من بررسی کنید.",
                    "Please review my account for affiliate enrollment and commission terms.",
                  ),
                );
                setMessage(
                  s("درخواست ثبت شد: ", "Request created: ") + t.number,
                );
              } catch (e) {
                setMessage((e as Error).message);
              }
            }}
          >
            {s("درخواست عضویت", "Request enrollment")}
          </Button>
        </section>
      ) : (
        <>
          <div className="flex gap-2 flex-wrap">
            {[
              ["overview", "نمای کلی", "Overview"],
              ["tools", "ابزار بازاریابی", "Marketing toolkit"],
              ["commissions", "پورسانت‌ها", "Commissions"],
              ["terms", "شرایط همکاری", "Program terms"],
            ].map(([id, f, en]) => (
              <Button
                key={id}
                variant={tab === id ? "default" : "outline"}
                onClick={() => setTab(id)}
              >
                {s(f, en)}
              </Button>
            ))}
          </div>
          {tab === "overview" && (
            <section className="rounded-2xl border bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-7 space-y-4">
              <BrandLogo className="bg-white rounded-xl p-2" />
              <h2 className="text-xl font-bold">
                {s("لینک اختصاصی معرفی شما", "Your personal referral link")}
              </h2>
              <p className="text-sm">
                {s("نرخ پورسانت تاییدشده", "Approved commission rate")}:{" "}
                {program?.ratePercent != null
                  ? n(program.ratePercent) + "%"
                  : s("تعیین نشده", "Not assigned")}
              </p>
              <Input
                dir="ltr"
                className="bg-white/10 border-white/20 text-white"
                readOnly
                value={url}
              />
              <Button variant="secondary" onClick={() => copy(url)}>
                <Copy size={16} />
                {s("کپی لینک", "Copy link")}
              </Button>
            </section>
          )}
          {tab === "tools" && (
            <section className="rounded-2xl border bg-card p-5 space-y-5">
              <h2 className="font-bold">
                {s("سازنده لینک کمپین", "Campaign link builder")}
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                <label className="text-sm">
                  {s("صفحه مقصد", "Landing page")}
                  <select
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    className="block w-full border p-3 rounded-xl bg-card mt-2"
                  >
                    {["/", "/vps", "/dedicated", "/hosting", "/domain"].map(
                      (p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ),
                    )}
                  </select>
                </label>
                <label className="text-sm">
                  {s("نام کمپین", "Campaign name")}
                  <Input
                    className="mt-2"
                    dir="ltr"
                    value={campaign}
                    maxLength={80}
                    onChange={(e) => setCampaign(e.target.value)}
                  />
                </label>
              </div>
              <Input dir="ltr" readOnly value={url} />
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" onClick={() => copy(url)}>
                  <LinkIcon size={16} />
                  {s("کپی لینک کمپین", "Copy campaign link")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => downloadText("novinvds-campaign.txt", text)}
                >
                  <Download size={16} />
                  {s("متن شبکه اجتماعی / ایمیل", "Social / email copy")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    copy(
                      '<a href="' +
                        escapeMarkup(url) +
                        '" rel="sponsored noopener">NovinVDS</a>',
                    )
                  }
                >
                  {s("کپی کد لینک سایت", "Copy website link code")}
                </Button>
              </div>
              <hr />
              <MarketingBanners url={url} />
            </section>
          )}
          {tab === "commissions" && (
            <section className="rounded-2xl border bg-card p-5 space-y-4">
              <Button
                variant="outline"
                onClick={() =>
                  downloadCsv(
                    "commissions.csv",
                    ["ID", "Date", "Status", "Toman"],
                    rows.map((r) => [r.id, r.at, r.status, r.amountToman]),
                  )
                }
              >
                {s("دانلود گزارش", "Download report")}
              </Button>
              {rows.length ? (
                rows.map((r) => (
                  <div
                    key={r.id}
                    className="border-b py-3 flex flex-wrap justify-between gap-2 text-sm"
                  >
                    <span>
                      {r.id} · {r.at.slice(0, 10)}
                    </span>
                    <span>{money(r.amountToman)}</span>
                    <span>
                      {r.status === "paid"
                        ? s("واریز به کیف پول", "Wallet credit")
                        : s("در انتظار", "Pending")}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  {s("پورسانتی ثبت نشده است.", "No commissions recorded.")}
                </p>
              )}
            </section>
          )}
          {tab === "terms" && (
            <AffiliateTerms
              rate={program?.ratePercent}
              contract={preview?undefined:program?.terms}
            />
          )}
        </>
      )}
      {!code && (
        <>
          <Button
            variant="outline"
            onClick={() => setTab(tab === "terms" ? "overview" : "terms")}
          >
            {s("شرایط همکاری", "Program terms")}
          </Button>
          {tab === "terms" && (
            <AffiliateTerms
              rate={program?.ratePercent}
              contract={preview?undefined:program?.terms}
            />
          )}
          <MarketingBanners url="" />
        </>
      )}
      <p role="status" className="text-sm">
        {message}
      </p>
    </div>
  );
}
