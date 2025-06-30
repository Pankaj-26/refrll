// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiDownload, FiUser, FiMail, FiPhone, FiFileText, FiFilter, FiX, FiSearch, FiCheck, FiClock, FiDollarSign, FiMapPin, FiBriefcase } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import { getJobWithApplicants, updateApplicationStatus} from "../../features/jobSlice";
// import * as XLSX from 'xlsx';

// export default function JobApplicants() {
//   const { jobId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { currentJob, applicants, loading, error } = useSelector((state) => state.jobs);
  
//   const [filters, setFilters] = useState({
//     status: '',
//     experienceMin: '',
//     experienceMax: '',
//     search: ''
//   });
//   const [showFilterPanel, setShowFilterPanel] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState('All');
//   const [filteredApplicants, setFilteredApplicants] = useState([]);



//   useEffect(() => {
//     if (jobId) {
//       dispatch(getJobWithApplicants(jobId));
//     }
//   }, [dispatch, jobId]);

//   useEffect(() => {
//     if (applicants) {
//       filterApplicants();
//     }
//   }, [currentJob, filters]);

//   const filterApplicants = () => {
//     let result = [...applicants];
    
//     // Status filter
//     if (filters.status && filters.status !== 'All') {
//       result = result.filter(app => app.status === filters.status);
//     }
    
//     // Experience filter
//     if (filters.experienceMin) {
//       result = result.filter(app => app.experience >= parseInt(filters.experienceMin));
//     }
//     if (filters.experienceMax) {
//       result = result.filter(app => app.experience <= parseInt(filters.experienceMax));
//     }
    
//     // Search filter
//     if (filters.search) {
//       const searchTerm = filters.search.toLowerCase();
//       result = result.filter(app => 
//         app.name.toLowerCase().includes(searchTerm) ||
//         app.email.toLowerCase().includes(searchTerm) ||
//         app.skills.some(skill => skill.toLowerCase().includes(searchTerm))
//       )
//     }
    
//     setFilteredApplicants(result);
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       status: '',
//       experienceMin: '',
//       experienceMax: '',
//       search: ''
//     });
//     setSelectedStatus('All');
//   };


//   const downloadExcel = () => {
//     if (!filteredApplicants.length) return;
    
//     const data = filteredApplicants.map(applicant => ({
//       "Name": applicant?.seeker?.name,
//       "Email": applicant?.seeker?.email,
//       "Phone": applicant?.seeker?.profile?.phone || 'N/A',
//       "Experience": `${applicant?.seeker?.profile?.experience} years`,
//       "Status": applicant.status,
//       "Applied On": new Date(applicant.createdAt
// ).toLocaleDateString(),
//       "Skills": applicant?.seeker?.profile?.skills.join(', '),
//       "Resume": applicant.resumeUrl ? "Available" : "Not Available"
//     }));
    
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");
//     XLSX.writeFile(workbook, `${currentJob.title.replace(/\s+/g, '_')}_Applicants.xlsx`);
//   };

//   const statusOptions = [
//     'All', 'applied', 'reviewed', 'rejected', 'hired'
//   ];


// const handleStatusUpdate = async (applicationId, newStatus) => {
//     try {
    
//       await dispatch(
//         updateApplicationStatus({ applicationId, status: newStatus })
//       );
//             dispatch(getJobWithApplicants(jobId));
//     } catch (error) {
//       console.error("Status update failed:", error);
//     }
//   };



//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-300">Loading job details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
//         <div className="text-center p-6 bg-gray-800 rounded-xl border border-red-500/30 max-w-md">
//           <h3 className="text-xl font-semibold text-red-500 mb-2">Error</h3>
//           <p className="text-gray-400">{error}</p>
//           <button 
//             className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg"
//             onClick={() => dispatch(getJobWithApplicantsJobWithApplicants(jobId))}
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!currentJob) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
//         <div className="text-center p-6 bg-gray-800 rounded-xl border border-gray-700 max-w-md">
//           <h3 className="text-xl font-semibold text-gray-300 mb-2">Job Not Found</h3>
//           <p className="text-gray-400">The job you are looking for does not exist.</p>
//           <button 
//             className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg"
//             onClick={() => navigate(-1)}
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
//       <div className="max-w-7xl mx-auto">
//         <button 
//           onClick={() => navigate(-1)}
//           className="flex items-center text-gray-400 hover:text-gray-200 mb-6"
//         >
//           <FiArrowLeft className="mr-2" /> Back to Dashboard
//         </button>

//         {/* Job Header */}
//         <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 mb-8">
//           <div className="flex flex-wrap justify-between gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-white mb-2">{currentJob.title}</h1>
//               <div className="flex flex-wrap gap-3 mb-4">
//                 <span className="flex items-center bg-blue-900/30 text-blue-300 px-3 py-1 rounded-lg">
//                   <FiBriefcase className="mr-2" /> {currentJob.
// employmentType
// }
//                 </span>
//                 <span className="flex items-center bg-purple-900/30 text-purple-300 px-3 py-1 rounded-lg">
//                   <FiMapPin className="mr-2" /> {currentJob.location}
//                 </span>
//                 <span className="flex items-center bg-green-900/30 text-green-300 px-3 py-1 rounded-lg">
//                   <FiDollarSign className="mr-2" /> {currentJob.
// salaryRange
// }
//                 </span>
//               </div>
//               <p className="text-gray-300 mb-4">{currentJob.description}</p>
//             </div>
            
//             <div className="bg-gray-900/50 p-4 rounded-xl min-w-[250px]">
//               <h3 className="text-lg font-semibold text-white mb-3">Job Details</h3>
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-gray-400">Posted:</span>
//                   <span className="text-gray-300">
//                     {new Date(currentJob.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-400">Experience:</span>
//                   <span className="text-gray-300">{currentJob.experienceRequired}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-400">Applications:</span>
//                   <span className="text-gray-300">{applicants.length}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-400">Status:</span>
//                   <span className="px-2 py-1 text-xs rounded-full bg-green-900/30 text-green-400">
//                     {currentJob.status}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Applicants Section */}
//         <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
//           <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-100">
//                 Applicants ({filteredApplicants.length})
//               </h2>
//               <p className="text-gray-500 text-sm">
//                 Filter and manage applications for this position
//               </p>
//             </div>
            
//             <div className="flex flex-wrap gap-3">
//               <button 
//                 className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center transition-colors"
//                 onClick={() => setShowFilterPanel(!showFilterPanel)}
//               >
//                 <FiFilter className="mr-2" /> 
//                 {showFilterPanel ? "Hide Filters" : "Show Filters"}
//               </button>
              
//               <button 
//                 className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg flex items-center"
//                 onClick={downloadExcel}
//                 disabled={!filteredApplicants.length}
//               >
//                 <FiDownload className="mr-2" /> Download Excel
//               </button>
//             </div>
//           </div>

//           {/* Quick Status Filter */}
//           <div className="flex flex-wrap gap-2 mb-6">
//             {statusOptions.map(status => (
//               <button
//                 key={status}
//                 className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
//                   selectedStatus === status
//                     ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
//                     : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//                 }`}
//                 onClick={() => {
//                   setSelectedStatus(status);
//                   setFilters(prev => ({ ...prev, status: status === 'All' ? '' : status }));
//                 }}
//               >
//                 {status}
//               </button>
//             ))}
//           </div>

//           {/* Search and Filters Panel */}
//           {showFilterPanel && (
//             <div className="bg-gray-900/50 rounded-xl p-5 mb-6 border border-gray-700">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//                 {/* Search */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-400 mb-2">
//                     Search Applicants
//                   </label>
//                   <div className="relative">
//                     <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
//                     <input
//                       type="text"
//                       name="search"
//                       placeholder="Name, email, or skills"
//                       value={filters.search}
//                       onChange={handleFilterChange}
//                       className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300"
//                     />
//                   </div>
//                 </div>
                
//                 {/* Experience Filter */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-400 mb-2">
//                     Experience (years)
//                   </label>
//                   <div className="flex gap-2">
//                     <input
//                       type="number"
//                       name="experienceMin"
//                       placeholder="Min"
//                       value={filters.experienceMin}
//                       onChange={handleFilterChange}
//                       className="w-full px-3 py-2.5 rounded-lg border border-gray-700 bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300"
//                     />
//                     <input
//                       type="number"
//                       name="experienceMax"
//                       placeholder="Max"
//                       value={filters.experienceMax}
//                       onChange={handleFilterChange}
//                       className="w-full px-3 py-2.5 rounded-lg border border-gray-700 bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300"
//                     />
//                   </div>
//                 </div>
                
//                 {/* Actions */}
//                 <div className="flex items-end">
//                   <button
//                     className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2.5 rounded-lg font-medium"
//                     onClick={resetFilters}
//                   >
//                     Reset Filters
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Active Filters */}
//           <div className="flex flex-wrap gap-2 mb-6">
//             {filters.status && (
//               <span className="flex items-center bg-blue-900/30 text-blue-300 px-3 py-1.5 rounded-lg text-sm">
//                 Status: {filters.status}
//                 <button
//                   className="ml-2 text-gray-400 hover:text-white"
//                   onClick={() => {
//                     setFilters(prev => ({ ...prev, status: '' }));
//                     setSelectedStatus('All');
//                   }}
//                 >
//                   <FiX className="w-4 h-4" />
//                 </button>
//               </span>
//             )}
            
//             {(filters.experienceMin || filters.experienceMax) && (
//               <span className="flex items-center bg-blue-900/30 text-blue-300 px-3 py-1.5 rounded-lg text-sm">
//                 Experience: {filters.experienceMin || 0} - {filters.experienceMax || '∞'} years
//                 <button
//                   className="ml-2 text-gray-400 hover:text-white"
//                   onClick={() => setFilters(prev => ({ 
//                     ...prev, 
//                     experienceMin: '', 
//                     experienceMax: '' 
//                   }))}
//                 >
//                   <FiX className="w-4 h-4" />
//                 </button>
//               </span>
//             )}
            
//             {filters.search && (
//               <span className="flex items-center bg-blue-900/30 text-blue-300 px-3 py-1.5 rounded-lg text-sm">
//                 Search: {filters.search}
//                 <button
//                   className="ml-2 text-gray-400 hover:text-white"
//                   onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
//                 >
//                   <FiX className="w-4 h-4" />
//                 </button>
//               </span>
//             )}
//           </div>

//           {/* Applicants Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-700">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Applicant</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Contact</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Experience</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Status</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Applied</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Resume</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-700">
//                 {filteredApplicants.length > 0 ? (
//                   filteredApplicants.map(applicant => (
//                     <tr key={applicant._id} className="hover:bg-gray-700/50 transition-colors">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center">
//                           <div className="bg-gray-600 rounded-full p-2 mr-3">
//                             <FiUser className="w-5 h-5 text-gray-300" />
//                           </div>
//                           <div>
//                             <div className="text-sm font-medium text-gray-100">{applicant?.seeker?.name}</div>
//                             <div className="text-xs text-gray-400">{applicant?.skills?.slice(0, 3).join(', ')}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm text-gray-400">{applicant?.seeker?.email}</div>
//                         <div className="text-xs text-gray-500">{applicant?.seeker?.profile?.phone || 'N/A'}</div>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-400">
//                         {applicant?.seeker?.profile?.experience} years
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className={`px-3 py-1 text-xs font-medium rounded-full ${
//                           applicant.companyStatus
//  === 'applied' ? 'bg-blue-900/20 text-blue-400' :
//                           applicant.status === 'reviewed' ? 'bg-yellow-900/20 text-yellow-400' :
//                           applicant.status === 'interview' ? 'bg-purple-900/20 text-purple-400' :
//                           applicant.status === 'rejected' ? 'bg-red-900/20 text-red-400' :
//                           'bg-green-900/20 text-green-400'
//                         }`}  >
//                           {applicant.companyStatus
// }
//                         </span>
//                         <select
//     value={applicant.companyStatus}
//     onChange={(e) =>
//       handleStatusUpdate(applicant._id, e.target.value)
//     }
//     className="bg-gray-800 text-gray-100 border border-gray-600 text-xs rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
//   >
//     <option value="applied">Applied</option>
//     <option value="reviewed">Reviewed</option>
//     <option value="interview">Interview</option>
//     <option value="accepted">Accepted</option>
//     <option value="rejected">Rejected</option>
//   </select>
//                       </td>

//                       {/* <td className="px-6 py-4">
//   <select
//     value={applicant.companyStatus}
//     onChange={(e) =>
//       handleStatusUpdate(applicant._id, e.target.value)
//     }
//     className="bg-gray-800 text-gray-100 border border-gray-600 text-xs rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
//   >
//     <option value="applied">Applied</option>
//     <option value="reviewed">Reviewed</option>
//     <option value="interview">Interview</option>
//     <option value="accepted">Accepted</option>
//     <option value="rejected">Rejected</option>
//   </select>
// </td> */}

//                       <td className="px-6 py-4 text-sm text-gray-400">
//                         {new Date(applicant.createdAt).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4">
//                         {applicant.resumeUrl ? (
//                           <a 
//                             href={applicant.resumeUrl} 
//                             target="_blank" 
//                             rel="noopener noreferrer"
//                             className="text-blue-400 hover:text-blue-300 flex items-center"
//                           >
//                             <FiFileText className="mr-1" /> View
//                           </a>
//                         ) : (
//                           <span className="text-gray-500">Not available</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="px-6 py-8 text-center">
//                       <FiUser className="w-16 h-16 mx-auto text-gray-500" />
//                       <h3 className="mt-4 text-lg font-medium text-gray-300">No applicants found</h3>
//                       <p className="mt-2 text-gray-500">Try adjusting your filters</p>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  FiArrowLeft, FiDownload, FiUser, FiMail, FiPhone, FiFileText, 
  FiFilter, FiX, FiSearch, FiChevronDown, FiChevronUp, 
  FiBriefcase, FiMapPin, FiDollarSign, FiClock, FiRefreshCw,
  FiAlertCircle
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getJobWithApplicants, updateApplicationStatus } from "../../features/jobSlice";
import * as XLSX from 'xlsx';

// Memoized Applicant Card Component
const ApplicantCard = React.memo(({ 
  applicant, 
  onStatusUpdate, 
  isExpanded, 
  onToggle 
}) => {
  const statusColors = {
    applied: 'bg-blue-100 text-blue-800',
    reviewed: 'bg-yellow-100 text-yellow-800',
    interview: 'bg-purple-100 text-purple-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };


  console.log(applicant)

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all hover:shadow-md">
      <div 
        className="bg-white p-4 cursor-pointer flex justify-between items-center"
        onClick={() => onToggle(applicant._id)}
      >
        <div className="flex items-center gap-4">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
            <FiUser className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <div className="font-medium text-gray-900 truncate max-w-[180px]">
              {applicant?.seeker?.name || 'Unnamed Applicant'}
            </div>
            <div className="text-sm text-gray-600 truncate max-w-[180px]">
              {applicant?.seeker?.email}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                statusColors[applicant.companyStatus] || 'bg-gray-100 text-gray-800'
              }`}>
                {applicant.companyStatus}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(applicant.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <div className="text-xs text-gray-500">Experience</div>
            <div className="font-medium text-gray-900">
              {applicant?.seeker?.profile?.experience || 0} yrs
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            {isExpanded ? (
              <FiChevronUp size={20} />
            ) : (
              <FiChevronDown size={20} />
            )}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2 text-sm">Contact</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center">
                  <FiMail className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                  <span className="truncate">{applicant?.seeker?.email}</span>
                </div>
                <div className="flex items-center">
                  <FiPhone className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                  <span>{applicant?.seeker?.profile?.phone || 'Not provided'}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2 text-sm">Skills</h4>
              <div className="flex flex-wrap gap-1">
                {(applicant?.seeker?.profile?.skills || []).slice(0, 5).map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2 text-sm">Update Status</h4>
              <select
                value={applicant.companyStatus}
                onChange={(e) => onStatusUpdate(applicant._id, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm"
              >
                <option value="applied">Applied</option>
                <option value="reviewed">Reviewed</option>
                <option value="interview">Interview</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2 text-sm">Resume</h4>
              {applicant.resumeUrl ? (
                <a 
                  href={applicant.resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                >
                  <FiFileText className="mr-1" /> View Resume
                </a>
              ) : (
                <span className="text-gray-500 text-sm">Not available</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default function JobApplicants() {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentJob, applicants, loading, error } = useSelector((state) => state.jobs);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    experienceMin: '',
    experienceMax: '',
    search: ''
  });
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [expandedApplicant, setExpandedApplicant] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Memoized job details
  const jobDetails = useMemo(() => {
    if (!currentJob) return null;
    
    return {
      title: currentJob.title,
      employmentType: currentJob.employmentType,
      location: currentJob.location,
      salaryRange: currentJob.salaryRange,
      description: currentJob.description,
      createdAt: new Date(currentJob.createdAt).toLocaleDateString(),
      experienceRequired: currentJob.experienceRequired,
      status: currentJob.status
    };
  }, [currentJob]);

  // Fetch job applicants
  useEffect(() => {
    if (jobId) {
     
      dispatch(getJobWithApplicants(jobId));
    }
  }, [dispatch, jobId]);
  console.log(applicants, "currentJob");

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    dispatch(getJobWithApplicants(jobId)).finally(() => {
      setIsRefreshing(false);
    });
  }, [dispatch, jobId]);

  // Filter and memoize applicants
  const filteredApplicants = useMemo(() => {
    if (!applicants) return [];
    
    let result = [...applicants];
    
    // Status filter
    if (filters.status) {
      result = result.filter(app => app.companyStatus === filters.status);
    }
    
    // Experience filter
    if (filters.experienceMin) {
      result = result.filter(app => app?.seeker?.profile?.experience >= parseInt(filters.experienceMin));
    }
    if (filters.experienceMax) {
      result = result.filter(app => app?.seeker?.profile?.experience <= parseInt(filters.experienceMax));
    }
    
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(app => 
        app?.seeker?.name?.toLowerCase().includes(searchTerm) ||
        app?.seeker?.email?.toLowerCase().includes(searchTerm) ||
        (app?.seeker?.profile?.skills || []).some(skill => skill.toLowerCase().includes(searchTerm))
      )
    }
    
    return result;
  }, [applicants, filters]);

  // Status options
  const statusOptions = useMemo(() => [
    'All', 'applied', 'reviewed', 'interview', 'accepted', 'rejected'
  ], []);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      status: '',
      experienceMin: '',
      experienceMax: '',
      search: ''
    });
  }, []);

  const downloadExcel = useCallback(() => {
    if (!filteredApplicants.length) return;
    
    const data = filteredApplicants.map(applicant => ({
      "Name": applicant?.seeker?.name,
      "Email": applicant?.seeker?.email,
      "Phone": applicant?.seeker?.profile?.phone || 'N/A',
      "Experience": `${applicant?.seeker?.profile?.experience || 0} years`,
      "Status": applicant.companyStatus,
      "Applied On": new Date(applicant.createdAt).toLocaleDateString(),
      "Skills": (applicant?.seeker?.profile?.skills || []).join(', '),
      "Resume": applicant.resumeUrl ? "Available" : "Not Available"
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");
    XLSX.writeFile(workbook, `${currentJob.title.replace(/\s+/g, '_')}_Applicants.xlsx`);
  }, [filteredApplicants, currentJob]);

  const handleStatusUpdate = useCallback(async (applicationId, newStatus) => {
    try {
      await dispatch(updateApplicationStatus({ applicationId, status: newStatus }));
      handleRefresh();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  }, [dispatch, handleRefresh]);

  const toggleApplicantDetails = useCallback((id) => {
    setExpandedApplicant(prev => prev === id ? null : id);
  }, []);

  // Loading state
  if (loading && !currentJob) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm border border-red-200">
          <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <FiAlertCircle size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mt-4">Error Loading Data</h3>
          <p className="text-gray-600 mt-2">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleRefresh}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Job not found state
  if (!currentJob) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Job Not Found</h3>
          <p className="text-gray-600">The job you are looking for does not exist.</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FiArrowLeft className="mr-2" /> Back
          </button>
          
          <button 
            onClick={handleRefresh}
            className="flex items-center text-gray-600 hover:text-gray-800"
            disabled={isRefreshing}
          >
            <FiRefreshCw className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Job Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex-1 min-w-[260px]">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 truncate">
                {jobDetails.title}
              </h1>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="flex items-center bg-blue-100 text-blue-800 px-2.5 py-1 rounded-lg text-xs">
                  <FiBriefcase className="mr-1.5" /> {jobDetails.employmentType}
                </span>
                <span className="flex items-center bg-purple-100 text-purple-800 px-2.5 py-1 rounded-lg text-xs">
                  <FiMapPin className="mr-1.5" /> {jobDetails.location}
                </span>
                {jobDetails.salaryRange && (
                  <span className="flex items-center bg-green-100 text-green-800 px-2.5 py-1 rounded-lg text-xs">
                    <FiDollarSign className="mr-1.5" /> {jobDetails.salaryRange}
                  </span>
                )}
              </div>
           <div className="mb-3">
  <p className={`text-gray-600 text-sm ${showFullDescription ? '' : 'line-clamp-5'}`}>
    {jobDetails.description}
  </p>
  {jobDetails.description && jobDetails.description.length > 200 && (
    <button
      onClick={() => setShowFullDescription(!showFullDescription)}
      className="text-blue-600 hover:text-blue-800 text-xs mt-1"
    >
      {showFullDescription ? 'Show less' : 'Read more'}
    </button>
  )}
</div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-xl min-w-[220px] border border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Job Details</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted:</span>
                  <span className="text-gray-900 font-medium">
                    {jobDetails.createdAt}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience:</span>
                  <span className="text-gray-900 font-medium">
                    {jobDetails.experienceRequired}+ years
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Applicants:</span>
                  <span className="text-gray-900 font-medium">
                    {/* {applicants.length} */}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    jobDetails.status === 'Open' ? 'bg-green-100 text-green-800' :
                    jobDetails.status === 'Closed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {jobDetails.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applicants Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Applicants ({filteredApplicants.length})
              </h2>
              <p className="text-gray-500 text-xs">
                Filter and manage applications
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-3 py-1.5 rounded-lg flex items-center text-xs font-medium ${
                  showFilterPanel 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setShowFilterPanel(!showFilterPanel)}
              >
                <FiFilter className="mr-1.5" /> 
                {showFilterPanel ? "Hide Filters" : "Filters"}
              </button>
              
              <button 
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg flex items-center text-xs font-medium hover:bg-blue-700 transition-colors"
                onClick={downloadExcel}
                disabled={!filteredApplicants.length}
              >
                <FiDownload className="mr-1.5" /> Export
              </button>
            </div>
          </div>

          {/* Quick Status Filter */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {statusOptions.map(status => (
              <button
                key={status}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  filters.status === (status === 'All' ? '' : status)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => {
                  setFilters(prev => ({ 
                    ...prev, 
                    status: status === 'All' ? '' : status 
                  }));
                }}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search and Filters Panel */}
          {showFilterPanel && (
            <div className="bg-gray-50 rounded-lg p-4 mb-5 border border-gray-200">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Search Applicants
                  </label>
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="search"
                      placeholder="Name, email, or skills"
                      value={filters.search}
                      onChange={handleFilterChange}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 text-gray-700"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Min Experience
                    </label>
                    <input
                      type="number"
                      name="experienceMin"
                      placeholder="Min"
                      min="0"
                      value={filters.experienceMin}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Max Experience
                    </label>
                    <input
                      type="number"
                      name="experienceMax"
                      placeholder="Max"
                      min="0"
                      value={filters.experienceMax}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 text-gray-700"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 pt-1">
                  <button
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-xs font-medium"
                    onClick={resetFilters}
                  >
                    Reset
                  </button>
                  <button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-medium"
                    onClick={() => setShowFilterPanel(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {filters.status && (
              <span className="flex items-center bg-blue-100 text-blue-800 px-2.5 py-1 rounded-lg text-xs">
                Status: {filters.status}
                <button
                  className="ml-1.5 text-blue-800 hover:text-blue-900"
                  onClick={() => setFilters(prev => ({ ...prev, status: '' }))}
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {(filters.experienceMin || filters.experienceMax) && (
              <span className="flex items-center bg-blue-100 text-blue-800 px-2.5 py-1 rounded-lg text-xs">
                Exp: {filters.experienceMin || 0}-{filters.experienceMax || '∞'}yrs
                <button
                  className="ml-1.5 text-blue-800 hover:text-blue-900"
                  onClick={() => setFilters(prev => ({ 
                    ...prev, 
                    experienceMin: '', 
                    experienceMax: '' 
                  }))}
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {filters.search && (
              <span className="flex items-center bg-blue-100 text-blue-800 px-2.5 py-1 rounded-lg text-xs">
                Search: {filters.search}
                <button
                  className="ml-1.5 text-blue-800 hover:text-blue-900"
                  onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {/* Applicants List */}
          <div className="space-y-3">
            {filteredApplicants.length > 0 ? (
              filteredApplicants.map(applicant => (
                <ApplicantCard 
                  key={applicant._id}
                  applicant={applicant}
                  onStatusUpdate={handleStatusUpdate}
                  isExpanded={expandedApplicant === applicant._id}
                  onToggle={toggleApplicantDetails}
                />
              ))
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <FiUser className="w-12 h-12 mx-auto text-gray-400" />
                <h3 className="mt-3 text-base font-medium text-gray-900">No applicants found</h3>
                <p className="mt-1 text-gray-600 text-sm">Try adjusting your filters</p>
                <button
                  className="mt-3 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}