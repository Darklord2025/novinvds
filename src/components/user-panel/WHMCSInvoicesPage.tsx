
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockWHMCSInvoices, WHMCSInvoice } from '@/data/whmcsServices';
import { Search, Download, Eye, CreditCard, FileText, Calendar } from 'lucide-react';

interface WHMCSInvoicesPageProps {
  onViewInvoice: (invoiceId: string) => void;
  onPayInvoice: (invoiceId: string) => void;
  onDownloadInvoice: (invoiceId: string) => void;
}

const WHMCSInvoicesPage: React.FC<WHMCSInvoicesPageProps> = ({
  onViewInvoice,
  onPayInvoice,
  onDownloadInvoice
}) => {
  const [invoices] = useState<WHMCSInvoice[]>(mockWHMCSInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const invoiceDate = new Date(invoice.date);
      const now = new Date();
      
      switch (dateFilter) {
        case 'last30days':
          matchesDate = (now.getTime() - invoiceDate.getTime()) <= (30 * 24 * 60 * 60 * 1000);
          break;
        case 'last90days':
          matchesDate = (now.getTime() - invoiceDate.getTime()) <= (90 * 24 * 60 * 60 * 1000);
          break;
        case 'thisyear':
          matchesDate = invoiceDate.getFullYear() === now.getFullYear();
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Unpaid': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      case 'Refunded': return 'bg-blue-100 text-blue-800';
      case 'Collections': return 'bg-yellow-100 text-yellow-800';
      case 'Payment Pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    const formatter = new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: currency === 'IRR' ? 'IRR' : 'USD',
      minimumFractionDigits: 0
    });
    return formatter.format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fa-IR').format(new Date(dateString));
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Paid': return 'پرداخت شده';
      case 'Unpaid': return 'پرداخت نشده';
      case 'Cancelled': return 'لغو شده';
      case 'Refunded': return 'بازپرداخت شده';
      case 'Collections': return 'وصول';
      case 'Payment Pending': return 'در انتظار پرداخت';
      default: return status;
    }
  };

  const totalUnpaid = filteredInvoices
    .filter(inv => inv.status === 'Unpaid')
    .reduce((sum, inv) => sum + inv.balance, 0);

  const totalPaid = filteredInvoices
    .filter(inv => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">فاکتورهای من</h1>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="جستجو در فاکتورها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="وضعیت" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه وضعیت‌ها</SelectItem>
              <SelectItem value="Unpaid">پرداخت نشده</SelectItem>
              <SelectItem value="Paid">پرداخت شده</SelectItem>
              <SelectItem value="Cancelled">لغو شده</SelectItem>
              <SelectItem value="Refunded">بازپرداخت شده</SelectItem>
              <SelectItem value="Collections">وصول</SelectItem>
              <SelectItem value="Payment Pending">در انتظار پرداخت</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="تاریخ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه</SelectItem>
              <SelectItem value="last30days">30 روز اخیر</SelectItem>
              <SelectItem value="last90days">90 روز اخیر</SelectItem>
              <SelectItem value="thisyear">امسال</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل فاکتورها</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredInvoices.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">فاکتورهای پرداخت نشده</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(totalUnpaid, 'IRR')}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل پرداخت‌ها</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalPaid, 'IRR')}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>فهرست فاکتورها</span>
            <Badge variant="outline">{filteredInvoices.length} فاکتور</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>شماره فاکتور</TableHead>
                <TableHead>تاریخ صدور</TableHead>
                <TableHead>تاریخ سررسید</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead>مبلغ کل</TableHead>
                <TableHead>مانده</TableHead>
                <TableHead>عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    #{invoice.invoiceNumber}
                  </TableCell>
                  <TableCell>{formatDate(invoice.date)}</TableCell>
                  <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(invoice.status)}>
                      {getStatusLabel(invoice.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(invoice.total, invoice.currency)}</TableCell>
                  <TableCell>
                    <span className={invoice.balance > 0 ? 'text-red-600 font-semibold' : 'text-green-600'}>
                      {formatCurrency(invoice.balance, invoice.currency)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onViewInvoice(invoice.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onDownloadInvoice(invoice.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      {invoice.status === 'Unpaid' && (
                        <Button 
                          size="sm"
                          onClick={() => onPayInvoice(invoice.id)}
                        >
                          <CreditCard className="h-4 w-4 ml-1" />
                          پرداخت
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WHMCSInvoicesPage;
