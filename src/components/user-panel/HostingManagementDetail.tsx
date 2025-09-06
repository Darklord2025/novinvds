import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  ArrowLeft, 
  Globe, 
  Database, 
  Mail, 
  Shield, 
  FileText, 
  Settings, 
  Power, 
  Monitor, 
  Copy,
  Eye,
  EyeOff,
  Download,
  Upload,
  Wifi,
  HardDrive,
  MemoryStick,
  Cpu,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  Server,
  Lock,
  Key,
  Archive,
  Activity
} from 'lucide-react';
import { toast } from 'sonner';

interface HostingManagementDetailProps {
  serviceId: string;
  onBack?: () => void;
}

const HostingManagementDetail: React.FC<HostingManagementDetailProps> = ({ serviceId, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hostingStatus, setHostingStatus] = useState<'active' | 'suspended' | 'maintenance'>('active');

  // Mock data for hosting service
  const hostingData = {
    id: serviceId,
    name: 'هاست وردپرس پریمیوم',
    domain: 'example.ir',
    plan: 'پریمیوم',
    status: hostingStatus,
    cpanelUrl: 'https://cp.example.ir:2083',
    cpanelUsername: 'example_user',
    cpanelPassword: 'securePass123!',
    ftpHost: 'ftp.example.ir',
    ftpUsername: 'example_ftp',
    ftpPassword: 'ftpPass456!',
    databaseHost: 'localhost',
    databaseName: 'example_db',
    databaseUser: 'example_dbuser',
    databasePassword: 'dbPass789!',
    diskUsage: 45,
    diskQuota: 10240, // 10GB in MB
    bandwidthUsage: 75,
    bandwidthQuota: 100000, // 100GB in MB
    emailAccounts: 5,
    emailQuota: 50,
    databases: 3,
    databaseQuota: 10,
    subdomains: 2,
    subdomainQuota: 15,
    setupDate: '2024-01-15',
    expiryDate: '2025-01-15',
    autoRenewal: true,
    sslStatus: 'active',
    backupStatus: 'enabled',
    phpVersion: '8.2'
  };

  const handlePowerAction = async (action: string) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(`عملیات ${action} با موفقیت انجام شد`);
    } catch (error) {
      toast.error('خطا در انجام عملیات');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} کپی شد`);
  };

  const getStatusBadge = () => {
    switch (hostingData.status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">فعال</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">تعلیق شده</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-800">در حال تعمیر</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">نامشخص</Badge>;
    }
  };

  const formatBytes = (bytes: number) => {
    return `${(bytes / 1024).toFixed(1)} گیگابایت`;
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fa-IR').format(new Date(dateString));
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {onBack && (
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-500" />
              {hostingData.name}
            </h1>
            <p className="text-gray-600">{hostingData.domain}</p>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      {/* Status Alert */}
      {hostingData.status === 'suspended' && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            این هاستینگ در حال حاضر تعلیق شده است. برای فعال‌سازی با پشتیبانی تماس بگیرید.
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          onClick={() => window.open(hostingData.cpanelUrl, '_blank')}
          className="flex items-center gap-2"
        >
          <Monitor className="w-4 h-4" />
          cPanel
        </Button>
        <Button 
          variant="outline" 
          onClick={() => handlePowerAction('backup')}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <Archive className="w-4 h-4" />
          پشتیبان‌گیری
        </Button>
        <Button 
          variant="outline" 
          onClick={() => handlePowerAction('ssl-renew')}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <Shield className="w-4 h-4" />
          تمدید SSL
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">نمای کلی</TabsTrigger>
          <TabsTrigger value="files">مدیریت فایل</TabsTrigger>
          <TabsTrigger value="database">پایگاه داده</TabsTrigger>
          <TabsTrigger value="email">ایمیل</TabsTrigger>
          <TabsTrigger value="security">امنیت</TabsTrigger>
          <TabsTrigger value="backup">پشتیبان</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-500" />
                  مشخصات هاستینگ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">پلن:</span>
                    <p className="font-medium">{hostingData.plan}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">دامنه:</span>
                    <p className="font-medium">{hostingData.domain}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">تاریخ راه‌اندازی:</span>
                    <p className="font-medium">{formatDate(hostingData.setupDate)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">تاریخ انقضا:</span>
                    <p className="font-medium">{formatDate(hostingData.expiryDate)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">نسخه PHP:</span>
                    <p className="font-medium">{hostingData.phpVersion}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">تمدید خودکار:</span>
                    <p className="font-medium">{hostingData.autoRenewal ? 'فعال' : 'غیرفعال'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Access Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-green-500" />
                  اطلاعات دسترسی
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* cPanel Access */}
                <div>
                  <Label className="text-sm font-medium">cPanel</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">URL:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono">{hostingData.cpanelUrl}</span>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => copyToClipboard(hostingData.cpanelUrl, 'آدرس cPanel')}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">نام کاربری:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono">{hostingData.cpanelUsername}</span>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => copyToClipboard(hostingData.cpanelUsername, 'نام کاربری cPanel')}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">رمز عبور:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono">
                          {showPassword ? hostingData.cpanelPassword : '••••••••••'}
                        </span>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => copyToClipboard(hostingData.cpanelPassword, 'رمز عبور cPanel')}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resource Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-500" />
                مصرف منابع
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-blue-500" />
                      فضای دیسک
                    </span>
                    <span className="text-sm text-gray-600">
                      {formatBytes(hostingData.diskUsage * 1024)} / {formatBytes(hostingData.diskQuota * 1024)}
                    </span>
                  </div>
                  <Progress value={hostingData.diskUsage} className="h-2" />
                  <span className="text-xs text-gray-500">{hostingData.diskUsage}% استفاده شده</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-green-500" />
                      پهنای باند
                    </span>
                    <span className="text-sm text-gray-600">
                      {formatBytes(hostingData.bandwidthUsage * 1024)} / {formatBytes(hostingData.bandwidthQuota * 1024)}
                    </span>
                  </div>
                  <Progress value={hostingData.bandwidthUsage} className="h-2" />
                  <span className="text-xs text-gray-500">{hostingData.bandwidthUsage}% استفاده شده</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4 text-orange-500" />
                      اکانت ایمیل
                    </span>
                    <span className="text-sm text-gray-600">
                      {hostingData.emailAccounts} / {hostingData.emailQuota}
                    </span>
                  </div>
                  <Progress value={(hostingData.emailAccounts / hostingData.emailQuota) * 100} className="h-2" />
                  <span className="text-xs text-gray-500">{hostingData.emailAccounts} اکانت ایجاد شده</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Database className="w-4 h-4 text-purple-500" />
                      پایگاه داده
                    </span>
                    <span className="text-sm text-gray-600">
                      {hostingData.databases} / {hostingData.databaseQuota}
                    </span>
                  </div>
                  <Progress value={(hostingData.databases / hostingData.databaseQuota) * 100} className="h-2" />
                  <span className="text-xs text-gray-500">{hostingData.databases} دیتابیس ایجاد شده</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                مدیریت فایل‌ها
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">دسترسی FTP</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">سرور:</span>
                      <span className="text-sm font-mono">{hostingData.ftpHost}</span>
                    </div>
                    <div className="flex justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">نام کاربری:</span>
                      <span className="text-sm font-mono">{hostingData.ftpUsername}</span>
                    </div>
                    <div className="flex justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">پورت:</span>
                      <span className="text-sm font-mono">21</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">عملیات سریع</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="w-4 h-4 ml-2" />
                      آپلود فایل
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 ml-2" />
                      دانلود پشتیبان
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Archive className="w-4 h-4 ml-2" />
                      مدیریت فشرده
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-500" />
                مدیریت پایگاه داده
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">اطلاعات اتصال</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>سرور پایگاه داده</Label>
                    <div className="flex items-center gap-2">
                      <Input value={hostingData.databaseHost} readOnly />
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(hostingData.databaseHost, 'سرور پایگاه داده')}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>نام پایگاه داده</Label>
                    <div className="flex items-center gap-2">
                      <Input value={hostingData.databaseName} readOnly />
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(hostingData.databaseName, 'نام پایگاه داده')}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>نام کاربری</Label>
                    <div className="flex items-center gap-2">
                      <Input value={hostingData.databaseUser} readOnly />
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(hostingData.databaseUser, 'نام کاربری پایگاه داده')}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>رمز عبور</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        value={hostingData.databasePassword} 
                        readOnly 
                      />
                      <Button size="sm" variant="outline" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(hostingData.databasePassword, 'رمز عبور پایگاه داده')}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button>
                <Database className="w-4 h-4 ml-2" />
                مدیریت phpMyAdmin
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-orange-500" />
                مدیریت ایمیل
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Mail className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <div className="text-2xl font-bold">{hostingData.emailAccounts}</div>
                    <div className="text-sm text-gray-600">اکانت ایمیل</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <div className="text-2xl font-bold">فعال</div>
                    <div className="text-sm text-gray-600">فیلتر اسپم</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                    <div className="text-2xl font-bold">5 روز</div>
                    <div className="text-sm text-gray-600">مدت نگهداری</div>
                  </CardContent>
                </Card>
              </div>
              
              <Button>
                <Mail className="w-4 h-4 ml-2" />
                ایجاد اکانت ایمیل جدید
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-500" />
                تنظیمات امنیتی
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">گواهی SSL</h3>
                        <p className="text-sm text-gray-600">وضعیت: {hostingData.sslStatus === 'active' ? 'فعال' : 'غیرفعال'}</p>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">فایروال</h3>
                        <p className="text-sm text-gray-600">محافظت در برابر حملات</p>
                      </div>
                      <Shield className="w-6 h-6 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">تنظیمات دسترسی</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>دسترسی FTP امن</Label>
                      <p className="text-sm text-gray-600">استفاده از SFTP</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>محدودسازی IP</Label>
                      <p className="text-sm text-gray-600">محدود کردن دسترسی به IP خاص</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="w-5 h-5 text-green-500" />
                مدیریت پشتیبان
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">پشتیبان‌گیری خودکار</h3>
                      <Switch defaultChecked={hostingData.backupStatus === 'enabled'} />
                    </div>
                    <p className="text-sm text-gray-600">
                      پشتیبان‌گیری روزانه در ساعت 2 شب انجام می‌شود
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                      <div className="text-sm font-medium">آخرین پشتیبان</div>
                      <div className="text-xs text-gray-600">امروز - 02:15</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Archive className="w-4 h-4 ml-2" />
                  ایجاد پشتیبان فوری
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 ml-2" />
                  دانلود آخرین پشتیبان
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 ml-2" />
                  بازیابی از پشتیبان
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HostingManagementDetail;