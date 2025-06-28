// const LoadingSpinner = ({ size = "medium" }) => {
//   const sizes = {
//     small: "h-4 w-4",
//     medium: "h-6 w-6",
//     large: "h-10 w-10",
//   };

//   return (
//     <div className={`animate-spin rounded-full border-t-2 border-blue-600 ${sizes[size]}`} />
//   );
// };

// export default LoadingSpinner;



import React from "react";
import { FiLoader } from "react-icons/fi";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center">
        <FiLoader className="w-12 h-12 mx-auto text-blue-500 animate-spin mb-4" />
        <p className="text-gray-700 dark:text-gray-300">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;