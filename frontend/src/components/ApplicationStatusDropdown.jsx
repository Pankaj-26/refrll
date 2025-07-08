
// src/components/ApplicationStatusDropdown.jsx
import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

const statusOptions = [
  { value: 'applied', label: 'Applied', color: 'blue' },
  { value: 'reviewed', label: 'Reviewed', color: 'purple' },
  { value: 'interview', label: 'Interview', color: 'yellow' },
  { value: 'accepted', label: 'Accepted', color: 'green' },
  { value: 'rejected', label: 'Rejected', color: 'red' }
];

const statusColors = {
  applied: 'bg-blue-100 text-blue-800',
  reviewed: 'bg-purple-100 text-purple-800',
  interview: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

const ApplicationStatusDropdown = ({ 
  currentStatus, 
  onStatusChange,
  disabled
}) => {
  const handleChange = (e) => {
    const newStatus = e.target.value;
    console.log('Selected status:', newStatus);
    onStatusChange(newStatus);
  };

  return (
    <div className="relative w-full">
      <select
        value={currentStatus}
        onChange={handleChange}
        disabled={disabled}
        className={`appearance-none w-full pl-3 pr-8 py-1.5 rounded-lg text-xs font-medium ${
          statusColors[currentStatus] || 'bg-gray-100 text-gray-800'
        } ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'}`}
      >
        {statusOptions.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className={statusColors[option.value] || 'bg-gray-100 text-gray-800'}
          >
            {option.label}
          </option>
        ))}
      </select>
      
      {!disabled && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <FiChevronDown className="text-gray-700" />
        </div>
      )}
      
      {disabled && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-lg">
          <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default ApplicationStatusDropdown;