
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobsWithApplicantsForReferrer,
  updateApplicationStatus,
  optimisticStatusUpdate,
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
  FiSearch,
} from "react-icons/fi";
import ReferrerStatusBadge from "../components/ReferrerStatusbadge";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import toast from "react-hot-toast";
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
    // Filter by job status
    if (statusFilter !== "all" && job.status !== statusFilter) return false;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchesJob =
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term);

      const matchesApplicant = job.applicants?.some(
        (applicant) =>
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
    rejected: "red",
  };

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
            <div className="text-2xl font-bold text-gray-900">
              {jobs.length}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="text-gray-500 text-sm mb-1">Open Jobs</div>
            <div className="text-2xl font-bold text-green-600">
              {jobs.filter((job) => job.status === "Open").length}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="text-gray-500 text-sm mb-1">Total Applicants</div>
            <div className="text-2xl font-bold text-blue-600">
              {jobs.reduce(
                (total, job) => total + (job.applicants?.length || 0),
                0
              )}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="text-gray-500 text-sm mb-1">Avg. per Job</div>
            <div className="text-2xl font-bold text-purple-600">
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
                      {job?.applicants?.length || 0}/
                      {job?.applicationLimit || "∞"}
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
