import { paymentMethods, PaymentMethod } from '@/data/paymentMethods';
import { useLanguage } from '@/contexts/LanguageContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
export default function PaymentOptions({ value, onChange }: { value: PaymentMethod; onChange: (value: PaymentMethod) => void }) {
  const { language } = useLanguage(); const fa = language === 'fa';
  return <section className="space-y-3"><h2 className="font-bold">{fa ? 'روش پرداخت' : 'Payment method'}</h2>
    <RadioGroup value={value} onValueChange={v => onChange(v as PaymentMethod)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {paymentMethods.map(m => <Label key={m.id} className="flex items-center gap-3 border rounded-md p-3 min-w-0 cursor-pointer"><RadioGroupItem value={m.id} /><m.icon className="h-4 w-4 text-primary shrink-0" />{fa ? m.fa : m.en}</Label>)}
    </RadioGroup>
    <p className="text-sm text-muted-foreground" role="status">{fa ? 'پرداخت متصل نیست؛ هیچ مبلغی کسر یا سفارشی ثبت نمی‌شود. کارمزد بانک یا شبکه و اطلاعات مقصد پس از اتصال ارائه‌دهنده اعلام خواهد شد.' : 'Payments are not connected. No charge or order is made. Provider fees and destination details require a connected provider.'}</p>
    <p className="text-xs text-muted-foreground">{fa ? 'موجودی واقعی کیف پول در دسترس نیست.' : 'Actual wallet balance is unavailable.'}</p>
  </section>;
}
