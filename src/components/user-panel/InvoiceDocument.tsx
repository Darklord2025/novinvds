import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toPersianDigits } from '@/lib/numberUtils';

export interface InvoiceDocumentData {
  id: string;
  issueDate: string;
  dueDate: string;
  status: string;
  items: { name: string; description?: string; quantity: number; price: number; period?: string }[];
  tax?: number;
  discount?: number;
  customer?: string;
  proforma?: boolean;
}

export const InvoiceDocument: React.FC<{ invoice: InvoiceDocumentData; id?: string }> = ({ invoice, id }) => {
  const { language } = useLanguage();
  const fa = language === 'fa';
  const number = (value: string | number) => fa ? toPersianDigits(value) : String(value).replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
  const money = (value: number) => number(value.toLocaleString('en-US'));
  const subtotal = invoice.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal + (invoice.tax ?? 0) - (invoice.discount ?? 0);
  const paid = invoice.status === 'Paid';
  return (
    <article id={id} className="invoice-document" dir={fa ? 'rtl' : 'ltr'}>
      <header className="invoice-heading">
        <div><div className="invoice-brand">{fa ? 'نوین وی‌دی‌اس' : 'NovinVDS'}</div><p>{fa ? 'خدمات میزبانی و زیرساخت' : 'Hosting & infrastructure'}</p></div>
        <div className="invoice-heading-meta"><h2>{invoice.proforma ? (fa ? 'پیش‌فاکتور' : 'Proforma invoice') : (fa ? 'صورتحساب خدمات' : 'Service invoice')}</h2><span className="invoice-state">{paid ? (fa ? 'پرداخت شده' : 'Paid') : (fa ? 'در انتظار پرداخت' : 'Awaiting payment')}</span></div>
      </header>
      <section className="invoice-parties">
        <div><span className="invoice-label">{fa ? 'صادرکننده' : 'Issued by'}</span><strong>{fa ? 'نوین وی‌دی‌اس' : 'NovinVDS'}</strong></div>
        <div><span className="invoice-label">{fa ? 'صورتحساب برای' : 'Billed to'}</span><strong>{invoice.customer || (fa ? 'صاحب حساب کاربری' : 'Account holder')}</strong></div>
      </section>
      <dl className="invoice-metadata">
        <div><dt>{fa ? 'شماره صورتحساب' : 'Invoice number'}</dt><dd dir="ltr">{number(invoice.id)}</dd></div>
        <div><dt>{fa ? 'تاریخ صدور' : 'Issued'}</dt><dd>{number(invoice.issueDate)}</dd></div>
        <div><dt>{fa ? 'سررسید پرداخت' : 'Due date'}</dt><dd>{number(invoice.dueDate)}</dd></div>
        <div><dt>{fa ? 'واحد مبلغ' : 'Currency'}</dt><dd>{fa ? 'تومان' : 'Toman'}</dd></div>
      </dl>
      <section className="invoice-lines">
        <div className="invoice-line invoice-column-labels"><span>{fa ? 'شرح خدمات' : 'Service'}</span><span>{fa ? 'تعداد' : 'Qty'}</span><span>{fa ? 'مبلغ واحد' : 'Unit price'}</span><span>{fa ? 'مبلغ کل' : 'Total'}</span></div>
        {invoice.items.map((item, index) => <div className="invoice-line" key={index}>
          <div><strong>{number(item.name)}</strong>{item.description && <p>{number(item.description)}</p>}{item.period && <small>{number(item.period)}</small>}</div>
          <span>{number(item.quantity)}</span><span>{money(item.price)}</span><strong>{money(item.price * item.quantity)}</strong>
        </div>)}
      </section>
      <section className="invoice-bottom">
        <div className="invoice-note"><strong>{fa ? 'جزئیات پرداخت' : 'Payment details'}</strong><p>{fa ? 'شماره صورتحساب را در مکاتبات و رسید پرداخت درج کنید.' : 'Include the invoice number in payment receipts and correspondence.'}</p><p>{fa ? 'کارمزد بانک یا شبکه پرداخت، در زمان پرداخت توسط ارائه‌دهنده اعلام می‌شود.' : 'Bank or network fees are disclosed by the payment provider.'}</p></div>
        <dl className="invoice-totals"><div><dt>{fa ? 'جمع خدمات' : 'Subtotal'}</dt><dd>{money(subtotal)}</dd></div>
          {invoice.discount !== undefined && <div><dt>{fa ? 'تخفیف' : 'Discount'}</dt><dd>{money(invoice.discount)}</dd></div>}
          {invoice.tax !== undefined && <div><dt>{fa ? 'مالیات' : 'Tax'}</dt><dd>{money(invoice.tax)}</dd></div>}
          <div className="invoice-grand-total"><dt>{paid ? (fa ? 'مبلغ پرداخت شده' : 'Amount paid') : (fa ? 'مبلغ قابل پرداخت' : 'Amount due')}</dt><dd>{money(total)} <small>{fa ? 'تومان' : 'Toman'}</small></dd></div>
        </dl>
      </section>
      <footer className="invoice-footer"><span>{fa ? 'نوین وی‌دی‌اس · صورتحساب خدمات' : 'NovinVDS · Service invoice'}</span><span>{number(invoice.id)}</span></footer>
    </article>
  );
};