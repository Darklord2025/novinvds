import LegacyLocale from '@/components/LegacyLocale';
import React, { useState } from 'react';
import { ShoppingCart, Star, Heart, Filter, Search, Package, Truck, Shield, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  brand: string;
  availability: 'available' | 'out-of-stock' | 'limited';
  features: string[];
}

const NetworkStoreSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'همه محصولات', icon: '📦' },
    { id: 'router', name: 'روتر و مودم', icon: '📡' },
    { id: 'switch', name: 'سوئیچ شبکه', icon: '🔗' },
    { id: 'access-point', name: 'اکسس پوینت', icon: '📶' },
    { id: 'firewall', name: 'فایروال', icon: '🛡️' },
    { id: 'cable', name: 'کابل و اتصالات', icon: '🔌' },
  ];

  const featuredProducts: Product[] = [
    {
      id: 1,
      name: 'روتر WiFi 6 TP-Link Archer AX73',
      price: '2,850,000',
      originalPrice: '3,200,000',
      discount: '11%',
      rating: 4.8,
      reviews: 234,
      image: '/placeholder.svg',
      category: 'router',
      brand: 'TP-Link',
      availability: 'available',
      features: ['WiFi 6', '5400 Mbps', '6 آنتن', 'MU-MIMO']
    },
    {
      id: 2,
      name: 'سوئیچ 24 پورت Cisco SG110-24',
      price: '4,650,000',
      rating: 4.9,
      reviews: 189,
      image: '/placeholder.svg',
      category: 'switch',
      brand: 'Cisco',
      availability: 'available',
      features: ['24 پورت گیگابیت', 'Plug & Play', 'فن بدون صدا']
    },
    {
      id: 3,
      name: 'اکسس پوینت UniFi AP AC Pro',
      price: '1,890,000',
      originalPrice: '2,100,000',
      discount: '10%',
      rating: 4.7,
      reviews: 156,
      image: '/placeholder.svg',
      category: 'access-point',
      brand: 'Ubiquiti',
      availability: 'limited',
      features: ['802.11ac', 'دوال باند', 'PoE']
    },
    {
      id: 4,
      name: 'فایروال SonicWall TZ370',
      price: '3,200,000',
      rating: 4.6,
      reviews: 98,
      image: '/placeholder.svg',
      category: 'firewall',
      brand: 'SonicWall',
      availability: 'available',
      features: ['High Performance', 'SSL VPN', 'Deep Packet Inspection']
    },
  ];

  const services = [
    { icon: Truck, title: 'ارسال رایگان', description: 'برای سفارش‌های بالای 2 میلیون تومان' },
    { icon: Shield, title: 'ضمانت اصالت', description: 'تضمین اصالت کالا و ضمانت معتبر' },
    { icon: CreditCard, title: 'پرداخت آنلاین', description: 'امکان پرداخت با تمام کارت‌ها' },
    { icon: Package, title: 'بسته‌بندی مخصوص', description: 'بسته‌بندی استاندارد و مقاوم' },
  ];

  const filteredProducts = featuredProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <Badge className="absolute top-2 right-2 bg-red-500">
            {product.discount} تخفیف
          </Badge>
        )}
        <Button 
          size="icon" 
          variant="secondary" 
          className="absolute top-2 left-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart size={16} />
        </Button>
        {product.availability === 'limited' && (
          <Badge className="absolute bottom-2 right-2 bg-orange-500">
            موجودی محدود
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors cursor-pointer">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground mr-1">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews} نظر)</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {product.features.slice(0, 2).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
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
            افزودن
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return <LegacyLocale>{(
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">فروشگاه تجهیزات شبکه</h1>
          <p className="text-muted-foreground">بهترین برندها با قیمت مناسب و ضمانت اصالت</p>
        </div>
        <Button className="w-fit">
          مشاهده همه محصولات
        </Button>
      </div>

      {/* Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service, index) => {
          const Icon = service.icon;
          return <LegacyLocale key={index}>{(
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-1">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          )}</LegacyLocale>;
        })}
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter size={20} />
            دسته‌بندی محصولات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="h-auto p-4 flex flex-col items-center gap-2"
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-sm">{category.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="جستجو در محصولات..."
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Featured Products */}
      <div>
        <h2 className="text-xl font-bold mb-6">محصولات پیشنهادی</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>سفارش‌های اخیر</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: '#2024001', product: 'روتر TP-Link AX73', status: 'ارسال شده', date: '1403/08/15' },
              { id: '#2024002', product: 'سوئیچ Cisco 24 Port', status: 'در حال پردازش', date: '1403/08/14' },
              { id: '#2024003', product: 'اکسس پوینت UniFi', status: 'تحویل داده شده', date: '1403/08/12' },
            ].map(order => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{order.product}</div>
                  <div className="text-sm text-muted-foreground">کد سفارش: {order.id}</div>
                </div>
                <div className="text-left">
                  <Badge 
                    variant={order.status === 'تحویل داده شده' ? 'default' : 'secondary'}
                    className="mb-1"
                  >
                    {order.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground">{order.date}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )}</LegacyLocale>;
};

export default NetworkStoreSection;
