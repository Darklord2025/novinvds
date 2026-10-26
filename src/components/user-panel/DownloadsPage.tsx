import { Download, ExternalLink, BookOpen, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PanelHeading, usePanelCopy } from "./PanelPrimitives";
const software = [
  {
    name: "WinSCP",
    category: "sftp",
    os: "Windows",
    url: "https://winscp.net/eng/download.php",
    fa: "انتقال فایل امن با SFTP و SCP",
    en: "Secure SFTP and SCP file transfer",
  },
  {
    name: "FileZilla Client",
    category: "sftp",
    os: "Windows / Linux / macOS",
    url: "https://filezilla-project.org/download.php?type=client",
    fa: "مدیریت و انتقال فایل به هاست",
    en: "Transfer and manage hosting files",
  },
  {
    name: "PuTTY",
    category: "ssh",
    os: "Windows",
    url: "https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html",
    fa: "اتصال SSH به سرور",
    en: "Connect to a server over SSH",
  },
  {
    name: "OpenSSH",
    category: "ssh",
    os: "Windows / Linux / macOS",
    url: "https://www.openssh.com/",
    fa: "ابزار خط فرمان اتصال امن",
    en: "Secure command-line connectivity",
  },
  {
    name: "Microsoft Windows App",
    category: "rdp",
    os: "Windows / macOS / mobile",
    url: "https://learn.microsoft.com/en-us/windows-app/get-started-connect-devices-desktops-apps",
    fa: "اتصال به دسکتاپ راه دور ویندوز",
    en: "Connect to remote Windows desktops",
  },
];
export default function DownloadsPage({
  onKnowledge,
}: {
  onKnowledge?: () => void;
}) {
  const { s } = usePanelCopy();
  const [category, setCategory] = useState("all"),
    [query, setQuery] = useState("");
  return (
    <div className="space-y-6">
      <PanelHeading
        title={s("مرکز دانلود", "Download center")}
        subtitle={s(
          "ابزارهای اتصال و مدیریت، از وب‌سایت رسمی ناشر",
          "Connection and management tools from their official publishers",
        )}
        action={
          onKnowledge && (
            <Button variant="outline" onClick={onKnowledge}>
              <BookOpen size={16} className="me-2" />
              {s(
                "راهنمای سایت در مرکز دانش",
                "Site guide in the knowledge center",
              )}
            </Button>
          )
        }
      />
      <div className="flex flex-wrap gap-3">
        <Input
          className="max-w-md"
          aria-label={s("جستجوی نرم‌افزار", "Search software")}
          placeholder={s(
            "نام ابزار یا سیستم‌عامل",
            "Tool name or operating system",
          )}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {[
          ["all", "همه", "All"],
          ["ssh", "اتصال SSH", "SSH"],
          ["sftp", "انتقال فایل", "File transfer"],
          ["rdp", "دسکتاپ راه دور", "Remote desktop"],
        ].map(([id, f, en]) => (
          <Button
            key={id}
            variant={category === id ? "default" : "outline"}
            onClick={() => setCategory(id)}
          >
            {s(f, en)}
          </Button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {software
          .filter(
            (v) =>
              (category === "all" || v.category === category) &&
              (v.name + v.os + s(v.fa, v.en))
                .toLowerCase()
                .includes(query.toLowerCase()),
          )
          .map((v) => (
            <article
              key={v.name}
              className="rounded-2xl border bg-card p-6 space-y-4"
            >
              <Download className="text-blue-500" />
              <h2 className="font-bold text-lg" dir="ltr">
                {v.name}
              </h2>
              <p className="text-sm text-muted-foreground">{s(v.fa, v.en)}</p>
              <p className="text-xs" dir="ltr">
                {v.os}
              </p>
              <Button asChild variant="outline">
                <a href={v.url} target="_blank" rel="noreferrer">
                  <ExternalLink size={15} className="me-2" />
                  {s(
                    "آخرین نسخه در سایت ناشر",
                    "Latest version from publisher",
                  )}
                </a>
              </Button>
            </article>
          ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {s(
          "فایل نصب مجدد سرور، نسخه پشتیبان و تنظیمات اختصاصی فقط پس از اتصال سرویس واقعی در دسترس خواهند بود. راهنماها در مرکز دانش قرار دارند.",
          "Server reinstall images, backups and private configuration files require a connected service. Guides are in the knowledge center.",
        )}
      </p>
    </div>
  );
}
