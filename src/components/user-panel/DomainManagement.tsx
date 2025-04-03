
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Input 
} from "@/components/ui/input";
import { 
  Label 
} from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { 
  ArrowRight, 
  Globe, 
  Save, 
  Server, 
  Shield, 
  X, 
  RefreshCw, 
  Lock, 
  Trash2 
} from "lucide-react";

interface DomainManagementProps {
  domainId: string;
  onClose: () => void;
}

const DomainManagement: React.FC<DomainManagementProps> = ({ domainId, onClose }) => {
  const [activeTab, setActiveTab] = useState('dns');
  const [dnsRecords, setDnsRecords] = useState([
    { id: 1, type: 'A', name: '@', value: '185.173.106.123', ttl: '3600' },
    { id: 2, type: 'CNAME', name: 'www', value: '@', ttl: '3600' },
    { id: 3, type: 'MX', name: '@', value: 'mail.example.com', ttl: '3600', priority: '10' },
    { id: 4, type: 'TXT', name: '@', value: 'v=spf1 include:_spf.google.com ~all', ttl: '3600' }
  ]);
  const [newRecord, setNewRecord] = useState({
    type: 'A',
    name: '',
    value: '',
    ttl: '3600',
    priority: '10'
  });

  // Sample domain data
  const domain = {
    id: domainId,
    name: 'example.com',
    registrar: 'نوین وی دی اس',
    status: 'active',
    registrationDate: '2023-02-15',
    expiryDate: '2025-02-15',
    autoRenew: true,
    nameservers: [
      'ns1.novindns.com',
      'ns2.novindns.com'
    ],
    contacts: {
      registrant: {
        name: 'علی احمدی',
        email: 'ali@example.com',
        phone: '09121234567',
        address: 'تهران، ایران'
      },
      admin: {
        name: 'علی احمدی',
        email: 'ali@example.com',
        phone: '09121234567',
        address: 'تهران، ایران'
      },
      technical: {
        name: 'علی احمدی',
        email: 'ali@example.com',
        phone: '09121234567',
        address: 'تهران، ایران'
      }
    },
    epp: 'ePP-123456',
    whoisPrivacy: true
  };

  // Handle updating a DNS record
  const handleUpdateDnsRecord = (id: number, field: string, value: string) => {
    const updatedRecords = dnsRecords.map(record => {
      if (record.id === id) {
        return { ...record, [field]: value };
      }
      return record;
    });
    setDnsRecords(updatedRecords);
  };

  // Handle deleting a DNS record
  const handleDeleteDnsRecord = (id: number) => {
    const updatedRecords = dnsRecords.filter(record => record.id !== id);
    setDnsRecords(updatedRecords);
    toast({
      title: "رکورد DNS حذف شد",
      description: "رکورد DNS با موفقیت حذف شد."
    });
  };

  // Handle saving DNS records
  const handleSaveDnsRecords = () => {
    toast({
      title: "رکوردهای DNS ذخیره شدند",
      description: "رکوردهای DNS با موفقیت به‌روزرسانی شدند."
    });
  };

  // Handle adding a new DNS record
  const handleAddDnsRecord = () => {
    if (!newRecord.name || !newRecord.value) {
      toast({
        title: "خطا",
        description: "نام و مقدار رکورد DNS الزامی است.",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(...dnsRecords.map(r => r.id), 0) + 1;
    const recordToAdd = { ...newRecord, id: newId };
    setDnsRecords([...dnsRecords, recordToAdd]);
    
    // Reset form
    setNewRecord({
      type: 'A',
      name: '',
      value: '',
      ttl: '3600',
      priority: '10'
    });

    toast({
      title: "رکورد DNS اضافه شد",
      description: "رکورد DNS جدید با موفقیت اضافه شد."
    });
  };

  // Handle changing nameservers
  const handleChangeNameservers = () => {
    toast({
      title: "تغییر نیم‌سرورها",
      description: "درخواست تغییر نیم‌سرورها با موفقیت ثبت شد."
    });
  };

  // Toggle WHOIS Privacy
  const handleToggleWhoisPrivacy = () => {
    toast({
      title: `محافظت از اطلاعات WHOIS ${domain.whoisPrivacy ? 'غیرفعال' : 'فعال'} شد`,
      description: `محافظت از اطلاعات WHOIS با موفقیت ${domain.whoisPrivacy ? 'غیرفعال' : 'فعال'} شد.`
    });
  };

  // Handle domain transfer out
  const handleTransferOut = () => {
    toast({
      title: "درخواست کد انتقال",
      description: "کد انتقال (EPP) دامنه به ایمیل شما ارسال شد."
    });
  };

  // Handle domain renew
  const handleRenewDomain = () => {
    toast({
      title: "تمدید دامنه",
      description: "درخواست تمدید دامنه با موفقیت ثبت شد و به صفحه پرداخت هدایت می‌شوید."
    });
  };

  // Handle toggling auto-renew
  const handleToggleAutoRenew = () => {
    toast({
      title: `تمدید خودکار ${domain.autoRenew ? 'غیرفعال' : 'فعال'} شد`,
      description: `تمدید خودکار دامنه با موفقیت ${domain.autoRenew ? 'غیرفعال' : 'فعال'} شد.`
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="ml-2"
          >
            <ArrowRight size={20} />
          </Button>
          <h1 className="text-2xl font-bold">مدیریت دامنه {domain.name}</h1>
        </div>
        <Button variant="outline" size="sm" onClick={onClose}>
          بستن
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>اطلاعات دامنه</CardTitle>
            <CardDescription>جزئیات و وضعیت دامنه</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-500">نام دامنه</Label>
                <p className="font-medium">{domain.name}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">ثبت‌کننده</Label>
                <p className="font-medium">{domain.registrar}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">تاریخ ثبت</Label>
                <p className="font-medium">{domain.registrationDate}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">تاریخ انقضا</Label>
                <p className="font-medium">{domain.expiryDate}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">وضعیت</Label>
                <p className="font-medium">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    فعال
                  </span>
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">تمدید خودکار</Label>
                <p className="font-medium">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${domain.autoRenew ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {domain.autoRenew ? 'فعال' : 'غیرفعال'}
                  </span>
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">کد EPP</Label>
                <p className="font-medium">●●●●●●●●</p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">محافظت از اطلاعات WHOIS</Label>
                <p className="font-medium">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${domain.whoisPrivacy ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {domain.whoisPrivacy ? 'فعال' : 'غیرفعال'}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>عملیات</CardTitle>
            <CardDescription>مدیریت دامنه</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="default" className="w-full" onClick={handleRenewDomain}>
              <RefreshCw size={16} className="ml-2" />
              تمدید دامنه
            </Button>
            <Button variant="outline" className="w-full" onClick={handleToggleAutoRenew}>
              <RefreshCw size={16} className="ml-2" />
              {domain.autoRenew ? 'غیرفعال‌سازی تمدید خودکار' : 'فعال‌سازی تمدید خودکار'}
            </Button>
            <Button variant="outline" className="w-full" onClick={handleToggleWhoisPrivacy}>
              <Shield size={16} className="ml-2" />
              {domain.whoisPrivacy ? 'غیرفعال‌سازی محافظت WHOIS' : 'فعال‌سازی محافظت WHOIS'}
            </Button>
            <Button variant="outline" className="w-full" onClick={handleTransferOut}>
              <Lock size={16} className="ml-2" />
              درخواست کد انتقال
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dns" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="dns">
            رکوردهای DNS
          </TabsTrigger>
          <TabsTrigger value="nameservers">
            نیم‌سرورها
          </TabsTrigger>
          <TabsTrigger value="contacts">
            اطلاعات تماس
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dns">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>رکوردهای DNS</CardTitle>
                <Button variant="outline" size="sm" onClick={handleSaveDnsRecords}>
                  <Save size={16} className="ml-2" />
                  ذخیره تغییرات
                </Button>
              </div>
              <CardDescription>مدیریت رکوردهای DNS دامنه</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-2 px-3">نوع</th>
                      <th className="text-right py-2 px-3">نام</th>
                      <th className="text-right py-2 px-3">مقدار</th>
                      <th className="text-right py-2 px-3">TTL</th>
                      <th className="text-right py-2 px-3">اولویت</th>
                      <th className="text-right py-2 px-3">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dnsRecords.map((record) => (
                      <tr key={record.id} className="border-b">
                        <td className="py-2 px-3">
                          <Select
                            value={record.type}
                            onValueChange={(value) => handleUpdateDnsRecord(record.id, 'type', value)}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
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
                        </td>
                        <td className="py-2 px-3">
                          <Input
                            value={record.name}
                            onChange={(e) => handleUpdateDnsRecord(record.id, 'name', e.target.value)}
                            className="w-full"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <Input
                            value={record.value}
                            onChange={(e) => handleUpdateDnsRecord(record.id, 'value', e.target.value)}
                            className="w-full"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <Input
                            value={record.ttl}
                            onChange={(e) => handleUpdateDnsRecord(record.id, 'ttl', e.target.value)}
                            className="w-20"
                          />
                        </td>
                        <td className="py-2 px-3">
                          {record.type === 'MX' && (
                            <Input
                              value={record.priority || ''}
                              onChange={(e) => handleUpdateDnsRecord(record.id, 'priority', e.target.value)}
                              className="w-20"
                            />
                          )}
                        </td>
                        <td className="py-2 px-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteDnsRecord(record.id)}
                          >
                            <Trash2 size={16} className="text-red-500" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="py-2 px-3">
                        <Select
                          value={newRecord.type}
                          onValueChange={(value) => setNewRecord({ ...newRecord, type: value })}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
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
                      </td>
                      <td className="py-2 px-3">
                        <Input
                          placeholder="نام"
                          value={newRecord.name}
                          onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                        />
                      </td>
                      <td className="py-2 px-3">
                        <Input
                          placeholder="مقدار"
                          value={newRecord.value}
                          onChange={(e) => setNewRecord({ ...newRecord, value: e.target.value })}
                        />
                      </td>
                      <td className="py-2 px-3">
                        <Input
                          placeholder="TTL"
                          value={newRecord.ttl}
                          onChange={(e) => setNewRecord({ ...newRecord, ttl: e.target.value })}
                          className="w-20"
                        />
                      </td>
                      <td className="py-2 px-3">
                        {newRecord.type === 'MX' && (
                          <Input
                            placeholder="اولویت"
                            value={newRecord.priority}
                            onChange={(e) => setNewRecord({ ...newRecord, priority: e.target.value })}
                            className="w-20"
                          />
                        )}
                      </td>
                      <td className="py-2 px-3">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={handleAddDnsRecord}
                        >
                          افزودن
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nameservers">
          <Card>
            <CardHeader>
              <CardTitle>نیم‌سرورها</CardTitle>
              <CardDescription>مدیریت نیم‌سرورهای دامنه</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>نیم‌سرورهای فعلی</Label>
                  <div className="mt-2 space-y-2">
                    {domain.nameservers.map((ns, index) => (
                      <div key={index} className="flex items-center">
                        <Server size={16} className="ml-2 text-gray-500" />
                        <span>{ns}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <Label>تغییر نیم‌سرورها</Label>
                  <div className="grid grid-cols-1 gap-3 mt-2">
                    <div>
                      <Label className="text-xs">نیم‌سرور 1</Label>
                      <Input placeholder="ns1.example.com" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">نیم‌سرور 2</Label>
                      <Input placeholder="ns2.example.com" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">نیم‌سرور 3 (اختیاری)</Label>
                      <Input placeholder="ns3.example.com" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">نیم‌سرور 4 (اختیاری)</Label>
                      <Input placeholder="ns4.example.com" className="mt-1" />
                    </div>
                  </div>
                  <Button className="mt-4" onClick={handleChangeNameservers}>ثبت تغییرات</Button>
                </div>

                <div className="border-t pt-4 mt-4">
                  <Label>استفاده از نیم‌سرورهای پیش‌فرض</Label>
                  <p className="text-sm text-gray-500 mt-1 mb-2">
                    برای استفاده از نیم‌سرورهای پیش‌فرض نوین وی دی اس، دکمه زیر را کلیک کنید.
                  </p>
                  <Button variant="outline" onClick={handleChangeNameservers}>
                    <Globe size={16} className="ml-2" />
                    استفاده از نیم‌سرورهای پیش‌فرض
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات تماس</CardTitle>
              <CardDescription>مدیریت اطلاعات تماس مرتبط با دامنه</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="registrant">
                <TabsList className="mb-4">
                  <TabsTrigger value="registrant">ثبت‌کننده</TabsTrigger>
                  <TabsTrigger value="admin">مدیر</TabsTrigger>
                  <TabsTrigger value="technical">فنی</TabsTrigger>
                </TabsList>
                
                <TabsContent value="registrant">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>نام و نام خانوادگی</Label>
                      <Input value={domain.contacts.registrant.name} className="mt-1" />
                    </div>
                    <div>
                      <Label>ایمیل</Label>
                      <Input value={domain.contacts.registrant.email} className="mt-1" />
                    </div>
                    <div>
                      <Label>شماره تلفن</Label>
                      <Input value={domain.contacts.registrant.phone} className="mt-1" />
                    </div>
                    <div>
                      <Label>آدرس</Label>
                      <Input value={domain.contacts.registrant.address} className="mt-1" />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="admin">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>نام و نام خانوادگی</Label>
                      <Input value={domain.contacts.admin.name} className="mt-1" />
                    </div>
                    <div>
                      <Label>ایمیل</Label>
                      <Input value={domain.contacts.admin.email} className="mt-1" />
                    </div>
                    <div>
                      <Label>شماره تلفن</Label>
                      <Input value={domain.contacts.admin.phone} className="mt-1" />
                    </div>
                    <div>
                      <Label>آدرس</Label>
                      <Input value={domain.contacts.admin.address} className="mt-1" />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="technical">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>نام و نام خانوادگی</Label>
                      <Input value={domain.contacts.technical.name} className="mt-1" />
                    </div>
                    <div>
                      <Label>ایمیل</Label>
                      <Input value={domain.contacts.technical.email} className="mt-1" />
                    </div>
                    <div>
                      <Label>شماره تلفن</Label>
                      <Input value={domain.contacts.technical.phone} className="mt-1" />
                    </div>
                    <div>
                      <Label>آدرس</Label>
                      <Input value={domain.contacts.technical.address} className="mt-1" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 flex justify-end">
                <Button>
                  <Save size={16} className="ml-2" />
                  ذخیره اطلاعات
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DomainManagement;
