import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HostingServices = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <Button 
          variant="outline" 
          onClick={() => navigate('/user-panel')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          بازگشت به پنل کاربری
        </Button>
        
        <h1 className="text-3xl font-bold mb-6">سرویس‌های هاستینگ</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            صفحه سرویس‌های هاستینگ در حال توسعه است.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HostingServices;
