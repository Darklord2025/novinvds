import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet-async";
import { Star, Heart, ShoppingCart, Filter, Search, Grid, List, ChevronDown } from 'lucide-react';

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

const NetworkStore = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'همه محصولات', count: 156 },
    { id: 'router', name: 'روتر و مودم', count: 45 },
    { id: 'switch', name: 'سوئیچ شبکه', count: 32 },
    { id: 'access-point', name: 'اکسس پوینت', count: 28 },
    { id: 'firewall', name: 'فایروال', count: 18 },
    { id: 'cable', name: 'کابل و اتصالات', count: 33 },
  ];

  const products: Product[] = [
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
      features: ['24 پورت گیگابیت', 'Plug & Play', 'فن بدون صدا', 'محافظ پیشرفته']
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
      features: ['802.11ac', 'دوال باند', 'PoE', 'مدیریت متمرکز']
    },
    // ... more products
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
            {product.discount} تخفیف
          </span>
        )}
        <button className="absolute top-3 left-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
          <Heart size={18} className="text-gray-600 hover:text-red-500" />
        </button>
        {product.availability === 'limited' && (
          <span className="absolute bottom-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-md text-xs">
            موجودی محدود
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600 mr-1">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviews} نظر)</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {product.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
              {feature}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">{product.price} تومان</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
              )}
            </div>
          </div>
          
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2">
            <ShoppingCart size={16} />
            افزودن
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>فروشگاه تجهیزات شبکه - نوین وی دی اس | خرید آنلاین</title>
        <meta name="description" content="خرید آنلاین تجهیزات شبکه، روتر، سوئیچ، اکسس پوینت، فایروال و کابل شبکه با بهترین قیمت و ضمانت اصالت" />
        <meta name="keywords" content="فروشگاه تجهیزات شبکه، روتر، سوئیچ، اکسس پوینت، فایروال، کابل شبکه، خرید آنلاین" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-28 pb-8 bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">فروشگاه تجهیزات شبکه</h1>
              <p className="text-lg mb-6">بهترین برندها با قیمت مناسب و ضمانت اصالت</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
                <div className="flex items-center justify-between mb-4 lg:hidden">
                  <h3 className="font-semibold">فیلترها</h3>
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Filter size={20} />
                  </button>
                </div>
                
                <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
                  {/* Search in products */}
                  <div>
                    <label className="block text-sm font-medium mb-2">جستجو در محصولات</label>
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder="نام محصول..."
                        className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h4 className="font-medium mb-3">دسته‌بندی</h4>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <label key={category.id} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            value={category.id}
                            checked={selectedCategory === category.id}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded-full border-2 ml-2 ${
                            selectedCategory === category.id 
                              ? 'border-primary bg-primary' 
                              : 'border-gray-300'
                          }`}>
                            {selectedCategory === category.id && (
                              <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                            )}
                          </div>
                          <span className="text-sm">{category.name}</span>
                          <span className="text-xs text-gray-500 mr-auto">({category.count})</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="font-medium mb-3">محدوده قیمت</h4>
                    <div className="space-y-2">
                      {[
                        { label: 'زیر 1 میلیون تومان', value: '0-1000000' },
                        { label: '1 تا 3 میلیون تومان', value: '1000000-3000000' },
                        { label: '3 تا 5 میلیون تومان', value: '3000000-5000000' },
                        { label: 'بالای 5 میلیون تومان', value: '5000000+' },
                      ].map(range => (
                        <label key={range.value} className="flex items-center cursor-pointer">
                          <input type="checkbox" className="ml-2" />
                          <span className="text-sm">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Brands */}
                  <div>
                    <h4 className="font-medium mb-3">برند</h4>
                    <div className="space-y-2">
                      {['TP-Link', 'Cisco', 'Ubiquiti', 'MikroTik', 'D-Link'].map(brand => (
                        <label key={brand} className="flex items-center cursor-pointer">
                          <input type="checkbox" className="ml-2" />
                          <span className="text-sm">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="lg:w-3/4">
              {/* Toolbar */}
              <div className="bg-white rounded-xl shadow-md p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                      {filteredProducts.length} محصول یافت شد
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">مرتب‌سازی:</span>
                      <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="popular">محبوب‌ترین</option>
                        <option value="newest">جدیدترین</option>
                        <option value="price-low">ارزان‌ترین</option>
                        <option value="price-high">گران‌ترین</option>
                        <option value="rating">بیشترین امتیاز</option>
                      </select>
                    </div>
                    
                    <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-600'}`}
                      >
                        <Grid size={18} />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-600'}`}
                      >
                        <List size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(page => (
                    <button
                      key={page}
                      className={`px-4 py-2 rounded-lg ${
                        page === 1 
                          ? 'bg-primary text-white' 
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default NetworkStore;