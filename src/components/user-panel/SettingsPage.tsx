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
import { AlertCircle, Bell, Check, Eye, EyeOff, Lock, Save, ShieldAlert, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SettingsPageProps {
  activeTab?: string;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ activeTab: propActiveTab }) => {
  const [activeTab, setActiveTab] = useState(propActiveTab || 'profile');
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
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
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
    
    // Simulate API call
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
    
    // Simulate API call
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
    
    // Simulate API call
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
  
  return (
    <div className="space-y-6">
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

      <Tabs value={propActiveTab === 'security-settings' ? 'security' : activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>اطلاعات شخصی</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" />
            <span>امنیت</span>
          </TabsTrigger>
          <TabsTrigger value="notification" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>اعلان‌ها</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات شخصی</CardTitle>
              <CardDescription>
                اطلاعات شخصی خود را ویرایش کنید. این اطلاعات برای ارتباط با شما و صدور فاکتور استفاده می‌شود.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">نام</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={profileForm.firstName}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">نام خانوادگی</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={profileForm.lastName}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">ایمیل</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                  />
                  <p className="text-xs text-gray-500">این ایمیل برای ورود به سیستم استفاده می‌شود.</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">شماره تماس</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyName">نام شرکت (اختیاری)</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={profileForm.companyName}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">آدرس</Label>
                  <Input
                    id="address"
                    name="address"
                    value={profileForm.address}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">شهر</Label>
                  <Input
                    id="city"
                    name="city"
                    value={profileForm.city}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="province">استان</Label>
                  <Select defaultValue={profileForm.province}>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب استان" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="تهران">تهران</SelectItem>
                      <SelectItem value="اصفهان">اصفهان</SelectItem>
                      <SelectItem value="مشهد">مشهد</SelectItem>
                      <SelectItem value="شیراز">شیراز</SelectItem>
                      <SelectItem value="تبریز">تبریز</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="postalCode">کد پستی</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={profileForm.postalCode}
                    onChange={handleProfileChange}
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
              <CardTitle>امنیت حساب کاربری</CardTitle>
              <CardDescription>
                تنظیمات امنیتی حساب کاربری خود را مدیریت کنید.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">تغییر رمز عبور</h3>
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
                        className="pl-10"
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
                <h3 className="text-lg font-medium mb-4">احراز هویت دو مرحله‌ای</h3>
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
              <CardTitle>تنظیمات اعلان‌ها</CardTitle>
              <CardDescription>
                نوع اعلان‌هایی که مایل به دریافت آن‌ها هستید را انتخاب کنید.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">اعلان‌های ایمیل</h4>
                    <p className="text-sm text-gray-500">دریافت اعلان‌ها از طریق ایمیل</p>
                  </div>
                  <Switch
                    checked={securityForm.emailNotifications}
                    onCheckedChange={(checked) => handleToggleChange('emailNotifications', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">هشدار ورود</h4>
                    <p className="text-sm text-gray-500">اطلاع‌رسانی در صورت ورود جدید به حساب کاربری</p>
                  </div>
                  <Switch
                    checked={securityForm.loginAlerts}
                    onCheckedChange={(checked) => handleToggleChange('loginAlerts', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">هشدار فعالیت</h4>
                    <p className="text-sm text-gray-500">اطلاع‌رسانی درباره فعالیت‌های مهم حساب کاربری</p>
                  </div>
                  <Switch
                    checked={securityForm.activityAlerts}
                    onCheckedChange={(checked) => handleToggleChange('activityAlerts', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">اطلاعیه‌های سرویس</h4>
                    <p className="text-sm text-gray-500">اطلاع‌رسانی درباره وضعیت سرویس‌ها و نگهداری‌های برنامه‌ریزی شده</p>
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
                    ذخیره تغییرات
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;