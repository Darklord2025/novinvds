import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Search,
  Eye,
  Download
} from 'lucide-react';

const InvoicesPage = () => {
  const [invoiceFilter, setInvoiceFilter] = useState('all');
  
  const allInvoices = [
    {
      id: 'INV-1402-001',
      dueDate: '1402/08/15',
      amount: '1,250,000',
      status: 'Paid',
      service: 'هاستینگ وردپرس'
    },
    {
      id: 'INV-1402-002',
      dueDate: '1402/08/20',
      amount: '850,000',
      status: 'Paid',
      service: 'سرور مجازی'
    },
    {
      id: 'INV-1402-003',
      dueDate: '1402/09/01',
      amount: '2,100,000',
      status: 'Unpaid',
      service: 'سرور اختصاصی'
    },
    {
      id: 'INV-1402-004',
      dueDate: '1402/09/05',
      amount: '450,000',
      status: 'Pay',
      service: 'دامنه .com'
    },
    {
      id: 'INV-1402-005',
      dueDate: '1402/08/25',
      amount: '0',
      status: 'Cancelled',
      service: 'هاستینگ ویژه'
    },
    {
      id: 'INV-1402-006',
      dueDate: '1402/09/10',
      amount: '320,000',
      status: 'Pay',
      service: 'سرور ابری'
    },
    {
      id: 'INV-1402-007',
      dueDate: '1402/09/12',
      amount: '1,750,000',
      status: 'Unpaid',
      service: 'VPS پیشرفته'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Paid': { color: 'bg-green-500', text: 'پرداخت شده' },
      'Unpaid': { color: 'bg-red-500', text: 'پرداخت نشده' },
      'Pay': { color: 'bg-yellow-500', text: 'در انتظار پرداخت' },
      'Cancelled': { color: 'bg-gray-500', text: 'لغو شده' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'bg-gray-500', text: status };
    return <Badge className={`${config.color} text-white`}>{config.text}</Badge>;
  };

  return (
    <div className="p-6" dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">فاکتورها</h1>
        <p className="text-gray-600">مشاهده و مدیریت تمامی فاکتورهای صادر شده</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              تمامی فاکتورها
            </CardTitle>
            <div className="flex gap-2">
              <Select value={invoiceFilter} onValueChange={setInvoiceFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="فیلتر بر اساس وضعیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه فاکتورها</SelectItem>
                  <SelectItem value="paid">پرداخت شده</SelectItem>
                  <SelectItem value="unpaid">پرداخت نشده</SelectItem>
                  <SelectItem value="pending">در انتظار پرداخت</SelectItem>
                  <SelectItem value="cancelled">لغو شده</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="مرتب سازی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">تاریخ سررسید</SelectItem>
                  <SelectItem value="amount">مبلغ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="جستجوی فاکتورها..." 
                className="pr-10"
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right p-3">شماره فاکتور</th>
                    <th className="text-right p-3">سرویس</th>
                    <th className="text-right p-3">تاریخ سررسید</th>
                    <th className="text-right p-3">مبلغ</th>
                    <th className="text-right p-3">وضعیت</th>
                    <th className="text-right p-3">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {allInvoices.map((invoice, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{invoice.id}</td>
                      <td className="p-3">{invoice.service}</td>
                      <td className="p-3">{invoice.dueDate}</td>
                      <td className="p-3 font-medium">{invoice.amount} تومان</td>
                      <td className="p-3">{getStatusBadge(invoice.status)}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" title="مشاهده">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="دانلود">
                            <Download className="w-4 h-4" />
                          </Button>
                          {(invoice.status === 'Unpaid' || invoice.status === 'Pay') && (
                            <Button variant="outline" size="sm">
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
            
            <div className="flex justify-center items-center gap-2 pt-4">
              <Button variant="outline" size="sm">قبلی</Button>
              <Button variant="outline" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">4</Button>
              <Button variant="default" size="sm">بعدی</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicesPage;