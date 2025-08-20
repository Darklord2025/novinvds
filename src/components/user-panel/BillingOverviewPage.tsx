import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  FileText, 
  Calendar,
  PieChart,
  BarChart3,
  Download
} from 'lucide-react';

const BillingOverviewPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const walletBalance = "2,450,000";
  
  const billingStats = [
    {
      title: 'مجموع هزینه‌ها (ماه جاری)',
      amount: '1,850,000',
      change: '+12%',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: 'کل فاکتورهای پرداخت شده',
      amount: '15,230,000',
      change: '-5%',
      trend: 'down',
      icon: TrendingDown
    },
    {
      title: 'فاکتورهای معوق',
      amount: '450,000',
      change: '0%',
      trend: 'neutral',
      icon: FileText
    },
    {
      title: 'پیش‌پرداخت موجود',
      amount: walletBalance,
      change: '+8%',
      trend: 'up',
      icon: Wallet
    }
  ];

  const recentTransactions = [
    {
      id: 'TXN001',
      type: 'پرداخت فاکتور',
      amount: '890,000',
      date: '1403/08/15',
      status: 'موفق',
      description: 'فاکتور #12345 - سرور مجازی'
    },
    {
      id: 'TXN002',
      type: 'شارژ کیف پول',
      amount: '2,000,000',
      date: '1403/08/10',
      status: 'موفق',
      description: 'واریز آنلاین'
    },
    {
      id: 'TXN003',
      type: 'پرداخت خودکار',
      amount: '450,000',
      date: '1403/08/05',
      status: 'موفق',
      description: 'تمدید دامنه example.com'
    }
  ];

  const upcomingInvoices = [
    {
      id: 'INV001',
      service: 'سرور مجازی VPS-001',
      amount: '890,000',
      dueDate: '1403/09/01',
      status: 'در انتظار'
    },
    {
      id: 'INV002',
      service: 'هاستینگ Pro Plan',
      amount: '230,000',
      dueDate: '1403/09/05',
      status: 'در انتظار'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'موفق': return 'bg-green-500';
      case 'در انتظار': return 'bg-yellow-500';
      case 'ناموفق': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6" dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">نمای کلی مالی</h1>
        <p className="text-gray-600">مدیریت کامل امور مالی و صورتحساب‌های شما</p>
      </div>

      {/* Wallet Balance Card */}
      <Card className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="w-6 h-6" />
                <span className="text-lg font-medium">موجودی کیف پول</span>
              </div>
              <div className="text-3xl font-bold">{walletBalance} تومان</div>
              <div className="text-blue-100 mt-2">آخرین بروزرسانی: امروز</div>
            </div>
            <Button variant="secondary" className="text-blue-600">
              شارژ کیف پول
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {billingStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${
                  stat.trend === 'up' ? 'bg-green-100' : 
                  stat.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <stat.icon className={`w-5 h-5 ${
                    stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`} />
                </div>
                <Badge variant={stat.trend === 'up' ? 'default' : stat.trend === 'down' ? 'destructive' : 'secondary'}>
                  {stat.change}
                </Badge>
              </div>
              <h3 className="text-sm text-gray-600 mb-2">{stat.title}</h3>
              <div className="text-2xl font-bold">{stat.amount} تومان</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">خلاصه</TabsTrigger>
          <TabsTrigger value="transactions">تراکنش‌ها</TabsTrigger>
          <TabsTrigger value="invoices">فاکتورها</TabsTrigger>
          <TabsTrigger value="reports">گزارشات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  آخرین تراکنش‌ها
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.slice(0, 3).map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{transaction.type}</div>
                        <div className="text-xs text-gray-600">{transaction.description}</div>
                        <div className="text-xs text-gray-500">{transaction.date}</div>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-sm">{transaction.amount} تومان</div>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(transaction.status)} mt-1 mr-auto`}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  مشاهده همه تراکنش‌ها
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Invoices */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  فاکتورهای آینده
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingInvoices.map(invoice => (
                    <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{invoice.service}</div>
                        <div className="text-xs text-gray-600">سررسید: {invoice.dueDate}</div>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-sm">{invoice.amount} تومان</div>
                        <Badge variant="secondary" className="text-xs">
                          {invoice.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  مشاهده همه فاکتورها
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تمام تراکنش‌ها</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full ${getStatusColor(transaction.status)} flex items-center justify-center`}>
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{transaction.type}</div>
                        <div className="text-sm text-gray-600">{transaction.description}</div>
                        <div className="text-xs text-gray-500">{transaction.date}</div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="font-bold">{transaction.amount} تومان</div>
                      <Badge variant={transaction.status === 'موفق' ? 'default' : 'destructive'}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>مدیریت فاکتورها</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">مدیریت فاکتورها</h3>
                <p className="text-gray-600">مشاهده، دانلود و پرداخت فاکتورها</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  گزارشات مالی
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 ml-2" />
                  دانلود گزارش
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">گزارشات تفصیلی</h3>
                <p className="text-gray-600">نمودارها و آمارهای مصرف و هزینه‌ها</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingOverviewPage;