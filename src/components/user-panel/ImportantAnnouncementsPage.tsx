
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Megaphone, Calendar, AlertCircle, Info } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'maintenance' | 'update' | 'alert' | 'info';
  important: boolean;
}

interface ImportantAnnouncementsPageProps {
  onViewAnnouncement: (announcement: Announcement) => void;
}

const ImportantAnnouncementsPage: React.FC<ImportantAnnouncementsPageProps> = ({ onViewAnnouncement }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');

  // Sample announcements data
  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'به‌روزرسانی سرورهای ابری',
      content: 'سرورهای ابری در تاریخ 15 شهریور بروزرسانی خواهند شد. لطفاً برای جلوگیری از اختلال در سرویس، تمهیدات لازم را در نظر بگیرید. این به‌روزرسانی شامل ارتقای سیستم عامل و به‌روزرسانی‌های امنیتی است.\n\nزمان تقریبی اختلال: 2 ساعت در بازه زمانی 2 تا 4 بامداد.\n\nاقدامات توصیه شده:\n1. بک‌آپ گیری از اطلاعات مهم\n2. اطلاع‌رسانی به کاربران\n3. برنامه‌ریزی برای زمان خاموشی\n\nدر صورت نیاز به اطلاعات بیشتر با پشتیبانی تماس بگیرید.',
      date: '1402/06/01',
      type: 'maintenance',
      important: true
    },
    {
      id: '2',
      title: 'افزایش ظرفیت دیتاسنتر',
      content: 'به اطلاع می‌رساند ظرفیت جدید سرورهای اختصاصی در دیتاسنتر اضافه شده است. برای سفارش سرورهای جدید با پشتیبانی تماس بگیرید یا از طریق پنل کاربری اقدام نمایید.\n\nویژگی‌های سرورهای جدید:\n- پردازنده‌های نسل جدید Intel\n- حافظه رم DDR5\n- دیسک‌های SSD NVMe با سرعت بالا\n- پهنای باند اختصاصی بیشتر\n\nبرای کسب اطلاعات بیشتر و مشاوره با کارشناسان ما تماس بگیرید.',
      date: '1402/05/20',
      type: 'update',
      important: true
    },
    {
      id: '3',
      title: 'اختلال موقت در سرویس DNS',
      content: 'به اطلاع می‌رساند به دلیل عملیات به‌روزرسانی، سرویس DNS ممکن است با اختلال موقت مواجه شود. این اختلال از ساعت 2 تا 4 بامداد فردا خواهد بود.\n\nدر این بازه زمانی ممکن است دسترسی به برخی وب‌سایت‌ها با تأخیر مواجه شود. پس از اتمام عملیات، سرویس به حالت عادی باز خواهد گشت.\n\nاز صبر و شکیبایی شما سپاسگزاریم.',
      date: '1402/06/18',
      type: 'alert',
      important: true
    },
    {
      id: '4',
      title: 'ارتقاء سطح امنیتی سرویس‌ها',
      content: 'سطح امنیتی تمامی سرورها و خدمات ارتقاء یافته است. توصیه می‌شود رمزهای عبور خود را تغییر دهید و از احراز هویت دو مرحله‌ای استفاده نمایید.\n\nاقدامات امنیتی جدید شامل:\n1. به‌روزرسانی فایروال‌ها\n2. پیاده‌سازی سیستم تشخیص نفوذ پیشرفته\n3. اسکن خودکار آسیب‌پذیری‌ها\n4. رمزنگاری پیشرفته برای داده‌های حساس\n\nبرای کسب اطلاعات بیشتر به بخش امنیت در مرکز راهنما مراجعه کنید.',
      date: '1402/06/05',
      type: 'info',
      important: true
    },
    {
      id: '5',
      title: 'تغییر در سیاست‌های پشتیبانی',
      content: 'به اطلاع کلیه مشتریان می‌رساند، از تاریخ 1 مهر 1402، تغییراتی در سیاست‌های پشتیبانی اعمال خواهد شد. این تغییرات شامل ساعات پاسخگویی، روش‌های تماس و زمان رسیدگی به درخواست‌ها می‌باشد.\n\nجزئیات این تغییرات در وب‌سایت رسمی قابل مشاهده است.\n\nاز همراهی شما سپاسگزاریم.',
      date: '1402/06/20',
      type: 'info',
      important: true
    }
  ];

  // Filter announcements based on search query and active tab
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && announcement.type === activeTab;
  });

  const getAnnouncementTypeIcon = (type: string) => {
    switch (type) {
      case 'maintenance':
        return <Calendar className="h-5 w-5 text-amber-500" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'update':
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAnnouncementTypeName = (type: string) => {
    switch (type) {
      case 'maintenance':
        return 'تعمیرات';
      case 'update':
        return 'به‌روزرسانی';
      case 'alert':
        return 'هشدار';
      case 'info':
      default:
        return 'اطلاعیه';
    }
  };

  const getAnnouncementTypeColor = (type: string) => {
    switch (type) {
      case 'maintenance':
        return 'bg-amber-100 text-amber-800';
      case 'update':
        return 'bg-green-100 text-green-800';
      case 'alert':
        return 'bg-red-100 text-red-800';
      case 'info':
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">اطلاعیه‌های مهم</h1>
          <p className="text-gray-500">آخرین اطلاعیه‌ها و به‌روزرسانی‌های مهم سیستم</p>
        </div>
        
        <div className="flex gap-2">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">تعداد اطلاعیه‌ها: {announcements.length}</Badge>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>اطلاعیه‌های سیستم</CardTitle>
              <CardDescription>آخرین اطلاعیه‌ها و به‌روزرسانی‌های سیستم</CardDescription>
            </div>
            
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="جستجو در اطلاعیه‌ها..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">همه</TabsTrigger>
              <TabsTrigger value="maintenance">تعمیرات</TabsTrigger>
              <TabsTrigger value="update">به‌روزرسانی</TabsTrigger>
              <TabsTrigger value="info">اطلاعیه‌ها</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredAnnouncements.length > 0 ? (
                  filteredAnnouncements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => onViewAnnouncement(announcement)}
                    >
                      <div className="flex items-start gap-4">
                        <div>
                          {getAnnouncementTypeIcon(announcement.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                            <h3 className="font-medium text-gray-900">
                              {announcement.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-0.5 rounded ${getAnnouncementTypeColor(announcement.type)}`}>
                                {getAnnouncementTypeName(announcement.type)}
                              </span>
                              <span className="text-xs text-gray-500">{announcement.date}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {announcement.content}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewAnnouncement(announcement);
                            }}
                          >
                            مشاهده جزئیات
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Megaphone className="h-12 w-12 mx-auto text-gray-300" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">اطلاعیه‌ای یافت نشد</h3>
                    <p className="mt-2 text-gray-500">
                      {searchQuery ? "جستجوی شما نتیجه‌ای نداشت. لطفاً عبارت جستجو را تغییر دهید." : "در حال حاضر اطلاعیه‌ای وجود ندارد."}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportantAnnouncementsPage;
