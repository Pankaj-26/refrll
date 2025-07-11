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
