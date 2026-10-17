import { getServiceById } from '@/data/userServices';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import ServiceDeliveryInfo from './ServiceDeliveryInfo';
import { ArrowRight } from 'lucide-react';
export default function HostingGateway({ serviceId, onBack, onEnterPanel }: { serviceId:string;onBack?:()=>void;onEnterPanel?:()=>void }) {
 const { language }=useLanguage();const fa=language==='fa';const service=getServiceById(serviceId);
 return <div className="space-y-4" dir={fa ? 'rtl' : 'ltr'}>{onBack && <Button variant="outline" onClick={onBack}><ArrowRight />{fa ? 'بازگشت به سرویس‌ها' : 'Back to services'}</Button>}<ServiceDeliveryInfo serviceId={serviceId} />{service?.kind==='hosting' && <Button onClick={onEnterPanel} disabled={!onEnterPanel}>{fa ? 'مشاهده مدیریت هاست' : 'View hosting management'}</Button>}</div>;
}
