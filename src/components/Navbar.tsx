
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
        <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            صفحه اصلی
          </Link>
          
          {/* خدمات به صورت منفرد */}
          {serviceLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          
          <Link to="/datacenter" className="text-foreground hover:text-primary transition-colors">
            دیتاسنترها
          </Link>
          
          <Link to="/blog" className="text-foreground hover:text-primary transition-colors">
            وبلاگ
          </Link>
          
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            درباره ما
          </Link>
          
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
            تماس با ما
          </Link>
          
          <div className="flex items-center gap-3">
            <a href="tel:02112345678" className="flex items-center text-primary">
              <Phone size={18} className="ml-1" />
              <span className="font-medium">021-12345678</span>
            </a>
            
            <Link to="/cart" className="relative p-2 text-foreground hover:text-primary transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </Link>
            
            <Link to="/login" className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
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
        <div className="md:hidden bg-white/95 backdrop-blur-lg py-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              صفحه اصلی
            </Link>
            {/* خدمات به صورت منفرد */}
            {serviceLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              to="/datacenter" 
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              دیتاسنترها
            </Link>
            
            <Link 
              to="/blog" 
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              وبلاگ
            </Link>
            
            <Link 
              to="/about" 
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              درباره ما
            </Link>
            
            <Link 
              to="/contact" 
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              تماس با ما
            </Link>
            
            <div className="flex justify-between items-center py-2">
              <a href="tel:02112345678" className="flex items-center text-primary">
                <Phone size={18} className="ml-1" />
                <span className="font-medium">021-12345678</span>
              </a>
              
              <Link 
                to="/cart" 
                className="relative p-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
              </Link>
            </div>
            
            <Link 
              to="/login" 
              className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-center mt-2"
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
