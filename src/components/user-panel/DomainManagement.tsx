
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftRight, Globe, Server, Shield, RefreshCw, CornerDownLeft, Check, X, AlertCircle } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface DomainManagementProps {
  domainId: string;
  onClose?: () => void;
}

const DomainManagement: React.FC<DomainManagementProps> = ({ domainId, onClose }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [isNameserverDialogOpen, setIsNameserverDialogOpen] = useState(false);
  const [isDNSDialogOpen, setIsDNSDialogOpen] = useState(false);
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [confirmRenewalOpen, setConfirmRenewalOpen] = useState(false);

  // Example domain data
  const domain = {
    id: domainId,
    name: domainId.includes('dom-') ? 'example.com' : domainId,
    registrar: 'نوین وی دی اس',
    status: 'active',
    creationDate: '2023-06-15',
    expiryDate: '2025-06-15',
    autoRenew: true,
    nameservers: [
      'ns1.novinvds.com',
      'ns2.novinvds.com'
    ],
    dnsRecords: [
      { type: 'A', name: '@', value: '185.173.106.100', ttl: 3600 },
      { type: 'CNAME', name: 'www', value: '@', ttl: 3600 },
      { type: 'MX', name: '@', value: 'mail.example.com', priority: 10, ttl: 3600 },
      { type: 'TXT', name: '@', value: 'v=spf1 include:_spf.example.com ~all', ttl: 3600 }
    ],
    contacts: {
      registrant: {
        name: 'شرکت نوین وی دی اس',
        email: 'info@novinvds.ir',
        phone: '+98 21 1234 5678',
        address: 'تهران، ایران'
      },
      admin: {
        name: 'مدیر دامنه',
        email: 'admin@novinvds.ir',
        phone: '+98 21 1234 5678',
        address: 'تهران، ایران'
      }
    }
  };

  const handleRenewal = () => {
    setConfirmRenewalOpen(true);
  };

  const confirmRenewal = () => {
    setConfirmRenewalOpen(false);
    toast({
      title: "درخواست تمدید ثبت شد",
      description: "درخواست تمدید دامنه شما با موفقیت ثبت شد و به صفحه پرداخت هدایت می‌شوید.",
      duration: 5000
    });
  };

  const handleNameserverUpdate = () => {
    toast({
      title: "سرورهای نام به‌روزرسانی شدند",
      description: "تغییرات سرورهای نام دامنه با موفقیت اعمال شد.",
      duration: 3000
    });
    setIsNameserverDialogOpen(false);
  };

  const handleDNSUpdate = () => {
    toast({
      title: "رکوردهای DNS به‌روزرسانی شدند",
      description: "تغییرات رکوردهای DNS با موفقیت اعمال شد.",
      duration: 3000
    });
    setIsDNSDialogOpen(false);
  };

  const handleTransferOut = () => {
    toast({
      title: "درخواست انتقال ثبت شد",
      description: "کد انتقال به ایمیل شما ارسال شد.",
      duration: 3000
    });
    setIsTransferDialogOpen(false);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">فعال</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800">منقضی شده</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">در انتظار</Badge>;
      case 'transferring':
        return <Badge className="bg-blue-100 text-blue-800">در حال انتقال</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 space-x-reverse">
          <Button variant="outline" size="sm" onClick={onClose}>
            <CornerDownLeft className="ml-2 h-4 w-4" />
            بازگشت
          </Button>
          <h1 className="text-2xl font-bold">{domain.name}</h1>
          {getStatusBadge(domain.status)}
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Button onClick={handleRenewal}>تمدید دامنه</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="info">اطلاعات دامنه</TabsTrigger>
          <TabsTrigger value="dns">تنظیمات DNS</TabsTrigger>
          <TabsTrigger value="nameservers">سرورهای نام</TabsTrigger>
          <TabsTrigger value="contacts">اطلاعات تماس</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات دامنه</CardTitle>
              <CardDescription>جزئیات مربوط به دامنه شما</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">نام دامنه:</span>
                    <span>{domain.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">ثبت کننده:</span>
                    <span>{domain.registrar}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">تاریخ ثبت:</span>
                    <span>{domain.creationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">تاریخ انقضا:</span>
                    <span>{domain.expiryDate}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">وضعیت:</span>
                    <span>{getStatusBadge(domain.status)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">تمدید خودکار:</span>
                    <span>{domain.autoRenew ? 'فعال' : 'غیرفعال'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">قفل انتقال:</span>
                    <span>فعال</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">حفاظت اطلاعات تماس:</span>
                    <span>فعال</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-3">عملیات دامنه</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => setIsTransferDialogOpen(true)}>
                    <ArrowLeftRight className="ml-2 h-4 w-4" />
                    انتقال دامنه
                  </Button>
                  <Button variant="outline">
                    <Shield className="ml-2 h-4 w-4" />
                    مدیریت قفل دامنه
                  </Button>
                  <Button variant="outline">
                    <Globe className="ml-2 h-4 w-4" />
                    مدیریت WHOIS
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>رکوردهای DNS</CardTitle>
              <CardDescription>مدیریت رکوردهای DNS دامنه</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-2">نوع</th>
                      <th className="text-right p-2">نام</th>
                      <th className="text-right p-2">مقدار</th>
                      <th className="text-right p-2">TTL</th>
                      <th className="text-right p-2">اولویت</th>
                      <th className="text-right p-2">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {domain.dnsRecords.map((record, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{record.type}</td>
                        <td className="p-2">{record.name}</td>
                        <td className="p-2">{record.value}</td>
                        <td className="p-2">{record.ttl}</td>
                        <td className="p-2">{record.priority || '-'}</td>
                        <td className="p-2">
                          <div className="flex space-x-2 space-x-reverse">
                            <Button variant="ghost" size="sm">
                              ویرایش
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              حذف
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-between">
                <Button onClick={() => setIsDNSDialogOpen(true)}>افزودن رکورد جدید</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="nameservers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>سرورهای نام</CardTitle>
              <CardDescription>تنظیم سرورهای نام دامنه</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {domain.nameservers.map((ns, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <span>{ns}</span>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      حذف
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button onClick={() => setIsNameserverDialogOpen(true)}>ویرایش سرورهای نام</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات تماس</CardTitle>
              <CardDescription>مدیریت اطلاعات تماس دامنه</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">مالک دامنه</h3>
                  <div className="space-y-2">
                    <div><span className="font-medium ml-2">نام:</span> {domain.contacts.registrant.name}</div>
                    <div><span className="font-medium ml-2">ایمیل:</span> {domain.contacts.registrant.email}</div>
                    <div><span className="font-medium ml-2">تلفن:</span> {domain.contacts.registrant.phone}</div>
                    <div><span className="font-medium ml-2">آدرس:</span> {domain.contacts.registrant.address}</div>
                  </div>
                  <Button variant="outline" className="mt-4">ویرایش اطلاعات</Button>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">مدیر فنی</h3>
                  <div className="space-y-2">
                    <div><span className="font-medium ml-2">نام:</span> {domain.contacts.admin.name}</div>
                    <div><span className="font-medium ml-2">ایمیل:</span> {domain.contacts.admin.email}</div>
                    <div><span className="font-medium ml-2">تلفن:</span> {domain.contacts.admin.phone}</div>
                    <div><span className="font-medium ml-2">آدرس:</span> {domain.contacts.admin.address}</div>
                  </div>
                  <Button variant="outline" className="mt-4">ویرایش اطلاعات</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Nameserver Dialog */}
      <Dialog open={isNameserverDialogOpen} onOpenChange={setIsNameserverDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ویرایش سرورهای نام</DialogTitle>
            <DialogDescription>
              سرورهای نام دامنه خود را ویرایش کنید.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {domain.nameservers.map((ns, index) => (
              <div key={index} className="flex items-center space-x-2 space-x-reverse">
                <Input defaultValue={ns} />
                <Button variant="ghost" size="icon" className="text-red-600">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <span className="ml-2">افزودن سرور نام</span>
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNameserverDialogOpen(false)}>انصراف</Button>
            <Button onClick={handleNameserverUpdate}>ذخیره تغییرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* DNS Dialog */}
      <Dialog open={isDNSDialogOpen} onOpenChange={setIsDNSDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>افزودن رکورد DNS</DialogTitle>
            <DialogDescription>
              اطلاعات رکورد DNS جدید را وارد کنید.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>نوع رکورد</Label>
                <select className="w-full p-2 border rounded-md">
                  <option>A</option>
                  <option>AAAA</option>
                  <option>CNAME</option>
                  <option>MX</option>
                  <option>TXT</option>
                  <option>NS</option>
                  <option>SRV</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>نام</Label>
                <Input placeholder="@ یا www" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>مقدار</Label>
              <Input placeholder="185.173.106.100" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>TTL</Label>
                <Input type="number" defaultValue="3600" />
              </div>
              <div className="space-y-2">
                <Label>اولویت (فقط برای رکورد MX)</Label>
                <Input type="number" defaultValue="10" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDNSDialogOpen(false)}>انصراف</Button>
            <Button onClick={handleDNSUpdate}>افزودن رکورد</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Transfer Dialog */}
      <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>انتقال دامنه</DialogTitle>
            <DialogDescription>
              برای انتقال دامنه به ثبت‌کننده دیگر، ابتدا باید قفل انتقال را غیرفعال کنید و کد انتقال دریافت کنید.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-500 ml-2 mt-0.5" />
                <div>
                  <h4 className="text-yellow-800 font-medium">هشدار</h4>
                  <p className="text-yellow-700 text-sm">
                    با انتقال دامنه، مدیریت آن به ثبت‌کننده جدید منتقل می‌شود. این عملیات ممکن است تا ۷ روز طول بکشد.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input id="unlock" type="checkbox" className="ml-2" />
                <Label htmlFor="unlock">قفل انتقال دامنه را غیرفعال کنید</Label>
              </div>
              <div className="flex items-center">
                <input id="confirm" type="checkbox" className="ml-2" />
                <Label htmlFor="confirm">تأیید می‌کنم که می‌خواهم این دامنه را منتقل کنم</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTransferDialogOpen(false)}>انصراف</Button>
            <Button onClick={handleTransferOut}>دریافت کد انتقال</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Renewal confirmation */}
      <AlertDialog open={confirmRenewalOpen} onOpenChange={setConfirmRenewalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأیید تمدید دامنه</AlertDialogTitle>
            <AlertDialogDescription>
              آیا از تمدید دامنه {domain.name} برای یک سال دیگر اطمینان دارید؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRenewal}>تأیید و ادامه به پرداخت</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DomainManagement;
