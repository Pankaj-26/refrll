import React, { useState } from "react";
import {
  FiUser,
  FiFileText,
  FiMail,
  FiPhone,
  FiLinkedin,
  FiChevronDown,
  FiChevronUp,
  FiDownload,
  FiMessageSquare,
} from "react-icons/fi";
import ReferrerStatusBadge from "./ReferrerStatusbadge";

const ReferrerApplicationCard = ({ app, onStatusUpdate, updating }) => {
  const [expanded, setExpanded] = useState(false);
  const [contactExpanded, setContactExpanded] = useState(false);

  const statusColors = {
    applied: "blue",
    reviewed: "purple",
    accepted: "green",
    rejected: "red",
  };

  const handleDownloadResume = (resumeUrl) => {
  const link = document.createElement("a");
  link.href = resumeUrl;
  link.download = "resume.pdf"; // Optional: specify filename e.g. "resume.pdf"
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};



  const applicant = app.seeker || {};
  const profile = app.seeker.profile || {};

  return (
    // <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-all">
    //   <div className="flex justify-between items-start">
    //     <div className="flex items-start gap-3">
    //       <div className="bg-blue-100 p-2 rounded-lg">
    //         <FiUser className="w-5 h-5 text-blue-600" />
    //       </div>
    //       <div>
    //         <h4 className="font-bold text-gray-900">
    //           {applicant.name || applicant.email || "Anonymous Applicant"}
    //         </h4>
    //         <p className="text-xs text-gray-500 mt-1">
    //           Applied: {new Date(application.createdAt).toLocaleDateString()}
    //         </p>
    //       </div>
    //     </div>
    //     <ReferrerStatusBadge
    //       status={application.referrerStatus}
    //       color={statusColors[application.referrerStatus]}
    //     />
    //   </div>

    //   <div className="mt-4">
    //     {profile.experience && (
    //       <div className="flex items-center text-sm text-gray-600 mb-2">
    //         <span className="font-medium mr-2">Experience:</span>
    //         {profile.experience} years
    //       </div>
    //     )}

    //     {profile.skills?.length > 0 && (
    //       <div>
    //         <div className="flex items-center justify-between mb-2">
    //           <span className="text-sm font-medium text-gray-600">Skills</span>
    //           <button
    //             className="text-xs text-blue-600 hover:text-blue-800"
    //             onClick={() => setExpanded(!expanded)}
    //           >
    //             {expanded ? "Show less" : "Show more"}
    //           </button>
    //         </div>
    //         <div className="flex flex-wrap gap-1">
    //           {profile.skills.slice(0, expanded ? undefined : 3).map((skill, i) => (
    //             <span
    //               key={i}
    //               className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-xs"
    //             >
    //               {skill}
    //             </span>
    //           ))}
    //         </div>
    //       </div>
    //     )}

    //     <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
    //       <div className="flex gap-2">
    //         <button
    //           className="p-1.5 text-gray-500 hover:text-blue-600"
    //           onClick={() => setContactExpanded(!contactExpanded)}
    //         >
    //           {contactExpanded ? <FiChevronUp /> : <FiChevronDown />}
    //         </button>

    //         {application?.seeker?.resume ? (
    //           <a
    //             href={application.seeker.resume.url}
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             className="p-1.5 text-gray-500 hover:text-blue-600"
    //             title="Download Resume"
    //           >
    //             <FiDownload />
    //           </a>
    //         ) : (
    //           <span className="p-1.5 text-gray-300 cursor-not-allowed" title="No resume available">
    //             <FiDownload />
    //           </span>
    //         )}
    //       </div>

    //       <div className="relative">
    //         <select
    //           value={application.status}
    //           onChange={(e) => onStatusUpdate(application._id, e.target.value)}
    //           disabled={updating}
    //           className={`pl-2 pr-8 py-1 text-sm rounded border border-gray-300 bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
    //             updating ? "opacity-70 cursor-not-allowed" : ""
    //           }`}
    //         >
    //           <option value="applied">Applied</option>
    //           <option value="reviewed">Reviewed</option>
    //           <option value="accepted">Accepted</option>
    //           <option value="rejected">Rejected</option>
    //         </select>
    //         <FiChevronDown
    //           className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
    //           size={14}
    //         />
    //       </div>
    //     </div>

    //     {contactExpanded && (
    //       <div className="mt-3 pt-3 border-t border-gray-100">
    //         <div className="grid grid-cols-2 gap-2">
    //           {applicant.email && (
    //             <a
    //               href={`mailto:${applicant.email}`}
    //               className="flex items-center text-sm text-gray-600 hover:text-blue-600"
    //             >
    //               <FiMail className="mr-2" /> {applicant.email}
    //             </a>
    //           )}
    //           {profile.phone && (
    //             <a
    //               href={`tel:${profile.phone}`}
    //               className="flex items-center text-sm text-gray-600 hover:text-blue-600"
    //             >
    //               <FiPhone className="mr-2" /> {profile.phone}
    //             </a>
    //           )}
    //           {profile.linkedIn && (
    //             <a
    //               href={profile.linkedIn}
    //               target="_blank"
    //               rel="noopener noreferrer"
    //               className="flex items-center text-sm text-gray-600 hover:text-blue-600"
    //             >
    //               <FiLinkedin className="mr-2" /> LinkedIn
    //             </a>
    //           )}
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>

    <div
      key={app._id}
      className="bg-white rounded-lg border border-gray-200 p-4"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-start gap-3">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
          <div>
            <h4 className="font-medium text-gray-900">
              {app.seeker?.name || "Applicant"}
            </h4>
            <div className="text-xs text-gray-500 flex items-center mt-1">
              <FiMail className="mr-1" size={12} />
              {app.seeker?.email || "No email"}
            </div>
          </div>
        </div>

        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            app.status === "applied"
              ? "bg-blue-100 text-blue-800"
              : app.status === "reviewed"
              ? "bg-purple-100 text-purple-800"
              : app.status === "accepted"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {app.status}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
       
        {app?.seeker?.resume ? (
    
           <button className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-1"  onClick={() => handleDownloadResume(app.seeker.resume.url)}>
          <FiDownload size={12} /> Resume
        </button>
        ) : (
          <span
            className="p-1.5 text-gray-300 cursor-not-allowed"
            title="No resume available"
          >
            <FiDownload />
          </span>
        )}
      
        <button className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-1">
          <FiPhone size={12} /> {profile.phone}
        </button>
      </div>

      {/* Status Update Section (Unchanged) */}
      <div className="border-t border-gray-100 pt-3">
        <div className="flex flex-wrap gap-1">
          {["applied", "reviewed", "accepted", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => onStatusUpdate(app._id, status)}
              disabled={updating === app._id}
              className={`text-xs px-2.5 py-1.5 rounded font-medium ${
                app.status === status
                  ? status === "applied"
                    ? "bg-blue-600 text-white"
                    : status === "reviewed"
                    ? "bg-purple-600 text-white"
                    : status === "accepted"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {updating === app._id && status === app.status && (
                <FiRefreshCw className="ml-1 inline animate-spin" size={12} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferrerApplicationCard;
