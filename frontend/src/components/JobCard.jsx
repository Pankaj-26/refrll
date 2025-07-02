import React from "react";
import { 
  FiMapPin, 
  FiBriefcase, 
  FiDollarSign,
  FiClock,
  FiExternalLink,
  FiUserPlus,
  FiCheckCircle,
  FiLoader,
  FiCalendar
} from "react-icons/fi";
import StatusBadge from "./StatusBadge";

const JobCard = ({ job, currentUser, onApply, onRefer, loading, activeTab }) => {
  // Format posted date
  const postedDate = new Date(job.createdAt);
  const formattedDate = postedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: postedDate.getFullYear() !== new Date().getFullYear() 
      ? "numeric" 
      : undefined,
  });

 const isReferrerJob = job.postedByType === 'referrer';

 const remaining = isReferrerJob
  ? (job.applicationLimit ?? 0) - (job.currentApplications ?? 0)
  : null;




  // Determine job action
//   const getJobAction = () => {
//     const roles = currentUser?.roles || {};
//     const isReferrer = roles?.referrer;
//     const isSeeker = roles?.seeker;
//     const userId = currentUser?.id;

//     // Check if user has already claimed this job
//     const alreadyReferred = job.referralClaims?.some(
//       claim => claim.referrer === userId || claim.referrer?._id === userId
//     );

//     // Check if user has already applied
//     const alreadyApplied = job.applied || job.applicants?.includes(userId);
//     // const alreadyApplied = job.applied ;
   





//     // Allow seekers to apply to any job they haven't applied to
//     // if (isSeeker && !alreadyApplied) {
//     //   return 'apply';
//     // }

//     if (isSeeker && !alreadyApplied) {
//   // For referrer jobs: disable if remaining is 0
//   if (isReferrerJob && remaining <= 0) {
//     return null; // Hide button
//   }
//   return 'apply';
// }


//     // Allow referrers to claim unclaimed company jobs
//     if (isReferrer && job.postedByType === "company" && !alreadyReferred) {
//       return 'refer';
//     }

//     // Show claimed status if referrer already claimed
//     if (isReferrer && job.postedByType === "company" && alreadyReferred) {
//       return 'claimed';
//     }

//     return null;
//   };

// Determine job action
const getJobAction = () => {
  const roles = currentUser?.roles || {};
  const isReferrer = roles?.referrer;
  const isSeeker = roles?.seeker;
  const userId = currentUser?.id;

  const alreadyReferred = job.referralClaims?.some(
    claim => claim.referrer === userId || claim.referrer?._id === userId
  );

  const alreadyApplied = job.applied || job.applicants?.includes(userId);

  if (isSeeker && !alreadyApplied) {
    // Prevent if referrer job is full
    if (isReferrerJob && remaining <= 0) {
      return null;
    }
    return 'apply';
  }

  if (isReferrer && job.postedByType === "company" && !alreadyReferred) {
    return 'refer';
  }

  if (isReferrer && job.postedByType === "company" && alreadyReferred) {
    return 'claimed';
  }

  return null;
};


  const action = getJobAction();



  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      {/* Job Type Indicator */}
      <div className={`h-2 ${activeTab === "company" ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "bg-gradient-to-r from-teal-500 to-emerald-500"}`}></div>
      
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              {job.title}
            </h3>
            <div className="flex items-center">
              <span className="text-blue-500 font-medium">{job.company}</span>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
            {job.logo ? (
              <img
                src={job.logo}
                alt={job.company}
                className="w-10 h-10 object-contain"
              />
            ) : (
              <div className="bg-gray-200 dark:bg-gray-600 border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-xl w-10 h-10 flex items-center justify-center">
                <FiBriefcase className="text-gray-500 dark:text-gray-400" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <FiMapPin className="mr-2 flex-shrink-0" />
            <span>{job.location}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <StatusBadge 
              status={job.employmentType} 
              color={
                job.employmentType === "Remote" ? "teal" : 
                job.employmentType === "Full-Time" ? "blue" : 
                job.employmentType === "Part-Time" ? "purple" : "gray"
              } 
            />
            
            <StatusBadge 
              status={`${job.experienceRequired || 0}+ years`} 
              color="amber"
              icon={<FiClock />}
            />
  {isReferrerJob && remaining !== null && remaining >= 0 && (
  <p>Remaining Applications: {remaining}</p>
)}

          </div>
          
          {job.salaryRange && (
            <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
              <FiDollarSign className="mr-2 flex-shrink-0" />
              <span>{job.salaryRange}</span>
            </div>
          )}
        </div>

        <div className="mt-4">
          <p className="text-gray-700 dark:text-gray-300 line-clamp-3 text-sm">
            {job.description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills?.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded"
            >
              {skill}
            </span>
          ))}
          {job.skills?.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="flex flex-wrap justify-between items-center gap-3 mt-4">
          <a
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center text-sm transition-colors"
          >
            View Details <FiExternalLink className="ml-1" />
          </a>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {action === 'refer' && (
              <button
                onClick={() => onRefer(job)}
                disabled={loading}
                className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center transition-all ${
                  loading
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-md'
                }`}
              >
                {loading ? (
                  <FiLoader className="animate-spin mr-2" />
                ) : (
                  <FiUserPlus className="mr-2" />
                )}
                I'll Refer
              </button>
            )}

            {action === 'claimed' && (
              <span className="px-4 py-2 rounded-lg font-medium text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 flex items-center">
                <FiCheckCircle className="mr-2 text-green-500" />
                Job Claimed
              </span>
            )}

            {action === 'apply' && (
              <button
                onClick={() => onApply(job._id)}
                disabled={loading}
                className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center transition-all ${
                  loading
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-md'
                }`}
              >
                {loading ? (
                  <FiLoader className="animate-spin" />
                ) : (
                  'Apply Now'
                )}
              </button>
            )}
          </div>
        </div>

        {/* Posted time */}
        <div className="mt-4 flex items-center text-gray-500 dark:text-gray-400 text-sm pt-4 border-t border-gray-200 dark:border-gray-700">
          <FiCalendar className="mr-2" />
          <span>Posted {formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;