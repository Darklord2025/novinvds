
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Search, Filter, FileIcon } from 'lucide-react';

const DownloadsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const downloads = [
    {
      id: '1',
      title: 'راهنمای نصب سرور مجازی لینوکس',
      category: 'documentation',
      type: 'pdf',
      size: '2.5 MB',
      date: '1403/02/15',
      downloadCount: 354,
    },
    {
      id: '2',
      title: 'آموزش پیکربندی سرویس DNS',
      category: 'documentation',
      type: 'pdf',
      size: '1.8 MB',
      date: '1403/01/20',
      downloadCount: 215,
    },
    {
      id: '3',
      title: 'نرم‌افزار کانکشن SSH برای ویندوز',
      category: 'software',
      type: 'exe',
      size: '15.2 MB',
      date: '1402/11/05',
      downloadCount: 432,
    },
    {
      id: '4',
      title: 'نرم‌افزار مدیریت فایل FTP',
      category: 'software',
      type: 'exe',
      size: '24.7 MB',
      date: '1402/10/12',
      downloadCount: 198,
    },
    {
      id: '5',
      title: 'قالب وردپرس اختصاصی',
      category: 'script',
      type: 'zip',
      size: '8.3 MB',
      date: '1402/09/18',
      downloadCount: 127,
    },
    {
      id: '6',
      title: 'پلاگین امنیتی وردپرس',
      category: 'script',
      type: 'zip',
      size: '4.1 MB',
      date: '1402/08/30',
      downloadCount: 256,
    },
  ];
  
  // Filter downloads based on search query and active tab
  const filterDownloads = (category) => {
    let filtered = downloads;
    
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }
    
    return filtered;
  };
  
  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileIcon className="text-red-500" />;
      case 'exe':
        return <FileIcon className="text-blue-500" />;
      case 'zip':
        return <FileIcon className="text-yellow-500" />;
      default:
        return <FileIcon className="text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">دانلودها</h2>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="جستجو در دانلودها..."
            className="pl-10 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchQuery('')}
            >
              ×
            </button>
          )}
        </div>
        
        <Button variant="outline" className="gap-2">
          <Filter size={18} />
          فیلتر
        </Button>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="all">همه</TabsTrigger>
          <TabsTrigger value="documentation">مستندات</TabsTrigger>
          <TabsTrigger value="software">نرم‌افزارها</TabsTrigger>
          <TabsTrigger value="script">اسکریپت‌ها</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4">
            {filterDownloads('all').map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  {getFileIcon(item.type)}
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span>نوع: {item.type.toUpperCase()}</span>
                      <span>حجم: {item.size}</span>
                      <span>تاریخ: {item.date}</span>
                      <span>{item.downloadCount} دانلود</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="gap-2">
                  <Download size={16} />
                  دانلود
                </Button>
              </div>
            ))}
            
            {filterDownloads('all').length === 0 && (
              <div className="text-center py-10">
                <Download className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">هیچ فایلی یافت نشد</h3>
                <p className="mt-1 text-gray-500">لطفاً عبارت دیگری را جستجو کنید</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="documentation" className="mt-6">
          <div className="grid gap-4">
            {filterDownloads('documentation').map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  {getFileIcon(item.type)}
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span>نوع: {item.type.toUpperCase()}</span>
                      <span>حجم: {item.size}</span>
                      <span>تاریخ: {item.date}</span>
                      <span>{item.downloadCount} دانلود</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="gap-2">
                  <Download size={16} />
                  دانلود
                </Button>
              </div>
            ))}
            
            {filterDownloads('documentation').length === 0 && (
              <div className="text-center py-10">
                <Download className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">هیچ مستندی یافت نشد</h3>
                <p className="mt-1 text-gray-500">لطفاً عبارت دیگری را جستجو کنید</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="software" className="mt-6">
          <div className="grid gap-4">
            {filterDownloads('software').map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  {getFileIcon(item.type)}
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span>نوع: {item.type.toUpperCase()}</span>
                      <span>حجم: {item.size}</span>
                      <span>تاریخ: {item.date}</span>
                      <span>{item.downloadCount} دانلود</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="gap-2">
                  <Download size={16} />
                  دانلود
                </Button>
              </div>
            ))}
            
            {filterDownloads('software').length === 0 && (
              <div className="text-center py-10">
                <Download className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">هیچ نرم‌افزاری یافت نشد</h3>
                <p className="mt-1 text-gray-500">لطفاً عبارت دیگری را جستجو کنید</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="script" className="mt-6">
          <div className="grid gap-4">
            {filterDownloads('script').map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  {getFileIcon(item.type)}
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span>نوع: {item.type.toUpperCase()}</span>
                      <span>حجم: {item.size}</span>
                      <span>تاریخ: {item.date}</span>
                      <span>{item.downloadCount} دانلود</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="gap-2">
                  <Download size={16} />
                  دانلود
                </Button>
              </div>
            ))}
            
            {filterDownloads('script').length === 0 && (
              <div className="text-center py-10">
                <Download className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">هیچ اسکریپتی یافت نشد</h3>
                <p className="mt-1 text-gray-500">لطفاً عبارت دیگری را جستجو کنید</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DownloadsPage;
