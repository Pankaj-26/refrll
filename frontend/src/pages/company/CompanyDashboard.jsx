import { useEffect, useState, useMemo } from "react";
import {
  FiBriefcase,
  FiUsers,
  FiSearch,
  FiDollarSign,
  FiBarChart,
  FiPlus,
  FiChevronRight,
  FiCalendar,
  FiMapPin,
  FiCheckCircle,
  FiTrendingUp,
  FiAlertCircle,
  FiEdit,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { fetchJobsWithApplicants } from "../../features/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";

export default function CompanyDashboard() {
  const {
    jobs,
    loading,
    error,
    totalJobs: reduxTotalJobs,
    totalPages,
    currentPage,
    limit,
  } = useSelector((state) => state.jobs);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplicants: 0,
    avgApplicants: 0,
    closedJobs: 0,
  });

  const [chartType, setChartType] = useState("bar");
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    sort: "-createdAt",
  });
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    dispatch(
      fetchJobsWithApplicants({
        page: 1,
        limit: 10,
        ...filters,
      })
    );
    setAppLoading(false);
  }, [dispatch, filters]);

  // Stats calculation - FIXED to use applicantCount
  useEffect(() => {
    if (jobs.length > 0) {
      const totalApplicants = jobs.reduce(
        (acc, job) => acc + (job.applicantCount || 0),
        0
      );

      const closedJobs = jobs.filter((job) => job.status === "Closed").length;

      setStats({
        totalJobs: reduxTotalJobs, // Use reduxTotalJobs here
        totalApplicants,
        avgApplicants: Math.round(totalApplicants / jobs.length) || 0,
        closedJobs,
      });
    } else {
      // Reset stats when no jobs
      setStats({
        totalJobs: reduxTotalJobs,
        totalApplicants: 0,
        avgApplicants: 0,
        closedJobs: 0,
      });
    }
  }, [jobs, reduxTotalJobs]);

  // Handle page change
  const handlePageChange = (newPage) => {
    dispatch(
      fetchJobsWithApplicants({
        page: newPage,
        limit,
        ...filters,
      })
    );
  };

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Memoized chart data - FIXED to use applicantCount
  const chartData = useMemo(() => {
    const chartJobs = jobs.slice(0, 5);

    return {
      options: {
        chart: {
          toolbar: {
            show: true,
            tools: { download: true, selection: true, zoom: true },
          },
          animations: { enabled: true },
          events: {
            dataPointSelection: (event, chartContext, config) => {
              const jobIndex = config.dataPointIndex;
              if (chartJobs[jobIndex]) {
                navigate(`/job/${chartJobs[jobIndex]._id}/applicants`);
              }
            },
          },
        },
        colors: ["#3b82f6"],
        plotOptions: {
          bar: {
            borderRadius: 6,
            horizontal: chartType !== "bar",
            columnWidth: "60%",
            dataLabels: { position: "top" },
          },
          pie: {
            donut: {
              labels: {
                show: true,
                name: { show: true, fontSize: "16px", fontWeight: 600 },
                value: { show: true, fontSize: "20px", fontWeight: 700 },
                total: {
                  show: true,
                  label: "Total Applicants",
                  formatter: () =>
                    chartJobs.reduce(
                      (acc, job) => acc + (job.applicantCount || 0),
                      0
                    ),
                },
              },
            },
          },
        },
        dataLabels: {
          enabled: chartType !== "pie",
          style: { fontSize: "12px", fontWeight: 600 },
        },
        xaxis: {
          categories: chartJobs.map(
            (job) =>
              job.title.substring(0, 12) + (job.title.length > 12 ? "..." : "")
          ),
        },
        tooltip: {
          y: {
            formatter: (val) => `${val} applicants`,
            title: { formatter: () => "Applicants:" },
          },
        },
        // ... other chart options
      },
      barSeries: [
        {
          name: "Applicants",
          data: chartJobs.map((job) => job.applicantCount || 0),
        },
      ],
      pieSeries: chartJobs.map((job) => job.applicantCount || 0),
    };
  }, [jobs, chartType, navigate]);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusColors = {
      Open: "bg-green-100 text-green-800",
      Closed: "bg-red-100 text-red-800",
      Paused: "bg-amber-100 text-amber-800",
    };

    return (
      <span
        className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
          statusColors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  if (appLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm">
  //         <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto">
  //           <FiAlertCircle size={24} />
  //         </div>
  //         <h3 className="text-xl font-bold text-gray-800 mt-4">Error Loading Data</h3>
  //         <p className="text-gray-600 mt-2">{error}</p>
  //         <button
  //           onClick={() => dispatch(fetchJobsWithApplicants({
  //             page: 1,
  //             limit: 10,
  //             ...filters
  //           }))}
  //           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
  //         >
  //           Try Again
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Company Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your job postings and track applications
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button
              onClick={() => navigate("/post-job/:jobId/edit")}
              className="flex-shrink-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-md hover:shadow-lg"
            >
              <FiPlus size={18} />
              Post New Job
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Paused">Paused</option>
          </select>

          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="-applicantCount">Most Applicants</option>
            <option value="applicantCount">Fewest Applicants</option>
          </select>

          <select
            value={limit}
            onChange={(e) =>
              dispatch(
                fetchJobsWithApplicants({
                  page: 1,
                  limit: Number(e.target.value),
                  ...filters,
                })
              )
            }
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </select>
        </div>

        {/* Stats Grid - FIXED data sources */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            {
              title: "Total Jobs",
              value: reduxTotalJobs, // Use reduxTotalJobs directly
              icon: <FiBriefcase className="w-6 h-6 text-blue-600" />,
              bg: "bg-blue-100",
              trend: "",
            },
            {
              title: "Total Applicants",
              value: stats.totalApplicants,
              icon: <FiUsers className="w-6 h-6 text-green-600" />,
              bg: "bg-green-100",
              trend: "",
            },
            {
              title: "Avg. per Job",
              value: stats.avgApplicants,
              icon: <FiBarChart className="w-6 h-6 text-purple-600" />,
              bg: "bg-purple-100",
              trend: "",
            },
            {
              title: "Closed Positions",
              value: stats.closedJobs,
              icon: <FiCheckCircle className="w-6 h-6 text-amber-600" />,
              bg: "bg-amber-100",
              trend: "",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 ${stat.bg} rounded-xl`}>{stat.icon}</div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
              {stat.trend && (
                <div className="mt-3 flex items-center text-sm text-blue-600 font-medium">
                  <FiTrendingUp className="mr-1" />
                  <span>{stat.trend}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Jobs Table */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Active Job Listings
              </h2>
              <span className="text-sm text-gray-500">
                {reduxTotalJobs} total jobs
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applications
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Edit Job
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr
                      key={job._id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-5 py-4">
                        <div className="font-medium text-gray-900">
                          {job.title}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <FiMapPin className="mr-1.5" size={14} />
                          <span>{job.location}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-medium
                            ${
                              (job.applicantCount || 0) > 10
                                ? "bg-green-100 text-green-800"
                                : (job.applicantCount || 0) > 5
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {job.applicantCount || 0}
                          </div>
                          <span className="ml-2 text-gray-600">applicants</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={job.status} />
                      </td>
                      <td className="px-5 py-4">
                        <div
                          onClick={() => navigate(`/post-job/${job._id}/edit`)}
                          
                        >
                          <FiEdit className="text-black text-sm" />
                         
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <FiChevronRight
                          className="text-gray-400"
                          onClick={() => navigate(`/job/${job._id}/applicants`)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination - FIXED conditional rendering */}
            {totalPages > 1 && (
              <div className="px-5 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                  Showing{" "}
                  {Math.min((currentPage - 1) * limit + 1, reduxTotalJobs)} -{" "}
                  {Math.min(currentPage * limit, reduxTotalJobs)} of{" "}
                  {reduxTotalJobs} jobs
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    Previous
                  </button>

                  <div className="flex gap-1">
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
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <span className="px-2 py-2">...</span>
                    )}

                    {totalPages > 5 && currentPage < totalPages - 1 && (
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          currentPage === totalPages
                            ? "bg-blue-600 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {totalPages}
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Empty state */}
            {!loading && jobs.length === 0 && (
              <div className="text-center py-12">
                <FiBriefcase className="w-12 h-12 text-gray-400 mx-auto" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No jobs found
                </h3>
                <p className="mt-1 text-gray-500">
                  {filters.search
                    ? "Try different search terms"
                    : "Get started by posting your first job"}
                </p>
                <button
                  onClick={() => navigate("/post-job")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post a Job
                </button>
              </div>
            )}
          </div>

          {/* Analytics Section */}
          <div className="space-y-6">
            {/* Chart Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Applications Analytics
                </h2>
                <div className="flex gap-1">
                  <button
                    onClick={() => setChartType("bar")}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      chartType === "bar"
                        ? "bg-blue-100 text-blue-800 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Bar
                  </button>
                  <button
                    onClick={() => setChartType("horizontalBar")}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      chartType === "horizontalBar"
                        ? "bg-blue-100 text-blue-800 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Horizontal
                  </button>
                  <button
                    onClick={() => setChartType("pie")}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      chartType === "pie"
                        ? "bg-blue-100 text-blue-800 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Pie
                  </button>
                </div>
              </div>

              {jobs.length > 0 ? (
                <div className="h-80">
                  {chartType === "pie" ? (
                    <Chart
                      options={chartData.options}
                      series={chartData.pieSeries}
                      type="donut"
                      height="100%"
                    />
                  ) : (
                    <Chart
                      options={{
                        ...chartData.options,
                        chart: {
                          ...chartData.options.chart,
                          type: chartType === "horizontalBar" ? "bar" : "bar",
                        },
                        plotOptions: {
                          bar: {
                            ...chartData.options.plotOptions.bar,
                            horizontal: chartType === "horizontalBar",
                          },
                        },
                      }}
                      series={chartData.barSeries}
                      type="bar"
                      height="100%"
                    />
                  )}
                </div>
              ) : (
                <div className="h-80 flex flex-col items-center justify-center text-gray-400">
                  <FiBarChart className="w-12 h-12" />
                  <p className="mt-3">No data to display</p>
                </div>
              )}

              <div className="mt-4 text-center text-sm text-gray-500">
                Click on bars to view job details
              </div>
            </div>

            {/* Recent Activity - FIXED applicantCount */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h2>

              <div className="space-y-4">
                {jobs.slice(0, 3).map((job) => (
                  <div
                    key={job._id}
                    className="flex items-start p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                    onClick={() => navigate(`/job/${job._id}/applicants`)}
                  >
                    <div className="mr-3 mt-1">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <FiBriefcase className="text-green-600" size={16} />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{job.title}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {job.applicantCount || 0} applicants
                      </p>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <FiCalendar className="mr-1" size={12} />
                        <span>
                          {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {jobs.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No recent activity
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
