import { paymentMethods, InvoicePaymentMethod } from '@/data/paymentMethods';
import { Wallet } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
export default function PaymentOptions({ value, onChange, includeWallet = false }: { value: InvoicePaymentMethod; onChange: (value: InvoicePaymentMethod) => void; includeWallet?: boolean }) {
  const { language } = useLanguage(); const fa = language === 'fa';
  const choices = includeWallet
    ? [{ id: 'wallet', fa: 'کیف پول', en: 'Wallet', icon: Wallet }, ...paymentMethods]
    : paymentMethods;
  return <section className="space-y-3"><h2 className="font-bold">{fa ? 'روش پرداخت' : 'Payment method'}</h2>
    <RadioGroup value={value} onValueChange={v => onChange(v as InvoicePaymentMethod)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {choices.map(m => <Label key={m.id} className="flex items-center gap-3 border rounded-md p-3 min-w-0 cursor-pointer"><RadioGroupItem value={m.id} /><m.icon className="h-4 w-4 text-primary shrink-0" /><span>{fa ? m.fa : m.en}{m.id === 'crypto' && <small className="block text-muted-foreground">{fa ? 'پرداخت با بیت‌کوین، اتریوم و سایر ارزها' : 'Bitcoin, Ethereum and other currencies'}</small>}</span></Label>)}
    </RadioGroup>
    <p className="text-sm text-muted-foreground" role="status">{fa ? 'پرداخت متصل نیست؛ هیچ مبلغی کسر یا سفارشی ثبت نمی‌شود. کارمزد بانک یا شبکه و اطلاعات مقصد پس از اتصال ارائه‌دهنده اعلام خواهد شد.' : 'Payments are not connected. No charge or order is made. Provider fees and destination details require a connected provider.'}</p>
    {includeWallet && <p className="text-xs text-muted-foreground">{fa ? 'موجودی واقعی کیف پول در دسترس نیست؛ پرداخت از کیف پول متصل نیست.' : 'Actual wallet balance is unavailable; wallet payment is not connected.'}</p>}
  </section>;
}
