import {useServiceCatalog} from '@/contexts/PanelDataContext';

import { useLanguage } from '@/contexts/LanguageContext';
import { localize, formatMoney } from '@/lib/billing';
import { serviceIPs } from '@/lib/serviceIdentity';
export default function ServiceDeliveryInfo({ serviceId }: { serviceId: string }) {
const {getServiceById,preview}=useServiceCatalog();
  const { language } = useLanguage(); const fa = language === 'fa'; const service = getServiceById(serviceId);
  const unknown = fa ? 'ارائه نشده' : 'Not provided';
  if (!service) return <p role="status">{fa ? 'اطلاعات این سرویس در دسترس نیست.' : 'Service unavailable.'}</p>;
  const rows = [[fa ? 'شناسه سرویس' : 'Service ID', service.id], [fa ? 'محصول' : 'Product', service.productName], [fa ? 'پلن' : 'Plan', service.plan], [fa ? 'منطقه' : 'Region', service.location ?? unknown], [fa ? 'ثبت' : 'Registered', service.registrationDate], [fa ? 'سررسید' : 'Due date', service.expiry], [fa ? 'مبلغ کاتالوگ' : 'Catalog amount', formatMoney(service.amount,service.currency,fa)]];
  return <section className="space-y-4 py-4 min-w-0"><h2 className="text-base font-bold">{fa ? 'اطلاعات تحویل سرویس' : 'Service delivery details'}</h2><p className="text-sm text-muted-foreground">{preview?(fa?'کاتالوگ نمونه / تأییدنشده؛ وضعیت و مصرف منابع زنده نیست. مبالغ مرجع به ریال، نمایش به تومان (هر تومان = ۱۰ ریال).':'Demo / unverified catalog; status and usage are not live. Canonical amounts are IRR, displayed as Toman (1 Toman = 10 IRR).'):(fa?'اطلاعات ثبت‌شده حساب؛ وضعیت لحظه‌ای دستگاه از این اطلاعات قابل تایید نیست.':'Account records; these records do not establish live device status.')}</p>
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">{rows.map(([label,value]) => <div key={label} className="py-3 border-b flex flex-wrap justify-between gap-2 text-sm min-w-0"><dt className="text-muted-foreground">{label}</dt><dd className="font-medium break-words" dir={service.kind === 'hosting' && label === (fa ? 'محصول' : 'Product') ? 'ltr' : undefined}>{localize(value,fa)}</dd></div>)}</dl>
    <h3 className="font-medium">{preview?(fa?'آدرس‌های نمونه':'Sample addresses'):(fa?'آدرس‌های ثبت‌شده':'Recorded addresses')}</h3>
    {service.kind === 'multilocation' && <p className="text-sm">{fa ? 'یک سرور با چند IP؛ محل هر IP مشخص نشده و وجود چند سرور فیزیکی تأیید نشده است.' : 'One server with multiple IPs; per-IP locations and multiple physical servers are not established.'}</p>}
    {serviceIPs(service).map(ip => <div key={ip.address} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-2 border-b py-3 text-sm min-w-0"><span dir="ltr" className="break-all">{localize(ip.address,fa)}</span><span>{localize(ip.family,fa)}</span><span className="text-muted-foreground">{ip.location ? localize(ip.location,fa) : (fa ? 'مکان ارائه نشده' : 'Location not provided')}</span></div>)}
    {!serviceIPs(service).length && <p className="text-sm text-muted-foreground">{unknown}</p>}
    <p className="text-xs text-muted-foreground">{fa ? 'اطلاعات ورود، رمز، سخت‌افزار واقعی و وضعیت شبکه از دستگاه تأییدشده دریافت نشده است.' : 'Credentials, assigned hardware and actual network status have not been supplied by a verified device.'}</p>
  </section>;
}
