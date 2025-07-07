// import { useState } from 'react';
// import API from '../util/axios';
// import { useDispatch } from 'react-redux';
// import { forgotPassword } from '../features/auth/authSlice';
// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
// const dispatch = useDispatch();
// const { forgotPasswordMessage, error, loading } = useSelector((state) => state.auth);
 

//  const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(forgotPassword(email));
//   };

//   return (
//     <div>
//       <h2>Forgot Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//           required
//         />
//         <button type="submit">Send Reset Link</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ForgotPassword;



import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineMail, HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi';
import { forgotPassword } from '../features/auth/authSlice';
import API from '../util/axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { forgotPasswordMessage, error, loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto bg-indigo-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
            <HiOutlineMail className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Forgot Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email and we'll send you a password reset link
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              } transition-colors duration-300`}
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </form>

        {/* Status Messages */}
        <div className="mt-4">
          {forgotPasswordMessage && (
            <div className="rounded-md bg-green-50 p-4 flex items-start">
              <HiOutlineCheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium text-green-800">{forgotPasswordMessage}</p>
            </div>
          )}
          
          {error && (
            <div className="rounded-md bg-red-50 p-4 flex items-start">
              <HiOutlineExclamationCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}
        </div>
        
        <div className="text-center text-sm text-gray-500 mt-4">
          Remembered your password?{' '}
          <a 
            href="/login" 
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;