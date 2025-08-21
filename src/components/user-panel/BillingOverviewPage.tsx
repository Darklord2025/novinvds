import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CreditCard, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  FileText, 
  Calendar,
  Search,
  Filter,
  Plus,
  Eye,
  X,
  MoreHorizontal
} from 'lucide-react';

const BillingOverviewPage = () => {
  const [currentView, setCurrentView] = useState('overview'); // overview, transactions, invoices, wallet-topup
  const [transactionFilter, setTransactionFilter] = useState('all');
  const [invoiceFilter, setInvoiceFilter] = useState('all');

  const walletBalance = "11,200";
  const totalSpent = "25,200";
  const totalEarned = "88458";
  const totalPending = "7500";
  
  const recentTransactions = [
    {
      date: '2023-10-26',
      description: 'Online Store Purchase',
      paymentMethod: 'ریال',
      amount: '-50.00',
      status: 'Success'
    },
    {
      date: '2023-10-25',
      description: 'Utility Bill',
      paymentMethod: 'Crypto',
      amount: '+1000.00',
      status: 'Fail'
    },
    {
      date: '2023-10-25',
      description: 'Fragment',
      paymentMethod: 'Fragment',
      amount: '+1000.00',
      status: 'Fail'
    },
    {
      date: '2023-10-25',
      description: 'Salary Transfer',
      paymentMethod: 'N/A',
      amount: '-0.005',
      status: 'Success'
    },
    {
      date: '2023-10-24',
      description: 'FA',
      paymentMethod: 'USATC',
      amount: '',
      status: 'Pending'
    },
    {
      date: '2023-10-26',
      description: '',
      paymentMethod: 'RFTC',
      amount: '',
      status: 'Pending'
    }
  ];

  const allInvoices = [
    {
      id: 'INV-2023-001',
      dueDate: 'MM/DD/YYYY',
      amount: '$1,250.00',
      status: 'Paid'
    },
    {
      id: 'INV-2023-001',
      dueDate: 'MM/DD/YYYY',
      amount: '$1,250.00',
      status: 'Paid'
    },
    {
      id: 'INV-2023-001',
      dueDate: 'MM/DD/YYYY',
      amount: '$1,250.00',
      status: 'Unpaid'
    },
    {
      id: 'INV-2023-001',
      dueDate: 'MM/DD/YYYY',
      amount: '$1,450.00',
      status: 'Pay'
    },
    {
      id: 'INV-2023-001',
      dueDate: 'Unpaid',
      amount: '$ Pending',
      status: 'Cancelled'
    },
    {
      id: 'INV-2023-001',
      dueDate: 'Servolon',
      amount: '$250.00',
      status: 'Pay'
    },
    {
      id: 'INV-2023-001',
      dueDate: 'MM/DD/YYYY',
      amount: '$1,250.00',
      status: 'Pay'
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

  if (currentView === 'wallet-topup') {
    return (
      <div className="p-6 max-w-md mx-auto" dir="rtl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentView('overview')}
            className="mb-4"
          >
            ← بازگشت
          </Button>
          <h1 className="text-2xl font-bold mb-2">افزایش موجودی</h1>
          <p className="text-gray-600">افزایش موجودی کیف پول</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">مبلغ (تومان)</label>
                <Input 
                  type="number" 
                  placeholder="مبلغ مورد نظر را وارد کنید"
                  className="text-right"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">روش پرداخت</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب روش پرداخت" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">کارت بانکی</SelectItem>
                    <SelectItem value="crypto">ارز دیجیتال</SelectItem>
                    <SelectItem value="perfect">پرفکت مانی</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">
                پرداخت و افزایش موجودی
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6" dir="rtl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Financial Overview</h1>
        </div>
        <Button variant="outline" size="sm">
          Movies 📊
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="text-sm text-gray-600 mb-1">Total Chart</div>
            <div className="text-2xl font-bold">${walletBalance}</div>
            <div className="text-xs text-gray-500">This Month</div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-600 text-white">
          <CardContent className="p-4">
            <div className="text-sm text-blue-100 mb-1">Total from Revenue</div>
            <div className="text-2xl font-bold">${totalSpent}</div>
            <div className="text-xs text-blue-200">This Month</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="text-sm text-gray-600 mb-1">Total Customers</div>
            <div className="text-2xl font-bold">${totalEarned}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="text-sm text-gray-600 mb-1">Total</div>
            <div className="text-2xl font-bold">${totalPending}</div>
          </CardContent>
        </Card>
      </div>

      {/* Content based on current view */}
      {currentView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.slice(0, 3).map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{transaction.description}</div>
                      <div className="text-xs text-gray-600">{transaction.paymentMethod}</div>
                      <div className="text-xs text-gray-500">{transaction.date}</div>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm">{transaction.amount} ریال</div>
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
                Recent Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {allInvoices.slice(0, 3).map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{invoice.id}</div>
                      <div className="text-xs text-gray-600">سررسید: {invoice.dueDate}</div>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm">{invoice.amount}</div>
                      {getStatusBadge(invoice.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentView === 'transactions' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Transactions</CardTitle>
              <div className="flex gap-2">
                <Select value={transactionFilter} onValueChange={setTransactionFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="success">Payment Method</SelectItem>
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
                    placeholder="Search transactions..." 
                    className="pr-10"
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3">Date</th>
                      <th className="text-right p-3">Description</th>
                      <th className="text-right p-3">Payment Method</th>
                      <th className="text-right p-3">Amount</th>
                      <th className="text-right p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((transaction, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3">{transaction.date}</td>
                        <td className="p-3">{transaction.description}</td>
                        <td className="p-3">{transaction.paymentMethod}</td>
                        <td className="p-3 font-medium">{transaction.amount} ریال</td>
                        <td className="p-3">{getStatusBadge(transaction.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentView === 'invoices' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Invoices</CardTitle>
              <div className="flex gap-2">
                <Select value={invoiceFilter} onValueChange={setInvoiceFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Paid</SelectItem>
                    <SelectItem value="paid">Unpaid</SelectItem>
                    <SelectItem value="unpaid">Pending</SelectItem>
                    <SelectItem value="pending">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Due Date</SelectItem>
                    <SelectItem value="amount">Amount</SelectItem>
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
                  placeholder="Search invoices..." 
                  className="pr-10"
                />
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3">Invoice ID</th>
                      <th className="text-right p-3">Due Date</th>
                      <th className="text-right p-3">Amount</th>
                      <th className="text-right p-3">Status</th>
                      <th className="text-right p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allInvoices.map((invoice, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3">{invoice.id}</td>
                        <td className="p-3">{invoice.dueDate}</td>
                        <td className="p-3 font-medium">{invoice.amount}</td>
                        <td className="p-3">{getStatusBadge(invoice.status)}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {invoice.status === 'Unpaid' && (
                              <Button variant="outline" size="sm">
                                Pay
                              </Button>
                            )}
                            {invoice.status === 'Cancelled' && (
                              <Button variant="ghost" size="sm">
                                <X className="w-4 h-4" />
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
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">4</Button>
                <Button variant="default" size="sm">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BillingOverviewPage;