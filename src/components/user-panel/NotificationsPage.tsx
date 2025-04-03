
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, AlertCircle, InfoIcon, Settings, Calendar, Package, CreditCard } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'system' | 'billing' | 'service' | 'security';
  read: boolean;
  icon: React.ElementType;
  priority: 'low' | 'medium' | 'high';
}

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'سرور مجازی شما ریست شد',
      content: 'سرور مجازی شما با شناسه vps-123 با موفقیت ریست شد. سیستم عامل Ubuntu 22.04 نصب شده و سرور آماده استفاده است. نام کاربری و رمز عبور پیش‌فرض در ایمیل برای شما ارسال شده است.',
      date: '2024-04-02',
      type: 'service',
      read: false,
      icon: Settings,
      priority: 'medium'
    },
    {
      id: '2',
      title: 'نزدیک شدن به پایان اعتبار دامنه',
      content: 'دامنه example.com شما در تاریخ 2024-05-15 منقضی خواهد شد. لطفاً برای جلوگیری از قطع سرویس، نسبت به تمدید آن اقدام فرمایید. دامنه‌های منقضی شده ممکن است توسط دیگران ثبت شوند.',
      date: '2024-04-01',
      type: 'service',
      read: false,
      icon: Calendar,
      priority: 'high'
    },
    {
      id: '3',
      title: 'تخفیف ویژه هاست وردپرس',
      content: 'به مناسبت عید نوروز، تخفیف ۳۰٪ برای خرید و ارتقاء هاست‌های وردپرس در نظر گرفته شده است. این تخفیف تا تاریخ ۱۵ فروردین ۱۴۰۳ اعتبار دارد.',
      date: '2024-03-20',
      type: 'billing',
      read: true,
      icon: Package,
      priority: 'medium'
    },
    {
      id: '4',
      title: 'صدور فاکتور جدید',
      content: 'فاکتور جدیدی برای تمدید سرور مجازی شما با شناسه vps-123 صادر شده است. لطفاً نسبت به پرداخت آن تا قبل از تاریخ سررسید اقدام نمایید تا سرویس شما بدون وقفه ادامه یابد.',
      date: '2024-03-15',
      type: 'billing',
      read: true,
      icon: CreditCard,
      priority: 'high'
    },
    {
      id: '5',
      title: 'بروزرسانی قوانین استفاده از خدمات',
      content: 'قوانین استفاده از خدمات نوین وی دی اس بروزرسانی شده است. لطفاً قوانین جدید را مطالعه کرده و در صورت داشتن هرگونه سوال با پشتیبانی تماس بگیرید.',
      date: '2024-03-10',
      type: 'system',
      read: true,
      icon: InfoIcon,
      priority: 'low'
    },
    {
      id: '6',
      title: 'هشدار امنیتی: تلاش ناموفق برای ورود',
      content: 'چندین تلاش ناموفق برای ورود به حساب کاربری شما ثبت شده است. اگر این تلاش‌ها توسط شما انجام نشده است، لطفاً رمز عبور خود را تغییر دهید و احراز هویت دو مرحله‌ای را فعال کنید.',
      date: '2024-03-05',
      type: 'security',
      read: false,
      icon: AlertCircle,
      priority: 'high'
    },
  ]);

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    
    // Mark notification as read
    if (!notification.read) {
      setNotifications(notifications.map(n => 
        n.id === notification.id ? { ...n, read: true } : n
      ));
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    if (selectedNotification?.id === id) {
      setSelectedNotification(null);
    }
  };

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">اعلان‌ها</h1>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Badge className="bg-primary">{unreadCount} اعلان جدید</Badge>
          )}
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            علامت‌گذاری همه به عنوان خوانده شده
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">همه</TabsTrigger>
          <TabsTrigger value="system">سیستم</TabsTrigger>
          <TabsTrigger value="billing">مالی</TabsTrigger>
          <TabsTrigger value="service">سرویس‌ها</TabsTrigger>
          <TabsTrigger value="security">امنیتی</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[60vh] rounded-md border">
                <div className="divide-y">
                  {filteredNotifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <Bell className="h-12 w-12 text-gray-400 mb-3" />
                      <h3 className="text-lg font-medium">اعلانی وجود ندارد</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        در حال حاضر اعلانی برای شما وجود ندارد
                      </p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-4 flex cursor-pointer hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-3 ${
                          notification.priority === 'high' 
                            ? 'bg-red-100 text-red-600' 
                            : notification.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-gray-100 text-gray-600'
                        }`}>
                          <notification.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className={`font-medium ${!notification.read ? 'text-blue-600' : ''}`}>
                              {notification.title}
                              {!notification.read && (
                                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full ml-2"></span>
                              )}
                            </h3>
                            <span className="text-xs text-gray-500">{notification.date}</span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                            {notification.content}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Notification Dialog */}
      <Dialog open={selectedNotification !== null} onOpenChange={(open) => !open && setSelectedNotification(null)}>
        {selectedNotification && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{selectedNotification.title}</DialogTitle>
              <div className="flex items-center justify-between mt-2">
                <Badge className={
                  selectedNotification.type === 'system' ? 'bg-gray-500' :
                  selectedNotification.type === 'billing' ? 'bg-green-500' :
                  selectedNotification.type === 'service' ? 'bg-blue-500' :
                  'bg-red-500'
                }>
                  {selectedNotification.type === 'system' ? 'سیستم' :
                   selectedNotification.type === 'billing' ? 'مالی' :
                   selectedNotification.type === 'service' ? 'سرویس' :
                   'امنیتی'}
                </Badge>
                <span className="text-sm text-gray-500">{selectedNotification.date}</span>
              </div>
            </DialogHeader>
            <DialogDescription className="text-base py-4 whitespace-pre-line">
              {selectedNotification.content}
            </DialogDescription>
            <DialogFooter className="sm:justify-between">
              <Button 
                variant="destructive" 
                onClick={() => deleteNotification(selectedNotification.id)}
              >
                حذف اعلان
              </Button>
              <DialogClose asChild>
                <Button variant="outline">بستن</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default NotificationsPage;
