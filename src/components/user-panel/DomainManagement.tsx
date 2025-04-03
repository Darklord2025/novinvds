
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Server, Shield, Refresh, X, ArrowLeft, CornerDownLeft } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface DomainManagementProps {
  domainId: string;
  onClose: () => void;
}

const DomainManagement: React.FC<DomainManagementProps> = ({ domainId, onClose }) => {
  const [activeTab, setActiveTab] = useState('info');
  
  // Sample domain data
  const domain = {
    id: domainId,
    name: domainId === 'dom-123' ? 'example.com' : domainId === 'dom-124' ? 'example.org' : 'example.ir',
    registrar: 'نوین وی دی اس',
    status: domainId === 'dom-125' ? 'pending-transfer' : 'active',
    registrationDate: '2022-01-15',
    expiryDate: domainId === 'dom-123' ? '2025-01-15' : domainId === 'dom-124' ? '2024-11-20' : '2025-03-10',
    autoRenew: true,
    idProtection: true,
    nameservers: [
      { id: 1, server: 'ns1.example.com', ip: '192.168.1.1' },
      { id: 2, server: 'ns2.example.com', ip: '192.168.1.2' }
    ],
    dnsRecords: [
      { id: 1, type: 'A', name: '@', value: '192.168.1.10', ttl: 3600 },
      { id: 2, type: 'CNAME', name: 'www', value: '@', ttl: 3600 },
      { id: 3, type: 'MX', name: '@', value: 'mail.example.com', priority: 10, ttl: 3600 },
      { id: 4, type: 'TXT', name: '@', value: 'v=spf1 a mx include:example.com ~all', ttl: 3600 }
    ],
    contactInfo: {
      registrant: {
        name: 'علی محمدی',
        email: 'ali@example.com',
        phone: '+989123456789',
        address: 'تهران، خیابان ولیعصر',
        country: 'ایران'
      },
      admin: {
        name: 'علی محمدی',
        email: 'ali@example.com',
        phone: '+989123456789',
        address: 'تهران، خیابان ولیعصر',
        country: 'ایران'
      },
      technical: {
        name: 'رضا رضایی',
        email: 'reza@example.com',
        phone: '+989123456780',
        address: 'تهران، خیابان ولیعصر',
        country: 'ایران'
      }
    }
  };

  const [nameservers, setNameservers] = useState(domain.nameservers);
  const [dnsRecords, setDnsRecords] = useState(domain.dnsRecords);
  const [newNameserver, setNewNameserver] = useState({ server: '', ip: '' });
  const [newDnsRecord, setNewDnsRecord] = useState({ type: 'A', name: '', value: '', ttl: 3600, priority: 10 });
  const [contactInfo, setContactInfo] = useState(domain.contactInfo);
  
  const handleAddNameserver = () => {
    if (newNameserver.server && newNameserver.ip) {
      setNameservers([...nameservers, { id: nameservers.length + 1, ...newNameserver }]);
      setNewNameserver({ server: '', ip: '' });
      toast({
        title: "نیم سرور اضافه شد",
        description: `نیم سرور ${newNameserver.server} با موفقیت اضافه شد`,
      });
    }
  };
  
  const handleDeleteNameserver = (id: number) => {
    setNameservers(nameservers.filter(ns => ns.id !== id));
    toast({
      title: "نیم سرور حذف شد",
      description: "نیم سرور با موفقیت حذف شد",
    });
  };
  
  const handleAddDnsRecord = () => {
    if (newDnsRecord.name && newDnsRecord.value) {
      setDnsRecords([...dnsRecords, { id: dnsRecords.length + 1, ...newDnsRecord }]);
      setNewDnsRecord({ type: 'A', name: '', value: '', ttl: 3600, priority: 10 });
      toast({
        title: "رکورد DNS اضافه شد",
        description: `رکورد ${newDnsRecord.type} با نام ${newDnsRecord.name} با موفقیت اضافه شد`,
      });
    }
  };
  
  const handleDeleteDnsRecord = (id: number) => {
    setDnsRecords(dnsRecords.filter(record => record.id !== id));
    toast({
      title: "رکورد DNS حذف شد",
      description: "رکورد DNS با موفقیت حذف شد",
    });
  };
  
  const handleContactInfoChange = (contactType: string, field: string, value: string) => {
    setContactInfo({
      ...contactInfo,
      [contactType]: {
        ...contactInfo[contactType as keyof typeof contactInfo],
        [field]: value
      }
    });
  };
  
  const handleSaveContactInfo = () => {
    toast({
      title: "اطلاعات تماس ذخیره شد",
      description: "اطلاعات تماس دامنه با موفقیت بروزرسانی شد",
    });
  };
  
  const handleTransferLock = (locked: boolean) => {
    toast({
      title: locked ? "قفل انتقال فعال شد" : "قفل انتقال غیرفعال شد",
      description: locked 
        ? "قفل انتقال دامنه فعال شد. دامنه قابل انتقال به ثبت‌کننده دیگر نیست." 
        : "قفل انتقال دامنه غیرفعال شد. دامنه می‌تواند به ثبت‌کننده دیگر منتقل شود.",
    });
  };
  
  const handleAutoRenew = (autoRenew: boolean) => {
    toast({
      title: autoRenew ? "تمدید خودکار فعال شد" : "تمدید خودکار غیرفعال شد",
      description: autoRenew 
        ? "دامنه به صورت خودکار قبل از تاریخ انقضا تمدید خواهد شد" 
        : "تمدید خودکار دامنه غیرفعال شد. لطفاً دامنه را قبل از تاریخ انقضا به صورت دستی تمدید کنید.",
    });
  };
  
  const handleIdProtection = (protected_: boolean) => {
    toast({
      title: protected_ ? "حفاظت اطلاعات فعال شد" : "حفاظت اطلاعات غیرفعال شد",
      description: protected_ 
        ? "اطلاعات تماس شما در WHOIS نمایش داده نمی‌شود" 
        : "اطلاعات تماس شما در WHOIS قابل مشاهده است",
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">فعال</Badge>;
      case 'pending-transfer':
        return <Badge className="bg-blue-100 text-blue-800">در حال انتقال</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800">منقضی شده</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{domain.name}</h1>
          {getStatusBadge(domain.status)}
        </div>
        <Button variant="outline" onClick={onClose}>
          بازگشت به لیست دامنه‌ها
        </Button>
      </div>
      
      <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="info">اطلاعات دامنه</TabsTrigger>
          <TabsTrigger value="nameservers">نیم سرورها</TabsTrigger>
          <TabsTrigger value="dns">رکوردهای DNS</TabsTrigger>
          <TabsTrigger value="contacts">اطلاعات تماس</TabsTrigger>
          <TabsTrigger value="security">امنیت و حفاظت</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                اطلاعات پایه دامنه
              </CardTitle>
              <CardDescription>
                اطلاعات اصلی و وضعیت دامنه {domain.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-500">نام دامنه</Label>
                    <div className="font-medium">{domain.name}</div>
                  </div>
                  <div>
                    <Label className="text-gray-500">ثبت کننده</Label>
                    <div className="font-medium">{domain.registrar}</div>
                  </div>
                  <div>
                    <Label className="text-gray-500">وضعیت</Label>
                    <div className="font-medium">{getStatusBadge(domain.status)}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-500">تاریخ ثبت</Label>
                    <div className="font-medium">{domain.registrationDate}</div>
                  </div>
                  <div>
                    <Label className="text-gray-500">تاریخ انقضا</Label>
                    <div className="font-medium">{domain.expiryDate}</div>
                  </div>
                  <div>
                    <Label className="text-gray-500">تمدید خودکار</Label>
                    <div className="font-medium">{domain.autoRenew ? 'فعال' : 'غیرفعال'}</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <Button>تمدید دامنه</Button>
                <Button variant="outline">دریافت کد EPP</Button>
                <Button variant="outline" className="text-red-600 hover:text-red-700">
                  انتقال به ثبت کننده دیگر
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="nameservers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                مدیریت نیم سرورها
              </CardTitle>
              <CardDescription>
                تنظیم نیم سرورهای دامنه {domain.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md">
                  <div className="grid grid-cols-3 bg-gray-50 p-3 rounded-t-md font-medium">
                    <div>نیم سرور</div>
                    <div>آدرس IP</div>
                    <div className="text-left">عملیات</div>
                  </div>
                  <div className="divide-y">
                    {nameservers.map((ns) => (
                      <div key={ns.id} className="grid grid-cols-3 p-3 items-center">
                        <div>{ns.server}</div>
                        <div>{ns.ip}</div>
                        <div className="text-left">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteNameserver(ns.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">افزودن نیم سرور جدید</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="serverName">نام نیم سرور</Label>
                      <Input 
                        id="serverName" 
                        placeholder="ns1.example.com" 
                        value={newNameserver.server}
                        onChange={(e) => setNewNameserver({...newNameserver, server: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="serverIp">آدرس IP</Label>
                      <Input 
                        id="serverIp" 
                        placeholder="192.168.1.1" 
                        value={newNameserver.ip}
                        onChange={(e) => setNewNameserver({...newNameserver, ip: e.target.value})}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={handleAddNameserver}>
                        افزودن نیم سرور
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">استفاده از نیم سرورهای پیش فرض</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline">
                      استفاده از نیم سرورهای نوین وی دی اس
                    </Button>
                    <Button variant="outline">
                      استفاده از نیم سرورهای Cloudflare
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dns" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CornerDownLeft className="h-5 w-5" />
                مدیریت رکوردهای DNS
              </CardTitle>
              <CardDescription>
                تنظیم رکوردهای DNS برای دامنه {domain.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md">
                  <div className="grid grid-cols-5 bg-gray-50 p-3 rounded-t-md font-medium">
                    <div>نوع</div>
                    <div>نام</div>
                    <div>مقدار</div>
                    <div>TTL</div>
                    <div className="text-left">عملیات</div>
                  </div>
                  <div className="divide-y">
                    {dnsRecords.map((record) => (
                      <div key={record.id} className="grid grid-cols-5 p-3 items-center">
                        <div>{record.type}</div>
                        <div>{record.name}</div>
                        <div className="truncate">{record.value}</div>
                        <div>{record.ttl}</div>
                        <div className="text-left">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteDnsRecord(record.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">افزودن رکورد DNS جدید</h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <Label htmlFor="recordType">نوع</Label>
                      <Select 
                        value={newDnsRecord.type} 
                        onValueChange={(value) => setNewDnsRecord({...newDnsRecord, type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب نوع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="AAAA">AAAA</SelectItem>
                          <SelectItem value="CNAME">CNAME</SelectItem>
                          <SelectItem value="MX">MX</SelectItem>
                          <SelectItem value="TXT">TXT</SelectItem>
                          <SelectItem value="NS">NS</SelectItem>
                          <SelectItem value="SRV">SRV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="recordName">نام</Label>
                      <Input 
                        id="recordName" 
                        placeholder="@, www" 
                        value={newDnsRecord.name}
                        onChange={(e) => setNewDnsRecord({...newDnsRecord, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="recordValue">مقدار</Label>
                      <Input 
                        id="recordValue" 
                        placeholder="192.168.1.1" 
                        value={newDnsRecord.value}
                        onChange={(e) => setNewDnsRecord({...newDnsRecord, value: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="recordTTL">TTL</Label>
                      <Select 
                        value={newDnsRecord.ttl.toString()} 
                        onValueChange={(value) => setNewDnsRecord({...newDnsRecord, ttl: parseInt(value)})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب TTL" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="300">5 دقیقه (300)</SelectItem>
                          <SelectItem value="3600">1 ساعت (3600)</SelectItem>
                          <SelectItem value="7200">2 ساعت (7200)</SelectItem>
                          <SelectItem value="86400">1 روز (86400)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button onClick={handleAddDnsRecord}>
                        افزودن رکورد
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contacts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات تماس</CardTitle>
              <CardDescription>
                مدیریت اطلاعات تماس دامنه {domain.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="registrant">
                <TabsList className="mb-4">
                  <TabsTrigger value="registrant">مالک دامنه</TabsTrigger>
                  <TabsTrigger value="admin">مدیر دامنه</TabsTrigger>
                  <TabsTrigger value="technical">مسئول فنی</TabsTrigger>
                </TabsList>
                
                {['registrant', 'admin', 'technical'].map((contactType) => (
                  <TabsContent key={contactType} value={contactType}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`${contactType}Name`}>نام و نام خانوادگی</Label>
                        <Input 
                          id={`${contactType}Name`} 
                          value={contactInfo[contactType as keyof typeof contactInfo].name} 
                          onChange={(e) => handleContactInfoChange(contactType, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`${contactType}Email`}>ایمیل</Label>
                        <Input 
                          id={`${contactType}Email`} 
                          value={contactInfo[contactType as keyof typeof contactInfo].email} 
                          onChange={(e) => handleContactInfoChange(contactType, 'email', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`${contactType}Phone`}>شماره تماس</Label>
                        <Input 
                          id={`${contactType}Phone`} 
                          value={contactInfo[contactType as keyof typeof contactInfo].phone} 
                          onChange={(e) => handleContactInfoChange(contactType, 'phone', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`${contactType}Address`}>آدرس</Label>
                        <Input 
                          id={`${contactType}Address`} 
                          value={contactInfo[contactType as keyof typeof contactInfo].address} 
                          onChange={(e) => handleContactInfoChange(contactType, 'address', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`${contactType}Country`}>کشور</Label>
                        <Input 
                          id={`${contactType}Country`} 
                          value={contactInfo[contactType as keyof typeof contactInfo].country} 
                          onChange={(e) => handleContactInfoChange(contactType, 'country', e.target.value)}
                        />
                      </div>
                    </div>
                  </TabsContent>
                ))}
                
                <div className="mt-6">
                  <Button onClick={handleSaveContactInfo}>ذخیره اطلاعات تماس</Button>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                امنیت و حفاظت
              </CardTitle>
              <CardDescription>
                تنظیمات امنیتی دامنه {domain.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">قفل انتقال</h3>
                    <p className="text-sm text-gray-500">محافظت از دامنه در برابر انتقال غیرمجاز به ثبت کننده دیگر</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleTransferLock(true)}>فعال کردن</Button>
                    <Button size="sm" variant="outline" onClick={() => handleTransferLock(false)}>غیرفعال کردن</Button>
                  </div>
                </div>
              </div>
              
              <div className="border p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">تمدید خودکار</h3>
                    <p className="text-sm text-gray-500">تمدید خودکار دامنه قبل از تاریخ انقضا</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleAutoRenew(true)}>فعال کردن</Button>
                    <Button size="sm" variant="outline" onClick={() => handleAutoRenew(false)}>غیرفعال کردن</Button>
                  </div>
                </div>
              </div>
              
              <div className="border p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">حفاظت از اطلاعات شخصی</h3>
                    <p className="text-sm text-gray-500">پنهان کردن اطلاعات تماس شما در WHOIS</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleIdProtection(true)}>فعال کردن</Button>
                    <Button size="sm" variant="outline" onClick={() => handleIdProtection(false)}>غیرفعال کردن</Button>
                  </div>
                </div>
              </div>
              
              <div className="border p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">DNSSEC</h3>
                    <p className="text-sm text-gray-500">امنیت بیشتر برای سیستم نام دامنه</p>
                  </div>
                  <div>
                    <Button size="sm">مدیریت DNSSEC</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DomainManagement;
