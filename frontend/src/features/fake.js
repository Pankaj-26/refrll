// import React from 'react';

// const companyData = {
//   bannerUrl: 'https://via.placeholder.com/1200x300?text=Company+Banner',
//   logoUrl: 'https://via.placeholder.com/150?text=Logo',
//   name: 'Tech Innovators Inc.',
//   tagline: 'Innovating the Future',
//   location: 'San Francisco, CA',
//   website: 'https://techinnovators.com',
//   industry: 'Information Technology',
//   companySize: '201-500 employees',
//   founded: 2010,
//   specialties: ['AI', 'Cloud Computing', 'Cybersecurity'],
//   description:
//     "Tech Innovators Inc. is dedicated to building cutting-edge technology solutions that empower businesses worldwide. Our mission is to drive innovation and transform industries with state-of-the-art products.",
// };

// export default function CompanyProfile() {
//   return (
//     <div className="max-w-4xl mx-auto bg-white rounded shadow-md overflow-hidden">
//       {/* Banner */}
//       <div className="relative h-48 bg-gray-200">
//         <img
//           src={companyData.bannerUrl}
//           alt="Company Banner"
//           className="w-full h-full object-cover"
//         />
//         {/* Logo */}
//         <div className="absolute -bottom-12 left-8 border-4 border-white rounded-full overflow-hidden w-24 h-24 bg-white">
//           <img
//             src={companyData.logoUrl}
//             alt="Company Logo"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>

//       {/* Company Info */}
//       <div className="pt-16 px-8 pb-8">
//         {/* Name & Tagline */}
//         <h1 className="text-3xl font-bold">{companyData.name}</h1>
//         <p className="text-gray-600 italic mt-1">{companyData.tagline}</p>

//         {/* Location, Website, Industry */}
//         <div className="flex flex-wrap gap-4 mt-4 text-gray-700">
//           <div className="flex items-center space-x-2">
//             <svg
//               className="w-5 h-5 text-gray-500"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zM7 9a5 5 0 1110 0c0 2.14-2.71 6.717-5 9.884C9.71 15.717 7 11.14 7 9z" />
//               <circle cx="12" cy="9" r="2.5" />
//             </svg>
//             <span>{companyData.location}</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <svg
//               className="w-5 h-5 text-gray-500"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="12" cy="12" r="10" />
//               <path d="M2 12h20" />
//               <path d="M12 2a15.3 15.3 0 010 20" />
//             </svg>
//             <a
//               href={companyData.website}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:underline"
//             >
//               {companyData.website}
//             </a>
//           </div>
//           <div>
//             <span className="font-semibold">Industry:</span> {companyData.industry}
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mt-6 text-gray-800 leading-relaxed">
//           <p>{companyData.description}</p>
//         </div>

//         {/* Company details */}
//         <div className="mt-6 flex gap-10 text-gray-700">
//           <div>
//             <span className="font-semibold">Company size:</span>
//             <p>{companyData.companySize}</p>
//           </div>
//           <div>
//             <span className="font-semibold">Founded:</span>
//             <p>{companyData.founded}</p>
//           </div>
//         </div>

//         {/* Specialties */}
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2">Specialties</h3>
//           <div className="flex flex-wrap gap-2">
//             {companyData.specialties.map((spec) => (
//               <span
//                 key={spec}
//                 className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
//               >
//                 {spec}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="mt-8 flex gap-4">
//           <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
//             Follow
//           </button>
//           <button className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-100 transition">
//             Contact
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import {
//   FiMapPin,
//   FiGlobe,
//   FiUsers,
//   FiCalendar,
//   FiBriefcase,
//   FiMessageSquare,
//   FiPlus,
// } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import { updateCompanyProfile } from "../../features/companySlice";

// const companyData = {
//   bannerUrl:
//     "https://via.placeholder.com/1200x300/1f2937/374151?text=Tech+Innovators",
//   logoUrl: "https://via.placeholder.com/150/3b82f6/ffffff?text=TI",
//   name: "Tech Innovators Inc.",
//   tagline: "Innovating the Future",
//   location: "San Francisco, CA",
//   website: "techinnovators.com",
//   industry: "Information Technology",
//   companySize: "201-500 employees",
//   founded: 2010,
//   specialties: ["AI", "Cloud Computing", "Cybersecurity"],
//   description:
//     "Tech Innovators Inc. is dedicated to building cutting-edge technology solutions that empower businesses worldwide. Our mission is to drive innovation and transform industries with state-of-the-art products.",
// };

// export default function CompanyProfile() {
//   const dispatch = useDispatch();
//   const { company, loading } = useSelector((state) => state.company);

// const handleSave = () => {
//   const updatedData = {
//     name: companyData.name,
//     tagline: companyData.tagline,
//     location: companyData.location,
//     website: companyData.website,
//     companySize: companyData.companySize,
//     founded: companyData.founded,
//     specialties: companyData.specialties,
//     description: companyData.description,
//     // Add other fields if editable
//   };

//    dispatch(updateCompanyProfile(formData)).then((res) => {
//     if (res.meta.requestStatus === 'fulfilled') {
//       toast.success('Profile updated!');
//       setEditMode(false);
//     } else {
//       toast.error('Failed to update!');
//     }
//   });
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Banner */}
//         <div className="relative h-48 bg-gray-800 rounded-t-2xl overflow-hidden">
//           <img
//             src={companyData.bannerUrl}
//             alt="Company Banner"
//             className="w-full h-full object-cover opacity-75"
//           />
//           {/* Logo */}
//           <div className="absolute -bottom-16 left-8 border-4 border-gray-900 rounded-2xl overflow-hidden w-32 h-32 bg-gray-900 shadow-xl">
//             <img
//               src={companyData.logoUrl}
//               alt="Company Logo"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>

//         {/* Profile Content */}
//         <div className="bg-gray-800 rounded-b-2xl border border-gray-700 shadow-xl">
//           <div className="pt-20 px-8 pb-8">
//             {/* Name & Tagline */}
//             <div className="mb-6">
//               <h1 className="text-3xl font-bold text-gray-100">
//                 {companyData.name}
//               </h1>
//               <p className="text-teal-400 italic mt-2">{companyData.tagline}</p>
//             </div>

//             {/* Quick Info Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//               <div className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-xl border border-gray-600">
//                 <FiMapPin className="w-6 h-6 text-blue-400" />
//                 <div>
//                   <p className="text-sm text-gray-400">Location</p>
//                   <p className="text-gray-100 font-medium">
//                     {companyData.location}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-xl border border-gray-600">
//                 <FiGlobe className="w-6 h-6 text-green-400" />
//                 <div>
//                   <p className="text-sm text-gray-400">Website</p>
//                   <a
//                     href={`https://${companyData.website}`}
//                     className="text-blue-400 hover:underline"
//                   >
//                     {companyData.website}
//                   </a>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-xl border border-gray-600">
//                 <FiUsers className="w-6 h-6 text-purple-400" />
//                 <div>
//                   <p className="text-sm text-gray-400">Company Size</p>
//                   <p className="text-gray-100 font-medium">
//                     {companyData.companySize}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-xl border border-gray-600">
//                 <FiCalendar className="w-6 h-6 text-orange-400" />
//                 <div>
//                   <p className="text-sm text-gray-400">Founded</p>
//                   <p className="text-gray-100 font-medium">
//                     {companyData.founded}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="mb-8">
//               <h2 className="text-xl font-semibold text-gray-100 mb-4">
//                 About Us
//               </h2>
//               <p className="text-gray-400 leading-relaxed">
//                 {companyData.description}
//               </p>
//             </div>

//             {/* Specialties */}
//             <div className="mb-8">
//               <h2 className="text-xl font-semibold text-gray-100 mb-4">
//                 Specialties
//               </h2>
//               <div className="flex flex-wrap gap-3">
//                 {companyData.specialties.map((spec) => (
//                   <span
//                     key={spec}
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












// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchJobs, applyToJob } from "../features/jobSlice";
// import { FiSearch, FiBriefcase, FiMapPin, FiClock, FiDollarSign, FiCheckCircle } from "react-icons/fi";

// export default function JobPostings() {
//   const dispatch = useDispatch();
//   const { jobs = [], loading = false } = useSelector((state) => state.jobs);
//   const [search, setSearch] = useState("");

//   useEffect(() => { dispatch(fetchJobs()) }, [dispatch]);

//   const filteredJobs = jobs.filter(job => 
//     job.title.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleApply = (jobId) => { dispatch(applyToJob({ jobId })) };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Search Header */}
//         <div className="mb-12 text-center">
//           <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
//             Discover Career Opportunities
//           </h1>
//           <div className="max-w-2xl mx-auto relative">
//             <FiSearch className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search jobs by title, skills, or company..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-700 bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-300"
//             />
//           </div>
//         </div>

//         {/* Jobs Grid */}
//         {filteredJobs.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredJobs.map((job) => (
//               <div
//                 key={job._id}
//                 className="bg-gray-800 rounded-2xl shadow-2xl hover:shadow-xl transition-shadow border border-gray-700"
//               >
//                 <div className="p-6">
//                   {/* Company Header */}
//                   <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-700">
//                     <div className="p-2 bg-blue-900/30 rounded-lg">
//                       <FiBriefcase className="w-6 h-6 text-blue-400" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-100">
//                         {job.title}
//                       </h3>
//                       <p className="text-sm text-blue-400 font-medium">
//                         {job.company}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Job Details */}
//                   <div className="space-y-3 mb-6">
//                     <div className="flex items-center gap-2 text-sm text-gray-400">
//                       <FiMapPin className="w-4 h-4" />
//                       <span>{job.location}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-gray-400">
//                       <FiClock className="w-4 h-4" />
//                       <span>{job.type}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-gray-400">
//                       <FiDollarSign className="w-4 h-4" />
//                       <span>${job.salaryRange}/month</span>
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <p className="text-gray-300 text-sm mb-6 line-clamp-3">
//                     {job.description}
//                   </p>

//                   {/* Footer */}
//                   <div className="flex justify-between items-center">
//                     {!job.applied ? (
//                       <button
//                         onClick={() => handleApply(job._id)}
//                         className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-teal-600 hover:to-blue-600 text-white rounded-xl text-sm font-medium transition-all shadow-lg hover:shadow-blue-500/20"
//                         disabled={loading}
//                       >
//                         {loading ? 'Applying...' : 'Apply Now'}
//                       </button>
//                     ) : (
//                       <div className="flex items-center gap-2 text-green-400">
//                         <FiCheckCircle className="w-5 h-5" />
//                         <span className="text-sm font-medium">{job.applicationStatus}</span>
//                       </div>
//                     )}
//                     <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-700 text-gray-300">
//                       {job.postedDate}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20">
//             <div className="inline-block p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
//               <FiSearch className="w-16 h-16 mx-auto text-gray-600 mb-4" />
//               <h3 className="text-2xl font-semibold text-gray-200 mb-2">
//                 No Jobs Found
//               </h3>
//               <p className="text-gray-400 max-w-md mx-auto">
//                 Try different search terms or check back later
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }








// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchJobs, applyToJob } from "../features/jobSlice";
// import { 
//   FiSearch, FiBriefcase, FiMapPin, FiClock, FiDollarSign, 
//   FiCheckCircle, FiFilter, FiX, FiUserPlus, FiRefreshCw
// } from "react-icons/fi";
// import { useSearchParams } from "react-router-dom";

// export default function JobPostings() {
//   const dispatch = useDispatch();
//   const { jobs = [], loading = false } = useSelector((state) => state.jobs);
//   const [search, setSearch] = useState("");
//   const [searchParams, setSearchParams] = useSearchParams();
  
//   // Get active tab from URL or default to "company"
//   const activeTab = searchParams.get("tab") || "company";
  
//   const [filters, setFilters] = useState(() => {
//     // Load filters from localStorage if available
//     const savedFilters = localStorage.getItem("jobFilters");
//     return savedFilters ? JSON.parse(savedFilters) : {
//       jobType: [],
//       experience: ""
//     };
//   });
  
//   const [showFilters, setShowFilters] = useState(false);

//   useEffect(() => { 
//     dispatch(fetchJobs());
    
//     // Save filters to localStorage whenever they change
//     localStorage.setItem("jobFilters", JSON.stringify(filters));
//   }, [dispatch, filters]);

//   // Update URL when tab changes
//   const setActiveTab = (tab) => {
//     searchParams.set("tab", tab);
//     setSearchParams(searchParams, { replace: true });
//   };

//   // Filter jobs based on active tab, search, and filters
//   const filteredJobs = jobs.filter(job => {
//     // Match active tab - only company and referral tabs
//     const matchesTab = 
//       (activeTab === "company" && !job.isReferral) || 
//       (activeTab === "referral" && job.isReferral);
    
//     // Match search term
//     const matchesSearch = 
//       job.title.toLowerCase().includes(search.toLowerCase()) ||
//       job.company.toLowerCase().includes(search.toLowerCase()) ||
//       job.description.toLowerCase().includes(search.toLowerCase());
    
//     // Match filters
//     const matchesFilters = 
//       (filters.jobType.length === 0 || filters.jobType.includes(job.type)) &&
//       (filters.experience === "" || job.experience === filters.experience);
    
//     return matchesTab && matchesSearch && matchesFilters;
//   });

//   const handleApply = (jobId) => { dispatch(applyToJob({ jobId })) };

//   // Toggle job type filter
//   const toggleJobTypeFilter = (type) => {
//     setFilters(prev => {
//       if (prev.jobType.includes(type)) {
//         return {...prev, jobType: prev.jobType.filter(t => t !== type)};
//       } else {
//         return {...prev, jobType: [...prev.jobType, type]};
//       }
//     });
//   };

//   // Reset all filters
//   const resetFilters = () => {
//     setFilters({
//       jobType: [],
//       experience: ""
//     });
//     setSearch("");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Search Header */}
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
//             Discover Career Opportunities
//           </h1>
//           <div className="max-w-2xl mx-auto relative">
//             <FiSearch className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search jobs by title, skills, or company..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-700 bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-300"
//             />
//           </div>
//         </div>

//         {/* Tabs and Filters */}
//         <div className="flex flex-wrap gap-4 mb-6 justify-between items-center">
//           <div className="flex flex-wrap gap-2">
//             <button
//               className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
//                 activeTab === "company"
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
//                   : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//               }`}
//               onClick={() => setActiveTab("company")}
//             >
//               <FiBriefcase className="mr-2" />
//               Company Jobs
//             </button>
//             <button
//               className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
//                 activeTab === "referral"
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
//                   : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//               }`}
//               onClick={() => setActiveTab("referral")}
//             >
//               <FiUserPlus className="mr-2" />
//               Referral Jobs
//             </button>
//           </div>
          
//           <div className="flex gap-2">
//             <button 
//               className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center"
//               onClick={() => setShowFilters(!showFilters)}
//             >
//               <FiFilter className="mr-2" />
//               {showFilters ? "Hide Filters" : "Show Filters"}
//             </button>
//             <button 
//               className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center"
//               onClick={resetFilters}
//             >
//               <FiRefreshCw className="mr-2" />
//               Reset
//             </button>
//           </div>
//         </div>

//         {/* Filters Panel */}
//         {showFilters && (
//           <div className="bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700 mb-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-bold text-white">Filter Jobs</h3>
//               <button 
//                 className="text-gray-400 hover:text-gray-200"
//                 onClick={() => setShowFilters(false)}
//               >
//                 <FiX className="w-5 h-5" />
//               </button>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {/* Job Type Filter */}
//               <div>
//                 <h4 className="text-sm font-semibold text-gray-300 mb-2">Job Type</h4>
//                 <div className="space-y-2">
//                   {["Full-time", "Part-time", "Contract", "Internship", "Remote"].map(type => (
//                     <div key={type} className="flex items-center">
//                       <input
//                         type="checkbox"
//                         id={`type-${type}`}
//                         checked={filters.jobType.includes(type)}
//                         onChange={() => toggleJobTypeFilter(type)}
//                         className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
//                       />
//                       <label htmlFor={`type-${type}`} className="ml-2 text-gray-400">
//                         {type}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               {/* Experience Level */}
//               <div>
//                 <h4 className="text-sm font-semibold text-gray-300 mb-2">Experience Level</h4>
//                 <select
//                   value={filters.experience}
//                   onChange={(e) => setFilters({...filters, experience: e.target.value})}
//                   className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">All Levels</option>
//                   <option value="Entry">Entry Level</option>
//                   <option value="Mid-level">Mid Level</option>
//                   <option value="Senior">Senior</option>
//                   <option value="Executive">Executive</option>
//                 </select>
//               </div>
              
//               {/* Actions */}
//               <div className="flex items-end">
//                 <button 
//                   className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium"
//                   onClick={() => setShowFilters(false)}
//                 >
//                   Apply Filters
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Active Filters */}
//         {(filters.jobType.length > 0 || filters.experience || search) && (
//           <div className="mb-6">
//             <div className="flex flex-wrap gap-2">
//               {filters.jobType.map(type => (
//                 <span 
//                   key={type} 
//                   className="flex items-center bg-blue-900/30 text-blue-300 px-3 py-1.5 rounded-lg text-sm"
//                 >
//                   {type}
//                   <button 
//                     className="ml-2 text-gray-400 hover:text-white"
//                     onClick={() => toggleJobTypeFilter(type)}
//                   >
//                     <FiX className="w-4 h-4" />
//                   </button>
//                 </span>
//               ))}
              
//               {filters.experience && (
//                 <span className="flex items-center bg-blue-900/30 text-blue-300 px-3 py-1.5 rounded-lg text-sm">
//                   {filters.experience}
//                   <button 
//                     className="ml-2 text-gray-400 hover:text-white"
//                     onClick={() => setFilters({...filters, experience: ""})}
//                   >
//                     <FiX className="w-4 h-4" />
//                   </button>
//                 </span>
//               )}
              
//               {search && (
//                 <span className="flex items-center bg-blue-900/30 text-blue-300 px-3 py-1.5 rounded-lg text-sm">
//                   Search: {search}
//                   <button 
//                     className="ml-2 text-gray-400 hover:text-white"
//                     onClick={() => setSearch("")}
//                   >
//                     <FiX className="w-4 h-4" />
//                   </button>
//                 </span>
//               )}
              
//               <button 
//                 className="text-sm text-gray-400 hover:text-gray-200 flex items-center"
//                 onClick={resetFilters}
//               >
//                 <FiX className="mr-1" /> Clear all
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Tab Content Header */}
//         <div className="mb-6">
//           <h2 className="text-xl font-bold text-white">
//             {activeTab === "company" && "Company Job Postings"}
//             {activeTab === "referral" && "Referral Opportunities"}
//           </h2>
//           <p className="text-gray-400">
//             {activeTab === "company" && "Direct job postings from companies"}
//             {activeTab === "referral" && "Jobs with employee referral opportunities"}
//           </p>
//         </div>

//         {/* Jobs Grid */}
//         {filteredJobs.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredJobs.map((job) => (
//               <div
//                 key={job._id}
//                 className={`bg-gray-800 rounded-2xl shadow-2xl hover:shadow-xl transition-shadow border ${
//                   job.isReferral ? "border-teal-500" : "border-gray-700"
//                 }`}
//               >
//                 <div className="p-6">
//                   {/* Company Header */}
//                   <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-700">
//                     <div className={`p-2 rounded-lg ${
//                       job.isReferral 
//                         ? "bg-gradient-to-r from-teal-600 to-emerald-600" 
//                         : "bg-blue-900/30"
//                     }`}>
//                       {job.isReferral ? (
//                         <FiUserPlus className="w-6 h-6 text-white" />
//                       ) : (
//                         <FiBriefcase className="w-6 h-6 text-blue-400" />
//                       )}
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-100">
//                         {job.title}
//                       </h3>
//                       <p className="text-sm font-medium flex items-center">
//                         <span className={job.isReferral ? "text-teal-400" : "text-blue-400"}>
//                           {job.company}
//                         </span>
//                         {job.isReferral && (
//                           <span className="ml-2 bg-teal-900/50 text-teal-300 text-xs px-2 py-0.5 rounded-full">
//                             Employee Referral
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Referral Contact */}
//                   {job.isReferral && job.referralContact && (
//                     <div className="mb-4 p-3 bg-teal-900/20 rounded-lg">
//                       <div className="flex items-center gap-2 text-teal-300">
//                         <FiUser className="w-4 h-4" />
//                         <span className="text-sm font-medium">Referral Contact:</span>
//                       </div>
//                       <p className="text-sm text-white mt-1">{job.referralContact}</p>
//                       <button className="mt-2 text-xs bg-teal-700 hover:bg-teal-600 text-white px-3 py-1 rounded-lg">
//                         Request Referral
//                       </button>
//                     </div>
//                   )}

//                   {/* Job Details */}
//                   <div className="space-y-3 mb-6">
//                     <div className="flex items-center gap-2 text-sm text-gray-400">
//                       <FiMapPin className="w-4 h-4" />
//                       <span>{job.location}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-gray-400">
//                       <FiClock className="w-4 h-4" />
//                       <span>{job.type}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-gray-400">
//                       <FiDollarSign className="w-4 h-4" />
//                       <span>${job.salaryRange}/month</span>
//                     </div>
//                     {job.experience && (
//                       <div className="flex items-center gap-2 text-sm text-gray-400">
//                         <span className="w-4 h-4 rounded-full border border-gray-500 flex items-center justify-center text-xs">•</span>
//                         <span>{job.experience}</span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Description */}
//                   <p className="text-gray-300 text-sm mb-6 line-clamp-3">
//                     {job.description}
//                   </p>

//                   {/* Footer */}
//                   <div className="flex justify-between items-center">
//                     {!job.applied ? (
//                       <button
//                         onClick={() => handleApply(job._id)}
//                         className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-lg ${
//                           job.isReferral
//                             ? "bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
//                             : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
//                         } text-white`}
//                         disabled={loading}
//                       >
//                         {loading ? 'Applying...' : 'Apply Now'}
//                       </button>
//                     ) : (
//                       <div className="flex items-center gap-2 text-green-400">
//                         <FiCheckCircle className="w-5 h-5" />
//                         <span className="text-sm font-medium">{job.applicationStatus}</span>
//                       </div>
//                     )}
//                     <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-700 text-gray-300">
//                       {job.postedDate}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20">
//             <div className="inline-block p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
//               <FiSearch className="w-16 h-16 mx-auto text-gray-600 mb-4" />
//               <h3 className="text-2xl font-semibold text-gray-200 mb-2">
//                 No {activeTab === "company" ? "Company" : "Referral"} Jobs Found
//               </h3>
//               <p className="text-gray-400 max-w-md mx-auto">
//                 Try different search terms, filters, or check back later
//               </p>
//               <button 
//                 className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium"
//                 onClick={resetFilters}
//               >
//                 Reset Filters
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




