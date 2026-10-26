import HostingUpgrade from "./HostingUpgrade";
import BackButton from "./BackButton";
import {categoryLabel} from '@/lib/panel-model';
import {useServiceCatalog} from '@/contexts/PanelDataContext';
import {RefreshCw,Calendar,Server,ShieldCheck} from 'lucide-react';
import {ColorStat} from './PanelPrimitives';
import {cycleLabel} from '@/lib/service-labels';
import { useLanguage } from '@/contexts/LanguageContext';

import { localize } from '@/lib/billing';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, ExternalLink } from 'lucide-react';
import ServiceDeliveryInfo from './ServiceDeliveryInfo';
import ServiceResourceSummary from './ServiceResourceSummary';
export default function HostingManagementPanel({ serviceId,onBack,onRenew }: { serviceId:string;onBack?:()=>void;onRenew?:()=>void }) {
const {getServiceById,preview}=useServiceCatalog();
 const { language } = useLanguage();const fa=language==='fa';const service=getServiceById(serviceId);
 const back=onBack && <BackButton variant="outline" onClick={onBack}>{fa ? 'بازگشت به سرویس‌ها' : 'Back to services'}</BackButton>;
 if (!service || service.kind!=='hosting') return <div className="space-y-4">{back}<p role="status">{fa ? 'هاست در دسترس نیست.' : 'Hosting unavailable.'}</p></div>;
 const tabs=[['overview','نمای کلی','Overview'],['files','فایل و FTP','Files / FTP'],['database','پایگاه داده','Databases'],['email','ایمیل','Mail'],['security','امنیت','Security'],['tools','ابزارها','Tools'],['resources','منابع','Resources'],['billing','صورتحساب','Billing']];
 const unavailable=fa ? 'اطلاعات و عملیات این بخش از ارائه‌دهنده دریافت نشده است؛ تغییری ذخیره یا اجرا نمی‌شود.' : 'Provider data and operations for this section are unavailable; nothing is saved or executed.';
 return <div className="space-y-5 min-w-0" dir={fa ? 'rtl' : 'ltr'}><header className="flex flex-wrap gap-3 items-center">{back}<div className="min-w-0"><h1 className="text-xl font-bold break-all" dir="ltr">{localize(service.name,fa)}</h1><p className="text-sm text-muted-foreground">{localize(service.id,fa)} · {service.panel ?? (fa ? 'پنل نامشخص' : 'Unknown panel')}</p></div><Button className="ms-auto bg-gradient-to-r from-blue-600 to-indigo-600" onClick={onRenew}><RefreshCw size={16}/>{fa?"تمدید سرویس":"Renew service"}</Button></header><div className="grid sm:grid-cols-3 gap-3"><ColorStat title={fa?"وضعیت سرویس":"Service status"} value={preview?(fa?'نمونه':'Sample'):({active:fa?'فعال':'Active',expiring:fa?'در حال انقضا':'Expiring',expired:fa?'منقضی':'Expired',suspended:fa?'تعلیق‌شده':'Suspended',pending:fa?'در انتظار':'Pending'})[service.status]} icon={ShieldCheck} color="green"/><ColorStat title={fa?"دوره پرداخت":"Billing cycle"} value={cycleLabel(service.billingCycle,fa)} icon={Calendar} color="blue"/><ColorStat title={fa?"نوع سرویس":"Service type"} value={categoryLabel(service.kind,fa)} icon={Server} color="purple"/></div><p className="text-sm text-muted-foreground">{fa ? (preview?'نمونه / تأییدنشده — ':'رکورد حساب — ')+'کنترل پنل و اطلاعات ورود متصل نیست.' : (preview?'Demo / unverified — ':'Account record — ')+'control panel and credentials are not connected.'}</p><Button disabled variant="outline"><ExternalLink />{fa ? 'ورود به پنل — متصل نیست' : 'Panel login — not connected'}</Button>
 <HostingUpgrade service={service}/>
 <Tabs defaultValue="overview"><TabsList className="w-full flex flex-wrap justify-start h-auto">{tabs.map(([v,f,e]) => <TabsTrigger key={v} value={v} className="text-xs">{fa ? f : e}</TabsTrigger>)}</TabsList>{tabs.map(([v,f,e]) => <TabsContent key={v} value={v}>{v==='overview' || v==='billing' ? <ServiceDeliveryInfo serviceId={service.id} /> : v==='resources' ? <ServiceResourceSummary service={service} /> : <section className="space-y-4 py-5"><h2 className="font-bold">{fa ? f : e}</h2><p className="text-sm text-muted-foreground">{unavailable}</p>{v==='tools' && <div className="flex flex-wrap gap-2">{['Cron Job','Error Log','Backup'].map(t => <Button key={t} variant="outline" disabled>{t}</Button>)}</div>}</section>}</TabsContent>)}</Tabs></div>;
}
