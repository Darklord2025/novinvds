import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Globe, Settings, RefreshCw, Shield, Calendar, ArrowRight } from 'lucide-react';
import { userDomains } from '@/data/userServices';
import { toPersianDigits } from '@/lib/numberUtils';

interface Props {
  onManageDomain: (domainId: string, serviceType?: string) => void;
  onRenewDomain: (domainId: string, serviceType?: string) => void;
  onBack?: () => void;
}

const statusMeta = (s: string) => {
  switch (s) {
    case 'active': return { label: 'فعال', cls: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30' };
    case 'expiring': return { label: 'در حال انقضا', cls: 'bg-amber-500/15 text-amber-600 border-amber-500/30' };
    case 'expired': return { label: 'منقضی', cls: 'bg-red-500/15 text-red-600 border-red-500/30' };
    case 'pending': return { label: 'در انتظار', cls: 'bg-blue-500/15 text-blue-600 border-blue-500/30' };
    default: return { label: s, cls: 'bg-muted text-muted-foreground border-border' };
  }
};

const DomainServicesPage: React.FC<Props> = ({ onManageDomain, onRenewDomain, onBack }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = userDomains.filter((d) => {
    if (statusFilter !== 'all' && d.status !== statusFilter) return false;
    if (search && !d.domain.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const activeCount = userDomains.filter((d) => d.status === 'active').length;
  const expiringCount = userDomains.filter((d) => d.status === 'expiring').length;

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
            <h1 className="text-xl md:text-2xl font-bold">دامنه‌های من</h1>
            <p className="text-xs text-muted-foreground">{toPersianDigits(userDomains.length)} دامنه ثبت‌شده</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-1 md:flex-none md:min-w-[380px]">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="جستجوی دامنه…" value={search} onChange={(e) => setSearch(e.target.value)} className="pr-10" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32"><SelectValue placeholder="وضعیت" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه</SelectItem>
              <SelectItem value="active">فعال</SelectItem>
              <SelectItem value="expiring">در حال انقضا</SelectItem>
              <SelectItem value="expired">منقضی</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardHeader className="pb-2"><CardTitle className="text-xs font-medium flex items-center gap-2"><Globe className="w-4 h-4 text-muted-foreground" />کل</CardTitle></CardHeader><CardContent><div className="text-xl md:text-2xl font-bold">{toPersianDigits(userDomains.length)}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-xs font-medium flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-600" />فعال</CardTitle></CardHeader><CardContent><div className="text-xl md:text-2xl font-bold text-emerald-600">{toPersianDigits(activeCount)}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-xs font-medium flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-600" />در حال انقضا</CardTitle></CardHeader><CardContent><div className="text-xl md:text-2xl font-bold text-amber-600">{toPersianDigits(expiringCount)}</div></CardContent></Card>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Globe className="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p className="text-sm">دامنه‌ای یافت نشد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.map((d) => {
            const st = statusMeta(d.status);
            return (
              <Card key={d.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Globe className="w-4 h-4 text-primary shrink-0" />
                      <CardTitle className="text-sm md:text-base truncate" dir="ltr">{d.domain}</CardTitle>
                    </div>
                    <Badge className={`text-[10px] border ${st.cls}`} variant="outline">{st.label}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">ثبت‌کننده:</span><span>{d.registrar}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">تاریخ ثبت:</span><span>{toPersianDigits(d.registrationDate)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">انقضا:</span><span>{toPersianDigits(d.expiry)}</span></div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {d.autoRenew && <Badge variant="outline" className="text-[10px]">تمدید خودکار</Badge>}
                    {d.privacyProtection && <Badge variant="outline" className="text-[10px]">حریم خصوصی</Badge>}
                    {d.dnsManagement && <Badge variant="outline" className="text-[10px]">DNS</Badge>}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 text-xs" onClick={() => onManageDomain(d.id, 'domain')}>
                      <Settings className="w-3.5 h-3.5 ml-1" /> مدیریت
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs" onClick={() => onRenewDomain(d.id, 'domain')}>
                      <RefreshCw className="w-3.5 h-3.5 ml-1" /> تمدید
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DomainServicesPage;
