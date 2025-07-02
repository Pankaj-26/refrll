// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchJobsWithApplicantsForReferrer,
//   updateApplicationStatus,
// } from "../features/jobSlice";
// import {
//   FiBriefcase,
//   FiUser,
//   FiFileText,
//   FiUsers,
//   FiMapPin,
//   FiDollarSign,
//   FiClock,
//   FiChevronDown,
//   FiChevronUp,
//   FiX,
// } from "react-icons/fi";

// export default function JobsWithApplicants() {
//   const dispatch = useDispatch();
//   const { jobs,applicants, loading, error, updating } = useSelector((state) => state.jobs);
//   const [expandedJobs, setExpandedJobs] = useState({});

//   useEffect(() => {
//     dispatch(fetchJobsWithApplicantsForReferrer());
//   }, [dispatch]);

//   console.log("JOBS IN COMPONENT", jobs);

//   const toggleJobExpansion = (jobId) => {
//     setExpandedJobs((prev) => ({
//       ...prev,
//       [jobId]: !prev[jobId],
//     }));
//   };

//   const handleStatusUpdate = async (applicationId, newStatus) => {
//     try {

//       await dispatch(
//         updateApplicationStatus({ applicationId, status: newStatus })
//       );
//       dispatch(fetchJobsWithApplicantsForReferrer());
//     } catch (error) {
//       console.error("Status update failed:", error);
//     }
//   };

//   const statusColors = {
//     applied: "bg-blue-100 text-blue-800",
//     reviewed: "bg-purple-100 text-purple-800",
//     accepted: "bg-green-100 text-green-800",
//     rejected: "bg-red-100 text-red-800",
//   };

//   const badgeColors = {
//     Open: "bg-green-100 text-green-800",
//     Closed: "bg-red-100 text-red-800",
//   };

//   // Loading state
//   if (loading)
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
//           <p className="text-gray-600">Loading job applications...</p>
//         </div>
//       </div>
//     );

//   // Error state
//   if (error)
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-red-500">
//         <div className="bg-red-100 p-4 rounded-full mb-4">
//           <FiX className="w-8 h-8" />
//         </div>
//         <h2 className="text-xl font-bold mb-2">Failed to load data</h2>
//         <p className="mb-4 max-w-md text-center">{error}</p>
//         <button
//           className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//           onClick={() => dispatch(fetchJobsWithApplicants())}
//         >
//           Try Again
//         </button>
//       </div>
//     );

//   // Empty state
//   if (jobs?.job?.length === 0)
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="text-center max-w-md">
//           <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
//             <FiBriefcase className="w-12 h-12 text-blue-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             No Jobs Found
//           </h2>
//           <p className="text-gray-600 mb-4">
//             You haven't posted or claimed any jobs yet. Start by creating a new
//             job posting.
//           </p>
//           <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//             Create Job
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div className="bg-gray-50 min-h-screen p-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Your Job Applications
//           </h1>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Manage applications for jobs you've posted or claimed
//           </p>
//         </div>

//         <div className="space-y-5">
//           {jobs?.map((job) => (
//             <div
//               key={job._id}
//               className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
//             >
//               <div
//                 className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
//                 onClick={() => toggleJobExpansion(job._id)}
//               >
//                 <div className="flex items-center space-x-4">
//                   <div className="bg-blue-100 p-2 rounded-lg">
//                     <FiBriefcase className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <div className="flex items-center space-x-2">
//                       <h2 className="text-lg font-semibold text-gray-900">
//                         {job.title}
//                       </h2>
//                       <span
//                         className={`px-2 py-1 text-xs rounded-full ${
//                           badgeColors[job.status] ||
//                           "bg-gray-100 text-gray-800"
//                         }`}
//                       >
//                         {job.status}
//                       </span>
//                     </div>
//                     <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mt-1">
//                       <span className="flex items-center">
//                         <FiBriefcase className="mr-1" size={14} />
//                         {job.company}
//                       </span>
//                       <span className="flex items-center">
//                         <FiMapPin className="mr-1" size={14} />
//                         {job.location}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-4">
//                   <div className="bg-blue-50 px-3 py-1 rounded text-center">
//                     <p className="text-xs text-blue-800 font-medium">
//                       Applications
//                     </p>
//                     <p className="text-sm font-bold text-blue-900">
//                       {job?.applicants?.length || 0}/{job?.applicationLimit || "∞"}
//                     </p>
//                   </div>
//                   <button className="text-gray-500 hover:text-gray-700">
//                     {expandedJobs[job._id] ? (
//                       <FiChevronUp size={20} />
//                     ) : (
//                       <FiChevronDown size={20} />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {expandedJobs[job._id] && (
//                 <div className="border-t border-gray-200 p-4 bg-gray-50">
//                   <div className="flex items-center text-gray-700 mb-4">
//                     <FiUsers className="mr-2" />
//                     <h3 className="font-medium">
//                       Applicants ({job.applicants.length || 0})
//                     </h3>
//                   </div>

//                   {jobs.length === 0 ? (
//                     <div className="text-center py-6 bg-white rounded border border-gray-200">
//                       <FiUser className="w-12 h-12 mx-auto text-gray-400 mb-2" />
//                       <p className="text-gray-600 font-medium">
//                         No applications yet
//                       </p>
//                       <p className="text-gray-500 text-sm">
//                         Share this job to attract applicants
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {job?.applicants?.map((app) => (
//                         <div
//                           key={app._id}
//                           className="bg-white rounded border border-gray-200 p-4"
//                         >
//                           <div className="flex justify-between items-start mb-3">
//                             <div className="flex items-start space-x-3">
//                               <div className="bg-green-100 p-2 rounded">
//                                 <FiUser className="w-5 h-5 text-green-600" />
//                               </div>
//                               <div>
//                                 <h4 className="font-bold text-gray-900">
//                                   {app.seeker?.name ||
//                                     app.seeker?.email ||
//                                     "Anonymous Applicant"}
//                                 </h4>
//                                 <p className="text-xs text-gray-500">
//                                   Applied:{" "}
//                                   {new Date(app.createdAt).toLocaleDateString()}
//                                 </p>
//                               </div>
//                             </div>
//                             <span
//                               className={`px-2.5 py-1 text-xs rounded-full ${
//                                 statusColors[app.referrerStatus]
//                               }`}
//                             >
//                               {app.referrerStatus.charAt(0).toUpperCase() +
//                                 app.referrerStatus.slice(1)}
//                             </span>
//                           </div>

//                           <div className="space-y-3">
//                             {app.seeker?.profile?.experience && (
//                               <div>
//                                 <p className="text-xs text-gray-500">
//                                   Experience
//                                 </p>
//                                 <p className="text-sm">
//                                   {app.seeker.profile.experience} years
//                                 </p>
//                               </div>
//                             )}

//                             {app.seeker?.profile?.skills?.length > 0 && (
//                               <div>
//                                 <p className="text-xs text-gray-500 mb-1">
//                                   Skills
//                                 </p>
//                                 <div className="flex flex-wrap gap-1">
//                                   {app.seeker.profile.skills
//                                     .slice(0, 3)
//                                     .map((skill, i) => (
//                                       <span
//                                         key={i}
//                                         className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-xs"
//                                       >
//                                         {skill}
//                                       </span>
//                                     ))}
//                                 </div>
//                               </div>
//                             )}

//                             <div className="flex justify-between pt-3 border-t border-gray-200">
//                               {app.seeker.resume.url ? (
//                                 <a
//                                   href={app.resumeUrl}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
//                                 >
//                                   <FiFileText className="mr-1" size={14} />
//                                   View Resume
//                                 </a>
//                               ) : (
//                                 <span className="text-gray-500 text-sm">
//                                   No resume available
//                                 </span>
//                               )}

//                               <div className="relative">
//                                 <select
//                                   value={app.referrerStatus
// }
//                                   onChange={(e) =>
//                                     handleStatusUpdate(app._id, e.target.value)
//                                   }
//                                   disabled={updating === app._id}
//                                   className="pl-2 pr-8 py-1 text-sm rounded border border-gray-300 bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                                 >
//                                   <option value="applied">Applied</option>
//                                   <option value="reviewed">Reviewed</option>
//                                   <option value="accepted">Accepted</option>
//                                   <option value="rejected">Rejected</option>
//                                 </select>
//                                 <FiChevronDown
//                                   className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//                                   size={16}
//                                 />
//                               </div>
//                             </div>

//                             {app.statusUpdatedAt && (
//                               <div className="text-xs text-gray-400 text-right">
//                                 Updated{" "}
//                                 {new Date(
//                                   app.statusUpdatedAt
//                                 ).toLocaleDateString()}
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       ))
//                     }
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobsWithApplicantsForReferrer,
  updateApplicationStatus,
  optimisticStatusUpdate
} from "../features/jobSlice";
import {
  FiBriefcase,
  FiUser,
  FiFileText,
  FiUsers,
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiChevronDown,
  FiChevronUp,
  FiX,
  FiCheckCircle,
  FiRefreshCw,
  FiFilter,
  FiShare,
  FiMessageSquare,
  FiMail,
  FiPhone,
  FiLinkedin,
  FiDownload,
  FiSearch
} from "react-icons/fi";
import ReferrerStatusBadge from "../components/ReferrerStatusbadge";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

import ReferrerApplicationCard from "../components/ReferrerApplicationCard";

export default function JobsWithApplicants() {
  const dispatch = useDispatch();
  const { jobs, loading, error, updating } = useSelector((state) => state.jobs);
  const [expandedJobs, setExpandedJobs] = useState({});
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
   const [isRefreshing, setIsRefreshing] = useState(false);




   const handleRefresh = useCallback(() => {
       setIsRefreshing(true);
       dispatch(fetchJobsWithApplicantsForReferrer()).finally(() => {
         setIsRefreshing(false);
       });
     }, [dispatch]);
 
  useEffect(() => {
    dispatch(fetchJobsWithApplicantsForReferrer());
  }, [dispatch]);

  const toggleJobExpansion = (jobId) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };




  // const handleStatusUpdate = async (jobId, applicationId, newStatus) => {
  //   try {
  //     // Optimistic update: Update Redux store immediately
  //     console.log(newStatus)
  //     dispatch(optimisticStatusUpdate({ jobId, applicationId, newStatus }));

  //     // Send update to server
  //     await dispatch(
  //       updateApplicationStatus({ applicationId, status: newStatus })
  //     ).unwrap();
  //   } catch (error) {
  //     console.error("Status update failed:", error);
  //     // Revert on error (handled automatically by reducer)
  //   }
  // };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await dispatch(
        updateApplicationStatus({ applicationId, status: newStatus })
      );
      handleRefresh()

      
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const filteredJobs = jobs.filter(job => {
    // Filter by job status
    if (statusFilter !== "all" && job.status !== statusFilter) return false;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchesJob =
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term);

      const matchesApplicant = job.applicants?.some(applicant =>
        applicant.seeker?.name?.toLowerCase().includes(term) ||
        applicant.seeker?.email?.toLowerCase().includes(term)
      );

      return matchesJob || matchesApplicant;
    }

    return true;
  });

  // Status badge colors
  const statusColors = {
    applied: "blue",
    reviewed: "purple",
    accepted: "green",
    rejected: "red"
  };

  // Job status colors
  const jobStatusColors = {
    Open: "green",
    Closed: "red",
    Paused: "amber"
  };

  // Loading state
  if (loading && jobs.length === 0) {
    return <LoadingSpinner message="Loading job applications..." />;
  }

  // Error state
  if (error && jobs.length === 0) {
    return (
      <ErrorState
        message={error}
        onRetry={() => dispatch(fetchJobsWithApplicantsForReferrer())}
      />
    );
  }

  // Empty state
  if (jobs.length === 0) {
    return (
      <EmptyState
        icon={<FiBriefcase className="w-12 h-12 text-gray-400" />}
        title="No Jobs Found"
        description="You haven't posted or claimed any jobs yet. Start by creating a new job posting."
        actionText="Create Job"
        onAction={() => console.log("Create job clicked")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Your Job Applications
          </h1>
          <p className="text-gray-600">
            Manage applications for jobs you've posted or claimed
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs or applicants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="all">All Statuses</option>
                <option value="Open">Open Jobs</option>
                <option value="Closed">Closed Jobs</option>
                <option value="Paused">Paused Jobs</option>
              </select>
              <FiChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
            </div>

            <button className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600">
              <FiFilter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="text-gray-500 text-sm mb-1">Total Jobs</div>
            <div className="text-2xl font-bold text-gray-900">{jobs.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="text-gray-500 text-sm mb-1">Open Jobs</div>
            <div className="text-2xl font-bold text-green-600">
              {jobs.filter(job => job.status === "Open").length}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="text-gray-500 text-sm mb-1">Total Applicants</div>
            <div className="text-2xl font-bold text-blue-600">
              {jobs.reduce((total, job) => total + (job.applicants?.length || 0), 0)}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="text-gray-500 text-sm mb-1">Avg. per Job</div>
            <div className="text-2xl font-bold text-purple-600">
              {jobs.length ?
                Math.round(jobs.reduce((total, job) => total + (job.applicants?.length || 0), 0) / jobs.length) :
                0
              }
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <div
                className="p-4 cursor-pointer flex justify-between items-center"
                onClick={() => toggleJobExpansion(job._id)}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <FiBriefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-900">
                        {job.title}
                      </h2>
                      <ReferrerStatusBadge
                        status={job.status}
                        color={jobStatusColors[job.status] || "gray"}
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 mt-1">
                      <span className="flex items-center">
                        <FiBriefcase className="mr-1" />
                        {job.company}
                      </span>
                      <span className="flex items-center">
                        <FiMapPin className="mr-1" />
                        {job.location}
                      </span>
                      {job.salaryRange && (
                        <span className="flex items-center">
                          <FiDollarSign className="mr-1" />
                          {job.salaryRange}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 px-3 py-1.5 rounded-xl text-center">
                    <p className="text-xs text-blue-800 font-medium">
                      Applications
                    </p>
                    <p className="text-sm font-bold text-blue-900">
                      {job?.applicants?.length || 0}/{job?.applicationLimit || "∞"}
                    </p>
                  </div>
                  <button className="text-gray-500 hover:text-gray-700">
                    {expandedJobs[job._id] ? (
                      <FiChevronUp size={20} />
                    ) : (
                      <FiChevronDown size={20} />
                    )}
                  </button>
                </div>
              </div>

              {expandedJobs[job._id] && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-gray-700">
                      <FiUsers className="mr-2" />
                      <h3 className="font-bold">
                        Applicants ({job.applicants.length || 0})
                      </h3>
                    </div>

                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm flex items-center">
                        <FiShare className="mr-1" /> Share Job
                      </button>
                      <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center">
                        <FiRefreshCw className="mr-1" /> Refresh
                      </button>
                    </div>
                  </div>

                  {job.applicants.length === 0 ? (
                    <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
                      <FiUser className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600 font-medium">
                        No applications yet
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Share this job to attract applicants
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {job.applicants.map((app) => (
                        <ReferrerApplicationCard
                          key={app._id}
                          application={app}
                          onStatusUpdate={handleStatusUpdate}
                          updating={updating === app._id}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && jobs.length > 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <FiX className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No matching jobs or applicants
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}







// below is the testing one 


// import React, { useState, useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchJobsWithApplicantsForReferrer,
//   updateApplicationStatus,
// } from "../features/jobSlice";
// import {
//   FiBriefcase,
//   FiUser,
//   FiMapPin,
//   FiDollarSign,
//   FiChevronDown,
//   FiChevronUp,
//   FiX,
//   FiRefreshCw,
//   FiFilter,
//   FiShare,
//   FiMessageSquare,
//   FiMail,
//   FiPhone,
//   FiLinkedin,
//   FiDownload,
//   FiSearch,
//   FiClock,
//   FiBookOpen,
//   FiUsers,
//   FiCheckCircle
// } from "react-icons/fi";
// import { debounce } from "lodash";
// import StatusBadge from "../components/StatusBadge";
// import LoadingSpinner from "../components/LoadingSpinner";
// import ErrorState from "../components/ErrorState";
// import EmptyState from "../components/EmptyState";
// import ApplicationStatusDropdown from "../components/ApplicationStatusDropdown";

// export default function JobsWithApplicants() {
//   const dispatch = useDispatch();
//   const { jobs, loading, error, updating } = useSelector((state) => state.jobs);
//   const [expandedJobs, setExpandedJobs] = useState({});
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTab, setSelectedTab] = useState("applicants");
//   const [localStatusUpdates, setLocalStatusUpdates] = useState({});

//   useEffect(() => {
//     dispatch(fetchJobsWithApplicantsForReferrer());
//   }, [dispatch]);

//   // Toggle job expansion
//   const toggleJobExpansion = (jobId) => {
//     setExpandedJobs((prev) => ({
//       ...prev,
//       [jobId]: !prev[jobId],
//     }));
//   };

//   // Handle status updates with optimistic UI
//   const handleStatusUpdate = async (jobId, applicationId, newStatus) => {
//     // Optimistic update
//     setLocalStatusUpdates(prev => ({
//       ...prev,
//       [applicationId]: newStatus
//     }));
    
//     try {
//       await dispatch(
//         updateApplicationStatus({ jobId, applicationId, status: newStatus })
//       );
//     } catch (error) {
//       console.error("Status update failed:", error);
//       // Revert on error
//       setLocalStatusUpdates(prev => {
//         const newState = {...prev};
//         delete newState[applicationId];
//         return newState;
//       });
//     }
//   };

//   // Debounced search
//   const debouncedSearch = useCallback(
//     debounce((term) => {
//       setSearchTerm(term);
//     }, 300),
//     []
//   );

//   // Filter jobs based on search and filter criteria
//   const filteredJobs = jobs.filter(job => {
//     if (statusFilter !== "all" && job.status !== statusFilter) return false;
    
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       const matchesJob = 
//         job.title?.toLowerCase().includes(term) ||
//         job.company?.toLowerCase().includes(term) ||
//         job.description?.toLowerCase().includes(term);
      
//       const matchesApplicant = job.applicants?.some(applicant => 
//         applicant.seeker?.name?.toLowerCase().includes(term) ||
//         applicant.seeker?.email?.toLowerCase().includes(term)
//       );
      
//       return matchesJob || matchesApplicant;
//     }
    
//     return true;
//   });

//   // Job status colors
//   const jobStatusColors = {
//     Open: "green",
//     Closed: "red",
//     Paused: "amber"
//   };

//   // Loading state
//   if (loading && jobs.length === 0) {
//     return <LoadingSpinner message="Loading job applications..." />;
//   }

//   // Error state
//   if (error && jobs.length === 0) {
//     return (
//       <ErrorState 
//         message={error} 
//         onRetry={() => dispatch(fetchJobsWithApplicantsForReferrer())} 
//       />
//     );
//   }

//   // Empty state
//   if (jobs.length === 0) {
//     return (
//       <EmptyState
//         icon={<FiBriefcase className="w-12 h-12 text-gray-400" />}
//         title="No Jobs Found"
//         description="You haven't posted or claimed any jobs yet. Start by creating a new job posting."
//         actionText="Create Job"
//         onAction={() => console.log("Create job clicked")}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-6">
//           <h1 className="text-xl md:text-2xl font-bold text-gray-900">
//             Your Job Applications
//           </h1>
//           <p className="text-sm text-gray-600 mt-1">
//             Manage applications for jobs you've posted or claimed
//           </p>
//         </div>

//         {/* Filters and Search */}
//         <div className="bg-white rounded-lg shadow-xs p-3 mb-4 flex flex-col md:flex-row gap-3">
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FiSearch className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search jobs or applicants..."
//               onChange={(e) => debouncedSearch(e.target.value)}
//               className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900"
//             />
//           </div>
          
//           <div className="flex gap-2">
//             <div className="relative">
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="appearance-none pl-3 pr-8 py-2 rounded-md border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900"
//               >
//                 <option value="all">All Statuses</option>
//                 <option value="Open">Open Jobs</option>
//                 <option value="Closed">Closed Jobs</option>
//                 <option value="Paused">Paused Jobs</option>
//               </select>
//               <FiChevronDown className="absolute right-2 top-2.5 text-gray-400 pointer-events-none text-sm" />
//             </div>
            
//             <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-600">
//               <FiFilter className="w-4 h-4" />
//             </button>
//           </div>
//         </div>

//         {/* Stats Summary */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
//           <div className="bg-white rounded-lg shadow-xs p-3">
//             <div className="text-gray-500 text-xs mb-1">Total Jobs</div>
//             <div className="text-lg font-semibold text-gray-900">{jobs.length}</div>
//           </div>
//           <div className="bg-white rounded-lg shadow-xs p-3">
//             <div className="text-gray-500 text-xs mb-1">Open Jobs</div>
//             <div className="text-lg font-semibold text-green-600">
//               {jobs.filter(job => job.status === "Open").length}
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow-xs p-3">
//             <div className="text-gray-500 text-xs mb-1">Total Applicants</div>
//             <div className="text-lg font-semibold text-blue-600">
//               {jobs.reduce((total, job) => total + (job.applicants?.length || 0), 0)}
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow-xs p-3">
//             <div className="text-gray-500 text-xs mb-1">Avg. per Job</div>
//             <div className="text-lg font-semibold text-purple-600">
//               {jobs.length ? 
//                 Math.round(jobs.reduce((total, job) => total + (job.applicants?.length || 0), 0) / jobs.length) : 
//                 0
//               }
//             </div>
//           </div>
//         </div>

//         {/* Jobs List */}
//         <div className="space-y-3">
//           {filteredJobs.map((job) => (
//             <div
//               key={job._id}
//               className="bg-white rounded-lg shadow-xs overflow-hidden transition-all duration-200 hover:shadow-sm"
//             >
//               <div
//                 className="p-3 cursor-pointer flex justify-between items-start"
//                 onClick={() => toggleJobExpansion(job._id)}
//               >
//                 <div className="flex items-start gap-3">
//                   <div className="bg-blue-100 p-2 rounded-lg mt-0.5">
//                     <FiBriefcase className="w-4 h-4 text-blue-600" />
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <h2 className="text-base font-semibold text-gray-900">
//                         {job.title}
//                       </h2>
//                       <StatusBadge 
//                         status={job.status} 
//                         color={jobStatusColors[job.status] || "gray"} 
//                         size="sm"
//                       />
//                     </div>
//                     <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 mt-1">
//                       <span className="flex items-center">
//                         {job.company}
//                       </span>
//                       <span className="flex items-center">
//                         <FiMapPin className="mr-1 text-xs" />
//                         {job.location}
//                       </span>
//                       {job.salaryRange && (
//                         <span className="flex items-center">
//                           <FiDollarSign className="mr-1 text-xs" />
//                           {job.salaryRange}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <div className="bg-blue-50 px-2 py-1 rounded-lg text-center">
//                     <p className="text-[10px] text-blue-800 font-medium">
//                       Applications
//                     </p>
//                     <p className="text-xs font-semibold text-blue-900">
//                       {job?.applicants?.length || 0}/{job?.applicationLimit || "∞"}
//                     </p>
//                   </div>
//                   <button className="text-gray-500 hover:text-gray-700 mt-0.5">
//                     {expandedJobs[job._id] ? (
//                       <FiChevronUp size={16} />
//                     ) : (
//                       <FiChevronDown size={16} />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {expandedJobs[job._id] && (
//                 <div className="border-t border-gray-100 p-3 bg-gray-50">
//                   <div className="flex border-b border-gray-200 mb-3">
//                     <button 
//                       className={`px-3 py-2 text-sm font-medium ${selectedTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
//                       onClick={() => setSelectedTab('details')}
//                     >
//                       <FiBookOpen className="inline mr-1.5 -mt-1" /> Job Details
//                     </button>
//                     <button 
//                       className={`px-3 py-2 text-sm font-medium ${selectedTab === 'applicants' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
//                       onClick={() => setSelectedTab('applicants')}
//                     >
//                       <FiUsers className="inline mr-1.5 -mt-1" /> Applicants ({job.applicants.length || 0})
//                     </button>
//                   </div>
                  
//                   {selectedTab === 'details' ? (
//                     <div className="bg-white rounded-lg p-3 text-sm">
//                       <h3 className="font-medium mb-2">Job Description</h3>
//                       <div className="prose prose-sm max-w-none text-gray-700">
//                         {job.description || "No description available"}
//                       </div>
                      
//                       <div className="grid grid-cols-2 gap-3 mt-4">
//                         <div>
//                           <h4 className="font-medium text-gray-700 mb-1">Requirements</h4>
//                           <ul className="list-disc pl-5 text-gray-600">
//                             {job.requirements?.slice(0, 3).map((req, i) => (
//                               <li key={i}>{req}</li>
//                             ))}
//                             {!job.requirements?.length && <li>No specific requirements</li>}
//                           </ul>
//                         </div>
//                         <div>
//                           <h4 className="font-medium text-gray-700 mb-1">Benefits</h4>
//                           <ul className="list-disc pl-5 text-gray-600">
//                             {job.benefits?.slice(0, 3).map((benefit, i) => (
//                               <li key={i}>{benefit}</li>
//                             ))}
//                             {!job.benefits?.length && <li>No specific benefits listed</li>}
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <>
//                       {job.applicants.length === 0 ? (
//                         <div className="text-center py-4 bg-white rounded-lg border border-dashed border-gray-300 text-sm">
//                           <FiUser className="w-8 h-8 mx-auto text-gray-400 mb-1" />
//                           <p className="text-gray-600 font-medium">
//                             No applications yet
//                           </p>
//                           <p className="text-gray-500 mt-1">
//                             Share this job to attract applicants
//                           </p>
//                         </div>
//                       ) : (
//                         <div className="overflow-x-auto">
//                           <table className="min-w-full divide-y divide-gray-200 text-sm">
//                             <thead className="bg-gray-100">
//                               <tr>
//                                 <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
//                                 <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
//                                 <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
//                                 <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                                 <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                               </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                               {job.applicants.map((app) => (
//                                 <tr key={app._id} className="hover:bg-gray-50">
//                                   <td className="px-3 py-2 whitespace-nowrap">
//                                     <div className="font-medium text-gray-900">{app.seeker?.name}</div>
//                                     <div className="text-xs text-gray-500">{app.seeker?.email}</div>
//                                   </td>
//                                   <td className="px-3 py-2 whitespace-nowrap">
//                                     <div className="flex flex-col">
//                                       {app.seeker?.phone && (
//                                         <div className="flex items-center text-xs">
//                                           <FiPhone className="mr-1" /> {app.seeker.phone}
//                                         </div>
//                                       )}
//                                       {app.seeker?.linkedin && (
//                                         <a href={app.seeker.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 text-xs hover:underline">
//                                           <FiLinkedin className="mr-1" /> LinkedIn
//                                         </a>
//                                       )}
//                                     </div>
//                                   </td>
//                                   <td className="px-3 py-2 whitespace-nowrap">
//                                     <div className="text-xs text-gray-500">
//                                       {new Date(app.appliedAt).toLocaleDateString()}
//                                       <div className="flex items-center mt-0.5">
//                                         <FiClock className="mr-1 text-xs" />
//                                         {new Date(app.appliedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                       </div>
//                                     </div>
//                                   </td>
//                                   <td className="px-3 py-2 whitespace-nowrap">
//                                     <ApplicationStatusDropdown 
//                                       currentStatus={localStatusUpdates[app._id] || app.status} 
//                                       onStatusChange={(newStatus) => handleStatusUpdate(job._id, app._id, newStatus)}
//                                       disabled={updating === app._id}
//                                     />
//                                   </td>
//                                   <td className="px-3 py-2 whitespace-nowrap">
//                                     <div className="flex space-x-1">
//                                       <button className="p-1.5 text-gray-500 hover:text-blue-600 rounded hover:bg-blue-50">
//                                         <FiMessageSquare size={16} />
//                                       </button>
//                                       {app.resumeUrl && (
//                                         <a 
//                                           href={app.resumeUrl} 
//                                           download 
//                                           className="p-1.5 text-gray-500 hover:text-green-600 rounded hover:bg-green-50"
//                                         >
//                                           <FiDownload size={16} />
//                                         </a>
//                                       )}
//                                     </div>
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
        
//         {filteredJobs.length === 0 && jobs.length > 0 && (
//           <div className="text-center py-8 bg-white rounded-lg">
//             <FiX className="w-10 h-10 mx-auto text-gray-400 mb-2" />
//             <h3 className="text-base font-semibold text-gray-900 mb-1">
//               No matching jobs or applicants
//             </h3>
//             <p className="text-gray-600 text-sm">
//               Try adjusting your search or filter criteria
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }







// src/pages/JobsWithApplicants.jsx

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchJobsWithApplicantsForReferrer,
//   updateApplicationStatus,
//   updateStatusOptimistically
// } from '../features/jobSlice';
// import {
//   FiBriefcase,
//   FiUser,
//   FiMapPin,
//   FiDollarSign,
//   FiChevronDown,
//   FiChevronUp,
//   FiX,
//   FiRefreshCw,
//   FiFilter,
//   FiShare,
//   FiMessageSquare,
//   FiMail,
//   FiPhone,
//   FiLinkedin,
//   FiDownload,
//   FiSearch,
//   FiClock,
//   FiBookOpen,
//   FiUsers
// } from 'react-icons/fi';
// import StatusBadge from '../components/StatusBadge';
// import LoadingSpinner from '../components/LoadingSpinner';
// import ErrorState from '../components/ErrorState';
// import EmptyState from '../components/EmptyState';
// import ApplicationStatusDropdown from '../components/ApplicationStatusDropdown';

// // Simple debounce implementation
// const debounce = (func, wait) => {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// };

// export default function JobsWithApplicants() {
//   const dispatch = useDispatch();
//   const { jobs, loading, error, updating } = useSelector((state) => state.jobs);
//   const [expandedJobs, setExpandedJobs] = useState({});
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedTab, setSelectedTab] = useState('applicants');

//   useEffect(() => {
//     dispatch(fetchJobsWithApplicantsForReferrer());
//   }, [dispatch]);

//   // Toggle job expansion
//   const toggleJobExpansion = useCallback((jobId) => {
//     setExpandedJobs(prev => ({
//       ...prev,
//       [jobId]: !prev[jobId],
//     }));
//   }, []);

//   // Handle status updates with optimistic UI
//   const handleStatusUpdate = useCallback((jobId, applicationId, newStatus) => {
//     // Store original status for possible revert
//     const job = jobs.find(j => j._id === jobId);
//     const application = job?.applicants.find(a => a._id === applicationId);
//     const originalStatus = application?.status;
    
//     // Optimistic update
//     dispatch(updateStatusOptimistically({ 
//       jobId, 
//       applicationId, 
//       status: newStatus 
//     }));
    
//     // Async update
//     dispatch(
//       updateApplicationStatus({ 
//         jobId, 
//         applicationId, 
//         status: newStatus,
//         originalStatus // For reverting on error
//       })
//     );
//   }, [dispatch, jobs]);

//   // Debounced search
//   const handleSearch = useCallback(
//     debounce((term) => {
//       setSearchTerm(term);
//     }, 300),
//     []
//   );

//   // Memoized filtered jobs
//   const filteredJobs = useMemo(() => {
//     return jobs.filter(job => {
//       if (statusFilter !== 'all' && job.status !== statusFilter) return false;
      
//       if (searchTerm) {
//         const term = searchTerm.toLowerCase();
//         const matchesJob = 
//           job.title?.toLowerCase().includes(term) ||
//           job.company?.toLowerCase().includes(term) ||
//           job.description?.toLowerCase().includes(term);
        
//         const matchesApplicant = job.applicants?.some(applicant => 
//           applicant.seeker?.name?.toLowerCase().includes(term) ||
//           applicant.seeker?.email?.toLowerCase().includes(term)
//         );
        
//         return matchesJob || matchesApplicant;
//       }
      
//       return true;
//     });
//   }, [jobs, statusFilter, searchTerm]);

//   // Job status colors
//   const jobStatusColors = {
//     Open: 'green',
//     Closed: 'red',
//     Paused: 'amber'
//   };

//   // Stats calculation
//   const stats = useMemo(() => {
//     const totalJobs = jobs.length;
//     const openJobs = jobs.filter(job => job.status === 'Open').length;
//     const totalApplicants = jobs.reduce((total, job) => total + (job.applicants?.length || 0), 0);
//     const avgPerJob = totalJobs ? Math.round(totalApplicants / totalJobs) : 0;
    
//     return { totalJobs, openJobs, totalApplicants, avgPerJob };
//   }, [jobs]);

//   // Loading state
//   if (loading && jobs.length === 0) {
//     return <LoadingSpinner message="Loading job applications..." />;
//   }

//   // Error state
//   if (error && jobs.length === 0) {
//     return (
//       <ErrorState 
//         message={error} 
//         onRetry={() => dispatch(fetchJobsWithApplicantsForReferrer())} 
//       />
//     );
//   }

//   // Empty state
//   if (jobs.length === 0) {
//     return (
//       <EmptyState
//         icon={<FiBriefcase className="w-12 h-12 text-gray-400" />}
//         title="No Jobs Found"
//         description="You haven't posted or claimed any jobs yet. Start by creating a new job posting."
//         actionText="Create Job"
//         onAction={() => console.log('Create job clicked')}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-6">
//           <h1 className="text-xl md:text-2xl font-bold text-gray-900">
//             Your Job Applications
//           </h1>
//           <p className="text-sm text-gray-600 mt-1">
//             Manage applications for jobs you've posted or claimed
//           </p>
//         </div>

//         {/* Filters and Search */}
//         <div className="bg-white rounded-lg shadow-xs p-3 mb-4 flex flex-col md:flex-row gap-3">
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FiSearch className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search jobs or applicants..."
//               onChange={(e) => handleSearch(e.target.value)}
//               className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900"
//             />
//           </div>
          
//           <div className="flex gap-2">
//             <div className="relative">
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="appearance-none pl-3 pr-8 py-2 rounded-md border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900"
//               >
//                 <option value="all">All Statuses</option>
//                 <option value="Open">Open Jobs</option>
//                 <option value="Closed">Closed Jobs</option>
//                 <option value="Paused">Paused Jobs</option>
//               </select>
//               <FiChevronDown className="absolute right-2 top-2.5 text-gray-400 pointer-events-none text-sm" />
//             </div>
            
//             <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-600">
//               <FiFilter className="w-4 h-4" />
//             </button>
//           </div>
//         </div>

//         {/* Stats Summary */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
//           <div className="bg-white rounded-lg shadow-xs p-3">
//             <div className="text-gray-500 text-xs mb-1">Total Jobs</div>
//             <div className="text-lg font-semibold text-gray-900">{stats.totalJobs}</div>
//           </div>
//           <div className="bg-white rounded-lg shadow-xs p-3">
//             <div className="text-gray-500 text-xs mb-1">Open Jobs</div>
//             <div className="text-lg font-semibold text-green-600">{stats.openJobs}</div>
//           </div>
//           <div className="bg-white rounded-lg shadow-xs p-3">
//             <div className="text-gray-500 text-xs mb-1">Total Applicants</div>
//             <div className="text-lg font-semibold text-blue-600">{stats.totalApplicants}</div>
//           </div>
//           <div className="bg-white rounded-lg shadow-xs p-3">
//             <div className="text-gray-500 text-xs mb-1">Avg. per Job</div>
//             <div className="text-lg font-semibold text-purple-600">{stats.avgPerJob}</div>
//           </div>
//         </div>

//         {/* Jobs List */}
//         <div className="space-y-3">
//           {filteredJobs.map((job) => (
//             <div
//               key={job._id}
//               className="bg-white rounded-lg shadow-xs overflow-hidden transition-all duration-200 hover:shadow-sm"
//             >
//               <div
//                 className="p-3 cursor-pointer flex justify-between items-start"
//                 onClick={() => toggleJobExpansion(job._id)}
//               >
//                 <div className="flex items-start gap-3">
//                   <div className="bg-blue-100 p-2 rounded-lg mt-0.5">
//                     <FiBriefcase className="w-4 h-4 text-blue-600" />
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <h2 className="text-base font-semibold text-gray-900">
//                         {job.title}
//                       </h2>
//                       <StatusBadge 
//                         status={job.status} 
//                         color={jobStatusColors[job.status] || "gray"} 
//                         size="sm"
//                       />
//                     </div>
//                     <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 mt-1">
//                       <span className="flex items-center">
//                         {job.company}
//                       </span>
//                       <span className="flex items-center">
//                         <FiMapPin className="mr-1 text-xs" />
//                         {job.location}
//                       </span>
//                       {job.salaryRange && (
//                         <span className="flex items-center">
//                           <FiDollarSign className="mr-1 text-xs" />
//                           {job.salaryRange}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <div className="bg-blue-50 px-2 py-1 rounded-lg text-center">
//                     <p className="text-[10px] text-blue-800 font-medium">
//                       Applications
//                     </p>
//                     <p className="text-xs font-semibold text-blue-900">
//                       {job?.applicants?.length || 0}/{job?.applicationLimit || "∞"}
//                     </p>
//                   </div>
//                   <button className="text-gray-500 hover:text-gray-700 mt-0.5">
//                     {expandedJobs[job._id] ? (
//                       <FiChevronUp size={16} />
//                     ) : (
//                       <FiChevronDown size={16} />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {expandedJobs[job._id] && (
//                 <div className="border-t border-gray-100 p-3 bg-gray-50">
//                   <div className="flex border-b border-gray-200 mb-3">
//                     <button 
//                       className={`px-3 py-2 text-sm font-medium ${selectedTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
//                       onClick={() => setSelectedTab('details')}
//                     >
//                       <FiBookOpen className="inline mr-1.5 -mt-1" /> Job Details
//                     </button>
//                     <button 
//                       className={`px-3 py-2 text-sm font-medium ${selectedTab === 'applicants' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
//                       onClick={() => setSelectedTab('applicants')}
//                     >
//                       <FiUsers className="inline mr-1.5 -mt-1" /> Applicants ({job.applicants.length || 0})
//                     </button>
//                   </div>
                  
//                   {selectedTab === 'details' ? (
//                     <div className="bg-white rounded-lg p-3 text-sm">
//                       <h3 className="font-medium mb-2">Job Description</h3>
//                       <div className="prose prose-sm max-w-none text-gray-700">
//                         {job.description || "No description available"}
//                       </div>
                      
//                       <div className="grid grid-cols-2 gap-3 mt-4">
//                         <div>
//                           <h4 className="font-medium text-gray-700 mb-1">Requirements</h4>
//                           <ul className="list-disc pl-5 text-gray-600">
//                             {job.requirements?.slice(0, 3).map((req, i) => (
//                               <li key={i}>{req}</li>
//                             ))}
//                             {!job.requirements?.length && <li>No specific requirements</li>}
//                           </ul>
//                         </div>
//                         <div>
//                           <h4 className="font-medium text-gray-700 mb-1">Benefits</h4>
//                           <ul className="list-disc pl-5 text-gray-600">
//                             {job.benefits?.slice(0, 3).map((benefit, i) => (
//                               <li key={i}>{benefit}</li>
//                             ))}
//                             {!job.benefits?.length && <li>No specific benefits listed</li>}
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <>
//                       {job.applicants.length === 0 ? (
//                         <div className="text-center py-4 bg-white rounded-lg border border-dashed border-gray-300 text-sm">
//                           <FiUser className="w-8 h-8 mx-auto text-gray-400 mb-1" />
//                           <p className="text-gray-600 font-medium">
//                             No applications yet
//                           </p>
//                           <p className="text-gray-500 mt-1">
//                             Share this job to attract applicants
//                           </p>
//                         </div>
//                       ) : (
//                         <div className="overflow-x-auto">
//                           <table className="min-w-full divide-y divide-gray-200 text-sm">
//                             <thead className="bg-gray-100">
//                               <tr>
//                                 <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
//                                 <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
//                                 <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
//                                 <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                                 <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                               </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                               {job.applicants.map((app) => (
//                                 <tr key={app._id} className="hover:bg-gray-50">
//                                   <td className="px-3 py-2 whitespace-nowrap">
//                                     <div className="font-medium text-gray-900">{app.seeker?.name}</div>
//                                     <div className="text-xs text-gray-500">{app.seeker?.email}</div>
//                                   </td>
//                                   <td className="px-3 py-2 whitespace-nowrap">
//                                     <div className="flex flex-col">
//                                       {app.seeker?.phone && (
//                                         <div className="flex items-center text-xs">
//                                           <FiPhone className="mr-1" /> {app.seeker.phone}
//                                         </div>
//                                       )}
//                                       {app.seeker?.linkedin && (
//                                         <a href={app.seeker.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 text-xs hover:underline">
//                                           <FiLinkedin className="mr-1" /> LinkedIn
//                                         </a>
//                                       )}
//                                     </div>
//                                   </td>
//                                   <td className="px-3 py-2 whitespace-nowrap">
//                                     <div className="text-xs text-gray-500">
//                                       {new Date(app.appliedAt).toLocaleDateString()}
//                                       <div className="flex items-center mt-0.5">
//                                         <FiClock className="mr-1 text-xs" />
//                                         {new Date(app.appliedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                       </div>
//                                     </div>
//                                   </td>
//                                   <td className="px-3 py-2 whitespace-nowrap">
//                                     <ApplicationStatusDropdown 
//                                       currentStatus={app.status} 
//                                       onStatusChange={(newStatus) => handleStatusUpdate(job._id, app._id, newStatus)}
//                                       disabled={updating === app._id}
//                                     />
//                                   </td>
//                                   <td className="px-3 py-2 whitespace-nowrap">
//                                     <div className="flex space-x-1">
//                                       <button className="p-1.5 text-gray-500 hover:text-blue-600 rounded hover:bg-blue-50">
//                                         <FiMessageSquare size={16} />
//                                       </button>
//                                       {app.resumeUrl && (
//                                         <a 
//                                           href={app.resumeUrl} 
//                                           download 
//                                           className="p-1.5 text-gray-500 hover:text-green-600 rounded hover:bg-green-50"
//                                         >
//                                           <FiDownload size={16} />
//                                         </a>
//                                       )}
//                                     </div>
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
        
//         {filteredJobs.length === 0 && jobs.length > 0 && (
//           <div className="text-center py-8 bg-white rounded-lg">
//             <FiX className="w-10 h-10 mx-auto text-gray-400 mb-2" />
//             <h3 className="text-base font-semibold text-gray-900 mb-1">
//               No matching jobs or applicants
//             </h3>
//             <p className="text-gray-600 text-sm">
//               Try adjusting your search or filter criteria
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }