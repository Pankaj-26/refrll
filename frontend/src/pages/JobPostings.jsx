



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
  selectTotalPages,
  selectTotalCount,
} from "../features/jobSlice";
import JobCard from "../components/JobCard";
import JobPostingFilterPanel from "../components/JobPostingFilterPanel";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import JobModal from "../components/JobModal";
import toast from "react-hot-toast"; // Add toast import

const JobPostings = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const activeTab = searchParams.get("tab") || "company";

  // Redux state
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
  const [showJobDetail, setShowJobDetail] = useState(null);

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



  // Handle referral claim directly
  const handleReferClick = useCallback(
    (job) => {
      if (!user?.email) {
        toast.error("Please add email to your profile first");
        return;
      }
      
      dispatch(
        claimJobForReferral({
          jobId: job._id,
          contactInfo: user.email,
        })
      )
        .unwrap()
        .then(() => {
          
          toast.success("Job claimed successfully! You can now refer candidates.");

            // Refetch jobs to update UI with claimed status
  const currentTab = searchParams.get("tab") || "company";
  const fetchParams = {
    tab: currentTab,
    search,
    page: currentPage,
    limit: 10,
    ...filters,
  };
  dispatch(fetchJobs(fetchParams));

        })
        .catch((error) => {
          toast.error(error.message || "Failed to claim job for referral");
        });
    },
    [dispatch, user,searchParams, search, currentPage, filters]
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6">
      {showJobDetail && (
        <JobModal
          selectedJob={showJobDetail}
          setSelectedJob={setShowJobDetail}
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
                setSelectedJob={setShowJobDetail}
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