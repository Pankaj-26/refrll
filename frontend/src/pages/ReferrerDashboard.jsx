// import React, { useState, useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchJobsWithApplicantsForReferrer,
//   updateApplicationStatus,
//   optimisticStatusUpdate,
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
//   FiCheckCircle,
//   FiRefreshCw,
//   FiFilter,
//   FiShare,
//   FiMessageSquare,
//   FiMail,
//   FiPhone,
//   FiLinkedin,
//   FiDownload,
//   FiSearch,
// } from "react-icons/fi";
// import ReferrerStatusBadge from "../components/ReferrerStatusbadge";
// import LoadingSpinner from "../components/LoadingSpinner";
// import ErrorState from "../components/ErrorState";
// import EmptyState from "../components/EmptyState";
// import toast from "react-hot-toast";
// import ReferrerApplicationCard from "../components/ReferrerApplicationCard";

// export default function JobsWithApplicants() {
//   const dispatch = useDispatch();
//   const { jobs, loading, error, updating } = useSelector((state) => state.jobs);
//   const [expandedJobs, setExpandedJobs] = useState({});
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const handleRefresh = useCallback(() => {
//     setIsRefreshing(true);
//     dispatch(fetchJobsWithApplicantsForReferrer()).finally(() => {
//       setIsRefreshing(false);
//     });
//   }, [dispatch]);

//   useEffect(() => {
//     document.title = "Referrer Dashboard";
//     dispatch(fetchJobsWithApplicantsForReferrer());
//   }, [dispatch]);

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
//       handleRefresh();
//       toast.success("Status Updated successfully!");
//     } catch (error) {
//       toast.error(error.message || "Failed to update status");
//     }
//   };

//   const filteredJobs = jobs.filter((job) => {
//     // Filter by job status
//     if (statusFilter !== "all" && job.status !== statusFilter) return false;

//     // Filter by search term
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       const matchesJob =
//         job.title.toLowerCase().includes(term) ||
//         job.company.toLowerCase().includes(term) ||
//         job.description.toLowerCase().includes(term);

//       const matchesApplicant = job.applicants?.some(
//         (applicant) =>
//           applicant.seeker?.name?.toLowerCase().includes(term) ||
//           applicant.seeker?.email?.toLowerCase().includes(term)
//       );

//       return matchesJob || matchesApplicant;
//     }

//     return true;
//   });

//   // Status badge colors
//   const statusColors = {
//     applied: "blue",
//     reviewed: "purple",
//     accepted: "green",
//     rejected: "red",
//   };

//   // Job status colors
//   const jobStatusColors = {
//     Open: "green",
//     Closed: "red",
//     Paused: "amber",
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
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//             Your Job Applications
//           </h1>
//           <p className="text-gray-600">
//             Manage applications for jobs you've posted or claimed
//           </p>
//         </div>

//         {/* Filters and Search */}
//         <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4">
//           <div className="relative flex-1">
//             <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search jobs or applicants..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
//             />
//           </div>

//           <div className="flex gap-2">
//             <div className="relative">
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
//               >
//                 <option value="all">All Statuses</option>
//                 <option value="Open">Open Jobs</option>
//                 <option value="Closed">Closed Jobs</option>
//                 <option value="Paused">Paused Jobs</option>
//               </select>
//               <FiChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
//             </div>

//             <button className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600">
//               <FiFilter className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         {/* Stats Summary */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white rounded-xl shadow-sm p-4">
//             <div className="text-gray-500 text-sm mb-1">Total Jobs</div>
//             <div className="text-2xl font-bold text-gray-900">
//               {jobs.length}
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-sm p-4">
//             <div className="text-gray-500 text-sm mb-1">Open Jobs</div>
//             <div className="text-2xl font-bold text-green-600">
//               {jobs.filter((job) => job.status === "Open").length}
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-sm p-4">
//             <div className="text-gray-500 text-sm mb-1">Total Applicants</div>
//             <div className="text-2xl font-bold text-blue-600">
//               {jobs.reduce(
//                 (total, job) => total + (job.applicants?.length || 0),
//                 0
//               )}
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-sm p-4">
//             <div className="text-gray-500 text-sm mb-1">Avg. per Job</div>
//             <div className="text-2xl font-bold text-purple-600">
//               {jobs.length
//                 ? Math.round(
//                     jobs.reduce(
//                       (total, job) => total + (job.applicants?.length || 0),
//                       0
//                     ) / jobs.length
//                   )
//                 : 0}
//             </div>
//           </div>
//         </div>

//         {/* Jobs List */}
//         <div className="space-y-6">
//           {filteredJobs.map((job) => (
//             <div
//               key={job._id}
//               className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
//             >
//               <div
//                 className="p-4 cursor-pointer flex justify-between items-center"
//                 onClick={() => toggleJobExpansion(job._id)}
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="bg-blue-100 p-3 rounded-xl">
//                     <FiBriefcase className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <h2 className="text-lg font-bold text-gray-900">
//                         {job.title}
//                       </h2>
//                       <ReferrerStatusBadge
//                         status={job.status}
//                         color={jobStatusColors[job.status] || "gray"}
//                       />
//                     </div>
//                     <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 mt-1">
//                       <span className="flex items-center">
//                         <FiBriefcase className="mr-1" />
//                         {job.company}
//                       </span>
//                       <span className="flex items-center">
//                         <FiMapPin className="mr-1" />
//                         {job.location}
//                       </span>
//                       {job.salaryRange && (
//                         <span className="flex items-center">
//                           <FiDollarSign className="mr-1" />
//                           {job.salaryRange}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <div className="bg-blue-50 px-3 py-1.5 rounded-xl text-center">
//                     <p className="text-xs text-blue-800 font-medium">
//                       Applications
//                     </p>
//                     <p className="text-sm font-bold text-blue-900">
//                       {job?.applicants?.length || 0}/
//                       {job?.applicationLimit || "∞"}
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
//                 <div className="border-t border-gray-100 p-4 bg-gray-50">
//                   <div className="flex justify-between items-center mb-4">
//                     <div className="flex items-center text-gray-700">
//                       <FiUsers className="mr-2" />
//                       <h3 className="font-bold">
//                         Applicants ({job.applicants.length || 0})
//                       </h3>
//                     </div>

//                     <div className="flex gap-2">
//                       <button className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm flex items-center">
//                         <FiShare className="mr-1" /> Share Job
//                       </button>
//                       <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center">
//                         <FiRefreshCw className="mr-1" /> Refresh
//                       </button>
//                     </div>
//                   </div>

//                   {job.applicants.length === 0 ? (
//                     <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
//                       <FiUser className="w-12 h-12 mx-auto text-gray-400 mb-2" />
//                       <p className="text-gray-600 font-medium">
//                         No applications yet
//                       </p>
//                       <p className="text-gray-500 text-sm mt-1">
//                         Share this job to attract applicants
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {job.applicants.map((app) => (
//                         <ReferrerApplicationCard
//                           key={app._id}
//                           application={app}
//                           onStatusUpdate={handleStatusUpdate}
//                           updating={updating === app._id}
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {filteredJobs.length === 0 && jobs.length > 0 && (
//           <div className="text-center py-12 bg-white rounded-xl">
//             <FiX className="w-12 h-12 mx-auto text-gray-400 mb-4" />
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">
//               No matching jobs or applicants
//             </h3>
//             <p className="text-gray-600">
//               Try adjusting your search or filter criteria
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobsWithApplicantsForReferrer,
  updateApplicationStatus,
} from "../features/jobSlice";
import {
  FiBriefcase,
  FiUser,
  FiUsers,
  FiMapPin,
  FiDollarSign,
  FiChevronDown,
  FiChevronUp,
  FiX,
  FiRefreshCw,
  FiFilter,
  FiShare,
  FiSearch,
  FiMail,
  FiPhone,
  FiLinkedin,
  FiDownload,
  FiChevronRight,
  FiEdit,
  FiInfo,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ReferrerStatusBadge from "../components/ReferrerStatusbadge";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import toast from "react-hot-toast";
import ReferrerApplicationCard from "../components/ReferrerApplicationCard";
import JobModal from "../components/JobModal";
export default function JobsWithApplicants() {
  const dispatch = useDispatch();
  const { jobs, loading, error, updating } = useSelector((state) => state.jobs);
  const [expandedJobs, setExpandedJobs] = useState({});
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    dispatch(fetchJobsWithApplicantsForReferrer()).finally(() => {
      setIsRefreshing(false);
    });
  }, [dispatch]);

  useEffect(() => {
    document.title = "Referrer Dashboard";
    dispatch(fetchJobsWithApplicantsForReferrer());
  }, [dispatch]);

  const toggleJobExpansion = (jobId) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await dispatch(
        updateApplicationStatus({ applicationId, status: newStatus })
      );
      handleRefresh();
      toast.success("Status Updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (statusFilter !== "all" && job.status !== statusFilter) return false;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchesJob =
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term);

      const matchesApplicant = job.applicants?.some(
        (applicant) =>
          applicant.seeker?.name?.toLowerCase().includes(term) ||
          applicant.seeker?.email?.toLowerCase().includes(term)
      );

      return matchesJob || matchesApplicant;
    }

    return true;
  });

  // Job status colors
  const jobStatusColors = {
    Open: "green",
    Closed: "red",
    Paused: "amber",
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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      {selectedJob && (
        <JobModal selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header with Search on Right */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              Your Job Applications
            </h1>
            <p className="text-gray-600">
              Manage applications for jobs you've posted or claimed
            </p>
          </div>

          <div className="w-full md:w-auto flex gap-2">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-56 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="all">All Statuses</option>
                <option value="Open">Open Jobs</option>
                <option value="Closed">Closed Jobs</option>
                <option value="Paused">Paused Jobs</option>
              </select>
              <FiChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Compact Stats Summary */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-blue-100 rounded-lg p-3 shadow-sm border border-gray-200">
            <div className="text-xs text-gray-500">Total Jobs</div>
            <div className="text-lg font-bold text-blue-900">{jobs.length}</div>
          </div>
          <div className="bg-purple-100 rounded-lg p-3 shadow-sm border border-purple-200">
            <div className="text-xs text-gray-500">Open Jobs</div>
            <div className="text-lg font-bold text-purple-600">
              {jobs.filter((job) => job.status === "Open").length}
            </div>
          </div>
          <div className="bg-green-100 rounded-lg p-3 shadow-sm border border-gray-200">
            <div className="text-xs text-gray-500">Applicants</div>
            <div className="text-lg font-bold text-green-600">
              {jobs.reduce(
                (total, job) => total + (job.applicants?.length || 0),
                0
              )}
            </div>
          </div>
          <div className="bg-amber-100 rounded-lg p-3 shadow-sm border border-amber-200">
            <div className="text-xs text-gray-500">Avg/Job</div>
            <div className="text-lg font-bold text-amber-600">
              {jobs.length
                ? Math.round(
                    jobs.reduce(
                      (total, job) => total + (job.applicants?.length || 0),
                      0
                    ) / jobs.length
                  )
                : 0}
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-md"
            >
              <div
                className="p-4 cursor-pointer flex justify-between items-center"
                onClick={() => toggleJobExpansion(job._id)}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FiBriefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-semibold text-gray-900">
                        {job.title}
                      </h2>
                      <ReferrerStatusBadge
                        status={job.status}
                        color={jobStatusColors[job.status] || "gray"}
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 mt-1">
                      <span className="flex items-center">
                        <FiBriefcase className="mr-1" />
                        {job.company}
                      </span>
                      <span className="flex items-center">
                        <FiMapPin className="mr-1" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 px-2.5 py-1 rounded-lg text-center">
                    <p className="text-xs text-blue-800">
                      {job?.applicants?.length || 0}/
                      {job?.applicationLimit || "∞"}
                    </p>
                  </div>
                  <button className="text-gray-500 hover:text-gray-700">
                    {expandedJobs[job._id] ? (
                      <FiChevronUp size={18} />
                    ) : (
                      <FiChevronDown size={18} />
                    )}
                  </button>
                </div>
              </div>

              {expandedJobs[job._id] && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-gray-700">
                      Applicants ({job.applicants.length || 0})
                    </h3>
                    <div className="flex gap-2">
                      {/* <button className="text-xs px-2.5 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg flex items-center gap-1">
                        <FiShare size={14} /> Share
                      </button> */}
                      {/* <button onClick={()=> setSelectedJob(job)} >Job Details</button> */}
                      <div className="flex flex-wrap gap-2">
                        {/* Job Details Button */}
                        <div
                          onClick={() => setSelectedJob(job)}
                          className="flex items-center gap-2 px-4  bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
                        >
                          <FiInfo className="text-white text-sm" />
                          <span className="text-white font-medium text-xs">
                            Job Details
                          </span>
                         
                        </div>

                        {/* Edit Job Button */}
                        <div
                          onClick={() => navigate(`/post-job/${job._id}/edit`)}
                          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
                        >
                          <FiEdit className="text-white text-sm" />
                          <span className="text-white font-medium text-xs">
                            Edit Job
                          </span>
                         
                        </div>
                      </div>

                      <button
                        onClick={handleRefresh}
                        className="text-xs px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg flex items-center gap-1"
                      >
                        <FiRefreshCw
                          size={14}
                          className={isRefreshing ? "animate-spin" : ""}
                        />
                        Refresh
                      </button>
                    </div>
                  </div>

                  {job.applicants.length === 0 ? (
                    <div className="text-center py-6 bg-white rounded-lg border border-dashed border-gray-300">
                      <FiUser className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600 text-sm">
                        No applications yet
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {job.applicants.map((app) => (
                        <ReferrerApplicationCard
                          key={app._id}
                          app={app}
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
          <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
            <FiX className="w-10 h-10 mx-auto text-gray-400 mb-3" />
            <h3 className="text-base font-medium text-gray-900 mb-1">
              No matching jobs or applicants
            </h3>
            <p className="text-gray-600 text-sm">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
