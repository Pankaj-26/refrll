// import React from "react";
// import {
//   FiMapPin,
//   FiBriefcase,
//   FiDollarSign,
//   FiClock,
//   FiExternalLink,
//   FiUserPlus,
//   FiCheckCircle,
//   FiLoader,
//   FiCalendar
// } from "react-icons/fi";
// import StatusBadge from "./StatusBadge";

// const JobCard = ({ job, currentUser, onApply, onRefer, loading, activeTab }) => {
//   // Format posted date
//   const postedDate = new Date(job.createdAt);
//   const formattedDate = postedDate.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: postedDate.getFullYear() !== new Date().getFullYear()
//       ? "numeric"
//       : undefined,
//   });

//  const isReferrerJob = job.postedByType === 'referrer';

//  const remaining = isReferrerJob
//   ? (job.applicationLimit ?? 0) - (job.currentApplications ?? 0)
//   : null;

// // Determine job action
// const getJobAction = () => {
//   const roles = currentUser?.roles || {};
//   const isReferrer = roles?.referrer;
//   const isSeeker = roles?.seeker;
//   const userId = currentUser?.id;

//   const alreadyReferred = job.referralClaims?.some(
//     claim => claim.referrer === userId || claim.referrer?._id === userId
//   );

//   const alreadyApplied = job.applied || job.applicants?.includes(userId);

//   if (isSeeker && !alreadyApplied) {
//     // Prevent if referrer job is full
//     if (isReferrerJob && remaining <= 0) {
//       return null;
//     }
//     return 'apply';
//   }

//   if (isReferrer && job.postedByType === "company" && !alreadyReferred) {
//     return 'refer';
//   }

//   if (isReferrer && job.postedByType === "company" && alreadyReferred) {

//     return 'claimed';
//   }

//   return null;
// };

//   const action = getJobAction();

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
//       {/* Job Type Indicator */}
//       <div className={`h-2 ${activeTab === "company" ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "bg-gradient-to-r from-teal-500 to-emerald-500"}`}></div>

//       <div className="p-6 flex-1">
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
//               {job.title}
//             </h3>
//             <div className="flex items-center">
//               <span className="text-blue-500 font-medium">{job.company}</span>
//             </div>
//           </div>

//           <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
//             {job.logo ? (
//               <img
//                 src={job.logo}
//                 alt={job.company}
//                 className="w-10 h-10 object-contain"
//               />
//             ) : (
//               <div className="bg-gray-200 dark:bg-gray-600 border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-xl w-10 h-10 flex items-center justify-center">
//                 <FiBriefcase className="text-gray-500 dark:text-gray-400" />
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="mt-4 space-y-3">
//           <div className="flex items-center text-gray-600 dark:text-gray-400">
//             <FiMapPin className="mr-2 flex-shrink-0" />
//             <span>{job.location}</span>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             <StatusBadge
//               status={job.employmentType}
//               color={
//                 job.employmentType === "Remote" ? "teal" :
//                 job.employmentType === "Full-Time" ? "blue" :
//                 job.employmentType === "Part-Time" ? "purple" : "gray"
//               }
//             />

//             <StatusBadge
//               status={`${job.experienceRequired || 0}+ years`}
//               color="amber"
//               icon={<FiClock />}
//             />
//   {isReferrerJob && remaining !== null && remaining >= 0 && (
//   <p>Remaining Applications: {remaining}</p>
// )}

//           </div>

//           {job.salaryRange && (
//             <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
//               <FiDollarSign className="mr-2 flex-shrink-0" />
//               <span>{job.salaryRange}</span>
//             </div>
//           )}
//         </div>

//         <div className="mt-4">
//           <p className="text-gray-700 dark:text-gray-300 line-clamp-3 text-sm">
//             {job.description}
//           </p>
//         </div>

//         <div className="mt-4 flex flex-wrap gap-2">
//           {job.skills?.slice(0, 4).map((skill, index) => (
//             <span
//               key={index}
//               className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded"
//             >
//               {skill}
//             </span>
//           ))}
//           {job.skills?.length > 4 && (
//             <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded">
//               +{job.skills.length - 4} more
//             </span>
//           )}
//         </div>
//       </div>

//       <div className="p-6 pt-0">
//         <div className="flex flex-wrap justify-between items-center gap-3 mt-4">
//           <a
//             href={job.applyLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center text-sm transition-colors"
//           >
//             View Details <FiExternalLink className="ml-1" />
//           </a>

//           {/* Action Buttons */}
//           <div className="flex flex-wrap gap-2">
//             {action === 'refer' && (
//               <button
//                 onClick={() => onRefer(job)}
//                 disabled={loading}
//                 className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center transition-all ${
//                   loading
//                     ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
//                     : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-md'
//                 }`}
//               >
//                 {loading ? (
//                   <FiLoader className="animate-spin mr-2" />
//                 ) : (
//                   <FiUserPlus className="mr-2" />
//                 )}
//                 I'll Refer
//               </button>
//             )}

//             {action === 'claimed' && (
//               <span className="px-4 py-2 rounded-lg font-medium text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 flex items-center">
//                 <FiCheckCircle className="mr-2 text-green-500" />
//                 Job Claimed
//               </span>
//             )}

//             {action === 'apply' && (
//               <button
//                 onClick={() => onApply(job._id)}
//                 disabled={loading}
//                 className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center transition-all ${
//                   loading
//                     ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
//                     : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-md'
//                 }`}
//               >
//                 {loading ? (
//                   <FiLoader className="animate-spin" />
//                 ) : (
//                   'Apply Now'
//                 )}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Posted time */}
//         <div className="mt-4 flex items-center text-gray-500 dark:text-gray-400 text-sm pt-4 border-t border-gray-200 dark:border-gray-700">
//           <FiCalendar className="mr-2" />
//           <span>Posted {formattedDate}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobCard;

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
  FiCalendar,
} from "react-icons/fi";
import StatusBadge from "./StatusBadge";
import { FaClipboardList } from "react-icons/fa";
import toast from "react-hot-toast";

const JobCard = ({
  job,
  currentUser,
  onApply,
  onRefer,
  loading,
  activeTab,
}) => {
  // Format posted date
  const postedDate = new Date(job.createdAt);
  const formattedDate = postedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year:
      postedDate.getFullYear() !== new Date().getFullYear()
        ? "numeric"
        : undefined,
  });

  const company = job.company || "Unknown Company";
  const title = job.title || "Untitled Position";
  const location = job.location || "Location not specified";
  const salaryRange = job.salaryRange || "Salary not specified";

  const isReferrerJob = job.postedByType === "referrer";

  const remaining = isReferrerJob
    ? (job.applicationLimit ?? 0) - (job.currentApplications ?? 0)
    : null;

  // Determine job action
  const getJobAction = () => {
    const roles = currentUser?.roles || {};
    const isReferrer = roles?.referrer;
    const isSeeker = roles?.seeker;
    const userId = currentUser?.id;

    const alreadyReferred = job.referralClaims?.some(
      (claim) => claim.referrer === userId || claim.referrer?._id === userId
    );

    const alreadyApplied = job.applied || job.applicants?.includes(userId);

    if (isSeeker && !alreadyApplied) {
      // Prevent if referrer job is full
      if (isReferrerJob && remaining <= 0) {
        return null;
      }
      return "apply";
    }

    if (isReferrer && job.postedByType === "company" && !alreadyReferred) {
      return "refer";
    }

    if (isReferrer && job.postedByType === "company" && alreadyReferred) {
      return "claimed";
    }

    return null;
  };

  const action = getJobAction();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      {/* Job Type Indicator */}
      <div
        className={`h-2 ${
          activeTab === "company"
            ? "bg-gradient-to-r from-blue-500 to-indigo-500"
            : "bg-gradient-to-r from-teal-500 to-emerald-500"
        }`}
      ></div>

      <div className="p-4 flex-1">
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

          <div className="flex flex-wrap gap-2 ">
            <StatusBadge
              status={job.employmentType}
              color={
                job.employmentType === "Remote"
                  ? "teal"
                  : job.employmentType === "Full-Time"
                  ? "blue"
                  : job.employmentType === "Part-Time"
                  ? "purple"
                  : "gray"
              }
            />

            <StatusBadge
              status={`${job.experienceRequired || 0}+ years`}
              color="amber"
              icon={<FiClock />}
            />
            {isReferrerJob && remaining !== null && remaining >= 0 && (
              // <p>Remaining Applications: {remaining}</p>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm w-fit">
                <FaClipboardList className="mr-2 text-blue-600" />
                <span>
                  Apply soon –{" "}
                  <strong className="text-black dark:text-white">
                    {remaining}{" "}
                  </strong>
                </span>
              </div>
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
           
  //   onClick={() => {
  //   navigator.clipboard.writeText(`${window.location.origin}/job/${job._id}`);
  //   toast.success("Job link copied to clipboard!");
  // }}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center text-sm transition-colors"
          >
            View Details <FiExternalLink className="ml-1" />
          </a>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {action === "refer" && (
              <button
                onClick={() => onRefer(job)}
                disabled={loading}
                className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center transition-all ${
                  loading
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-md"
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

            {action === "claimed" && (
              <span className="px-4 py-2 rounded-lg font-medium text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 flex items-center">
                <FiCheckCircle className="mr-2 text-green-500" />
                Job Claimed
              </span>
            )}

            {action === "apply" && (
              <button
                onClick={() => onApply(job._id)}
                disabled={loading}
                className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center transition-all ${
                  loading
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-md"
                }`}
              >
                {loading ? <FiLoader className="animate-spin" /> : "Apply Now"}
              </button>
            )}
          </div>
        </div>

        {/* Posted time */}
        <div className="mt-2 flex items-center text-gray-500 dark:text-gray-400 text-sm pt-2 border-t border-gray-200 dark:border-gray-700">
          <FiCalendar className="mr-2" />
          <span>Posted {formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;

// import React from "react";
// import {
//   FiMapPin,
//   FiBriefcase,
//   FiDollarSign,
//   FiClock,
//   FiExternalLink,
//   FiUserPlus,
//   FiCheckCircle,
//   FiLoader,
//   FiCalendar
// } from "react-icons/fi";
// import StatusBadge from "./StatusBadge";

// const JobCard = ({ job, currentUser, onApply, onRefer, loading, activeTab }) => {
//   // Format posted date
//   const postedDate = new Date(job.createdAt);
//   const formattedDate = postedDate.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: postedDate.getFullYear() !== new Date().getFullYear()
//       ? "numeric"
//       : undefined,
//   });

//   const isReferrerJob = job.postedByType === 'referrer';
//   const remaining = isReferrerJob
//     ? (job.applicationLimit ?? 0) - (job.currentApplications ?? 0)
//     : null;

//   // Determine job action
//   const getJobAction = () => {
//     const roles = currentUser?.roles || {};
//     const isReferrer = roles?.referrer;
//     const isSeeker = roles?.seeker;
//     const userId = currentUser?.id;

//     const alreadyReferred = job.referralClaims?.some(
//       claim => claim.referrer === userId || claim.referrer?._id === userId
//     );

//     const alreadyApplied = job.applied || job.applicants?.includes(userId);

//     if (isSeeker && !alreadyApplied) {
//       if (isReferrerJob && remaining <= 0) return null;
//       return 'apply';
//     }

//     if (isReferrer && job.postedByType === "company" && !alreadyReferred) {
//       return 'refer';
//     }

//     if (isReferrer && job.postedByType === "company" && alreadyReferred) {
//       return 'claimed';
//     }

//     return null;
//   };

//   const action = getJobAction();

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
//       {/* Job Type Indicator */}
//       <div className={`h-1.5 ${activeTab === "company" ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "bg-gradient-to-r from-teal-500 to-emerald-500"}`}></div>

//       <div className="p-4 flex-1">
//         <div className="flex justify-between items-start mb-3">
//           <div className="flex-1 min-w-0">
//             <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
//               {job.title}
//             </h3>
//             <div className="flex items-center">
//               <span className="text-blue-500 text-sm font-medium truncate">
//                 {job.company}
//               </span>
//             </div>
//           </div>

//           <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg ml-2 flex-shrink-0">
//             {job.logo ? (
//               <img
//                 src={job.logo}
//                 alt={job.company}
//                 className="w-8 h-8 object-contain"
//               />
//             ) : (
//               <div className="bg-gray-200 dark:bg-gray-600 border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg w-8 h-8 flex items-center justify-center">
//                 <FiBriefcase className="text-gray-500 dark:text-gray-400 text-sm" />
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="mt-3 space-y-2">
//           <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
//             <FiMapPin className="mr-1.5 flex-shrink-0 text-xs" />
//             <span className="truncate">{job.location}</span>
//           </div>

//           <div className="flex flex-wrap gap-1">
//             <StatusBadge
//               status={job.employmentType}
//               size="small"
//               color={
//                 job.employmentType === "Remote" ? "teal" :
//                 job.employmentType === "Full-Time" ? "blue" :
//                 job.employmentType === "Part-Time" ? "purple" : "gray"
//               }
//             />

//             <StatusBadge
//               status={`${job.experienceRequired || 0}+ yrs`}
//               size="small"
//               color="amber"
//               icon={<FiClock className="text-xs" />}
//             />

//             {isReferrerJob && remaining !== null && remaining >= 0 && (
//               <StatusBadge
//                 status={`${remaining} left`}
//                 size="small"
//                 color="teal"
//               />
//             )}
//           </div>

//           {job.salaryRange && (
//             <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
//               <FiDollarSign className="mr-1.5 flex-shrink-0 text-xs" />
//               <span className="truncate">{job.salaryRange}</span>
//             </div>
//           )}
//         </div>

//         <div className="mt-3">
//           <p className="text-gray-700 dark:text-gray-300 line-clamp-2 text-xs">
//             {job.description}
//           </p>
//         </div>

//         <div className="mt-3 flex flex-wrap gap-1">
//           {job.skills?.slice(0, 4).map((skill, index) => (
//             <span
//               key={index}
//               className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded"
//             >
//               {skill}
//             </span>
//           ))}
//           {job.skills?.length > 4 && (
//             <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded">
//               +{job.skills.length - 4}
//             </span>
//           )}
//         </div>
//       </div>

//       <div className="p-4 pt-0">
//         <div className="flex flex-wrap justify-between items-center gap-2 mt-3">
//           <a
//             href={job.applyLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center text-xs transition-colors"
//           >
//             Details <FiExternalLink className="ml-1 text-xs" />
//           </a>

//           {/* Action Buttons */}
//           <div className="flex flex-wrap gap-1.5">
//             {action === 'refer' && (
//               <button
//                 onClick={() => onRefer(job)}
//                 disabled={loading}
//                 className={`px-3 py-1.5 rounded-md font-medium text-xs flex items-center transition-all ${
//                   loading
//                     ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
//                     : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white'
//                 }`}
//               >
//                 {loading ? (
//                   <FiLoader className="animate-spin mr-1 text-xs" />
//                 ) : (
//                   <FiUserPlus className="mr-1 text-xs" />
//                 )}
//                 Refer
//               </button>
//             )}

//             {action === 'claimed' && (
//               <span className="px-3 py-1.5 rounded-md font-medium text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 flex items-center">
//                 <FiCheckCircle className="mr-1 text-green-500 text-xs" />
//                 Claimed
//               </span>
//             )}

//             {action === 'apply' && (
//               <button
//                 onClick={() => onApply(job._id)}
//                 disabled={loading}
//                 className={`px-3 py-1.5 rounded-md font-medium text-xs flex items-center transition-all ${
//                   loading
//                     ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
//                     : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'
//                 }`}
//               >
//                 {loading ? <FiLoader className="animate-spin" /> : 'Apply'}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Posted time */}
//         <div className="mt-3 flex items-center text-gray-500 dark:text-gray-400 text-xs pt-2 border-t border-gray-200 dark:border-gray-700">
//           <FiCalendar className="mr-1.5 text-xs" />
//           <span>Posted {formattedDate}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobCard;
