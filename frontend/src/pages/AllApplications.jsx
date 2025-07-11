

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