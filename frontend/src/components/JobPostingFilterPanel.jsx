// import React from "react";
// import { FiX } from "react-icons/fi";

// const JobPostingFilterPanel = ({ 
//   filters,
//   onUpdateFilter,
//   onToggleJobType,
//   onClose,
//   onReset
// }) => {
//   const jobTypes = ["Full-Time", "Part-Time", "Contract", "Internship"];
//   const experienceLevels = ["1", "2","3","4", "5", "6", "7", "8", "9", "10"];
//   // const salaryRanges = ["2", "5", "11", "15", "20", "30+"];

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
//         {/* <div>
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
//         </div> */}

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
import React, { useState } from "react";
import { FiX, FiChevronDown, FiBriefcase, FiMapPin, FiAward, FiFilter } from "react-icons/fi";

const JobPostingFilterPanel = ({ 
  filters,
  onUpdateFilter,
  onToggleJobType,
  onClose,
  onReset
}) => {
  const jobTypes = ["Full-Time", "Part-Time", "Contract", "Internship"];
  const experienceLevels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const [activeFilter, setActiveFilter] = useState(null);

  const toggleFilter = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  const handleExperienceSelect = (level) => {
    onUpdateFilter("experience", level);
    setActiveFilter(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700 w-full max-w-4xl">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <FiFilter className="text-blue-500 text-lg" />
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Filter Jobs
          </h3>
        </div>
        <button
          className="text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors"
          onClick={onClose}
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Horizontal Filter Controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        {/* Job Type Filter */}
        <div className="relative">
          <button
            onClick={() => toggleFilter("jobType")}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FiBriefcase className="text-blue-500" />
            Job Type
            <FiChevronDown className="ml-1" />
          </button>
          
          {activeFilter === "jobType" && (
            <div className="absolute left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 p-2">
              <div className="grid grid-cols-2 gap-2">
                {jobTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => onToggleJobType(type)}
                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                      filters.jobType.includes(type)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Experience Level */}
        <div className="relative">
          <button
            onClick={() => toggleFilter("experience")}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FiAward className="text-teal-500" />
            Experience
            <FiChevronDown className="ml-1" />
          </button>
          
          {activeFilter === "experience" && (
            <div className="absolute left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 p-2">
              <div className="flex flex-wrap gap-1">
                {experienceLevels.map(level => (
                  <button
                    key={level}
                    onClick={() => handleExperienceSelect(level)}
                    className={`w-8 h-8 rounded text-xs font-medium transition-colors flex items-center justify-center ${
                      filters.experience === level
                        ? "bg-teal-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Location */}
        <div className="relative flex-grow max-w-xs">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
            <FiMapPin className="text-amber-500" />
            <input
              type="text"
              placeholder="Location"
              value={filters.location}
              onChange={(e) => onUpdateFilter("location", e.target.value)}
              className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-sm"
            onClick={onReset}
          >
            Reset
          </button>
          <button
            className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg font-medium text-sm"
            onClick={onClose}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {/* {(filters.jobType.length > 0 || filters.experience || filters.location) && (
        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {filters.jobType.map(type => (
              <div 
                key={type}
                className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs"
              >
                {type}
                <button 
                  onClick={() => onToggleJobType(type)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </div>
            ))}
            
            {filters.experience && (
              <div className="flex items-center gap-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-2 py-1 rounded text-xs">
                Exp: {filters.experience} years
                <button 
                  onClick={() => onUpdateFilter("experience", "")}
                  className="text-teal-500 hover:text-teal-700"
                >
                  ×
                </button>
              </div>
            )}
            
            {filters.location && (
              <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-2 py-1 rounded text-xs">
                {filters.location}
                <button 
                  onClick={() => onUpdateFilter("location", "")}
                  className="text-amber-500 hover:text-amber-700"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default JobPostingFilterPanel;

// import React from 'react';
// import { FiX } from 'react-icons/fi';

// const JobPostingFilterPanel = ({ 
//   filters, 
//   onUpdateFilter, 
//   onToggleJobType, 
//   onClose,
//   onReset
// }) => {
//   const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Remote'];
  
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
//       <div className="bg-white dark:bg-gray-800 w-full max-w-md h-full overflow-y-auto p-6 shadow-xl">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h3>
//           <button 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 dark:hover:text-white"
//           >
//             <FiX className="w-6 h-6" />
//           </button>
//         </div>
        
//         <div className="space-y-8">
//           {/* Job Type Filter */}
//           <div>
//             <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Job Type</h4>
//             <div className="flex flex-wrap gap-2">
//               {jobTypes.map(type => (
//                 <button
//                   key={type}
//                   onClick={() => onToggleJobType(type)}
//                   className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
//                     filters.jobType.includes(type)
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
//                   }`}
//                 >
//                   {type}
//                 </button>
//               ))}
//             </div>
//           </div>
          
//           {/* Experience Filter */}
//           <div>
//             <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Experience Level</h4>
//             <div className="grid grid-cols-2 gap-4">
//               {[0, 1, 3, 5, 7, 10].map(level => (
//                 <button
//                   key={level}
//                   onClick={() => onUpdateFilter("experience", level)}
//                   className={`px-3 py-2 rounded-lg text-sm font-medium ${
//                     filters.experience === level.toString()
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
//                   }`}
//                 >
//                   {level === 0 ? 'Entry Level' : `${level}+ years`}
//                 </button>
//               ))}
//             </div>
//           </div>
          
//           {/* Salary Range Filter */}
//           <div>
//             <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Salary Range</h4>
//             <div className="grid grid-cols-2 gap-4">
//               {['$30k-$50k', '$50k-$80k', '$80k-$120k', '$120k-$180k', '$180k+'].map(range => (
//                 <button
//                   key={range}
//                   onClick={() => onUpdateFilter("salary", range)}
//                   className={`px-3 py-2 rounded-lg text-sm font-medium ${
//                     filters.salaryRange === range
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
//                   }`}
//                 >
//                   {range}
//                 </button>
//               ))}
//             </div>
//           </div>
          
//           {/* Location Filter */}
//           <div>
//             <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Location</h4>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="City or Country"
//                 value={filters.location}
//                 onChange={(e) => onUpdateFilter("location", e.target.value)}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//         </div>
        
//         <div className="flex gap-3 mt-8">
//           <button
//             onClick={onReset}
//             className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600"
//           >
//             Reset All
//           </button>
//           <button
//             onClick={onClose}
//             className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
//           >
//             Apply Filters
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobPostingFilterPanel;