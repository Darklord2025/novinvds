
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { 
  Bell, 
  Lock, 
  User, 
  Shield, 
  CreditCard, 
  Clock, 
  Globe, 
  Smartphone, 
  Mail, 
  BellOff, 
  Save
} from "lucide-react";

const SettingsPage = () => {
  const { toast } = useToast();
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    passwordExpiry: '90days',
    ipRestriction: false,
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    serviceExpiry: true,
    invoices: true,
    supportTickets: true,
    news: false,
    marketingOffers: false,
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    showProfile: true,
    shareUsageStats: false,
    storeBrowsingHistory: true,
    cookieConsent: true,
  });
  
  const [displaySettings, setDisplaySettings] = useState({
    language: 'fa',
    theme: 'light',
    timeFormat: '24h',
    dateFormat: 'jalali',
    timezone: 'Asia/Tehran',
  });
  
  const handleSaveSettings = (section: string) => {
    toast({
      title: "تنظیمات ذخیره شد",
      description: `تنظیمات بخش ${section} با موفقیت ذخیره شد.`,
      duration: 3000,
    });
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">تنظیمات</h1>
      
      <Tabs defaultValue="security">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="h-4 w-4 ml-2" />
            امنیت
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 ml-2" />
            اعلان‌ها
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center">
            <Lock className="h-4 w-4 ml-2" />
            حریم خصوصی
          </TabsTrigger>
          <TabsTrigger value="display" className="flex items-center">
            <Globe className="h-4 w-4 ml-2" />
            نمایش
          </TabsTrigger>
        </TabsList>
        
        {/* تنظیمات امنیتی */}
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات امنیتی</CardTitle>
              <CardDescription>امنیت حساب کاربری خود را مدیریت کنید</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="two-factor-auth">احراز هویت دو مرحله‌ای</Label>
                  <p className="text-sm text-gray-500">ارسال کد تأیید از طریق پیامک برای ورود به حساب</p>
                </div>
                <Switch 
                  id="two-factor-auth"
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => 
                    setSecuritySettings({...securitySettings, twoFactorAuth: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="login-notifications">اعلان‌های ورود</Label>
                  <p className="text-sm text-gray-500">دریافت اعلان هنگام ورود به حساب کاربری</p>
                </div>
                <Switch 
                  id="login-notifications"
                  checked={securitySettings.loginNotifications}
                  onCheckedChange={(checked) => 
                    setSecuritySettings({...securitySettings, loginNotifications: checked})
                  }
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="password-expiry">انقضای رمز عبور</Label>
                <p className="text-sm text-gray-500 mb-2">تنظیم دوره زمانی برای تغییر اجباری رمز عبور</p>
                <Select 
                  value={securitySettings.passwordExpiry}
                  onValueChange={(value) => 
                    setSecuritySettings({...securitySettings, passwordExpiry: value})
                  }
                >
                  <SelectTrigger id="password-expiry">
                    <SelectValue placeholder="انتخاب دوره زمانی" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">هرگز</SelectItem>
                    <SelectItem value="30days">هر 30 روز</SelectItem>
                    <SelectItem value="60days">هر 60 روز</SelectItem>
                    <SelectItem value="90days">هر 90 روز</SelectItem>
                    <SelectItem value="180days">هر 180 روز</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="ip-restriction">محدودیت آدرس IP</Label>
                  <p className="text-sm text-gray-500">محدود کردن دسترسی به حساب کاربری به آدرس‌های IP خاص</p>
                </div>
                <Switch 
                  id="ip-restriction"
                  checked={securitySettings.ipRestriction}
                  onCheckedChange={(checked) => 
                    setSecuritySettings({...securitySettings, ipRestriction: checked})
                  }
                />
              </div>
              
              <Button className="w-full" onClick={() => handleSaveSettings('امنیت')}>
                <Save className="h-4 w-4 ml-2" />
                ذخیره تنظیمات امنیتی
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* تنظیمات اعلان‌ها */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات اعلان‌ها</CardTitle>
              <CardDescription>نحوه دریافت اعلان‌ها را مدیریت کنید</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="email-notifications">اعلان‌های ایمیلی</Label>
                  <p className="text-sm text-gray-500">دریافت اعلان‌ها از طریق ایمیل</p>
                </div>
                <Switch 
                  id="email-notifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => 
                    setNotificationSettings({...notificationSettings, emailNotifications: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="sms-notifications">اعلان‌های پیامکی</Label>
                  <p className="text-sm text-gray-500">دریافت اعلان‌ها از طریق پیامک</p>
                </div>
                <Switch 
                  id="sms-notifications"
                  checked={notificationSettings.smsNotifications}
                  onCheckedChange={(checked) => 
                    setNotificationSettings({...notificationSettings, smsNotifications: checked})
                  }
                />
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-4">انواع اعلان‌ها</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="service-expiry">انقضای سرویس‌ها</Label>
                    <Switch 
                      id="service-expiry"
                      checked={notificationSettings.serviceExpiry}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, serviceExpiry: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="invoices-notification">فاکتورها</Label>
                    <Switch 
                      id="invoices-notification"
                      checked={notificationSettings.invoices}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, invoices: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tickets-notification">تیکت‌های پشتیبانی</Label>
                    <Switch 
                      id="tickets-notification"
                      checked={notificationSettings.supportTickets}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, supportTickets: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="news-notification">اخبار و اطلاعیه‌ها</Label>
                    <Switch 
                      id="news-notification"
                      checked={notificationSettings.news}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, news: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketing-notification">پیشنهادات ویژه</Label>
                    <Switch 
                      id="marketing-notification"
                      checked={notificationSettings.marketingOffers}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, marketingOffers: checked})
                      }
                    />
                  </div>
                </div>
              </div>
              
              <Button className="w-full" onClick={() => handleSaveSettings('اعلان‌ها')}>
                <Save className="h-4 w-4 ml-2" />
                ذخیره تنظیمات اعلان‌ها
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* تنظیمات حریم خصوصی */}
        <TabsContent value="privacy" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات حریم خصوصی</CardTitle>
              <CardDescription>نحوه استفاده از اطلاعات شما را مدیریت کنید</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="show-profile">نمایش پروفایل</Label>
                  <p className="text-sm text-gray-500">امکان مشاهده پروفایل شما توسط سایر کاربران</p>
                </div>
                <Switch 
                  id="show-profile"
                  checked={privacySettings.showProfile}
                  onCheckedChange={(checked) => 
                    setPrivacySettings({...privacySettings, showProfile: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="share-usage-stats">اشتراک آمار استفاده</Label>
                  <p className="text-sm text-gray-500">اشتراک آمار استفاده از سرویس‌ها برای بهبود کیفیت خدمات</p>
                </div>
                <Switch 
                  id="share-usage-stats"
                  checked={privacySettings.shareUsageStats}
                  onCheckedChange={(checked) => 
                    setPrivacySettings({...privacySettings, shareUsageStats: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="store-browsing-history">ذخیره تاریخچه مرور</Label>
                  <p className="text-sm text-gray-500">ذخیره تاریخچه مرور شما در پنل کاربری</p>
                </div>
                <Switch 
                  id="store-browsing-history"
                  checked={privacySettings.storeBrowsingHistory}
                  onCheckedChange={(checked) => 
                    setPrivacySettings({...privacySettings, storeBrowsingHistory: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="cookie-consent">استفاده از کوکی‌ها</Label>
                  <p className="text-sm text-gray-500">اجازه استفاده از کوکی‌ها برای بهبود تجربه کاربری</p>
                </div>
                <Switch 
                  id="cookie-consent"
                  checked={privacySettings.cookieConsent}
                  onCheckedChange={(checked) => 
                    setPrivacySettings({...privacySettings, cookieConsent: checked})
                  }
                />
              </div>
              
              <Button className="w-full" onClick={() => handleSaveSettings('حریم خصوصی')}>
                <Save className="h-4 w-4 ml-2" />
                ذخیره تنظیمات حریم خصوصی
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* تنظیمات نمایش */}
        <TabsContent value="display" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات نمایش</CardTitle>
              <CardDescription>نحوه نمایش اطلاعات در پنل کاربری را تنظیم کنید</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <Label htmlFor="language">زبان</Label>
                <Select 
                  value={displaySettings.language}
                  onValueChange={(value) => 
                    setDisplaySettings({...displaySettings, language: value})
                  }
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="انتخاب زبان" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fa">فارسی</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="theme">حالت نمایش</Label>
                <Select 
                  value={displaySettings.theme}
                  onValueChange={(value) => 
                    setDisplaySettings({...displaySettings, theme: value})
                  }
                >
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="انتخاب حالت نمایش" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">روشن</SelectItem>
                    <SelectItem value="dark">تاریک</SelectItem>
                    <SelectItem value="system">سیستمی</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="time-format">فرمت زمان</Label>
                <Select 
                  value={displaySettings.timeFormat}
                  onValueChange={(value) => 
                    setDisplaySettings({...displaySettings, timeFormat: value})
                  }
                >
                  <SelectTrigger id="time-format">
                    <SelectValue placeholder="انتخاب فرمت زمان" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12 ساعته</SelectItem>
                    <SelectItem value="24h">24 ساعته</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="date-format">فرمت تاریخ</Label>
                <Select 
                  value={displaySettings.dateFormat}
                  onValueChange={(value) => 
                    setDisplaySettings({...displaySettings, dateFormat: value})
                  }
                >
                  <SelectTrigger id="date-format">
                    <SelectValue placeholder="انتخاب فرمت تاریخ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jalali">شمسی</SelectItem>
                    <SelectItem value="gregorian">میلادی</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="timezone">منطقه زمانی</Label>
                <Select 
                  value={displaySettings.timezone}
                  onValueChange={(value) => 
                    setDisplaySettings({...displaySettings, timezone: value})
                  }
                >
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="انتخاب منطقه زمانی" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Tehran">تهران (GMT+3:30)</SelectItem>
                    <SelectItem value="Europe/London">لندن (GMT+0)</SelectItem>
                    <SelectItem value="America/New_York">نیویورک (GMT-5)</SelectItem>
                    <SelectItem value="Asia/Dubai">دبی (GMT+4)</SelectItem>
                    <SelectItem value="Europe/Istanbul">استانبول (GMT+3)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full" onClick={() => handleSaveSettings('نمایش')}>
                <Save className="h-4 w-4 ml-2" />
                ذخیره تنظیمات نمایش
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
