import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Bell, Check, Eye, EyeOff, Key, Lock, Save, ShieldAlert, User, UserCog, Mail, Phone, MapPin, Building, Hash, Globe, CreditCard, Wallet, Receipt, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const iranianProvinces = [
  'آذربایجان شرقی', 'آذربایجان غربی', 'اردبیل', 'اصفهان', 'ایلام', 'بوشهر', 'تهران',
  'چهارمحال و بختیاری', 'خراسان جنوبی', 'خراسان رضوی', 'خراسان شمالی', 'خوزستان',
  'زنجان', 'سمنان', 'سیستان و بلوچستان', 'فارس', 'قزوین', 'قم', 'کردستان', 'کرمان',
  'کرمانشاه', 'کهگیلویه و بویراحمد', 'گلستان', 'گیلان', 'لرستان', 'مازندران', 'مرکزی',
  'هرمزگان', 'همدان', 'یزد'
];

const ProfileSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [profileForm, setProfileForm] = useState({
    firstName: 'محمد',
    lastName: 'رضایی',
    email: 'mohammad@example.com',
    phone: '09123456789',
    companyName: 'شرکت نمونه',
    address: 'تهران، خیابان ولیعصر',
    city: 'تهران',
    province: 'تهران',
    postalCode: '1234567890',
  });
  
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: false,
    emailNotifications: true,
    loginAlerts: true,
    activityAlerts: false,
    serviceAlerts: true,
  });
  
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'کلید API اصلی', key: 'api_key_1234567890', created: '1402/06/15', lastUsed: '1402/06/20' },
    { id: '2', name: 'کلید مربوط به وب سرویس', key: 'api_key_0987654321', created: '1402/05/10', lastUsed: '1402/06/18' },
  ]);
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleProvinceChange = (value: string) => {
    setProfileForm((prev) => ({ ...prev, province: value }));
  };
  
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleToggleChange = (name: string, checked: boolean) => {
    setSecurityForm((prev) => ({ ...prev, [name]: checked }));
  };
  
  const handleSaveProfile = () => {
    setSaving(true);
    
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "ذخیره تغییرات",
        description: "اطلاعات شخصی شما با موفقیت به‌روزرسانی شد.",
        action: (
          <Button variant="outline" onClick={() => toast({ title: "دریافت شد" })}>
            تأیید
          </Button>
        )
      });
    }, 1500);
  };
  
  const handleChangePassword = () => {
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast({
        title: "خطا در تغییر رمز عبور",
        description: "رمز عبور جدید و تکرار آن مطابقت ندارند.",
        variant: "destructive",
      });
      return;
    }
    
    if (securityForm.newPassword.length < 8) {
      toast({
        title: "خطا در تغییر رمز عبور",
        description: "رمز عبور جدید باید حداقل ۸ کاراکتر باشد.",
        variant: "destructive",
      });
      return;
    }
    
    setSaving(true);
    
    setTimeout(() => {
      setSaving(false);
      setSecurityForm((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      
      toast({
        title: "تغییر رمز عبور",
        description: "رمز عبور شما با موفقیت تغییر یافت.",
        action: (
          <Button variant="outline" onClick={() => toast({ title: "دریافت شد" })}>
            تأیید
          </Button>
        )
      });
    }, 1500);
  };
  
  const handleEnableTwoFactor = () => {
    setSecurityForm((prev) => ({ ...prev, twoFactor: true }));
    
    toast({
      title: "فعال‌سازی احراز هویت دو مرحله‌ای",
      description: "کد QR برای اسکن به ایمیل شما ارسال شد.",
    });
  };
  
  const handleSaveNotificationSettings = () => {
    setSaving(true);
    
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "ذخیره تنظیمات اعلان‌ها",
        description: "تنظیمات اعلان‌های شما با موفقیت به‌روزرسانی شد.",
        action: (
          <Button variant="outline" onClick={() => toast({ title: "دریافت شد" })}>
            تأیید
          </Button>
        )
      });
    }, 1000);
  };
  
  const handleCreateApiKey = () => {
    const newKey = {
      id: (apiKeys.length + 1).toString(),
      name: 'کلید API جدید',
      key: `api_key_${Math.random().toString(36).substring(2, 15)}`,
      created: '1402/06/21',
      lastUsed: '-'
    };
    
    setApiKeys((prev) => [...prev, newKey]);
    
    toast({
      title: "ایجاد کلید API جدید",
      description: "کلید API جدید با موفقیت ایجاد شد.",
    });
  };
  
  const handleDeleteApiKey = (id: string) => {
    setApiKeys((prev) => prev.filter(key => key.id !== id));
    
    toast({
      title: "حذف کلید API",
      description: "کلید API با موفقیت حذف شد.",
    });
  };
  
  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">تنظیمات حساب کاربری</h1>
        <Badge>حساب کاربری استاندارد</Badge>
      </div>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>نکته مهم</AlertTitle>
        <AlertDescription>
          برای حفظ امنیت حساب کاربری خود، رمز عبور را به صورت دوره‌ای تغییر دهید و از احراز هویت دو مرحله‌ای استفاده کنید.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4 text-blue-500" />
            <span>اطلاعات شخصی</span>
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-green-500" />
            <span>اطلاعات مالی</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-red-500" />
            <span>امنیت</span>
          </TabsTrigger>
          <TabsTrigger value="notification" className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-yellow-500" />
            <span>اعلان‌ها</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="h-4 w-4 text-purple-500" />
            <span>کلیدهای API</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="financial" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-500" />
                اطلاعات مالی
              </CardTitle>
              <CardDescription>
                اطلاعات مالی و بانکی خود را مدیریت کنید.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-blue-500" />
                    شماره کارت
                  </Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234-5678-9012-3456"
                    className="text-left"
                    dir="ltr"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accountNumber" className="flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-green-500" />
                    شماره حساب
                  </Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    placeholder="123-456-789012-3"
                    className="text-left"
                    dir="ltr"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bankName" className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-purple-500" />
                    نام بانک
                  </Label>
                  <Input
                    id="bankName"
                    name="bankName"
                    placeholder="بانک ملی ایران"
                    className="text-right"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shebaNumber" className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-orange-500" />
                    شماره شبا
                  </Label>
                  <Input
                    id="shebaNumber"
                    name="shebaNumber"
                    placeholder="IR123456789012345678901234"
                    className="text-left"
                    dir="ltr"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="nationalCode" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-cyan-500" />
                    کد ملی
                  </Label>
                  <Input
                    id="nationalCode"
                    name="nationalCode"
                    placeholder="1234567890"
                    className="text-left"
                    dir="ltr"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="taxCode" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-red-500" />
                    کد اقتصادی (اختیاری)
                  </Label>
                  <Input
                    id="taxCode"
                    name="taxCode"
                    placeholder="123456789012"
                    className="text-left"
                    dir="ltr"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveProfile} disabled={saving}>
                {saving ? (
                  <>
                    <span className="animate-spin mr-2">●</span>
                    در حال ذخیره...
                  </>
                ) : (
                  <>
                    <Save className="ml-2 h-4 w-4" />
                    ذخیره اطلاعات مالی
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="personal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                اطلاعات شخصی
              </CardTitle>
              <CardDescription>
                اطلاعات شخصی خود را ویرایش کنید. این اطلاعات برای ارتباط با شما و صدور فاکتور استفاده می‌شود.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <Label htmlFor="firstName" className="flex items-center gap-2">
                     <User className="h-4 w-4 text-blue-500" />
                     نام
                   </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={profileForm.firstName}
                    onChange={handleProfileChange}
                    className="text-right"
                  />
                </div>
                
                 <div className="space-y-2">
                   <Label htmlFor="lastName" className="flex items-center gap-2">
                     <User className="h-4 w-4 text-blue-500" />
                     نام خانوادگی
                   </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={profileForm.lastName}
                    onChange={handleProfileChange}
                    className="text-right"
                  />
                </div>
                
                 <div className="space-y-2">
                   <Label htmlFor="email" className="flex items-center gap-2">
                     <Mail className="h-4 w-4 text-green-500" />
                     ایمیل
                   </Label>
                   <Input
                     id="email"
                     name="email"
                     type="email"
                     value={profileForm.email}
                     onChange={handleProfileChange}
                     className="text-left"
                     dir="ltr"
                   />
                  <p className="text-xs text-gray-500">این ایمیل برای ورود به سیستم استفاده می‌شود.</p>
                </div>
                
                 <div className="space-y-2">
                   <Label htmlFor="phone" className="flex items-center gap-2">
                     <Phone className="h-4 w-4 text-orange-500" />
                     شماره تماس
                   </Label>
                   <Input
                     id="phone"
                     name="phone"
                     value={profileForm.phone}
                     onChange={handleProfileChange}
                     className="text-left"
                     dir="ltr"
                   />
                </div>
                
                 <div className="space-y-2">
                   <Label htmlFor="companyName" className="flex items-center gap-2">
                     <Building className="h-4 w-4 text-purple-500" />
                     نام شرکت (اختیاری)
                   </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={profileForm.companyName}
                    onChange={handleProfileChange}
                    className="text-right"
                  />
                </div>
                
                 <div className="space-y-2">
                   <Label htmlFor="address" className="flex items-center gap-2">
                     <MapPin className="h-4 w-4 text-red-500" />
                     آدرس
                   </Label>
                  <Input
                    id="address"
                    name="address"
                    value={profileForm.address}
                    onChange={handleProfileChange}
                    className="text-right"
                  />
                </div>
                
                 <div className="space-y-2">
                   <Label htmlFor="city" className="flex items-center gap-2">
                     <Globe className="h-4 w-4 text-cyan-500" />
                     شهر
                   </Label>
                  <Input
                    id="city"
                    name="city"
                    value={profileForm.city}
                    onChange={handleProfileChange}
                    className="text-right"
                  />
                </div>
                
                 <div className="space-y-2">
                   <Label htmlFor="province" className="flex items-center gap-2">
                     <MapPin className="h-4 w-4 text-teal-500" />
                     استان
                   </Label>
                  <Select value={profileForm.province} onValueChange={handleProvinceChange}>
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="انتخاب استان" />
                    </SelectTrigger>
                    <SelectContent>
                      {iranianProvinces.map(province => (
                        <SelectItem key={province} value={province}>{province}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                 <div className="space-y-2">
                   <Label htmlFor="postalCode" className="flex items-center gap-2">
                     <Hash className="h-4 w-4 text-indigo-500" />
                     کد پستی
                   </Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={profileForm.postalCode}
                    onChange={handleProfileChange}
                    className="text-right"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveProfile} disabled={saving}>
                {saving ? (
                  <>
                    <span className="animate-spin mr-2">●</span>
                    در حال ذخیره...
                  </>
                ) : (
                  <>
                    <Save className="ml-2 h-4 w-4" />
                    ذخیره تغییرات
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5" />
                امنیت حساب کاربری
              </CardTitle>
              <CardDescription>
                تنظیمات امنیتی حساب کاربری خود را مدیریت کنید.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  تغییر رمز عبور
                </h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">رمز عبور فعلی</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type={showPassword ? "text" : "password"}
                        value={securityForm.currentPassword}
                        onChange={handleSecurityChange}
                        className="pl-10 text-right"
                      />
                      <button
                        type="button"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">رمز عبور جدید</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={securityForm.newPassword}
                      onChange={handleSecurityChange}
                      className="text-right"
                    />
                    <p className="text-xs text-gray-500">رمز عبور باید حداقل ۸ کاراکتر باشد و شامل حروف و اعداد باشد.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">تکرار رمز عبور جدید</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={securityForm.confirmPassword}
                      onChange={handleSecurityChange}
                      className="text-right"
                    />
                  </div>
                  
                  <div>
                    <Button onClick={handleChangePassword} disabled={saving}>
                      {saving ? (
                        <>
                          <span className="animate-spin mr-2">●</span>
                          در حال اعمال تغییرات...
                        </>
                      ) : (
                        <>
                          <Lock className="ml-2 h-4 w-4" />
                          تغییر رمز عبور
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5" />
                  احراز هویت دو مرحله‌ای
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">احراز هویت دو مرحله‌ای</h4>
                      <p className="text-sm text-gray-500">با فعال‌سازی این گزینه، علاوه بر رمز عبور، یک کد تأیید نیز برای ورود به سیستم نیاز خواهد بود.</p>
                    </div>
                    <Switch
                      checked={securityForm.twoFactor}
                      onCheckedChange={(checked) => handleToggleChange('twoFactor', checked)}
                    />
                  </div>
                  
                  {!securityForm.twoFactor && (
                    <div>
                      <Button variant="outline" onClick={handleEnableTwoFactor}>
                        <ShieldAlert className="ml-2 h-4 w-4" />
                        فعال‌سازی احراز هویت دو مرحله‌ای
                      </Button>
                    </div>
                  )}
                  
                  {securityForm.twoFactor && (
                    <Alert className="bg-green-50 text-green-800 border-green-200">
                      <Check className="h-4 w-4" />
                      <AlertTitle>احراز هویت دو مرحله‌ای فعال است</AlertTitle>
                      <AlertDescription>
                        احراز هویت دو مرحله‌ای برای حساب کاربری شما فعال است. برای غیرفعال‌سازی، کلید را خاموش کنید.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notification" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                تنظیمات اعلان‌ها
              </CardTitle>
              <CardDescription>
                تنظیمات اعلان‌های خود را مدیریت کنید.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-blue-500" />
                    <div>
                      <h4 className="font-medium">اعلان‌های ایمیل</h4>
                      <p className="text-sm text-gray-500">دریافت اعلان‌ها از طریق ایمیل</p>
                    </div>
                  </div>
                  <Switch
                    checked={securityForm.emailNotifications}
                    onCheckedChange={(checked) => handleToggleChange('emailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="h-5 w-5 text-orange-500" />
                    <div>
                      <h4 className="font-medium">هشدارهای ورود</h4>
                      <p className="text-sm text-gray-500">اطلاع از ورودهای جدید به حساب کاربری</p>
                    </div>
                  </div>
                  <Switch
                    checked={securityForm.loginAlerts}
                    onCheckedChange={(checked) => handleToggleChange('loginAlerts', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <UserCog className="h-5 w-5 text-green-500" />
                    <div>
                      <h4 className="font-medium">اعلان‌های فعالیت</h4>
                      <p className="text-sm text-gray-500">اطلاع از تغییرات مهم در حساب کاربری</p>
                    </div>
                  </div>
                  <Switch
                    checked={securityForm.activityAlerts}
                    onCheckedChange={(checked) => handleToggleChange('activityAlerts', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-purple-500" />
                    <div>
                      <h4 className="font-medium">اعلان‌های سرویس</h4>
                      <p className="text-sm text-gray-500">اطلاع از وضعیت سرورها و خدمات</p>
                    </div>
                  </div>
                  <Switch
                    checked={securityForm.serviceAlerts}
                    onCheckedChange={(checked) => handleToggleChange('serviceAlerts', checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveNotificationSettings} disabled={saving}>
                {saving ? (
                  <>
                    <span className="animate-spin mr-2">●</span>
                    در حال ذخیره...
                  </>
                ) : (
                  <>
                    <Save className="ml-2 h-4 w-4" />
                    ذخیره تنظیمات
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                مدیریت کلیدهای API
              </CardTitle>
              <CardDescription>
                کلیدهای API خود را برای اتصال به سرویس‌های خارجی مدیریت کنید.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-end">
                <Button onClick={handleCreateApiKey}>
                  <Key className="ml-2 h-4 w-4" />
                  ایجاد کلید جدید
                </Button>
              </div>
              
              <div className="space-y-3">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{apiKey.name}</h4>
                      <p className="text-sm text-gray-500">
                        ایجاد شده: {apiKey.created} | آخرین استفاده: {apiKey.lastUsed}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {apiKey.key}
                      </code>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteApiKey(apiKey.id)}>
                        حذف
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSettingsPage;