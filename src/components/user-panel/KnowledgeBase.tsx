import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Book, Video, FileText, Star, Clock, Eye, ThumbsUp, Download } from 'lucide-react';

const KnowledgeBase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data
  const [categories] = useState([
    { id: 'hosting', name: 'هاستینگ', count: 15 },
    { id: 'vps', name: 'سرور مجازی', count: 23 },
    { id: 'domain', name: 'دامنه', count: 12 },
    { id: 'email', name: 'ایمیل', count: 8 }
  ]);

  const [articles] = useState([
    {
      id: 'art_001',
      title: 'نحوه راه‌اندازی وردپرس',
      category: 'hosting',
      type: 'article',
      difficulty: 'مبتدی',
      readTime: '5 دقیقه',
      views: 1250,
      rating: 4.8,
      lastUpdated: '2024-01-20',
      content: 'راهنمای کامل نصب و راه‌اندازی وردپرس بر روی هاستینگ شما...'
    },
    {
      id: 'art_002',
      title: 'تنظیمات DNS دامنه',
      category: 'domain',
      type: 'article',
      difficulty: 'متوسط',
      readTime: '8 دقیقه',
      views: 890,
      rating: 4.6,
      lastUpdated: '2024-01-18',
      content: 'آموزش تنظیم DNS و Name Server برای دامنه شما...'
    },
    {
      id: 'vid_001',
      title: 'آموزش مدیریت VPS',
      category: 'vps',
      type: 'video',
      difficulty: 'پیشرفته',
      readTime: '15 دقیقه',
      views: 2100,
      rating: 4.9,
      lastUpdated: '2024-01-15',
      content: 'ویدیو آموزشی کامل مدیریت سرور مجازی...'
    }
  ]);

  const [faqs] = useState([
    {
      id: 'faq_001',
      question: 'چگونه می‌توانم رمز عبور cPanel خود را تغییر دهم؟',
      answer: 'برای تغییر رمز عبور cPanel، ابتدا وارد پنل کاربری شوید، سپس بخش "خدمات من" را انتخاب کنید...',
      category: 'hosting',
      helpful: 45,
      notHelpful: 3
    },
    {
      id: 'faq_002',
      question: 'چرا سایت من کند لود می‌شود؟',
      answer: 'کندی سایت می‌تواند دلایل مختلفی داشته باشد: حجم بالای فایل‌ها، عدم بهینه‌سازی تصاویر، مشکلات پلاگین‌ها...',
      category: 'hosting',
      helpful: 78,
      notHelpful: 12
    },
    {
      id: 'faq_003',
      question: 'چگونه backup از سایت خود بگیرم؟',
      answer: 'برای تهیه backup از طریق cPanel، وارد بخش "Files" شوید و گزینه "Backup" را انتخاب کنید...',
      category: 'hosting',
      helpful: 92,
      notHelpful: 5
    }
  ]);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'مبتدی': return 'bg-green-100 text-green-800';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800';
      case 'پیشرفته': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'article': return <FileText className="h-4 w-4" />;
      default: return <Book className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fa-IR').format(new Date(dateString));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">مرکز دانش</h1>
        <Badge variant="outline">
          {filteredArticles.length + filteredFaqs.length} مطلب
        </Badge>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="جستجو در مطالب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            همه موضوعات
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="articles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="articles">مقالات آموزشی</TabsTrigger>
          <TabsTrigger value="faqs">سوالات متداول</TabsTrigger>
          <TabsTrigger value="downloads">فایل‌های دانلودی</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      {getTypeIcon(article.type)}
                      <Badge variant="outline" className="text-xs">
                        {categories.find(c => c.id === article.category)?.name}
                      </Badge>
                    </div>
                    <Badge className={getDifficultyColor(article.difficulty)} variant="outline">
                      {article.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Clock className="h-4 w-4" />
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Eye className="h-4 w-4" />
                      <span>{article.views.toLocaleString('fa-IR')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{article.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(article.lastUpdated)}
                    </span>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    مطالعه مطلب
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <CardTitle>سوالات متداول</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {filteredFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-right hover:no-underline">
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium">{faq.question}</span>
                        <Badge variant="outline" className="mr-2">
                          {categories.find(c => c.id === faq.category)?.name}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <div className="space-y-4">
                        <p>{faq.answer}</p>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <span className="text-sm text-muted-foreground">آیا این پاسخ مفید بود؟</span>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Button variant="ghost" size="sm">
                                <ThumbsUp className="h-4 w-4 ml-1" />
                                {faq.helpful}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="downloads">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse text-lg">
                  <Download className="h-5 w-5" />
                  <span>FileZilla FTP Client</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  نرم‌افزار رایگان برای انتقال فایل‌ها به سرور
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Windows/Mac/Linux</Badge>
                  <span className="text-sm text-muted-foreground">25.2 MB</span>
                </div>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 ml-1" />
                  دانلود
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse text-lg">
                  <Download className="h-5 w-5" />
                  <span>PuTTY SSH Client</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  کلاینت SSH برای اتصال به سرور لینوکس
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Windows</Badge>
                  <span className="text-sm text-muted-foreground">2.8 MB</span>
                </div>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 ml-1" />
                  دانلود
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse text-lg">
                  <Download className="h-5 w-5" />
                  <span>راهنمای cPanel</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  راهنمای کامل کار با کنترل پنل cPanel
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">PDF</Badge>
                  <span className="text-sm text-muted-foreground">5.4 MB</span>
                </div>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 ml-1" />
                  دانلود
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeBase;