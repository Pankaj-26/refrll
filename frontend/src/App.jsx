import { useEffect, useState } from "react";
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
import { fetchUser, refreshAccessToken } from "./features/auth/authSlice.js";
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
import Footer from "./components/Footer.jsx";
import AboutPage from "./pages/Aboutpage.jsx";
import ContactPage from "./pages/Contactpage.jsx";
import PrivacyPolicy from "./pages/PrivacyPage.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import HelpCenter from "./pages/HelpCenter.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import NotificationCenter from "./components/NotificationCenter.jsx";
import ReferralProgramPage from "./pages/ReferralProgramPage.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import CompanyJobPosts from "./pages/admin/CompanyJobPosts.jsx";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  // Fetch user and setup theme on mount
  // useEffect(() => {
  //   dispatch(fetchUser());
  // }, [dispatch]);

  useEffect(() => {
    // Initialize theme
    dispatch(updateSystemTheme());

    // // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => dispatch(updateSystemTheme());

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [mode]);

  useEffect(() => {
    const checkAndRefresh = async () => {
      try {
        await refreshAccessToken();
      } catch (err) {
        console.log("Refresh failed");
      } finally {
        setLoading(false);
      }
    };

    checkAndRefresh();
  }, []);

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen ">
      <ThemeInitializer />
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pt-14">
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
          <Route
            path="/notification"
            element={
              <ProtectedRoute allowedRoles={["seeker", "referrer", "company"]}>
                <NotificationCenter />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/ReferralProgramPage"
            element={<ReferralProgramPage />}
          />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/companyJobPost" element={<CompanyJobPosts />} />
          
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
