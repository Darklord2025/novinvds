import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Search, Download, Eye, CreditCard, Filter, ArrowRight, Wallet, Building2, Bitcoin, Printer, Landmark, Coins } from 'lucide-react';
import { toPersianDigits } from '@/lib/numberUtils';
import { toast } from '@/components/ui/use-toast';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface InvoicesPageProps {
  onBack?: () => void;
}

const InvoicesPage: React.FC<InvoicesPageProps> = ({ onBack }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'view' | 'pay' | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'gateway' | 'crypto' | 'card2card' | 'transfer' | 'perfectmoney'>('gateway');


  const allInvoices = [
    {
      id: 'INV-۱۴۰۲-۰۰۱',
      service: 'سرویس VPS - پلن پیشرفته',
      dueDate: toPersianDigits('1402/09/15'),
      amount: toPersianDigits('2,500,000'),
      status: 'Paid',
      issueDate: toPersianDigits('1402/08/15')
    },
    {
      id: 'INV-۱۴۰۲-۰۰۲',
      service: 'هاستینگ وب - پلن حرفه‌ای',
      dueDate: toPersianDigits('1402/09/20'),
      amount: toPersianDigits('850,000'),
      status: 'Unpaid',
      issueDate: toPersianDigits('1402/08/20')
    },
    {
      id: 'INV-۱۴۰۲-۰۰۳',
      service: 'سرویس اختصاصی - سرور قدرتمند',
      dueDate: toPersianDigits('1402/09/25'),
      amount: toPersianDigits('5,200,000'),
      status: 'Paid',
      issueDate: toPersianDigits('1402/08/25')
    },
    {
      id: 'INV-۱۴۰۲-۰۰۴',
      service: 'ثبت دامنه - example.com',
      dueDate: toPersianDigits('1402/09/30'),
      amount: toPersianDigits('120,000'),
      status: 'Overdue',
      issueDate: toPersianDigits('1402/08/30')
    },
    {
      id: 'INV-۱۴۰۲-۰۰۵',
      service: 'گواهی SSL - Wildcard',
      dueDate: toPersianDigits('1402/10/05'),
      amount: toPersianDigits('750,000'),
      status: 'Unpaid',
      issueDate: toPersianDigits('1402/09/05')
    },
    {
      id: 'INV-۱۴۰۲-۰۰۶',
      service: 'سرویس Cloud - پلن کسب‌وکار',
      dueDate: toPersianDigits('1402/10/10'),
      amount: toPersianDigits('1,200,000'),
      status: 'Paid',
      issueDate: toPersianDigits('1402/09/10')
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Paid': { variant: 'default', text: 'پرداخت شده', className: 'bg-green-500 hover:bg-green-600' },
      'Unpaid': { variant: 'destructive', text: 'پرداخت نشده', className: 'bg-red-500 hover:bg-red-600' },
      'Overdue': { variant: 'destructive', text: 'معوقه', className: 'bg-orange-500 hover:bg-orange-600' },
      'Cancelled': { variant: 'outline', text: 'لغو شده', className: 'bg-gray-500 hover:bg-gray-600' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { variant: 'outline', text: status, className: 'bg-gray-500' };
    return (
      <Badge className={`${config.className} text-white`}>
        {config.text}
      </Badge>
    );
  };

  const filteredInvoices = allInvoices.filter(invoice => {
    const matchesStatus = filterStatus === 'all' || invoice.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = invoice.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setViewMode('view');
  };

  const handleDownloadInvoice = async (invoice: any) => {
    // If dialog isn't open, temporarily open it to snapshot the invoice
    const wasOpen = selectedInvoice?.id === invoice.id && viewMode !== null;
    if (!wasOpen) {
      setSelectedInvoice(invoice);
      setViewMode('view');
      await new Promise((r) => setTimeout(r, 350));
    }
    const el = document.getElementById('invoice-template');
    if (!el) {
      toast({ title: 'خطا در ساخت PDF', description: 'قالب فاکتور یافت نشد.', variant: 'destructive' as any });
      return;
    }
    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        windowWidth: el.scrollWidth,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const imgW = pageW - margin * 2;
      const imgH = (canvas.height * imgW) / canvas.width;
      if (imgH <= pageH - margin * 2) {
        pdf.addImage(imgData, 'PNG', margin, margin, imgW, imgH);
      } else {
        // Multi-page splitting
        let hLeft = imgH;
        let position = margin;
        pdf.addImage(imgData, 'PNG', margin, position, imgW, imgH);
        hLeft -= (pageH - margin * 2);
        while (hLeft > 0) {
          pdf.addPage();
          position = margin - (imgH - hLeft);
          pdf.addImage(imgData, 'PNG', margin, position, imgW, imgH);
          hLeft -= (pageH - margin * 2);
        }
      }
      pdf.save(`${invoice.id}.pdf`);
      toast({ title: 'دانلود انجام شد', description: `فاکتور ${invoice.id} با موفقیت دانلود شد.` });
    } catch (e) {
      toast({ title: 'خطا در دانلود', description: 'تولید فایل PDF با خطا مواجه شد.', variant: 'destructive' as any });
    }
  };

  const handlePrintInvoice = () => {
    const el = document.getElementById('invoice-template');
    if (!el) return;
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;
    doc.open();
    doc.write(`<!doctype html><html dir="rtl" lang="fa"><head><meta charset="utf-8"><title>چاپ فاکتور - ${el.querySelector('[data-invoice-id]')?.textContent || ''}</title>
      <style>
        @page { size: A4; margin: 12mm; }
        * { box-sizing: border-box; }
        body { font-family: Vazirmatn, Tahoma, Arial, sans-serif; color: #0f172a; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px; border: 1px solid #e2e8f0; }
        thead { background: #f1f5f9; }
        .invoice-wrap { padding: 8px; }
      </style></head><body><div class="invoice-wrap">${el.outerHTML}</div></body></html>`);
    doc.close();
    const cleanup = () => setTimeout(() => document.body.removeChild(iframe), 500);
    iframe.onload = () => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } finally {
        cleanup();
      }
    };
  };

  const handlePayInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setViewMode('pay');
  };

  const confirmPayment = () => {
    if (!selectedInvoice) return;
    const labels: Record<string, string> = {
      wallet: 'کیف پول', gateway: 'درگاه بانکی آنلاین', crypto: 'ارز دیجیتال',
      card2card: 'کارت به کارت', transfer: 'حواله بانکی', perfectmoney: 'Perfect Money',
    };
    toast({
      title: 'انتقال به روش پرداخت',
      description: `پرداخت فاکتور ${selectedInvoice.id} از طریق ${labels[paymentMethod]} در حال انجام است...`,
    });
    setViewMode(null);
    setSelectedInvoice(null);
  };

  return (
    <div className="p-6" dir="rtl">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          {onBack && (
            <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              بازگشت
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold mb-2">فاکتورها</h1>
            <p className="text-muted-foreground">مدیریت و پرداخت فاکتورهای شما</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              تمامی فاکتورها
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="فیلتر وضعیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه وضعیت‌ها</SelectItem>
                  <SelectItem value="paid">پرداخت شده</SelectItem>
                  <SelectItem value="unpaid">پرداخت نشده</SelectItem>
                  <SelectItem value="overdue">معوقه</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="مرتب‌سازی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">جدیدترین</SelectItem>
                  <SelectItem value="date-asc">قدیمی‌ترین</SelectItem>
                  <SelectItem value="amount-desc">مبلغ (زیاد به کم)</SelectItem>
                  <SelectItem value="amount-asc">مبلغ (کم به زیاد)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="جستجو در فاکتورها..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right p-3 font-medium">شماره فاکتور</th>
                  <th className="text-right p-3 font-medium">سرویس</th>
                  <th className="text-right p-3 font-medium">تاریخ سررسید</th>
                  <th className="text-right p-3 font-medium">مبلغ</th>
                  <th className="text-right p-3 font-medium">وضعیت</th>
                  <th className="text-center p-3 font-medium">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 text-sm">{invoice.id}</td>
                    <td className="p-3">{invoice.service}</td>
                    <td className="p-3 text-sm">{invoice.dueDate}</td>
                    <td className="p-3 font-bold">{invoice.amount} تومان</td>
                    <td className="p-3">{getStatusBadge(invoice.status)}</td>
                    <td className="p-3">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewInvoice(invoice)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          مشاهده
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadInvoice(invoice)}
                          className="flex items-center gap-1"
                        >
                          <Download className="w-4 h-4" />
                          دانلود
                        </Button>
                        {(invoice.status === 'Unpaid' || invoice.status === 'Overdue') && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handlePayInvoice(invoice)}
                            className="flex items-center gap-1"
                          >
                            <CreditCard className="w-4 h-4" />
                            پرداخت
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              فاکتوری با این فیلترها یافت نشد
            </div>
          )}

          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">{toPersianDigits(1)}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    {toPersianDigits(2)}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">{toPersianDigits(3)}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Preview / Payment Dialog */}
      <Dialog open={viewMode !== null} onOpenChange={(o) => { if (!o) { setViewMode(null); setSelectedInvoice(null); } }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-lg">
              {viewMode === 'pay' ? 'انتخاب روش پرداخت' : 'پیش‌فاکتور رسمی'}
            </DialogTitle>
            <DialogDescription className="text-xs">
              {viewMode === 'pay' ? 'روش پرداخت مورد نظر خود را انتخاب کنید.' : 'پیش‌نمایش کامل فاکتور مطابق فرمت رسمی.'}
            </DialogDescription>
          </DialogHeader>

          {selectedInvoice && (
            <div className="space-y-4">
              {/* PROFESSIONAL INVOICE TEMPLATE */}
              <div id="invoice-template" className="bg-card border-2 border-border rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-l from-primary to-primary/80 text-primary-foreground p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg md:text-2xl font-bold">نوین وی‌دی‌اس</div>
                      <div className="text-xs opacity-90 mt-1">NovinVDS — ارائه‌دهنده خدمات میزبانی و سرور</div>
                      <div className="text-[11px] opacity-80 mt-2">
                        شناسه ملی: ۱۴۰۰۱۲۳۴۵۶۷ • کد اقتصادی: ۴۱۱۲۷۸۹۶۵۴۳۱ • شماره ثبت: ۵۴۳۲۱
                      </div>
                    </div>
                    <div className="text-left">
                      <div className={`inline-block px-3 py-1 rounded-md text-xs font-bold border-2 ${
                        selectedInvoice.status === 'Paid'
                          ? 'bg-emerald-500/20 border-emerald-300 text-emerald-50'
                          : 'bg-red-500/20 border-red-300 text-red-50'
                      }`}>
                        {selectedInvoice.status === 'Paid' ? 'پرداخت شده' : selectedInvoice.status === 'Overdue' ? 'معوقه' : 'پرداخت نشده'}
                      </div>
                      <div className="text-xs mt-2 opacity-90">شماره فاکتور</div>
                      <div className="text-sm font-bold" dir="ltr">{selectedInvoice.id}</div>
                    </div>
                  </div>
                </div>

                {/* Meta rows */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-border">
                  <div className="p-4 border-b md:border-b-0 md:border-l border-border">
                    <div className="text-[11px] text-muted-foreground mb-1">صادرکننده / فروشنده</div>
                    <div className="text-sm font-bold">شرکت نوین وی‌دی‌اس</div>
                    <div className="text-xs text-muted-foreground mt-1">تهران، ولیعصر، پلاک ۱۰۰</div>
                    <div className="text-xs text-muted-foreground">۰۲۱-۹۱۰۰۰۰۰۰ • info@novinvds.com</div>
                  </div>
                  <div className="p-4">
                    <div className="text-[11px] text-muted-foreground mb-1">خریدار</div>
                    <div className="text-sm font-bold">کاربر گرامی</div>
                    <div className="text-xs text-muted-foreground mt-1">شماره مشتری: {toPersianDigits('CU-4521')}</div>
                    <div className="text-xs text-muted-foreground">user@example.com</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-0 border-b border-border text-center">
                  <div className="p-3 border-l border-border">
                    <div className="text-[11px] text-muted-foreground">تاریخ صدور</div>
                    <div className="text-sm font-medium mt-1">{selectedInvoice.issueDate}</div>
                  </div>
                  <div className="p-3 border-l border-border">
                    <div className="text-[11px] text-muted-foreground">تاریخ سررسید</div>
                    <div className="text-sm font-medium mt-1">{selectedInvoice.dueDate}</div>
                  </div>
                  <div className="p-3">
                    <div className="text-[11px] text-muted-foreground">دوره پرداخت</div>
                    <div className="text-sm font-medium mt-1">یک ماهه</div>
                  </div>
                </div>

                {/* Items table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr className="text-xs">
                        <th className="p-2 text-right font-medium">ردیف</th>
                        <th className="p-2 text-right font-medium">شرح سرویس</th>
                        <th className="p-2 text-center font-medium">تعداد</th>
                        <th className="p-2 text-left font-medium">مبلغ واحد</th>
                        <th className="p-2 text-left font-medium">مبلغ کل</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      <tr className="border-t border-border">
                        <td className="p-2 text-right">{toPersianDigits(1)}</td>
                        <td className="p-2 text-right">{selectedInvoice.service}</td>
                        <td className="p-2 text-center">{toPersianDigits(1)}</td>
                        <td className="p-2 text-left" dir="ltr">{selectedInvoice.amount}</td>
                        <td className="p-2 text-left font-medium" dir="ltr">{selectedInvoice.amount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="p-4 bg-muted/30 space-y-1.5 text-sm">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>جمع کل:</span>
                    <span dir="ltr">{selectedInvoice.amount} تومان</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>تخفیف:</span>
                    <span>۰ تومان</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>مالیات ارزش افزوده (۹٪):</span>
                    <span>۰ تومان (معاف)</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-border">
                    <span>مبلغ قابل پرداخت:</span>
                    <span className="text-primary text-base" dir="ltr">{selectedInvoice.amount} تومان</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-border p-3 bg-card text-[10px] text-muted-foreground text-center leading-5">
                  با پرداخت این فاکتور، شرایط و ضوابط سرویس مطالعه و پذیرفته می‌شود.
                  <br />
                  در صورت هرگونه سؤال با پشتیبانی ۲۴/۷ تماس بگیرید یا تیکت ثبت کنید.
                </div>
              </div>

              {/* Payment method selection */}
              {viewMode === 'pay' && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">روش پرداخت را انتخاب کنید:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                    {[
                      { id: 'wallet', label: 'کیف پول', icon: Wallet, desc: 'پرداخت از موجودی کیف پول' },
                      { id: 'gateway', label: 'کارت بانکی', icon: CreditCard, desc: 'پرداخت امن از طریق درگاه بانک' },
                      { id: 'card2card', label: 'کارت به کارت', icon: CreditCard, desc: 'واریز مستقیم به کارت شرکت و ارسال رسید' },
                      { id: 'transfer', label: 'حواله بانکی', icon: Landmark, desc: 'انتقال از طریق شماره شبا یا حساب بانکی' },
                      { id: 'crypto', label: 'ارز دیجیتال', icon: Coins, desc: 'پرداخت با بیت‌کوین، اتریوم و سایر ارزها' },
                      { id: 'perfectmoney', label: 'Perfect Money', icon: Wallet, desc: 'پرداخت از طریق کیف پول Perfect Money' },
                    ].map((m) => {
                      const Icon = m.icon;
                      const active = paymentMethod === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentMethod(m.id as any)}
                          className={`text-right rounded-lg border p-3 transition-all ${active ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'hover:border-primary/50'}`}
                        >
                          <Icon className="w-5 h-5 mb-2 text-primary" />
                          <p className="font-medium text-sm">{m.label}</p>
                          <p className="text-xs text-muted-foreground mt-1">{m.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-2 flex-wrap">
            <Button variant="outline" onClick={() => { setViewMode(null); setSelectedInvoice(null); }}>بستن</Button>
            {selectedInvoice && viewMode === 'view' && (
              <Button variant="outline" onClick={handlePrintInvoice}>
                <Printer className="w-4 h-4 ml-1" /> چاپ
              </Button>
            )}
            {selectedInvoice && (
              <Button variant="outline" onClick={() => handleDownloadInvoice(selectedInvoice)}>
                <Download className="w-4 h-4 ml-1" /> دانلود PDF
              </Button>
            )}
            {viewMode === 'view' && selectedInvoice && (selectedInvoice.status === 'Unpaid' || selectedInvoice.status === 'Overdue') && (
              <Button onClick={() => setViewMode('pay')}>
                <CreditCard className="w-4 h-4 ml-1" /> پرداخت
              </Button>
            )}
            {viewMode === 'pay' && (
              <Button onClick={confirmPayment}>
                <CreditCard className="w-4 h-4 ml-1" /> تأیید و پرداخت
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoicesPage;