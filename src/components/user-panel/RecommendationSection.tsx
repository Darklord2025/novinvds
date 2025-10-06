import React from 'react';
import { Star, ShoppingCart, TrendingUp, Heart, Eye, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const RecommendationSection = () => {
  const recommendedProducts = [
    {
      id: 1,
      name: 'سرور مجازی SSD Pro',
      price: '285,000',
      originalPrice: '320,000',
      discount: '11%',
      rating: 4.8,
      image: '/placeholder.svg',
      category: 'vps',
      tag: 'پیشنهاد ویژه',
      features: ['2 CPU Core', '4GB RAM', '50GB SSD']
    },
    {
      id: 2,
      name: 'هاستینگ وردپرس',
      price: '120,000',
      rating: 4.9,
      image: '/placeholder.svg',
      category: 'hosting',
      tag: 'محبوب',
      features: ['5GB فضا', 'SSL رایگان', 'پشتیبانی 24/7']
    },
    {
      id: 3,
      name: 'سرور اختصاصی E3',
      price: '2,800,000',
      originalPrice: '3,200,000',
      discount: '12.5%',
      rating: 4.7,
      image: '/placeholder.svg',
      category: 'dedicated',
      tag: 'جدید',
      features: ['Intel E3', '16GB RAM', '1TB HDD']
    },
    {
      id: 4,
      name: 'دامنه .com',
      price: '390,000',
      rating: 5.0,
      image: '/placeholder.svg',
      category: 'domain',
      tag: 'بهترین قیمت',
      features: ['ثبت یکساله', 'DNS رایگان', 'انتقال آسان']
    }
  ];

  const trendingServices = [
    { name: 'سرور مجازی SSD', growth: '+23%', icon: '🖥️' },
    { name: 'هاستینگ وردپرس', growth: '+18%', icon: '🌐' },
    { name: 'سرور ابری', growth: '+35%', icon: '☁️' },
    { name: 'گواهی SSL', growth: '+15%', icon: '🔒' }
  ];

  const recentlyViewed = [
    { name: 'سرور مجازی پیشرفته', price: '450,000', image: '/placeholder.svg' },
    { name: 'هاستینگ نامحدود', price: '180,000', image: '/placeholder.svg' },
    { name: 'دامنه .ir', price: '120,000', image: '/placeholder.svg' }
  ];

  const ProductCard = ({ product }: { product: any }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <Badge className="absolute top-2 right-2 bg-red-500">
            {product.discount} تخفیف
          </Badge>
        )}
        <Badge className="absolute top-2 left-2 bg-primary">
          {product.tag}
        </Badge>
        <Button 
          size="icon" 
          variant="secondary" 
          className="absolute bottom-2 left-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart size={16} />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground mr-1">{product.rating}</span>
          </div>
        </div>
        
        <div className="space-y-1 mb-3">
          {product.features.map((feature: string, index: number) => (
            <div key={index} className="text-xs text-muted-foreground">• {feature}</div>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">{product.price} تومان</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
              )}
            </div>
          </div>
          
          <Button size="sm" className="gap-2">
            <ShoppingCart size={16} />
            سفارش
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">پیشنهادات ویژه برای شما</h1>
        <p className="text-muted-foreground">بر اساس سابقه خرید و علایق شما انتخاب شده</p>
      </div>

      {/* Recommended Products */}
      <div>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Star className="text-yellow-500" />
          محصولات پیشنهادی
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trending Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-green-500" />
              خدمات پرطرفدار
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {trendingServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{service.icon}</span>
                  <span className="font-medium">{service.name}</span>
                </div>
                <Badge variant="secondary" className="text-green-600 bg-green-50">
                  {service.growth}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recently Viewed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="text-blue-500" />
              اخیراً مشاهده شده
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentlyViewed.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-primary font-semibold">{item.price} تومان</p>
                </div>
                <Button size="sm" variant="outline">
                  مشاهده
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Personal Offers */}
      <Card className="bg-gradient-to-r from-primary/10 to-blue-600/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="text-primary" />
            پیشنهادات زمان‌محدود
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold mb-2">تخفیف 25% سرور مجازی</h3>
              <p className="text-sm text-muted-foreground mb-4">برای 3 روز آینده</p>
              <Button size="sm">استفاده کن</Button>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold mb-2">هاستینگ رایگان 3 ماهه</h3>
              <p className="text-sm text-muted-foreground mb-4">با خرید دامنه</p>
              <Button size="sm">استفاده کن</Button>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-2">💎</div>
              <h3 className="font-semibold mb-2">دامنه رایگان یکساله</h3>
              <p className="text-sm text-muted-foreground mb-4">با خرید هاستینگ سالانه</p>
              <Button size="sm">استفاده کن</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecommendationSection;