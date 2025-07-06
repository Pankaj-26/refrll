import React, { useState } from 'react';
import { FiBriefcase, FiMapPin, FiDollarSign, FiClock, FiUser, FiX, FiExternalLink, FiBookmark, FiShare2, FiMail, FiPhone, FiGlobe } from 'react-icons/fi';
import ShareJob from "../components/ShareJob"
import { useNavigate, useSearchParams } from 'react-router-dom';
const JobModal = (selectedJob,setSelectedJob) => {

// const [showShareOptions, setShowShareOptions] = useState(false);
const navigate=useNavigate()
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


  const handleCloseModal = () => {
   
  selectedJob.setSelectedJob(null);
};

  return (
    <div className="min-h-screen bg-gray-50 p-6">      
      {/* Job Details Modal */}
     
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
              <div className="flex justify-between items-center p-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedJob.selectedJob.title}</h2>
                <button 
                //   onClick={() => selectedJob.setSelectedJob(null)} 
                  onClick={handleCloseModal} 

                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                >
                  <FiX size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedJob.selectedJob.company}</h3>
                      {/* <div className="flex items-center text-gray-600 mt-1">
                        <FiGlobe className="mr-2" />
                        <span>www.wipro.com</span>
                      </div> */}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">JOB TYPE</h4>
                      <div className="flex items-center">
                        <FiClock className="mr-2 text-gray-500" />
                        <span className="text-gray-900">{selectedJob.selectedJob.employmentType}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">EXPERIENCE</h4>
                      <div className="flex items-center">
                        <FiUser className="mr-2 text-gray-500" />
                        <span className="text-gray-900">{selectedJob.selectedJob.experienceRequired}+ years</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">LOCATION</h4>
                      <div className="flex items-center">
                        <FiMapPin className="mr-2 text-gray-500" />
                        <span className="text-gray-900">{selectedJob.selectedJob.location}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">SALARY</h4>
                      <div className="flex items-center">
                        <FiDollarSign className="mr-2 text-gray-500" />
                        <span className="text-gray-900">{selectedJob.selectedJob.salaryRange}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Job Description</h3>
                    <div className="prose max-w-none text-gray-700">
                      {selectedJob.selectedJob.description .split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                      ))}
                     
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.selectedJob.skills.map((skill, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/3">
                  <div className="bg-blue-50 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Application Details</h3>
                    
                    <div className="space-y-4">
                      {/* <div>
                        <p className="text-sm text-gray-500">Application Limit</p>
                        <p className="font-medium">{selectedJob.applicationLimit} applicants</p>
                      </div> */}
                      
                      <div>
                        <p className="text-sm text-gray-500">Posted By</p>
                        <p className="font-medium">({selectedJob.selectedJob.postedByType})</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Posted On</p>
                        <p className="font-medium">{formatDate(selectedJob.selectedJob.createdAt)}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Last Updated</p>
                        <p className="font-medium">{formatDate(selectedJob.selectedJob.updatedAt)}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      {/* <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center">
                        <FiMail className="mr-2" /> Contact Recruiter
                      </button> */}
                      
                      {/* <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-medium flex items-center justify-center" onClick={() => setShowShareOptions(!showShareOptions)}>
                        <FiShare2 className="mr-2" /> Share Job
                      </button> */}

                    </div>
                        {/* {showShareOptions && <ShareJob jobUrl={jobUrl} />} */}
                  </div>
                  
                  {/* <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">About {selectedJob.company}</h3>
                    <p className="text-gray-700 mb-4">
                      Wipro is a leading global information technology, consulting and business process services company. 
                      We harness the power of cognitive computing, hyper-automation, robotics, cloud, analytics and 
                      emerging technologies to help our clients adapt to the digital world and make them successful.
                    </p>
                    <div className="flex gap-3">
                      <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                        <FiGlobe className="mr-1" /> Website
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                        <FiPhone className="mr-1" /> Contact
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 p-6 bg-gray-50 sticky bottom-0">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="font-bold text-gray-900">{selectedJob.selectedJob.title}</h3>
                  <p className="text-gray-600">{selectedJob.selectedJob.company} • {selectedJob.selectedJob.location}</p>
                </div>
                <div className="flex gap-3">
                  {/* <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium">
                    <FiBookmark className="inline mr-2" /> Save Job
                  </button> */}
                  {/* <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium">
                    Apply Now
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
    
    </div>
  );
};

export default JobModal;



