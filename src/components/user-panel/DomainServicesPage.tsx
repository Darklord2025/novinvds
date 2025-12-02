import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockWHMCSDomains, WHMCSDomain } from '@/data/whmcsServices';
import { Search, Globe, Settings, RefreshCw, Shield, Mail, Eye, Edit, Calendar, Server } from 'lucide-react';
import { toPersianDigits, formatDate } from '@/lib/numberUtils';

interface DomainServicesPageProps {
  onManageDomain: (domainId: string, serviceType?: string) => void;
  onRenewDomain: (domainId: string, serviceType?: string) => void;
}

const DomainServicesPage: React.FC<DomainServicesPageProps> = ({
  onManageDomain,
  onRenewDomain
}) => {
  const [domains] = useState<WHMCSDomain[]>(mockWHMCSDomains);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredDomains = domains.filter(domain => {
    const matchesSearch = domain.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || domain.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Pending Transfer': return 'bg-blue-100 text-blue-800';
      case 'Redemption': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDatePersian = (dateString: string) => {
    return formatDate(dateString, 'fa');
  };

  const formatCurrency = (amount: number) => {
    return toPersianDigits(amount.toLocaleString('fa-IR')) + ' ریال';
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Active': return 'فعال';
      case 'Expired': return 'منقضی شده';
      case 'Cancelled': return 'لغو شده';
      case 'Pending': return 'در انتظار';
      case 'Pending Transfer': return 'در انتظار انتقال';
      case 'Redemption': return 'بازیابی';
      default: return status;
    }
  };

  const activeDomains = filteredDomains.filter(d => d.status === 'Active').length;
  const expiredDomains = filteredDomains.filter(d => d.status === 'Expired').length;
  const totalDomains = filteredDomains.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">مدیریت دامنه‌ها</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="جستجو در دامنه‌ها..."
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
              <SelectItem value="Active">فعال</SelectItem>
              <SelectItem value="Expired">منقضی شده</SelectItem>
              <SelectItem value="Cancelled">لغو شده</SelectItem>
              <SelectItem value="Pending">در انتظار</SelectItem>
              <SelectItem value="Pending Transfer">در انتظار انتقال</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل دامنه‌ها</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{toPersianDigits(totalDomains)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">دامنه‌های فعال</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{toPersianDigits(activeDomains)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">دامنه‌های منقضی</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{toPersianDigits(expiredDomains)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>فهرست دامنه‌ها</span>
            <Badge variant="outline">{toPersianDigits(filteredDomains.length)} دامنه</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">لیست</TabsTrigger>
              <TabsTrigger value="grid">شبکه‌ای</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>دامنه</TableHead>
                    <TableHead>ثبت‌کننده</TableHead>
                    <TableHead>تاریخ ثبت</TableHead>
                    <TableHead>تاریخ انقضا</TableHead>
                    <TableHead>وضعیت</TableHead>
                    <TableHead>خدمات</TableHead>
                    <TableHead>عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDomains.map((domain) => (
                    <TableRow key={domain.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <span>{domain.domain}</span>
                        </div>
                      </TableCell>
                      <TableCell>{domain.registrar}</TableCell>
                      <TableCell>{formatDatePersian(domain.registrationDate)}</TableCell>
                      <TableCell>{formatDatePersian(domain.expiryDate)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(domain.status)}>
                          {getStatusLabel(domain.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {domain.dnsManagement && (
                            <Badge variant="outline" className="text-xs">
                              <Server className="h-3 w-3 ml-1" />
                              DNS
                            </Badge>
                          )}
                          {domain.emailForwarding && (
                            <Badge variant="outline" className="text-xs">
                              <Mail className="h-3 w-3 ml-1" />
                              ایمیل
                            </Badge>
                          )}
                          {domain.idProtection && (
                            <Badge variant="outline" className="text-xs">
                              <Shield className="h-3 w-3 ml-1" />
                              حریم
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onManageDomain(domain.id, 'domain')}
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onRenewDomain(domain.id)}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDomains.map((domain) => (
                  <Card key={domain.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">{domain.domain}</CardTitle>
                        </div>
                        <Badge className={getStatusColor(domain.status)}>
                          {getStatusLabel(domain.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm text-muted-foreground">
                        <div>ثبت‌کننده: {domain.registrar}</div>
                        <div>انقضا: {formatDatePersian(domain.expiryDate)}</div>
                        {domain.autoRenew && (
                          <div className="text-green-600">تمدید خودکار فعال</div>
                        )}
                      </div>
                      
                      <div className="flex gap-1">
                        {domain.dnsManagement && (
                          <Badge variant="outline" className="text-xs">DNS</Badge>
                        )}
                        {domain.emailForwarding && (
                          <Badge variant="outline" className="text-xs">ایمیل</Badge>
                        )}
                        {domain.idProtection && (
                          <Badge variant="outline" className="text-xs">حریم</Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => onManageDomain(domain.id, 'domain')}
                        >
                          <Settings className="h-4 w-4 ml-1" />
                          مدیریت
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => onRenewDomain(domain.id)}
                        >
                          <RefreshCw className="h-4 w-4 ml-1" />
                          تمدید
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomainServicesPage;
