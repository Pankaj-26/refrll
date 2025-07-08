// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FiBookmark,
//   FiFilter,
//   FiX,
//   FiExternalLink,
//   FiCalendar,
//   FiMapPin,
//   FiBriefcase,
//   FiDollarSign,
//   FiClock,
//   FiUser,
//   FiMail,
//   FiPhone,
//   FiDownload,
//   FiLoader,
//   FiAlertCircle,
// } from "react-icons/fi";
// import { fetchSeekerApplications } from "../features/applicantSlice";
// import { useDispatch, useSelector } from "react-redux";

// const AllApplications = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [applications, setApplications] = useState([]);
//   const [filteredApps, setFilteredApps] = useState([]);
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { data } = useSelector((state) => state.applicants);
//   // Simulated API fetch
//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         setLoading(true);

//         dispatch(fetchSeekerApplications());
//         await new Promise((resolve) => setTimeout(resolve, 1000));

//         // Mock data based on your structure

//         setApplications(data);
//         setFilteredApps(data);
//         setError(null);
//       } catch (err) {
//         setError("Failed to fetch applications. Please try again later.");
//         console.error("Fetch applications error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, []);

//   useEffect(() => {
//     let result = [...data];

//     // Apply type filter
//     if (activeFilter !== "all") {
//       result = result.filter((app) =>
//         activeFilter === "referral"
//           ? app.appliedViaReferral
//           : !app.appliedViaReferral
//       );
//     }

//     // Apply status filter
//     if (statusFilter !== "all") {
//       result = result.filter((app) => app.status === statusFilter);
//     }

//     // Apply search filter
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       result = result.filter(
//         (app) =>
//           app.job.title.toLowerCase().includes(term) ||
//           app.job.company.toLowerCase().includes(term) ||
//           app.job.location.toLowerCase().includes(term)
//       );
//     }

//     setFilteredApps(result);
//   }, [activeFilter, statusFilter, searchTerm, data]);

//   const clearFilters = () => {
//     setActiveFilter("all");
//     setStatusFilter("all");
//     setSearchTerm("");
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "applied":
//         return {
//           bg: "bg-blue-900/20",
//           text: "text-blue-300",
//           border: "border-blue-800/30",
//         };
//       case "review":
//         return {
//           bg: "bg-purple-900/20",
//           text: "text-purple-300",
//           border: "border-purple-800/30",
//         };
//       case "interview":
//         return {
//           bg: "bg-yellow-900/20",
//           text: "text-yellow-300",
//           border: "border-yellow-800/30",
//         };
//       case "rejected":
//         return {
//           bg: "bg-red-900/20",
//           text: "text-red-300",
//           border: "border-red-800/30",
//         };
//       case "hired":
//         return {
//           bg: "bg-green-900/20",
//           text: "text-green-300",
//           border: "border-green-800/30",
//         };
//       default:
//         return {
//           bg: "bg-gray-800",
//           text: "text-gray-300",
//           border: "border-gray-700",
//         };
//     }
//   };

//   const exportToCSV = () => {
//     // In a real app, this would generate and download a CSV file
//     alert(
//       "Export functionality would download a CSV file in a real application"
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-gray-300">Loading your applications...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
//         <div className="text-center max-w-md p-6 bg-gray-800 rounded-xl border border-red-500/30">
//           <FiAlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
//           <h3 className="text-xl font-semibold text-red-500 mb-2">Error</h3>
//           <p className="text-gray-400 mb-4">{error}</p>
//           <button
//             className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg"
//             onClick={() => window.location.reload()}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
//                 Your Job Applications
//               </h1>
//               <p className="text-gray-400 mt-2">
//                 Track and manage all your job applications in one place
//               </p>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all"
//                 onClick={() => setShowFilters(!showFilters)}
//               >
//                 <FiFilter className="w-5 h-5" />
//                 {showFilters ? "Hide Filters" : "Show Filters"}
//               </button>
//               <button
//                 className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-all"
//                 onClick={() => navigate(-1)}
//               >
//                 Back to Dashboard
//               </button>
//             </div>
//           </div>

//           {/* Filter bar */}
//           <div className="flex flex-wrap gap-3 mb-6">
//             <button
//               className={`px-4 py-2 rounded-lg font-medium transition-all ${
//                 activeFilter === "all"
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
//                   : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//               }`}
//               onClick={() => setActiveFilter("all")}
//             >
//               All Applications
//             </button>
//             <button
//               className={`px-4 py-2 rounded-lg font-medium transition-all ${
//                 activeFilter === "direct"
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
//                   : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//               }`}
//               onClick={() => setActiveFilter("direct")}
//             >
//               Direct Applications
//             </button>
//             <button
//               className={`px-4 py-2 rounded-lg font-medium transition-all ${
//                 activeFilter === "referral"
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
//                   : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//               }`}
//               onClick={() => setActiveFilter("referral")}
//             >
//               Referral Applications
//             </button>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//             <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//               <div className="text-sm text-gray-400 mb-1">
//                 Total Applications
//               </div>
//               <div className="text-2xl font-bold text-white">{data.length}</div>
//             </div>
//             <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//               <div className="text-sm text-gray-400 mb-1">
//                 Direct Applications
//               </div>
//               <div className="text-2xl font-bold text-blue-400">
//                 {data.filter((app) => !app.appliedViaReferral).length}
//               </div>
//             </div>
//             <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//               <div className="text-sm text-gray-400 mb-1">
//                 Referral Applications
//               </div>
//               <div className="text-2xl font-bold text-teal-400">
//                 {data.filter((app) => app.appliedViaReferral).length}
//               </div>
//             </div>
//             <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//               <div className="text-sm text-gray-400 mb-1">
//                 Active Applications
//               </div>
//               <div className="text-2xl font-bold text-green-400">
//                 {
//                   data.filter(
//                     (app) => app.status !== "rejected" && app.status !== "hired"
//                   ).length
//                 }
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters Panel */}
//         {showFilters && (
//           <div className="bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700 mb-8 animate-fadeIn">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold text-white">
//                 Filter Applications
//               </h3>
//               <button
//                 className="text-gray-400 hover:text-white transition-colors"
//                 onClick={() => setShowFilters(false)}
//               >
//                 <FiX className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Search */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-400 mb-2">
//                   Search Applications
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search by job title, company, or location"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-4 pr-4 py-2.5 rounded-lg border border-gray-700 bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300"
//                   />
//                 </div>
//               </div>

//               {/* Status Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-400 mb-2">
//                   Application Status
//                 </label>
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="all">All Statuses</option>
//                   <option value="applied">Applied</option>
//                   <option value="review">In Review</option>
//                   <option value="interview">Interview</option>
//                   <option value="rejected">Rejected</option>
//                   <option value="hired">Hired</option>
//                 </select>
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 mt-6">
//               <button
//                 className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg"
//                 onClick={clearFilters}
//               >
//                 Clear Filters
//               </button>
//               <button
//                 className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium"
//                 onClick={() => setShowFilters(false)}
//               >
//                 Apply Filters
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Active Filters */}
//         {(activeFilter !== "all" || statusFilter !== "all" || searchTerm) && (
//           <div className="mb-6">
//             <div className="flex flex-wrap gap-2 items-center">
//               <span className="text-gray-400 text-sm">Active filters:</span>

//               {activeFilter !== "all" && (
//                 <span className="flex items-center bg-blue-900/30 text-blue-300 px-3 py-1.5 rounded-lg text-sm">
//                   {activeFilter === "referral"
//                     ? "Referral Applications"
//                     : "Direct Applications"}
//                   <button
//                     className="ml-2 text-gray-400 hover:text-white transition-colors"
//                     onClick={() => setActiveFilter("all")}
//                   >
//                     <FiX className="w-4 h-4" />
//                   </button>
//                 </span>
//               )}

//               {statusFilter !== "all" && (
//                 <span className="flex items-center bg-purple-900/30 text-purple-300 px-3 py-1.5 rounded-lg text-sm">
//                   Status:{" "}
//                   {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
//                   <button
//                     className="ml-2 text-gray-400 hover:text-white transition-colors"
//                     onClick={() => setStatusFilter("all")}
//                   >
//                     <FiX className="w-4 h-4" />
//                   </button>
//                 </span>
//               )}

//               {searchTerm && (
//                 <span className="flex items-center bg-blue-900/30 text-blue-300 px-3 py-1.5 rounded-lg text-sm">
//                   Search: {searchTerm}
//                   <button
//                     className="ml-2 text-gray-400 hover:text-white transition-colors"
//                     onClick={() => setSearchTerm("")}
//                   >
//                     <FiX className="w-4 h-4" />
//                   </button>
//                 </span>
//               )}

//               <button
//                 className="text-sm text-gray-400 hover:text-gray-200 flex items-center transition-colors"
//                 onClick={clearFilters}
//               >
//                 <FiX className="mr-1" /> Clear all
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Applications Grid */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold text-white">
//               {data.length} {data.length === 1 ? "Application" : "Applications"}{" "}
//               Found
//             </h2>
//             <button
//               className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
//               onClick={exportToCSV}
//             >
//               <FiDownload className="mr-1" /> Export to CSV
//             </button>
//           </div>

//           {data.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {data.map((app, index) => {
//                 const statusColor = getStatusColor(app?.applicationStatus);
//                 return (
//                   <div
//                     key={index}
//                     className="bg-gray-800 rounded-2xl border border-gray-700 p-6 hover:border-blue-500/50 transition-all"
//                   >
//                     <div className="flex justify-between items-start mb-4">
//                       <div>
//                         <h3 className="text-lg font-bold text-white">
//                           {app.job.title}
//                         </h3>
//                         <div className="flex items-center gap-2 mt-1">
//                           <span className="text-blue-400 font-medium">
//                             {app.job.company}
//                           </span>
//                           <span className="text-gray-500">•</span>
//                           <span
//                             className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}
//                           >
//                             {app.applicationStatus.charAt(0).toUpperCase() +
//                               app.applicationStatus.slice(1)}
//                           </span>
//                           {app.appliedViaReferral ? (
//                             <span className="text-xs px-2 py-1 rounded-full font-medium bg-teal-900/20 text-teal-300 border border-teal-800/30">
//                               Referral
//                             </span>
//                           ) : (
//                             <span className="text-xs px-2 py-1 rounded-full font-medium bg-teal-900/20 text-teal-300 border border-teal-800/30">
//                               Company
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                       <button className="text-gray-400 hover:text-white">
//                         <FiExternalLink className="w-5 h-5" />
//                       </button>
//                     </div>

//                     <div className="grid grid-cols-2 gap-3 mb-5">
//                       <div className="flex items-center gap-2 text-sm text-gray-400">
//                         <FiMapPin className="text-gray-500" />
//                         <span>{app.job.location}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-gray-400">
//                         <FiDollarSign className="text-gray-500" />
//                         <span>{app.job.salaryRange}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-gray-400">
//                         <FiBriefcase className="text-gray-500" />
//                         <span>{app.job.
// employmentType
// }</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-gray-400">
//                         <FiClock className="text-gray-500" />
//                         <span>{app.job.
// experienceRequired
// }</span>
//                       </div>
//                     </div>

//                     {/* {app.interviewDate && (
//                       <div className="flex items-center gap-2 text-sm text-yellow-400 mb-4 bg-yellow-900/20 px-3 py-2 rounded-lg">
//                         <FiCalendar className="w-4 h-4" />
//                         <span>Interview scheduled: {new Date(app.interviewDate).toLocaleDateString()}</span>
//                       </div>
//                     )} */}

//                     <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
//                       <div className="text-sm text-gray-500">
//                         Applied:{" "}
//                         {app.statusUpdatedAt
//                           ? new Date(app.statusUpdatedAt).toLocaleDateString()
//                           : new Date(app.createdAt).toLocaleDateString()}
//                       </div>
//                       <div className="flex gap-2">
//                         {/* <a
//                           href={app.resumeUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
//                         >
//                           <FiDownload className="mr-1" /> Resume
//                         </a> */}
//                         <button
//                           className="text-sm text-blue-400 hover:text-blue-300"
//                           onClick={() =>
//                             navigate(`/application/${app.job._id}`)
//                           }
//                         >
//                           View Details
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="text-center py-16 bg-gray-800/50 rounded-xl border border-gray-700">
//               <FiBookmark className="w-16 h-16 mx-auto text-gray-600 mb-4" />
//               <h3 className="text-xl font-semibold text-gray-300 mb-2">
//                 No Applications Found
//               </h3>
//               <p className="text-gray-500 max-w-md mx-auto mb-6">
//                 Try adjusting your filters or search terms to find your
//                 applications
//               </p>
//               <button
//                 className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium"
//                 onClick={clearFilters}
//               >
//                 Clear Filters
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Application Tips */}
//         <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
//           <h3 className="text-lg font-semibold text-white mb-4">
//             Application Management Tips
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="p-4 bg-gray-900/50 rounded-xl">
//               <div className="text-blue-400 text-sm font-medium mb-2">
//                 Direct Applications
//               </div>
//               <p className="text-gray-400 text-sm">
//                 Follow up after 5-7 business days. Tailor your application to
//                 each company's specific requirements.
//               </p>
//             </div>
//             <div className="p-4 bg-gray-900/50 rounded-xl">
//               <div className="text-teal-400 text-sm font-medium mb-2">
//                 Referral Applications
//               </div>
//               <p className="text-gray-400 text-sm">
//                 Contact your referrer for application updates. Referrals often
//                 get faster responses and higher interview rates.
//               </p>
//             </div>
//             <div className="p-4 bg-gray-900/50 rounded-xl">
//               <div className="text-purple-400 text-sm font-medium mb-2">
//                 Interview Preparation
//               </div>
//               <p className="text-gray-400 text-sm">
//                 Research the company culture and recent news. Prepare 2-3
//                 thoughtful questions to ask your interviewer.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllApplications;




import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiBookmark, 
  FiFilter, 
  FiX, 
  FiExternalLink, 
  FiMapPin, 
  FiBriefcase, 
  FiDollarSign,
  FiClock,
  FiDownload,
  FiSearch,
  FiRefreshCw,
  FiTrendingUp,
  FiUserCheck,
  FiSend
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeekerApplications } from "../features/applicantSlice";
import AllApplicationCard from "../components/AllApplicationCard";
import StatsCard from "../components/StatsCard";
import FilterPanel from "../components/FilterPanel";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";

const AllApplications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux state
  const { data: applications, loading, error } = useSelector((state) => state.applicants);
  
  // Local state
  const [filteredApps, setFilteredApps] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Fetch applications on component mount
  useEffect(() => {
    dispatch(fetchSeekerApplications());
  }, [dispatch]);

  // Filter and sort applications
  useEffect(() => {
    let result = [...applications];
    
    // Apply type filter
    if (activeFilter !== "all") {
      result = result.filter((app) =>
        activeFilter === "referral" ? app.appliedViaReferral : !app.appliedViaReferral
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((app) => app.applicationStatus === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (app) =>
          app.job?.title?.toLowerCase().includes(term) ||
          app.job?.company?.toLowerCase().includes(term) ||
          app.job?.location?.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      
      if (sortBy === "newest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    setFilteredApps(result);
  }, [activeFilter, statusFilter, searchTerm, applications, sortBy]);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      total: applications.length,
      direct: applications.filter(app => !app.appliedViaReferral).length,
      referral: applications.filter(app => app.appliedViaReferral).length,
      active: applications.filter(
        app => app.applicationStatus !== "rejected" && app.applicationStatus !== "hired"
      ).length,
      interview: applications.filter(app => app.applicationStatus === "interview").length,
    };
  }, [applications]);

  // Clear all filters
  const clearFilters = () => {
    setActiveFilter("all");
    setStatusFilter("all");
    setSearchTerm("");
    setSortBy("newest");
  };



  // Handle application click
  const handleViewApplication = (appId) => {
    navigate(`/application/${appId}`);
  };

  // Refresh applications
  const refreshApplications = () => {
    dispatch(fetchSeekerApplications());
  };

  if (loading) return <LoadingSpinner message="Loading your applications..." />;
  if (error) return <ErrorState message={error} onRetry={refreshApplications} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-l md:text-3xl font-bold text-gray-900 dark:text-white">
                Your Job Applications
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Track and manage all your job applications in one place
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg text-sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FiFilter className="w-3 h-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
              
              <button
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-900 dark:text-gray-200 rounded-lg font-medium transition-all shadow-sm text-sm"
                onClick={() => navigate(-1)}
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <StatsCard 
              title="Total Applications" 
              value={stats.total} 
              icon={<FiBookmark className="text-blue-500" />}
              color="blue"
            />
            <StatsCard 
              title="Direct Applications" 
              value={stats.direct} 
              icon={<FiSend className="text-teal-500" />}
              color="teal"
            />
            <StatsCard 
              title="Referral Applications" 
              value={stats.referral} 
              icon={<FiUserCheck className="text-purple-500" />}
              color="purple"
            />
            <StatsCard 
              title="Active Applications" 
              value={stats.active} 
              icon={<FiTrendingUp className="text-green-500" />}
              color="green"
            />
            <StatsCard 
              title="Interviews" 
              value={stats.interview} 
              icon={<FiClock className="text-amber-500" />}
              color="amber"
            />
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <FilterPanel 
            onClose={() => setShowFilters(false)}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onClear={clearFilters}
          />
        )}

        {/* Active Filters */}
        {(activeFilter !== "all" || statusFilter !== "all" || searchTerm) && (
          <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Active filters:</span>

              {activeFilter !== "all" && (
                <StatusBadge 
                  status={activeFilter === "referral" ? "Referral" : "Direct"} 
                  color="blue"
                  onRemove={() => setActiveFilter("all")}
                />
              )}

              {statusFilter !== "all" && (
                <StatusBadge 
                  status={statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} 
                  color="purple"
                  onRemove={() => setStatusFilter("all")}
                />
              )}

              {searchTerm && (
                <StatusBadge 
                  status={`Search: ${searchTerm}`} 
                  color="teal"
                  onRemove={() => setSearchTerm("")}
                />
              )}

              <button
                className="ml-auto text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center transition-colors"
                onClick={clearFilters}
              >
                <FiX className="mr-1" /> Clear all
              </button>
            </div>
          </div>
        )}

        {/* Applications Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          {/* <div>
            <h2 className="text-medium font-bold text-gray-900 dark:text-white">
              {filteredApps.length} {filteredApps.length === 1 ? "Application" : "Applications"} 
              <span className="text-gray-500 font-normal ml-2">
                {applications.length !== filteredApps.length ? `(filtered from ${applications.length})` : ""}
              </span>
            </h2>
          </div>
          
          <div className="flex gap-3">
            <button
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 flex items-center transition-colors"
              onClick={refreshApplications}
            >
              <FiRefreshCw className="mr-1" /> Refresh
            </button>
          
          </div> */}
        </div>

        {/* Applications Grid */}
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredApps.map((app) => (
              <AllApplicationCard 
                key={app._id}
                application={app}
                onClick={() => handleViewApplication(app._id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={<FiBookmark className="w-12 h-12 text-gray-400" />}
            title="No Applications Found"
            description="Try adjusting your filters or search terms to find your applications"
            actionText="Clear Filters"
            onAction={clearFilters}
          />
        )}

        {/* Application Tips */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Application Management Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
              <div className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
                Direct Applications
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Follow up after 5-7 business days. Tailor your application to each company's requirements.
              </p>
            </div>
            <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-100 dark:border-teal-800/30">
              <div className="text-teal-600 dark:text-teal-400 text-sm font-medium mb-2">
                Referral Applications
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Contact your referrer for updates. Referrals get faster responses and higher interview rates.
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/30">
              <div className="text-purple-600 dark:text-purple-400 text-sm font-medium mb-2">
                Interview Preparation
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Research the company culture and recent news. Prepare thoughtful questions for your interviewer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllApplications;