
import React from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DevelopmentMessage = () => {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">این بخش در حال توسعه است</CardTitle>
        <CardDescription>
          این قسمت از پنل کاربری در حال حاضر در دست ساخت است و به زودی در دسترس قرار خواهد گرفت.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8">
          <AlertCircle className="h-20 w-20 text-blue-500 mb-4" />
          <p className="text-center text-gray-600 max-w-lg">
            تیم توسعه NovinVDS در حال تکمیل این بخش هستند. لطفاً در روزهای آینده دوباره به پنل کاربری مراجعه کنید یا برای دریافت اطلاعات بیشتر، با پشتیبانی تماس بگیرید.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="flex space-x-4 space-x-reverse">
          <Button variant="outline" asChild>
            <a href="mailto:support@novinvds.ir" className="flex items-center gap-2">
              تماس با پشتیبانی
            </a>
          </Button>
          <Button className="flex items-center gap-2" asChild>
            <a href="/" className="flex items-center gap-2">
              بازگشت به صفحه اصلی
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DevelopmentMessage;
