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
        onAction={() => navigate("/post-job/:jobId/edit")}
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
            <h1 className="text-2xl md:text-3xl font-bold font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
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
                      <div className="flex flex-wrap gap-2">
                        {/* Job Details Button */}
                        <div
                          onClick={() => setSelectedJob(job)}
                          className="flex items-center gap-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md cursor-pointer group"
                        >
                          <FiInfo className="text-white text-sm" />
                          <span className="text-white font-medium text-xs hidden md:block">
                            Job Details
                          </span>
                        </div>

                        {/* Edit Job Button */}
                        <div
                          onClick={() => navigate(`/post-job/${job._id}/edit`)}
                          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
                        >
                          <FiEdit className="text-white text-sm" />
                          <span className="text-white font-medium text-xs hidden md:block">
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

// import React, { useState, useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchJobsWithApplicantsForReferrer,
//   updateApplicationStatus,
// } from "../features/jobSlice";
// import {
//   FiBriefcase,
//   FiUser,
//   FiUsers,
//   FiMapPin,
//   FiDollarSign,
//   FiChevronDown,
//   FiChevronUp,
//   FiX,
//   FiRefreshCw,
//   FiFilter,
//   FiShare,
//   FiSearch,
//   FiMail,
//   FiPhone,
//   FiLinkedin,
//   FiDownload,
//   FiChevronRight,
//   FiEdit,
//   FiInfo,
//   FiTrendingUp,
//   FiActivity,
//   FiEye,
//   FiClock,
//   FiCheck,
//   FiPause,
//   FiXCircle,
//   // FiBarChart3,
//   FiTarget,
// } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import ReferrerStatusBadge from "../components/ReferrerStatusbadge";
// import LoadingSpinner from "../components/LoadingSpinner";
// import ErrorState from "../components/ErrorState";
// import EmptyState from "../components/EmptyState";
// import toast from "react-hot-toast";
// import ReferrerApplicationCard from "../components/ReferrerApplicationCard";
// import JobModal from "../components/JobModal";

// export default function JobsWithApplicants() {
//   const dispatch = useDispatch();
//   const { jobs, loading, error, updating } = useSelector((state) => state.jobs);
//   const [expandedJobs, setExpandedJobs] = useState({});
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const navigate = useNavigate();
//   const [selectedJob, setSelectedJob] = useState(null);

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
//     if (statusFilter !== "all" && job.status !== statusFilter) return false;

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       const matchesJob =
//         job.title.toLowerCase().includes(term) ||
//         job.company.toLowerCase().includes(term);

//       const matchesApplicant = job.applicants?.some(
//         (applicant) =>
//           applicant.seeker?.name?.toLowerCase().includes(term) ||
//           applicant.seeker?.email?.toLowerCase().includes(term)
//       );

//       return matchesJob || matchesApplicant;
//     }

//     return true;
//   });

//   // Job status colors and icons
//   const jobStatusConfig = {
//     Open: { color: "green", icon: FiCheck, bgColor: "bg-green-50", textColor: "text-green-700", borderColor: "border-green-200" },
//     Closed: { color: "red", icon: FiXCircle, bgColor: "bg-red-50", textColor: "text-red-700", borderColor: "border-red-200" },
//     Paused: { color: "amber", icon: FiPause, bgColor: "bg-amber-50", textColor: "text-amber-700", borderColor: "border-amber-200" },
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
//         description="You haven\'t posted or claimed any jobs yet. Start by creating a new job posting."
//         actionText="Create Job"
//         onAction={() => navigate("/post-job/:jobId/edit")}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
//       {selectedJob && (
//         <JobModal selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
//       )}

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Premium Header Design */}
//         <div className="mb-12">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center gap-3 mb-4">
//               <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
//                 <FiBriefcase className="w-8 h-8 text-white" />
//               </div>
//               <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
//                 Job Applications Dashboard
//               </h1>
//             </div>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Manage and track applications for all your posted jobs with powerful insights and controls
//             </p>
//           </div>

//           {/* Modern Search and Filter Bar */}
//           <div className="flex flex-col lg:flex-row gap-4 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
//             <div className="flex-1 relative group">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <FiSearch className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search jobs, companies, or candidates..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 shadow-sm hover:shadow-md transition-all duration-200"
//               />
//             </div>

//             <div className="flex gap-3">
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <FiFilter className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
//                 </div>
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="appearance-none pl-12 pr-12 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
//                 >
//                   <option value="all">All Statuses</option>
//                   <option value="Open">Open Jobs</option>
//                   <option value="Closed">Closed Jobs</option>
//                   <option value="Paused">Paused Jobs</option>
//                 </select>
//                 <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
//                   <FiChevronDown className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
//                 </div>
//               </div>

//               <button
//                 onClick={handleRefresh}
//                 className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center gap-2 font-medium"
//               >
//                 <FiRefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
//                 <span className="hidden sm:inline">Refresh</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced Stats Dashboard */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-blue-600 rounded-xl shadow-md group-hover:shadow-lg transition-shadow">
//                 <FiBriefcase className="w-6 h-6 text-white" />
//               </div>
//               <div className="text-right">
//                 <p className="text-3xl font-bold text-blue-900">{jobs.length}</p>
//                 <p className="text-sm font-medium text-blue-700">Total Jobs</p>
//               </div>
//             </div>
//             <div className="w-full bg-blue-200 rounded-full h-2">
//               {/* <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: \'100%\' }}></div> */}
//             </div>
//           </div>

//           <div className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-green-600 rounded-xl shadow-md group-hover:shadow-lg transition-shadow">
//                 <FiTrendingUp className="w-6 h-6 text-white" />
//               </div>
//               <div className="text-right">
//                 <p className="text-3xl font-bold text-green-900">
//                   {jobs.filter((job) => job.status === "Open").length}
//                 </p>
//                 <p className="text-sm font-medium text-green-700">Open Jobs</p>
//               </div>
//             </div>
//             <div className="w-full bg-green-200 rounded-full h-2">
//               <div
//                 className="bg-green-600 h-2 rounded-full transition-all duration-500"
//                 style={{ width: `${jobs.length ? (jobs.filter(job => job.status === "Open").length / jobs.length) * 100 : 0}%` }}
//               ></div>
//             </div>
//           </div>

//           <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-purple-600 rounded-xl shadow-md group-hover:shadow-lg transition-shadow">
//                 <FiUsers className="w-6 h-6 text-white" />
//               </div>
//               <div className="text-right">
//                 <p className="text-3xl font-bold text-purple-900">
//                   {jobs.reduce((total, job) => total + (job.applicants?.length || 0), 0)}
//                 </p>
//                 <p className="text-sm font-medium text-purple-700">Total Applicants</p>
//               </div>
//             </div>
//             <div className="w-full bg-purple-200 rounded-full h-2">
//               {/* <div className="bg-purple-600 h-2 rounded-full transition-all duration-500" style={{ width: \'85%\' }}></div> */}
//             </div>
//           </div>

//           <div className="group relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-amber-600 rounded-xl shadow-md group-hover:shadow-lg transition-shadow">
//                 {/* <FiBarChart3 className="w-6 h-6 text-white" /> */}
//               </div>
//               <div className="text-right">
//                 <p className="text-3xl font-bold text-amber-900">
//                   {jobs.length
//                     ? Math.round(jobs.reduce((total, job) => total + (job.applicants?.length || 0), 0) / jobs.length)
//                     : 0}
//                 </p>
//                 <p className="text-sm font-medium text-amber-700">Avg per Job</p>
//               </div>
//             </div>
//             <div className="w-full bg-amber-200 rounded-full h-2">
//               {/* <div className="bg-amber-600 h-2 rounded-full transition-all duration-500" style={{ width: \'70%\' }}></div> */}
//             </div>
//           </div>
//         </div>

//         {/* Modern Job Cards Grid */}
//         <div className="space-y-6">
//           {filteredJobs.map((job, index) => {
//             const statusConfig = jobStatusConfig[job.status] || jobStatusConfig.Open;
//             const StatusIcon = statusConfig.icon;

//             return (
//               <div
//                 key={job._id}
//                 className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20 overflow-hidden"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 {/* Job Card Header */}
//                 <div className="p-6 border-b border-gray-100/50">
//                   <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//                     <div className="flex items-start gap-4">
//                       <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl border border-blue-200 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
//                         <FiBriefcase className="w-7 h-7 text-blue-600" />
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//                             {job.title}
//                           </h2>
//                           <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor} border`}>
//                             <StatusIcon className="w-4 h-4" />
//                             {job.status}
//                           </div>
//                         </div>
//                         <div className="flex flex-wrap items-center gap-4 text-gray-600">
//                           <span className="flex items-center gap-1.5">
//                             <FiBriefcase className="w-4 h-4" />
//                             <span className="font-medium">{job.company}</span>
//                           </span>
//                           <span className="flex items-center gap-1.5">
//                             <FiMapPin className="w-4 h-4" />
//                             {job.location}
//                           </span>
//                           <span className="flex items-center gap-1.5">
//                             <FiUsers className="w-4 h-4" />
//                             {job.applicants?.length || 0} applicants
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-xl border border-blue-200">
//                         <p className="text-sm font-semibold text-blue-800">
//                           {job?.applicants?.length || 0}
//                           <span className="text-blue-600 mx-1">/</span>
//                           {job?.applicationLimit || "∞"}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => toggleJobExpansion(job._id)}
//                         className="p-2 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
//                       >
//                         {expandedJobs[job._id] ? (
//                           <FiChevronUp size={20} />
//                         ) : (
//                           <FiChevronDown size={20} />
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Job Card Actions */}
//                 <div className="px-6 py-4 bg-gradient-to-r from-gray-50/50 to-blue-50/30 border-b border-gray-100/50">
//                   <div className="flex flex-wrap gap-3">
//                     <button
//                       onClick={() => setSelectedJob(job)}
//                       className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium"
//                     >
//                       <FiInfo className="w-4 h-4" />
//                       <span>View Details</span>
//                     </button>

//                     <button
//                       onClick={() => navigate(`/post-job/${job._id}/edit`)}
//                       className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg shadow-md hover:shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-medium"
//                     >
//                       <FiEdit className="w-4 h-4" />
//                       <span>Edit Job</span>
//                     </button>

//                     <button
//                       onClick={() => toggleJobExpansion(job._id)}
//                       className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 font-medium border border-gray-200"
//                     >
//                       <FiEye className="w-4 h-4" />
//                       {/* <span>{expandedJobs[job._id] ? \'Hide\' : \'View\'} Applicants</span> */}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Expanded Applicants Section */}
//                 {expandedJobs[job._id] && (
//                   <div className="p-6 bg-gradient-to-r from-gray-50/30 to-blue-50/20 animate-in slide-in-from-top-4 duration-300">
//                     <div className="flex items-center justify-between mb-6">
//                       <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                         <FiUsers className="w-5 h-5 text-blue-600" />
//                         Applicants ({job.applicants?.length || 0})
//                       </h3>
//                     </div>

//                     {job.applicants?.length === 0 ? (
//                       <div className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-2xl border border-dashed border-gray-300">
//                         <div className="p-4 bg-gray-50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
//                           <FiUser className="w-10 h-10 text-gray-400" />
//                         </div>
//                         <h4 className="text-xl font-semibold text-gray-900 mb-2">
//                           No applications yet
//                         </h4>
//                         <p className="text-gray-600 max-w-md mx-auto">
//                           Applications will appear here once candidates start applying to this job posting.
//                         </p>
//                       </div>
//                     ) : (
//                       <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
//                         {job.applicants.map((app, appIndex) => (
//                           <div
//                             key={app._id}
//                             className="animate-in slide-in-from-left-4 duration-300"
//                             style={{ animationDelay: `${appIndex * 100}ms` }}
//                           >
//                             <ReferrerApplicationCard
//                               app={app}
//                               onStatusUpdate={handleStatusUpdate}
//                               updating={updating === app._id}
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* Enhanced No Results State */}
//         {filteredJobs.length === 0 && jobs.length > 0 && (
//           <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
//             <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
//               <FiX className="w-12 h-12 text-gray-400" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">
//               No matching results found
//             </h3>
//             <p className="text-gray-600 mb-8 max-w-md mx-auto">
//               We couldn\'t find any jobs or applicants matching your current search and filter criteria.
//             </p>
//             <button
//               onClick={() => {
//                 setSearchTerm("");
//                 setStatusFilter("all");
//               }}
//               className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium"
//             >
//               Clear All Filters
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
