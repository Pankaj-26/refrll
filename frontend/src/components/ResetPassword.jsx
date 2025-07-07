// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import API from '../util/axios';
// import { useDispatch } from 'react-redux';
// import { resetPassword } from '../features/auth/authSlice'
// const ResetPassword = () => {
//   const { token } = useParams();
//   const [password, setPassword] = useState('');
//   const { resetPasswordMessage, error, loading } = useSelector((state) => state.auth);
//   const [message, setMessage] = useState('');
// const dispatch = useDispatch();
  


 
 

//   const handleReset = (e) => {
//     e.preventDefault();
//     dispatch(resetPassword({ token, password }));
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       <form onSubmit={handleReset}>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="New password"
//           required
//         />
//         <button type="submit">Reset Password</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ResetPassword;


// src/components/ResetPassword.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff, HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi';
import { resetPassword } from '../features/auth/authSlice';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const dispatch = useDispatch();
  const { resetPasswordMessage, error, loading } = useSelector((state) => state.auth);

  const handleReset = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    dispatch(resetPassword({ token, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full">
            <HiOutlineLockClosed className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">Reset Your Password</h1>
          <p className="mt-1 text-indigo-200">Create a new secure password for your account</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleReset} className="space-y-5">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineLockClosed className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter new password"
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <HiOutlineEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Password must be at least 8 characters with a number and special character.
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineLockClosed className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Confirm your new password"
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <HiOutlineEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <HiOutlineEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </div>
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
              )}
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading || (password && confirmPassword && password !== confirmPassword)}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                  loading || (password && confirmPassword && password !== confirmPassword)
                    ? 'bg-indigo-300 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                } transition-colors duration-300`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resetting...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
            </div>
          </form>
          
          {/* Status Messages */}
          <div className="mt-6 space-y-3">
            {resetPasswordMessage && (
              <div className="rounded-lg bg-green-50 p-4 flex items-start">
                <HiOutlineCheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">Password Reset Successful!</h3>
                  <p className="mt-1 text-sm text-green-700">{resetPasswordMessage}</p>
                </div>
              </div>
            )}
            
            {error && (
              <div className="rounded-lg bg-red-50 p-4 flex items-start">
                <HiOutlineExclamationCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Password Reset Failed</h3>
                  <p className="mt-1 text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remembered your password?{' '}
              <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;