
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard, Coins, Bitcoin, RefreshCw, Check, Clock, AlertTriangle, Server, Database, Globe, Receipt, FileText, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Transaction = {
  id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'payment' | 'automatic';
  status: 'successful' | 'pending' | 'failed';
  method: string;
  description: string;
  date: string;
  reference?: string;
};

type Invoice = {
  id: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'overdue' | 'cancelled';
  description: string;
  date: string;
  dueDate: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
};

const WalletPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('zarinpal');
  const [amount, setAmount] = useState('');
  const [isAutoRenew, setIsAutoRenew] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [activeInvoiceTab, setActiveInvoiceTab] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const { toast } = useToast();
  
  // Sample transactions data
  const transactions: Transaction[] = [
    {
      id: 'TRX-12345',
      amount: 500000,
      type: 'deposit',
      status: 'successful',
      method: 'زرین‌پال',
      description: 'افزایش موجودی کیف پول',
      date: '1402/05/15',
      reference: 'ZP-987654'
    },
    {
      id: 'TRX-12346',
      amount: -350000,
      type: 'payment',
      status: 'successful',
      method: 'کیف پول',
      description: 'پرداخت فاکتور شماره INV-54321',
      date: '1402/05/17'
    },
    {
      id: 'TRX-12347',
      amount: -120000,
      type: 'automatic',
      status: 'successful',
      method: 'کیف پول',
      description: 'تمدید خودکار سرور مجازی لینوکس',
      date: '1402/05/20'
    },
    {
      id: 'TRX-12348',
      amount: 300000,
      type: 'deposit',
      status: 'pending',
      method: 'ارز دیجیتال (USDT)',
      description: 'افزایش موجودی کیف پول',
      date: '1402/05/22'
    }
  ];

  // Sample invoices data
  const invoices: Invoice[] = [
    {
      id: 'INV-54321',
      amount: 350000,
      status: 'paid',
      description: 'سرور مجازی لینوکس - یک ماهه',
      date: '1402/05/15',
      dueDate: '1402/05/25',
      items: [
        {
          name: 'سرور مجازی لینوکس - اوبونتو 22.04',
          quantity: 1,
          price: 300000
        },
        {
          name: 'آی‌پی اضافی',
          quantity: 1,
          price: 20000
        },
        {
          name: 'مالیات بر ارزش افزوده (9%)',
          quantity: 1,
          price: 30000
        }
      ]
    },
    {
      id: 'INV-54322',
      amount: 1200000,
      status: 'unpaid',
      description: 'هاست وردپرس - یک ساله',
      date: '1402/05/20',
      dueDate: '1402/05/30',
      items: [
        {
          name: 'هاست وردپرس - پلن پیشرفته',
          quantity: 1,
          price: 1100000
        },
        {
          name: 'مالیات بر ارزش افزوده (9%)',
          quantity: 1,
          price: 100000
        }
      ]
    },
    {
      id: 'INV-54323',
      amount: 850000,
      status: 'overdue',
      description: 'سرور ابری - سه ماهه',
      date: '1402/04/10',
      dueDate: '1402/04/20',
      items: [
        {
          name: 'سرور ابری - پلن استاندارد',
          quantity: 1,
          price: 780000
        },
        {
          name: 'مالیات بر ارزش افزوده (9%)',
          quantity: 1,
          price: 70000
        }
      ]
    }
  ];
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
  };
  
  const formatNumber = (num: string | number) => {
    if (!num) return '';
    const numValue = typeof num === 'string' ? Number(num) : num;
    return numValue.toLocaleString('fa-IR');
  };

  const handlePayment = () => {
    if (!amount || parseInt(amount) < 10000) {
      toast({
        title: "خطا در پرداخت",
        description: "مبلغ باید حداقل 10,000 تومان باشد",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "در حال انتقال به درگاه پرداخت",
      description: "لطفاً منتظر بمانید...",
    });

    // در اینجا باید به درگاه پرداخت منتقل شویم
    setTimeout(() => {
      toast({
        title: "تست پرداخت موفق",
        description: "افزایش موجودی با موفقیت انجام شد (حالت آزمایشی)",
      });
    }, 2000);
  };

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'successful':
        return <Badge className="bg-green-500">موفق</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">در حال پردازش</Badge>;
      case 'failed':
        return <Badge className="bg-red-500">ناموفق</Badge>;
      default:
        return <Badge>نامشخص</Badge>;
    }
  };

  const getInvoiceStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">پرداخت شده</Badge>;
      case 'unpaid':
        return <Badge className="bg-blue-500">پرداخت نشده</Badge>;
      case 'overdue':
        return <Badge className="bg-red-500">سررسید شده</Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-500">لغو شده</Badge>;
      default:
        return <Badge>نامشخص</Badge>;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (activeTab === 'all') return true;
    return transaction.type === activeTab;
  });

  const filteredInvoices = invoices.filter(invoice => {
    if (activeInvoiceTab === 'all') return true;
    return invoice.status === activeInvoiceTab;
  });

  const handlePayInvoice = (invoice: Invoice) => {
    toast({
      title: "در حال انتقال به صفحه پرداخت",
      description: `فاکتور شماره ${invoice.id} به مبلغ ${formatNumber(invoice.amount)} تومان`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">کیف پول</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">موجودی کیف پول</CardTitle>
            <CardDescription>موجودی قابل استفاده برای پرداخت</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-blue-500 ml-3" />
              <div>
                <p className="text-2xl font-bold">330,000 تومان</p>
                <p className="text-sm text-gray-500">قابل استفاده</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">افزایش موجودی</CardTitle>
            <CardDescription>از طریق یکی از روش‌های زیر کیف پول خود را شارژ کنید</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">مبلغ (تومان)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="مبلغ به تومان وارد کنید"
                    dir="ltr"
                  />
                  {amount && (
                    <p className="mt-1 text-sm text-gray-500">
                      {formatNumber(amount)} تومان
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">روش پرداخت</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div 
                      className={`border rounded-md p-3 cursor-pointer flex items-center ${paymentMethod === 'zarinpal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                      onClick={() => setPaymentMethod('zarinpal')}
                    >
                      <CreditCard className="h-5 w-5 ml-2 text-yellow-500" />
                      <span>زرین‌پال</span>
                    </div>
                    <div 
                      className={`border rounded-md p-3 cursor-pointer flex items-center ${paymentMethod === 'zibal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                      onClick={() => setPaymentMethod('zibal')}
                    >
                      <CreditCard className="h-5 w-5 ml-2 text-purple-500" />
                      <span>زیبال</span>
                    </div>
                    <div 
                      className={`border rounded-md p-3 cursor-pointer flex items-center ${paymentMethod === 'crypto' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                      onClick={() => setPaymentMethod('crypto')}
                    >
                      <Bitcoin className="h-5 w-5 ml-2 text-orange-500" />
                      <span>ارز دیجیتال</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="auto-renewal"
                    checked={isAutoRenew}
                    onChange={() => setIsAutoRenew(!isAutoRenew)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ml-2"
                  />
                  <label htmlFor="auto-renewal" className="text-sm text-gray-700">
                    فعال‌سازی پرداخت خودکار برای تمدید سرویس‌ها
                  </label>
                </div>
              </div>
              
              <Button className="w-full bg-blue-600" onClick={handlePayment}>پرداخت و افزایش موجودی</Button>
            </div>

            {paymentMethod === 'crypto' && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">پرداخت با ارز دیجیتال</h4>
                <p className="text-sm text-blue-700 mb-3">برای پرداخت با ارزهای دیجیتال، می‌توانید از یکی از روش‌های زیر استفاده کنید:</p>
                <ul className="text-sm text-blue-700 space-y-2 mr-4 list-disc">
                  <li>بیت‌کوین (BTC)</li>
                  <li>اتریوم (ETH)</li>
                  <li>تتر (USDT)</li>
                  <li>دوج‌کوین (DOGE)</li>
                </ul>
                <p className="text-sm text-blue-700 mt-3">پس از کلیک روی دکمه پرداخت، به صفحه انتخاب ارز و جزئیات پرداخت منتقل خواهید شد.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>تنظیمات پرداخت خودکار</CardTitle>
          <CardDescription>مدیریت تمدید خودکار سرویس‌ها از کیف پول</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h4 className="font-medium">پرداخت خودکار از کیف پول</h4>
                <p className="text-sm text-gray-500">سرویس‌های شما به طور خودکار از موجودی کیف پول تمدید شوند</p>
              </div>
              <div className="flex items-center">
                <label htmlFor="autoPaySwitch" className="sr-only">پرداخت خودکار</label>
                <input
                  type="checkbox"
                  id="autoPaySwitch"
                  checked={isAutoRenew}
                  onChange={() => setIsAutoRenew(!isAutoRenew)}
                  className="h-5 w-10 rounded-full bg-gray-300 focus:ring-blue-500 relative inline-flex items-center transition-colors"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">سرویس‌های فعال برای تمدید خودکار</h4>
              
              <div className="border rounded-lg p-3 flex justify-between items-center">
                <div className="flex items-center">
                  <Server className="h-5 w-5 text-blue-500 ml-2" />
                  <div>
                    <h5 className="font-medium">سرور مجازی لینوکس</h5>
                    <p className="text-xs text-gray-500">تاریخ تمدید بعدی: 1402/06/15</p>
                  </div>
                </div>
                <Check className="h-5 w-5 text-green-500" />
              </div>
              
              <div className="border rounded-lg p-3 flex justify-between items-center">
                <div className="flex items-center">
                  <Database className="h-5 w-5 text-purple-500 ml-2" />
                  <div>
                    <h5 className="font-medium">هاست وردپرس</h5>
                    <p className="text-xs text-gray-500">تاریخ تمدید بعدی: 1402/07/24</p>
                  </div>
                </div>
                <Check className="h-5 w-5 text-green-500" />
              </div>
              
              <div className="border rounded-lg p-3 flex justify-between items-center bg-yellow-50">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-amber-500 ml-2" />
                  <div>
                    <h5 className="font-medium">دامنه novinvds.ir</h5>
                    <p className="text-xs text-gray-500">تاریخ تمدید بعدی: 1402/05/10</p>
                  </div>
                </div>
                <div className="flex items-center text-amber-600">
                  <AlertTriangle className="h-5 w-5 ml-1" />
                  <span className="text-xs">موجودی ناکافی</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* تراکنش‌ها */}
      <Card>
        <CardHeader>
          <CardTitle>تاریخچه تراکنش‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">همه تراکنش‌ها</TabsTrigger>
              <TabsTrigger value="deposit">افزایش موجودی</TabsTrigger>
              <TabsTrigger value="payment">پرداخت</TabsTrigger>
              <TabsTrigger value="automatic">پرداخت‌های خودکار</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-6">
              {filteredTransactions.length > 0 ? (
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100 border-b">
                          <th className="py-3 px-4 text-right font-medium">شناسه</th>
                          <th className="py-3 px-4 text-right font-medium">تاریخ</th>
                          <th className="py-3 px-4 text-right font-medium">توضیحات</th>
                          <th className="py-3 px-4 text-right font-medium">روش</th>
                          <th className="py-3 px-4 text-right font-medium">وضعیت</th>
                          <th className="py-3 px-4 text-right font-medium">مبلغ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTransactions.map((transaction) => (
                          <tr key={transaction.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{transaction.id}</td>
                            <td className="py-3 px-4">{transaction.date}</td>
                            <td className="py-3 px-4">{transaction.description}</td>
                            <td className="py-3 px-4">{transaction.method}</td>
                            <td className="py-3 px-4">{getStatusBadge(transaction.status)}</td>
                            <td className={`py-3 px-4 font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {transaction.amount > 0 ? '+' : ''}{formatNumber(transaction.amount)} تومان
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Coins className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>هنوز تراکنشی در این دسته انجام نداده‌اید.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* فاکتورها */}
      <Card>
        <CardHeader>
          <CardTitle>فاکتورها</CardTitle>
          <CardDescription>مدیریت و پرداخت فاکتورهای سرویس‌ها</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeInvoiceTab} onValueChange={setActiveInvoiceTab}>
            <TabsList>
              <TabsTrigger value="all">همه فاکتورها</TabsTrigger>
              <TabsTrigger value="unpaid">پرداخت نشده</TabsTrigger>
              <TabsTrigger value="paid">پرداخت شده</TabsTrigger>
              <TabsTrigger value="overdue">سررسید شده</TabsTrigger>
            </TabsList>
            <TabsContent value={activeInvoiceTab} className="mt-6">
              {filteredInvoices.length > 0 ? (
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100 border-b">
                          <th className="py-3 px-4 text-right font-medium">شماره فاکتور</th>
                          <th className="py-3 px-4 text-right font-medium">تاریخ صدور</th>
                          <th className="py-3 px-4 text-right font-medium">تاریخ سررسید</th>
                          <th className="py-3 px-4 text-right font-medium">توضیحات</th>
                          <th className="py-3 px-4 text-right font-medium">وضعیت</th>
                          <th className="py-3 px-4 text-right font-medium">مبلغ</th>
                          <th className="py-3 px-4 text-right font-medium">عملیات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInvoices.map((invoice) => (
                          <tr key={invoice.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{invoice.id}</td>
                            <td className="py-3 px-4">{invoice.date}</td>
                            <td className="py-3 px-4">{invoice.dueDate}</td>
                            <td className="py-3 px-4">{invoice.description}</td>
                            <td className="py-3 px-4">{getInvoiceStatusBadge(invoice.status)}</td>
                            <td className="py-3 px-4 font-medium">
                              {formatNumber(invoice.amount)} تومان
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8"
                                  onClick={() => setSelectedInvoice(invoice)}
                                >
                                  <FileText className="h-4 w-4 ml-1" />
                                  مشاهده
                                </Button>
                                
                                {invoice.status !== 'paid' && (
                                  <Button 
                                    size="sm" 
                                    className="h-8 bg-blue-600"
                                    onClick={() => handlePayInvoice(invoice)}
                                  >
                                    <CreditCard className="h-4 w-4 ml-1" />
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
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Receipt className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>فاکتوری در این دسته یافت نشد.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Invoice Detail Dialog */}
      {selectedInvoice && (
        <Dialog open={!!selectedInvoice} onOpenChange={(isOpen) => !isOpen && setSelectedInvoice(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>فاکتور شماره {selectedInvoice.id}</DialogTitle>
              <DialogDescription>جزئیات فاکتور و آیتم‌های شامل شده</DialogDescription>
            </DialogHeader>
            
            <div className="p-6 border rounded-lg">
              <div className="flex justify-between mb-6">
                <div>
                  <h3 className="font-bold text-lg">فاکتور NovinVDS</h3>
                  <p className="text-sm text-gray-500">شرکت نوین وی دی اس</p>
                  <p className="text-sm text-gray-500">info@novinvds.ir</p>
                  <p className="text-sm text-gray-500">09335732119</p>
                </div>
                <div className="text-left">
                  <p className="text-sm"><span className="font-medium">شماره فاکتور:</span> {selectedInvoice.id}</p>
                  <p className="text-sm"><span className="font-medium">تاریخ صدور:</span> {selectedInvoice.date}</p>
                  <p className="text-sm"><span className="font-medium">تاریخ سررسید:</span> {selectedInvoice.dueDate}</p>
                  <div className="mt-2">{getInvoiceStatusBadge(selectedInvoice.status)}</div>
                </div>
              </div>
              
              <div className="border rounded-md mt-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="py-3 px-4 text-right font-medium">شرح</th>
                      <th className="py-3 px-4 text-center font-medium">تعداد</th>
                      <th className="py-3 px-4 text-left font-medium">قیمت واحد (تومان)</th>
                      <th className="py-3 px-4 text-left font-medium">قیمت کل (تومان)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4">{item.name}</td>
                        <td className="py-3 px-4 text-center">{item.quantity}</td>
                        <td className="py-3 px-4 text-left">{formatNumber(item.price)}</td>
                        <td className="py-3 px-4 text-left">{formatNumber(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50">
                      <td colSpan={3} className="py-3 px-4 text-left font-medium">جمع کل:</td>
                      <td className="py-3 px-4 text-left font-bold">{formatNumber(selectedInvoice.amount)} تومان</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  دانلود فاکتور
                </Button>
                
                {selectedInvoice.status !== 'paid' && (
                  <Button className="bg-blue-600 gap-2" onClick={() => handlePayInvoice(selectedInvoice)}>
                    <CreditCard className="h-4 w-4" />
                    پرداخت فاکتور
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default WalletPage;
