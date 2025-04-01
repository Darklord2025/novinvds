
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check, Trash2, X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface Notification {
  id: string;
  title: string;
  content: string;
  date: string;
  read: boolean;
  type: 'invoice' | 'ticket' | 'system' | 'service';
}

const NotificationsPage: React.FC = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'تیکت جدید پاسخ داده شد',
      content: 'تیکت شما با موضوع "مشکل در اتصال به سرور" پاسخ داده شد.',
      date: '۱۵ دقیقه پیش',
      read: false,
      type: 'ticket'
    },
    {
      id: '2',
      title: 'فاکتور جدید',
      content: 'فاکتور جدیدی برای تمدید سرور مجازی شما صادر شده است.',
      date: '۲ ساعت پیش',
      read: false,
      type: 'invoice'
    },
    {
      id: '3',
      title: 'رویداد سیستم',
      content: 'عملیات نگهداری برنامه‌ریزی شده در تاریخ ۲۵ خرداد ۱۴۰۲',
      date: 'دیروز',
      read: true,
      type: 'system'
    },
    {
      id: '4',
      title: 'سرویس جدید',
      content: 'سرویس جدید سرور اختصاصی شما با موفقیت راه‌اندازی شد.',
      date: '۲ روز پیش',
      read: true,
      type: 'service'
    },
    {
      id: '5',
      title: 'تخفیف ویژه',
      content: 'تخفیف ویژه ۳۰٪ برای مشتریان وفادار. کد تخفیف: LOYAL30',
      date: '۳ روز پیش',
      read: true,
      type: 'system'
    }
  ]);
  
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
    toast({
      title: "اعلان‌ها خوانده شد",
      description: "تمام اعلان‌ها به عنوان خوانده شده علامت‌گذاری شدند.",
      duration: 3000,
    });
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
    toast({
      title: "اعلان‌ها پاک شدند",
      description: "تمام اعلان‌ها با موفقیت حذف شدند.",
      duration: 3000,
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(
      notifications.filter(notification => notification.id !== id)
    );
    toast({
      description: "اعلان با موفقیت حذف شد.",
      duration: 3000,
    });
  };
  
  const viewNotification = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    setSelectedNotification(notification);
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'ticket': return <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Bell className="h-5 w-5" /></div>;
      case 'invoice': return <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600"><Bell className="h-5 w-5" /></div>;
      case 'system': return <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600"><Bell className="h-5 w-5" /></div>;
      case 'service': return <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600"><Bell className="h-5 w-5" /></div>;
      default: return <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"><Bell className="h-5 w-5" /></div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">اعلان‌ها</h1>
        <div className="flex space-x-2 space-x-reverse">
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="ml-2 h-4 w-4" />
            علامت‌گذاری همه به عنوان خوانده شده
          </Button>
          <Button variant="outline" className="text-red-500" onClick={deleteAllNotifications}>
            <Trash2 className="ml-2 h-4 w-4" />
            حذف همه اعلان‌ها
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>تمام اعلان‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">هیچ اعلانی وجود ندارد</h3>
              <p className="text-gray-500 mt-1">در حال حاضر اعلانی برای نمایش وجود ندارد.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`flex items-start p-4 rounded-lg border ${notification.read ? 'bg-white' : 'bg-blue-50 border-blue-200'}`}
                >
                  <div className="flex-shrink-0 ml-4">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 cursor-pointer" onClick={() => viewNotification(notification)}>
                    <div className="flex items-center justify-between">
                      <h3 className={`text-md ${notification.read ? 'font-medium' : 'font-bold'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500">{notification.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.content}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-2 text-gray-500 hover:text-red-500"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
        {selectedNotification && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedNotification.title}</DialogTitle>
              <DialogDescription className="text-left text-xs text-gray-500">
                {selectedNotification.date}
              </DialogDescription>
            </DialogHeader>
            <div className="p-4 bg-gray-50 rounded-md">
              <p>{selectedNotification.content}</p>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  بستن
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default NotificationsPage;
