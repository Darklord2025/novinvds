
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Calendar, Check, Info, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  title: string;
  content: string;
  type: "error" | "info" | "warning" | "success";
  date: string;
  read: boolean;
}

interface NotificationsPageProps {
  onViewNotification: (notification: Notification) => void;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ onViewNotification }) => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Mock data for notifications
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'تیکت شما پاسخ داده شد',
      content: 'تیکت شما با موضوع "مشکل در اتصال به سرور" توسط کارشناسان پشتیبانی پاسخ داده شد. برای مشاهده پاسخ به بخش تیکت‌ها مراجعه کنید.',
      type: 'success',
      date: '1402/02/15',
      read: false
    },
    {
      id: '2',
      title: 'فاکتور جدید صادر شد',
      content: 'فاکتور جدیدی برای تمدید سرویس سرور مجازی شما صادر شده است. لطفاً نسبت به پرداخت آن اقدام فرمایید.',
      type: 'info',
      date: '1402/02/10',
      read: true
    },
    {
      id: '3',
      title: 'هشدار استفاده از منابع',
      content: 'میزان استفاده از پهنای باند سرور مجازی شما به 80% رسیده است. در صورت نیاز به پهنای باند بیشتر، نسبت به ارتقای سرویس خود اقدام نمایید.',
      type: 'warning',
      date: '1402/02/05',
      read: false
    },
    {
      id: '4',
      title: 'قطعی سرویس',
      content: 'به دلیل بروزرسانی زیرساخت‌ها، سرویس شما از ساعت 2 تا 4 بامداد فردا با قطعی موقت مواجه خواهد بود.',
      type: 'error',
      date: '1402/02/01',
      read: true
    }
  ];
  
  const filterNotifications = (status: string) => {
    switch (status) {
      case 'unread':
        return notifications.filter(notification => !notification.read);
      case 'read':
        return notifications.filter(notification => notification.read);
      default:
        return notifications;
    }
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">موفقیت</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">هشدار</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">خطا</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">اطلاعیه</Badge>;
    }
  };
  
  const handleViewNotification = (notification: Notification) => {
    if (onViewNotification) {
      onViewNotification(notification);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">اعلان‌ها</h1>
          <p className="text-gray-500 mt-1">مدیریت و مشاهده اعلان‌های سیستم</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-blue-600" />
          <Badge className="bg-blue-100 text-blue-800">{notifications.filter(n => !n.read).length} اعلان جدید</Badge>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>اعلان‌های سیستم</CardTitle>
          <CardDescription>تمام اعلان‌ها و هشدارهای مربوط به سرویس‌های شما</CardDescription>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">همه</TabsTrigger>
              <TabsTrigger value="unread">خوانده نشده</TabsTrigger>
              <TabsTrigger value="read">خوانده شده</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filterNotifications(activeTab).length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 mx-auto text-gray-300" />
                <p className="mt-4 text-gray-500">اعلانی برای نمایش وجود ندارد</p>
              </div>
            ) : (
              filterNotifications(activeTab).map((notification) => (
                <div 
                  key={notification.id} 
                  className={`border rounded-lg p-4 ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4 space-x-reverse">
                      <div className="p-2 bg-white rounded-full border">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{notification.title}</h4>
                          {!notification.read && <span className="h-2 w-2 bg-blue-500 rounded-full"></span>}
                          {getNotificationBadge(notification.type)}
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2">{notification.content}</p>
                        <div className="flex items-center text-xs text-gray-400">
                          <Calendar className="h-3 w-3 ml-1" />
                          {notification.date}
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewNotification(notification)}
                    >
                      مشاهده
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;
