




import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { 
  FaGoogle, 
  FaLinkedin, 
  FaUser, 
  FaLock, 
  FaEnvelope,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { signupUser, clearError,  } from "../features/auth/authSlice";

import { motion } from "framer-motion";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isCompany: false,
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [focusedField, setFocusedField] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (user) {
      toast.success("Registered successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    }
  }, [user, navigate]);

  useEffect(() => {
    // Calculate password strength
    let strength = 0;
    if (form.password.length >= 6) strength += 1;
    if (/[A-Z]/.test(form.password)) strength += 1;
    if (/[0-9]/.test(form.password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(form.password)) strength += 1;
    setPasswordStrength(strength);
  }, [form.password]);

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          return "Invalid email address";
        }
        break;
      case "password":
        if (value.length < 6) return "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (value !== form.password) return "Passwords do not match";
        break;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setForm((prev) => ({ ...prev, isCompany: !prev.isCompany }));
  };

  const handleSocialLogin = (provider) => {
    toast(`Continuing with ${provider}...`);
    // Add your social login logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const errors = {
      name: !form.name ? "Name is required" : "",
      email: validateField("email", form.email),
      password: validateField("password", form.password),
      confirmPassword: validateField("confirmPassword", form.confirmPassword),
    };

    if (
      Object.values(errors).some(error => error) ||
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      // Highlight errors
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
      });
      return;
    }

    if (form.isCompany) {
      dispatch(
      

        signupUser({
          name: form.name,
          email: form.email,
          password: form.password,
          isCompany:form.isCompany
        })
      );
    } else {
      dispatch(
        signupUser({
          name: form.name,
          email: form.email,
          password: form.password,
          isCompany:null
        })
      );
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-300";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Moderate";
    if (passwordStrength === 3) return "Strong";
    return "Very Strong";
  };

    const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google'; 
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
            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <FaUser className="w-6 h-6 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
            Join Our Community
          </h2>
          <p className="text-gray-600 text-sm ">
            Create an account to get started
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <button
             onClick={handleGoogleLogin}
            className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 py-2 rounded-xl transition-all border border-gray-200 shadow-sm"
          >
            <FaGoogle className="w-4 h-4 text-red-500" />
            <span>Google</span>
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-gray-500 text-sm">
            Or continue with email
          </span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
          {/* Account Type Toggle */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className={`font-medium ${!form.isCompany ? 'text-blue-600' : 'text-gray-500'}`}>
              Individual
            </span>
            <div 
              onClick={handleCheckboxChange}
              className="relative w-14 h-7 flex items-center cursor-pointer"
            >
              <div className={`w-full h-3 rounded-full transition-colors ${
                form.isCompany ? 'bg-blue-300' : 'bg-gray-300'
              }`}></div>
              <div className={`absolute w-7 h-7 rounded-full shadow-md transition-all transform ${
                form.isCompany 
                  ? 'bg-blue-600 translate-x-7' 
                  : 'bg-gray-500 translate-x-0'
              }`}></div>
            </div>
            <span className={`font-medium ${form.isCompany ? 'text-blue-600' : 'text-gray-500'}`}>
              Company
            </span>
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <div className={`relative border-2 rounded-xl overflow-hidden transition-all ${
              focusedField === 'name' 
                ? 'border-blue-500 shadow-md shadow-blue-500/10'
                : 'border-gray-200'
            }`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                placeholder={form.isCompany ? "Company Name" : "Full Name"}
                value={form.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-10 pr-4 py-2 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none"
                required
              />
            </div>
            {touched.name && !form.name && (
              <p className="text-red-500 text-sm mt-1">Name is required</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <div className={`relative border-2 rounded-xl overflow-hidden transition-all ${
              focusedField === 'email' 
                ? 'border-blue-500 shadow-md shadow-blue-500/10'
                : 'border-gray-200'
            }`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-10 pr-4 py-2 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none"
                required
              />
            </div>
            {touched.email && validateField("email", form.email) && (
              <p className="text-red-500 text-sm">
                {validateField("email", form.email)}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className={`relative border-2 rounded-xl overflow-hidden transition-all ${
              focusedField === 'password' 
                ? 'border-blue-500 shadow-md shadow-blue-500/10'
                : 'border-gray-200'
            }`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-10 pr-10 py-2 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {form.password && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getPasswordStrengthColor()}`}
                      style={{ width: `${passwordStrength * 25}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Use at least 6 characters with uppercase, number, and symbol
                </p>
              </div>
            )}
            
            {touched.password && validateField("password", form.password) && (
              <p className="text-red-500 text-sm">
                {validateField("password", form.password)}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <div className={`relative border-2 rounded-xl overflow-hidden transition-all ${
              focusedField === 'confirmPassword' 
                ? 'border-blue-500 shadow-md shadow-blue-500/10'
                : 'border-gray-200'
            }`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                onFocus={() => setFocusedField('confirmPassword')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-10 pr-10 py-2 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {touched.confirmPassword &&
              validateField("confirmPassword", form.confirmPassword) && (
                <p className="text-red-500 text-sm">
                  {validateField("confirmPassword", form.confirmPassword)}
                </p>
              )}
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
                Creating Account...
              </div>
            ) : (
              "Sign Up"
            )}
          </motion.button>

          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Log in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;