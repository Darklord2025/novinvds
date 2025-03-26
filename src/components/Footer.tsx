
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">VirtuaServe</h3>
            <p className="text-gray-300 leading-relaxed">
              ارائه دهنده خدمات تخصصی هاستینگ، سرور مجازی، سرور اختصاصی و راهکارهای شبکه با بالاترین کیفیت و پشتیبانی 24/7
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">لینک‌های سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">صفحه اصلی</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">درباره ما</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">خدمات</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">وبلاگ</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">تماس با ما</Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">خدمات ما</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/vps" className="text-gray-300 hover:text-white transition-colors">سرور مجازی</Link>
              </li>
              <li>
                <Link to="/dedicated" className="text-gray-300 hover:text-white transition-colors">سرور اختصاصی</Link>
              </li>
              <li>
                <Link to="/hosting" className="text-gray-300 hover:text-white transition-colors">هاستینگ وب</Link>
              </li>
              <li>
                <Link to="/network" className="text-gray-300 hover:text-white transition-colors">خدمات شبکه</Link>
              </li>
              <li>
                <Link to="/license" className="text-gray-300 hover:text-white transition-colors">فروش لایسنس</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">اطلاعات تماس</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-gray-400 mt-1" />
                <span className="text-gray-300">تهران، خیابان ولیعصر، ساختمان سروناز، پلاک 144</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-gray-400" />
                <span className="text-gray-300 hover:text-white transition-colors">021-88776655</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-gray-400" />
                <a href="mailto:info@virtuaserve.com" className="text-gray-300 hover:text-white transition-colors">
                  info@virtuaserve.com
                </a>
              </li>
            </ul>
          </div>
          
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} VirtuaServe. تمامی حقوق محفوظ است.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4 rtl:space-x-reverse text-sm">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">حریم خصوصی</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">قوانین استفاده</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">سوالات متداول</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
