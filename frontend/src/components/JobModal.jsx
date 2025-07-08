// import React, { useState } from 'react';
// import { FiBriefcase, FiMapPin, FiDollarSign, FiClock, FiUser, FiX, FiExternalLink, FiBookmark, FiShare2, FiMail, FiPhone, FiGlobe } from 'react-icons/fi';
// import ShareJob from "../components/ShareJob"
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { BiRupee } from 'react-icons/bi';
// const JobModal = (selectedJob,setSelectedJob) => {


// const navigate=useNavigate()
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };


//   const handleCloseModal = () => {
   
//   selectedJob.setSelectedJob(null);
// };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">      
//       {/* Job Details Modal */}
     
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
//               <div className="flex justify-between items-center p-6">
//                 <h2 className="text-2xl font-bold text-gray-900">{selectedJob?.selectedJob?.title}</h2>
//                 <button 
//                 //   onClick={() => selectedJob.setSelectedJob(null)} 
//                   onClick={handleCloseModal} 

//                   className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
//                 >
//                   <FiX size={24} />
//                 </button>
//               </div>
//             </div>
            
//             <div className="p-6">
//               <div className="flex flex-col md:flex-row gap-6">
//                 <div className="md:w-2/3">
//                   <div className="flex items-center gap-4 mb-6">
//                     <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900">{selectedJob?.selectedJob?.company}</h3>
//                       {/* <div className="flex items-center text-gray-600 mt-1">
//                         <FiGlobe className="mr-2" />
//                         <span>www.wipro.com</span>
//                       </div> */}
//                     </div>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <h4 className="text-sm font-semibold text-gray-500 mb-2">JOB TYPE</h4>
//                       <div className="flex items-center">
//                         <FiClock className="mr-2 text-gray-500" />
//                         <span className="text-gray-900">{selectedJob?.selectedJob?.employmentType}</span>
//                       </div>
//                     </div>
                    
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <h4 className="text-sm font-semibold text-gray-500 mb-2">EXPERIENCE</h4>
//                       <div className="flex items-center">
//                         <FiUser className="mr-2 text-gray-500" />
//                         <span className="text-gray-900">{selectedJob?.selectedJob?.experienceRequired}+ years</span>
//                       </div>
//                     </div>
                    
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <h4 className="text-sm font-semibold text-gray-500 mb-2">LOCATION</h4>
//                       <div className="flex items-center">
//                         <FiMapPin className="mr-2 text-gray-500" />
//                         <span className="text-gray-900">{selectedJob?.selectedJob?.location}</span>
//                       </div>
//                     </div>
                    
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <h4 className="text-sm font-semibold text-gray-500 mb-2">SALARY</h4>
//                       <div className="flex items-center">
                     
//                          <BiRupee className=" text-gray-500"/>
//                         <span className="text-gray-900">{selectedJob?.selectedJob?.salaryRange} LPA</span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="mb-8">
//                     <h3 className="text-lg font-bold text-gray-900 mb-4">Job Description</h3>
//                     <div className="prose max-w-none text-gray-700">
//                       {selectedJob?.selectedJob?.description .split('\n\n').map((paragraph, index) => (
//                         <p key={index} className="mb-4">{paragraph}</p>
//                       ))}
                     
//                     </div>
//                   </div>
                  
//                   <div className="mb-8">
//                     <h3 className="text-lg font-bold text-gray-900 mb-4">Required Skills</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedJob?.selectedJob?.skills.map((skill, index) => (
//                         <span key={index} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="md:w-1/3">
//                   <div className="bg-blue-50 rounded-xl p-6 mb-6">
//                     <h3 className="text-lg font-bold text-gray-900 mb-4">Application Details</h3>
                    
//                     <div className="space-y-4">
//                       {/* <div>
//                         <p className="text-sm text-gray-500">Application Limit</p>
//                         <p className="font-medium">{selectedJob.applicationLimit} applicants</p>
//                       </div> */}
                      
//                       <div>
//                         <p className="text-sm text-gray-500">Posted By</p>
//                         <p className="font-medium">{selectedJob?.selectedJob?.postedByType}</p>
//                       </div>
                      
//                       <div>
//                         <p className="text-sm text-gray-500">Posted On</p>
//                         <p className="font-medium">{formatDate(selectedJob?.selectedJob?.createdAt)}</p>
//                       </div>
                      
//                       <div>
//                         <p className="text-sm text-gray-500">Last Updated</p>
//                         <p className="font-medium">{formatDate(selectedJob?.selectedJob?.updatedAt)}</p>
//                       </div>
//                     </div>
                    
//                     <div className="mt-6 space-y-3">
//                       {/* <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center">
//                         <FiMail className="mr-2" /> Contact Recruiter
//                       </button> */}
                      
//                       {/* <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-medium flex items-center justify-center" onClick={() => setShowShareOptions(!showShareOptions)}>
//                         <FiShare2 className="mr-2" /> Share Job
//                       </button> */}

//                     </div>
//                         {/* {showShareOptions && <ShareJob jobUrl={jobUrl} />} */}
//                   </div>
                  
//                   {/* <div className="bg-gray-50 rounded-xl p-6">
//                     <h3 className="text-lg font-bold text-gray-900 mb-4">About {selectedJob.company}</h3>
//                     <p className="text-gray-700 mb-4">
//                       Wipro is a leading global information technology, consulting and business process services company. 
//                       We harness the power of cognitive computing, hyper-automation, robotics, cloud, analytics and 
//                       emerging technologies to help our clients adapt to the digital world and make them successful.
//                     </p>
//                     <div className="flex gap-3">
//                       <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
//                         <FiGlobe className="mr-1" /> Website
//                       </button>
//                       <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
//                         <FiPhone className="mr-1" /> Contact
//                       </button>
//                     </div>
//                   </div> */}
//                 </div>
//               </div>
//             </div>
            
//             <div className="border-t border-gray-200 p-6 bg-gray-50 sticky bottom-0">
//               <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//                 <div>
//                   <h3 className="font-bold text-gray-900">{selectedJob?.selectedJob?.title}</h3>
//                   <p className="text-gray-600">{selectedJob?.selectedJob?.company} • {selectedJob?.selectedJob?.location}</p>
//                 </div>
//                 <div className="flex gap-3">
//                   {/* <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium">
//                     <FiBookmark className="inline mr-2" /> Save Job
//                   </button> */}
//                   {/* <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium">
//                     Apply Now
//                   </button> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
    
//     </div>
//   );
// };

// export default JobModal;



import React, { useState } from 'react';
import { 
  FiBriefcase, FiMapPin, FiClock, FiUser, FiX, 
  FiExternalLink, FiBookmark, FiShare2, FiMail, 
  FiPhone, FiGlobe, FiStar, FiAward, FiCalendar, 
  FiDollarSign 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { BiRupee } from 'react-icons/bi';

const JobModal = ({ selectedJob, setSelectedJob }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedJob(null);
    }
  };

  const toggleSaveJob = () => {
    setIsSaved(!isSaved);
    // Here you would typically connect to your backend
  };

  if (!selectedJob) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
        onClick={handleCloseModal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-2xl p-6 relative">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-xl shadow-md">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedJob.title}</h2>
                  <div className="flex items-center text-blue-100 mt-2">
                    <span className="font-medium">{selectedJob.company}</span>
                    <span className="mx-2">•</span>
                    <FiMapPin className="mr-1" />
                    <span>{selectedJob.location}</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedJob(null)}
                className="text-white p-2 rounded-full hover:bg-indigo-800 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="bg-blue-800/30 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center text-white text-sm">
                <FiBriefcase className="mr-2" />
                {selectedJob.employmentType}
              </div>
              <div className="bg-blue-800/30 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center text-white text-sm">
                <FiUser className="mr-2" />
                {selectedJob.experienceRequired}+ years
              </div>
              <div className="bg-blue-800/30 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center text-white text-sm">
                <FiDollarSign className="mr-2" />
                {selectedJob.salaryRange} LPA
              </div>
              <div className="bg-blue-800/30 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center text-white text-sm">
                <FiCalendar className="mr-2" />
                Posted {formatDate(selectedJob.createdAt)}
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FiAward className="text-indigo-600" />
                    Job Description
                  </h3>
                  <div className="prose max-w-none text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
                    {selectedJob.description.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FiStar className="text-amber-500" />
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedJob.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full font-medium flex items-center"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/3">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FiCalendar className="text-indigo-600" />
                    Application Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">Posted By</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedJob.postedByType}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">Posted On</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formatDate(selectedJob.createdAt)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 dark:text-gray-300">Last Updated</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formatDate(selectedJob.updatedAt)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    {/* <button 
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-xl font-medium flex items-center justify-center shadow-md shadow-blue-500/20 transition-all"
                    >
                      Apply Now
                    </button> */}
                    
                    {/* <div className="flex gap-3">
                      <button 
                        onClick={toggleSaveJob}
                        className={`flex-1 py-2.5 rounded-xl font-medium flex items-center justify-center border transition-all ${
                          isSaved 
                            ? 'bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-300'
                            : 'border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <FiBookmark className={`mr-2 ${isSaved ? 'fill-amber-500' : ''}`} />
                        {isSaved ? 'Saved' : 'Save'}
                      </button>
                      
                      <button 
                        onClick={() => setShowShareOptions(!showShareOptions)}
                        className={`flex-1 py-2.5 rounded-xl font-medium flex items-center justify-center border transition-all ${
                          showShareOptions 
                            ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300'
                            : 'border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <FiShare2 className="mr-2" />
                        Share
                      </button>
                    </div> */}
                    
                    {showShareOptions && (
                      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Share this job</h4>
                        <div className="flex gap-3">
                          <button className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">
                            <FiMail className="text-gray-700 dark:text-gray-300" />
                          </button>
                          <button className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">
                            <FiPhone className="text-gray-700 dark:text-gray-300" />
                          </button>
                          <button className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">
                            <FiGlobe className="text-gray-700 dark:text-gray-300" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700 mt-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FiGlobe className="text-purple-600" />
                    About {selectedJob.company}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {selectedJob.company} is a leading organization in its industry, known for innovation and excellence. 
                    They provide a dynamic work environment that fosters creativity and professional growth.
                  </p>
                  <div className="flex gap-3">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center text-sm font-medium">
                      <FiGlobe className="mr-1" /> Website
                    </button>
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center text-sm font-medium">
                      <FiPhone className="mr-1" /> Contact
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-800/50 sticky bottom-0 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{selectedJob.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{selectedJob.company} • {selectedJob.location}</p>
              </div>
              <div className="flex gap-3">
                {/* <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium flex items-center">
                  <FiBookmark className="mr-2" /> Save Job
                </button> */}
                {/* <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 rounded-xl text-white font-medium shadow-md shadow-blue-500/30">
                  Apply Now
                </button> */}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default JobModal;