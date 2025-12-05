import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowRight, 
  Globe, 
  Server, 
  Shield, 
  Mail, 
  Database, 
  FileText,
  CheckCircle2,
  Circle,
  Lock,
  Key,
  HardDrive,
  Clock,
  ExternalLink,
  Copy,
  Eye,
  EyeOff,
  AlertTriangle,
  Zap,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';
import { toPersianDigits } from '@/lib/numberUtils';

interface HostingGatewayProps {
  serviceId: string;
  onBack?: () => void;
  onEnterPanel?: () => void;
}

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
  icon: React.ReactNode;
}

const HostingGateway: React.FC<HostingGatewayProps> = ({ serviceId, onBack, onEnterPanel }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'nameservers',
      title: 'تنظیم نیم‌سرورها',
      description: 'نیم‌سرورهای هاست را در پنل دامنه خود تنظیم کنید',
      completed: true,
      required: true,
      icon: <Server className="w-5 h-5" />
    },
    {
      id: 'ssl',
      title: 'فعال‌سازی SSL',
      description: 'گواهی SSL رایگان را برای دامنه خود فعال کنید',
      completed: true,
      required: true,
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 'email',
      title: 'ساخت ایمیل سازمانی',
      description: 'یک ایمیل با نام دامنه خود بسازید',
      completed: false,
      required: false,
      icon: <Mail className="w-5 h-5" />
    },
    {
      id: 'database',
      title: 'ساخت پایگاه داده',
      description: 'پایگاه داده MySQL برای سایت خود بسازید',
      completed: false,
      required: false,
      icon: <Database className="w-5 h-5" />
    },
    {
      id: 'backup',
      title: 'فعال‌سازی بک‌آپ',
      description: 'بک‌آپ خودکار روزانه را فعال کنید',
      completed: false,
      required: false,
      icon: <HardDrive className="w-5 h-5" />
    }
  ]);

  // Mock hosting data
  const hostingData = {
    name: 'هاست وردپرس پریمیوم',
    domain: 'example.ir',
    plan: 'پریمیوم',
    status: 'active',
    panelType: 'cPanel',
    panelUrl: 'https://cp.example.ir:2083',
    username: 'example_user',
    password: 'securePass123!',
    nameserver1: 'ns1.novinvds.com',
    nameserver2: 'ns2.novinvds.com',
    serverIp: '185.123.45.67',
    expiryDate: '2025-06-15',
    diskSpace: '10 GB',
    bandwidth: '100 GB'
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const requiredTasks = tasks.filter(t => t.required);
  const allRequiredCompleted = requiredTasks.every(t => t.completed);
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} کپی شد`);
  };

  const handleEnterPanel = () => {
    if (allRequiredCompleted) {
      if (onEnterPanel) {
        onEnterPanel();
      } else {
        window.open(hostingData.panelUrl, '_blank');
      }
    } else {
      toast.error('لطفاً ابتدا تمام مراحل الزامی را تکمیل کنید');
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-500" />
              {hostingData.name}
            </h1>
            <p className="text-muted-foreground">{hostingData.domain}</p>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-800">فعال</Badge>
      </div>

      {/* Progress Card */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-bold mb-1">دروازه ورود به هاست</h2>
              <p className="text-sm text-muted-foreground">
                برای ورود به پنل مدیریت هاست، مراحل زیر را تکمیل کنید
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">{toPersianDigits(progressPercent.toString())}٪</span>
              <span className="text-sm text-muted-foreground">تکمیل شده</span>
            </div>
          </div>
          <Progress value={progressPercent} className="h-3" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>{toPersianDigits(completedTasks.toString())} از {toPersianDigits(totalTasks.toString())} مرحله</span>
            <span>مراحل الزامی: {toPersianDigits(requiredTasks.filter(t => t.completed).length.toString())} از {toPersianDigits(requiredTasks.length.toString())}</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                چک‌لیست راه‌اندازی
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer hover:shadow-sm ${
                    task.completed 
                      ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                      : 'bg-muted/30 border-border hover:bg-muted/50'
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    task.completed ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'
                  }`}>
                    {task.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </span>
                      {task.required && (
                        <Badge variant="outline" className="text-xs bg-red-50 text-red-600 border-red-200">
                          الزامی
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                  <div className="shrink-0">
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Warning if not all required completed */}
          {!allRequiredCompleted && (
            <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/30">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-700 dark:text-yellow-400">
                برای ورود به پنل مدیریت هاست، ابتدا باید تمام مراحل الزامی را تکمیل کنید.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Access Info & Enter Button */}
        <div className="space-y-4">
          {/* Quick Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Settings className="w-4 h-4" />
                اطلاعات سرویس
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">پلن:</span>
                <span className="font-medium">{hostingData.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">کنترل پنل:</span>
                <Badge variant="outline">{hostingData.panelType}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">فضا:</span>
                <span className="font-medium">{hostingData.diskSpace}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">پهنای باند:</span>
                <span className="font-medium">{hostingData.bandwidth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">انقضا:</span>
                <span className="font-medium">{toPersianDigits(hostingData.expiryDate)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Access Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Key className="w-4 h-4" />
                اطلاعات دسترسی
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">نام کاربری</label>
                <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-lg">
                  <span className="flex-1 font-mono text-sm">{hostingData.username}</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => copyToClipboard(hostingData.username, 'نام کاربری')}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">رمز عبور</label>
                <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-lg">
                  <span className="flex-1 font-mono text-sm">
                    {showPassword ? hostingData.password : '••••••••••'}
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
                    onClick={() => copyToClipboard(hostingData.password, 'رمز عبور')}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nameservers */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Server className="w-4 h-4" />
                نیم‌سرورها
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[hostingData.nameserver1, hostingData.nameserver2].map((ns, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-muted/50 p-2 rounded-lg">
                  <span className="flex-1 font-mono text-sm">{ns}</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => copyToClipboard(ns, `نیم‌سرور ${idx + 1}`)}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Enter Panel Button */}
          <Button 
            onClick={handleEnterPanel}
            className={`w-full py-6 text-lg ${
              allRequiredCompleted 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' 
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
            disabled={!allRequiredCompleted}
          >
            {allRequiredCompleted ? (
              <>
                <Zap className="w-5 h-5 ml-2" />
                ورود به {hostingData.panelType}
                <ExternalLink className="w-4 h-4 mr-2" />
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 ml-2" />
                تکمیل مراحل الزامی
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HostingGateway;
