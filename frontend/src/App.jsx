import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import SeekerDashboard from "./pages/SeekerDashboard";
import ReferrerDashboard from "./pages/ReferrerDashboard";
import PostJob from "./pages/PostJob.jsx";
import CompanyProfile from "./pages/company/CompanyProfile.jsx";
import CompanyDashboard from "./pages/company/CompanyDashboard.jsx";
import JobPostings from "./pages/JobPostings.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { fetchUser } from "./features/auth/authSlice.js";
import JobApplicants from "./pages/company/JobApplicants.jsx";
import AllApplications from "./pages/AllApplications.jsx";
import ApplicationDetails from "./pages/ApplicationDetails.jsx";
import { updateSystemTheme } from "./features/theme/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import ThemeInitializer from "./components/ThemeInitializer.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import { useLocation } from "react-router-dom";
import api from "./api.js";
import axios from "axios";
import Unauthorized from "./pages/Unauthorized.jsx";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);
  const { user, loading } = useSelector((state) => state.auth);

  // Fetch user and setup theme on mount
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    // Initialize theme
    dispatch(updateSystemTheme());

    // // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => dispatch(updateSystemTheme());

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [mode]);

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <ThemeInitializer />
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <div className="">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["seeker"]}>
                <SeekerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/referrer"
            element={
              <ProtectedRoute allowedRoles={["referrer"]}>
                <ReferrerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/post-job"
            element={
              <ProtectedRoute allowedRoles={["referrer", "company"]}>
                <PostJob />
              </ProtectedRoute>
            }
          />

          <Route
            path="/company-profile"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <CompanyProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/company"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <CompanyDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/job/postings"
            element={
              <ProtectedRoute allowedRoles={["seeker", "referrer"]}>
                <JobPostings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/job/:jobId/applicants"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <JobApplicants />
              </ProtectedRoute>
            }
          />

          <Route
            path="/job/applications"
            element={
              <ProtectedRoute allowedRoles={["referrer", "seeker"]}>
                <AllApplications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/application/:id"
            element={
              <ProtectedRoute allowedRoles={["seeker", "referrer", "company"]}>
                <ApplicationDetails />
              </ProtectedRoute>
            }
          />

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
