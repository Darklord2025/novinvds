import { normalizeDigits } from "@/lib/localized-number";
import AccountConversion from "./AccountConversion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTheme } from "@/contexts/ThemeContext";
import { Building2, Shield, Wallet, Palette } from "lucide-react";
import { useEffect, useState } from "react";
import { usePanelData } from "@/contexts/PanelDataContext";
import { PanelHeading, usePanelCopy } from "./PanelPrimitives";
import SecurityCenterPage from "./SecurityCenterPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, User, Save } from "lucide-react";
export default function ProfileSettingsPage({
  initialTab = "profile",
}: {
  initialTab?: string;
}) {
  const { s, n, fa } = usePanelCopy();
  const theme = useTheme();
  const [bank, setBank] = useState({ iban: "", owner: "" });
  const { data, saveProfile, savePreferences, preview, action } =
    usePanelData();
  const [profile, setProfile] = useState(data.profile),
    [prefs, setPrefs] = useState(data.preferences),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  useEffect(() => {
    setProfile(data.profile);
    setPrefs(data.preferences);
  }, [data.profile, data.preferences]);
  async function save(kind: string) {
    setBusy(true);
    try {
      if (kind === "profile") await saveProfile(profile);
      else await savePreferences(prefs);
      setMessage(
        preview
          ? s("فقط در پیش‌نمایش ذخیره شد.", "Saved in preview only.")
          : s("تنظیمات ذخیره شد.", "Settings saved."),
      );
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="space-y-6">
      <PanelHeading
        title={s("تنظیمات حساب کاربری", "Account settings")}
        subtitle={s(
          "مشخصات، اعلان‌ها و امنیت حساب",
          "Profile, notifications and account security",
        )}
      />
      <Tabs defaultValue={initialTab} dir={fa ? "rtl" : "ltr"}>
        <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0 mb-5">
          {[
            ["profile", User, "مشخصات حساب", "Profile"],
            ["security", Shield, "امنیت", "Security"],
            ["notifications", Bell, "اعلان‌ها", "Notifications"],
            ["bank", Wallet, "حساب‌های بانکی", "Bank accounts"],
            ["theme", Palette, "ظاهر پنل", "Appearance"],
          ].map(([key, Icon, f, en]) => {
            const I = Icon as typeof User;
            return (
              <TabsTrigger
                key={String(key)}
                value={String(key)}
                className={"border rounded-xl px-4 py-3 gap-2 transition-all "+({profile:"border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white",security:"border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 data-[state=active]:bg-emerald-600 data-[state=active]:text-white",notifications:"border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300 data-[state=active]:bg-amber-500 data-[state=active]:text-white",bank:"border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300 data-[state=active]:bg-violet-600 data-[state=active]:text-white",theme:"border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300 data-[state=active]:bg-rose-600 data-[state=active]:text-white"})[String(key)]}
              >
                <I size={17} />
                {s(String(f), String(en))}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value="profile">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void save("profile");
            }}
            className="rounded-2xl border bg-card p-5 space-y-5"
          >
            <h2 className="flex gap-2 font-bold">
              <User className="text-blue-500" />
              {s("مشخصات حساب", "Account profile")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-blue-500/10 p-4 text-sm">
                <strong>
                  {profile.kind === "company"
                    ? s("حساب حقوقی", "Company account")
                    : s("حساب حقیقی", "Individual account")}
                </strong>
                <p className="mt-2">
                  {profile.kind === "company" ? profile.company : profile.name}
                </p>
              </div>
              {(
                [
                  ["name", "نام کامل", "Full name"],
                  ["username", "نام کاربری", "Username"],
                  ...(profile.kind === "company"
                    ? [
                        ["company", "نام شرکت", "Company name"],
                        ["nationalId", "شناسه ملی", "Company national ID"],
                        ["economicCode", "کد اقتصادی", "Economic code"],
                        [
                          "registrationNumber",
                          "شماره ثبت",
                          "Registration number",
                        ],
                      ]
                    : [["nationalId", "کد ملی", "National ID"]]),
                  ["postalCode", "کد پستی", "Postal code"],
                  ["address", "نشانی", "Address"],
                ] as string[][]
              ).map(([key, fa, en]) => (
                <Label key={key}>
                  {s(fa, en)}
                  <Input
                    className="mt-2"
                    readOnly={
                      profile.kind === "company" &&
                      [
                        "name",
                        "company",
                        "nationalId",
                        "economicCode",
                        "registrationNumber",
                      ].includes(key)
                    }
                    value={
                      [
                        "nationalId",
                        "postalCode",
                        "economicCode",
                        "registrationNumber",
                      ].includes(key)
                        ? n(String(profile[key as keyof typeof profile]))
                        : String(profile[key as keyof typeof profile])
                    }
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        [key]: [
                          "nationalId",
                          "postalCode",
                          "economicCode",
                          "registrationNumber",
                        ].includes(key)
                          ? normalizeDigits(e.target.value)
                          : e.target.value,
                      })
                    }
                  />
                </Label>
              ))}
              <Label>
                {s("ایمیل تاییدشده", "Verified email")}
                <Input
                  className="mt-2"
                  value={profile.email}
                  readOnly
                  dir="ltr"
                />
              </Label>
            </div>
            <Button disabled={busy}>
              <Save size={16} />
              {s("ذخیره مشخصات", "Save profile")}
            </Button>
          </form>
          <div className="mt-5">
            <AccountConversion />
          </div>
        </TabsContent>
        <TabsContent value="notifications">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void save("preferences");
            }}
            className="rounded-2xl border bg-card p-5 space-y-5"
          >
            <h2 className="font-bold flex gap-2">
              <Bell className="text-amber-500" />
              {s("تنظیمات اعلان‌ها", "Notification preferences")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ["email", "اعلان ایمیلی", "Email notifications"],
                ["inPanel", "اعلان داخل پنل", "In-app notifications"],
                ["invoice", "فاکتور و پرداخت", "Invoices and payments"],
                ["renewal", "یادآوری تمدید", "Renewal reminders"],
                ["ticket", "پاسخ تیکت", "Ticket replies"],
                ["wallet", "کاهش موجودی کیف پول", "Low wallet balance"],
                ["marketing", "پیشنهادها و بازاریابی", "Offers and marketing"],
                ["login", "اطلاع‌رسانی ورود جدید", "New sign-in alerts"],
              ].map(([key, fa, en]) => (
                <label
                  key={key}
                  className="border rounded-xl p-4 flex items-center gap-3"
                >
                  <input
                    type="checkbox"
                    checked={Boolean(prefs[key as keyof typeof prefs])}
                    onChange={(e) =>
                      setPrefs({ ...prefs, [key]: e.target.checked })
                    }
                  />
                  <span className="text-sm">{s(fa, en)}</span>
                </label>
              ))}
            </div>
            <Label className="block max-w-sm">
              {s(
                "آستانه هشدار موجودی — تومان",
                "Low balance threshold — Toman",
              )}
              <Input
                inputMode="numeric"
                value={n(prefs.thresholdToman)}
                onChange={(e) =>
                  setPrefs({
                    ...prefs,
                    thresholdToman: Number(
                      normalizeDigits(e.target.value).replace(/,/g, ""),
                    ),
                  })
                }
                className="mt-2"
              />
            </Label>
            <Button disabled={busy}>
              {s("ذخیره اعلان‌ها", "Save preferences")}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="security">
          <SecurityCenterPage />
        </TabsContent>
        <TabsContent value="bank">
          <form
            className="rounded-2xl border bg-card p-5 space-y-5"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await action("bank-save", bank);
                setMessage(
                  s(
                    "مشخصات برای بررسی مالکیت ثبت شد.",
                    "Bank details submitted for ownership review.",
                  ),
                );
                setBank({ iban: "", owner: "" });
              } catch (e) {
                setMessage((e as Error).message);
              }
            }}
          >
            <h2 className="font-bold">
              {s(
                "ثبت حساب بانکی به نام خودتان",
                "Register a bank account in your name",
              )}
            </h2>
            <Label className="block">
              {s("نام صاحب حساب", "Account holder")}
              <Input
                value={bank.owner}
                onChange={(e) => setBank({ ...bank, owner: e.target.value })}
                required
                className="mt-2"
              />
            </Label>
            <Label className="block">
              {s("شماره شبا", "IBAN")}
              <Input
                dir="ltr"
                value={bank.iban}
                onChange={(e) =>
                  setBank({
                    ...bank,
                    iban: normalizeDigits(e.target.value)
                      .toUpperCase()
                      .replace(/\s/g, ""),
                  })
                }
                required
                pattern="IR[0-9]{24}"
                className="mt-2"
              />
            </Label>
            <Button>
              {s("ثبت برای بررسی مالکیت", "Submit for ownership review")}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="theme">
          <section className="rounded-2xl border bg-card p-5 space-y-5">
            <h2 className="font-bold">
              {s("پوسته و زمان‌بندی", "Theme and schedule")}
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                ["light", "روشن", "Light"],
                ["dark", "تاریک", "Dark"],
                ["system", "سیستم", "System"],
                ["schedule", "زمان‌بندی", "Schedule"],
              ].map(([key, f, en]) => (
                <Button
                  key={key}
                  variant={theme.mode === key ? "default" : "outline"}
                  onClick={() => theme.setMode(key as any)}
                >
                  {s(f, en)}
                </Button>
              ))}
            </div>
            {theme.mode === "schedule" && (
              <div className="flex flex-wrap gap-4">
                <Label>
                  {s("شروع حالت تاریک", "Dark mode starts")}
                  <Input
                    type="time"
                    value={theme.settings.darkStart}
                    onChange={(e) =>
                      theme.updateSchedule(
                        e.target.value,
                        theme.settings.darkEnd,
                      )
                    }
                  />
                </Label>
                <Label>
                  {s("پایان حالت تاریک", "Dark mode ends")}
                  <Input
                    type="time"
                    value={theme.settings.darkEnd}
                    onChange={(e) =>
                      theme.updateSchedule(
                        theme.settings.darkStart,
                        e.target.value,
                      )
                    }
                  />
                </Label>
              </div>
            )}
          </section>
        </TabsContent>
      </Tabs>
      <p role="status" className="text-sm">
        {message}
      </p>
    </div>
  );
}
