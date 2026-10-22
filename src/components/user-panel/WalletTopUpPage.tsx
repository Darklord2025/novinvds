import BackButton from "./BackButton";
import MarketRates from './MarketRates';
import React, { useState } from "react";
import {
  ArrowRight,
  Wallet,
  ShieldCheck,
  Coins,
  ArrowDownLeft,
  CheckCircle2,
} from "lucide-react";
import { usePanelData } from "@/contexts/PanelDataContext";
import { PanelHeading, usePanelCopy } from "./PanelPrimitives";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PaymentOptions from "./PaymentOptions";
import type { PaymentMethod } from "@/data/paymentMethods";
export default function WalletTopUpPage({ onBack }: { onBack?: () => void }) {
  const { action, preview } = usePanelData();
  const { s, n, money } = usePanelCopy();
  const [amount, setAmount] = useState("250000"),
    [currency, setCurrency] = useState("TOMAN"),
    [method, setMethod] = useState<PaymentMethod>("card"),
    [quote, setQuote] = useState<any>(null),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  const value = Number(amount),
    toman =
      currency === "TOMAN"
        ? value
        : currency === "IRR"
          ? value / 10
          : quote?.amountToman;
  async function getQuote() {
    setBusy(true);
    setMessage("");
    try {
      setQuote(
        await action("deposit-quote", { amount: value, currency, method }),
      );
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function submit() {
    if (!Number.isFinite(toman) || toman <= 0) return;
    setBusy(true);
    try {
      const r = await action("deposit", {
        amount: value,
        currency,
        method,
        quoteId: quote?.id,
      });
      setMessage(
        r.preview
          ? s(
              "پیش‌نمایش واریز آماده شد. موجودی فقط پس از تایید پرداخت افزایش می‌یابد.",
              "Deposit preview prepared. Funds are credited only after payment confirmation.",
            )
          : s(
              "درخواست واریز ثبت شد؛ وضعیت تایید در کیف پول نمایش داده می‌شود.",
              "Deposit request created; confirmation appears in your wallet.",
            ),
      );
      if (r.checkoutUrl) {
        const u = new URL(r.checkoutUrl);
        if (u.protocol !== "https:") throw Error("Invalid checkout URL");
        location.assign(u.href);
      }
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="space-y-6">
      <PanelHeading
        title={s("افزایش موجودی کیف پول", "Add funds to your wallet")}
        subtitle={s(
          "انتخاب مبلغ، روش پرداخت و بررسی معادل تومان",
          "Choose an amount and method, then review the Toman equivalent",
        )}
        action={
          onBack && (
            <BackButton variant="outline" onClick={onBack}>

<MarketRates/>

              {s("بازگشت به کیف پول", "Back to wallet")}
            </BackButton>
          )
        }
      />
      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5">
        <div className="space-y-5">
          <Card className="rounded-2xl border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Wallet className="text-blue-500" />
                {s("مبلغ واریز", "Deposit amount")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[100000, 250000, 500000, 1000000].map((v) => (
                  <Button
                    key={v}
                    variant={
                      amount === String(v) && currency === "TOMAN"
                        ? "default"
                        : "outline"
                    }
                    className="h-12 rounded-xl"
                    onClick={() => {
                      setAmount(String(v));
                      setCurrency("TOMAN");
                      setQuote(null);
                    }}
                  >
                    {n(v.toLocaleString())}
                  </Button>
                ))}
              </div>
              <div className="flex gap-3">
                <Input
                  inputMode="decimal"
                  aria-label={s("مبلغ", "Amount")}
                  value={amount}
                  onChange={(e) => {
                    setAmount(
                      e.target.value.replace(/[۰-۹]/g, (d) =>
                        String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)),
                      ),
                    );
                    setQuote(null);
                  }}
                />
                <select
                  className="rounded-lg border px-3 bg-card"
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value);
                    setQuote(null);
                  }}
                  aria-label={s("واحد پرداخت", "Payment currency")}
                >
                  {["TOMAN", "IRR", "USD", "EUR", "USDT", "BTC", "ETH"].map(
                    (c) => (
                      <option key={c} value={c}>
                        {c === "TOMAN"
                          ? s("تومان", "Toman")
                          : c === "IRR"
                            ? s("ریال", "IRR")
                            : c}
                      </option>
                    ),
                  )}
                </select>
              </div>
              {!["TOMAN", "IRR"].includes(currency) && (
                <Button
                  variant="outline"
                  disabled={busy || value <= 0}
                  onClick={getQuote}
                >
                  <Coins size={16} />
                  {s(
                    "دریافت نرخ تبدیل معتبر",
                    "Get a verified conversion quote",
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="pt-6">
              <PaymentOptions
                value={method}
                onChange={(v) => {
                  if (v !== "wallet") setMethod(v);
                  setQuote(null);
                }}
              />
            </CardContent>
          </Card>
        </div>
        <aside>
          <Card className="rounded-2xl sticky top-4 overflow-hidden">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-6">
              <ArrowDownLeft className="mb-3" />
              <p className="text-sm opacity-85">
                {s("معادل واریز به کیف پول", "Wallet credit equivalent")}
              </p>
              <strong className="text-2xl block mt-3">
                {toman > 0
                  ? money(toman)
                  : s("نیازمند نرخ تبدیل", "Conversion quote required")}
              </strong>
            </div>
            <CardContent className="space-y-4 pt-5">
              {quote?.rateToman && (
                <p className="text-sm">
                  {s("نرخ هر واحد", "Rate per unit")}: {money(quote.rateToman)}
                  <small className="block text-muted-foreground">
                    {s("اعتبار نرخ تا", "Quote valid until")}{" "}
                    {new Date(quote.expiresAt).toLocaleTimeString()}
                  </small>
                </p>
              )}
              <p className="text-sm text-muted-foreground leading-7">
                {s(
                  "کارمزد بانک یا شبکه هنگام پرداخت مشخص می‌شود. واریز در انتظار تایید، موجودی قابل استفاده محسوب نمی‌شود.",
                  "Bank or network fees are disclosed at checkout. Pending deposits are not part of the available balance.",
                )}
              </p>
              <Button
                onClick={submit}
                disabled={busy || !toman || value <= 0}
                className="w-full rounded-xl h-12 gap-2"
              >
                <ShieldCheck size={18} />
                {s("ادامه و بررسی پرداخت", "Continue to payment review")}
              </Button>
              <p role="status" className="text-sm leading-6">
                {message}
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
