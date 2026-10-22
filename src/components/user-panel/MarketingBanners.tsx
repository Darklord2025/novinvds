import { useEffect, useState } from "react";
import { zipFiles } from "@/lib/zip-store";
import { Download, Copy, Palette } from "lucide-react";
import {
  bannerPng,
  bannerSizes,
  marketingBanner,
  brandLogoData,
  type BannerCampaign,
} from "@/lib/marketing-banners";
import { escapeMarkup } from "@/lib/affiliate";
import { downloadText } from "@/lib/report-export";
import { usePanelCopy } from "./PanelPrimitives";
import { Button } from "@/components/ui/button";
export default function MarketingBanners({ url }: { url: string }) {
  const { fa, s, n } = usePanelCopy();
  const [campaign, setCampaign] = useState<BannerCampaign>("cloud"),
    [variant, setVariant] = useState("blue"),
    [animated, setAnimated] = useState(false),
    [size, setSize] = useState("728x90"),
    [logo, setLogo] = useState(""),
    [message, setMessage] = useState("");
  useEffect(() => {
    void brandLogoData()
      .then(setLogo)
      .catch(() =>
        setMessage(s("لوگو دریافت نشد.", "Unable to load brand logo.")),
      );
  }, []);
  const options = { campaign, fa, variant, animated, logoData: logo };
  const selected = marketingBanner({ ...options, size });
  async function exportAll() {
    const archive = zipFiles(
      bannerSizes.map((dimensions) => ({
        name: `novinvds-${campaign}-${fa ? "fa" : "en"}-${dimensions}-${animated ? "animated" : "static"}.svg`,
        text: marketingBanner({ ...options, size: dimensions }),
      })),
    );
    const blob = new Blob([archive.buffer as ArrayBuffer], {
      type: "application/zip",
    });
    const object = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = object;
    a.download = `novinvds-${campaign}-${fa ? "fa" : "en"}-banners.zip`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(object), 1000);
  }
  return (
    <section className="space-y-5">
      <h2 className="font-bold flex gap-2">
        <Palette className="text-violet-500" />
        {s("استودیوی بنر تبلیغاتی", "Campaign banner studio")}
      </h2>
      <div className="flex flex-wrap gap-3">
        <select
          className="border p-3 rounded-xl bg-card"
          aria-label={s("موضوع بنر", "Banner campaign")}
          value={campaign}
          onChange={(e) => setCampaign(e.target.value as BannerCampaign)}
        >
          {[
            ["cloud", "سرور و خدمات ابری", "VPS & cloud"],
            ["dedicated", "سرور اختصاصی", "Dedicated servers"],
            ["domain", "دامنه و برند", "Domains & branding"],
          ].map(([id, f, en]) => (
            <option key={id} value={id}>
              {s(f, en)}
            </option>
          ))}
        </select>
        <select
          className="border p-3 rounded-xl bg-card"
          aria-label={s("تم بنر", "Banner theme")}
          value={variant}
          onChange={(e) => setVariant(e.target.value)}
        >
          {[
            ["blue", "آبی و بنفش", "Blue & violet"],
            ["dark", "تیره و نئونی", "Dark & neon"],
            ["light", "روشن", "Light"],
          ].map(([id, f, en]) => (
            <option key={id} value={id}>
              {s(f, en)}
            </option>
          ))}
        </select>
        <select
          className="border p-3 rounded-xl bg-card"
          aria-label={s("اندازه بنر", "Banner size")}
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          {bannerSizes.map((v) => (
            <option key={v} value={v}>
              {n(v.replace("x", " × "))}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={animated}
            onChange={(e) => setAnimated(e.target.checked)}
          />
          {s("نسخه متحرک", "Animated version")}
        </label>
      </div>
      <div className="rounded-2xl bg-muted p-3 overflow-auto">
        <img
          src={
            "data:image/svg+xml;charset=utf-8," + encodeURIComponent(selected)
          }
          alt={s("پیش‌نمایش بنر تبلیغاتی", "Campaign banner preview")}
          style={{
            width: Number(size.split("x")[0]),
            maxWidth: "100%",
            maxHeight: 600,
            objectFit: "contain",
          }}
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" disabled={!logo} onClick={async()=>{try{const blob=await bannerPng(selected),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='novinvds-'+campaign+'-'+size+'-'+(fa?'fa':'en')+'.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);setMessage(s('نسخه ثابت PNG ساخته شد.','Static PNG generated.'));}catch{setMessage(s('ساخت PNG ممکن نشد.','Unable to generate PNG.'));}}}>{s('دانلود PNG ثابت','Download static PNG')}</Button>
        <Button
          disabled={!logo}
          onClick={() =>
            downloadText(
              `novinvds-${campaign}-${size}-${fa ? "fa" : "en"}.svg`,
              selected,
              "image/svg+xml;charset=utf-8",
            )
          }
        >
          <Download size={16} />
          {s("دانلود بنر", "Download banner")}
        </Button>
        <Button
          variant="outline"
          disabled={!logo}
          onClick={async () => {
            try {
              await exportAll();
              setMessage(
                s(
                  "بسته همه اندازه‌ها ساخته شد.",
                  "All-size banner package generated.",
                ),
              );
            } catch {
              setMessage(
                s("ساخت بسته ممکن نشد.", "Unable to build the package."),
              );
            }
          }}
        >
          <Download size={16} />
          {s("دانلود همه اندازه‌ها — ZIP", "Download all sizes — ZIP")}
        </Button>
        <Button
          variant="outline"
          disabled={!url || !logo}
          onClick={async () => {
            await navigator.clipboard.writeText(
              '<a href="' +
                escapeMarkup(url) +
                '" rel="sponsored noopener" target="_blank"><img src="data:image/svg+xml;charset=utf-8,' +
                encodeURIComponent(selected) +
                '" alt="NovinVDS"/></a>',
            );
            setMessage(s("کد بنر کپی شد.", "Banner embed code copied."));
          }}
        >
          <Copy size={16} />
          {s("کپی کد بنر با لینک معرفی", "Copy banner with referral link")}
        </Button>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {(["cloud", "dedicated", "domain"] as BannerCampaign[]).map((c) => (
          <button
            key={c}
            onClick={() => setCampaign(c)}
            className="rounded-xl overflow-hidden border"
          >
            <img
              src={
                "data:image/svg+xml;charset=utf-8," +
                encodeURIComponent(
                  marketingBanner({ ...options, campaign: c, size: "300x250" }),
                )
              }
              alt={s("طرح تبلیغاتی ", "Campaign design ") + c}
              className="w-full"
            />
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {s(
          "شانزده اندازه استاندارد، سه کمپین، سه پوسته و حالت ثابت/متحرک؛ متن متناسب با زبان پنل است. بنرها ادعای موجودی یا تخفیف تاییدنشده ندارند.",
          "Sixteen standard sizes, three campaigns, three themes and static/animated modes, in the panel language. Banners do not claim unverified stock or discounts.",
        )}
      </p>
      <p role="status" className="text-sm">
        {message}
      </p>
    </section>
  );
}
