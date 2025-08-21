import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Search,
  Filter
} from 'lucide-react';

const TransactionsPage = () => {
  const [transactionFilter, setTransactionFilter] = useState('all');
  
  const recentTransactions = [
    {
      date: '1402/08/04',
      description: 'خرید از فروشگاه آنلاین',
      paymentMethod: 'ریال',
      amount: '-50,000',
      status: 'Success'
    },
    {
      date: '1402/08/03',
      description: 'قبض برق',
      paymentMethod: 'کریپتو',
      amount: '+1,000,000',
      status: 'Fail'
    },
    {
      date: '1402/08/03',
      description: 'تراکنش کیف پول',
      paymentMethod: 'کیف پول',
      amount: '+1,000,000',
      status: 'Fail'
    },
    {
      date: '1402/08/03',
      description: 'انتقال حقوق',
      paymentMethod: 'حساب بانکی',
      amount: '-5,000',
      status: 'Success'
    },
    {
      date: '1402/08/02',
      description: 'پرداخت فاکتور',
      paymentMethod: 'کارت اعتباری',
      amount: '0',
      status: 'Pending'
    },
    {
      date: '1402/08/04',
      description: 'خرید سرویس',
      paymentMethod: 'کیف پول',
      amount: '-150,000',
      status: 'Pending'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Success': { color: 'bg-green-500', text: 'موفق' },
      'Fail': { color: 'bg-red-500', text: 'ناموفق' },
      'Pending': { color: 'bg-yellow-500', text: 'در انتظار' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'bg-gray-500', text: status };
    return <Badge className={`${config.color} text-white`}>{config.text}</Badge>;
  };

  return (
    <div className="p-6" dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">تراکنش‌ها</h1>
        <p className="text-gray-600">مشاهده تمامی تراکنش‌های مالی</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              تمامی تراکنش‌ها
            </CardTitle>
            <div className="flex gap-2">
              <Select value={transactionFilter} onValueChange={setTransactionFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="فیلتر بر اساس" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه تراکنش‌ها</SelectItem>
                  <SelectItem value="success">موفق</SelectItem>
                  <SelectItem value="pending">در انتظار</SelectItem>
                  <SelectItem value="failed">ناموفق</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="جستجوی تراکنش‌ها..." 
                  className="pr-10"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right p-3">تاریخ</th>
                    <th className="text-right p-3">شرح</th>
                    <th className="text-right p-3">روش پرداخت</th>
                    <th className="text-right p-3">مبلغ</th>
                    <th className="text-right p-3">وضعیت</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3">{transaction.date}</td>
                      <td className="p-3">{transaction.description}</td>
                      <td className="p-3">{transaction.paymentMethod}</td>
                      <td className="p-3 font-medium">{transaction.amount} تومان</td>
                      <td className="p-3">{getStatusBadge(transaction.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;