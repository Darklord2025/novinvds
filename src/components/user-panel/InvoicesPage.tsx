
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Download, Eye, CreditCard, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InvoicesPage = () => {
  const [activeTab, setActiveTab] = useState('unpaid');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const { toast } = useToast();
  
  // Mock invoice data
  const invoices = [
    {
      id: 'INV-1234',
      date: '1402/04/15',
      dueDate: '1402/04/25',
      amount: 2450000,
      status: 'unpaid',
      service: 'سرور مجازی لینوکس - پلن حرفه‌ای',
      vat: 245000 // 10% VAT
    },
    {
      id: 'INV-1235',
      date: '1402/04/10',
      dueDate: '1402/04/20',
      amount: 1800000,
      status: 'unpaid',
      service: 'هاست لینوکس - پلن تجاری',
      vat: 180000 // 10% VAT
    },
    {
      id: 'INV-1220',
      date: '1402/03/25',
      dueDate: '1402/04/05',
      amount: 3650000,
      status: 'paid',
      service: 'سرور اختصاصی - پلن پایه',
      vat: 365000 // 10% VAT
    },
    {
      id: 'INV-1219',
      date: '1402/03/20',
      dueDate: '1402/03/30',
      amount: 850000,
      status: 'paid',
      service: 'تمدید ثبت دامنه .com',
      vat: 85000 // 10% VAT
    },
    {
      id: 'INV-1218',
      date: '1402/03/15',
      dueDate: '1402/03/25',
      amount: 1150000,
      status: 'paid',
      service: 'گواهی SSL - یکساله',
      vat: 115000 // 10% VAT
    },
    {
      id: 'INV-1210',
      date: '1402/03/01',
      dueDate: '1402/03/10',
      amount: 750000,
      status: 'cancelled',
      service: 'سرور مجازی ویندوز - پلن استاندارد',
      vat: 75000 // 10% VAT
    }
  ];
  
  const filterInvoices = (status) => {
    return invoices.filter(invoice => invoice.status === status);
  };
  
  const formatNumber = (number) => {
    return new Intl.NumberFormat('fa-IR').format(number);
  };
  
  const handleApplyDiscount = () => {
    if (!discountCode.trim()) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً کد تخفیف را وارد کنید.",
      });
      return;
    }
    
    if (discountCode.toLowerCase() === 'novinvds10') {
      setDiscountApplied(true);
      toast({
        title: "تخفیف اعمال شد",
        description: "کد تخفیف 10% با موفقیت اعمال شد.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "کد تخفیف نامعتبر است.",
      });
    }
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return (
          <div className="flex items-center space-x-1 space-x-reverse">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span className="text-green-600">پرداخت شده</span>
          </div>
        );
      case 'unpaid':
        return (
          <div className="flex items-center space-x-1 space-x-reverse">
            <Clock className="h-4 w-4 text-amber-500" />
            <span className="text-amber-600">در انتظار پرداخت</span>
          </div>
        );
      case 'cancelled':
        return (
          <div className="flex items-center space-x-1 space-x-reverse">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span className="text-red-600">لغو شده</span>
          </div>
        );
      default:
        return status;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">فاکتورها</h1>
        <Button variant="outline">بروزرسانی</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>فاکتورهای پرداخت نشده</CardTitle>
          <CardDescription>
            فاکتورهای پرداخت نشده خود را مشاهده و پرداخت کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filterInvoices('unpaid').length > 0 ? (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>شماره فاکتور</TableHead>
                    <TableHead>تاریخ صدور</TableHead>
                    <TableHead>سررسید</TableHead>
                    <TableHead>شرح خدمات</TableHead>
                    <TableHead>مبلغ (تومان)</TableHead>
                    <TableHead>مالیات (10%)</TableHead>
                    <TableHead>قابل پرداخت</TableHead>
                    <TableHead>عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterInvoices('unpaid').map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>{invoice.service}</TableCell>
                      <TableCell>{formatNumber(invoice.amount)} تومان</TableCell>
                      <TableCell>{formatNumber(invoice.vat)} تومان</TableCell>
                      <TableCell className="font-bold">
                        {formatNumber(invoice.amount + invoice.vat)} تومان
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2 space-x-reverse">
                          <Button size="sm" className="bg-blue-600">
                            <CreditCard className="h-4 w-4 ml-1" />
                            پرداخت
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 ml-1" />
                            مشاهده
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-end gap-4">
                  <div className="flex-1">
                    <Label htmlFor="discount">کد تخفیف</Label>
                    <div className="flex space-x-2 space-x-reverse mt-1">
                      <Input 
                        id="discount" 
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="کد تخفیف خود را وارد کنید" 
                        disabled={discountApplied}
                      />
                      <Button 
                        onClick={handleApplyDiscount}
                        disabled={discountApplied}
                      >
                        اعمال تخفیف
                      </Button>
                    </div>
                    {discountApplied && (
                      <p className="text-green-600 text-sm mt-1">کد تخفیف 10% با موفقیت اعمال شد.</p>
                    )}
                  </div>
                  
                  <div className="md:w-64 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>جمع کل:</span>
                      <span>{formatNumber(4250000)} تومان</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>مالیات بر ارزش افزوده (10%):</span>
                      <span>{formatNumber(425000)} تومان</span>
                    </div>
                    {discountApplied && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>تخفیف (10%):</span>
                        <span>- {formatNumber(425000)} تومان</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold border-t pt-2 mt-2">
                      <span>مبلغ قابل پرداخت:</span>
                      <span>
                        {formatNumber(
                          discountApplied 
                            ? 4250000 + 425000 - 425000 
                            : 4250000 + 425000
                        )} تومان
                      </span>
                    </div>
                    <Button className="w-full bg-blue-600 mt-2">
                      <CreditCard className="h-4 w-4 ml-2" />
                      پرداخت همه فاکتورها
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">فاکتور پرداخت نشده‌ای ندارید</h3>
              <p className="text-gray-500">در حال حاضر هیچ فاکتور پرداخت نشده‌ای برای شما صادر نشده است.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>تاریخچه فاکتورها</CardTitle>
          <CardDescription>
            تاریخچه کامل فاکتورهای خود را مشاهده کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="all">همه</TabsTrigger>
              <TabsTrigger value="paid">پرداخت شده</TabsTrigger>
              <TabsTrigger value="unpaid">پرداخت نشده</TabsTrigger>
              <TabsTrigger value="cancelled">لغو شده</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>شماره فاکتور</TableHead>
                    <TableHead>تاریخ صدور</TableHead>
                    <TableHead>شرح خدمات</TableHead>
                    <TableHead>مبلغ (تومان)</TableHead>
                    <TableHead>وضعیت</TableHead>
                    <TableHead>عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.service}</TableCell>
                      <TableCell>{formatNumber(invoice.amount + invoice.vat)} تومان</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2 space-x-reverse">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 ml-1" />
                            مشاهده
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 ml-1" />
                            دانلود
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="paid">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>شماره فاکتور</TableHead>
                    <TableHead>تاریخ صدور</TableHead>
                    <TableHead>شرح خدمات</TableHead>
                    <TableHead>مبلغ (تومان)</TableHead>
                    <TableHead>وضعیت</TableHead>
                    <TableHead>عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterInvoices('paid').map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.service}</TableCell>
                      <TableCell>{formatNumber(invoice.amount + invoice.vat)} تومان</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2 space-x-reverse">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 ml-1" />
                            مشاهده
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 ml-1" />
                            دانلود
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="unpaid">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>شماره فاکتور</TableHead>
                    <TableHead>تاریخ صدور</TableHead>
                    <TableHead>شرح خدمات</TableHead>
                    <TableHead>مبلغ (تومان)</TableHead>
                    <TableHead>وضعیت</TableHead>
                    <TableHead>عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterInvoices('unpaid').map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.service}</TableCell>
                      <TableCell>{formatNumber(invoice.amount + invoice.vat)} تومان</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2 space-x-reverse">
                          <Button size="sm" className="bg-blue-600">
                            <CreditCard className="h-4 w-4 ml-1" />
                            پرداخت
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 ml-1" />
                            مشاهده
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="cancelled">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>شماره فاکتور</TableHead>
                    <TableHead>تاریخ صدور</TableHead>
                    <TableHead>شرح خدمات</TableHead>
                    <TableHead>مبلغ (تومان)</TableHead>
                    <TableHead>وضعیت</TableHead>
                    <TableHead>عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterInvoices('cancelled').map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.service}</TableCell>
                      <TableCell>{formatNumber(invoice.amount + invoice.vat)} تومان</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2 space-x-reverse">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 ml-1" />
                            مشاهده
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicesPage;
