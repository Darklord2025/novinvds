import { UnifiedService } from '@/data/userServices';
import { useLanguage } from '@/contexts/LanguageContext';
import { localize } from '@/lib/billing';
import { Progress } from '@/components/ui/progress';
export default function ServiceResourceSummary({ service }: { service: UnifiedService }) {
 const { language } = useLanguage(); const fa = language === 'fa'; const unknown = fa ? 'نامشخص' : 'Unknown';
 const c = service.capacities;
 const rows = [['CPU',service.cpu,c?.cpuModel ?? (c?.cores ? `${c.cores} cores` : unknown)],['RAM',service.ram,c?.ramGB ? `${c.ramGB} GB` : unknown],[fa ? 'دیسک' : 'Disk',service.disk,(c?.diskGB ?? service.diskLimit) ? `${c?.diskGB ?? service.diskLimit} GB` : unknown],[fa ? 'ترافیک' : 'Traffic',service.bandwidth,service.bandwidthLimit ? `${service.bandwidthLimit} GB` : unknown]] as const;
 return <section className="space-y-4 py-4"><h2 className="font-bold">{fa ? 'مصرف نمونه و ظرفیت منابع' : 'Sample usage and resource capacities'}</h2><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{rows.map(([label,usage,capacity]) => <div key={label} className="space-y-2 border-b py-3"><div className="flex justify-between gap-2 text-sm"><strong>{label}</strong><span>{usage === undefined ? unknown : `${localize(usage,fa)}${fa ? '٪' : '%'} — ${fa ? 'مصرف نمونه' : 'sample usage'}`}</span></div>{usage !== undefined && <Progress value={usage} />}<p className="text-sm text-muted-foreground">{fa ? 'ظرفیت:' : 'Capacity:'} {localize(capacity,fa)}</p></div>)}</div><p className="text-sm text-muted-foreground">{fa ? 'درصد مصرف تعداد هسته، گیگابایت رم یا ظرفیت دیسک نیست؛ ظرفیت واقعی و مانیتورینگ متصل نیست.' : 'Usage percentages are not core counts, RAM size or drive capacity; actual capacity and monitoring are not connected.'}</p></section>;
}
