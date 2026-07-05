import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Search, Settings, ArrowRight, Server, HardDrive, Clock, Cloud, Database, Globe, RefreshCw, CreditCard, MapPin,
} from 'lucide-react';
import { userServices, ServiceKind } from '@/data/userServices';
import { toPersianDigits } from '@/lib/numberUtils';

interface Props {
  onManageService: (serviceId: string, serviceType?: string) => void;
  onRenewService: (serviceId: string, serviceType?: string) => void;
  onSuspendService?: (serviceId: string) => void;
  onUnsuspendService?: (serviceId: string) => void;
  onTerminateService?: (serviceId: string) => void;
  onViewInvoice?: (invoiceId: string) => void;
  onBack?: () => void;
  initialKind?: ServiceKind | 'all';
}

const KIND_META: Record<ServiceKind | 'all', { label: string; icon: any }> = {
  all: { label: 'همه', icon: Server },
  vps: { label: 'سرور مجازی', icon: Server },
  dedicated: { label: 'اختصاصی', icon: HardDrive },
  hourly: { label: 'ساعتی', icon: Clock },
  cloud: { label: 'ابری', icon: Cloud },
  multilocation: { label: 'مولتی‌لوکیشن', icon: Globe },
  hosting: { label: 'هاست', icon: Database },
};

const statusMeta = (s: string) => {
  switch (s) {
    case 'active': return { label: 'فعال', cls: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30' };
    case 'expiring': return { label: 'در حال انقضا', cls: 'bg-amber-500/15 text-amber-600 border-amber-500/30' };
    case 'suspended': return { label: 'تعلیق', cls: 'bg-red-500/15 text-red-600 border-red-500/30' };
    case 'expired': return { label: 'منقضی', cls: 'bg-red-500/15 text-red-600 border-red-500/30' };
    default: return { label: s, cls: 'bg-muted text-muted-foreground border-border' };
  }
};

const WHMCSServicesPage: React.FC<Props> = ({
  onManageService, onRenewService, onBack, initialKind = 'all',
}) => {
  const [kind, setKind] = useState<ServiceKind | 'all'>(initialKind);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const services = userServices.filter((s) => {
    if (kind !== 'all' && s.kind !== kind) return false;
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    const q = search.toLowerCase();
    if (q && !s.name.toLowerCase().includes(q) && !s.id.toLowerCase().includes(q) && !s.productName.toLowerCase().includes(q)) return false;
    return true;
  });

  const kinds: (ServiceKind | 'all')[] = ['all', 'vps', 'dedicated', 'hourly', 'cloud', 'multilocation', 'hosting'];

  const counts = kinds.reduce<Record<string, number>>((acc, k) => {
    acc[k] = k === 'all' ? userServices.length : userServices.filter((s) => s.kind === k).length;
    return acc;
  }, {});

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowRight className="w-4 h-4 ml-1" /> بازگشت
            </Button>
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-bold">سرویس‌های من</h1>
            <p className="text-xs text-muted-foreground">مجموع {toPersianDigits(userServices.length)} سرویس ثبت‌شده</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-1 md:flex-none md:min-w-[400px]">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="جستجو در سرویس‌ها…" value={search} onChange={(e) => setSearch(e.target.value)} className="pr-10" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32"><SelectValue placeholder="وضعیت" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه وضعیت‌ها</SelectItem>
              <SelectItem value="active">فعال</SelectItem>
              <SelectItem value="expiring">در حال انقضا</SelectItem>
              <SelectItem value="suspended">تعلیق</SelectItem>
              <SelectItem value="expired">منقضی</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={kind} onValueChange={(v) => setKind(v as any)} dir="rtl">
        <TabsList className="w-full flex-nowrap overflow-x-auto justify-start h-auto p-1 scrollbar-hide">
          {kinds.map((k) => {
            const M = KIND_META[k]; const Icon = M.icon;
            return (
              <TabsTrigger key={k} value={k} className="shrink-0 gap-1.5 text-xs md:text-sm">
                <Icon className="w-3.5 h-3.5" />
                {M.label}
                <span className="text-[10px] opacity-70 mr-1">({toPersianDigits(counts[k])})</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value={kind} className="mt-4">
          {services.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Server className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p className="text-sm">سرویسی یافت نشد</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {services.map((s) => {
                const st = statusMeta(s.status);
                return (
                  <Card key={s.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            {(() => { const I = KIND_META[s.kind].icon; return <I className="w-4 h-4 text-primary shrink-0" />; })()}
                            <CardTitle className="text-sm md:text-base truncate">{s.name}</CardTitle>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{s.productName}</p>
                        </div>
                        <Badge className={`text-[10px] border ${st.cls}`} variant="outline">{st.label}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2.5">
                      {(s.ip || s.ips) && (
                        <div className="text-xs text-muted-foreground flex flex-col gap-0.5">
                          {s.ip && <span className="font-mono" dir="ltr">{s.ip}</span>}
                          {s.ips && s.ips.map((ip) => <span key={ip} className="font-mono" dir="ltr">{ip}</span>)}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                        {s.os && <span>سیستم: {s.os}</span>}
                        {s.panel && <span>پنل: {s.panel}</span>}
                        {s.location && <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{s.location}</span>}
                      </div>

                      {(s.cpu != null || s.disk != null) && (
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          {s.cpu != null && (
                            <div>
                              <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5"><span>CPU</span><span>{toPersianDigits(s.cpu)}٪</span></div>
                              <Progress value={s.cpu} className="h-1" />
                            </div>
                          )}
                          {s.ram != null && (
                            <div>
                              <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5"><span>RAM</span><span>{toPersianDigits(s.ram)}٪</span></div>
                              <Progress value={s.ram} className="h-1" />
                            </div>
                          )}
                          {s.disk != null && (
                            <div>
                              <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5"><span>دیسک</span><span>{toPersianDigits(s.disk)}٪</span></div>
                              <Progress value={s.disk} className="h-1" />
                            </div>
                          )}
                          {s.bandwidth != null && (
                            <div>
                              <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5"><span>ترافیک</span><span>{toPersianDigits(s.bandwidth)}٪</span></div>
                              <Progress value={s.bandwidth} className="h-1" />
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t">
                        <span>پلن: {s.plan}</span>
                        <span>انقضا: {toPersianDigits(s.expiry)}</span>
                      </div>
                      {s.hourlyCost && <div className="text-[11px] text-amber-600 font-medium">{s.hourlyCost}</div>}

                      <div className="flex gap-2 pt-1">
                        <Button size="sm" className="flex-1 text-xs" onClick={() => onManageService(s.id, s.kind === 'hosting' ? 'hosting' : s.kind === 'dedicated' ? 'dedicated' : s.kind === 'cloud' ? 'cloud' : s.kind === 'hourly' ? 'hourly' : 'vps')}>
                          <Settings className="w-3.5 h-3.5 ml-1" /> مدیریت
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs" onClick={() => onRenewService(s.id, s.kind)}>
                          <CreditCard className="w-3.5 h-3.5 ml-1" /> تمدید
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WHMCSServicesPage;
