
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
          className="bg-white dark:bg-gray-800 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Header with gradient */}
          {/* <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-2xl p-6 relative">
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
          </div> */}


          {/* Header with gradient */}
<div className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 px-4 py-4 relative">
  <div className="flex justify-between items-start">
    <div className="flex items-start gap-3">
      <div className="bg-white p-1 rounded-lg shadow">
        <FiBriefcase className="w-10 h-10 text-blue-600" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-white">{selectedJob.title}</h2>
        <div className="flex items-center text-blue-100 text-sm mt-1 flex-wrap gap-2">
          <span className="font-medium">{selectedJob.company}</span>
          <span className="flex items-center gap-1">
            <FiMapPin className="text-sm" />
            {selectedJob.location}
          </span>
        </div>
      </div>
    </div>

    <button 
      onClick={() => setSelectedJob(null)}
      className="text-white p-2 rounded-full hover:bg-indigo-800 transition-colors"
    >
      <FiX size={20} />
    </button>
  </div>

  <div className="flex flex-wrap gap-2 mt-3">
    <div className="bg-blue-800/40 backdrop-blur-sm px-3 py-1 rounded-full flex items-center text-white text-xs">
      <FiBriefcase className="mr-1" />
      {selectedJob.employmentType}
    </div>
    <div className="bg-blue-800/40 backdrop-blur-sm px-3 py-1 rounded-full flex items-center text-white text-xs">
      <FiUser className="mr-1" />
      {selectedJob.experienceRequired}+ yrs
    </div>
    <div className="bg-blue-800/40 backdrop-blur-sm px-3 py-1 rounded-full flex items-center text-white text-xs">
    
      <BiRupee className="mr-1" />

      {selectedJob.salaryRange} LPA
    </div>
    <div className="bg-blue-800/40 backdrop-blur-sm px-3 py-1 rounded-full flex items-center text-white text-xs">
      <FiCalendar className="mr-1" />
      {formatDate(selectedJob.createdAt)}
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
                
                <div className="mb-2">
                  <h5 className="text-medium font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FiStar className="text-amber-500" />
                    Required Skills
                  </h5>
                  <div className="flex flex-wrap gap-3">
                    {selectedJob.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full font-medium flex items-center text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/3">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700">
                  <h3 className="text-medium font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FiCalendar className="text-indigo-600" />
                    Application Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex text-sm justify-between items-center py-1 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">Posted By</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedJob.postedByType}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-1 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">Posted On</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formatDate(selectedJob.createdAt)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-1">
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