
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, FileCode, FileZip } from 'lucide-react';

interface DownloadItem {
  id: string;
  name: string;
  description: string;
  fileType: string;
  size: string;
  icon: React.ReactNode;
}

const DownloadsPage = () => {
  const downloadItems: DownloadItem[] = [
    {
      id: '1',
      name: 'نرم‌افزار مدیریت سرور لینوکس',
      description: 'ابزار مدیریت از راه دور سرورهای لینوکس با امکانات پیشرفته',
      fileType: 'exe',
      size: '45 مگابایت',
      icon: <FileCode className="h-10 w-10 text-blue-500" />
    },
    {
      id: '2',
      name: 'راهنمای نصب و راه‌اندازی سرور مجازی',
      description: 'آموزش گام به گام نصب و راه‌اندازی سرور مجازی ویندوز و لینوکس',
      fileType: 'pdf',
      size: '12 مگابایت',
      icon: <FileText className="h-10 w-10 text-red-500" />
    },
    {
      id: '3',
      name: 'مجموعه اسکریپت‌های مدیریت هاستینگ',
      description: 'مجموعه‌ای از اسکریپت‌های کاربردی برای مدیریت هاستینگ وب',
      fileType: 'zip',
      size: '32 مگابایت',
      icon: <FileZip className="h-10 w-10 text-yellow-500" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Download className="h-6 w-6 text-blue-500 ml-2" />
        <h1 className="text-2xl font-bold">دانلود نرم‌افزارها و مستندات</h1>
      </div>
      
      <Tabs defaultValue="software">
        <TabsList className="mb-6">
          <TabsTrigger value="software">نرم‌افزارها</TabsTrigger>
          <TabsTrigger value="documentation">مستندات</TabsTrigger>
          <TabsTrigger value="scripts">اسکریپت‌ها</TabsTrigger>
        </TabsList>
        
        <TabsContent value="software">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloadItems.filter(item => item.fileType === 'exe').map(item => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">اندازه: {item.size}</span>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">.{item.fileType}</span>
                  </div>
                  <Button className="w-full">
                    <Download className="ml-2 h-4 w-4" /> دانلود
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="documentation">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloadItems.filter(item => item.fileType === 'pdf').map(item => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">اندازه: {item.size}</span>
                    <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">.{item.fileType}</span>
                  </div>
                  <Button className="w-full">
                    <Download className="ml-2 h-4 w-4" /> دانلود
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="scripts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloadItems.filter(item => item.fileType === 'zip').map(item => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">اندازه: {item.size}</span>
                    <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">.{item.fileType}</span>
                  </div>
                  <Button className="w-full">
                    <Download className="ml-2 h-4 w-4" /> دانلود
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DownloadsPage;
