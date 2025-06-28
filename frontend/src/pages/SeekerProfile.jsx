


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeekerProfile, updateSeekerProfile } from "../features/profileSlice";
import {
  FiUser,
  FiBriefcase,
  FiTool,
  FiFile,
  FiHome,
  FiLinkedin,
  FiGithub,
  FiEdit,
  FiSave,
  FiExternalLink
} from "react-icons/fi";

const SeekerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    experience: "",
    skills: [],
    resume: null,
    company: "",
    linkedin: "",
    github: "",
  });
  
  const dispatch = useDispatch();
  const { seeker, loading } = useSelector((state) => state.profile);

    const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: name === "skills" ? value.split(",").map((s) => s.trim()) : value,
    }));
  };

  const handleFileChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
await dispatch(updateSeekerProfile(profileData));
setIsEditing(false);


  };


  useEffect(() => {
  dispatch(fetchSeekerProfile());
}, [dispatch]);

useEffect(() => {
  if (seeker) {
    setProfileData({
      name: seeker.fullName || "",
      experience: seeker.experience || "",
      skills: seeker.skills || [],
      resume: null,
      company: seeker.company || "",
      linkedin: seeker.linkedin || "",
      github: seeker.github || "",
    });
  }
}, [seeker]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Professional Profile
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
                isEditing 
                  ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-teal-600 hover:to-green-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              {isEditing ? <FiSave className="w-5 h-5" /> : <FiEdit className="w-5 h-5" />}
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "name", label: "Full Name", icon: <FiUser /> },
                { name: "experience", label: "Experience", icon: <FiBriefcase /> },
                { 
                  name: "skills", 
                  label: "Skills", 
                  icon: <FiTool />,
                  note: "Separate with commas"
                },
                { name: "company", label: "Current Company", icon: <FiHome /> },
                { name: "linkedin", label: "LinkedIn Profile", icon: <FiLinkedin /> },
                { name: "github", label: "GitHub Profile", icon: <FiGithub /> },
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-400">
                    {field.icon}
                    <span className="font-medium">{field.label}</span>
                  </label>
                  <input
                    name={field.name}
                    value={field.name === 'skills' ? profileData.skills.join(', ') : profileData[field.name]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
                    placeholder={field.note || `Enter ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-400">
                  <FiFile />
                  <span className="font-medium">Resume</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="w-full opacity-0 absolute cursor-pointer"
                  />
                  <div className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-gray-400">
                    {profileData.resume?.name || "Choose file..."}
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileField 
                icon={<FiUser className="w-5 h-5 text-blue-400" />} 
                label="Name" 
                value={profileData.name} 
              />
              <ProfileField 
                icon={<FiBriefcase className="w-5 h-5 text-purple-400" />} 
                label="Experience" 
                value={profileData.experience} 
              />
              <ProfileField 
                icon={<FiTool className="w-5 h-5 text-green-400" />} 
                label="Skills" 
                value={profileData.skills} 
                isTags
              />
              <ProfileField 
                icon={<FiHome className="w-5 h-5 text-yellow-400" />} 
                label="Company" 
                value={profileData.company} 
              />
              <SocialField 
                icon={<FiLinkedin className="w-5 h-5 text-blue-400" />} 
                label="LinkedIn" 
                value={profileData.linkedin} 
              />
              <SocialField 
                icon={<FiGithub className="w-5 h-5 text-gray-300" />} 
                label="GitHub" 
                value={profileData.github} 
              />
              <ProfileField 
                icon={<FiFile className="w-5 h-5 text-teal-400" />} 
                label="Resume" 
                value={profileData.resume?.name} 
                isFile
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ icon, label, value, isTags, isFile }) => (
  <div className="space-y-2 p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
    <div className="flex items-center gap-3 text-gray-400">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    <div className="ml-8">
      {isTags ? (
        <div className="flex flex-wrap gap-2">
          {value.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-gray-600/40 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      ) : isFile ? (
        <div className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
          <FiExternalLink />
          {value || "No resume uploaded"}
        </div>
      ) : (
        <p className="text-gray-200">{value || "Not specified"}</p>
      )}
    </div>
  </div>
);

const SocialField = ({ icon, label, value }) => (
  <div className="space-y-2 p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
    <div className="flex items-center gap-3 text-gray-400">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    <div className="ml-8">
      {value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <FiExternalLink />
          View Profile
        </a>
      ) : (
        <p className="text-gray-400">Not provided</p>
      )}
    </div>
  </div>
);

export default SeekerProfile;