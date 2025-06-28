import { FiBookmark, FiMapPin, FiCalendar, FiArrowRight } from "react-icons/fi";

const statusColors = {
  applied: "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800/50",
  interview: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/50",
  reviewed: "bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800/50",
  rejected: "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800/50",
  accepted: "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800/50",
};

const ApplicationCard = ({ job, onClick }) => {
  const status = job.applicationStatus?.toLowerCase() || 'applied';
  
  return (
    <div 
      className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
      onClick={() => onClick(job)}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {job.job?.title}
          </h3>
          <p className="text-sm text-blue-500">
            {job.job?.company}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[status] || statusColors.applied}`}>
          {job.applicationStatus}
        </span>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
        <FiMapPin className="flex-shrink-0" />
        <span>{job.job?.location || "Remote"}</span>
      </div>

      {job.interviewDate && (
        <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 mb-3 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg">
          <FiCalendar className="flex-shrink-0" />
          <span>Interview: {new Date(job.interviewDate).toLocaleDateString()}</span>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Applied: {job?.createdAt?.split("T")[0]}
        </div>
        <button className="flex items-center text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium">
          View Details <FiArrowRight className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard