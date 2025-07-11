import { FiUser, FiEdit, FiSave, FiMail, FiPhone, FiLinkedin, FiGithub, FiMapPin, FiBriefcase, FiTool,FiFile } from "react-icons/fi";



const ContactInfoItem = ({ icon, label, value, editable, name, onChange }) => (
  <div className="flex flex-col mb-4">
    <label className="flex items-center gap-2 mb-1 text-gray-600 dark:text-gray-300">
      {icon}
      <span>{label}</span>
    </label>

    {editable ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-gray-900 dark:text-white"
      />
    ) : (
      <>
        {label === "LinkedIn" || label === "GitHub" ? (
          value ? (
            <a
              href={value.startsWith("http") ? value : `https://${value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline break-words"
            >
              {value}
            </a>
          ) : (
            <p className="text-gray-900 dark:text-white font-medium">Not provided</p>
          )
        ) : (
          <p className="text-gray-900 dark:text-white font-medium">{value || "Not provided"}</p>
        )}
      </>
    )}
  </div>
);


export const ProfileCard = ({ profile, isEditing, onEdit, onSave, onCancel, onChange }) => {


   const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      
        onChange({ 
          target: { 
            name: e.target.name, 
            value: file 
          } 
        });
     
    }
  };
  
  
  
  return(
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
    <div className="flex items-start gap-5 mb-6">
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-1 rounded-full">
          <div className="bg-white dark:bg-gray-800 rounded-full p-1">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
              <FiUser className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border-2 border-white dark:border-gray-800">
          <div className="bg-white rounded-full p-1"></div>
        </div>
      </div>
      <div className="flex-1">
        {isEditing ? (
          <>
            <ContactInfoItem
              icon={<FiUser className="text-blue-500" />}
              label="Full Name"
              value={profile.fullName}
              editable={true}
              name="fullName"
              onChange={onChange}
            />
            <ContactInfoItem
              icon={<FiBriefcase className="text-blue-500" />}
              label="Title"
              value={profile.designation}
              editable={true}
              name="designation"
              onChange={onChange}
            />
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {profile.fullName}
            </h2>
            <p className="text-blue-500 font-medium mb-3">
              {profile.designation}
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800/50">
                <FiMapPin className="text-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {profile.location}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800/50">
                <FiBriefcase className="text-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {profile.status}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <ContactInfoItem
        icon={<FiMail className="text-blue-500" />}
        label="Email"
        value={profile.email}
        editable={isEditing}
        name="email"
        onChange={onChange}
      />
      <ContactInfoItem
        icon={<FiPhone className="text-blue-500" />}
        label="Phone"
        value={profile.phone}
        editable={isEditing}
        name="phone"
        onChange={onChange}
      />
      <ContactInfoItem
        icon={<FiLinkedin className="text-blue-500" />}
        label="LinkedIn"
        value={profile.linkedIn}
        editable={isEditing}
        name="linkedIn"
        onChange={onChange}
      />
      <ContactInfoItem
        icon={<FiGithub className="text-blue-500" />}
        label="GitHub"
        value={profile.github}
        editable={isEditing}
        name="github"
        onChange={onChange}
      />
      <ContactInfoItem
        icon={<FiBriefcase className="text-blue-500" />}
        label="Company"
        value={profile.company}
        editable={isEditing}
        name="company"
        onChange={onChange}
      />
      <ContactInfoItem
        icon={<FiMapPin className="text-blue-500" />}
        label="Location"
        value={profile.location}
        editable={isEditing}
        name="location"
        onChange={onChange}
      />
      <ContactInfoItem
        icon={<FiTool className="text-blue-500" />}
        label="Experience"
        value={profile.experience}
        editable={isEditing}
        name="experience"
        onChange={onChange}
      />


<div className="mt-6">
        {!isEditing ? (
          profile.resume ? (
            <a 
              href={profile.resume} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg transition-colors"
            >
              <FiFile className="text-blue-500" />
              View Resume
            </a>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No resume uploaded</p>
          )
        ) : (
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-400 mb-2">
              Resume Upload
            </label>
            <div className="flex items-center gap-3">
              <label className="flex-1 cursor-pointer">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white flex items-center justify-between">
                  <span className="truncate max-w-[70%]">
                    {profile.resume ? "Change Resume" : "Select Resume"}
                  </span>
                  <FiFile className="text-blue-500" />
                </div>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {profile.resume && (
                <a 
                  href={profile.resume} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-3 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg"
                  title="View current resume"
                >
                  <FiFile className="text-green-500" />
                </a>
              )}
            </div>
            {profile.resume && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Upload new file to replace existing resume
              </p>
            )}
          </div>
        )}
    </div>

    </div>

    <div className="flex gap-3">
      {isEditing ? (
        <>
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all"
          >
            <FiSave className="text-white" />
            Save Profile
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-all"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all"
        >
          <FiEdit className="text-white" />
          Edit Profile
        </button>
      )}
    </div>
  </div>
);
}


export default ProfileCard







