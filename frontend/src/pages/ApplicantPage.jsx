import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaFilePdf } from "react-icons/fa";


const ApplicantPage = () => {
  const applicant = {
    name: 'John Doe',
    email: 'john@example.com',
    resume: '#',
    skills: ['React', 'Node.js', 'TypeScript'],
    appliedJobs: [
      { jobTitle: 'Senior React Developer', status: 'Pending', appliedDate: '2025-05-20' }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto p-6 pt-20">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-4">{applicant.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Contact Information</h3>
            <p>Email: {applicant.email}</p>
            <a href={applicant.resume} className="text-blue-600 flex items-center gap-2 mt-2">
              <FaFilePdf /> View Resume
            </a>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {applicant.skills.map(skill => (
                <span key={skill} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantPage;