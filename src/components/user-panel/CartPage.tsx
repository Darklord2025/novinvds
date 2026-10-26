import { usePanelCopy } from "./PanelPrimitives";
import { usePanelData } from "@/contexts/PanelDataContext";
import LegacyLocale from "@/components/LegacyLocale";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  ShoppingCart,
  ArrowRight,
  CreditCard,
  Server,
  Globe,
  Plus,
  Minus,
  HardDrive,
  Tag,
  Percent,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toPersianDigits } from "@/lib/numberUtils";
import { useCart } from "@/contexts/CartContext";

interface CartPageProps {
  onCheckout?: () => void;
  onBrowseServices?: () => void;
}

const typeIconMap: Record<string, React.ReactNode> = {
  vps: <Server size={20} />,
  domain: <Globe size={20} />,
  hosting: <HardDrive size={20} />,
  dedicated: <Server size={20} />,
  license: <Server size={20} />,
  addon: <Server size={20} />,
};

const CartPage: React.FC<CartPageProps> = ({
  onCheckout,
  onBrowseServices,
}) => {
  const { items, removeItem, updateQuantity, reward, setReward } = useCart();
  const { money, s, n } = usePanelCopy();
  const { action } = usePanelData();
  const [discountMessage, setDiscountMessage] = useState("");

  const [discountCode, setDiscountCode] = useState(reward?.code || "");
  const discountApplied = !!reward;
  const quoteOnly = items.some((i) => i.meta?.requiresQuote);
  const demoOnly = items.some(
    (i) =>
      i.meta?.demo || String(i.meta?.supplierPlanId || "").startsWith("demo-"),
  );
  const base = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = reward
    ? Math.min(reward.capToman, Math.floor((base * reward.percent) / 100))
    : 0;

  const applyDiscount = async () => {
    try {
      const result = await action("discount-preview", {
        code: discountCode.trim(),
      });
      setReward({
        code: discountCode.trim(),
        percent: result.percent,
        capToman: result.capToman,
      });
      setDiscountMessage(s("کد تایید شد.", "Code verified."));
    } catch {
      setReward(null);
      setDiscountMessage(
        s(
          "کد تخفیف نامعتبر یا منقضی است.",
          "Invalid or expired discount code.",
        ),
      );
    }
  };
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const tax = Math.round((subtotal - discountAmount) * 0.1);
  const total = subtotal + tax - discountAmount;

  const getTypeColor = (type: string) => {
    switch (type) {
      case "vps":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "domain":
        return "bg-green-500/10 text-green-600 border-green-200";
      case "hosting":
        return "bg-purple-500/10 text-purple-600 border-purple-200";
      case "license":
        return "bg-orange-500/10 text-orange-600 border-orange-200";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "vps":
        return "bg-blue-100 text-blue-600";
      case "domain":
        return "bg-green-100 text-green-600";
      case "hosting":
        return "bg-purple-100 text-purple-600";
      case "license":
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "vps":
        return "سرور مجازی";
      case "domain":
        return "دامنه";
      case "hosting":
        return "هاست";
      case "license":
        return "لایسنس";
      case "dedicated":
        return s("سرور اختصاصی", "Dedicated server");
      default:
        return type;
    }
  };

  return (
    <LegacyLocale>
      {
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-indigo-600 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">سبد خرید</h1>
                <p className="text-muted-foreground text-sm">
                  {items.length > 0
                    ? `${toPersianDigits(items.length.toString())} آیتم در سبد خرید`
                    : "سبد خرید شما خالی است"}
                </p>
              </div>
            </div>
          </div>

          {quoteOnly && (
            <p className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm leading-7">
              {demoOnly
                ? s(
                    "این سبد شامل پلن نمایشی است؛ مبلغ‌ها برآوردند و تا جایگزینی با پلن واقعی قابل پرداخت نیستند.",
                    "This cart includes a demo plan. Amounts are estimates and cannot be paid until replaced with verified supplier plans.",
                  )
                : s(
                    "مبلغ‌ها برآورد اولیه هستند؛ قیمت و موجودی پیش از صدور فاکتور تأیید می‌شوند.",
                    "Amounts are preliminary estimates. Price and stock are verified before an invoice is issued.",
                  )}
            </p>
          )}
          {items.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  سبد خرید شما خالی است
                </h3>
                <p className="text-muted-foreground mb-6">
                  برای شروع، از بخش سفارش سرویس جدید استفاده کنید
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Item Info */}
                        <div className="flex-1 p-4 flex items-start gap-4">
                          <div
                            className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${getTypeIcon(item.type)}`}
                          >
                            {typeIconMap[item.type] || <Server size={20} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold truncate">
                                {item.name}
                              </h3>
                              <Badge
                                variant="outline"
                                className={`shrink-0 ${getTypeColor(item.type)}`}
                              >
                                {getTypeLabel(item.type)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              دوره پرداخت: {item.period}
                            </p>
                            {item.specs && (
                              <div className="flex flex-wrap gap-2">
                                {item.specs.map((spec, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs bg-muted px-2 py-1 rounded-full"
                                  >
                                    {spec}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="p-4 bg-muted/30 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 md:w-48">
                          {/* Quantity */}
                          <div className="flex items-center gap-2">
                            <button
                              aria-label={
                                s("کاهش تعداد ", "Decrease quantity ") +
                                item.name
                              }
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded-lg bg-background shadow-sm flex items-center justify-center hover:bg-muted transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center font-bold">
                              {toPersianDigits(item.quantity.toString())}
                            </span>
                            <button
                              aria-label={
                                s("افزایش تعداد ", "Increase quantity ") +
                                item.name
                              }
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 rounded-lg bg-background shadow-sm flex items-center justify-center hover:bg-muted transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-center">
                            <p className="font-bold text-lg">
                              {money(item.price * item.quantity)}
                            </p>
                          </div>

                          {/* Remove */}
                          <button
                            aria-label={s("حذف ", "Remove ") + item.name}
                            onClick={() => removeItem(item.id)}
                            className="w-8 h-8 text-destructive hover:bg-destructive/10 rounded-lg flex items-center justify-center transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Discount Code */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      کد تخفیف
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3">
                      <Input
                        placeholder="کد تخفیف خود را وارد کنید"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={applyDiscount}
                        disabled={!discountCode}
                        variant="outline"
                      >
                        اعمال
                      </Button>
                    </div>
                    {discountApplied && (
                      <div className="flex items-center gap-2 mt-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-700 dark:text-green-400">
                          {s("تخفیف تایید شد: ", "Discount verified: ")}
                          {n(reward?.percent || 0)}
                          {s("٪", "%")}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-4">
                  <CardHeader className="bg-gradient-to-br from-primary to-indigo-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      خلاصه سفارش
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          تعداد آیتم‌ها:
                        </span>
                        <span className="font-medium">
                          {toPersianDigits(
                            items
                              .reduce((sum, item) => sum + item.quantity, 0)
                              .toString(),
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          جمع سبد خرید:
                        </span>
                        <span className="font-medium">{money(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          مالیات ({toPersianDigits("10")}٪):
                        </span>
                        <span className="font-medium">{money(tax)}</span>
                      </div>
                      {discountApplied && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span className="flex items-center gap-1">
                            <Percent className="w-3 h-3" />
                            تخفیف:
                          </span>
                          <span className="font-medium">
                            - {money(discountAmount)}
                          </span>
                        </div>
                      )}
                    </div>

                    <p role="status" className="text-xs">
                      {discountMessage}
                    </p>
                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                      <span>
                        {quoteOnly
                          ? s("برآورد با مالیات:", "Estimate incl. tax:")
                          : s("مبلغ قابل پرداخت:", "Amount payable:")}
                      </span>
                      <span className="text-primary">{money(total)}</span>
                    </div>

                    <Button
                      onClick={onCheckout}
                      className="w-full py-6 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-700"
                    >
                      <CreditCard className="w-5 h-5 ml-2" />
                      {quoteOnly
                        ? s(
                            "بررسی و استعلام سفارش",
                            "Review order and request quote",
                          )
                        : s("ادامه و پرداخت", "Continue to payment")}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      با تکمیل خرید، قوانین و مقررات را می‌پذیرید
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      }
    </LegacyLocale>
  );
};

export default CartPage;
