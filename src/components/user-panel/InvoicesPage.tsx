import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { sampleInvoices } from '@/data/invoices';
import { InvoiceData, invoiceTotals, formatMoney, localize, statusLabels, canPayInvoice } from '@/lib/billing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Eye, ArrowRight } from 'lucide-react';
import { InvoiceDocument } from './InvoiceDocument';
import InvoiceActions from './InvoiceActions';
import PaymentOptions from './PaymentOptions';
import { PaymentMethod } from '@/data/paymentMethods';
export default function InvoicesPage({ onBack, initialInvoiceId, initialMode = 'view' }: { onBack?: () => void; initialInvoiceId?: string; initialMode?: 'view' | 'pay' }) {
  const { language } = useLanguage(); const fa = language === 'fa';
  const [selected, setSelected] = useState<InvoiceData | null>(() => sampleInvoices.find(i => i.id === initialInvoiceId) ?? null);
  const [pay, setPay] = useState(initialMode === 'pay'), [search, setSearch] = useState(''), [filter, setFilter] = useState('all'), [sort, setSort] = useState('date-desc');
  const [method, setMethod] = useState<PaymentMethod>('card');
  const invoices = sampleInvoices.filter(i => (filter === 'all' || i.status === filter) && localize(i.id + i.items[0].name, false).toLowerCase().includes(localize(search, false).toLowerCase())).sort((a,b) => sort.startsWith('amount') ? (invoiceTotals(a).total - invoiceTotals(b).total) * (sort.endsWith('desc') ? -1 : 1) : a.issueDate.localeCompare(b.issueDate) * (sort.endsWith('desc') ? -1 : 1));
  return <div className="space-y-5 min-w-0" dir={fa ? 'rtl' : 'ltr'}>
    <header className="flex flex-wrap items-center gap-3">{onBack && <Button variant="outline" onClick={onBack}><ArrowRight />{fa ? 'بازگشت' : 'Back'}</Button>}<h1 className="text-xl font-bold">{fa ? 'فاکتورها' : 'Invoices'}</h1></header>
    <p className="text-sm text-muted-foreground">{fa ? 'فاکتورهای نمونه و تأییدنشده؛ سابقه مالی واقعی حساب متصل نیست.' : 'Demo, unverified invoices. Actual account billing history is not connected.'}</p>
    {initialInvoiceId && !sampleInvoices.some(i => i.id === initialInvoiceId) && <p role="alert">{fa ? 'فاکتور درخواستی در دسترس نیست.' : 'Requested invoice unavailable.'}</p>}
    <div className="flex flex-col sm:flex-row gap-2"><Input aria-label={fa ? 'جستجوی فاکتور' : 'Search invoices'} placeholder={fa ? 'جستجوی فاکتور' : 'Search invoices'} value={search} onChange={e => setSearch(e.target.value)} />
      <Select value={filter} onValueChange={setFilter}><SelectTrigger className="sm:w-44"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">{fa ? 'همه وضعیت‌ها' : 'All statuses'}</SelectItem>{Object.entries(statusLabels).map(([s,l]) => <SelectItem key={s} value={s}>{l[fa ? 0 : 1]}</SelectItem>)}</SelectContent></Select>
      <Select value={sort} onValueChange={setSort}><SelectTrigger className="sm:w-44"><SelectValue /></SelectTrigger><SelectContent>{[['date-desc','جدیدترین','Newest'],['date-asc','قدیمی‌ترین','Oldest'],['amount-desc','مبلغ نزولی','Amount descending'],['amount-asc','مبلغ صعودی','Amount ascending']].map(([v,f,e]) => <SelectItem key={v} value={v}>{fa ? f : e}</SelectItem>)}</SelectContent></Select>
    </div>
    <div className="divide-y border-y">{invoices.map(i => <div key={i.id} className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-3 py-4 items-center"><div className="min-w-0"><strong>{localize(i.id,fa)}</strong><p className="text-sm break-words">{localize(i.items[0].name,fa)}</p><p className="text-xs text-muted-foreground">{localize(i.dueDate,fa)}</p></div><div className="space-y-2"><Badge variant="outline">{statusLabels[i.status][fa ? 0 : 1]}</Badge><p>{formatMoney(invoiceTotals(i).total,i.currency,fa)}</p></div><div className="flex flex-wrap gap-2 items-start"><Button variant="outline" size="icon" title={fa ? 'مشاهده' : 'View'} aria-label={`${fa ? 'مشاهده' : 'View'} ${localize(i.id,fa)}`} onClick={() => {setSelected(i);setPay(false);}}><Eye /></Button><InvoiceActions invoice={i} compact />{canPayInvoice(i.status) && <Button size="sm" onClick={() => {setSelected(i);setPay(true);}}>{fa ? 'بررسی پرداخت' : 'Review payment'}</Button>}</div></div>)}</div>
    {!invoices.length && <p>{fa ? 'فاکتوری یافت نشد.' : 'No invoices found.'}</p>}
    <Dialog open={!!selected} onOpenChange={open => {if (!open) setSelected(null);}}><DialogContent className="max-w-3xl max-h-[90dvh] overflow-y-auto" dir={fa ? 'rtl' : 'ltr'}><DialogHeader><DialogTitle>{fa ? 'فاکتور نمونه' : 'Demo invoice'}</DialogTitle><DialogDescription>{fa ? 'سند تأییدنشده' : 'Unverified document'}</DialogDescription></DialogHeader>{selected && <><InvoiceDocument invoice={selected} /><InvoiceActions invoice={selected} />{pay && canPayInvoice(selected.status) && <PaymentOptions value={method} onChange={setMethod} />}</>}</DialogContent></Dialog>
  </div>;
}
