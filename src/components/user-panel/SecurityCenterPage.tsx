import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Key, 
  Smartphone, 
  Lock, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  EyeOff,
  Clock,
  MapPin,
  Monitor
} from 'lucide-react';

const SecurityCenterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [loginNotifications, setLoginNotifications] = useState(true);

  const securityScore = 85;
  
  const securityItems = [
    {
      title: 'رمز عبور قوی',
      status: 'completed',
      description: 'رمز عبور شما معیارهای امنیتی را رعایت می‌کند',
      icon: Lock
    },
    {
      title: 'احراز هویت دو مرحله‌ای',
      status: 'completed',
      description: 'محافظت اضافی برای حساب کاربری شما فعال است',
      icon: Smartphone
    },
    {
      title: 'نشست‌های فعال',
      status: 'warning',
      description: '3 نشست فعال روی دستگاه‌های مختلف',
      icon: Monitor
    },
    {
      title: 'بررسی آخرین ورود',
      status: 'completed',
      description: 'آخرین ورود: امروز ساعت 14:30 از تهران',
      icon: Clock
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'ورود موفق',
      device: 'Chrome - Windows',
      location: 'تهران، ایران',
      time: '2 ساعت پیش',
      ip: '185.123.45.67',
      status: 'success'
    },
    {
      id: 2,
      action: 'تغییر رمز عبور',
      device: 'Firefox - Android',
      location: 'تهران، ایران',
      time: '3 روز پیش',
      ip: '185.123.45.68',
      status: 'success'
    },
    {
      id: 3,
      action: 'تلاش ورود ناموفق',
      device: 'Chrome - Linux',
      location: 'مکان نامشخص',
      time: '1 هفته پیش',
      ip: '192.168.1.100',
      status: 'failed'
    }
  ];

  const activeSessions = [
    {
      id: 1,
      device: 'Chrome - Windows 11',
      location: 'تهران، ایران',
      lastActive: 'الان',
      current: true,
      ip: '185.123.45.67'
    },
    {
      id: 2,
      device: 'Safari - iPhone 14',
      location: 'تهران، ایران',
      lastActive: '1 ساعت پیش',
      current: false,
      ip: '185.123.45.68'
    },
    {
      id: 3,
      device: 'Firefox - Ubuntu',
      location: 'اصفهان، ایران',
      lastActive: '2 روز پیش',
      current: false,
      ip: '185.123.45.69'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Shield className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-6" dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">مرکز امنیت</h1>
        <p className="text-gray-600">مدیریت امنیت حساب کاربری و نظارت بر فعالیت‌ها</p>
      </div>

      {/* Security Score */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8 text-blue-500" />
                <div>
                  <h2 className="text-xl font-bold">امتیاز امنیت</h2>
                  <p className="text-gray-600">وضعیت کلی امنیت حساب شما</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{securityScore}%</div>
              <Badge variant="default" className="bg-green-500">
                عالی
              </Badge>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${securityScore}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Checklist */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>بررسی امنیت</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {getStatusIcon(item.status)}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <Button variant="outline" size="sm">
                  {item.status === 'completed' ? 'مدیریت' : 'تنظیم'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="settings">تنظیمات امنیت</TabsTrigger>
          <TabsTrigger value="activity">فعالیت‌های اخیر</TabsTrigger>
          <TabsTrigger value="sessions">نشست‌های فعال</TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات امنیتی</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password Management */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="font-medium">تغییر رمز عبور</h3>
                    <p className="text-sm text-gray-600">آخرین تغییر: 3 روز پیش</p>
                  </div>
                </div>
                <Button variant="outline">تغییر رمز</Button>
              </div>

              {/* Two-Factor Authentication */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-green-500" />
                  <div>
                    <h3 className="font-medium">احراز هویت دو مرحله‌ای</h3>
                    <p className="text-sm text-gray-600">محافظت اضافی با کد تأیید</p>
                  </div>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>

              {/* Login Notifications */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <div>
                    <h3 className="font-medium">اطلاع‌رسانی ورود</h3>
                    <p className="text-sm text-gray-600">دریافت پیام برای ورودهای جدید</p>
                  </div>
                </div>
                <Switch
                  checked={loginNotifications}
                  onCheckedChange={setLoginNotifications}
                />
              </div>

              {/* API Keys */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-purple-500" />
                  <div>
                    <h3 className="font-medium">کلیدهای API</h3>
                    <p className="text-sm text-gray-600">مدیریت دسترسی‌های API</p>
                  </div>
                </div>
                <Button variant="outline">مدیریت</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>فعالیت‌های اخیر</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' : 
                      activity.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{activity.action}</span>
                        <Badge variant={activity.status === 'success' ? 'default' : 'destructive'}>
                          {activity.status === 'success' ? 'موفق' : 'ناموفق'}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Monitor className="w-4 h-4" />
                            {activity.device}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {activity.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {activity.time}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">IP: {activity.ip}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sessions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>نشست‌های فعال</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeSessions.map(session => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Monitor className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{session.device}</span>
                          {session.current && (
                            <Badge variant="default" className="bg-green-500">
                              نشست جاری
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {session.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {session.lastActive}
                            </span>
                          </div>
                          <div className="mt-1 text-xs text-gray-500">IP: {session.ip}</div>
                        </div>
                      </div>
                    </div>
                    {!session.current && (
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        قطع نشست
                      </Button>
                    )}
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

export default SecurityCenterPage;