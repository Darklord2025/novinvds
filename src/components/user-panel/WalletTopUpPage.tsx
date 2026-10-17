import { useState } from 'react';
import PaymentOptions from './PaymentOptions';
import { PaymentMethod } from '@/data/paymentMethods';
import { useLanguage } from '@/contexts/LanguageContext';
import { localize } from '@/lib/billing';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';
export default function WalletTopUpPage({ onBack }: { onBack?: () => void }) {
  const { language } = useLanguage(); const fa = language === 'fa';
  const [method, setMethod] = useState<PaymentMethod>('card'), [amount, setAmount] = useState('');
  return <div className="space-y-5" dir={fa ? 'rtl' : 'ltr'}><header className="flex flex-wrap items-center gap-3">{onBack && <Button variant="outline" onClick={onBack}><ArrowRight />{fa ? 'بازگشت' : 'Back'}</Button>}<h1 className="text-xl font-bold">{fa ? 'افزایش موجودی' : 'Wallet topup'}</h1></header><Label htmlFor="topup-amount">{fa ? 'مبلغ (تومان)' : 'Amount (Toman)'}</Label><Input id="topup-amount" inputMode="numeric" value={localize(amount,fa)} onChange={e => setAmount(localize(e.target.value,false).replace(/[^0-9]/g,''))} /><PaymentOptions value={method} onChange={setMethod} /><Button disabled>{fa ? 'افزایش موجودی — متصل نیست' : 'Topup — not connected'}</Button></div>;
}
