import React from "react";

const colorClasses = {
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800/30",
    text: "text-blue-600 dark:text-blue-400"
  },
  teal: {
    bg: "bg-teal-100 dark:bg-teal-900/20",
    border: "border-teal-200 dark:border-teal-800/30",
    text: "text-teal-600 dark:text-teal-400"
  },
  purple: {
    bg: "bg-purple-100 dark:bg-purple-900/20",
    border: "border-purple-200 dark:border-purple-800/30",
    text: "text-purple-600 dark:text-purple-400"
  },
  green: {
    bg: "bg-green-100 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-800/30",
    text: "text-green-600 dark:text-green-400"
  },
  amber: {
    bg: "bg-amber-100 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-800/30",
    text: "text-amber-600 dark:text-amber-400"
  },
  red: {
    bg: "bg-red-100 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800/30",
    text: "text-red-600 dark:text-red-400"
  }
};

const StatsCard = ({ title, value, icon, color = "blue" }) => {
  const colors = colorClasses[color] || colorClasses.blue;
  
  return (
    <div className={`${colors.bg} ${colors.border} p-4 rounded-xl border`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-gray-600 dark:text-gray-400 ">
            {title}
          </div>
          <div className={`text-medium font-bold ${colors.text}`}>
            {value}
          </div>
        </div>
        <div className={`p-2 rounded-lg ${colors.text}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;