
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Globe, ArrowLeft, Settings, Server, Badge, ShieldCheck, RefreshCw, ArrowRightLeft } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DomainManagementProps {
  domainId: string;
  onClose: () => void;
}

const DomainManagement: React.FC<DomainManagementProps> = ({ domainId, onClose }) => {
  // Mock domain data
  const domainData = {
    id: domainId,
    name: domainId.includes('example.com') ? 'example.com' : 
           domainId.includes('example.org') ? 'example.org' : 'example.ir',
    registrar: domainId.includes('ir') ? 'nic.ir' : 'نوین وی دی اس',
    status: domainId.includes('125') ? 'pending-transfer' : 'active',
    registrationDate: '2023-01-15',
    expiryDate: domainId.includes('123') ? '2025-01-15' : 
                domainId.includes('124') ? '2024-11-20' : '2025-03-10',
    autoRenew: domainId.includes('123'),
    whoisProtection: !domainId.includes('125'),
    nameservers: [
      domainId.includes('125') ? 'ns1.nic.ir' : 'ns1.novinvds.ir',
      domainId.includes('125') ? 'ns2.nic.ir' : 'ns2.novinvds.ir'
    ],
    dnsRecords: [
      { type: 'A', name: '@', content: '185.173.106.101', ttl: 3600 },
      { type: 'CNAME', name: 'www', content: '@', ttl: 3600 },
      { type: 'MX', name: '@', content: 'mail.example.com', priority: 10, ttl: 3600 },
      { type: 'TXT', name: '@', content: 'v=spf1 include:_spf.example.com ~all', ttl: 3600 }
    ]
  };

  const [nameserver1, setNameserver1] = useState(domainData.nameservers[0]);
  const [nameserver2, setNameserver2] = useState(domainData.nameservers[1]);
  const [autoRenew, setAutoRenew] = useState(domainData.autoRenew);
  const [whoisProtection, setWhoisProtection] = useState(domainData.whoisProtection);
  const [activeTab, setActiveTab] = useState('info');
  const [dnsRecords, setDnsRecords] = useState(domainData.dnsRecords);
  const [newRecord, setNewRecord] = useState({ type: 'A', name: '', content: '', ttl: 3600, priority: 10 });

  const handleSaveNameservers = () => {
    toast({
      title: "تغییر NameServer",
      description: "درخواست تغییر NameServer با موفقیت ثبت شد.",
    });
  };

  const handleSaveAutoRenew = () => {
    toast({
      title: "تنظیمات تمدید خودکار",
      description: `تمدید خودکار ${autoRenew ? 'فعال' : 'غیرفعال'} شد.`,
    });
  };

  const handleSaveWhoisProtection = () => {
    toast({
      title: "حفاظت Whois",
      description: `حفاظت اطلاعات Whois ${whoisProtection ? 'فعال' : 'غیرفعال'} شد.`,
    });
  };

  const handleAddDnsRecord = () => {
    if (!newRecord.name || !newRecord.content) {
      toast({
        title: "خطا",
        description: "لطفاً تمام فیلدها را پر کنید.",
        variant: "destructive"
      });
      return;
    }
    
    setDnsRecords([...dnsRecords, {...newRecord}]);
    setNewRecord({ type: 'A', name: '', content: '', ttl: 3600, priority: 10 });
    
    toast({
      title: "رکورد DNS جدید",
      description: "رکورد DNS جدید با موفقیت اضافه شد.",
    });
  };

  const handleDeleteDnsRecord = (index: number) => {
    const updatedRecords = [...dnsRecords];
    updatedRecords.splice(index, 1);
    setDnsRecords(updatedRecords);
    
    toast({
      title: "حذف رکورد DNS",
      description: "رکورد DNS با موفقیت حذف شد.",
    });
  };

  const getStatusBadge = () => {
    if (domainData.status === 'active') {
      return <span className="bg-green-100 text-green-800 text-xs py-1 px-2 rounded">فعال</span>;
    } else if (domainData.status === 'pending-transfer') {
      return <span className="bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded">در حال انتقال</span>;
    }
    return <span className="bg-gray-100 text-gray-800 text-xs py-1 px-2 rounded">{domainData.status}</span>;
  };

  const handleRenewDomain = () => {
    toast({
      title: "تمدید دامنه",
      description: "درخواست تمدید دامنه با موفقیت ثبت شد. به صفحه پرداخت هدایت می‌شوید.",
      action: (
        <Button variant="outline" onClick={() => toast({ title: "عملیات موفق" })}>
          پرداخت
        </Button>
      )
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onClose} className="ml-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold flex items-center">
            <Globe className="inline ml-2" />
            مدیریت دامنه {domainData.name}
          </h1>
          <div className="mr-3">{getStatusBadge()}</div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRenewDomain}>
            <ArrowRightLeft className="ml-2 h-4 w-4" />
            تمدید دامنه
          </Button>
        </div>
      </div>

      {domainData.status === 'pending-transfer' && (
        <Alert>
          <AlertDescription>
            این دامنه در حال انتقال است. برخی از تنظیمات تا زمان تکمیل فرآیند انتقال در دسترس نخواهند بود.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full md:w-2/3">
          <TabsTrigger value="info">
            <Settings className="ml-2 h-4 w-4" />
            اطلاعات دامنه
          </TabsTrigger>
          <TabsTrigger value="nameservers">
            <Server className="ml-2 h-4 w-4" />
            نیم‌سرورها
          </TabsTrigger>
          <TabsTrigger value="dns">
            <Badge className="ml-2 h-4 w-4" />
            رکوردهای DNS
          </TabsTrigger>
          <TabsTrigger value="protection">
            <ShieldCheck className="ml-2 h-4 w-4" />
            محافظت
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات دامنه</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label>نام دامنه</Label>
                    <Input value={domainData.name} readOnly />
                  </div>
                  <div>
                    <Label>ثبت کننده</Label>
                    <Input value={domainData.registrar} readOnly />
                  </div>
                  <div>
                    <Label>وضعیت</Label>
                    <Input value={domainData.status === 'active' ? 'فعال' : 'در حال انتقال'} readOnly />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>تاریخ ثبت</Label>
                    <Input value={domainData.registrationDate} readOnly />
                  </div>
                  <div>
                    <Label>تاریخ انقضا</Label>
                    <Input value={domainData.expiryDate} readOnly />
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <Label htmlFor="autoRenew">تمدید خودکار</Label>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Switch 
                        id="autoRenew" 
                        checked={autoRenew} 
                        onCheckedChange={setAutoRenew} 
                        disabled={domainData.status === 'pending-transfer'}
                      />
                      <Button 
                        onClick={handleSaveAutoRenew} 
                        size="sm" 
                        disabled={domainData.status === 'pending-transfer'}
                      >
                        ذخیره
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nameservers" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات نیم‌سرور</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ns1">نیم‌سرور اول</Label>
                  <Input 
                    id="ns1" 
                    value={nameserver1} 
                    onChange={(e) => setNameserver1(e.target.value)} 
                    disabled={domainData.status === 'pending-transfer'}
                  />
                </div>
                <div>
                  <Label htmlFor="ns2">نیم‌سرور دوم</Label>
                  <Input 
                    id="ns2" 
                    value={nameserver2} 
                    onChange={(e) => setNameserver2(e.target.value)} 
                    disabled={domainData.status === 'pending-transfer'}
                  />
                </div>
                <Button onClick={handleSaveNameservers} disabled={domainData.status === 'pending-transfer'}>
                  <RefreshCw className="ml-2 h-4 w-4" />
                  بروزرسانی نیم‌سرورها
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dns" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>مدیریت رکوردهای DNS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md">
                  <div className="grid grid-cols-6 gap-2 p-3 border-b bg-gray-50 font-medium">
                    <div className="col-span-1">نوع</div>
                    <div className="col-span-1">نام</div>
                    <div className="col-span-2">محتوا</div>
                    <div className="col-span-1">TTL</div>
                    <div className="col-span-1">عملیات</div>
                  </div>
                  {dnsRecords.map((record, index) => (
                    <div key={index} className="grid grid-cols-6 gap-2 p-3 border-b last:border-0">
                      <div className="col-span-1">{record.type}</div>
                      <div className="col-span-1">{record.name}</div>
                      <div className="col-span-2">{record.content}</div>
                      <div className="col-span-1">{record.ttl}</div>
                      <div className="col-span-1">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteDnsRecord(index)}
                          disabled={domainData.status === 'pending-transfer'}
                        >
                          حذف
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Card className="border border-dashed">
                  <CardHeader>
                    <CardTitle>افزودن رکورد جدید</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <Label htmlFor="recordType">نوع</Label>
                        <select 
                          id="recordType" 
                          className="w-full border border-gray-300 rounded-md p-2"
                          value={newRecord.type}
                          onChange={(e) => setNewRecord({...newRecord, type: e.target.value})}
                          disabled={domainData.status === 'pending-transfer'}
                        >
                          <option value="A">A</option>
                          <option value="AAAA">AAAA</option>
                          <option value="CNAME">CNAME</option>
                          <option value="MX">MX</option>
                          <option value="TXT">TXT</option>
                          <option value="NS">NS</option>
                          <option value="SRV">SRV</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="recordName">نام</Label>
                        <Input 
                          id="recordName" 
                          value={newRecord.name}
                          onChange={(e) => setNewRecord({...newRecord, name: e.target.value})}
                          disabled={domainData.status === 'pending-transfer'}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="recordContent">محتوا</Label>
                        <Input 
                          id="recordContent" 
                          value={newRecord.content}
                          onChange={(e) => setNewRecord({...newRecord, content: e.target.value})}
                          disabled={domainData.status === 'pending-transfer'}
                        />
                      </div>
                      <div>
                        <Label htmlFor="recordTtl">TTL</Label>
                        <Input 
                          id="recordTtl" 
                          type="number" 
                          value={newRecord.ttl}
                          onChange={(e) => setNewRecord({...newRecord, ttl: parseInt(e.target.value)})}
                          disabled={domainData.status === 'pending-transfer'}
                        />
                      </div>
                    </div>
                    {newRecord.type === 'MX' && (
                      <div className="mt-4">
                        <Label htmlFor="recordPriority">اولویت</Label>
                        <Input 
                          id="recordPriority" 
                          type="number" 
                          value={newRecord.priority}
                          onChange={(e) => setNewRecord({...newRecord, priority: parseInt(e.target.value)})}
                          disabled={domainData.status === 'pending-transfer'}
                        />
                      </div>
                    )}
                    <Button 
                      className="mt-4"
                      onClick={handleAddDnsRecord}
                      disabled={domainData.status === 'pending-transfer'}
                    >
                      افزودن رکورد
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protection" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات محافظت</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">حفاظت اطلاعات Whois</h3>
                    <p className="text-sm text-gray-500">
                      با فعال کردن این گزینه، اطلاعات شخصی شما در Whois نمایش داده نمی‌شود.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch 
                      id="whoisProtection" 
                      checked={whoisProtection} 
                      onCheckedChange={setWhoisProtection}
                      disabled={domainData.status === 'pending-transfer'}
                    />
                    <Button 
                      onClick={handleSaveWhoisProtection} 
                      size="sm"
                      disabled={domainData.status === 'pending-transfer'}
                    >
                      ذخیره
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <h3 className="text-lg font-medium">قفل انتقال دامنه</h3>
                    <p className="text-sm text-gray-500">
                      با فعال کردن این گزینه، دامنه شما در برابر انتقال غیرمجاز محافظت می‌شود.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch 
                      id="transferLock" 
                      defaultChecked={true}
                      disabled={true}
                    />
                    <Button 
                      size="sm"
                      disabled={true}
                    >
                      ذخیره
                    </Button>
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
