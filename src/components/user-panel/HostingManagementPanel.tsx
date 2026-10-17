import { useLanguage } from '@/contexts/LanguageContext';
import { getServiceById } from '@/data/userServices';
import { localize } from '@/lib/billing';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, ExternalLink } from 'lucide-react';
import ServiceDeliveryInfo from './ServiceDeliveryInfo';
import ServiceResourceSummary from './ServiceResourceSummary';
export default function HostingManagementPanel({ serviceId,onBack }: { serviceId:string;onBack?:()=>void }) {
 const { language } = useLanguage();const fa=language==='fa';const service=getServiceById(serviceId);
 const back=onBack && <Button variant="outline" onClick={onBack}><ArrowRight />{fa ? 'بازگشت به سرویس‌ها' : 'Back to services'}</Button>;
 if (!service || service.kind!=='hosting') return <div className="space-y-4">{back}<p role="status">{fa ? 'هاست در دسترس نیست.' : 'Hosting unavailable.'}</p></div>;
 const tabs=[['overview','نمای کلی','Overview'],['files','فایل و FTP','Files / FTP'],['database','پایگاه داده','Databases'],['email','ایمیل','Mail'],['security','امنیت','Security'],['tools','ابزارها','Tools'],['resources','منابع','Resources'],['billing','صورتحساب','Billing']];
 const unavailable=fa ? 'اطلاعات و عملیات این بخش از ارائه‌دهنده دریافت نشده است؛ تغییری ذخیره یا اجرا نمی‌شود.' : 'Provider data and operations for this section are unavailable; nothing is saved or executed.';
 return <div className="space-y-5 min-w-0" dir={fa ? 'rtl' : 'ltr'}><header className="flex flex-wrap gap-3 items-center">{back}<div className="min-w-0"><h1 className="text-xl font-bold break-all" dir="ltr">{localize(service.name,fa)}</h1><p className="text-sm text-muted-foreground">{localize(service.id,fa)} · {service.panel ?? (fa ? 'پنل نامشخص' : 'Unknown panel')}</p></div></header><p className="text-sm text-muted-foreground">{fa ? 'نمونه / تأییدنشده — کنترل پنل و اطلاعات ورود متصل نیست.' : 'Demo / unverified — control panel and credentials are not connected.'}</p><Button disabled variant="outline"><ExternalLink />{fa ? 'ورود به پنل — متصل نیست' : 'Panel login — not connected'}</Button>
 <Tabs defaultValue="overview"><TabsList className="w-full flex flex-wrap justify-start h-auto">{tabs.map(([v,f,e]) => <TabsTrigger key={v} value={v} className="text-xs">{fa ? f : e}</TabsTrigger>)}</TabsList>{tabs.map(([v,f,e]) => <TabsContent key={v} value={v}>{v==='overview' || v==='billing' ? <ServiceDeliveryInfo serviceId={service.id} /> : v==='resources' ? <ServiceResourceSummary service={service} /> : <section className="space-y-4 py-5"><h2 className="font-bold">{fa ? f : e}</h2><p className="text-sm text-muted-foreground">{unavailable}</p>{v==='tools' && <div className="flex flex-wrap gap-2">{['Cron Job','Error Log','Backup'].map(t => <Button key={t} variant="outline" disabled>{t}</Button>)}</div>}</section>}</TabsContent>)}</Tabs></div>;
}
