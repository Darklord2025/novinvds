
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Calendar, ArrowDownLeft, ArrowUpRight, Check, X, RefreshCw, AlertCircle, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TransactionsPage = () => {
  const [dateFilter, setDateFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Mock transactions data
  const transactions = [
    {
      id: 'TRX-3625',
      date: '1402/04/15',
      description: 'پرداخت فاکتور INV-1234 (سرور مجازی لینوکس)',
      amount: 2695000,
      type: 'payment',
      status: 'completed',
      paymentMethod: 'درگاه بانک ملت'
    },
    {
      id: 'TRX-3624',
      date: '1402/04/10',
      description: 'افزایش اعتبار کیف پول',
      amount: 5000000,
      type: 'deposit',
      status: 'completed',
      paymentMethod: 'درگاه بانک سامان'
    },
    {
      id: 'TRX-3620',
      date: '1402/04/01',
      description: 'پرداخت فاکتور INV-1218 (گواهی SSL)',
      amount: 1265000,
      type: 'payment',
      status: 'completed',
      paymentMethod: 'کیف پول'
    },
    {
      id: 'TRX-3612',
      date: '1402/03/25',
      description: 'پرداخت فاکتور INV-1219 (تمدید دامنه)',
      amount: 935000,
      type: 'payment',
      status: 'completed',
      paymentMethod: 'کیف پول'
    },
    {
      id: 'TRX-3610',
      date: '1402/03/20',
      description: 'برداشت از کیف پول',
      amount: 1800000,
      type: 'withdrawal',
      status: 'pending',
      paymentMethod: '-'
    },
    {
      id: 'TRX-3605',
      date: '1402/03/15',
      description: 'بازگشت وجه فاکتور INV-1210 (سرور مجازی ویندوز)',
      amount: 825000,
      type: 'refund',
      status: 'completed',
      paymentMethod: 'کیف پول'
    },
    {
      id: 'TRX-3600',
      date: '1402/03/10',
      description: 'افزایش اعتبار کیف پول',
      amount: 10000000,
      type: 'deposit',
      status: 'completed',
      paymentMethod: 'درگاه بانک ملی'
    }
  ];
  
  const formatNumber = (number) => {
    return new Intl.NumberFormat('fa-IR').format(number);
  };
  
  const filterTransactions = () => {
    let filteredData = [...transactions];
    
    // Apply date filter
    if (dateFilter === 'month') {
      // Filter to transactions in the last 30 days
      // In a real app, you would use proper date calculations
      filteredData = filteredData.filter(tx => tx.date >= '1402/03/15');
    } else if (dateFilter === 'week') {
      // Filter to transactions in the last 7 days
      filteredData = filteredData.filter(tx => tx.date >= '1402/04/08');
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      filteredData = filteredData.filter(tx => tx.type === typeFilter);
    }
    
    return filteredData;
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center space-x-1 space-x-reverse">
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-green-600">تکمیل شده</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center space-x-1 space-x-reverse">
            <Clock className="h-4 w-4 text-amber-500" />
            <span className="text-amber-600">در حال انجام</span>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center space-x-1 space-x-reverse">
            <X className="h-4 w-4 text-red-500" />
            <span className="text-red-600">ناموفق</span>
          </div>
        );
      default:
        return status;
    }
  };
  
  const getTransactionTypeInfo = (type, amount) => {
    switch (type) {
      case 'payment':
        return {
          color: 'text-red-600',
          icon: <ArrowUpRight className="h-4 w-4 text-red-500" />,
          prefix: '-'
        };
      case 'deposit':
        return {
          color: 'text-green-600',
          icon: <ArrowDownLeft className="h-4 w-4 text-green-500" />,
          prefix: '+'
        };
      case 'withdrawal':
        return {
          color: 'text-red-600',
          icon: <ArrowUpRight className="h-4 w-4 text-red-500" />,
          prefix: '-'
        };
      case 'refund':
        return {
          color: 'text-green-600',
          icon: <ArrowDownLeft className="h-4 w-4 text-green-500" />,
          prefix: '+'
        };
      default:
        return {
          color: '',
          icon: null,
          prefix: ''
        };
    }
  };
  
  // Calculate totals
  const calculateTotals = () => {
    const depositsTotal = transactions
      .filter(tx => tx.type === 'deposit' || tx.type === 'refund')
      .reduce((sum, tx) => sum + tx.amount, 0);
      
    const paymentsTotal = transactions
      .filter(tx => tx.type === 'payment' || tx.type === 'withdrawal')
      .reduce((sum, tx) => sum + tx.amount, 0);
      
    return {
      depositsTotal,
      paymentsTotal,
      balance: depositsTotal - paymentsTotal
    };
  };
  
  const totals = calculateTotals();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">تراکنش‌ها</h1>
        <Button variant="outline">بروزرسانی</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">کل واریزی‌ها</p>
                <p className="text-2xl font-bold text-green-600">{formatNumber(totals.depositsTotal)} تومان</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <ArrowDownLeft className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">کل پرداختی‌ها</p>
                <p className="text-2xl font-bold text-red-600">{formatNumber(totals.paymentsTotal)} تومان</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <ArrowUpRight className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">موجودی کیف پول</p>
                <p className="text-2xl font-bold">{formatNumber(totals.balance)} تومان</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <RefreshCw className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>تاریخچه تراکنش‌ها</CardTitle>
          <CardDescription>
            تمامی تراکنش‌های انجام شده در حساب کاربری شما
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="انتخاب بازه زمانی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه زمان‌ها</SelectItem>
                  <SelectItem value="month">30 روز گذشته</SelectItem>
                  <SelectItem value="week">7 روز گذشته</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="نوع تراکنش" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه تراکنش‌ها</SelectItem>
                  <SelectItem value="payment">پرداخت</SelectItem>
                  <SelectItem value="deposit">افزایش اعتبار</SelectItem>
                  <SelectItem value="withdrawal">برداشت</SelectItem>
                  <SelectItem value="refund">بازگشت وجه</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>شناسه تراکنش</TableHead>
                <TableHead>تاریخ</TableHead>
                <TableHead>شرح</TableHead>
                <TableHead>روش پرداخت</TableHead>
                <TableHead>مبلغ</TableHead>
                <TableHead>وضعیت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterTransactions().map((tx) => {
                const typeInfo = getTransactionTypeInfo(tx.type);
                return (
                  <TableRow key={tx.id}>
                    <TableCell>{tx.id}</TableCell>
                    <TableCell>{tx.date}</TableCell>
                    <TableCell>{tx.description}</TableCell>
                    <TableCell>{tx.paymentMethod}</TableCell>
                    <TableCell className={typeInfo.color}>
                      <div className="flex items-center">
                        {typeInfo.icon}
                        <span className="mr-1">
                          {typeInfo.prefix}{formatNumber(tx.amount)} تومان
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(tx.status)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {filterTransactions().length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">تراکنشی یافت نشد</h3>
              <p className="text-gray-500">هیچ تراکنشی با فیلترهای انتخاب شده یافت نشد.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
