

// import {
//   FiMapPin,
//   FiGlobe,
//   FiUsers,
//   FiCalendar,
//   FiBriefcase,
//   FiMessageSquare,
//   FiPlus,
//   FiEdit,
//   FiSave,
// } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import { updateCompanyProfile } from "../../features/companySlice"; // your thunk action

// export default function CompanyProfile() {
//   const dispatch = useDispatch();
//   const { company } = useSelector((state) => state.company);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState(company);
//   const [bannerPreview, setBannerPreview] = useState(company.bannerUrl);
//   const [logoPreview, setLogoPreview] = useState(company.logoUrl);

//   const handleBannerChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setBannerPreview(URL.createObjectURL(file));
//       setFormData((prev) => ({ ...prev, bannerFile: file }));
//     }
//   };

//   const handleLogoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setLogoPreview(URL.createObjectURL(file));
//       setFormData((prev) => ({ ...prev, logoFile: file }));
//     }
//   };

//   const handleChange = (field) => (e) => {
//     setFormData({ ...formData, [field]: e.target.value });
//   };

//   const handleSave = () => {
//     dispatch(updateCompanyProfile(formData)); // This would hit backend if connected
//     setEditMode(false);
//   };

//   if (!company) {
//     return (
//       <div className="text-white p-4">
//         Company profile not found. Please make sure it’s loaded from Redux or
//         API.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Banner */}
//         <div className="relative h-48 bg-gray-800 rounded-t-2xl overflow-hidden">
//           <img
//             src={bannerPreview}
//             alt="Company Banner"
//             className="w-full h-full object-cover opacity-75"
//           />
//           {editMode && (
//             <>
//               <input
//                 type="file"
//                 id="bannerUpload"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleBannerChange}
//               />
//               <label
//                 htmlFor="bannerUpload"
//                 className="absolute top-2 right-2 bg-white text-black px-3 py-1 text-sm rounded cursor-pointer"
//               >
//                 Change Banner
//               </label>
//             </>
//           )}

//           <div className="absolute -bottom-16 left-8 border-4 border-gray-900 rounded-2xl overflow-hidden w-32 h-32 bg-gray-900 shadow-xl">
//             <img
//               src={logoPreview}
//               alt="Company Logo"
//               className="w-full h-full object-cover"
//             />
//             {editMode && (
//               <>
//                 <input
//                   type="file"
//                   id="logoUpload"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleLogoChange}
//                 />
//                 <label
//                   htmlFor="logoUpload"
//                   className="absolute bottom-2 right-2 bg-white text-black px-2 py-1 text-xs rounded cursor-pointer"
//                 >
//                   Change Logo
//                 </label>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Profile Content */}
//         <div className="bg-gray-800 rounded-b-2xl border border-gray-700 shadow-xl">
//           <div className="pt-20 px-8 pb-8">
//             {/* Edit/Save Buttons */}
//             <div className="flex justify-end mb-4">
//               {editMode ? (
//                 <button
//                   className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
//                   onClick={handleSave}
//                 >
//                   <FiSave /> Save
//                 </button>
//               ) : (
//                 <button
//                   className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded"
//                   onClick={() => setEditMode(true)}
//                 >
//                   <FiEdit /> Edit
//                 </button>
//               )}
//             </div>

//             {/* Name & Tagline */}
//             <div className="mb-6">
//               {editMode ? (
//                 <>
//                   <input
//                     type="text"
//                     value={formData.name}
//                     onChange={handleChange("name")}
//                     className="text-3xl font-bold text-white bg-transparent border-b border-gray-600 focus:outline-none mb-2 w-full"
//                   />
//                   <input
//                     type="text"
//                     value={formData.tagline}
//                     onChange={handleChange("tagline")}
//                     className="text-teal-400 italic bg-transparent border-b border-gray-600 focus:outline-none w-full"
//                   />
//                 </>
//               ) : (
//                 <>
//                   <h1 className="text-3xl font-bold text-gray-100">
//                     {formData.name}
//                   </h1>
//                   <p className="text-teal-400 italic mt-2">
//                     {formData.tagline}
//                   </p>
//                 </>
//               )}
//             </div>

//             {/* Info Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//               {/* Location */}
//               <InfoCard
//                 icon={<FiMapPin className="w-6 h-6 text-blue-400" />}
//                 label="Location"
//                 value={formData.location}
//                 editMode={editMode}
//                 onChange={handleChange("location")}
//               />
//               {/* Website */}
//               <InfoCard
//                 icon={<FiGlobe className="w-6 h-6 text-green-400" />}
//                 label="Website"
//                 value={formData.website}
//                 editMode={editMode}
//                 onChange={handleChange("website")}
//               />
//               {/* Company Size */}
//               <InfoCard
//                 icon={<FiUsers className="w-6 h-6 text-purple-400" />}
//                 label="Company Size"
//                 value={formData.companySize}
//                 editMode={editMode}
//                 onChange={handleChange("companySize")}
//               />
//               {/* Founded */}
//               <InfoCard
//                 icon={<FiCalendar className="w-6 h-6 text-orange-400" />}
//                 label="Founded"
//                 value={formData.founded}
//                 editMode={editMode}
//                 onChange={handleChange("founded")}
//               />
//             </div>

//             {/* Description */}
//             <div className="mb-8">
//               <h2 className="text-xl font-semibold text-gray-100 mb-4">
//                 About Us
//               </h2>
//               {editMode ? (
//                 <textarea
//                   value={formData.description}
//                   onChange={handleChange("description")}
//                   className="w-full text-gray-300 bg-transparent border border-gray-600 p-3 rounded focus:outline-none"
//                   rows={4}
//                 />
//               ) : (
//                 <p className="text-gray-400 leading-relaxed">
//                   {formData.description}
//                 </p>
//               )}
//             </div>

//             {/* Specialties */}
//             <div className="mb-8">
//               <h2 className="text-xl font-semibold text-gray-100 mb-4">
//                 Specialties
//               </h2>
//               <div className="flex flex-wrap gap-3">
//                 {formData.specialties.map((spec, index) => (
//                   <span
//                     key={index}
//                     className="px-4 py-2 bg-blue-900/30 text-blue-400 rounded-full border border-blue-800 flex items-center gap-2"
//                   >
//                     <FiBriefcase className="w-4 h-4" />
//                     {spec}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-4">
//               <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-medium hover:from-teal-600 hover:to-blue-600 transition-all flex items-center gap-2">
//                 <FiPlus className="w-5 h-5" />
//                 Follow Company
//               </button>
//               <button className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl font-medium hover:border-blue-500 hover:text-blue-400 transition-all flex items-center gap-2">
//                 <FiMessageSquare className="w-5 h-5" />
//                 Contact
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoCard({ icon, label, value, editMode, onChange }) {
//   return (
//     <div className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-xl border border-gray-600">
//       {icon}
//       <div className="w-full">
//         <p className="text-sm text-gray-400">{label}</p>
//         {editMode ? (
//           <input
//             type="text"
//             value={value}
//             onChange={onChange}
//             className="text-gray-100 font-medium bg-transparent border-b border-gray-600 w-full focus:outline-none"
//           />
//         ) : (
//           <p className="text-gray-100 font-medium">{value}</p>
//         )}
//       </div>
//     </div>
//   );
// }



import {
  FiMapPin,
  FiGlobe,
  FiUsers,
  FiCalendar,
  FiBriefcase,
  FiMessageSquare,
  FiPlus,
  FiEdit,
  FiSave,
  FiTwitter,
  FiLinkedin,
  FiFacebook,
  FiAward,
  FiBarChart2,
  FiDollarSign,
  FiHeart,
  FiCheck
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { updateCompanyProfile } from "../../features/companySlice";
import { FaIndustry } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";

export default function CompanyProfile() {
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.company);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(company);
  const [bannerPreview, setBannerPreview] = useState(company.bannerUrl);
  const [logoPreview, setLogoPreview] = useState(company.logoUrl);
  const bannerInputRef = useRef(null);
  const logoInputRef = useRef(null);

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, bannerFile: file }));
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, logoFile: file }));
    }
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSave = () => {
    dispatch(updateCompanyProfile(formData));
    setEditMode(false);
  };

  // Stats data (would come from API in real app)
  const companyStats = [
    { label: "Jobs Posted", value: "24", icon: <FiBriefcase className="w-5 h-5" /> },
    { label: "Employees", value: "150+", icon: <FiUsers className="w-5 h-5" /> },
    { label: "Yearly Growth", value: "18%", icon: <FiBarChart2 className="w-5 h-5" /> },
    { label: "Funding", value: "$5.2M", icon: <FiDollarSign className="w-5 h-5" /> }
  ];

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h3 className="mt-6 text-xl font-bold text-gray-800">Loading Company Profile</h3>
          <p className="mt-2 text-gray-600">Please wait while we load your company information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Banner with Gradient Overlay */}
        <div className="relative h-64 md:h-80 rounded-t-2xl overflow-hidden shadow-xl">
          <img
            src={bannerPreview}
            alt="Company Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
          
          {editMode && (
            <div className="absolute top-4 right-4">
              <button
                onClick={() => bannerInputRef.current.click()}
                className="bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-md"
              >
                <FiEdit className="mr-2" /> Change Banner
              </button>
              <input
                ref={bannerInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBannerChange}
              />
            </div>
          )}

          {/* Logo with Frame */}
          <div className="absolute -bottom-16 left-6 md:left-8">
            <div className="relative group">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white">
                <img
                  src={logoPreview}
                  alt="Company Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              
              {editMode && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => logoInputRef.current.click()}
                    className="bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    Change Logo
                  </button>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="bg-white rounded-b-2xl shadow-xl border border-gray-200 -mt-8 md:-mt-12 relative z-10">
          <div className="pt-20 px-6 md:px-8 pb-8">
            {/* Header with Edit Button */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                {editMode ? (
                  <>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={handleChange("name")}
                      className="text-3xl font-bold text-gray-900 bg-gray-50 border-b-2 border-blue-500 focus:outline-none mb-2 w-full max-w-xl"
                    />
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={handleChange("tagline")}
                      className="text-xl text-blue-600 font-medium bg-gray-50 border-b border-gray-300 focus:outline-none w-full max-w-xl"
                    />
                  </>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {formData.name}
                    </h1>
                    <p className="text-xl text-blue-600 font-medium mt-2">
                      {formData.tagline}
                    </p>
                  </>
                )}
              </div>
              
              <div className="flex gap-3">
                {editMode ? (
                  <>
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                      onClick={handleSave}
                    >
                      <FiSave /> Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium"
                    onClick={() => setEditMode(true)}
                  >
                    <FiEdit /> Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Social and Follow Section */}
            <div className="flex flex-wrap items-center gap-4 mb-8 border-b border-gray-200 pb-6">
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200">
                  <FiLinkedin />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200">
                  <FiTwitter />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200">
                  <FiFacebook />
                </a>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <FiUsers className="text-gray-500" />
                <span className="font-medium">1,245 followers</span>
              </div>
              
              <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90">
                <FiHeart className="w-5 h-5" />
                Follow Company
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {companyStats.map((stat, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2">
                {/* About Section */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <FiBriefcase />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">About Us</h2>
                  </div>
                  
                  {editMode ? (
                    <textarea
                      value={formData.description}
                      onChange={handleChange("description")}
                      className="w-full text-gray-700 bg-gray-50 border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={6}
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">
                      {formData.description || "We're a forward-thinking company focused on innovation and excellence. Our mission is to create products that improve people's lives while maintaining the highest standards of quality and ethical practices."}
                    </p>
                  )}
                </div>

                {/* Specialties */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <GiAchievement />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Our Specialties</h2>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {formData.specialties.map((spec, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                    {editMode && (
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200">
                        + Add Specialty
                      </button>
                    )}
                  </div>
                </div>

                {/* Awards & Recognition */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <FiAward />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Awards & Recognition</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-amber-500 flex items-center justify-center text-white">
                          1st
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Best Tech Company 2023</h3>
                        <p className="text-gray-600">Tech Innovation Awards</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-amber-500 flex items-center justify-center text-white">
                          <FiAward className="w-6 h-6" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Top Workplace 2022</h3>
                        <p className="text-gray-600">Employee Choice Awards</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div>
                {/* Company Details Card */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <FaIndustry />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Company Details</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <InfoCard 
                      icon={<FiGlobe className="w-5 h-5 text-blue-500" />} 
                      label="Website" 
                      value={formData.website} 
                      editMode={editMode} 
                      onChange={handleChange("website")} 
                    />
                    
                    <InfoCard 
                      icon={<FiMapPin className="w-5 h-5 text-blue-500" />} 
                      label="Location" 
                      value={formData.location} 
                      editMode={editMode} 
                      onChange={handleChange("location")} 
                    />
                    
                    <InfoCard 
                      icon={<FiUsers className="w-5 h-5 text-blue-500" />} 
                      label="Company Size" 
                      value={formData.companySize} 
                      editMode={editMode} 
                      onChange={handleChange("companySize")} 
                    />
                    
                    <InfoCard 
                      icon={<FiCalendar className="w-5 h-5 text-blue-500" />} 
                      label="Founded" 
                      value={formData.founded} 
                      editMode={editMode} 
                      onChange={handleChange("founded")} 
                    />
                    
                    <InfoCard 
                      icon={<FiBriefcase className="w-5 h-5 text-blue-500" />} 
                      label="Industry" 
                      value={formData.industry || "Technology"} 
                      editMode={editMode} 
                      onChange={handleChange("industry")} 
                    />
                  </div>
                </div>
                
                {/* Culture Highlights */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-5 mb-6">
                  <h3 className="font-bold text-gray-900 mb-3">Culture Highlights</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mt-0.5 flex-shrink-0">
                        <FiCheck className="w-3 h-3" />
                      </div>
                      <span className="text-gray-700">Flexible work hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mt-0.5 flex-shrink-0">
                        <FiCheck className="w-3 h-3" />
                      </div>
                      <span className="text-gray-700">Remote work options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mt-0.5 flex-shrink-0">
                        <FiCheck className="w-3 h-3" />
                      </div>
                      <span className="text-gray-700">Professional development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mt-0.5 flex-shrink-0">
                        <FiCheck className="w-3 h-3" />
                      </div>
                      <span className="text-gray-700">Health & wellness programs</span>
                    </li>
                  </ul>
                </div>
                
                {/* Contact Button */}
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-blue-500 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-colors">
                  <FiMessageSquare className="w-5 h-5" />
                  Contact Company
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value, editMode, onChange }) {
  return (
    <div className="flex items-start gap-3">
      <div className="pt-1">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-600">{label}</p>
        {editMode ? (
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="text-gray-900 font-medium bg-transparent border-b border-gray-300 w-full focus:outline-none focus:border-blue-500 py-1"
          />
        ) : (
          <p className="text-gray-900 font-medium">{value || "-"}</p>
        )}
      </div>
    </div>
  );
}