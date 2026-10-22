import BackButton from "./BackButton";
import { usePanelData } from "@/contexts/PanelDataContext";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { InvoiceData } from "@/lib/billing";
import { cartInvoice } from "@/lib/cart-invoice";
import { InvoiceDocument } from "./InvoiceDocument";
import InvoiceActions from "./InvoiceActions";
import PaymentOptions from "./PaymentOptions";
import { InvoicePaymentMethod } from "@/data/paymentMethods";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
export default function ProformaInvoicePage({
  onBack,
}: {
  onBack?: () => void;
}) {
  const { data, action, preview } = usePanelData();
  const [message, setMessage] = useState("");
  const { items, reward } = useCart();
  const demoOnly = items.some(
    (i) =>
      i.meta?.demo || String(i.meta?.supplierPlanId || "").startsWith("demo-"),
  );
  const { language } = useLanguage();
  const fa = language === "fa";
  const [method, setMethod] = useState<InvoicePaymentMethod>("card"),
    [payment, setPayment] = useState(false);
  const invoice: InvoiceData = {
    ...cartInvoice(items, new Date().toISOString().slice(0, 10), reward),
    buyer: data.profile,
    dueDate: fa ? "تعیین نشده" : "Not assigned",
  };
  return (
    <div className="space-y-5 min-w-0" dir={fa ? "rtl" : "ltr"}>
      <header className="flex flex-wrap items-center gap-3">
        {onBack && (
          <BackButton variant="outline" onClick={onBack}>

            {fa ? "بازگشت به سبد خرید" : "Back to cart"}
          </BackButton>
        )}
        <h1 className="text-xl font-bold">
          {fa ? "پیش‌فاکتور" : "Proforma invoice"}
        </h1>
      </header>
      {!items.length ? (
        <div className="py-12 text-center space-y-3">
          <ShoppingCart className="mx-auto text-muted-foreground" />
          <p>{fa ? "سبد خرید خالی است." : "Your cart is empty."}</p>
        </div>
      ) : (
        <>
          <InvoiceDocument invoice={invoice} />
          <p className="text-sm text-muted-foreground">
            {fa
              ? "مالیات سفارش جدید ۱۰٪ است. قیمت نهایی و موجودی پیش از صدور توسط ارائه‌دهنده تایید می‌شود."
              : "New orders include 10% VAT. Final pricing and availability are confirmed by the provider."}
          </p>
          <InvoiceActions invoice={invoice} />
          {demoOnly ? (
            <p role="status" className="rounded-xl bg-amber-500/10 p-4 text-sm">
              {fa
                ? "سند این پلن فقط نمونه است. پس از تأمین و جایگزینی پلن واقعی، استعلام و پرداخت فعال می‌شود."
                : "This plan document is a sample. Quoting and payment become available after a verified supplier plan replaces it."}
            </p>
          ) : !payment ? (
            <Button onClick={() => setPayment(true)}>
              {fa ? "ادامه به بررسی پرداخت" : "Continue to payment review"}
            </Button>
          ) : (
            <div className="space-y-4">
              <PaymentOptions
                includeWallet
                value={method}
                onChange={setMethod}
              />
              <Button
                onClick={async () => {
                  try {
                    const r = await action("cart-invoice", {
                      items,
                      rewardCode: reward?.code,
                    });
                    setMessage(
                      r.preview
                        ? fa
                          ? "پیش‌نمایش سفارش؛ پرداخت واقعی انجام نشده است."
                          : "Order preview; no real payment was made."
                        : (fa
                            ? "پیش‌فاکتور صادر شد. از قسمت فاکتورها پرداخت کنید: "
                            : "Proforma created. Pay from Invoices: ") +
                            r.invoiceId,
                    );
                  } catch (e) {
                    setMessage((e as Error).message);
                  }
                }}
              >
                {fa
                  ? "صدور پیش‌فاکتور با قیمت تاییدشده"
                  : "Create proforma with verified pricing"}
              </Button>
              <p role="status">{message}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
