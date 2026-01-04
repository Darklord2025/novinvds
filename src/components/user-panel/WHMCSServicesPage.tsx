
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { mockWHMCSServices, WHMCSService } from '@/data/whmcsServices';
import { Search, Filter, MoreHorizontal, Play, Pause, RotateCcw, Settings, CreditCard, ArrowRight } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface WHMCSServicesPageProps {
  onManageService: (serviceId: string) => void;
  onRenewService: (serviceId: string) => void;
  onSuspendService: (serviceId: string) => void;
  onUnsuspendService: (serviceId: string) => void;
  onTerminateService: (serviceId: string) => void;
  onViewInvoice: (invoiceId: string) => void;
  onBack?: () => void;
}

const WHMCSServicesPage: React.FC<WHMCSServicesPageProps> = ({
  onManageService,
  onRenewService,
  onSuspendService,
  onUnsuspendService,
  onTerminateService,
  onViewInvoice,
  onBack
}) => {
  const [services] = useState<WHMCSService[]>(mockWHMCSServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [groupFilter, setGroupFilter] = useState('all');

  const filteredServices = services.filter(service => {
    const matchesSearch = service.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    const matchesGroup = groupFilter === 'all' || service.groupName === groupFilter;
    
    return matchesSearch && matchesStatus && matchesGroup;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Suspended': return 'bg-yellow-100 text-yellow-800';
      case 'Terminated': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-blue-100 text-blue-800';
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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fa-IR').format(num);
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.round((used / limit) * 100);
  };

  const uniqueGroups = [...new Set(services.map(s => s.groupName))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              بازگشت
            </Button>
          )}
          <h1 className="text-2xl font-bold">خدمات من</h1>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="جستجو در خدمات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="وضعیت" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه</SelectItem>
              <SelectItem value="Active">فعال</SelectItem>
              <SelectItem value="Suspended">معلق</SelectItem>
              <SelectItem value="Terminated">خاتمه یافته</SelectItem>
              <SelectItem value="Pending">در انتظار</SelectItem>
            </SelectContent>
          </Select>
          <Select value={groupFilter} onValueChange={setGroupFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="گروه خدمات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه گروه‌ها</SelectItem>
              {uniqueGroups.map(group => (
                <SelectItem key={group} value={group}>{group}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">نمایش فهرست</TabsTrigger>
          <TabsTrigger value="cards">نمایش کارت</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>فهرست خدمات</span>
                <Badge variant="outline">{filteredServices.length} خدمت</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>نام محصول/خدمت</TableHead>
                    <TableHead>دامنه</TableHead>
                    <TableHead>وضعیت</TableHead>
                    <TableHead>تاریخ سررسید</TableHead>
                    <TableHead>مبلغ</TableHead>
                    <TableHead>چرخه پرداخت</TableHead>
                    <TableHead>عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-semibold">{service.productName}</div>
                          <div className="text-sm text-gray-500">{service.groupName}</div>
                        </div>
                      </TableCell>
                      <TableCell>{service.domain}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(service.status)}>
                          {service.status === 'Active' ? 'فعال' : 
                           service.status === 'Suspended' ? 'معلق' :
                           service.status === 'Terminated' ? 'خاتمه یافته' : 'در انتظار'}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(service.nextDueDate)}</TableCell>
                      <TableCell>{formatCurrency(service.amount, service.currency)}</TableCell>
                      <TableCell>
                        {service.billingCycle === 'Monthly' ? 'ماهانه' :
                         service.billingCycle === 'Annually' ? 'سالانه' :
                         service.billingCycle === 'Quarterly' ? 'فصلی' : service.billingCycle}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                           <DropdownMenuItem onClick={() => onManageService(service.id)}>
                              <Settings className="ml-2 h-4 w-4" />
                              مدیریت
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{service.productName}</CardTitle>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status === 'Active' ? 'فعال' : 
                       service.status === 'Suspended' ? 'معلق' :
                       service.status === 'Terminated' ? 'خاتمه یافته' : 'در انتظار'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{service.domain}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">گروه:</span>
                      <p className="font-medium">{service.groupName}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">مبلغ:</span>
                      <p className="font-medium">{formatCurrency(service.amount, service.currency)}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">چرخه:</span>
                      <p className="font-medium">
                        {service.billingCycle === 'Monthly' ? 'ماهانه' :
                         service.billingCycle === 'Annually' ? 'سالانه' :
                         service.billingCycle === 'Quarterly' ? 'فصلی' : service.billingCycle}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">سررسید:</span>
                      <p className="font-medium">{formatDate(service.nextDueDate)}</p>
                    </div>
                  </div>

                  {service.diskUsage && service.diskLimit && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>استفاده از دیسک</span>
                        <span>{formatNumber(service.diskUsage)}GB / {formatNumber(service.diskLimit)}GB</span>
                      </div>
                      <Progress value={getUsagePercentage(service.diskUsage, service.diskLimit)} />
                    </div>
                  )}

                  {service.bandwidthUsage && service.bandwidthLimit && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>استفاده از پهنای باند</span>
                        <span>{formatNumber(service.bandwidthUsage)}GB / {formatNumber(service.bandwidthLimit)}GB</span>
                      </div>
                      <Progress value={getUsagePercentage(service.bandwidthUsage, service.bandwidthLimit)} />
                    </div>
                  )}

                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button 
                      size="sm" 
                      onClick={() => onManageService(service.id)}
                      className="flex-1"
                    >
                      مدیریت
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WHMCSServicesPage;
