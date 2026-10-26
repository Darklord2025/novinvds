import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { InvoiceDocument } from './InvoiceDocument';
import { InvoiceData } from '@/lib/billing';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
export async function exportInvoiceData(invoice: InvoiceData, language: 'fa' | 'en', mode: 'pdf' | 'print') {
  const host = document.createElement('div'); host.className = 'invoice-export-host'; host.setAttribute('aria-hidden', 'true');
  document.body.appendChild(host); const root = createRoot(host);
  try {
    flushSync(() => root.render(<LanguageProvider><InvoiceDocument invoice={invoice} language={language} /></LanguageProvider>));
    const element = host.querySelector<HTMLElement>('.invoice-document');
    if (!element) throw new Error('Invoice unavailable');
    const exporter = await import('@/lib/invoice-export');
    if (mode === 'pdf') await exporter.downloadInvoice(element, invoice.id);
    else await exporter.printInvoice(element);
  } finally { root.unmount(); host.remove(); }
}
export default function InvoiceActions({ invoice, compact = false }: { invoice: InvoiceData; compact?: boolean }) {
  const { language } = useLanguage(); const fa = language === 'fa';
  const [busy, setBusy] = useState(false), [error, setError] = useState(''); const lock = useRef(false);
  async function run(mode: 'pdf' | 'print') {
    if (lock.current) return; lock.current = true; setBusy(true); setError('');
    try { await exportInvoiceData(invoice, language, mode); }
    catch { setError(fa ? 'خروجی فاکتور ناموفق بود؛ دوباره تلاش کنید.' : 'Invoice export failed. Please retry.'); }
    finally { lock.current = false; setBusy(false); }
  }
  return <div className="space-y-1"><div className="flex flex-wrap gap-2">
    <Button variant="outline" size={compact ? 'icon' : 'sm'} title={fa ? 'دانلود PDF' : 'Download PDF'} aria-label={fa ? 'دانلود PDF' : 'Download PDF'} disabled={busy} onClick={() => run('pdf')}><Download />{!compact && (busy ? (fa ? 'در حال آماده‌سازی' : 'Preparing') : 'PDF')}</Button>
    <Button variant="outline" size={compact ? 'icon' : 'sm'} title={fa ? 'چاپ' : 'Print'} aria-label={fa ? 'چاپ' : 'Print'} disabled={busy} onClick={() => run('print')}><Printer />{!compact && (fa ? 'چاپ' : 'Print')}</Button>
  </div>{error && <p role="alert" className="text-xs text-destructive">{error}</p>}</div>;
}
