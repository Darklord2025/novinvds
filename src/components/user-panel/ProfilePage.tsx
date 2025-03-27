
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, Shield, BellRing, CreditCard } from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">پروفایل کاربری</h2>
      
      <Tabs defaultValue="personal" dir="rtl" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">اطلاعات شخصی</TabsTrigger>
          <TabsTrigger value="security">امنیت</TabsTrigger>
          <TabsTrigger value="notifications">اعلان‌ها</TabsTrigger>
          <TabsTrigger value="billing">اطلاعات مالی</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات شخصی</CardTitle>
              <CardDescription>اطلاعات پروفایل خود را مدیریت کنید</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium" htmlFor="firstName">نام</label>
                  <div className="relative">
                    <Input id="firstName" placeholder="نام" defaultValue="علی" />
                    <User className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium" htmlFor="lastName">نام خانوادگی</label>
                  <div className="relative">
                    <Input id="lastName" placeholder="نام خانوادگی" defaultValue="محمدی" />
                    <User className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">ایمیل</label>
                <div className="relative">
                  <Input id="email" type="email" placeholder="ایمیل" defaultValue="ali@example.com" />
                  <Mail className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="phone">شماره موبایل</label>
                <div className="relative">
                  <Input id="phone" placeholder="شماره موبایل" defaultValue="09123456789" />
                  <Phone className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>ذخیره تغییرات</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>امنیت</CardTitle>
              <CardDescription>تنظیمات امنیتی حساب خود را مدیریت کنید</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">رمز عبور فعلی</label>
                <div className="relative">
                  <Input id="password" type="password" placeholder="رمز عبور فعلی" />
                  <Shield className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="newPassword">رمز عبور جدید</label>
                <div className="relative">
                  <Input id="newPassword" type="password" placeholder="رمز عبور جدید" />
                  <Shield className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="confirmPassword">تکرار رمز عبور جدید</label>
                <div className="relative">
                  <Input id="confirmPassword" type="password" placeholder="تکرار رمز عبور جدید" />
                  <Shield className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>بروزرسانی رمز عبور</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>اعلان‌ها</CardTitle>
              <CardDescription>تنظیمات اعلان‌های حساب خود را مدیریت کنید</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BellRing className="h-5 w-5 text-gray-500" />
                    <div>
                      <h4 className="text-sm font-medium">اعلان‌های وضعیت سرور</h4>
                      <p className="text-xs text-gray-500">هنگام تغییر وضعیت سرور شما اطلاع رسانی می‌شود</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">ایمیل</Button>
                    <Button variant="outline" size="sm">پیامک</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BellRing className="h-5 w-5 text-gray-500" />
                    <div>
                      <h4 className="text-sm font-medium">اطلاعیه‌های صورتحساب</h4>
                      <p className="text-xs text-gray-500">اطلاع رسانی درباره فاکتورهای جدید و پرداخت‌ها</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">ایمیل</Button>
                    <Button variant="outline" size="sm">پیامک</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>ذخیره تنظیمات</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات مالی</CardTitle>
              <CardDescription>اطلاعات پرداخت و صورتحساب‌های خود را مدیریت کنید</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-10 w-10 p-2 bg-blue-100 text-blue-700 rounded-full" />
                  <div>
                    <h4 className="font-medium">کارت بانکی</h4>
                    <p className="text-sm text-gray-500">**** **** **** 4256</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">تغییر</Button>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">آدرس صورتحساب</h4>
                <p className="text-sm text-gray-500">تهران، خیابان ولیعصر، پلاک 123</p>
                <Button variant="outline" size="sm">ویرایش آدرس</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
