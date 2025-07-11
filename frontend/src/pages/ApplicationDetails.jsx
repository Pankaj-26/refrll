
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiExternalLink,
  FiCalendar,
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiClock,
  FiFileText,
  FiCheck,
  FiBookmark,
  FiShare2,
  FiUser,
  FiMail,
  FiChevronRight,
  FiEdit2,
  FiCheckCircle
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getJobDetailForSeeker } from "../features/jobSlice";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notes, setNotes] = useState("");
  const [prepCompleted, setPrepCompleted] = useState({
    research: false,
    questions: false,
    resume: false,
  });
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const { currentJob } = useSelector((state) => state.jobs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    document.title = "Application Details";
  },[])

  useEffect(() => {

    try {
      setLoading(true);
      dispatch(getJobDetailForSeeker(id));
    } catch (err) {
      setError("Failed to fetch applications. Please try again later.");
      console.error("Fetch applications error:", err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800";
      case "reviewed":
        return "bg-purple-100 text-purple-800";
      case "interview":
        return "bg-amber-100 text-amber-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "hired":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not scheduled";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlePrepToggle = (prepType) => {
    setPrepCompleted((prev) => ({
      ...prev,
      [prepType]: !prev[prepType],
    }));
  };

  const handleSaveNotes = () => {
    setIsEditingNotes(false);
    localStorage.setItem(`jobNotes-${id}`, notes);
  };

  if (loading || !currentJob) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-xl border border-red-200 shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiExternalLink className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error loading application</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:opacity-90 transition-opacity"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const status = currentJob.companyStatus || currentJob.referrerStatus || "applied";
  const statusColor = getStatusColor(status);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FiArrowLeft className="mr-2" /> Back to Applications
          </button>
          
          <div className="flex gap-3">
            <a
              href={currentJob.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiFileText className="w-5 h-5" /> View Resume
            </a>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <FiShare2 className="w-5 h-5" /> Share
            </button>
          </div>
        </div>

        {/* Application Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Applied on {new Date(currentJob.createdAt).toLocaleDateString()}
                  </span>
                  {currentJob.appliedViaReferral && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                      Applied via Referral
                    </span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {currentJob?.job?.title}
                </h1>
                <p className="text-xl text-blue-600 font-medium">at {currentJob?.job?.company}</p>
              </div>
              
              <div className="bg-gray-100 p-3 rounded-xl min-w-[200px]">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 text-sm">Experience:</span>
                  <span className="text-gray-900 font-medium">
                    {currentJob.job.experienceRequired || "Not specified"}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 text-sm">Salary:</span>
                  <span className="text-gray-900 font-medium">
                    {currentJob.job.salaryRange || "Not specified"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Type:</span>
                  <span className="text-gray-900 font-medium">
                    {currentJob.job.employmentType || "Not specified"}
                  </span>
                </div>
              </div>
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <FiMapPin className="text-blue-600 w-6 h-6 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-600">Location</p>
                  <p className="font-medium text-gray-900">
                    {currentJob.job.location || "Not specified"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <FiCalendar className="text-purple-600 w-6 h-6 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-600">Applied Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(currentJob.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                <FiClock className="text-amber-600 w-6 h-6 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-600">Status</p>
                  <p className="font-medium text-gray-900 capitalize">
                    {status}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Job Description Section */}
          <div className="border-t border-gray-200 p-6 md:p-8 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Job Description</h2>
              <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                <FiBookmark className="w-4 h-4" /> Save Job
              </button>
            </div>
            
            <div className="prose max-w-none text-gray-700 mb-8">
              <p>{currentJob?.job.description || "No description provided"}</p>
            </div>
            
            {currentJob.job.skills?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {currentJob.job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interview Preparation Section */}
        {status === "interview" && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6 md:p-8 mb-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl w-14 h-14 flex items-center justify-center">
                <FiCalendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Interview Preparation</h2>
                <p className="text-gray-600">Get ready for your upcoming interview</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Interview Details */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FiCalendar className="text-amber-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Date & Time</p>
                      <p className="font-medium text-gray-900">
                        {formatDate(currentJob?.interviewDate)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <FiUser className="text-amber-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Interviewer</p>
                      <p className="font-medium text-gray-900">
                        {currentJob?.interviewer || "Not specified"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <FiMail className="text-amber-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Contact</p>
                      <p className="font-medium text-gray-900">
                        {currentJob?.contactEmail || "Not specified"}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Additional Information</p>
                    <p className="text-gray-700 bg-amber-50 p-3 rounded-lg">
                      {currentJob?.interviewDetails || "No additional details provided"}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Preparation Checklist */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preparation Checklist</h3>
                
                <div className="space-y-4">
                  {[
                    { id: "research", label: "Research company & role" },
                    { id: "questions", label: "Prepare 5+ questions to ask" },
                    { id: "resume", label: "Review resume & portfolio" }
                  ].map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                        prepCompleted[item.id]
                          ? "bg-green-50 border border-green-200"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                      onClick={() => handlePrepToggle(item.id)}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          prepCompleted[item.id]
                            ? "bg-green-500 text-white"
                            : "bg-white border-2 border-gray-300"
                        }`}
                      >
                        {prepCompleted[item.id] && <FiCheck className="w-4 h-4" />}
                      </div>
                      <span
                        className={
                          prepCompleted[item.id] ? "text-green-700 font-medium" : "text-gray-700"
                        }
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Preparation Progress</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2.5 rounded-full" 
                        style={{ width: `${Object.values(prepCompleted).filter(v => v).length / 3 * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-sm text-gray-600 mt-1">
                      {Object.values(prepCompleted).filter(v => v).length} of 3 completed
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Resources */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preparation Resources</h3>
                
                <div className="space-y-4">
                  {[
                    {
                      title: "Common Interview Questions",
                      description: "50+ common technical and behavioral questions",
                      icon: <FiUser className="w-5 h-5 text-blue-500" />
                    },
                    {
                      title: "Company Culture Guide",
                      description: "Learn about company values and work environment",
                      icon: <FiBriefcase className="w-5 h-5 text-purple-500" />
                    },
                    {
                      title: "Salary Negotiation Tips",
                      description: "How to negotiate for maximum compensation",
                      icon: <FiDollarSign className="w-5 h-5 text-green-500" />
                    }
                  ].map((resource, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          {resource.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-blue-600">
                            {resource.title}
                          </div>
                          <div className="text-sm text-gray-600">
                            {resource.description}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes and Next Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Notes */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Personal Notes</h2>
              {isEditingNotes ? (
                <button 
                  onClick={handleSaveNotes}
                  className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-sm"
                >
                  Save Notes
                </button>
              ) : (
                <button 
                  onClick={() => setIsEditingNotes(true)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  <FiEdit2 className="w-4 h-4" /> Edit Notes
                </button>
              )}
            </div>
            
            {isEditingNotes ? (
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your private notes about this application, interview preparation, or follow-up actions..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="bg-gray-50 rounded-xl p-4 min-h-[150px] border border-dashed border-gray-300">
                {notes ? (
                  <p className="text-gray-700 whitespace-pre-line">{notes}</p>
                ) : (
                  <p className="text-gray-500 italic">No notes yet. Click 'Edit Notes' to add your thoughts about this application.</p>
                )}
              </div>
            )}
          </div>
          
          {/* Next Steps */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Next Steps</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-blue-700 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Prepare for the interview</h3>
                  <p className="text-gray-600 text-sm">Review the company, role requirements, and practice common questions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-purple-700 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Follow up professionally</h3>
                  <p className="text-gray-600 text-sm">Send a thank you email within 24 hours after the interview</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-green-700 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Update your profile</h3>
                  <p className="text-gray-600 text-sm">Add any new skills or experiences gained during the process</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;