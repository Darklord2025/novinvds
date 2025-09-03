import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Filter, ArrowRight } from 'lucide-react';

interface TransactionsPageProps {
  onBack?: () => void;
}

const TransactionsPage: React.FC<TransactionsPageProps> = ({ onBack }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const recentTransactions = [
    {
      id: 'TXN-1402-001',
      date: '1402/08/15',
      description: 'خرید سرویس VPS',
      paymentMethod: 'کیف پول',
      amount: '-1,500,000',
      status: 'Success',
      referenceId: 'REF123456'
    },
    {
      id: 'TXN-1402-002',
      date: '1402/08/14',
      description: 'افزایش موجودی کیف پول',
      paymentMethod: 'کارت بانکی',
      amount: '+5,000,000',
      status: 'Success',
      referenceId: 'REF123457'
    },
    {
      id: 'TXN-1402-003',
      date: '1402/08/13',
      description: 'پرداخت فاکتور هاستینگ',
      paymentMethod: 'درگاه پرداخت',
      amount: '-850,000',
      status: 'Success',
      referenceId: 'REF123458'
    },
    {
      id: 'TXN-1402-004',
      date: '1402/08/12',
      description: 'خرید دامنه',
      paymentMethod: 'کریپتو',
      amount: '-120,000',
      status: 'Pending',
      referenceId: 'REF123459'
    },
    {
      id: 'TXN-1402-005',
      date: '1402/08/11',
      description: 'بازگشت وجه سرویس لغو شده',
      paymentMethod: 'کیف پول',
      amount: '+300,000',
      status: 'Success',
      referenceId: 'REF123460'
    },
    {
      id: 'TXN-1402-006',
      date: '1402/08/10',
      description: 'خرید SSL',
      paymentMethod: 'کارت بانکی',
      amount: '-450,000',
      status: 'Failed',
      referenceId: 'REF123461'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Success': { variant: 'default', text: 'موفق', className: 'bg-green-500 hover:bg-green-600' },
      'Failed': { variant: 'destructive', text: 'ناموفق', className: 'bg-red-500 hover:bg-red-600' },
      'Pending': { variant: 'secondary', text: 'در انتظار', className: 'bg-yellow-500 hover:bg-yellow-600' },
      'Cancelled': { variant: 'outline', text: 'لغو شده', className: 'bg-gray-500 hover:bg-gray-600' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { variant: 'outline', text: status, className: 'bg-gray-500' };
    return (
      <Badge className={`${config.className} text-white`}>
        {config.text}
      </Badge>
    );
  };

  const filteredTransactions = recentTransactions.filter(transaction => {
    const matchesStatus = filterStatus === 'all' || transaction.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6" dir="rtl">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          {onBack && (
            <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              بازگشت
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold mb-2">تراکنش‌ها</h1>
            <p className="text-muted-foreground">تاریخچه کامل تراکنش‌های مالی شما</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              تمامی تراکنش‌ها
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="فیلتر وضعیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه وضعیت‌ها</SelectItem>
                  <SelectItem value="success">موفق</SelectItem>
                  <SelectItem value="pending">در انتظار</SelectItem>
                  <SelectItem value="failed">ناموفق</SelectItem>
                  <SelectItem value="cancelled">لغو شده</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                دانلود گزارش
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="جستجو در تراکنش‌ها..."
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
                  <th className="text-right p-3 font-medium">شناسه تراکنش</th>
                  <th className="text-right p-3 font-medium">تاریخ</th>
                  <th className="text-right p-3 font-medium">شرح</th>
                  <th className="text-right p-3 font-medium">روش پرداخت</th>
                  <th className="text-right p-3 font-medium">مبلغ</th>
                  <th className="text-right p-3 font-medium">وضعیت</th>
                  <th className="text-right p-3 font-medium">کد پیگیری</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-mono text-sm">{transaction.id}</td>
                    <td className="p-3 text-sm">{transaction.date}</td>
                    <td className="p-3">{transaction.description}</td>
                    <td className="p-3 text-sm">{transaction.paymentMethod}</td>
                    <td className={`p-3 font-bold ${transaction.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                      {transaction.amount} تومان
                    </td>
                    <td className="p-3">{getStatusBadge(transaction.status)}</td>
                    <td className="p-3 font-mono text-sm text-muted-foreground">{transaction.referenceId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              تراکنشی با این فیلترها یافت نشد
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;