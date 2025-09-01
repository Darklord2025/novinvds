import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, Download, Eye, CreditCard, Filter } from 'lucide-react';

const InvoicesPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [searchQuery, setSearchQuery] = useState('');

  const allInvoices = [
    {
      id: 'INV-1402-001',
      service: 'سرویس VPS - پلن پیشرفته',
      dueDate: '1402/09/15',
      amount: '2,500,000',
      status: 'Paid',
      issueDate: '1402/08/15'
    },
    {
      id: 'INV-1402-002',
      service: 'هاستینگ وب - پلن حرفه‌ای',
      dueDate: '1402/09/20',
      amount: '850,000',
      status: 'Unpaid',
      issueDate: '1402/08/20'
    },
    {
      id: 'INV-1402-003',
      service: 'سرویس اختصاصی - سرور قدرتمند',
      dueDate: '1402/09/25',
      amount: '5,200,000',
      status: 'Paid',
      issueDate: '1402/08/25'
    },
    {
      id: 'INV-1402-004',
      service: 'ثبت دامنه - example.com',
      dueDate: '1402/09/30',
      amount: '120,000',
      status: 'Overdue',
      issueDate: '1402/08/30'
    },
    {
      id: 'INV-1402-005',
      service: 'گواهی SSL - Wildcard',
      dueDate: '1402/10/05',
      amount: '750,000',
      status: 'Unpaid',
      issueDate: '1402/09/05'
    },
    {
      id: 'INV-1402-006',
      service: 'سرویس Cloud - پلن کسب‌وکار',
      dueDate: '1402/10/10',
      amount: '1,200,000',
      status: 'Paid',
      issueDate: '1402/09/10'
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

  const handleViewInvoice = (invoiceId: string) => {
    console.log('View invoice:', invoiceId);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log('Download invoice:', invoiceId);
  };

  const handlePayInvoice = (invoiceId: string) => {
    console.log('Pay invoice:', invoiceId);
  };

  return (
    <div className="p-6" dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">فاکتورها</h1>
        <p className="text-muted-foreground">مدیریت و پرداخت فاکتورهای شما</p>
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
                    <td className="p-3 font-mono text-sm">{invoice.id}</td>
                    <td className="p-3">{invoice.service}</td>
                    <td className="p-3 text-sm">{invoice.dueDate}</td>
                    <td className="p-3 font-bold">{invoice.amount} تومان</td>
                    <td className="p-3">{getStatusBadge(invoice.status)}</td>
                    <td className="p-3">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewInvoice(invoice.id)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          مشاهده
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadInvoice(invoice.id)}
                          className="flex items-center gap-1"
                        >
                          <Download className="w-4 h-4" />
                          دانلود
                        </Button>
                        {(invoice.status === 'Unpaid' || invoice.status === 'Overdue') && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handlePayInvoice(invoice.id)}
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
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicesPage;