import { useState } from "react";
import {  Server, HardDrive, Globe } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import HostingCatalog from "@/components/HostingCatalog";
import DedicatedOrderPage from "./DedicatedOrderPage";
import VpsCustomCalculator from "./VpsCustomCalculator";
import { usePanelCopy, PanelHeading } from "./PanelPrimitives";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
export default function ServiceCalculatorPage() {
  const { s } = usePanelCopy(),
    { addItem } = useCart();
  const [kind, setKind] = useState("vps");
  return (
    <div className="space-y-6">
      <PanelHeading
        title={s("ماشین‌حساب سرویس", "Service calculator")}
        subtitle={s(
          "منابع، دیتاسنتر و دوره را انتخاب کنید؛ هزینه با فرم سفارش یکسان محاسبه می‌شود.",
          "Choose resources, datacenter and billing term. Estimates use the same rates as ordering.",
        )}
      />
      <Tabs value={kind} onValueChange={setKind}>
        <TabsList className="grid grid-cols-3 w-full h-auto gap-1 p-1 rounded-xl">
          <TabsTrigger value="vps" className="py-3 gap-2">
            <Server size={17} />
            {s("سرور مجازی", "VPS")}
          </TabsTrigger>
          <TabsTrigger value="dedicated" className="py-3 gap-2">
            <HardDrive size={17} />
            {s("سرور اختصاصی", "Dedicated")}
          </TabsTrigger>
          <TabsTrigger value="hosting" className="py-3 gap-2">
            <Globe size={17} />
            {s("هاست سفارشی", "Custom hosting")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="vps" className="mt-6">
          <VpsCustomCalculator />
        </TabsContent>
        <TabsContent value="dedicated" className="mt-6">
          <DedicatedOrderPage
            initialCountry="ir"
            initialRegion="iran"
            onAddToCart={(draft) =>
              addItem({
                id: "dedicated-" + Date.now(),
                name: draft.plan.name,
                type: "dedicated",
                price: draft.price,
                period: s("ماهانه", "Monthly"),
                specs: [draft.plan.cpu, draft.plan.ram, draft.plan.disk],
                meta: { ...draft, requiresQuote: true },
              })
            }
          />
        </TabsContent>
        <TabsContent value="hosting" className="mt-6">
          <HostingCatalog
            inPanel
            configurationOnly
            initialCategory="order-hosting-custom"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
