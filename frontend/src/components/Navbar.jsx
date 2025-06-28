
// components/Navbar.js
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  setTheme, 
  setSystemTheme 
} from '../features/theme/themeSlice';
import { fetchUser, toggleRole, logout } from '../features/auth/authSlice';
import { 
  FiUser, FiLogOut, FiToggleRight, FiSettings, 
  FiBriefcase, FiSun, FiMoon, FiMonitor 
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { mode: theme, preference } = useSelector((state) => state.theme);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Apply theme class
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Memoized derived values
  const dashboardPath = useMemo(() => {
    if (user?.roles?.seeker) return '/dashboard';
    if (user?.roles?.referrer) return '/dashboard/referrer';
    if (user?.roles === 'company') return '/dashboard/company';
    return '/login';
  }, [user]);

  const canSeeJobs = useMemo(() => 
    user?.roles?.seeker || user?.roles?.referrer, 
  [user]);

  const canPostJobs = useMemo(() => 
    user?.roles?.referrer || user?.roles === 'company', 
  [user]);

  // Fetch user on mount
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Role toggle handler
  const handleToggleRole = useCallback(async () => {
    if (!user) return;
    
    try {
      const currentRole = user.roles.seeker ? 'seeker' : 'referrer';
      const result = await dispatch(toggleRole(currentRole));
      
      if (toggleRole.fulfilled.match(result)) {
        const newRole = currentRole === 'seeker' ? 'referrer' : 'seeker';
        toast.success(`Switched to ${newRole.charAt(0).toUpperCase() + newRole.slice(1)}`);
        navigate(newRole === 'referrer' ? '/dashboard/referrer' : '/dashboard');
      } else {
        toast.error('Role switch failed. Please try again.');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  }, [user, dispatch, navigate]);

  // Logout handler
  const handleLogout = useCallback(() => {
    dispatch(logout());
    toast.success('Logged out');
    navigate('/login');
  }, [dispatch, navigate]);

  // Theme handlers
  const handleThemeChange = useCallback((newTheme) => {
    dispatch(setTheme(newTheme));
  }, [dispatch]);

  const handleSystemTheme = useCallback(() => {
    dispatch(setSystemTheme());
  }, [dispatch]);

  return (
    <nav className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 fixed w-full z-50 px-6 py-4 shadow-md dark:shadow-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => navigate(dashboardPath)}
          aria-label="Dashboard"
        >
          <FiBriefcase className="w-6 h-6 text-blue-600 dark:text-blue-400 transition-colors group-hover:text-blue-500 dark:group-hover:text-blue-300" />
          <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400 bg-clip-text text-transparent">
            Refrll
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <NavButton onClick={() => navigate(dashboardPath)}>
            Dashboard
          </NavButton>

          {canSeeJobs && (
            <NavButton onClick={() => navigate('/job/postings')}>
              Jobs
            </NavButton>
          )}

          {canPostJobs && (
            <NavButton onClick={() => navigate('/post-job')}>
              Post Jobs
            </NavButton>
          )}
        </div>

        {/* Theme Toggle & User Menu */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={() => handleThemeChange(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <FiSun className="w-5 h-5 text-yellow-400" />
            ) : (
              <FiMoon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
              aria-expanded={menuOpen}
              aria-label="User menu"
            >
              <FiUser className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            {menuOpen && (
              <UserMenu 
                user={user} 
                currentTheme={theme}
                themePreference={preference}
                onToggleRole={handleToggleRole}
                onLogout={handleLogout}
                onThemeChange={handleThemeChange}
                onSystemTheme={handleSystemTheme}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Extracted components
const NavButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
  >
    {children}
  </button>
);

const UserMenu = ({ 
  user, 
  currentTheme,
  themePreference,
  onToggleRole, 
  onLogout,
  onThemeChange,
  onSystemTheme
}) => (
  <div className="absolute right-0 mt-2 w-64 origin-top-right bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50">
    <div className="p-4">
      <div className="flex items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <FiUser className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[180px]">
            {user?.email || 'Guest'}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {/* Theme Options */}
        <div className="flex gap-2 mb-2">
          <ThemeOption 
            theme="light" 
            currentTheme={currentTheme}
            preference={themePreference}
            onClick={() => onThemeChange('light')}
            icon={<FiSun className="w-4 h-4" />}
          />
          <ThemeOption 
            theme="dark" 
            currentTheme={currentTheme}
            preference={themePreference}
            onClick={() => onThemeChange('dark')}
            icon={<FiMoon className="w-4 h-4" />}
          />
          <ThemeOption 
            theme="system" 
            currentTheme={currentTheme}
            preference={themePreference}
            onClick={onSystemTheme}
            icon={<FiMonitor className="w-4 h-4" />}
          />
        </div>

        {(user?.roles?.seeker || user?.roles?.referrer) && (
          <MenuButton 
            onClick={onToggleRole}
            icon={<FiToggleRight className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />}
          >
            Switch to {user?.roles?.seeker ? 'Referrer' : 'Seeker'}
          </MenuButton>
        )}

        <MenuButton 
          onClick={() => navigate('/seeker-profile')}
          icon={<FiSettings className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />}
        >
          Profile Settings
        </MenuButton>

        <hr className="border-gray-200 dark:border-gray-700 my-2" />

        <MenuButton 
          onClick={onLogout}
          icon={<FiLogOut className="w-5 h-5 mr-2" />}
          className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          Sign Out
        </MenuButton>
      </div>
    </div>
  </div>
);

const MenuButton = ({ children, icon, className = '', ...props }) => (
  <button
    className={`w-full flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors ${className}`}
    {...props}
  >
    {icon}
    {children}
  </button>
);

const ThemeOption = ({ theme, currentTheme, preference, onClick, icon }) => {
  const isActive = preference === theme || 
                 (theme === 'system' && preference === 'system') ||
                 (theme === currentTheme && preference === 'system');

  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center p-2 rounded-lg border transition-colors ${
        isActive
          ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300'
          : 'bg-gray-50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
      }`}
      aria-label={`${theme} theme`}
    >
      {icon}
      <span className="text-xs mt-1 capitalize">{theme}</span>
    </button>
  );
};

export default React.memo(Navbar);

