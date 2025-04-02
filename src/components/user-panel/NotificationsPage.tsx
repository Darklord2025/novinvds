
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, Bell, Trash2, Check, RefreshCw, ArrowLeft } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'success' | 'warning' | 'error' | 'info';
  read: boolean;
}

const NotificationsPage = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'تیکت پاسخ داده شد',
      message: 'تیکت شماره #4321 با موضوع "مشکل در اتصال به سرور مجازی" پاسخ داده شده است.',
      date: '1402/03/15 17:25',
      type: 'info',
      read: false
    },
    {
      id: '2',
      title: 'سرور راه‌اندازی شد',
      message: 'سرور مجازی شما با مشخصات Ubuntu 20.04 با موفقیت راه‌اندازی شد و آماده استفاده است.',
      date: '1402/03/14 09:10',
      type: 'success',
      read: false
    },
    {
      id: '3',
      title: 'فاکتور جدید صادر شد',
      message: 'فاکتور جدید به شماره #INV-1234 برای سرویس سرور مجازی شما صادر شده است. لطفاً نسبت به پرداخت آن اقدام نمایید.',
      date: '1402/03/10 14:30',
      type: 'warning',
      read: true
    },
    {
      id: '4',
      title: 'اتمام فضای دیسک',
      message: 'فضای دیسک سرور مجازی آلمان ۱ به بیش از 90% رسیده است. لطفاً نسبت به افزایش فضا یا پاکسازی فایل‌های اضافی اقدام نمایید.',
      date: '1402/03/05 11:15',
      type: 'error',
      read: true
    },
    {
      id: '5',
      title: 'تخفیف ویژه',
      message: 'به مناسبت عید سعید فطر، 20% تخفیف ویژه برای تمامی سرویس‌های هاستینگ و سرور مجازی در نظر گرفته شده است.',
      date: '1402/03/01 08:45',
      type: 'info',
      read: true
    }
  ]);
  
  const [activeTab, setActiveTab] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
    
    toast({
      title: "خوانده شدن اعلان‌ها",
      description: "تمام اعلان‌ها به عنوان خوانده شده علامت‌گذاری شدند.",
    });
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
    toast({
      title: "حذف اعلان‌ها",
      description: "تمام اعلان‌ها با موفقیت حذف شدند.",
    });
  };
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    setSelectedNotification(null);
    
    toast({
      title: "حذف اعلان",
      description: "اعلان با موفقیت حذف شد.",
    });
  };
  
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    if (activeTab === 'read') return notification.read;
    return notification.type === activeTab;
  });
  
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'info': default: return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };
  
  // تازه‌سازی صفحه
  const refreshNotifications = () => {
    const newNotification = {
      id: Date.now().toString(),
      title: 'اعلان جدید',
      message: 'این یک اعلان جدید آزمایشی است که به لیست اضافه شده است.',
      date: '1402/03/16 10:00',
      type: 'info' as const,
      read: false
    };
    
    setNotifications([newNotification, ...notifications]);
    
    toast({
      title: "تازه‌سازی",
      description: "اطلاعات اعلان‌ها با موفقیت به‌روزرسانی شد.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">اعلان‌ها</h1>
        <div className="space-x-2 space-x-reverse">
          <Button variant="outline" onClick={refreshNotifications} className="flex items-center">
            <RefreshCw className="ml-2 h-4 w-4" />
            بازخوانی
          </Button>
          <Button variant="outline" onClick={markAllAsRead} className="flex items-center">
            <Check className="ml-2 h-4 w-4" />
            خواندن همه
          </Button>
          <Button variant="outline" onClick={clearAllNotifications} className="flex items-center">
            <Trash2 className="ml-2 h-4 w-4" />
            پاک کردن همه
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
          <TabsTrigger value="all">همه</TabsTrigger>
          <TabsTrigger value="unread">خوانده نشده</TabsTrigger>
          <TabsTrigger value="read">خوانده شده</TabsTrigger>
          <TabsTrigger value="info">اطلاعات</TabsTrigger>
          <TabsTrigger value="success">موفقیت</TabsTrigger>
          <TabsTrigger value="warning">هشدار</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card key={notification.id} className={`cursor-pointer transition-all hover:shadow-md ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}>
                  <CardContent className="p-4" onClick={() => {
                    setSelectedNotification(notification);
                    markAsRead(notification.id);
                  }}>
                    <div className="flex items-start space-x-4 space-x-reverse">
                      <div className="p-2 rounded-full bg-gray-100">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{notification.title}</h3>
                          <span className="text-xs text-gray-500">{notification.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">هیچ اعلانی یافت نشد</h3>
              <p className="text-gray-500">در حال حاضر هیچ اعلانی برای نمایش وجود ندارد.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* دیالوگ جزئیات اعلان */}
      <Dialog open={!!selectedNotification} onOpenChange={(open) => !open && setSelectedNotification(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedNotification?.title}</DialogTitle>
            <DialogDescription className="text-right">{selectedNotification?.date}</DialogDescription>
          </DialogHeader>
          <div className="py-4 text-sm">
            {selectedNotification?.message}
          </div>
          <DialogFooter className="sm:justify-start flex items-center justify-between">
            <Button variant="destructive" onClick={() => selectedNotification && deleteNotification(selectedNotification.id)}>
              <Trash2 className="h-4 w-4 mr-2" />
              حذف اعلان
            </Button>
            <DialogClose asChild>
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 ml-2" />
                بستن
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationsPage;
