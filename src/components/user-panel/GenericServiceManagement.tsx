import { inToman } from "@/lib/billing";
import BackButton from "./BackButton";
import { useServiceCatalog } from "@/contexts/PanelDataContext";
import { PanelHeading, ColorStat, usePanelCopy } from "./PanelPrimitives";
import { categoryLabel } from "@/lib/panel-model";
import { cycleLabel } from "@/lib/service-labels";
import { formatMoney } from "@/lib/billing";
import { Button } from "@/components/ui/button";
import { RefreshCw, Calendar, Receipt, Package } from "lucide-react";
export default function GenericServiceManagement({
  id,
  onBack,
  onRenew,
}: {
  id: string;
  onBack: () => void;
  onRenew: () => void;
}) {
  const { getServiceById } = useServiceCatalog(),
    { fa, s, n, money } = usePanelCopy();
  const service = getServiceById(id);
  if (!service)
    return <p>{s("سرویس در دسترس نیست.", "Service unavailable.")}</p>;
  return (
    <div className="space-y-6">
      <PanelHeading
        title={service.name}
        subtitle={categoryLabel(service.kind, fa)}
        action={
          <div className="flex gap-2">
            <BackButton variant="outline" onClick={onBack}>
              {s("بازگشت", "Back")}
            </BackButton>
            <Button onClick={onRenew}>
              <RefreshCw size={16} />
              {s("تمدید سرویس", "Renew service")}
            </Button>
          </div>
        }
      />
      <div className="grid sm:grid-cols-3 gap-3">
        <ColorStat
          title={s("سررسید", "Due date")}
          value={n(service.expiry)}
          icon={Calendar}
        />
        <ColorStat
          title={s("دوره پرداخت", "Billing cycle")}
          value={cycleLabel(service.billingCycle, fa)}
          icon={Package}
          color="purple"
        />
        <ColorStat
          title={s("مبلغ مرجع", "Reference amount")}
          value={money(inToman(service.amount, service.currency))}
          icon={Receipt}
          color="green"
        />
      </div>
      <section className="rounded-2xl border bg-card p-6 space-y-4">
        <h2 className="font-bold">{service.productName}</h2>
        <p className="text-sm">
          {s("شناسه سرویس", "Service ID")}: {id}
        </p>
        <p className="text-sm text-muted-foreground">
          {s(
            "شرایط تمدید، اعتبار لایسنس و امکان تمدید قرارداد در پیش‌فاکتور تاییدشده ارائه‌دهنده مشخص می‌شود.",
            "Renewal eligibility, license validity and contract terms are confirmed by the provider quote.",
          )}
        </p>
      </section>
    </div>
  );
}
