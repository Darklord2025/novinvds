import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Users, DollarSign, Share, Gift, Copy, QrCode, BarChart3, Calendar, TrendingUp } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { toPersianDigits } from '@/lib/numberUtils';

const AffiliateCenter: React.FC = () => {
  const [affiliateCode] = useState('AFC۱۲۳۴۵۶');
  const [referralLink] = useState(`https://novinvds.com/register?ref=AFC۱۲۳۴۵۶`);
  
  // Mock data
  const [stats] = useState({
    totalEarnings: 2500000,
    pendingCommissions: 450000,
    totalReferrals: 24,
    activeReferrals: 18,
    conversionRate: 75,
    thisMonthEarnings: 650000
  });

  const [referrals] = useState([
    {
      id: 'ref_001',
      username: 'user123',
      email: 'user@example.com',
      joinDate: '2024-01-15',
      status: 'Active',
      totalSpent: 1200000,
      commission: 120000
    },
    {
      id: 'ref_002',
      username: 'customer456',
      email: 'customer@example.com',
      joinDate: '2024-01-20',
      status: 'Active',
      totalSpent: 800000,
      commission: 80000
    }
  ]);

  const [commissions] = useState([
    {
      id: 'com_001',
      referralId: 'ref_001',
      description: 'خرید VPS - پلن استارتر',
      amount: 50000,
      date: '2024-01-25',
      status: 'Paid'
    },
    {
      id: 'com_002',
      referralId: 'ref_002',
      description: 'خرید هاستینگ - پلن پریمیوم',
      amount: 35000,
      date: '2024-01-28',
      status: 'Pending'
    }
  ]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "کپی شد",
      description: `${label} در کلیپ‌بورد کپی شد.`
    });
  };

  const formatCurrency = (amount: number) => {
    return toPersianDigits(new Intl.NumberFormat('fa-IR').format(amount)) + ' ریال';
  };

  const formatDate = (dateString: string) => {
    const formatted = new Intl.DateTimeFormat('fa-IR').format(new Date(dateString));
    return toPersianDigits(formatted);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Active': return 'فعال';
      case 'Inactive': return 'غیرفعال';
      case 'Paid': return 'پرداخت شده';
      case 'Pending': return 'در انتظار';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">مرکز همکاری در فروش</h1>
        <Badge variant="outline" className="text-green-600">
          کد همکار: {affiliateCode}
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل درآمد</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalEarnings)}</div>
            <p className="text-xs text-muted-foreground">
              این ماه: {formatCurrency(stats.thisMonthEarnings)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کمیسیون در انتظار</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {formatCurrency(stats.pendingCommissions)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل معرفی‌ها</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{toPersianDigits(stats.totalReferrals)}</div>
            <p className="text-xs text-muted-foreground">
              فعال: {toPersianDigits(stats.activeReferrals)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">نرخ تبدیل</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{toPersianDigits(stats.conversionRate)}%</div>
            <Progress value={stats.conversionRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">نمای کلی</TabsTrigger>
          <TabsTrigger value="referrals">معرفی‌ها</TabsTrigger>
          <TabsTrigger value="commissions">کمیسیون‌ها</TabsTrigger>
          <TabsTrigger value="marketing">ابزار بازاریابی</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Referral Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Share className="h-5 w-5" />
                <span>لینک‌های معرفی</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">کد همکار</label>
                <div className="flex space-x-2 rtl:space-x-reverse mt-1">
                  <Input value={affiliateCode} readOnly />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(affiliateCode, 'کد همکار')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">لینک معرفی</label>
                <div className="flex space-x-2 rtl:space-x-reverse mt-1">
                  <Input value={referralLink} readOnly />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(referralLink, 'لینک معرفی')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commission Structure */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Gift className="h-5 w-5" />
                <span>ساختار کمیسیون</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">{toPersianDigits(10)}%</div>
                  <div className="text-sm text-muted-foreground">خدمات VPS</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">{toPersianDigits(15)}%</div>
                  <div className="text-sm text-muted-foreground">سرور اختصاصی</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">{toPersianDigits(8)}%</div>
                  <div className="text-sm text-muted-foreground">هاستینگ و دامنه</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals">
          <Card>
            <CardHeader>
            <CardTitle className="flex items-center justify-between">
                <span>فهرست معرفی‌ها</span>
                <Badge variant="outline">{toPersianDigits(referrals.length)} نفر</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>کاربر</TableHead>
                    <TableHead>ایمیل</TableHead>
                    <TableHead>تاریخ عضویت</TableHead>
                    <TableHead>وضعیت</TableHead>
                    <TableHead>کل خرید</TableHead>
                    <TableHead>کمیسیون</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referrals.map((referral, index) => (
                    <TableRow key={referral.id}>
                      <TableCell className="font-medium">{toPersianDigits((index + 1).toString())}. {referral.username}</TableCell>
                      <TableCell>{referral.email}</TableCell>
                      <TableCell>{formatDate(referral.joinDate)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(referral.status)}>
                          {getStatusLabel(referral.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatCurrency(referral.totalSpent)}</TableCell>
                      <TableCell className="text-green-600 font-semibold">
                        {formatCurrency(referral.commission)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions">
          <Card>
            <CardHeader>
            <CardTitle className="flex items-center justify-between">
                <span>تاریخچه کمیسیون‌ها</span>
                <Badge variant="outline">{toPersianDigits(commissions.length)} مورد</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>شرح</TableHead>
                    <TableHead>مبلغ</TableHead>
                    <TableHead>تاریخ</TableHead>
                    <TableHead>وضعیت</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commissions.map((commission) => (
                    <TableRow key={commission.id}>
                      <TableCell className="font-medium">{commission.description}</TableCell>
                      <TableCell className="text-green-600 font-semibold">
                        {formatCurrency(commission.amount)}
                      </TableCell>
                      <TableCell>{formatDate(commission.date)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(commission.status)}>
                          {getStatusLabel(commission.status)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketing">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>بنرهای تبلیغاتی</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 bg-gradient-to-r from-primary/10 to-primary/5">
                  <div className="text-center">
                    <div className="text-lg font-bold">نوین وی دی اس</div>
                    <div className="text-sm text-muted-foreground">بهترین خدمات میزبانی</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Copy className="h-4 w-4 ml-1" />
                  کپی کد HTML
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>متن‌های آماده</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  value="با نوین وی دی اس، بهترین خدمات میزبانی را تجربه کنید! سرعت بالا، پشتیبانی 24/7 و قیمت‌های مناسب."
                  readOnly
                  rows={3}
                />
                <Button variant="outline" className="w-full">
                  <Copy className="h-4 w-4 ml-1" />
                  کپی متن
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AffiliateCenter;