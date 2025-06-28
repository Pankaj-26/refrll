import React, { useState } from "react";
import { FiX, FiUserPlus, FiMail } from "react-icons/fi";

const ReferralModal = ({ job, onClose, onConfirm, defaultContact = "" }) => {
  const [contactInfo, setContactInfo] = useState(defaultContact);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!contactInfo.trim()) {
      setError("Please provide contact information");
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo) && !/^\+?[1-9]\d{1,14}$/.test(contactInfo)) {
      setError("Please enter a valid email or phone number");
      return;
    }
    
    onConfirm(contactInfo);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-teal-500">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              <FiUserPlus className="inline mr-2 text-teal-500" />
              Refer This Job
            </h3>
            <button
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              onClick={onClose}
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-4">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              You're claiming{" "}
              <span className="font-semibold text-teal-600 dark:text-teal-400">
                {job.title}
              </span>{" "}
              at {job.company} to refer candidates.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Your contact information will be visible to job seekers.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-400 text-sm mb-2">
                  Contact Information
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3.5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Email or phone number"
                    value={contactInfo}
                    onChange={(e) => {
                      setContactInfo(e.target.value);
                      setError("");
                    }}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-lg font-medium"
                >
                  Confirm Referral
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralModal;