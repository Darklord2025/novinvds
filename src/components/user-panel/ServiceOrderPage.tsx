import { useCart } from "@/contexts/CartContext";
import HostingCatalog from "@/components/HostingCatalog";
import { countryFromCategory } from "@/data/datacenters";
import { usePanelCopy } from "./PanelPrimitives";
import VpsOrderPage from "./VpsOrderPage";
import DedicatedOrderPage from "./DedicatedOrderPage";
export default function ServiceOrderPage({
  category,
  onBack,
  onAddToCart,
}: {
  category: string;
  onBack?: () => void;
  onAddToCart?: (item: any) => void;
}) {
  const { addItem } = useCart(),
    { s } = usePanelCopy();
  const accept = (it: any, type: "vps" | "dedicated") => {
    const draft = {
      id: type + "-" + (it.supplierPlanId || it.plan?.id || Date.now()),
      name:
        (type === "vps"
          ? s("سرور مجازی", "Virtual server")
          : s("سرور اختصاصی", "Dedicated server")) +
        " — " +
        (it.plan?.name || ""),
      type,
      price: it.price || 0,
      period: it.period || it.plan?.period || s("ماهانه", "Monthly"),
      specs:
        type === "vps"
          ? [
              it.plan?.cpu + " vCPU",
              it.plan?.ram + " GB RAM",
              it.plan?.disk + " GB " + it.plan?.diskType,
            ]
          : [it.plan?.cpu, it.plan?.ram, it.plan?.disk].filter(Boolean),
      meta: { ...it, requiresQuote: true },
    };
    (onAddToCart || addItem)(draft);
  };
  if (category.startsWith("order-hosting"))
    return <HostingCatalog key={category} inPanel initialCategory={category} />;
  if (category.startsWith("order-vps"))
    return (
      <VpsOrderPage
        key={category}
        onBack={onBack}
        onAddToCart={(it) => accept(it, "vps")}
        initialProfile={category}
        initialFamily={
          category.includes("windows")
            ? "windows"
            : category.includes("mikrotik")
              ? "appliance"
              : "linux"
        }
        initialMode={
          category.includes("hourly")
            ? "hourly"
            : category.includes("multilocation")
              ? "multilocation"
              : "virtual"
        }
      />
    );
  const country = countryFromCategory(
    category,
    category.includes("gpu") || category.includes("storage") ? "de" : "ir",
  );
  return (
    <DedicatedOrderPage
      key={category}
      onBack={onBack}
      onAddToCart={(it) => accept(it, "dedicated")}
      initialProfile={
        category.includes("gpu")
          ? "gpu"
          : category.includes("storage")
            ? "storage"
            : "standard"
      }
      initialRegion={
        country === "ir"
          ? "iran"
          : country === "us"
            ? "usa"
            : country === "sg"
              ? "asia"
              : "international"
      }
      initialCountry={country}
      initialDatacenter={
        category.startsWith("order-dedicated-dc-")
          ? category.replace("order-dedicated-dc-", "")
          : ""
      }
    />
  );
}
