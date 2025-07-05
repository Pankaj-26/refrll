// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import {
//   FiSearch,
//   FiBriefcase,
//   FiMapPin,
//   FiClock,
//   FiDollarSign,
//   FiCheckCircle,
//   FiFilter,
//   FiX,
//   FiUserPlus,
//   FiRefreshCw,
//   FiExternalLink,
//   FiCalendar,
//   FiShare2,
// } from "react-icons/fi";
// import {
//   fetchJobs,
//   applyToJob,
//   claimJobForReferral,
//   selectAllJobs,
//   selectJobsLoading,
//   selectJobsError,
// } from "../features/jobSlice";
// import JobCard from "../components/JobCard";
// import StatsCard from "../components/StatsCard";
// import JobPostingFilterPanel from "../components/JobPostingFilterPanel";
// import LoadingSpinner from "../components/LoadingSpinner";
// import ErrorState from "../components/ErrorState";
// import EmptyState from "../components/EmptyState";
// import ReferralModal from "../components/ReferralModal";

// const JobPostings = () => {
//   const dispatch = useDispatch();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [search, setSearch] = useState("");
//   const activeTab = searchParams.get("tab") || "company";

//   // Redux state
//   const jobs = useSelector(selectAllJobs);
//   const loading = useSelector(selectJobsLoading);
//   const error = useSelector(selectJobsError);
//   const { user } = useSelector((state) => state.auth);
// const navigate=useNavigate()
//   // Filters state
//   const [filters, setFilters] = useState(() => {
//     const savedFilters = localStorage.getItem("jobFilters");
//     return savedFilters ? JSON.parse(savedFilters) : {
//       jobType: [],
//       experience: "",
//       salaryRange: "",
//       location: "",
//     };
//   });

//   const [showFilters, setShowFilters] = useState(false);
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [showReferModal, setShowReferModal] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);

//      const [isRefreshing, setIsRefreshing] = useState(false);

// const handleRefresh = useCallback(() => {
//   setIsRefreshing(true);

//   const fetchParams = {
//     tab: activeTab,
//     search: debouncedSearch,
//     experience: filters.experience,
//     salaryRange: filters.salaryRange,
//     location: filters.location,
//     // ...other filters if needed
//   };

//   dispatch(fetchJobs(fetchParams))
//     .finally(() => setIsRefreshing(false));
// }, [dispatch, activeTab, debouncedSearch, filters]);

//   // Set active tab in URL
//   const setActiveTab = useCallback((tab) => {
//     searchParams.set("tab", tab);
//     setSearchParams(searchParams, { replace: true });
//   }, [searchParams, setSearchParams]);

//   // Fetch jobs when tab or filters change
//   // useEffect(() => {
//   //   const fetchParams = {
//   //     tab: activeTab,
//   //     ...(debouncedSearch && { search: debouncedSearch }),
//   //     ...(filters.jobType.length > 0 && { jobType: filters.jobType }),
//   //     ...(filters.experience && { experience: filters.experience }),
//   //     ...(filters.salaryRange && { salaryRange: filters.salaryRange }),
//   //     ...(filters.location && { location: filters.location }),
//   //   };

//   //   dispatch(fetchJobs(fetchParams));
//   // }, [dispatch, activeTab, debouncedSearch, filters]);

//   useEffect(() => {
//     const fetchParams = {
//       tab: activeTab,
//       search: debouncedSearch,
//       experience: searchParams.experience && !isNaN(searchParams.experience) ? searchParams.experience : undefined,
//       salaryRange: filters.salaryRange,
//       location: filters.location,
//       // page: currentPage,
//       limit: 20 // or any default limit
//     };

//     dispatch(fetchJobs(fetchParams));
//   }, [activeTab, debouncedSearch, filters, dispatch]);

//   // Debounce search input
//   useEffect(() => {
//     const handler = setTimeout(() => setDebouncedSearch(search), 500);
//     return () => clearTimeout(handler);
//   }, [search]);

//   // Save filters to localStorage
//   useEffect(() => {
//     localStorage.setItem("jobFilters", JSON.stringify(filters));
//   }, [filters]);

//   // Handle job application
//   const handleApply = useCallback((jobId) => {
//     dispatch(applyToJob(jobId));

//   }, [dispatch]);

//   // Handle referral claim
//   const handleReferClick = useCallback((job) => {
//     setSelectedJob(job);
//     setShowReferModal(true);
//       handleRefresh()

//   }, []);

//   const confirmReferral = useCallback((contactInfo) => {
//     if (selectedJob) {
//      dispatch(claimJobForReferral({
//         jobId: selectedJob._id,
//         contactInfo,
//       }))

//        .then(() => {
//       setShowReferModal(false);
//       handleRefresh();
//         // setShowReferModal(false);
//        })
//     }
//   }, [dispatch, selectedJob]);

//   // Toggle job type filter
//   const toggleJobTypeFilter = useCallback((type) => {
//     setFilters(prev => ({
//       ...prev,
//       jobType: prev.jobType.includes(type)
//         ? prev.jobType.filter(t => t !== type)
//         : [...prev.jobType, type],
//     }));
//   }, []);

//   // Update filter value
//   const updateFilter = useCallback((name, value) => {
//     setFilters(prev => ({ ...prev, [name]: value }));
//   }, []);

//   // Reset all filters
//   const resetFilters = useCallback(() => {
//     setFilters({
//       jobType: [],
//       experience: "",
//       salaryRange: "",
//       location: "",
//     });
//     setSearch("");
//   }, []);

//   // Calculate stats
//   // const stats = useMemo(() => ({
//   //   total: jobs.length,
//   //   referral: jobs.filter(job => job.postedByType === "referrer").length,
//   //   company: jobs.filter(job => job.postedByType === "company").length,
//   //   remote: jobs.filter(job => job.employmentType === "Remote").length,
//   // }), [jobs]);

// const stats = useMemo(() => {
//   if (!Array.isArray(jobs)) return {
//     total: 0,
//     referral: 0,
//     company: 0,
//     remote: 0,
//   };

//   return {
//     total: jobs.length,
//     referral: jobs.filter(job => job.postedByType === "referrer").length,
//     company: jobs.filter(job => job.postedByType === "company").length,
//     remote: jobs.filter(job => job.employmentType === "Remote").length,
//   };
// }, [jobs]);

//   // Filter jobs client-side
//   const filteredJobs = useMemo(() => {
//     return jobs.filter(job => {
//       const matchesSearch = search
//         ? job.title.toLowerCase().includes(search.toLowerCase()) ||
//           job.company.toLowerCase().includes(search.toLowerCase()) ||
//           job.description.toLowerCase().includes(search.toLowerCase())
//         : true;

//       const matchesFilters =
//         (filters.jobType.length === 0 || filters.jobType.includes(job.employmentType)) &&
//         (!filters.experience || job.experienceRequired >= parseInt(filters.experience)) &&
//         (!filters.salaryRange || job.salaryRange === filters.salaryRange) &&
//         (!filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase()));

//       return matchesSearch && matchesFilters;
//     });
//   }, [jobs, search, filters]);

//   // Render loading state
//   if (loading && jobs.length === 0) {
//     return <LoadingSpinner message="Loading job opportunities..." />;
//   }

//   // Render error state
//   if (error && jobs.length === 0) {
//     return <ErrorState message={error} onRetry={() => dispatch(fetchJobs({ tab: activeTab }))} />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 md:p-8">
//       {showReferModal && selectedJob && (
//         <ReferralModal
//           job={selectedJob}
//           onClose={() => setShowReferModal(false)}
//           onConfirm={confirmReferral}
//           defaultContact={user?.email || ""}
//         />
//       )}

//       <div className="max-w-7xl mx-auto">
//         {/* Search Header */}
//         <div className="mb-8 text-center">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
//             Discover Career Opportunities
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
//             Find your perfect role or help others find theirs through our referral network
//           </p>
//           <div className="max-w-2xl mx-auto relative">
//             <FiSearch className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search jobs by title, skills, or company..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-900 dark:text-white shadow-sm"
//             />
//           </div>
//         </div>

//         {/* Tabs and Stats */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
//           <div className="lg:col-span-3">
//             <div className="flex flex-wrap gap-2 mb-4">
//               <button
//                 className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
//                   activeTab === "company"
//                     ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
//                     : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
//                 }`}
//                 onClick={() => setActiveTab("company")}
//               >
//                 <FiBriefcase className="mr-2" />
//                 Company Jobs
//               </button>

//               {user?.roles?.seeker && (
//                 <button
//                   className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
//                     activeTab === "referral"
//                       ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
//                       : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
//                   }`}
//                   onClick={() => setActiveTab("referral")}
//                 >
//                   <FiUserPlus className="mr-2" />
//                   Referral Jobs
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="flex items-center justify-end gap-2">
//             <button
//               className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center transition-colors border border-gray-200 dark:border-gray-700"
//               onClick={() => setShowFilters(!showFilters)}
//             >
//               <FiFilter className="mr-2" />
//               {showFilters ? "Hide Filters" : "Show Filters"}
//             </button>
//             <button
//               className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center transition-colors border border-gray-200 dark:border-gray-700"
//               onClick={resetFilters}
//             >
//               <FiRefreshCw className="mr-2" />
//               Reset
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           <StatsCard
//             title="Total Jobs"
//             value={stats.total}
//             icon={<FiBriefcase className="text-blue-500" />}
//             color="blue"
//           />
//           <StatsCard
//             title="Company Jobs"
//             value={stats.company}
//             icon={<FiBriefcase className="text-indigo-500" />}
//             color="indigo"
//           />
//           <StatsCard
//             title="Referral Jobs"
//             value={stats.referral}
//             icon={<FiUserPlus className="text-teal-500" />}
//             color="teal"
//           />
//           <StatsCard
//             title="Remote Jobs"
//             value={stats.remote}
//             icon={<FiMapPin className="text-amber-500" />}
//             color="amber"
//           />
//         </div> */}

//         {/* Filters Panel */}
//         {showFilters && (
//           <JobPostingFilterPanel
//             filters={filters}
//             onUpdateFilter={updateFilter}
//             onToggleJobType={toggleJobTypeFilter}
//             onClose={() => setShowFilters(false)}
//             onReset={resetFilters}
//           />
//         )}

//         {/* Active Filters */}
//         {(filters.jobType.length > 0 || filters.experience || filters.salaryRange || filters.location || search) && (
//           <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
//             <div className="flex flex-wrap gap-2 items-center">
//               <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Active filters:</span>

//               {filters.jobType.map(type => (
//                 <span
//                   key={type}
//                   className="flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1.5 rounded-lg text-sm"
//                 >
//                   {type}
//                   <button
//                     className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors"
//                     onClick={() => toggleJobTypeFilter(type)}
//                   >
//                     <FiX className="w-4 h-4" />
//                   </button>
//                 </span>
//               ))}

//               {filters.experience && (
//                 <span className="flex items-center bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 px-3 py-1.5 rounded-lg text-sm">
//                   Exp: {filters.experience}+ years
//                   <button
//                     className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors"
//                     onClick={() => updateFilter("experience", "")}
//                   >
//                     <FiX className="w-4 h-4" />
//                   </button>
//                 </span>
//               )}

//               {filters.salaryRange && (
//                 <span className="flex items-center bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-3 py-1.5 rounded-lg text-sm">
//                   Salary: {filters.salaryRange}
//                   <button
//                     className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors"
//                     onClick={() => updateFilter("salaryRange", "")}
//                   >
//                     <FiX className="w-4 h-4" />
//                   </button>
//                 </span>
//               )}

//               {filters.location && (
//                 <span className="flex items-center bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1.5 rounded-lg text-sm">
//                   Location: {filters.location}
//                   <button
//                     className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors"
//                     onClick={() => updateFilter("location", "")}
//                   >
//                     <FiX className="w-4 h-4" />
//                   </button>
//                 </span>
//               )}

//               {search && (
//                 <span className="flex items-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-3 py-1.5 rounded-lg text-sm">
//                   Search: {search}
//                   <button
//                     className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors"
//                     onClick={() => setSearch("")}
//                   >
//                     <FiX className="w-4 h-4" />
//                   </button>
//                 </span>
//               )}

//               <button
//                 className="ml-auto text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center transition-colors"
//                 onClick={resetFilters}
//               >
//                 <FiX className="mr-1" /> Clear all
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Jobs Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
//           <div>
//             <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//               {activeTab === "company"
//                 ? "Company Job Postings"
//                 : "Referral Opportunities"}
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400">
//               {filteredJobs.length} of {jobs.length} jobs shown
//             </p>
//           </div>
//           <div className="text-sm text-gray-600 dark:text-gray-400">
//             <span className="font-medium text-blue-500">
//               {filteredJobs.length}
//             </span>{" "}
//             {filteredJobs.length === 1 ? "job" : "jobs"} found
//           </div>
//         </div>

//         {/* Jobs Grid */}
//         {filteredJobs.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             {filteredJobs.map((job) => (
//               <JobCard
//                 key={job._id}
//                 job={job}

//                 currentUser={user}
//                 onApply={handleApply}
//                 onRefer={handleReferClick}
//                 loading={loading}
//                 activeTab={activeTab}
//               />
//             ))}
//           </div>
//         ) : (
//           <EmptyState
//             icon={<FiBriefcase className="w-12 h-12 text-gray-400" />}
//             title="No Jobs Found"
//             description="Try adjusting your filters or search terms"
//             actionText="Reset Filters"
//             onAction={resetFilters}
//           />
//         )}

//         {/* Call to Action */}
//         <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-center mb-8">
//           <h3 className="text-xl font-bold text-white mb-3">
//             {activeTab === "company"
//               ? "Ready to find your next opportunity?"
//               : "Have a job to share?"}
//           </h3>
//           <p className="text-blue-100 mb-4 max-w-2xl mx-auto">
//             {activeTab === "company"
//               ? "Create a profile to apply to jobs or get referral assistance"
//               : "Refer candidates and earn rewards when they get hired"}
//           </p>
//           <button
//             className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium shadow-lg hover:bg-gray-100 transition-colors"
//             onClick={() => navigate(activeTab === "company" ? "/seeker-profile" : "/referrer-profile")}
//           >
//             {activeTab === "company" ? "Complete Your Profile" : "Become a Referrer"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobPostings;






import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FiSearch,
  FiBriefcase,
  FiFilter,
  FiX,
  FiUserPlus,
  FiRefreshCw,
} from "react-icons/fi";
import {
  fetchJobs,
  applyToJob,
  claimJobForReferral,
  selectAllJobs,
  selectJobsLoading,
  selectJobsError,
  // Add these selectors
  selectTotalPages,
  selectTotalCount,
} from "../features/jobSlice";
import JobCard from "../components/JobCard";
import JobPostingFilterPanel from "../components/JobPostingFilterPanel";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import ReferralModal from "../components/ReferralModal";

const JobPostings = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const activeTab = searchParams.get("tab") || "company";

  // Redux state with added selectors
  const jobs = useSelector(selectAllJobs);
  const loading = useSelector(selectJobsLoading);
  const error = useSelector(selectJobsError);
  const totalPages = useSelector(selectTotalPages);
  const totalCount = useSelector(selectTotalCount);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Server-side pagination and filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem("jobFilters");
    return savedFilters
      ? JSON.parse(savedFilters)
      : {
          jobType: [],
          experience: "",
          salaryRange: "",
          location: "",
        };
  });

  const [showFilters, setShowFilters] = useState(false);
  const [showReferModal, setShowReferModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);



useEffect(() => {
  const currentTab = searchParams.get("tab") || "company";

  const fetchParams = {
    tab: currentTab,
    search,
    page: currentPage,
    limit: 10,
    ...filters,
  };

 document.title = "Jobs | Refrll – Browse Latest Jobs and Referrals";

  dispatch(fetchJobs(fetchParams));
}, [dispatch, searchParams, search, filters, currentPage]);


  // Save filters to localStorage
  useEffect(() => {
    localStorage.setItem("jobFilters", JSON.stringify(filters));
  }, [filters]);

  // Set active tab in URL
  const setActiveTab = useCallback(
    (tab) => {
      setCurrentPage(1);
      searchParams.set("tab", tab);
      setSearchParams(searchParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // Handle job application
  const handleApply = useCallback(
    (jobId) => {
      dispatch(applyToJob(jobId));
    },
    [dispatch]
  );

  // Handle referral claim
  const handleReferClick = useCallback((job) => {
    setSelectedJob(job);
    setShowReferModal(true);
  }, []);

  const confirmReferral = useCallback(
    (contactInfo) => {
      if (selectedJob) {
        dispatch(
          claimJobForReferral({
            jobId: selectedJob._id,
            contactInfo,
          })
        ).then(() => {
          setShowReferModal(false);
        });
      }
    },
    [dispatch, selectedJob]
  );

  // Toggle job type filter
  const toggleJobTypeFilter = useCallback((type) => {
    setFilters((prev) => ({
      ...prev,
      jobType: prev.jobType.includes(type)
        ? prev.jobType.filter((t) => t !== type)
        : [...prev.jobType, type],
    }));
    setCurrentPage(1);
  }, []);

  // Update filter value
  const updateFilter = useCallback((name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters({
      jobType: [],
      experience: "",
      salaryRange: "",
      location: "",
    });
    setSearch("");
    setCurrentPage(1);
  }, []);

  // Render loading state
  if (loading && jobs.length === 0) {
    return <LoadingSpinner message="Loading job opportunities..." />;
  }

  // Render error state
  if (error && jobs.length === 0) {
    return (
      <ErrorState
        message={error}
        onRetry={() => dispatch(fetchJobs({ tab: activeTab }))}
      />
    );
  }

  console.log("Fetching jobs for tab:", activeTab);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6">
      {showReferModal && selectedJob && (
        <ReferralModal
          job={selectedJob}
          onClose={() => setShowReferModal(false)}
          onConfirm={confirmReferral}
          defaultContact={user?.email || ""}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Compact Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Discover Career Opportunities
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Find your perfect role or help others find theirs
            </p>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 placeholder-gray-500 text-gray-900 dark:text-white text-sm"
              />
            </div>

            <button
              className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center transition-colors border border-gray-200 dark:border-gray-700"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center text-sm ${
              activeTab === "company"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
            }`}
            onClick={() => setActiveTab("company")}
          >
            <FiBriefcase className="mr-1" />
            Company Jobs
          </button>

          {user?.roles?.seeker && (
            <button
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center text-sm ${
                activeTab === "referral"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
              onClick={() => setActiveTab("referral")}
            >
              <FiUserPlus className="mr-1" />
              Referral Jobs
            </button>
          )}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <JobPostingFilterPanel
            filters={filters}
            onUpdateFilter={updateFilter}
            onToggleJobType={toggleJobTypeFilter}
            onClose={() => setShowFilters(false)}
            onReset={resetFilters}
          />
        )}

        {/* Active Filters */}
        {(filters.jobType.length > 0 ||
          filters.experience ||
          filters.salaryRange ||
          filters.location ||
          search) && (
          <div className="mb-4 bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700 text-sm">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                Active filters:
              </span>

              {filters.jobType.map((type) => (
                <span
                  key={type}
                  className="flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs"
                >
                  {type}
                  <button
                    className="ml-1 text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors"
                    onClick={() => toggleJobTypeFilter(type)}
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {filters.experience && (
                <span className="flex items-center bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 px-2 py-1 rounded text-xs">
                  Exp: {filters.experience}+ years
                  <button
                    className="ml-1 text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors"
                    onClick={() => updateFilter("experience", "")}
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.salaryRange && (
                <span className="flex items-center bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-1 rounded text-xs">
                  Salary: {filters.salaryRange}
                  <button
                    className="ml-1 text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors"
                    onClick={() => updateFilter("salaryRange", "")}
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.location && (
                <span className="flex items-center bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded text-xs">
                  Location: {filters.location}
                  <button
                    className="ml-1 text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors"
                    onClick={() => updateFilter("location", "")}
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}

              {search && (
                <span className="flex items-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded text-xs">
                  Search: {search}
                  <button
                    className="ml-1 text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors"
                    onClick={() => setSearch("")}
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                className="ml-auto text-xs text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center transition-colors"
                onClick={resetFilters}
              >
                <FiX className="mr-1" /> Clear all
              </button>
            </div>
          </div>
        )}

        {/* Jobs Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4 bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700 text-sm">
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white">
              {activeTab === "company"
                ? "Company Job Postings"
                : "Referral Opportunities"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Showing {jobs.length} of {totalCount} jobs
            </p>
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Jobs Grid */}
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                currentUser={user}
                onApply={handleApply}
                onRefer={handleReferClick}
                loading={loading}
                activeTab={activeTab}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<FiBriefcase className="w-10 h-10 text-gray-400" />}
            title="No Jobs Found"
            description="Try adjusting your filters or search terms"
            actionText="Reset Filters"
            onAction={resetFilters}
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-8">
            <button
              className={`px-3 py-1.5 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
              } border border-gray-200 dark:border-gray-700 text-sm`}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    currentPage === pageNum
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                      : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                  } border border-gray-200 dark:border-gray-700`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              className={`px-3 py-1.5 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
              } border border-gray-200 dark:border-gray-700 text-sm`}
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 text-center mb-6">
          <h3 className="font-bold text-white mb-2">
            {activeTab === "company"
              ? "Ready to find your next opportunity?"
              : "Have a job to share?"}
          </h3>
          <p className="text-blue-100 mb-3 text-sm">
            {activeTab === "company"
              ? "Create a profile to apply to jobs or get referral assistance"
              : "Refer candidates and earn rewards when they get hired"}
          </p>
          <button
            className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium text-sm shadow hover:bg-gray-100 transition-colors"
            onClick={() =>
              navigate(
                activeTab === "company" ? "/seeker-profile" : "/referrer-profile"
              )
            }
          >
            {activeTab === "company" ? "Complete Profile" : "Become a Referrer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPostings;