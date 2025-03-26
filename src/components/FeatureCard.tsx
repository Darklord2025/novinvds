
import React, { ReactNode } from 'react';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 ${className}`}>
      <div className="bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center text-blue-600 mb-5">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
