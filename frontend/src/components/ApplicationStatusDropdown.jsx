

// // src/components/ApplicationStatusDropdown.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import ReactDOM from 'react-dom';
// import { FiChevronDown, FiCheck } from 'react-icons/fi';

// const statusOptions = [
//   { value: 'applied', label: 'Applied', color: 'blue' },
//   { value: 'reviewed', label: 'Reviewed', color: 'purple' },
//   { value: 'interview', label: 'Interview', color: 'yellow' },
//   { value: 'accepted', label: 'Accepted', color: 'green' },
//   { value: 'rejected', label: 'Rejected', color: 'red' }
// ];

// const statusColors = {
//   applied: 'bg-blue-100 text-blue-800',
//   reviewed: 'bg-purple-100 text-purple-800',
//   interview: 'bg-yellow-100 text-yellow-800',
//   accepted: 'bg-green-100 text-green-800',
//   rejected: 'bg-red-100 text-red-800'
// };

// const ApplicationStatusDropdown = ({ 
//   currentStatus, 
//   onStatusChange,
//   disabled
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
//   const buttonRef = useRef(null);
//   const dropdownRef = useRef(null);
  
//   const handleSelect = (status) => {
//     console.log('Selected status:', status);
//     onStatusChange(status);
//     setIsOpen(false);
//   };

//   const currentOption = statusOptions.find(opt => opt.value === currentStatus) || 
//                        statusOptions[0];

//   // Calculate position when dropdown opens
//   useEffect(() => {
//     if (isOpen && buttonRef.current) {
//       const rect = buttonRef.current.getBoundingClientRect();
//       setPosition({
//         top: rect.bottom + window.scrollY,
//         left: rect.left + window.scrollX,
//         width: rect.width
//       });
//     }
//   }, [isOpen]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // Check if click is outside both button and dropdown
//       if (buttonRef.current && !buttonRef.current.contains(event.target) &&
//           (!dropdownRef.current || !dropdownRef.current.contains(event.target))) {
//         setIsOpen(false);
//       }
//     };
    
//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//       console.log('Event listener added');
//     }
    
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       console.log('Event listener removed');
//     };
//   }, [isOpen]);

//   // Close dropdown on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       console.log('Scroll detected, closing dropdown');
//       setIsOpen(false);
//     };
    
//     if (isOpen) {
//       window.addEventListener('scroll', handleScroll);
//       console.log('Scroll listener added');
//     }
    
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       console.log('Scroll listener removed');
//     };
//   }, [isOpen]);

//   // Debugging logs
//   useEffect(() => {
//     console.log('Dropdown isOpen state changed:', isOpen);
//   }, [isOpen]);

//   return (
//     <div className="relative w-full" ref={buttonRef}>
//       <button
//         className={`flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-xs font-medium ${
//           statusColors[currentStatus] || 'bg-gray-100 text-gray-800'
//         } ${disabled ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
//         onClick={() => {
//           if (!disabled) {
//             console.log('Button clicked, toggling dropdown');
//             setIsOpen(!isOpen);
//           }
//         }}
//         disabled={disabled}
//       >
//         <span className="truncate">{currentOption.label}</span>
//         {!disabled && <FiChevronDown className="ml-1" />}
//       </button>
      
//       {isOpen && !disabled && ReactDOM.createPortal(
//         <div
//           ref={dropdownRef}
//           className="z-50 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
//           style={{
//             position: 'absolute',
//             top: `${position.top}px`,
//             left: `${position.left}px`,
//             width: `${Math.max(position.width, 160)}px`,
//             minWidth: '160px',
//             zIndex: 1000, // Ensure it's above other elements
//             border: '1px solid #ccc', // For better visibility during debugging
//             boxShadow: '0 4px 12px rgba(0,0,0,0.15)' // More visible shadow
//           }}
//         >
//           {statusOptions.map((option) => (
//             <div
//               key={option.value}
//               className={`px-3 py-2 text-xs flex items-center justify-between cursor-pointer hover:bg-gray-50 ${
//                 currentStatus === option.value ? 'font-medium' : ''
//               }`}
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent event from bubbling up
//                 console.log('Option clicked:', option.value);
//                 handleSelect(option.value);
//               }}
//             >
//               <div className="flex items-center">
//                 <span
//                   className={`w-2 h-2 rounded-full mr-2 ${
//                     statusColors[option.value].split(' ')[0]
//                   }`}
//                 ></span>
//                 <span>{option.label}</span>
//               </div>
//               {currentStatus === option.value && (
//                 <FiCheck className="text-green-500" />
//               )}
//             </div>
//           ))}
//         </div>,
//         document.getElementById('dropdown-portal') || document.body // Fallback to body if portal not found
//       )}
      
//       {disabled && (
//         <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-lg">
//           <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ApplicationStatusDropdown;


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