
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

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
          ? 'bg-white/90 backdrop-blur-lg shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary">VirtuaServe</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            صفحه اصلی
          </Link>
          
          <div className="relative group">
            <button 
              className="flex items-center text-foreground hover:text-primary transition-colors"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              خدمات <ChevronDown size={16} className="ml-1" />
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-md shadow-lg overflow-hidden z-10 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-right">
              <Link to="/vps" className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 hover:text-primary transition-colors">
                سرور مجازی
              </Link>
              <Link to="/dedicated" className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 hover:text-primary transition-colors">
                سرور اختصاصی
              </Link>
              <Link to="/hosting" className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 hover:text-primary transition-colors">
                هاستینگ
              </Link>
              <Link to="/network" className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 hover:text-primary transition-colors">
                خدمات شبکه
              </Link>
              <Link to="/license" className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 hover:text-primary transition-colors">
                فروش لایسنس
              </Link>
            </div>
          </div>
          
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            درباره ما
          </Link>
          
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
            تماس با ما
          </Link>
          
          <Link to="/login" className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            ورود / ثبت نام
          </Link>
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
            
            <div>
              <button 
                className="flex items-center justify-between w-full text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <span>خدمات</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {servicesOpen && (
                <div className="pl-4 mt-2 border-l-2 border-gray-200 space-y-2 animate-fade-in">
                  <Link 
                    to="/vps" 
                    className="block py-1 text-gray-600 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    سرور مجازی
                  </Link>
                  <Link 
                    to="/dedicated" 
                    className="block py-1 text-gray-600 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    سرور اختصاصی
                  </Link>
                  <Link 
                    to="/hosting" 
                    className="block py-1 text-gray-600 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    هاستینگ
                  </Link>
                  <Link 
                    to="/network" 
                    className="block py-1 text-gray-600 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    خدمات شبکه
                  </Link>
                  <Link 
                    to="/license" 
                    className="block py-1 text-gray-600 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    فروش لایسنس
                  </Link>
                </div>
              )}
            </div>
            
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
