
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, ShoppingCart } from 'lucide-react';

const serviceLinks = [
  { to: "/vps", label: "سرور مجازی" },
  { to: "/dedicated", label: "سرور اختصاصی" },
  { to: "/hosting", label: "هاستینگ" },
  { to: "/domain", label: "ثبت دامنه" },
  { to: "/network", label: "خدمات شبکه" },
  { to: "/license", label: "فروش لایسنس" },
  { to: "/ssl", label: "گواهی SSL" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">NovinVDS</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8" dir="rtl">
          <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
            صفحه اصلی
          </Link>
          
          {/* خدمات */}
          <div className="relative group">
            <button className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1">
              خدمات
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-lg shadow-lg rounded-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              {serviceLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block px-4 py-3 text-foreground hover:text-primary hover:bg-gray-50 transition-colors text-right"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <Link to="/network-store" className="text-foreground hover:text-primary transition-colors font-medium">
             فروشگاه تجهیزات
          </Link>
          
          <Link to="/datacenter" className="text-foreground hover:text-primary transition-colors font-medium">
            دیتاسنترها
          </Link>
          
          <Link to="/blog" className="text-foreground hover:text-primary transition-colors font-medium">
            وبلاگ
          </Link>
          
          <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">
            درباره ما
          </Link>
          
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
            تماس با ما
          </Link>
          
          <div className="flex items-center gap-4 mr-4">
            <a href="tel:02112345678" className="flex items-center text-primary hover:text-primary/80 transition-colors">
              <Phone size={18} className="ml-2" />
              <span className="font-medium">021-12345678</span>
            </a>
            
            <Link to="/cart" className="relative p-2 text-foreground hover:text-primary transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </Link>
            
            <Link to="/login" className="px-6 py-2 bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 shadow-md hover:shadow-lg">
              ورود / ثبت نام
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg py-4 px-4 animate-fade-in border-t shadow-lg" dir="rtl">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors py-3 px-2 rounded-lg hover:bg-gray-50 text-right"
              onClick={() => setIsMenuOpen(false)}
            >
              صفحه اصلی
            </Link>
            
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-600 px-2">خدمات</p>
              {serviceLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-foreground hover:text-primary transition-colors py-2 px-4 block rounded-lg hover:bg-gray-50 text-right border-r-2 border-transparent hover:border-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <Link 
              to="/network-store" 
              className="text-foreground hover:text-primary transition-colors py-3 px-2 rounded-lg hover:bg-gray-50 text-right"
              onClick={() => setIsMenuOpen(false)}
            >
              فروشگاه تجهیزات
            </Link>
            
            <Link 
              to="/datacenter" 
              className="text-foreground hover:text-primary transition-colors py-3 px-2 rounded-lg hover:bg-gray-50 text-right"
              onClick={() => setIsMenuOpen(false)}
            >
              دیتاسنترها
            </Link>
            
            <Link 
              to="/blog" 
              className="text-foreground hover:text-primary transition-colors py-3 px-2 rounded-lg hover:bg-gray-50 text-right"
              onClick={() => setIsMenuOpen(false)}
            >
              وبلاگ
            </Link>
            
            <Link 
              to="/about" 
              className="text-foreground hover:text-primary transition-colors py-3 px-2 rounded-lg hover:bg-gray-50 text-right"
              onClick={() => setIsMenuOpen(false)}
            >
              درباره ما
            </Link>
            
            <Link 
              to="/contact" 
              className="text-foreground hover:text-primary transition-colors py-3 px-2 rounded-lg hover:bg-gray-50 text-right"
              onClick={() => setIsMenuOpen(false)}
            >
              تماس با ما
            </Link>
            
            <div className="flex justify-between items-center py-3 px-2 border-t mt-4 pt-4">
              <a href="tel:02112345678" className="flex items-center text-primary">
                <Phone size={18} className="ml-2" />
                <span className="font-medium">021-12345678</span>
              </a>
              
              <Link 
                to="/cart" 
                className="relative p-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
              </Link>
            </div>
            
            <Link 
              to="/login" 
              className="px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 text-center mt-4 shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              ورود / ثبت نام
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
