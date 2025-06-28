import React from "react";
import { FiX } from "react-icons/fi";

const colorClasses = {
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-800 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800/50"
  },
  purple: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-800 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800/50"
  },
  teal: {
    bg: "bg-teal-100 dark:bg-teal-900/30",
    text: "text-teal-800 dark:text-teal-300",
    border: "border-teal-200 dark:border-teal-800/50"
  },
  green: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-800 dark:text-green-300",
    border: "border-green-200 dark:border-green-800/50"
  },
  amber: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-800 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800/50"
  },
  red: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-800 dark:text-red-300",
    border: "border-red-200 dark:border-red-800/50"
  }
};

const StatusBadge = ({ status, color = "blue", onRemove }) => {
  const colors = colorClasses[color] || colorClasses.blue;
  
  return (
    <div className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${colors.bg} ${colors.text} ${colors.border}`}>
      {status}
      {onRemove && (
        <button 
          className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors"
          onClick={onRemove}
        >
          <FiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default StatusBadge;