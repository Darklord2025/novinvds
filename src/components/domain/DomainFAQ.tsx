
import React from 'react';

const DomainFAQ: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">سوالات متداول</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            پاسخ سوالات رایج شما درباره ثبت دامنه
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h4 className="text-lg font-bold mb-2">چه مدت طول می‌کشد تا دامنه من فعال شود؟</h4>
            <p className="text-gray-600">
              دامنه‌های عمومی مانند .com، .net و .org معمولاً بلافاصله پس از ثبت فعال می‌شوند. دامنه‌های کشوری مانند .ir ممکن است به تأیید و بررسی بیشتری نیاز داشته باشند و زمان فعال‌سازی آن‌ها ممکن است تا 24 ساعت طول بکشد.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h4 className="text-lg font-bold mb-2">آیا می‌توانم دامنه خود را از شرکت دیگری به NovinVDS منتقل کنم؟</h4>
            <p className="text-gray-600">
              بله، شما می‌توانید دامنه‌های خود را از شرکت‌های دیگر به NovinVDS منتقل کنید. برای این کار باید کد انتقال (EPP Code) را از شرکت فعلی خود دریافت کنید و در پنل کاربری ما وارد نمایید. فرایند انتقال معمولاً بین 5 تا 7 روز طول می‌کشد.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h4 className="text-lg font-bold mb-2">محافظت WHOIS چیست و چرا به آن نیاز دارم؟</h4>
            <p className="text-gray-600">
              محافظت WHOIS یک سرویس است که اطلاعات شخصی شما مانند نام، آدرس، شماره تلفن و ایمیل را در پایگاه داده WHOIS مخفی می‌کند. این کار به حفظ حریم خصوصی شما کمک می‌کند و از دریافت هرزنامه‌ها و تماس‌های تبلیغاتی ناخواسته جلوگیری می‌کند.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h4 className="text-lg font-bold mb-2">چگونه می‌توانم رکوردهای DNS دامنه خود را تغییر دهم؟</h4>
            <p className="text-gray-600">
              شما می‌توانید از طریق پنل کاربری NovinVDS، بخش مدیریت دامنه، به رکوردهای DNS دسترسی پیدا کنید و آن‌ها را ویرایش نمایید. در این بخش می‌توانید انواع رکوردها مانند A, CNAME, MX, TXT و غیره را اضافه، ویرایش یا حذف کنید.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DomainFAQ;
