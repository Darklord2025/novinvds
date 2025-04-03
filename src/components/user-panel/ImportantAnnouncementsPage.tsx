
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, AlertCircle, Calendar, InfoIcon, Server } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Announcement {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: 'maintenance' | 'update' | 'service' | 'security' | 'promotion';
  importance: 'low' | 'medium' | 'high';
  read: boolean;
}

const ImportantAnnouncementsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'به‌روزرسانی امنیتی سرورها',
      summary: 'به‌روزرسانی امنیتی سرورهای لینوکس',
      content: 'به اطلاع می‌رساند که به‌روزرسانی امنیتی مهمی برای سرورهای لینوکس در تاریخ ۱۵ فروردین ۱۴۰۳ انجام خواهد شد. این به‌روزرسانی برای رفع آسیب‌پذیری‌های امنیتی اخیر ضروری است.\n\nدر طول این فرآیند، سرورهای شما ممکن است به مدت ۱۰-۱۵ دقیقه در دسترس نباشند. توصیه می‌کنیم قبل از زمان مشخص شده، برنامه‌های خود را به حالت تعمیر و نگهداری ببرید.\n\nاز همکاری شما سپاسگزاریم.',
      date: '2024-04-01',
      category: 'maintenance',
      importance: 'high',
      read: false
    },
    {
      id: '2',
      title: 'افزایش ظرفیت سرورهای مجازی',
      summary: 'ارتقاء ظرفیت و منابع سرورهای مجازی',
      content: 'به اطلاع مشتریان گرامی می‌رساند که در راستای بهبود کیفیت خدمات، ظرفیت و منابع سرورهای مجازی ما ارتقاء یافته است. از این پس، تمامی پلن‌های سرور مجازی با ۲۰٪ منابع بیشتر و بدون افزایش قیمت ارائه می‌شوند.\n\nمشتریان فعلی می‌توانند بدون هزینه اضافی از این ارتقاء بهره‌مند شوند. برای درخواست ارتقاء، با پشتیبانی تماس بگیرید.',
      date: '2024-03-20',
      category: 'service',
      importance: 'medium',
      read: true
    },
    {
      id: '3',
      title: 'تغییر در سیاست‌های قیمت‌گذاری',
      summary: 'تغییرات در قیمت‌گذاری سرویس‌ها از خرداد ۱۴۰۳',
      content: 'به اطلاع مشتریان گرامی می‌رساند که به دلیل تغییرات در هزینه‌های زیرساخت و نرخ ارز، قیمت‌های برخی از سرویس‌ها از ابتدای خرداد ۱۴۰۳ تغییر خواهد کرد.\n\nقراردادهای فعلی تا پایان دوره بدون تغییر باقی خواهند ماند و قیمت‌های جدید تنها برای سفارش‌های جدید و تمدیدهای پس از تاریخ مذکور اعمال می‌شود.\n\nفهرست کامل قیمت‌های جدید به زودی اعلام خواهد شد.',
      date: '2024-03-15',
      category: 'update',
      importance: 'medium',
      read: true
    },
    {
      id: '4',
      title: 'هشدار امنیتی: حمله DDoS',
      summary: 'هشدار در مورد افزایش حملات DDoS',
      content: 'به اطلاع می‌رساند که اخیراً شاهد افزایش حملات DDoS به زیرساخت‌های هاستینگ در سطح بین‌المللی بوده‌ایم. تیم امنیتی ما تمامی تدابیر لازم را برای محافظت از سرویس‌های شما به کار گرفته است.\n\nبا این حال، توصیه می‌کنیم اقدامات امنیتی اضافی را در نظر بگیرید، از جمله:\n- فعال‌سازی محافظت DDoS در پنل کاربری\n- استفاده از CDN برای وب‌سایت‌ها\n- بررسی منظم لاگ‌های سرور\n\nدر صورت مشاهده هرگونه مشکل، بلافاصله با پشتیبانی تماس بگیرید.',
      date: '2024-03-10',
      category: 'security',
      importance: 'high',
      read: false
    },
    {
      id: '5',
      title: 'تخفیف ویژه عید نوروز',
      summary: 'تخفیف ۳۰٪ برای تمامی سرویس‌ها',
      content: 'به مناسبت فرا رسیدن عید نوروز، نوین وی دی اس تخفیف ویژه ۳۰٪ برای تمامی سرویس‌های خود در نظر گرفته است. این تخفیف از تاریخ ۱ اسفند تا ۱۵ فروردین معتبر خواهد بود.\n\nبرای استفاده از این تخفیف، کافیست در هنگام سفارش، کد تخفیف NOWRUZ1403 را وارد نمایید.\n\nنوروزتان پیروز و سال نو مبارک!',
      date: '2024-02-20',
      category: 'promotion',
      importance: 'medium',
      read: true
    }
  ]);

  const markAllAsRead = () => {
    setAnnouncements(announcements.map(a => ({ ...a, read: true })));
  };

  const handleAnnouncementClick = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    
    // Mark as read
    if (!announcement.read) {
      setAnnouncements(announcements.map(a => 
        a.id === announcement.id ? { ...a, read: true } : a
      ));
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'maintenance':
        return <Server className="h-5 w-5" />;
      case 'security':
        return <AlertCircle className="h-5 w-5" />;
      case 'update':
        return <InfoIcon className="h-5 w-5" />;
      case 'promotion':
        return <Calendar className="h-5 w-5" />;
      default:
        return <Megaphone className="h-5 w-5" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch(category) {
      case 'maintenance':
        return 'تعمیر و نگهداری';
      case 'security':
        return 'امنیتی';
      case 'update':
        return 'به‌روزرسانی';
      case 'promotion':
        return 'تخفیف و پروموشن';
      case 'service':
        return 'سرویس‌ها';
      default:
        return category;
    }
  };

  const filteredAnnouncements = activeTab === 'all' 
    ? announcements 
    : announcements.filter(a => a.category === activeTab);

  const unreadCount = announcements.filter(a => !a.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">اطلاعیه‌های مهم</h1>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Badge className="bg-primary">{unreadCount} اطلاعیه جدید</Badge>
          )}
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            علامت‌گذاری همه به عنوان خوانده شده
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">همه</TabsTrigger>
          <TabsTrigger value="maintenance">تعمیر و نگهداری</TabsTrigger>
          <TabsTrigger value="security">امنیتی</TabsTrigger>
          <TabsTrigger value="update">به‌روزرسانی</TabsTrigger>
          <TabsTrigger value="service">سرویس‌ها</TabsTrigger>
          <TabsTrigger value="promotion">تخفیف‌ها</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 gap-4">
            {filteredAnnouncements.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Megaphone className="h-12 w-12 text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium">اطلاعیه‌ای وجود ندارد</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    در حال حاضر هیچ اطلاعیه‌ای برای این دسته‌بندی وجود ندارد
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredAnnouncements.map((announcement) => (
                <Card 
                  key={announcement.id} 
                  className={`cursor-pointer hover:border-primary transition-colors ${!announcement.read ? 'border-l-4 border-l-blue-600' : ''}`}
                  onClick={() => handleAnnouncementClick(announcement)}
                >
                  <CardContent className="p-4 flex items-start">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-3 ${
                      announcement.importance === 'high' 
                        ? 'bg-red-100 text-red-600' 
                        : announcement.importance === 'medium'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-gray-100 text-gray-600'
                    }`}>
                      {getCategoryIcon(announcement.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className={`font-medium ${!announcement.read ? 'text-blue-600' : 'text-gray-900'}`}>
                            {announcement.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">
                              {getCategoryTitle(announcement.category)}
                            </Badge>
                            <span className="text-xs text-gray-500">{announcement.date}</span>
                          </div>
                        </div>
                        {!announcement.read && (
                          <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {announcement.summary}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Announcement Dialog */}
      <Dialog open={selectedAnnouncement !== null} onOpenChange={(open) => !open && setSelectedAnnouncement(null)}>
        {selectedAnnouncement && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedAnnouncement.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">
                  {getCategoryTitle(selectedAnnouncement.category)}
                </Badge>
                <span className="text-sm text-gray-500">{selectedAnnouncement.date}</span>
              </div>
            </DialogHeader>
            <DialogDescription className="text-base py-4 whitespace-pre-line">
              {selectedAnnouncement.content}
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button>بستن</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default ImportantAnnouncementsPage;
