import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FiLock, FiMail, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { loginUser, clearError } from '../features/auth/authSlice';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (user?.roles?.seeker) {
      navigate('/dashboard');
    } else if (user?.roles?.referrer) {
      navigate('/dashboard/referrer');
    } else if (user?.roles === 'company') {
      navigate('/dashboard/company');
    }
  }, [user, navigate]);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'email':
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          error = 'Invalid email address';
        }
        break;
      case 'password':
        if (value.length < 6) {
          error = 'Password must be at least 6 characters';
        }
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setForm(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {
      email: validateField('email', form.email),
      password: validateField('password', form.password)
    };
    
    setErrors(formErrors);
    setTouched({ email: true, password: true });

    if (!Object.values(formErrors).some(error => error)) {
      dispatch(loginUser({ email: form.email, password: form.password }));
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://refrll-backend.onrender.com/api/auth/google'; 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-100 p-6"
      >
        <div className="text-center mb-6">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3"
          >
            <FiLock className="w-5 h-5 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Sign in to continue
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 mb-4 bg-white border border-gray-200 rounded-lg py-2.5 text-gray-700 hover:bg-gray-50 transition text-sm"
        >
          <FcGoogle className="text-lg" />
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink px-4 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className={`relative rounded-lg overflow-hidden transition-all ${
              errors.email ? 'border border-red-500' : 'border border-gray-200'
            }`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FiMail className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                autoComplete="email"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
              />
            </div>
            {touched.email && errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className={`relative rounded-lg overflow-hidden transition-all ${
              errors.password ? 'border border-red-500' : 'border border-gray-200'
            }`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FiLock className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="w-full pl-10 pr-10 py-2.5 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-1.5 text-gray-600">
              <input
                type="checkbox"
                className="rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800">
              Forgot password?
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                Signing in...
              </div>
            ) : (
              <>
                Sign In <FiArrowRight className="ml-2" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-4 text-center text-xs text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
            Create account
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;


// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import { useNavigate, Link } from 'react-router-dom';
// import { FiAlertCircle, FiLock, FiMail, FiEye, FiEyeOff } from 'react-icons/fi';
// import { loginUser, clearError } from '../features/auth/authSlice';
// import { motion } from 'framer-motion';

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error, user } = useSelector((state) => state.auth);
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [touched, setTouched] = useState({ email: false, password: false });
//   const [errors, setErrors] = useState({ email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [focusedField, setFocusedField] = useState(null);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

//   useEffect(() => {
//     if (user?.roles?.seeker) {
//       toast.success('Logged in successfully!');
//       navigate('/dashboard');
//     } else if (user?.roles?.referrer) {
//       navigate('/dashboard/referrer');
//     } else if (user?.roles === 'company') {
//       navigate('/dashboard/company');
//     }
//   }, [user, navigate]);

//   const validateField = (name, value) => {
//     let error = '';
//     switch (name) {
//       case 'email':
//         if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
//           error = 'Invalid email address';
//         }
//         break;
//       case 'password':
//         if (value.length < 6) {
//           error = 'Password must be at least 6 characters';
//         }
//         break;
//     }
//     return error;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTouched(prev => ({ ...prev, [name]: true }));
//     setForm(prev => ({ ...prev, [name]: value }));
    
//     const error = validateField(name, value);
//     setErrors(prev => ({ ...prev, [name]: error }));
//   };




//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formErrors = {
//       email: validateField('email', form.email),
//       password: validateField('password', form.password)
//     };
    
//     setErrors(formErrors);
//     setTouched({ email: true, password: true });

//     if (!Object.values(formErrors).some(error => error)) {
//       dispatch(loginUser({ email: form.email, password: form.password }));
//     }
//   };



// const handleGoogleLogin = () => {
//   window.location.href = 'http://localhost:5000/api/auth/google'; 
// };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4">

//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
//       >
//         <div className="text-center mb-8">
//           <motion.div 
//             initial={{ scale: 0.8 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.2 }}
//             className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4"
//           >
//             <FiLock className="w-8 h-8 text-white" />
//           </motion.div>
//           <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
//             Welcome Back
//           </h2>
//           <p className="text-gray-600">
//             Sign in to your account
//           </p>
//         </div>
//               <button
//   onClick={handleGoogleLogin}
//   className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
// >
//   Continue with Google
// </button>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Email Field */}
//           <div className="space-y-2">
//             <div className={`relative border-2 rounded-xl overflow-hidden transition-all ${
//               focusedField === 'email' 
//                 ? 'border-blue-500 shadow-md shadow-blue-500/10'
//                 : errors.email ? 'border-red-500' : 'border-gray-200'
//             }`}>
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiMail className="w-5 h-5 text-gray-400" />
//               </div>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email address"
//                 value={form.email}
//                 autoComplete="email" 
//                 onChange={handleChange}
//                 onFocus={() => setFocusedField('email')}
//                 onBlur={() => setFocusedField(null)}
//                 className="w-full pl-10 pr-4 py-3 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none"
//               />
//             </div>
//             {touched.email && errors.email && (
//               <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
//                 <FiAlertCircle className="w-4 h-4" />
//                 {errors.email}
//               </div>
//             )}
//           </div>

//           {/* Password Field */}
//           <div className="space-y-2">
//             <div className={`relative border-2 rounded-xl overflow-hidden transition-all ${
//               focusedField === 'password' 
//                 ? 'border-blue-500 shadow-md shadow-blue-500/10'
//                 : errors.password ? 'border-red-500' : 'border-gray-200'
//             }`}>
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiLock className="w-5 h-5 text-gray-400" />
//               </div>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 autoComplete="current-password"
//                 onFocus={() => setFocusedField('password')}
//                 onBlur={() => setFocusedField(null)}
//                 className="w-full pl-10 pr-10 py-3 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <FiEyeOff /> : <FiEye />}
//               </button>
//             </div>
//             {touched.password && errors.password && (
//               <div className="flex items-center gap-2 text-red-500 text-sm">
//                 <FiAlertCircle className="w-4 h-4" />
//                 {errors.password}
//               </div>
//             )}
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <label className="flex items-center gap-2 text-gray-600">
//               <input
//                 type="checkbox"
//                 className="rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
//               />
//               Remember me
//             </label>
//             <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800 font-medium">
//               Forgot password?
//             </Link>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 shadow-md"
//           >
//             {loading ? (
//               <div className="flex items-center justify-center gap-2">
//                 <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
//                 Signing in...
//               </div>
//             ) : (
//               "Sign In"
//             )}
//           </motion.button>

//           <div className="text-center text-gray-600 text-sm">
//             Don't have an account?{' '}
//             <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
//               Create account
//             </Link>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;