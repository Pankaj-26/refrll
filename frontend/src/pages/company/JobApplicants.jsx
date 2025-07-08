
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiDownload,
  FiUser,
  FiMail,
  FiPhone,
  FiFileText,
  FiFilter,
  FiX,
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiRefreshCw,
  FiAlertCircle,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobWithApplicants,
  setEditJob,
  updateApplicationStatus,
} from "../../features/jobSlice";
import * as XLSX from "xlsx";
import { BiRupee } from "react-icons/bi";

// Memoized Applicant Card Component
const ApplicantCard = React.memo(
  ({ applicant, onStatusUpdate, isExpanded, onToggle }) => {
    const statusColors = {
      applied: "bg-blue-100 text-blue-800",
      reviewed: "bg-yellow-100 text-yellow-800",
      interview: "bg-purple-100 text-purple-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };

    return (
      <div className="border border-gray-200 rounded-xl overflow-hidden transition-all hover:shadow-md">
        <div
          className="bg-white p-4 cursor-pointer flex justify-between items-center"
          onClick={() => onToggle(applicant._id)}
        >
          <div className="flex items-center gap-4">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
              <FiUser className="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <div className="font-medium text-gray-900 truncate max-w-[180px]">
                {applicant?.seeker?.name || "Unnamed Applicant"}
              </div>
              <div className="text-sm text-gray-600 truncate max-w-[180px]">
                {applicant?.seeker?.email}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                    statusColors[applicant.companyStatus] ||
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {applicant.companyStatus}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(applicant.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <div className="text-xs text-gray-500">Experience</div>
              <div className="font-medium text-gray-900">
                {applicant?.seeker?.profile?.experience || 0} yrs
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              {isExpanded ? (
                <FiChevronUp size={20} />
              ) : (
                <FiChevronDown size={20} />
              )}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="border-t border-gray-200 bg-gray-50 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2 text-sm">
                  Contact
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center">
                    <FiMail className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                    <span className="truncate">{applicant?.seeker?.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FiPhone className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                    <span>
                      {applicant?.seeker?.profile?.phone || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2 text-sm">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-1">
                  {(applicant?.seeker?.profile?.skills || [])
                    .slice(0, 5)
                    .map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2 text-sm">
                  Update Status
                </h4>
                <select
                  value={applicant.companyStatus}
                  onChange={(e) =>
                    onStatusUpdate(applicant._id, e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm"
                >
                  <option value="applied">Applied</option>
                  <option value="reviewed">Reviewed</option>
                
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2 text-sm">
                  Resume
                </h4>
                {applicant.resumeUrl ? (
                  <a
                    href={applicant.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <FiFileText className="mr-1" /> View Resume
                  </a>
                ) : (
                  <span className="text-gray-500 text-sm">Not available</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default function JobApplicants() {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pagination, currentJob, applicants, loading, error } = useSelector(
    (state) => state.jobs
  );
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    experienceMin: "",
    experienceMax: "",
    search: "",
  });
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [expandedApplicant, setExpandedApplicant] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [paginationError, setPaginationError] = useState(null);
  const [editSelectedJob, setEditSelectedJob] = useState(null);

  // Memoized job details
  const jobDetails = useMemo(() => {
    if (!currentJob) return null;

    return {
      title: currentJob.title,
      employmentType: currentJob.employmentType,
      location: currentJob.location,
      salaryRange: currentJob.salaryRange,
      description: currentJob.description,
      createdAt: new Date(currentJob.createdAt).toLocaleDateString(),
      experienceRequired: currentJob.experienceRequired,
      status: currentJob.status,
      company: currentJob.company,
      skills: currentJob.skills,
    };
  }, [currentJob]);

  // Fetch job applicants with pagination
  const fetchApplicants = useCallback(async () => {
    try {
      setIsPageChanging(true);
      setPaginationError(null);
      await dispatch(
        getJobWithApplicants({
          jobId,
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          filters: {
            status: filters.status,
            search: filters.search,
            experienceMin: filters.experienceMin,
            experienceMax: filters.experienceMax,
          },
        })
      );
    } catch (error) {
      setPaginationError("Failed to load applicants. Please try again.");
   
    } finally {
      setIsPageChanging(false);
    }
  }, [dispatch, jobId, currentPage, filters]);

  // Fetch job applicants
  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRefresh = useCallback(() => {
    fetchApplicants();
  }, [fetchApplicants]);



  // Status options
  const statusOptions = useMemo(
    () => ["All", "applied", "reviewed", "accepted", "rejected"],
    []
  );

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      status: "",
      experienceMin: "",
      experienceMax: "",
      search: "",
    });
  }, []);

  // const downloadExcel = useCallback(() => {
  //   if (!filteredApplicants.length) return;

  //   const data = filteredApplicants.map((applicant) => ({
  //     Name: applicant?.seeker?.name,
  //     Email: applicant?.seeker?.email,
  //     Phone: applicant?.seeker?.profile?.phone || "N/A",
  //     Experience: `${applicant?.seeker?.profile?.experience || 0} years`,
  //     Status: applicant.companyStatus,
  //     "Applied On": new Date(applicant.createdAt).toLocaleDateString(),
  //     Skills: (applicant?.seeker?.profile?.skills || []).join(", "),
  //     Resume: applicant.resumeUrl ? "Available" : "Not Available",
  //   }));

  //   const worksheet = XLSX.utils.json_to_sheet(data);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");
  //   XLSX.writeFile(
  //     workbook,
  //     `${currentJob.title.replace(/\s+/g, "_")}_Applicants.xlsx`
  //   );
  // }, [filteredApplicants, currentJob]);
 


  const handleStatusUpdate = useCallback(
    async (applicationId, newStatus) => {
      try {
        await dispatch(
          updateApplicationStatus({ applicationId, status: newStatus })
        );
        handleRefresh();
      } catch (error) {
        console.error("Status update failed:", error);
      }
    },
    [dispatch, handleRefresh]
  );

  const toggleApplicantDetails = useCallback((id) => {
    setExpandedApplicant((prev) => (prev === id ? null : id));
  }, []);

  useEffect(() => {
  setCurrentPage(1);
}, [filters.status, filters.search, filters.experienceMin, filters.experienceMax]);

  // Loading state
  if (loading && !currentJob) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm border border-red-200">
          <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <FiAlertCircle size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mt-4">
            Error Loading Data
          </h3>
          <p className="text-gray-600 mt-2">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleRefresh}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Job not found state
  if (!currentJob) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Job Not Found
          </h3>
          <p className="text-gray-600">
            The job you are looking for does not exist.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FiArrowLeft className="mr-2" /> Back
          </button>

          <button
            onClick={handleRefresh}
            className="flex items-center text-gray-600 hover:text-gray-800"
            disabled={isRefreshing}
          >
            <FiRefreshCw
              className={`mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {/* Job Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex-1 min-w-[260px]">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 truncate">
                {jobDetails.title}
              </h1>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="flex items-center bg-blue-100 text-blue-800 px-2.5 py-1 rounded-lg text-xs">
                  <FiBriefcase className="mr-1.5" /> {jobDetails.employmentType}
                </span>
                <span className="flex items-center bg-purple-100 text-purple-800 px-2.5 py-1 rounded-lg text-xs">
                  <FiMapPin className="mr-1.5" /> {jobDetails.location}
                </span>
                {jobDetails.salaryRange && (
                  <span className="flex items-center bg-green-100 text-green-800 px-2.5 py-1 rounded-lg text-xs">
                    <BiRupee className=" flex-shrink-0" />
                    {jobDetails.salaryRange} LPA
                  </span>
                )}
              </div>
              <div className="mb-3">
                <p
                  className={`text-gray-600 text-sm ${
                    showFullDescription ? "" : "line-clamp-5"
                  }`}
                >
                  {jobDetails.description}
                </p>
                {jobDetails.description &&
                  jobDetails.description.length > 200 && (
                    <button
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="text-blue-600 hover:text-blue-800 text-xs mt-1"
                    >
                      {showFullDescription ? "Show less" : "Read more"}
                    </button>
                  )}
              </div>
              <div>
                {jobDetails.skills &&
                  jobDetails.skills.length > 0 &&
                  jobDetails.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="mr-2 px-2 py-1 bg-gray-200 rounded"
                    >
                      {skill.trim()}
                    </span>
                  ))}
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl min-w-[220px] border border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Job Details
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted:</span>
                  <span className="text-gray-900 font-medium">
                    {jobDetails.createdAt}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience:</span>
                  <span className="text-gray-900 font-medium">
                    {jobDetails.experienceRequired}+ years
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Applicants:</span>
                  <span className="text-gray-900 font-medium">
                    {applicants.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      jobDetails.status === "Open"
                        ? "bg-green-100 text-green-800"
                        : jobDetails.status === "Closed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {jobDetails.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applicants Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Applicants ({pagination.totalApplicants})
              </h2>
              <p className="text-gray-500 text-xs">
                Filter and manage applications
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1.5 rounded-lg flex items-center text-xs font-medium ${
                  showFilterPanel
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setShowFilterPanel(!showFilterPanel)}
              >
                <FiFilter className="mr-1.5" />
                {showFilterPanel ? "Hide Filters" : "Filters"}
              </button>

              {/* <button
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg flex items-center text-xs font-medium hover:bg-blue-700 transition-colors"
                onClick={downloadExcel}
                disabled={!filteredApplicants.length}
              >
                <FiDownload className="mr-1.5" /> Export
              </button> */}
            </div>
          </div>

          {/* Quick Status Filter */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {statusOptions.map((status) => (
              <button
                key={status}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  filters.status === (status === "All" ? "" : status)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    status: status === "All" ? "" : status,
                  }));
                }}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search and Filters Panel */}
          {showFilterPanel && (
            <div className="bg-gray-50 rounded-lg p-4 mb-5 border border-gray-200">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Search Applicants
                  </label>
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="search"
                      placeholder="Name, email, or skills"
                      value={filters.search}
                      onChange={handleFilterChange}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 text-gray-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Min Experience
                    </label>
                    <input
                      type="number"
                      name="experienceMin"
                      placeholder="Min"
                      min="0"
                      value={filters.experienceMin}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Max Experience
                    </label>
                    <input
                      type="number"
                      name="experienceMax"
                      placeholder="Max"
                      min="0"
                      value={filters.experienceMax}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 text-gray-700"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-xs font-medium"
                    onClick={resetFilters}
                  >
                    Reset
                  </button>
                  <button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-medium"
                    onClick={() => setShowFilterPanel(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {filters.status && (
              <span className="flex items-center bg-blue-100 text-blue-800 px-2.5 py-1 rounded-lg text-xs">
                Status: {filters.status}
                <button
                  className="ml-1.5 text-blue-800 hover:text-blue-900"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, status: "" }))
                  }
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}

            {(filters.experienceMin || filters.experienceMax) && (
              <span className="flex items-center bg-blue-100 text-blue-800 px-2.5 py-1 rounded-lg text-xs">
                Exp: {filters.experienceMin || 0}-{filters.experienceMax || "∞"}
                yrs
                <button
                  className="ml-1.5 text-blue-800 hover:text-blue-900"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      experienceMin: "",
                      experienceMax: "",
                    }))
                  }
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.search && (
              <span className="flex items-center bg-blue-100 text-blue-800 px-2.5 py-1 rounded-lg text-xs">
                Search: {filters.search}
                <button
                  className="ml-1.5 text-blue-800 hover:text-blue-900"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, search: "" }))
                  }
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {/* Applicants List */}
          <div className="space-y-3">
            {isPageChanging ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-2 text-gray-600">Loading applicants...</p>
              </div>
            ) : paginationError ? (
              <div className="text-center py-8 bg-red-50 rounded-xl">
                <FiAlertCircle className="w-12 h-12 mx-auto text-red-500" />
                <h3 className="mt-3 text-base font-medium text-red-800">
                  Error loading applicants
                </h3>
                <p className="mt-1 text-red-600 text-sm">{paginationError}</p>
                <button
                  className="mt-3 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
                  onClick={handleRefresh}
                >
                  Try Again
                </button>
              </div>
            ) : applicants.length > 0 ? (
              applicants.map((applicant) => (
                <ApplicantCard
                  key={applicant._id}
                  applicant={applicant}
                  onStatusUpdate={handleStatusUpdate}
                  isExpanded={expandedApplicant === applicant._id}
                  onToggle={toggleApplicantDetails}
                />
              ))
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <FiUser className="w-12 h-12 mx-auto text-gray-400" />
                <h3 className="mt-3 text-base font-medium text-gray-900">
                  No applicants found
                </h3>
                <p className="mt-1 text-gray-600 text-sm">
                  Try adjusting your filters
                </p>
                <button
                  className="mt-3 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {pagination.totalPages > 1 && (
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-700">
                Showing page {currentPage} of {pagination.totalPages}
              </div>

              {paginationError && (
                <div className="text-red-600 text-sm">{paginationError}</div>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || isPageChanging}
                  className={`px-3 py-1.5 rounded-md ${
                    currentPage === 1 || isPageChanging
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: Math.min(5, pagination.totalPages) },
                    (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          disabled={isPageChanging}
                          className={`w-8 h-8 rounded-md text-sm ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    currentPage === pagination.totalPages || isPageChanging
                  }
                  className={`px-3 py-1.5 rounded-md ${
                    currentPage === pagination.totalPages || isPageChanging
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
