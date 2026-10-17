import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { localize } from '@/lib/billing';
import { hardwareProfiles, Generation, emptyHardwareSelection, changeHardwareProfile, validHardwareSelection } from '@/data/hardwareProfiles';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Copy } from 'lucide-react';
export default function DedicatedHardwareReview({ serviceId }: { serviceId: string }) {
  const { language } = useLanguage(); const fa = language === 'fa';
  const [selection,setSelection] = useState(emptyHardwareSelection(8)), [summary,setSummary] = useState(''), [copyState,setCopyState] = useState('');
  const profile = hardwareProfiles.find(p => p.id === selection.profileId && p.generation === selection.generation);
  function update(next: typeof selection) { setSelection(next);setSummary('');setCopyState(''); }
  const warning = fa ? 'پروفایل مرجع / موجودی تأیید نشده' : 'Reference profile / not verified inventory';
  const field = (label: string,value: string,values: { value:string; label:string }[],change:(v:string)=>void,disabled=false) => <div className="space-y-2 min-w-0"><Label>{label}</Label><Select value={value} onValueChange={change} disabled={disabled}><SelectTrigger aria-label={label} className="h-auto min-h-10 text-start whitespace-normal"><SelectValue placeholder={fa ? 'انتخاب' : 'Select'} /></SelectTrigger><SelectContent>{values.map(v => <SelectItem key={v.value} value={v.value}>{localize(v.label,fa)}</SelectItem>)}</SelectContent></Select></div>;
  return <section className="space-y-4 border-t py-5"><h2 className="text-lg font-bold">{fa ? 'بررسی ارتقای سخت‌افزار اختصاصی' : 'Dedicated hardware review'}</h2><p className="font-bold text-destructive" role="status">{warning}</p><p className="text-sm text-muted-foreground">{fa ? 'نسل و مادربرد دستگاه فعلی نامشخص است. نمونه‌های خانواده DL380 عمومی نیستند؛ نسل به‌تنهایی سازگاری یا موجودی را اثبات نمی‌کند.' : 'Assigned device generation and motherboard are unknown. DL380 examples are not universal; generation alone establishes neither compatibility nor stock.'}</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{field(fa ? 'نسل مرجع' : 'Reference generation',String(selection.generation),[8,9,10,11,12].map(g => ({value:String(g),label:`Gen${g}`})),v => update(emptyHardwareSelection(Number(v) as Generation)))}
    {field(fa ? 'پروفایل مادربرد مرجع' : 'Reference board profile',selection.profileId,hardwareProfiles.filter(p => p.generation === selection.generation).map(p => ({value:p.id,label:`${p.board} — ${warning}`})),v => update(changeHardwareProfile(selection,v)))}
    {field(fa ? 'مدل پردازنده فیزیکی' : 'Physical CPU model',selection.cpu,(profile?.cpuModels ?? []).map(cpu => ({value:cpu,label:cpu})),v => update({...selection,cpu:v}),!profile?.cpuModels.length)}
    {field(fa ? 'هدف ظرفیت رم' : 'RAM capacity target',selection.ramGB ? String(selection.ramGB) : '',(profile?.ramGB ?? []).map(n => ({value:String(n),label:`${n} GB ${profile?.memory}`})),v => update({...selection,ramGB:Number(v)}),!profile)}
    {field(fa ? 'هدف ظرفیت دیسک' : 'Drive capacity target',selection.diskGB ? String(selection.diskGB) : '',(profile?.diskGB ?? []).map(n => ({value:String(n),label:`${n} GB`})),v => update({...selection,diskGB:Number(v)}),!profile)}</div>
    {profile && <><p className="text-sm">{localize(profile.cpuFamily,fa)} — {warning}</p><a href={profile.source} target="_blank" rel="noreferrer" className="text-primary underline text-sm">{fa ? 'مستند سازنده' : 'Vendor evidence'}</a>{!profile.cpuModels.length && <p className="text-sm text-muted-foreground">{fa ? 'مدل دقیق CPU از نسخه قابل‌خواندن مستند تأیید نشد؛ انتخاب و آماده‌سازی مسدود است.' : 'Exact CPU model could not be verified from readable evidence; selection and preparation are blocked.'}</p>}</>}
    <p className="text-sm text-muted-foreground">{fa ? 'تأیید اپراتور نیازمند مدل، مادربرد، SKU، CPU، رم، دیسک، بک‌پلین، کنترلر، فریمور، برق و خنک‌سازی دستگاه واقعی است. ظرفیت‌ها فقط هدف بررسی هستند، نه ترکیب سازگار یا SKU موجود. اینجا درخواست ذخیره، اعمال یا هزینه‌ای دریافت نمی‌شود.' : 'Operator verification requires actual model, board, SKU, CPU, RAM, drives, backplane, controller, firmware, power and cooling. Capacities are review targets, not compatible configurations or stocked SKUs. Nothing is submitted, applied or charged here.'}</p>
    <Button disabled={!validHardwareSelection(selection)} onClick={() => setSummary(localize(`${warning}\n${serviceId}\n${profile?.board}\n${selection.cpu}\nRAM: ${selection.ramGB} GB ${profile?.memory}\nDrive target: ${selection.diskGB} GB\n${fa ? 'نیازمند بررسی اپراتور؛ ذخیره نشده' : 'Operator review required; not submitted'}`,fa))}>{fa ? 'آماده‌سازی خلاصه بررسی' : 'Prepare review summary'}</Button>
    {summary && <><Textarea aria-label={fa ? 'خلاصه بررسی' : 'Review summary'} value={summary} readOnly className="min-h-48" /><Button variant="outline" onClick={async () => {try {await navigator.clipboard.writeText(summary);setCopyState(fa ? 'کپی شد' : 'Copied');}catch {setCopyState(fa ? 'کپی ناموفق' : 'Copy failed');}}}><Copy />{fa ? 'کپی خلاصه' : 'Copy summary'}</Button><p role="status" className="text-sm">{copyState}</p></>}
  </section>;
}
