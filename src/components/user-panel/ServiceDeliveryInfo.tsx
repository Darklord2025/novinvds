import React from 'react';
import { getServiceById } from '@/data/userServices';
import { useLanguage } from '@/contexts/LanguageContext';
import { toPersianDigits } from '@/lib/numberUtils';
import { FileText } from 'lucide-react';

export default function ServiceDeliveryInfo({ serviceId }: { serviceId: string }) {
  const service = getServiceById(serviceId);
  const { language } = useLanguage();
  if (!service) return <p className="text-sm text-muted-foreground">اطلاعات این سرویس در دسترس نیست.</p>;
  const fa = language === 'fa';
  const format = (value: string | number) => fa ? toPersianDigits(value) : String(value);
  const rows = [
    [fa ? 'شناسه سرویس' : 'Service ID', service.id],
    [fa ? 'محصول' : 'Product', service.productName],
    [fa ? 'پلن' : 'Plan', service.plan],
    [fa ? 'دیتاسنتر' : 'Datacenter', service.location],
    [fa ? 'تاریخ ثبت' : 'Registered', service.registrationDate],
    [fa ? 'سررسید' : 'Due date', service.expiry],
    [fa ? 'دوره صورتحساب' : 'Billing cycle', fa ? ({ Monthly: 'ماهانه', Quarterly: 'سه‌ماهه', Annually: 'سالانه', Hourly: 'ساعتی' }[service.billingCycle]) : service.billingCycle],
    [fa ? 'مبلغ تمدید' : 'Renewal amount', `${service.amount.toLocaleString('en-US')} ${fa ? 'تومان' : 'Toman'}`],
  ];
  return <section className="space-y-4 py-4">
    <h2 className="text-base font-bold flex items-center gap-2"><FileText className="h-4 w-4 text-primary" />{fa ? 'اطلاعات تحویل سرویس' : 'Service delivery details'}</h2>
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
      {rows.filter(([, value]) => value).map(([label, value]) => <div key={label} className="py-3 border-b flex flex-wrap justify-between gap-2 text-sm"><dt className="text-muted-foreground">{label}</dt><dd className="font-medium break-words">{format(value ?? '')}</dd></div>)}
    </dl>
    <p className="text-xs text-muted-foreground">{fa ? 'رمز عبور در این خلاصه ذخیره یا نمایش داده نمی‌شود.' : 'Passwords are not stored or shown in this summary.'}</p>
  </section>;
}