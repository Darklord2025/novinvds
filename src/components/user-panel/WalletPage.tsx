import { normalizeDigits } from "@/lib/localized-number";
import React, { useState } from "react";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Receipt,
  TrendingDown,
  Plus,
  Printer,
  Download,
} from "lucide-react";
import { usePanelData } from "@/contexts/PanelDataContext";
import { accountWallet } from "@/lib/panel-model";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ColorStat,
  UsageDonut,
  PanelHeading,
  usePanelCopy,
} from "./PanelPrimitives";
export default function WalletPage({
  onNavigate = () => {},
}: {
  onNavigate?: (tab: string) => void;
}) {
  const { data, action, preview } = usePanelData();
  const { s, n, money } = usePanelCopy();
  const summary = accountWallet(data);
  const [open, setOpen] = useState(false),
    [source, setSource] = useState("saved"),
    [amount, setAmount] = useState(""),
    [iban, setIban] = useState(""),
    [owner, setOwner] = useState(""),
    [confirmed, setConfirmed] = useState(false),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  async function withdraw(e: React.FormEvent) {
    e.preventDefault();
    const value = Number(normalizeDigits(amount).replace(/[^\d]/g, ""));
    if (!value || value > summary.balance || !confirmed) {
      setMessage(
        s(
          "مبلغ و مالکیت حساب را بررسی کنید.",
          "Check the amount and account ownership.",
        ),
      );
      return;
    }
    if (source === "other" && (!/^IR\d{24}$/.test(iban) || !owner.trim())) {
      setMessage(
        s(
          "شماره شبا و نام صاحب حساب معتبر وارد کنید.",
          "Enter a valid IBAN and account holder.",
        ),
      );
      return;
    }
    setBusy(true);
    try {
      const r = await action("withdraw", {
        amountToman: value,
        source,
        iban: source === "other" ? iban : undefined,
        owner: source === "other" ? owner : undefined,
      });
      setMessage(
        r.preview
          ? s(
              "پیش‌نمایش درخواست آماده شد؛ هیچ وجهی منتقل نشد.",
              "Preview request prepared; no money was transferred.",
            )
          : s(
              "درخواست برداشت برای بررسی ثبت شد.",
              "Withdrawal request submitted for review.",
            ),
      );
      setIban("");
      setOwner("");
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="space-y-6">
      <PanelHeading
        title={s("مدیریت کیف پول", "Wallet management")}
        subtitle={s(
          "واریز، برداشت و ریز مصرف، همگی به تومان",
          "Deposits, withdrawals and usage, all in Toman",
        )}
        action={
          <Button
            onClick={() => onNavigate("wallet-topup")}
            className="rounded-xl gap-2"
          >
            <Plus size={17} />
            {s("واریز / افزایش موجودی", "Deposit / top up")}
          </Button>
        }
      />
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <ColorStat
          title={s("موجودی قابل استفاده", "Available balance")}
          value={money(summary.balance)}
          icon={Wallet}
        />
        <ColorStat
          title={s("مجموع واریز تاییدشده", "Confirmed deposits")}
          value={money(summary.deposits)}
          icon={ArrowDownLeft}
          color="green"
        />
        <ColorStat
          title={s("مصرف موجودی", "Wallet spending")}
          value={money(summary.spent)}
          icon={TrendingDown}
          color="purple"
        />
        <ColorStat
          title={s("در انتظار تایید", "Pending confirmation")}
          value={n(summary.pending)}
          icon={Receipt}
          color="amber"
        />
      </div>
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">
              {s("خلاصه مصرف", "Usage overview")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UsageDonut ledger={data.ledger} />
            <Button
              variant="outline"
              className="w-full mt-5 rounded-xl"
              onClick={() => onNavigate("wallet-usage")}
            >
              {s(
                "مشاهده ریز مصرف و چاپ گزارش",
                "Usage details and printable report",
              )}
            </Button>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">
              {s("عملیات کیف پول", "Wallet actions")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 justify-between h-14"
              onClick={() => onNavigate("wallet-topup")}
            >
              {s("واریز به کیف پول", "Add funds")}
              <ArrowDownLeft />
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-xl justify-between h-14"
              onClick={() => {
                setOpen(true);
                setMessage("");
              }}
            >
              {s("درخواست برداشت", "Request withdrawal")}
              <ArrowUpRight />
            </Button>
            <p className="text-xs leading-6 text-muted-foreground">
              {s(
                "واریز ارزی فقط با نرخ تبدیل تاییدشده، معادل تومانی می‌گیرد. برداشت پس از بررسی مالکیت حساب و تایید امور مالی انجام می‌شود.",
                "Foreign-currency deposits use a confirmed conversion quote. Withdrawals require account ownership and finance approval.",
              )}
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">
            {s("تراکنش‌های اخیر", "Recent transactions")}
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {data.ledger.map((r) => (
            <div
              key={r.id}
              className="flex flex-wrap justify-between gap-2 py-3 text-sm"
            >
              <span>
                {r.description}
                <small className="block text-muted-foreground mt-1">
                  {new Date(r.at).toLocaleDateString(s("fa-IR", "en-US"))}
                </small>
              </span>
              <span
                className={
                  r.amountToman > 0 ? "text-emerald-600" : "text-rose-500"
                }
              >
                {money(r.amountToman)}
                <small className="block text-muted-foreground">
                  {r.status === "confirmed"
                    ? s("تاییدشده", "Confirmed")
                    : s("در انتظار", "Pending")}
                </small>
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {s("درخواست برداشت موجودی", "Request a withdrawal")}
            </DialogTitle>
            <DialogDescription>
              {s(
                "فقط به حساب بانکی به نام صاحب حساب کاربری.",
                "Only to a bank account in the account owner’s name.",
              )}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={withdraw} className="space-y-4">
            <Label>
              {s("مبلغ برداشت (تومان)", "Amount (Toman)")}
              <Input
                inputMode="numeric"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                ["saved", s("مشخصات ثبت‌شده", "Saved bank details")],
                [
                  "other",
                  s("حساب دیگر به نام خودم", "Another account in my name"),
                ],
              ].map(([v, l]) => (
                <Button
                  key={v}
                  type="button"
                  variant={source === v ? "default" : "outline"}
                  className="h-auto whitespace-normal"
                  onClick={() => setSource(v)}
                >
                  {l}
                </Button>
              ))}
            </div>
            {source === "other" ? (
              <>
                <Label>
                  {s("نام صاحب حساب", "Account holder")}
                  <Input
                    required
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                  />
                </Label>
                <Label>
                  {s("شماره شبا", "IBAN")}
                  <Input
                    dir="ltr"
                    placeholder="IR…"
                    required
                    value={iban}
                    onChange={(e) =>
                      setIban(
                        normalizeDigits(e.target.value)
                          .toUpperCase()
                          .replace(/\s/g, ""),
                      )
                    }
                  />
                </Label>
              </>
            ) : (
              <p className="text-xs text-muted-foreground">
                {s(
                  "مشخصات تاییدشده از پرونده مالی شما توسط سرور بررسی می‌شود.",
                  "The server checks the verified bank details in your account.",
                )}
              </p>
            )}
            <Label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              {s(
                "حساب مقصد به نام خودم است.",
                "The destination account is in my name.",
              )}
            </Label>
            <Button disabled={busy || !confirmed} className="w-full">
              {s("ثبت درخواست برداشت", "Submit withdrawal request")}
            </Button>
            <p role="status" className="text-sm">
              {message}
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
