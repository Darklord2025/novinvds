
import React, { ReactNode } from 'react';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  gradient?: boolean;
  hoverEffect?: 'lift' | 'scale' | 'glow' | 'none';
  onClick?: () => void;
  badge?: string;
  footer?: ReactNode;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  className = '',
  gradient = false,
  hoverEffect = 'lift',
  onClick,
  badge,
  footer,
}) => {
  const getHoverClass = () => {
    switch (hoverEffect) {
      case 'lift':
        return 'hover:-translate-y-1';
      case 'scale':
        return 'hover:scale-105';
      case 'glow':
        return 'hover:shadow-lg hover:shadow-blue-100';
      case 'none':
        return '';
      default:
        return 'hover:-translate-y-1';
    }
  };

  return (
    <div 
      className={`bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 ${getHoverClass()} ${className}`}
      onClick={onClick}
    >
      {badge && (
        <span className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
      <div 
        className={`w-14 h-14 rounded-lg flex items-center justify-center mb-5 ${
          gradient 
            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' 
            : 'bg-blue-50 text-blue-600'
        }`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      {footer && <div className="mt-4 pt-4 border-t border-gray-100">{footer}</div>}
    </div>
  );
};

export default FeatureCard;
