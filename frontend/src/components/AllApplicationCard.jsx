import React from "react";
import { 
  FiMapPin, 
  FiBriefcase, 
  FiDollarSign,
  FiClock,
  FiExternalLink
} from "react-icons/fi";
import StatusBadge from "./StatusBadge";

const AllApplicationCard = ({ application, onClick }) => {
  const { job, appliedViaReferral, applicationStatus, createdAt } = application;
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
            {job?.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-blue-500 font-medium">
              {job?.company}
            </span>
            <StatusBadge 
              status={applicationStatus} 
              color={
                applicationStatus === "interview" ? "amber" : 
                applicationStatus === "rejected" ? "red" : 
                applicationStatus === "hired" ? "green" : "blue"
              } 
            />
          </div>
        </div>
        <button className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
          <FiExternalLink className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <FiMapPin className="flex-shrink-0" />
          <span className="line-clamp-1">{job?.location || "Remote"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <FiDollarSign className="flex-shrink-0" />
          <span>{job?.salaryRange || "Not specified"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <FiBriefcase className="flex-shrink-0" />
          <span>{job?.employmentType || "Full-time"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <FiClock className="flex-shrink-0" />
          <span>{job?.experienceRequired || "Any experience"}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Applied: {new Date(createdAt).toLocaleDateString()}
        </div>
        <div className="text-xs px-2 py-1 rounded-full font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          {appliedViaReferral ? "Referral" : "Direct"}
        </div>
      </div>
    </div>
  );
};

export default AllApplicationCard;