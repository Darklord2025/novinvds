import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { InvoiceData } from '@/lib/billing';
import { InvoiceDocument } from './InvoiceDocument';
import InvoiceActions from './InvoiceActions';
import PaymentOptions from './PaymentOptions';
import { PaymentMethod } from '@/data/paymentMethods';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';
export default function ProformaInvoicePage({ onBack }: { onBack?: () => void }) {
  const { items } = useCart(); const { language } = useLanguage(); const fa = language === 'fa';
  const [method, setMethod] = useState<PaymentMethod>('card'), [payment, setPayment] = useState(false);
  const invoice: InvoiceData = { id: 'DRAFT', issueDate: new Date().toISOString().slice(0,10), dueDate: fa ? 'تعیین نشده' : 'Not assigned', status: 'Unpaid', currency: 'TOMAN', proforma: true, demo: true,
    items: items.map(i => ({ name: i.name, description: i.specs?.join(' · '), price: i.price, quantity: i.quantity, period: i.period })) };
  return <div className="space-y-5 min-w-0" dir={fa ? 'rtl' : 'ltr'}><header className="flex flex-wrap items-center gap-3">{onBack && <Button variant="outline" onClick={onBack}><ArrowRight />{fa ? 'بازگشت به سبد خرید' : 'Back to cart'}</Button>}<h1 className="text-xl font-bold">{fa ? 'پیش‌فاکتور' : 'Proforma invoice'}</h1></header>
    {!items.length ? <div className="py-12 text-center space-y-3"><ShoppingCart className="mx-auto text-muted-foreground" /><p>{fa ? 'سبد خرید خالی است.' : 'Your cart is empty.'}</p></div> : <><InvoiceDocument invoice={invoice} /><p className="text-sm text-muted-foreground">{fa ? 'قیمت اقلام سبد خرید به تومان است. مالیات تأییدشده ارائه نشده؛ مالیات خودکار اضافه نشده است.' : 'Cart prices are in Toman. No verified tax has been supplied; no automatic tax was added.'}</p><InvoiceActions invoice={invoice} />{!payment ? <Button onClick={() => setPayment(true)}>{fa ? 'ادامه به بررسی پرداخت' : 'Continue to payment review'}</Button> : <PaymentOptions value={method} onChange={setMethod} />}</>}
  </div>;
}
