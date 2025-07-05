// import React from "react";
// import { FiX } from "react-icons/fi";

// const JobPostingFilterPanel = ({ 
//   filters,
//   onUpdateFilter,
//   onToggleJobType,
//   onClose,
//   onReset
// }) => {
//   const jobTypes = ["Full-Time", "Part-Time", "Contract", "Hybrid", "Remote"];
//   const experienceLevels = ["Entry Level", "Mid Level", "Senior", "Executive"];
//   const salaryRanges = ["$50k-$80k", "$80k-$120k", "$120k-$180k", "$180k+"];

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-300 dark:border-gray-700 mb-8">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//           Filter Jobs
//         </h3>
//         <button
//           className="text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors"
//           onClick={onClose}
//         >
//           <FiX className="w-5 h-5" />
//         </button>
//       </div>

//       <div className="space-y-6">
//         {/* Job Type Filter */}
//         <div>
//           <h4 className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">
//             Job Type
//           </h4>
//           <div className="flex flex-wrap gap-2">
//             {jobTypes.map(type => (
//               <button
//                 key={type}
//                 onClick={() => onToggleJobType(type)}
//                 className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
//                   filters.jobType.includes(type)
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
//                 }`}
//               >
//                 {type}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Experience Level */}
//         <div>
//           <h4 className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">
//             Experience Level
//           </h4>
//           <div className="flex flex-wrap gap-2">
//             {experienceLevels.map(level => (
//               <button
//                 key={level}
//                 onClick={() => onUpdateFilter("experience", level)}
//                 className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
//                   filters.experience === level
//                     ? "bg-teal-500 text-white"
//                     : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
//                 }`}
//               >
//                 {level}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Salary Range */}
//         <div>
//           <h4 className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">
//             Salary Range
//           </h4>
//           <div className="flex flex-wrap gap-2">
//             {salaryRanges.map(range => (
//               <button
//                 key={range}
//                 onClick={() => onUpdateFilter("salaryRange", range)}
//                 className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
//                   filters.salaryRange === range
//                     ? "bg-amber-500 text-white"
//                     : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
//                 }`}
//               >
//                 {range}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Location */}
//         <div>
//           <h4 className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">
//             Location
//           </h4>
//           <input
//             type="text"
//             placeholder="City or country"
//             value={filters.location}
//             onChange={(e) => onUpdateFilter("location", e.target.value)}
//             className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
//           />
//         </div>
//       </div>

//       <div className="flex justify-end gap-3 mt-6">
//         <button
//           className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg"
//           onClick={onReset}
//         >
//           Reset Filters
//         </button>
//         <button
//           className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg font-medium"
//           onClick={onClose}
//         >
//           Apply Filters
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobPostingFilterPanel;




import React from 'react';
import { FiX } from 'react-icons/fi';

const JobPostingFilterPanel = ({ 
  filters, 
  onUpdateFilter, 
  onToggleJobType, 
  onClose,
  onReset
}) => {
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Remote'];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md h-full overflow-y-auto p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-white"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-8">
          {/* Job Type Filter */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Job Type</h4>
            <div className="flex flex-wrap gap-2">
              {jobTypes.map(type => (
                <button
                  key={type}
                  onClick={() => onToggleJobType(type)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    filters.jobType.includes(type)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          {/* Experience Filter */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Experience Level</h4>
            <div className="grid grid-cols-2 gap-4">
              {[0, 1, 3, 5, 7, 10].map(level => (
                <button
                  key={level}
                  onClick={() => onUpdateFilter("experience", level)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    filters.experience === level.toString()
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {level === 0 ? 'Entry Level' : `${level}+ years`}
                </button>
              ))}
            </div>
          </div>
          
          {/* Salary Range Filter */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Salary Range</h4>
            <div className="grid grid-cols-2 gap-4">
              {['$30k-$50k', '$50k-$80k', '$80k-$120k', '$120k-$180k', '$180k+'].map(range => (
                <button
                  key={range}
                  onClick={() => onUpdateFilter("salary", range)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    filters.salaryRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          
          {/* Location Filter */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Location</h4>
            <div className="relative">
              <input
                type="text"
                placeholder="City or Country"
                value={filters.location}
                onChange={(e) => onUpdateFilter("location", e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 mt-8">
          <button
            onClick={onReset}
            className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Reset All
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPostingFilterPanel;