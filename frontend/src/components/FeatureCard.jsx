// src/components/FeatureCard.jsx
import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;