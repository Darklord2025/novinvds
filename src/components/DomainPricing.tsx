import { useMarketRates } from "@/hooks/useMarketRates";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { usePanelCopy } from "./user-panel/PanelPrimitives";
import PublicDomainOrder from "./domain/PublicDomainOrder";
const prices = [
  { ext: "ir", register: 75000, renew: 85000, transfer: null },
  { ext: "com", register: 890000, renew: 940000, transfer: 890000 },
  { ext: "net", register: 1050000, renew: 1090000, transfer: 1050000 },
  { ext: "org", register: 980000, renew: 1040000, transfer: 980000 },
  { ext: "dev", register: 1350000, renew: 1400000, transfer: 1350000 },
  { ext: "shop", register: 790000, renew: 2150000, transfer: 2150000 },
  { ext: "io", register: 4200000, renew: 4450000, transfer: 4200000 },
];
export default function DomainPricing({
  panelMode = false,
  onSelect,
  onRenew,
}: {
  panelMode?: boolean;
  onSelect?: (extension: string, mode: string) => void;
  onRenew?: () => void;
}) {
  const { rates } = useMarketRates();
  const livePrices = (rates?.domainPrices || []).filter(
    (p) => Date.now() - Date.parse(p.asOf) < 3600000,
  );
  const displayPrices = prices.map((p) => {
    const live = livePrices.find((v) => v.extension === p.ext);
    return {
      ...p,
      ...(live
        ? {
            register: live.register,
            renew: live.renew,
            transfer: live.transfer,
          }
        : {}),
      live,
    };
  });
  for (const live of livePrices)
    if (!displayPrices.some((p) => p.ext === live.extension))
      displayPrices.push({
        ext: live.extension,
        register: live.register,
        renew: live.renew,
        transfer: live.transfer,
        live,
      });
  const { s, money } = usePanelCopy();
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<{ ext: string; mode: string } | null>(
    null,
  );
  function pick(ext: string, mode: string) {
    if (panelMode && onSelect) onSelect(ext, mode);
    else setOrder({ ext, mode });
  }
  return (
    <div className="space-y-4">
      <p className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm">
        {s(
          "تعرفه‌های مرجع یک‌ساله، بدون مالیات؛ قیمت تمدید می‌تواند با ثبت متفاوت باشد. موجودی، پرمیوم بودن دامنه و مبلغ نهایی از ثبت‌کننده تایید می‌شود.",
          "Reference one-year rates before tax. Renewal can differ from registration. Availability, premium status and final amounts require registrar confirmation.",
        )}
      </p>
      <p className="text-xs leading-6 text-muted-foreground">
        {s(
          "کاهش ۱٫۵٪ فقط با قیمت روز مستند رقبا و رعایت کف هزینه فعال می‌شود. بدون اتصال منبع، قیمت نمونه تخفیف آنلاین محسوب نمی‌شود.",
          "The 1.5% reduction requires current documented competitor prices and respects the cost floor. Without that feed, sample prices are not an online discount.",
        )}
      </p>
      <Input
        aria-label={s("جستجوی پسوند", "Search extension")}
        placeholder={s(
          "پسوند مورد نظر؛ مانند com",
          "Find an extension, e.g. com",
        )}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="overflow-x-auto rounded-2xl border bg-card">
        <table className="w-full text-sm text-start min-w-[560px]">
          <thead className="bg-blue-500/5">
            <tr>
              {[
                "پسوند|Extension",
                "ثبت سال اول|First year",
                "تمدید|Renewal",
                "انتقال|Transfer",
                "عملیات|Actions",
              ].map((t) => (
                <th key={t} className="text-start p-4">
                  {s(...(t.split("|") as [string, string]))}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayPrices
              .filter((p) =>
                p.ext.includes(query.toLowerCase().replace(/^\./, "")),
              )
              .map((p) => (
                <tr key={p.ext} className="border-t">
                  <td className="p-4 font-bold text-blue-600" dir="ltr">
                    .{p.ext}
                  </td>
                  <td className="p-4">
                    {money(p.register)}
                    <p className="text-xs text-muted-foreground mt-2">
                      {p.live ? (
                        <a
                          href={p.live.source}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {s(
                            "مقایسه آنلاین؛ هدف ۱٫۵٪ کمتر تا کف هزینه",
                            "Online comparison; target 1.5% below, subject to cost floor",
                          )}
                        </a>
                      ) : (
                        s(
                          "قیمت نمونه؛ آنلاین تأیید نشده",
                          "Sample; online rate unverified",
                        )
                      )}
                    </p>
                  </td>
                  <td className="p-4">{money(p.renew)}</td>
                  <td className="p-4">
                    {p.transfer === null
                      ? s("نیازمند بررسی", "Review required")
                      : money(p.transfer)}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => pick(p.ext, "register")}>
                        {s("ثبت", "Register")}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => pick(p.ext, "transfer")}
                      >
                        {s("انتقال", "Transfer")}
                      </Button>
                      {onRenew ? (
                        <Button size="sm" variant="ghost" onClick={onRenew}>
                          {s("تمدید دامنه من", "Renew owned domain")}
                        </Button>
                      ) : (
                        <Button asChild size="sm" variant="ghost">
                          <Link to="/user-panel?tab=domains">
                            {s("تمدید", "Renew")}
                          </Link>
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Dialog open={!!order} onOpenChange={(v) => !v && setOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogTitle>
            {s("درخواست دامنه", "Domain request")} .{order?.ext}
          </DialogTitle>
          {order && (
            <PublicDomainOrder
              key={order.ext + order.mode}
              initialMode={order.mode}
              initialTld={order.ext}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
