
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "راهنمای انتخاب بهترین سرور مجازی برای کسب و کار شما",
      excerpt: "در این مقاله به بررسی فاکتورهای مهم برای انتخاب سرور مجازی مناسب برای کسب و کارهای مختلف می‌پردازیم...",
      image: "https://placehold.co/600x400/4f46e5/FFFFFF/png?text=VPS+Selection&font=Montserrat",
      author: "علی محمدی",
      date: "12 خرداد 1402",
      readTime: "8 دقیقه",
      category: "سرور مجازی"
    },
    {
      id: 2,
      title: "10 راهکار برای افزایش امنیت سرور لینوکس",
      excerpt: "امنیت سرور یکی از مهمترین دغدغه‌های مدیران سیستم است. در این مقاله 10 راهکار ساده اما موثر برای افزایش امنیت سرورهای لینوکسی ارائه می‌کنیم...",
      image: "https://placehold.co/600x400/4f46e5/FFFFFF/png?text=Linux+Security&font=Montserrat",
      author: "سعید کریمی",
      date: "5 تیر 1402",
      readTime: "12 دقیقه",
      category: "امنیت"
    },
    {
      id: 3,
      title: "مقایسه هاستینگ اشتراکی، سرور مجازی و سرور اختصاصی",
      excerpt: "انتخاب بین انواع مختلف هاستینگ می‌تواند گیج‌کننده باشد. در این مقاله تفاوت‌های اصلی این سه نوع سرویس را بررسی می‌کنیم تا انتخاب بهتری داشته باشید...",
      image: "https://placehold.co/600x400/4f46e5/FFFFFF/png?text=Hosting+Comparison&font=Montserrat",
      author: "مریم احمدی",
      date: "18 مرداد 1402",
      readTime: "10 دقیقه",
      category: "هاستینگ"
    },
    {
      id: 4,
      title: "معرفی WordPress و مزایای استفاده از آن برای کسب و کارها",
      excerpt: "وردپرس یکی از محبوب‌ترین سیستم‌های مدیریت محتوا است. در این مقاله به بررسی مزایا و کاربردهای آن برای کسب و کارهای مختلف می‌پردازیم...",
      image: "https://placehold.co/600x400/4f46e5/FFFFFF/png?text=WordPress&font=Montserrat",
      author: "حسین رضایی",
      date: "2 شهریور 1402",
      readTime: "7 دقیقه",
      category: "طراحی وب"
    },
    {
      id: 5,
      title: "راهنمای کامل پیکربندی سرور با cPanel",
      excerpt: "سی‌پنل یکی از محبوب‌ترین پنل‌های مدیریت هاستینگ است. در این راهنما، نحوه پیکربندی و استفاده بهینه از قابلیت‌های آن را آموزش می‌دهیم...",
      image: "https://placehold.co/600x400/4f46e5/FFFFFF/png?text=cPanel+Guide&font=Montserrat",
      author: "محمد حسینی",
      date: "10 مهر 1402",
      readTime: "15 دقیقه",
      category: "سرور"
    },
    {
      id: 6,
      title: "بهبود سرعت وبسایت با استفاده از CDN",
      excerpt: "شبکه‌های تحویل محتوا (CDN) می‌توانند سرعت بارگذاری وبسایت شما را به طور چشمگیری افزایش دهند. در این مقاله مزایا و نحوه پیاده‌سازی CDN را بررسی می‌کنیم...",
      image: "https://placehold.co/600x400/4f46e5/FFFFFF/png?text=CDN+Speed&font=Montserrat",
      author: "زهرا نوری",
      date: "25 آبان 1402",
      readTime: "9 دقیقه",
      category: "بهینه‌سازی"
    }
  ];

  // Categories
  const categories = [
    "همه",
    "سرور مجازی",
    "هاستینگ",
    "امنیت",
    "طراحی وب",
    "بهینه‌سازی",
    "دامنه",
    "سرور"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">وبلاگ NovinVDS</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              آخرین مقالات، آموزش‌ها و اخبار در زمینه هاستینگ، سرور، شبکه و طراحی وب
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="جستجو در مقالات..." 
                  className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
                  <Search size={20} />
                </button>
              </div>
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${index === 0 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Post */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img 
                  src="https://placehold.co/800x500/4f46e5/FFFFFF/png?text=Featured+Post&font=Montserrat" 
                  alt="مقاله ویژه" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-10">
                <div className="flex items-center text-sm text-blue-600 mb-4">
                  <span className="bg-blue-100 px-2 py-1 rounded">مقاله ویژه</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">همه چیز درباره فناوری Kubernetes و مزایای آن برای کسب و کارها</h2>
                <p className="text-gray-600 mb-6">
                  کوبرنتیز یک پلتفرم قدرتمند برای اتوماسیون، مقیاس‌پذیری و مدیریت اپلیکیشن‌های کانتینری است. در این مقاله جامع، به بررسی عمیق این فناوری و مزایای استفاده از آن در محیط‌های تولیدی می‌پردازیم...
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <div className="flex items-center ml-4">
                    <User size={16} className="ml-1" />
                    <span>محمدرضا محمدی</span>
                  </div>
                  <div className="flex items-center ml-4">
                    <Calendar size={16} className="ml-1" />
                    <span>15 آذر 1402</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="ml-1" />
                    <span>20 دقیقه</span>
                  </div>
                </div>
                <Link to="/blog/1" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
                  ادامه مطلب <ArrowRight size={16} className="mr-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">آخرین مقالات</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-blue-600 mb-3">
                    <span className="bg-blue-100 px-2 py-1 rounded">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center ml-4">
                      <User size={16} className="ml-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="ml-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Link to={`/blog/${post.id}`} className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
                    ادامه مطلب <ArrowRight size={16} className="mr-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="flex" aria-label="Pagination">
              <a href="#" className="ml-1 px-3 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">
                قبلی
              </a>
              <a href="#" className="ml-1 px-3 py-2 rounded-md bg-blue-600 text-white">
                1
              </a>
              <a href="#" className="ml-1 px-3 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">
                2
              </a>
              <a href="#" className="ml-1 px-3 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">
                3
              </a>
              <span className="ml-1 px-3 py-2 text-gray-500">...</span>
              <a href="#" className="ml-1 px-3 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">
                8
              </a>
              <a href="#" className="ml-1 px-3 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">
                بعدی
              </a>
            </nav>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">عضویت در خبرنامه</h2>
            <p className="text-gray-600 mb-6">
              برای دریافت آخرین مقالات، آموزش‌ها و اخبار در زمینه هاستینگ و سرور، در خبرنامه ما عضو شوید
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="ایمیل خود را وارد کنید..." 
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="sm:w-auto w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                عضویت
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Blog;
