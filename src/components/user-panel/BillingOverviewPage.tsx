import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Wallet, 
  TrendingUp, 
  FileText, 
  Plus
} from 'lucide-react';

interface BillingOverviewPageProps {
  navigateToServiceOrderPage?: (serviceLink: string) => void;
}

const BillingOverviewPage: React.FC<BillingOverviewPageProps> = ({ navigateToServiceOrderPage }) => {

  const walletBalance = "11,200,000";
  const totalSpent = "25,200,000";
  const totalEarned = "88,458,000";
  const totalPending = "7,500,000";
  
  const recentTransactions = [
    {
      date: '1402/08/04',
      description: 'خرید از فروشگاه آنلاین',
      paymentMethod: 'کیف پول',
      amount: '-50,000',
      status: 'Success'
    },
    {
      date: '1402/08/03',
      description: 'پرداخت فاکتور هاستینگ',
      paymentMethod: 'کارت بانکی',
      amount: '-1,200,000',
      status: 'Success'
    },
    {
      date: '1402/08/02',
      description: 'افزایش موجودی کیف پول',
      paymentMethod: 'کریپتو',
      amount: '+2,000,000',
      status: 'Success'
    }
  ];

  const allInvoices = [
    {
      id: 'INV-1402-001',
      dueDate: '1402/08/15',
      amount: '1,250,000',
      status: 'Paid'
    },
    {
      id: 'INV-1402-002',
      dueDate: '1402/08/20',
      amount: '850,000',
      status: 'Paid'
    },
    {
      id: 'INV-1402-003',
      dueDate: '1402/09/01',
      amount: '2,100,000',
      status: 'Unpaid'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Success': { color: 'bg-green-500', text: 'موفق' },
      'Fail': { color: 'bg-red-500', text: 'ناموفق' },
      'Pending': { color: 'bg-yellow-500', text: 'در انتظار' },
      'Paid': { color: 'bg-green-500', text: 'پرداخت شده' },
      'Unpaid': { color: 'bg-red-500', text: 'پرداخت نشده' },
      'Pay': { color: 'bg-yellow-500', text: 'پرداخت' },
      'Cancelled': { color: 'bg-gray-500', text: 'لغو شده' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'bg-gray-500', text: status };
    return <Badge className={`${config.color} text-white`}>{config.text}</Badge>;
  };


  return (
    <div className="p-6" dir="rtl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">نمای کلی امور مالی</h1>
          <p className="text-gray-600">وضعیت مالی و تراکنش‌های اخیر</p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
          onClick={() => navigateToServiceOrderPage?.('/wallet-topup')}
        >
          <Plus className="w-4 h-4" />
          افزایش موجودی
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Wallet className="w-8 h-8" />
              <div>
                <div className="text-sm text-green-100 mb-1">موجودی کیف پول</div>
                <div className="text-2xl font-bold">{walletBalance} تومان</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8" />
              <div>
                <div className="text-sm text-blue-100 mb-1">کل خرید این ماه</div>
                <div className="text-2xl font-bold">{totalSpent} تومان</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8" />
              <div>
                <div className="text-sm text-purple-100 mb-1">کل درآمد</div>
                <div className="text-2xl font-bold">{totalEarned} تومان</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8" />
              <div>
                <div className="text-sm text-orange-100 mb-1">در انتظار پرداخت</div>
                <div className="text-2xl font-bold">{totalPending} تومان</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              آخرین تراکنش‌ها
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{transaction.description}</div>
                    <div className="text-xs text-gray-600">{transaction.paymentMethod}</div>
                    <div className="text-xs text-gray-500">{transaction.date}</div>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm">{transaction.amount} تومان</div>
                    {getStatusBadge(transaction.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Invoices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              آخرین فاکتورها
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {allInvoices.map((invoice, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{invoice.id}</div>
                    <div className="text-xs text-gray-600">سررسید: {invoice.dueDate}</div>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm">{invoice.amount} تومان</div>
                    {getStatusBadge(invoice.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default BillingOverviewPage;