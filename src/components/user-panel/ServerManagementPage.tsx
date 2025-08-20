import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Server, 
  Power, 
  RotateCcw, 
  Monitor, 
  Settings, 
  Activity, 
  HardDrive, 
  Cpu, 
  MemoryStick, 
  Network,
  Shield,
  Database,
  Terminal,
  FileText
} from 'lucide-react';

const ServerManagementPage = () => {
  const [selectedServer, setSelectedServer] = useState('vps-001');
  
  const servers = [
    {
      id: 'vps-001',
      name: 'VPS-001',
      type: 'مجازی',
      status: 'online',
      cpu: '4 هسته',
      ram: '8 گیگابایت',
      disk: '80 گیگابایت SSD',
      ip: '185.123.45.67',
      os: 'Ubuntu 22.04',
      uptime: '25 روز'
    },
    {
      id: 'dedicated-001',
      name: 'Dedicated-001',
      type: 'اختصاصی',
      status: 'online',
      cpu: 'Intel Xeon E5-2620',
      ram: '32 گیگابایت',
      disk: '1 ترابایت SSD',
      ip: '185.123.45.68',
      os: 'CentOS 8',
      uptime: '45 روز'
    }
  ];

  const currentServer = servers.find(s => s.id === selectedServer);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const serverActions = [
    { icon: Power, label: 'روشن/خاموش', action: 'power', color: 'bg-blue-500' },
    { icon: RotateCcw, label: 'ریست', action: 'restart', color: 'bg-orange-500' },
    { icon: Monitor, label: 'کنسول', action: 'console', color: 'bg-purple-500' },
    { icon: Settings, label: 'تنظیمات', action: 'settings', color: 'bg-gray-500' }
  ];

  return (
    <div className="p-6" dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">مدیریت سرورها</h1>
        <p className="text-gray-600">مدیریت و کنترل سرورهای شما</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Server List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">سرورهای من</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {servers.map(server => (
                <div
                  key={server.id}
                  onClick={() => setSelectedServer(server.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedServer === server.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{server.name}</span>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(server.status)}`}></div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>{server.type}</div>
                    <div>{server.ip}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Server Management */}
        <div className="lg:col-span-3">
          {currentServer && (
            <>
              {/* Server Info */}
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Server className="w-5 h-5" />
                      {currentServer.name}
                    </CardTitle>
                    <Badge variant={currentServer.status === 'online' ? 'default' : 'destructive'}>
                      {currentServer.status === 'online' ? 'آنلاین' : 'آفلاین'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-blue-500" />
                      <div>
                        <div className="text-sm text-gray-600">پردازنده</div>
                        <div className="font-medium">{currentServer.cpu}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MemoryStick className="w-4 h-4 text-green-500" />
                      <div>
                        <div className="text-sm text-gray-600">حافظه</div>
                        <div className="font-medium">{currentServer.ram}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-purple-500" />
                      <div>
                        <div className="text-sm text-gray-600">دیسک</div>
                        <div className="font-medium">{currentServer.disk}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Network className="w-4 h-4 text-orange-500" />
                      <div>
                        <div className="text-sm text-gray-600">IP</div>
                        <div className="font-medium">{currentServer.ip}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>عملیات سریع</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {serverActions.map(action => (
                      <Button
                        key={action.action}
                        variant="outline"
                        className="h-20 flex-col gap-2"
                      >
                        <action.icon className="w-6 h-6" />
                        <span className="text-sm">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Management */}
              <Card>
                <CardContent className="p-0">
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid grid-cols-5 w-full">
                      <TabsTrigger value="overview">نمای کلی</TabsTrigger>
                      <TabsTrigger value="monitoring">مانیتورینگ</TabsTrigger>
                      <TabsTrigger value="security">امنیت</TabsTrigger>
                      <TabsTrigger value="backup">پشتیبان‌گیری</TabsTrigger>
                      <TabsTrigger value="logs">لاگ‌ها</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="p-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Activity className="w-5 h-5 text-blue-500" />
                              <span className="font-medium">آپتایم</span>
                            </div>
                            <div className="text-2xl font-bold text-blue-600">{currentServer.uptime}</div>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Cpu className="w-5 h-5 text-green-500" />
                              <span className="font-medium">استفاده CPU</span>
                            </div>
                            <div className="text-2xl font-bold text-green-600">35%</div>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <MemoryStick className="w-5 h-5 text-purple-500" />
                              <span className="font-medium">استفاده RAM</span>
                            </div>
                            <div className="text-2xl font-bold text-purple-600">62%</div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium mb-3">مشخصات سیستم عامل</h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">سیستم عامل:</span>
                              <span className="font-medium mr-2">{currentServer.os}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">کرنل:</span>
                              <span className="font-medium mr-2">5.15.0-72</span>
                            </div>
                            <div>
                              <span className="text-gray-600">معماری:</span>
                              <span className="font-medium mr-2">x86_64</span>
                            </div>
                            <div>
                              <span className="text-gray-600">آخرین آپدیت:</span>
                              <span className="font-medium mr-2">2 روز پیش</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="monitoring" className="p-6">
                      <div className="text-center py-12">
                        <Monitor className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">مانیتورینگ پیشرفته</h3>
                        <p className="text-gray-600">نمودارها و آمارهای عملکرد سرور</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="security" className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-green-500" />
                            <div>
                              <div className="font-medium">فایروال</div>
                              <div className="text-sm text-gray-600">فعال و محافظت شده</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">تنظیمات</Button>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Terminal className="w-5 h-5 text-yellow-500" />
                            <div>
                              <div className="font-medium">دسترسی SSH</div>
                              <div className="text-sm text-gray-600">پورت 22 - فعال</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">مدیریت کلیدها</Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="backup" className="p-6">
                      <div className="text-center py-12">
                        <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">مدیریت پشتیبان‌گیری</h3>
                        <p className="text-gray-600">تنظیمات و زمان‌بندی بک‌آپ خودکار</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="logs" className="p-6">
                      <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">لاگ‌های سیستم</h3>
                        <p className="text-gray-600">مشاهده و تحلیل لاگ‌های سرور</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServerManagementPage;