import React from "react";
import { FiAlertCircle } from "react-icons/fi";

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl border border-red-200 dark:border-red-500/30 shadow-lg">
        <FiAlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Error</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{message}</p>
        {onRetry && (
          <button
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
            onClick={onRetry}
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;