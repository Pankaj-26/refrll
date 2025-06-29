


import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiBookmark, FiTool, FiSearch } from "react-icons/fi";
import { updateProfile, fetchProfile } from "../features/profileSlice";
import { fetchSeekerApplications } from "../features/applicantSlice";
import ProfileCard from "../components/dashboard/SeekerComponents/ProfileCard";

import ResumeStrength from '../components/dashboard/SeekerComponents/ResumeStrength';
import ApplicationCard from '../components/dashboard/SeekerComponents/ApplicationCard';


export default function SeekerDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state
  const { profile, loading: profileLoading } = useSelector((state) => state.profile);
  const { data: applications, loading: applicationsLoading } = useSelector((state) => state.applicants);
  
  // Local state
  const [isEditing, setIsEditing] = useState(false);
  const [localProfile, setLocalProfile] = useState({});
  
  // Initialize local profile
  useEffect(() => {
    if (profile && !isEditing) {
      setLocalProfile({
        fullName: profile.fullName || "",
        designation: profile.designation || "",
        location: profile.location || "",
        experience: profile.experience || "",
        status: profile.status || "Open to work",
        email: profile.email || "",
        phone: profile.phone || "",
        linkedIn: profile.linkedIn || "",
        github: profile.github || "",
        skills: profile.skills || [],
        company: profile.company || "",
        resume: profile.resume || null,
      });
    }
  }, [profile, isEditing]);

  

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchSeekerApplications());
  }, [dispatch]);

  // Calculate resume progress
  const resumeProgress = useMemo(() => {
    if (!profile) return 0;
    
    const fieldsToCheck = [
      "fullName", "designation", "experience", "skills", 
      "email", "resume", "company", "location"
    ];
    
    const completedFields = fieldsToCheck.reduce((count, field) => {
      if (profile[field]) {
        if (field === "skills" && profile.skills.length >= 3) return count + 1;
        if (field !== "skills") return count + 1;
      }
      return count;
    }, 0);
    
    return Math.round((completedFields / fieldsToCheck.length) * 100);
  }, [profile]);

  // Event handlers
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setLocalProfile(prev => ({
      ...prev,
      [name]: name === "skills" ? value.split(",").map(skill => skill.trim()) : value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(localProfile)).unwrap();
      setIsEditing(false);
      dispatch(fetchProfile());
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }, [dispatch, localProfile]);

  const handleViewApplication = useCallback((job) => {
    navigate(`/application/${job._id}`);
  }, [navigate]);

  // Loading states
  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
  
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
                  {profile?.fullName?.split(" ")[0] || "User"}!
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Here's your job search dashboard
              </p>
            </div>
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
              onClick={() => navigate("/job/postings")}
            >
              <FiSearch className="text-white" />
              Browse Jobs
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <ProfileCard 
              profile={localProfile}
              isEditing={isEditing}
              onEdit={() => setIsEditing(true)}
              onSave={handleSubmit}
              onCancel={() => setIsEditing(false)}
              onChange={handleInputChange}
            />
            
            {/* Skills Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FiTool className="text-blue-500" />
                  Your Skills
                </h2>
                {!isEditing && (
                  <button 
                    className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Skills
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <div className="mb-6">
                  <label className="block text-gray-600 dark:text-gray-400 mb-2">
                    Add skills separated by commas
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={localProfile.skills.join(", ")}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
                    placeholder="React, Node.js, JavaScript"
                  />
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile?.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {(!profile?.skills || profile.skills.length === 0) && (
                    <p className="text-gray-500 dark:text-gray-400">
                      No skills added yet. Add skills to improve your job matches.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ResumeStrength 
              progress={resumeProgress} 
              profile={profile} 
              onImprove={() => setIsEditing(true)} 
            />
            
            {/* Stats Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Application Stats
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/50">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {applications.length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Applications
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800/50">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {applications.filter(app => app.applicationStatus === 'interview').length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Interviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FiBookmark className="text-indigo-500" />
              Your Application Status
            </h2>
            <button
              className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              onClick={() => navigate("/job/applications")}
            >
              View All Applications
            </button>
          </div>

          {applications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {applications.slice(0, 6).map((job) => (
                <ApplicationCard 
                  key={job._id} 
                  job={job} 
                  onClick={handleViewApplication}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FiBookmark className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {applicationsLoading ? "Loading applications..." : "No Active Applications"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-4">
                {applicationsLoading 
                  ? "Fetching your job applications..." 
                  : "You haven't applied to any jobs yet. Start your job search to apply to positions."}
              </p>
              {!applicationsLoading && (
                <button
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                  onClick={() => navigate("/job/postings")}
                >
                  Browse Jobs
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}