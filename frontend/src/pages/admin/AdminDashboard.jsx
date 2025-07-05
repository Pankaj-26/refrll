// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiBriefcase,
  FiDollarSign,
  FiPieChart,
  FiBarChart2,
  FiUserCheck,
  FiUserX,
  FiRefreshCw,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiUser,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminStats } from "../../features/admin/adminSlice";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              <StatCard
                title="Total Users"
                value={stats.totalUsers}
                icon={<FiUsers className="w-6 h-6" />}
                color="blue"
                change={14}
              />
              <StatCard
                title="Active Jobs"
                value={stats.totalJobs}
                icon={<FiBriefcase className="w-6 h-6" />}
                color="green"
                change={8}
              />
              {/* <StatCard 
                title="Revenue" 
                value={`$${stats.revenue.toLocaleString()}`} 
                icon={<FiDollarSign className="w-6 h-6" />}
                color="purple"
                change={10}
              /> */}
              <StatCard
                title="Total Companies"
                value={stats.totalCompanies}
                icon={<FiUserCheck className="w-6 h-6" />}
                color="amber"
                change={18}
              />
              <StatCard
                title="Total Applications"
                value={stats.totalApplications}
                icon={<FiRefreshCw className="w-6 h-6" />}
                color="teal"
                change={-2}
              />
              <StatCard
                title="Total Referrers"
                value={stats.totalReferrers}
                icon={<FiUserX className="w-6 h-6" />}
                color="red"
                change={5}
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Users
                </h3>
                <Link
                  to="/admin/users"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  View All
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {stats.latestUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-750"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-8 h-8 flex items-center justify-center mr-3">
                              <FiUser className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {user.roles?.seeker && "Seeker"}
                          {user.roles?.referrer && "Referrer"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === "active"
                                ? "bg-green-100 text-green-800"
                                : user.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {/* {user.status} */}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(user.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "users":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            Users Management
          </div>
        );
      case "jobs":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            Jobs Management
          </div>
        );
      case "analytics":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            Analytics
          </div>
        );
      case "settings":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            Settings
          </div>
        );
      default:
        return <div>Dashboard</div>;
    }
  };

  return (
    <>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Mobile sidebar */}
        <div
          className={`fixed inset-0 z-40 lg:hidden ${
            sidebarOpen ? "block" : "hidden"
          }`}
        >
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative flex-1 flex flex-col w-64 bg-gray-800 dark:bg-gray-900">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <FiX className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64 bg-gray-800 dark:bg-gray-900">
            <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top bar */}
          <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="mr-3 text-gray-500 lg:hidden focus:outline-none"
                >
                  <FiMenu className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                  {activeTab === "dashboard" ? "Admin Dashboard" : activeTab}
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none">
                  <FiRefreshCw className="h-5 w-5" />
                </button>

                <div className="relative">
                  <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-full w-10 h-10 flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <FiLogOut className="mr-1" /> Logout
                </button>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              renderContent()
            )}
          </main>
        </div>
      </div>
    </>
  );
};

// Reusable StatCard component
const StatCard = ({ title, value, icon, color, change }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    purple: "bg-purple-100 text-purple-800",
    amber: "bg-amber-100 text-amber-800",
    teal: "bg-teal-100 text-teal-800",
    red: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border-2 border-blue-500 ">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </h3>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>
      </div>
      {change && (
        <p
          className={`mt-2 flex items-center text-sm ${
            change > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {change > 0 ? (
            <span className="inline-flex items-center">
              <svg
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
              {change}%
            </span>
          ) : (
            <span className="inline-flex items-center">
              <svg
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              {Math.abs(change)}%
            </span>
          )}
          <span className="ml-1">from last week</span>
        </p>
      )}
    </div>
  );
};

// Sidebar content component
const SidebarContent = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <FiBarChart2 /> },
    { id: "users", label: "Users", icon: <FiUsers /> },
    { id: "jobs", label: "Jobs", icon: <FiBriefcase /> },
    { id: "analytics", label: "Analytics", icon: <FiPieChart /> },
    { id: "settings", label: "Settings", icon: <FiSettings /> },
  ];

  const handleChangeTab = (id) => {
    setActiveTab(id);

    if (id === "jobs") {
      navigate("/companyJobPost");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-16 px-4 bg-gray-900 dark:bg-gray-950">
        <div className="flex items-center">
          <div className="bg-blue-500 rounded-lg p-1 mr-3">
            <FiBriefcase className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">JobPortal Admin</span>
        </div>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleChangeTab(item.id)}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors w-full text-left ${
              activeTab === item.id
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-750"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-gray-700 dark:bg-gray-800 rounded-lg p-4">
          <div className="text-center">
            <div className="bg-gray-600 dark:bg-gray-700 border-2 border-dashed rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <FiUser className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-sm font-medium text-white">Admin User</h4>
            <p className="text-xs text-gray-400 mt-1">admin@jobportal.com</p>
            <button
              className="mt-3 w-full py-2 px-4 bg-gray-600 hover:bg-gray-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center"
              onClick={() => setActiveTab("settings")}
            >
              <FiSettings className="mr-2" /> Account Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
