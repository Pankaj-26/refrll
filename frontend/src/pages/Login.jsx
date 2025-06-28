



// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import { FiAlertCircle, FiLock, FiMail } from 'react-icons/fi';
// import { loginUser, clearError } from '../features/auth/authSlice';

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error, user } = useSelector((state) => state.auth);
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [touched, setTouched] = useState({ email: false, password: false });
//   const [errors, setErrors] = useState({ email: '', password: '' });

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

 
//  useEffect(() => {

//   if (user?.roles?.seeker) {
//     console.log(user?.roles?.seeker)
//     toast.success('Logged in successfully!');
//      navigate('/dashboard');
//   }else if(user?.roles?.referrer){
//       navigate('/dashboard/referrer');
//   }else if(user?.roles==='company'){
//      navigate('/dashboard/company');
//   }
//   else{
//     toast.error('unauthorized')
//   }
// }, [user, navigate]);

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

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
//       <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700 p-8">
//         <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
//           Welcome Back
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-2">
//             <div className="relative">
//               <FiMail className="absolute top-4 left-4 w-5 h-5 text-gray-400" />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email address"
//                 value={form.email}
//                 onChange={handleChange}
//                 className={`w-full pl-12 pr-4 py-3 bg-gray-700 border ${
//                   errors.email ? 'border-red-500' : 'border-gray-600'
//                 } rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-100`}
//               />
//             </div>
//             {touched.email && errors.email && (
//               <div className="flex items-center gap-2 text-red-400 text-sm">
//                 <FiAlertCircle className="w-4 h-4" />
//                 {errors.email}
//               </div>
//             )}
//           </div>

//           <div className="space-y-2">
//             <div className="relative">
//               <FiLock className="absolute top-4 left-4 w-5 h-5 text-gray-400" />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 className={`w-full pl-12 pr-4 py-3 bg-gray-700 border ${
//                   errors.password ? 'border-red-500' : 'border-gray-600'
//                 } rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-100`}
//               />
//             </div>
//             {touched.password && errors.password && (
//               <div className="flex items-center gap-2 text-red-400 text-sm">
//                 <FiAlertCircle className="w-4 h-4" />
//                 {errors.password}
//               </div>
//             )}
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <label className="flex items-center gap-2 text-gray-400">
//               <input
//                 type="checkbox"
//                 className="rounded border-gray-600 bg-gray-700"
//               />
//               Remember me
//             </label>
//             <a href="/forgot-password" className="text-blue-400 hover:text-blue-300">
//               Forgot password?
//             </a>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
//           >
//             {loading ? 'Logging in...' : 'Sign In'}
//           </button>

//           <div className="text-center text-gray-400 text-sm">
//             Don't have an account?{' '}
//             <a href="/signup" className="text-blue-400 hover:text-blue-300">
//               Create account
//             </a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { FiAlertCircle, FiLock, FiMail, FiEye, FiEyeOff } from 'react-icons/fi';
import { loginUser, clearError } from '../features/auth/authSlice';
import { motion } from 'framer-motion';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (user?.roles?.seeker) {
      toast.success('Logged in successfully!');
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
      >
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <FiLock className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <div className={`relative border-2 rounded-xl overflow-hidden transition-all ${
              focusedField === 'email' 
                ? 'border-blue-500 shadow-md shadow-blue-500/10'
                : errors.email ? 'border-red-500' : 'border-gray-200'
            }`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                autoComplete="email" 
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-10 pr-4 py-3 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none"
              />
            </div>
            {touched.email && errors.email && (
              <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                <FiAlertCircle className="w-4 h-4" />
                {errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className={`relative border-2 rounded-xl overflow-hidden transition-all ${
              focusedField === 'password' 
                ? 'border-blue-500 shadow-md shadow-blue-500/10'
                : errors.password ? 'border-red-500' : 'border-gray-200'
            }`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-10 pr-10 py-3 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {touched.password && errors.password && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <FiAlertCircle className="w-4 h-4" />
                {errors.password}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                className="rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800 font-medium">
              Forgot password?
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 shadow-md"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </motion.button>

          <div className="text-center text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
              Create account
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;