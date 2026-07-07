import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Copy, Search, Printer, Mail, Server, Globe, Shield, CalendarClock, MapPin, Cpu, HardDrive, Wifi } from 'lucide-react';
import { userServices, userDomains, type UnifiedService, type UnifiedDomain } from '@/data/userServices';
import { toPersianDigits } from '@/lib/numberUtils';

const copy = (v: string) => {
  navigator.clipboard?.writeText(v);
  toast({ title: 'کپی شد', description: v });
};

const Row: React.FC<{ label: string; value?: React.ReactNode; mono?: boolean; copyable?: string }> = ({ label, value, mono, copyable }) => {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="flex items-start justify-between gap-3 py-1.5 border-b border-dashed border-border/60 last:border-0">
      <span className="text-xs text-muted-foreground shrink-0">{label}</span>
      <div className="flex items-center gap-2 min-w-0">
        <span className={`text-sm font-medium text-foreground truncate ${mono ? 'font-mono tracking-tight' : ''}`} dir={mono ? 'ltr' : undefined}>
          {value}
        </span>
        {copyable && (
          <button
            onClick={() => copy(copyable)}
            className="text-muted-foreground hover:text-primary transition-colors"
            title="کپی"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

const ServiceCard: React.FC<{ s: UnifiedService }> = ({ s }) => {
  const isServer = s.kind !== 'hosting';
  const password = 'Nvds!' + s.id.slice(-4) + '#2025';
  return (
    <Card id={`svc-${s.id}`} className="overflow-hidden border-2 border-border">
      {/* Email-style header */}
      <div className="bg-gradient-to-l from-primary to-primary/80 text-primary-foreground px-4 py-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 min-w-0">
            <Mail className="w-4 h-4 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs opacity-90">اطلاعات سرویس (مانند ایمیل ثبت شده)</div>
              <div className="text-sm font-bold truncate">{s.productName}</div>
            </div>
          </div>
          <Badge className="bg-emerald-500/20 border border-emerald-200/50 text-white text-[10px]">
            {s.status === 'active' ? 'فعال' : s.status}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        <p className="text-xs text-muted-foreground leading-6 bg-muted/40 rounded-md p-3">
          کاربر گرامی، سرویس شما با موفقیت فعال شد. اطلاعات دسترسی و مشخصات کامل سرویس در ادامه درج شده است.
          لطفاً این اطلاعات را در محل امنی نگهداری کنید.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Identity */}
          <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Server className="w-4 h-4" />
              <span className="text-sm font-bold">شناسه سرویس</span>
            </div>
            <Row label="شناسه" value={s.id} mono copyable={s.id} />
            <Row label="محصول" value={s.productName} />
            <Row label="گروه" value={s.groupName} />
            <Row label="پلن" value={s.plan} />
          </div>

          {/* Access */}
          <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-bold">اطلاعات دسترسی</span>
            </div>
            {isServer ? (
              <>
                <Row label="IP اصلی" value={s.ip} mono copyable={s.ip} />
                {s.ips?.map((ip, i) => (
                  <Row key={ip} label={`IP #${toPersianDigits(i + 1)}`} value={ip} mono copyable={ip} />
                ))}
                <Row label="نام کاربری" value={s.os?.toLowerCase().includes('windows') ? 'Administrator' : 'root'} mono copyable={s.os?.toLowerCase().includes('windows') ? 'Administrator' : 'root'} />
                <Row label="رمز عبور" value={password} mono copyable={password} />
                <Row label="پورت" value={toPersianDigits(s.os?.toLowerCase().includes('windows') ? '3389' : '22')} mono />
              </>
            ) : (
              <>
                <Row label="دامنه" value={s.name} mono copyable={s.name} />
                <Row label="کنترل پنل" value={s.panel} />
                <Row label="نام کاربری" value={s.name.split('.')[0]} mono copyable={s.name.split('.')[0]} />
                <Row label="رمز عبور" value={password} mono copyable={password} />
                <Row label="آدرس پنل" value={`https://${s.name}:2083`} mono copyable={`https://${s.name}:2083`} />
              </>
            )}
          </div>

          {/* Specs */}
          <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Cpu className="w-4 h-4" />
              <span className="text-sm font-bold">مشخصات سخت‌افزاری</span>
            </div>
            {isServer && <Row label="سیستم‌عامل" value={s.os} />}
            {isServer && <Row label="CPU" value={s.cpu !== undefined ? `${toPersianDigits(s.cpu)}٪ مصرف` : undefined} />}
            {isServer && <Row label="RAM" value={s.ram !== undefined ? `${toPersianDigits(s.ram)}٪ مصرف` : undefined} />}
            {!isServer && <Row label="فضا" value={s.diskLimit ? `${toPersianDigits(s.diskLimit)} گیگابایت` : undefined} />}
            {!isServer && <Row label="پهنای‌باند" value={s.bandwidthLimit ? `${toPersianDigits(s.bandwidthLimit)} گیگابایت` : undefined} />}
          </div>

          {/* Billing */}
          <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <CalendarClock className="w-4 h-4" />
              <span className="text-sm font-bold">مشخصات صورتحساب</span>
            </div>
            <Row label="لوکیشن" value={s.location} />
            <Row label="تاریخ ثبت" value={toPersianDigits(s.registrationDate)} />
            <Row label="تاریخ سررسید" value={toPersianDigits(s.expiry)} />
            <Row label="دوره" value={s.billingCycle === 'Monthly' ? 'ماهانه' : s.billingCycle === 'Annually' ? 'سالانه' : s.billingCycle === 'Hourly' ? 'ساعتی' : s.billingCycle === 'Quarterly' ? 'سه‌ماهه' : s.billingCycle} />
            <Row label="مبلغ" value={`${toPersianDigits(s.amount.toLocaleString('en-US'))} تومان`} />
          </div>
        </div>

        <div className="text-[11px] text-muted-foreground bg-blue-50 dark:bg-blue-950/30 rounded-md p-3 leading-6">
          توصیه‌های امنیتی: بلافاصله رمز عبور پیش‌فرض را تغییر دهید، از ورود چندعاملی استفاده کنید و
          هرگز اطلاعات دسترسی را از طریق کانال‌های عمومی ارسال نکنید. در صورت بروز مشکل، از بخش پشتیبانی تیکت ثبت کنید.
        </div>
      </CardContent>
    </Card>
  );
};

const DomainCard: React.FC<{ d: UnifiedDomain }> = ({ d }) => (
  <Card id={`svc-${d.id}`} className="overflow-hidden border-2 border-border">
    <div className="bg-gradient-to-l from-cyan-600 to-cyan-500 text-white px-4 py-3">
      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4" />
        <div>
          <div className="text-xs opacity-90">اطلاعات دامنه</div>
          <div className="text-sm font-bold" dir="ltr">{d.domain}</div>
        </div>
      </div>
    </div>
    <CardContent className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-lg border p-3">
          <Row label="دامنه" value={d.domain} mono copyable={d.domain} />
          <Row label="ثبت‌کننده" value={d.registrar} />
          <Row label="تاریخ ثبت" value={toPersianDigits(d.registrationDate)} />
          <Row label="تاریخ سررسید" value={toPersianDigits(d.expiry)} />
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <Wifi className="w-4 h-4" />
            <span className="text-sm font-bold">Nameserverها</span>
          </div>
          {d.nameservers.map((ns) => (
            <Row key={ns} label="NS" value={ns} mono copyable={ns} />
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

interface Props {
  onBack?: () => void;
}

const ServiceInfoPage: React.FC<Props> = () => {
  const [q, setQ] = useState('');
  const services = useMemo(() =>
    userServices.filter(s => `${s.id} ${s.name} ${s.productName} ${s.ip ?? ''}`.toLowerCase().includes(q.toLowerCase())),
    [q]
  );
  const domains = useMemo(() =>
    userDomains.filter(d => `${d.id} ${d.domain}`.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  const handlePrint = () => window.print();

  return (
    <div dir="rtl" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold mb-1">اطلاعات سرویس‌ها</h1>
          <p className="text-sm text-muted-foreground">
            نمایش کامل مشخصات و اطلاعات دسترسی همه سرویس‌ها، مشابه ایمیل تحویل سرویس.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="جستجو..." className="pr-10 w-64" />
          </div>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="w-4 h-4 ml-1" /> چاپ
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {services.map((s) => <ServiceCard key={s.id} s={s} />)}
        {domains.map((d) => <DomainCard key={d.id} d={d} />)}
        {services.length === 0 && domains.length === 0 && (
          <div className="text-center text-muted-foreground py-12">موردی یافت نشد.</div>
        )}
      </div>
    </div>
  );
};

export default ServiceInfoPage;
