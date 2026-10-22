import BackButton from "./BackButton";
import {
  virtualPlans,
  hourlyPlans,
  multilocationPlans,
  locations,
  billingPeriods,
  type VpsPlan,
} from "@/data/vpsCatalog";
import { usePanelCopy } from "./PanelPrimitives";
import OperatingSystemPicker from "./OperatingSystemPicker";
import {
  emptyOs,
  validOs,
  osLabel,
  osCatalog,
  type OsSelection,
} from "@/data/operatingSystems";
import LegacyLocale from "@/components/LegacyLocale";
import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  ArrowLeft,
  Server,
  Clock,
  Cpu,
  HardDrive,
  Globe,
  Check,
  ShoppingCart,
  Monitor,
  Shield,
  Zap,
  MapPin,
  ChevronLeft,
} from "lucide-react";
import { toPersianDigits } from "@/lib/numberUtils";
import { toast } from "@/components/ui/use-toast";

interface VpsOrderPageProps {
  onBack?: () => void;
  onAddToCart?: (item: any) => void;
  initialMode?: "virtual" | "hourly" | "multilocation";
  initialFamily?: string;
  initialProfile?: string;
}

const VpsOrderPage: React.FC<VpsOrderPageProps> = ({
  onBack,
  onAddToCart,
  initialMode = "virtual",
  initialFamily = "linux",
  initialProfile = "order-vps",
}) => {
  const { s, n } = usePanelCopy();
  const [mode, setMode] = useState<"virtual" | "hourly" | "multilocation">(
    initialMode === "multilocation"
      ? "multilocation"
      : initialMode === "hourly"
        ? "hourly"
        : "virtual",
  );
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<VpsPlan | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [osSelection, setOsSelection] = useState<OsSelection>({
    ...emptyOs,
    family: initialFamily,
  });
  const [controlPanel, setControlPanel] = useState("");
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [custom, setCustom] = useState({ cpu: 2, ram: 4, disk: 50 });
  const customMode = initialProfile.includes("custom");
  const basePlans = customMode
    ? [
        {
          id: "flex",
          name: "Flex",
          ...custom,
          diskType: "NVMe",
          bandwidth: "1 TB",
          port: "1 Gbps",
          price: custom.cpu * 90000 + custom.ram * 45000 + custom.disk * 1500,
          period: "ماهانه",
        },
      ]
    : mode === "multilocation"
      ? multilocationPlans
      : mode === "virtual"
        ? virtualPlans
        : hourlyPlans;
  const plans = basePlans.map((p, i) => ({
    ...p,
    id: initialProfile + "-" + p.id,
    name:
      (initialProfile.includes("windows")
        ? "Windows"
        : initialProfile.includes("storage")
          ? s("ذخیره‌سازی", "Storage")
          : initialProfile.includes("managed")
            ? s("مدیریت‌شده", "Managed")
            : initialProfile.includes("daily")
              ? s("روزانه", "Daily")
              : initialProfile.includes("mikrotik")
                ? "MikroTik"
                : initialProfile.includes("ubuntu-desktop")
                  ? "Desktop"
                  : initialProfile.includes("custom")
                    ? "Flex"
                    : p.name) +
      " " +
      (i + 1),
    ram:
      initialProfile.includes("windows") ||
      initialProfile.includes("ubuntu-desktop")
        ? Math.max(4, p.ram)
        : p.ram,
    disk: initialProfile.includes("storage")
      ? p.disk * 10
      : initialProfile.includes("windows")
        ? Math.max(60, p.disk)
        : p.disk,
    price: initialProfile.includes("storage")
      ? p.price + 450000
      : initialProfile.includes("managed")
        ? p.price + 500000
        : initialProfile.includes("windows")
          ? p.price + 350000
          : initialProfile.includes("daily")
            ? Math.ceil(p.price / 30)
            : p.price,
    period: initialProfile.includes("daily") ? "روزانه" : p.period,
  }));
  useEffect(() => {
    const id = new URLSearchParams(location.search).get("plan");
    if (id) {
      const requested = plans.find(
        (p) => p.id === id || p.id.endsWith("-" + id),
      );
      if (requested) setSelectedPlan(requested);
    }
  }, []);
  const selectedOs = osSelection.product,
    selectedOsVersion = [osSelection.version, osSelection.edition]
      .filter(Boolean)
      .join(" ");
  const selectedOsObj = osCatalog.find((o) => o.id === selectedOs);
  const availableLocations = initialProfile.endsWith("-ir")
    ? locations.filter((l) => l.id.startsWith("iran"))
    : locations;
  const selectedLocationObj = locations.find((l) => l.id === selectedLocation);

  const finalPrice = useMemo(() => {
    if (!selectedPlan) return 0;
    if (mode === "hourly" || initialProfile.includes("daily"))
      return selectedPlan.price;
    const period = billingPeriods.find((p) => p.id === billingPeriod);
    return Math.round(selectedPlan.price * (period?.multiplier || 1));
  }, [selectedPlan, billingPeriod, mode]);

  const handleOrder = () => {
    toast({
      title: "افزودن به سبد خرید",
      description: `${selectedPlan?.name} - ${selectedLocationObj?.name} - ${selectedOsObj?.name} ${selectedOsVersion}`,
    });
    onAddToCart?.({
      plan: selectedPlan,
      location: selectedLocation,
      os: selectedOs,
      osSelection,
      controlPanel,
      requiresQuote: true,
      osVersion: selectedOsVersion,
      billingPeriod: initialProfile.includes("daily")
        ? "daily"
        : mode === "hourly"
          ? "hourly"
          : billingPeriod,
      period: initialProfile.includes("daily")
        ? "روزانه"
        : mode === "hourly"
          ? "ساعتی"
          : billingPeriods.find((p) => p.id === billingPeriod)?.name,
      price: finalPrice,
    });
  };

  const canProceed = () => {
    if (step === 1) return !!selectedPlan;
    if (step === 2) return !!selectedLocation;
    if (step === 3) return validOs(osSelection);
    return true;
  };

  const steps = [
    { num: 1, label: "انتخاب پلن" },
    { num: 2, label: "لوکیشن" },
    { num: 3, label: "سیستم‌عامل" },
    { num: 4, label: "تأیید و سفارش" },
  ];

  return (
    <LegacyLocale>
      {
        <div className="space-y-6" dir="rtl">
          {/* Header */}
          <div className="flex items-center gap-4">
            {onBack && (
              <BackButton
                variant="outline"
                size="sm"
                onClick={onBack}
                className="flex items-center gap-2"
              >

                بازگشت
              </BackButton>
            )}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-indigo-600 rounded-xl flex items-center justify-center text-white">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">سفارش سرور مجازی</h1>
                <p className="text-muted-foreground text-sm">
                  پلن مناسب خود را انتخاب کنید
                </p>
              </div>
            </div>
          </div>

          <p className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm leading-7">
            {s(
              "پلن‌ها و قیمت‌ها نمونه طراحی هستند. منابع، لوکیشن، لایسنس و قیمت نهایی باید از ارائه‌دهنده تأیید شوند.",
              "Plans and prices are design samples. Resources, location, licensing and final prices require provider confirmation.",
            )}
          </p>
          {/* Mode Toggle */}
          <Tabs
            value={mode}
            onValueChange={(v) => {
              setMode(v as any);
              setStep(1);
              setSelectedPlan(null);
            }}
            className="w-full"
          >
            <TabsList
              className={
                (initialProfile === "order-vps" ? "grid" : "hidden") +
                " w-full grid-cols-3 max-w-lg h-auto"
              }
            >
              <TabsTrigger
                value="virtual"
                className="gap-1 sm:gap-2 text-[11px] sm:text-sm px-1 sm:px-3 py-2 whitespace-nowrap"
              >
                <Server className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                سرور مجازی
              </TabsTrigger>
              <TabsTrigger
                value="hourly"
                className="gap-1 sm:gap-2 text-[11px] sm:text-sm px-1 sm:px-3 py-2 whitespace-nowrap"
              >
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                سرور ساعتی
              </TabsTrigger>
              <TabsTrigger
                value="multilocation"
                className="gap-1 sm:gap-2 text-[11px] sm:text-sm px-1 sm:px-3 py-2 whitespace-nowrap"
              >
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                مولتی لوکیشن
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Steps Indicator */}
          <div className="flex items-center justify-between bg-muted/50 rounded-xl p-4 overflow-x-auto">
            {steps.map((s, i) => (
              <React.Fragment key={s.num}>
                <button
                  onClick={() => s.num < step && setStep(s.num)}
                  className={`flex items-center gap-2 shrink-0 ${s.num === step ? "text-primary font-bold" : s.num < step ? "text-green-600 cursor-pointer" : "text-muted-foreground"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      s.num === step
                        ? "bg-primary text-primary-foreground"
                        : s.num < step
                          ? "bg-green-500 text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s.num < step ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      toPersianDigits(s.num)
                    )}
                  </div>
                  <span className="hidden sm:inline text-sm">{s.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${s.num < step ? "bg-green-500" : "bg-muted"}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step 1: Select Plan */}
          {step === 1 && (
            <div className="space-y-4">
              {customMode && (
                <div className="grid sm:grid-cols-3 gap-4 rounded-2xl border bg-card p-5">
                  {(
                    [
                      [
                        "cpu",
                        s("پردازنده مجازی", "vCPU"),
                        [1, 2, 4, 6, 8, 12, 16],
                      ],
                      [
                        "ram",
                        s("رم (گیگابایت)", "RAM (GB)"),
                        [1, 2, 4, 8, 16, 32, 64],
                      ],
                      [
                        "disk",
                        s("فضا NVMe (گیگابایت)", "NVMe storage (GB)"),
                        [20, 40, 50, 60, 80, 100, 200, 500, 1000],
                      ],
                    ] as [keyof typeof custom, string, number[]][]
                  ).map(([key, label, values]) => (
                    <label key={key} className="text-sm">
                      {label}
                      <select
                        aria-label={label}
                        className="block w-full mt-2 border bg-background rounded-xl p-3"
                        value={custom[key]}
                        onChange={(e) => {
                          setCustom({
                            ...custom,
                            [key]: Number(e.target.value),
                          });
                          setSelectedPlan(null);
                        }}
                      >
                        {values.map((v) => (
                          <option key={v} value={v}>
                            {n(v)}
                          </option>
                        ))}
                      </select>
                    </label>
                  ))}
                </div>
              )}
              {mode === "hourly" && (
                <Card className="border-amber-200 bg-amber-50/50">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-amber-800">
                        سرور ساعتی - پرداخت به ازای مصرف
                      </p>
                      <p className="text-amber-700">
                        فقط به ازای ساعاتی که سرور روشن است هزینه پرداخت
                        می‌کنید. مناسب تست، توسعه و پروژه‌های موقت.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
              {mode === "multilocation" && (
                <Card className="border-blue-200 bg-blue-50/50">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Globe className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-800">
                        سرور مولتی لوکیشن - یک سرور با چند IP
                      </p>
                      <p className="text-blue-700">
                        سرور شما با چندین IP از لوکیشن‌های مختلف تنظیم می‌شود.
                        مناسب سرویس‌های بین‌المللی و کاهش تأخیر.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {plans.map((plan) => (
                  <Card
                    key={plan.id}
                    className={`relative cursor-pointer transition-all hover:shadow-lg ${
                      selectedPlan?.id === plan.id
                        ? "border-primary border-2 ring-2 ring-primary/20"
                        : ""
                    } ${plan.popular ? "border-primary" : ""}`}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 left-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-br-lg">
                        محبوب
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {plan.name}
                        {selectedPlan?.id === plan.id && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-blue-500" />
                          <span>{toPersianDigits(plan.cpu)} هسته CPU</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Monitor className="w-3.5 h-3.5 text-green-500" />
                          <span>{toPersianDigits(plan.ram)} گیگ RAM</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <HardDrive className="w-3.5 h-3.5 text-purple-500" />
                          <span>
                            {toPersianDigits(plan.disk)} گیگ {plan.diskType}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-orange-500" />
                          <span>{plan.bandwidth}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Globe className="w-3 h-3" />
                        <span>پورت {plan.port}</span>
                      </div>
                      <div className="pt-2 border-t">
                        <span className="text-xl font-bold text-primary">
                          {toPersianDigits(plan.price.toLocaleString())}
                        </span>
                        <span className="text-sm text-muted-foreground mr-1">
                          تومان / {plan.period}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Location */}
          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {availableLocations.map((loc) => (
                <Card
                  key={loc.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedLocation === loc.id
                      ? "border-primary border-2 ring-2 ring-primary/20"
                      : ""
                  }`}
                  onClick={() => setSelectedLocation(loc.id)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <span className="text-3xl">{loc.flag}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{loc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {loc.datacenter}
                      </p>
                    </div>
                    {selectedLocation === loc.id && (
                      <Check className="w-5 h-5 text-primary shrink-0" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {step === 3 && (
            <OperatingSystemPicker
              value={osSelection}
              onChange={setOsSelection}
              panel={controlPanel}
              onPanelChange={setControlPanel}
            />
          )}
          {/* Step 4: Review & Confirm */}
          {step === 4 && selectedPlan && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>خلاصه سفارش</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          پلن
                        </p>
                        <p className="font-bold text-lg">{selectedPlan.name}</p>
                        <div className="text-sm space-y-1">
                          <p>{toPersianDigits(selectedPlan.cpu)} هسته CPU</p>
                          <p>{toPersianDigits(selectedPlan.ram)} گیگ RAM</p>
                          <p>
                            {toPersianDigits(selectedPlan.disk)} گیگ{" "}
                            {selectedPlan.diskType}
                          </p>
                          <p>پهنای باند: {selectedPlan.bandwidth}</p>
                        </div>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          لوکیشن
                        </p>
                        <p className="font-bold text-lg">
                          {selectedLocationObj?.flag}{" "}
                          {selectedLocationObj?.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          دیتاسنتر: {selectedLocationObj?.datacenter}
                        </p>
                        <p className="text-sm font-medium text-muted-foreground mt-4">
                          سیستم‌عامل
                        </p>
                        <p className="font-bold">
                          {selectedOsObj?.name} {selectedOsVersion}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Billing period for virtual (not hourly) */}
                {!initialProfile.includes("daily") &&
                  (mode === "virtual" || mode === "multilocation") && (
                    <Card>
                      <CardHeader>
                        <CardTitle>دوره پرداخت</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {billingPeriods.map((p) => (
                            <Card
                              key={p.id}
                              className={`cursor-pointer text-center transition-all ${billingPeriod === p.id ? "border-primary border-2" : ""}`}
                              onClick={() => setBillingPeriod(p.id)}
                            >
                              <CardContent className="p-3">
                                <p className="font-medium text-sm">{p.name}</p>
                                {p.discount > 0 && (
                                  <Badge
                                    variant="destructive"
                                    className="text-xs mt-1"
                                  >
                                    {toPersianDigits(p.discount)}٪ تخفیف
                                  </Badge>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
              </div>

              {/* Price Card */}
              <div>
                <Card className="sticky top-6">
                  <CardContent className="p-6 space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">
                        مبلغ قابل پرداخت
                      </p>
                      <p className="text-3xl font-bold text-primary">
                        {toPersianDigits(finalPrice.toLocaleString())}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        تومان /{" "}
                        {initialProfile.includes("daily")
                          ? "روزانه"
                          : mode === "hourly"
                            ? "ساعتی"
                            : billingPeriods.find((p) => p.id === billingPeriod)
                                ?.name}
                      </p>
                    </div>
                    <Button
                      className="w-full gap-2"
                      size="lg"
                      onClick={handleOrder}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      افزودن به سبد خرید
                    </Button>
                    <div className="text-xs text-muted-foreground text-center space-y-1">
                      <p>
                        {s(
                          "زمان تحویل پس از تأیید موجودی اعلام می‌شود.",
                          "Delivery timing follows stock confirmation.",
                        )}
                      </p>
                      <p>✓ پشتیبانی ۲۴/۷</p>
                      <p>
                        {s(
                          "شرایط سرویس در استعلام نهایی ارائه می‌شود.",
                          "Service terms are provided with the final quote.",
                        )}
                      </p>
                      {mode === "multilocation" && (
                        <p>✓ چندین IP از لوکیشن‌های مختلف</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              مرحله قبل
            </Button>
            {step < 4 ? (
              <Button
                onClick={() => setStep((s) => Math.min(4, s + 1))}
                disabled={!canProceed()}
                className="gap-2"
              >
                مرحله بعد
                <ArrowLeft className="w-4 h-4" />
              </Button>
            ) : null}
          </div>
        </div>
      }
    </LegacyLocale>
  );
};

export default VpsOrderPage;
