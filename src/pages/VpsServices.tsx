import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VpsServices = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <Button 
        variant="outline" 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowRight className="w-4 h-4" />
        بازگشت
      </Button>
      
      <h1 className="text-3xl font-bold mb-6">سرویس‌های VPS</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          صفحه سرویس‌های VPS در حال توسعه است.
        </p>
      </div>
    </div>
  );
};

export default VpsServices;
