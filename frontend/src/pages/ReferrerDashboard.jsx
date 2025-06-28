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



import React, { useState, useEffect } from "react";
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
      // Optimistic UI update - no need to refetch all data
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