import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Search, Download, Eye, CreditCard, Filter, ArrowRight, Wallet, Building2, Bitcoin } from 'lucide-react';
import { toPersianDigits } from '@/lib/numberUtils';
import { toast } from '@/components/ui/use-toast';
import { jsPDF } from 'jspdf';

interface InvoicesPageProps {
  onBack?: () => void;
}

const InvoicesPage: React.FC<InvoicesPageProps> = ({ onBack }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'view' | 'pay' | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'gateway' | 'crypto'>('gateway');


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

  const handleDownloadInvoice = (invoice: any) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Invoice / Factor', 14, 18);
    doc.setFontSize(11);
    doc.text(`Invoice #: ${invoice.id}`, 14, 32);
    doc.text(`Service: ${invoice.service}`, 14, 42);
    doc.text(`Issue Date: ${invoice.issueDate}`, 14, 52);
    doc.text(`Due Date: ${invoice.dueDate}`, 14, 62);
    doc.text(`Amount: ${invoice.amount} Toman`, 14, 72);
    doc.text(`Status: ${invoice.status}`, 14, 82);
    doc.line(14, 90, 196, 90);
    doc.text('NovinVDS - Thank you for your business.', 14, 100);
    doc.save(`${invoice.id}.pdf`);
    toast({ title: 'دانلود انجام شد', description: `فاکتور ${invoice.id} با موفقیت دانلود شد.` });
  };

  const handlePayInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setViewMode('pay');
  };

  const confirmPayment = () => {
    if (!selectedInvoice) return;
    const methodLabel = paymentMethod === 'wallet' ? 'کیف پول' : paymentMethod === 'gateway' ? 'درگاه بانکی' : 'ارز دیجیتال';
    toast({
      title: 'انتقال به درگاه پرداخت',
      description: `پرداخت فاکتور ${selectedInvoice.id} از طریق ${methodLabel} در حال انجام است...`,
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
        <DialogContent className="max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle>
              {viewMode === 'pay' ? 'پرداخت فاکتور' : 'پیش‌نمایش فاکتور'} {selectedInvoice?.id}
            </DialogTitle>
            <DialogDescription>
              {viewMode === 'pay' ? 'لطفاً روش پرداخت خود را انتخاب کنید.' : 'جزئیات کامل فاکتور در زیر نمایش داده شده است.'}
            </DialogDescription>
          </DialogHeader>

          {selectedInvoice && (
            <div className="space-y-4">
              <div className="rounded-lg border p-4 bg-muted/30 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">شماره فاکتور:</span><span className="font-medium">{selectedInvoice.id}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">سرویس:</span><span className="font-medium">{selectedInvoice.service}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">تاریخ صدور:</span><span>{selectedInvoice.issueDate}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">تاریخ سررسید:</span><span>{selectedInvoice.dueDate}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">وضعیت:</span>{getStatusBadge(selectedInvoice.status)}</div>
                <div className="flex justify-between border-t pt-2 mt-2"><span className="font-bold">مبلغ قابل پرداخت:</span><span className="font-bold text-primary text-lg">{selectedInvoice.amount} تومان</span></div>
              </div>

              {viewMode === 'pay' && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">روش پرداخت:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'wallet', label: 'کیف پول', icon: Wallet, desc: 'پرداخت از موجودی کیف پول' },
                      { id: 'gateway', label: 'درگاه بانکی', icon: Building2, desc: 'زرین‌پال / پی‌پینگ' },
                      { id: 'crypto', label: 'ارز دیجیتال', icon: Bitcoin, desc: 'BTC / USDT' },
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

          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => { setViewMode(null); setSelectedInvoice(null); }}>بستن</Button>
            {selectedInvoice && (
              <Button variant="outline" onClick={() => handleDownloadInvoice(selectedInvoice)}>
                <Download className="w-4 h-4 ml-1" /> دانلود PDF
              </Button>
            )}
            {viewMode === 'view' && selectedInvoice && (selectedInvoice.status === 'Unpaid' || selectedInvoice.status === 'Overdue') && (
              <Button onClick={() => setViewMode('pay')}>
                <CreditCard className="w-4 h-4 ml-1" /> ادامه پرداخت
              </Button>
            )}
            {viewMode === 'pay' && (
              <Button onClick={confirmPayment}>
                <CreditCard className="w-4 h-4 ml-1" /> پرداخت
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoicesPage;