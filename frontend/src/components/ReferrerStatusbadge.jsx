import React from 'react';

const colorClasses = {
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
  purple: "bg-purple-100 text-purple-800",
  amber: "bg-amber-100 text-amber-800",
  gray: "bg-gray-100 text-gray-800"
};

const ReferrerStatusBadge = ({ status, color = "gray" }) => {
  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${colorClasses[color]}`}>
      {status}
    </span>
  );
};

export default  ReferrerStatusBadge ;