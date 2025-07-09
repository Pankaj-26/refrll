// // components/Navbar.js
// import React, {
//   useEffect,
//   useRef,
//   useState,
//   useCallback,
//   useMemo,
// } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setTheme, setSystemTheme } from "../features/theme/themeSlice";
// import { fetchUser, toggleRole, logout } from "../features/auth/authSlice";
// import {
//   FiUser,
//   FiLogOut,
//   FiToggleRight,
//   FiSettings,
//   FiBriefcase,
//   FiSun,
//   FiMoon,
//   FiMonitor,
// } from "react-icons/fi";
// import toast from "react-hot-toast";
// import {
//   getNotifications,
//   markNotificationAsRead,
// } from "../features/notificationsSlice";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// dayjs.extend(relativeTime);
// import NotificationBell from "./NotificationBell";
// import Refrll from "../assets/Refrll.png";
// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);
//   const { mode: theme, preference } = useSelector((state) => state.theme);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef();

//   const { notifications, loading, error } = useSelector(
//     (state) => state.notifications
//   );

//   // Apply theme class
//   useEffect(() => {
//     document.documentElement.classList.remove("light", "dark");
//     document.documentElement.classList.add(theme);
//   }, [theme]);

//   // Memoized derived values
//   const dashboardPath = useMemo(() => {
//     if (user?.roles?.seeker) return "/dashboard";
//     if (user?.roles?.referrer) return "/dashboard/referrer";
//     if (user?.roles === "company") return "/dashboard/company";
//     return "/login";
//   }, [user]);

//   const canSeeJobs = useMemo(
//     () => user?.roles?.seeker || user?.roles?.referrer,
//     [user]
//   );

//   const canPostJobs = useMemo(
//     () => user?.roles?.referrer || user?.roles === "company",
//     [user]
//   );

//   // Fetch user on mount
//   useEffect(() => {
    
//     dispatch(fetchUser());
//   }, [dispatch]);

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Role toggle handler
//   const handleToggleRole = useCallback(async () => {
//     if (!user) return;

//     try {
//       const currentRole = user.roles.seeker ? "seeker" : "referrer";
//       const result = await dispatch(toggleRole(currentRole));

//       if (toggleRole.fulfilled.match(result)) {
//         const newRole = currentRole === "seeker" ? "referrer" : "seeker";
//           await dispatch(fetchUser());
//         toast.success(
//           `Switched to ${newRole.charAt(0).toUpperCase() + newRole.slice(1)}`
//         );
//         navigate(newRole === "referrer" ? "/dashboard/referrer" : "/dashboard");
//       } else {
//         toast.error("Role switch failed. Please try again.");
//       }
//     } catch (error) {
//       toast.error(`Error: ${error.message}`);
//     }
//   }, [user, dispatch, navigate]);

//   // Logout handler
//   const handleLogout = useCallback(() => {
//     dispatch(logout());
//     toast.success("Logged out");
//     navigate("/login");
//   }, [dispatch, navigate]);

//   // Theme handlers
//   const handleThemeChange = useCallback(
//     (newTheme) => {
//       dispatch(setTheme(newTheme));
//     },
//     [dispatch]
//   );

//   const handleSystemTheme = useCallback(() => {
//     dispatch(setSystemTheme());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(getNotifications());
//   }, [dispatch]);

 

//   return (
//     <nav className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 fixed w-full z-50 px-6 py-1 shadow-md dark:shadow-xl">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <div
//           className="flex items-center space-x-2 cursor-pointer group"
//           onClick={() => navigate(dashboardPath)}
//           aria-label="Dashboard"
//         >
//           <img
//             src={Refrll}
//             alt="Refrll Logo"
//             className=" h-14 w-auto object-contain cursor-pointer"
//           />
//         </div>

//         {/* Navigation Links */}
//         <div className="flex items-center space-x-8  ">
//           <NavButton onClick={() => navigate(dashboardPath)}>
//             Dashboard
//           </NavButton>

//           {canSeeJobs && (
//             <NavButton onClick={() => navigate("/job/postings")}>
//               Jobs
//             </NavButton>
//           )}

//           {canPostJobs && (
//             <NavButton onClick={() => navigate("/post-job")}>
//               Post Jobs
//             </NavButton>
//           )}
//         </div>

//         {/* Theme Toggle & User Menu */}
//         <div className="flex items-center gap-4">
//           {/* Theme Toggle Button */}
//           {/* <button
//             onClick={() => handleThemeChange(theme === 'dark' ? 'light' : 'dark')}
//             className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//             aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
//           >
//             {theme === 'dark' ? (
//               <FiSun className="w-5 h-5 text-yellow-400" />
//             ) : (
//               <FiMoon className="w-5 h-5 text-gray-700" />
//             )}
//           </button> */}
//           <NotificationBell notifications={notifications} />

//           {/* User Menu */}
//           <div className="relative" ref={menuRef}>
//             <button
//               onClick={() => setMenuOpen((v) => !v)}
//               className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 cursor-pointer"
//               aria-expanded={menuOpen}
//               aria-label="User menu"
//             >
//               <FiUser className="w-5 h-5 text-gray-700 dark:text-gray-300" />
//             </button>

//             {menuOpen && (
//               <UserMenu
//                 user={user}
//                 currentTheme={theme}
//                 themePreference={preference}
//                 onToggleRole={handleToggleRole}
//                 onLogout={handleLogout}
//                 onThemeChange={handleThemeChange}
//                 onSystemTheme={handleSystemTheme}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//       <div>
//         {/* <div>
//         {loading && <p>Loading notifications...</p>}
//         {error && <p className="text-red-500">{error}</p>}
//         {notifications?.length === 0 && <p>No notifications</p>}

//         {notifications?.map(notif => (
//           <div
//             key={notif._id}
//             onClick={() => handleNotificationClick(notif)}
//             className={`p-2 border-b cursor-pointer ${!notif.isRead ? 'bg-gray-100 font-semibold' : ''}`}
//           >
//             <p>{notif.title}</p>
//             <p className="text-sm">{notif.message}</p>
//             <p className="text-xs text-gray-500">{dayjs(notif.createdAt).fromNow()}</p>
//           </div>
//         ))}
//       </div> */}
//       </div>
//     </nav>
//   );
// };

// // Extracted components
// const NavButton = ({ children, onClick }) => (
//   <button
//     onClick={onClick}
//     className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium cursor-pointer"
//   >
//     {children}
//   </button>
// );

// const UserMenu = ({
//   user,
//   currentTheme,
//   themePreference,
//   onToggleRole,
//   onLogout,
//   onThemeChange,
//   onSystemTheme,
// }) => (
//   <div className="absolute right-0 mt-2 w-64 origin-top-right bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 cursor-pointer">
//     <div className="p-4">
//       <div className="flex items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
//         <div className="flex-shrink-0">
//           <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
//             <FiUser className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//           </div>
//         </div>
//         <div className="ml-3">
//           <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[180px]">
//             {user?.email || "Guest"}
//           </p>
//         </div>
//       </div>

//       <div className="space-y-2">
//         {/* Theme Options */}
//         <div className="flex gap-2 mb-2">
//           <ThemeOption
//             theme="light"
//             currentTheme={currentTheme}
//             preference={themePreference}
//             onClick={() => onThemeChange("light")}
//             icon={<FiSun className="w-4 h-4" />}
//           />
//           <ThemeOption
//             theme="dark"
//             currentTheme={currentTheme}
//             preference={themePreference}
//             onClick={() => onThemeChange("dark")}
//             icon={<FiMoon className="w-4 h-4" />}
//           />
//           <ThemeOption
//             theme="system"
//             currentTheme={currentTheme}
//             preference={themePreference}
//             onClick={onSystemTheme}
//             icon={<FiMonitor className="w-4 h-4" />}
//           />
//         </div>

//         {(user?.roles?.seeker || user?.roles?.referrer) && (
//           <MenuButton
//             onClick={onToggleRole}
//             icon={
//               <FiToggleRight className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
//             }
//           >
//             Switch to {user?.roles?.seeker ? "Referrer" : "Seeker"}
//           </MenuButton>
//         )}

//         <MenuButton
//           onClick={() => navigate("/seeker-profile")}
//           icon={
//             <FiSettings className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
//           }
//         >
//           Profile Settings
//         </MenuButton>

//         <hr className="border-gray-200 dark:border-gray-700 my-2" />

//         <MenuButton
//           onClick={onLogout}
//           icon={<FiLogOut className="w-5 h-5 mr-2" />}
//           className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
//         >
//           Sign Out
//         </MenuButton>
//       </div>
//     </div>
//   </div>
// );

// const MenuButton = ({ children, icon, className = "", ...props }) => (
//   <button
//     className={`w-full flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer transition-colors ${className}`}
//     {...props}
//   >
//     {icon}
//     {children}
//   </button>
// );

// const ThemeOption = ({ theme, currentTheme, preference, onClick, icon }) => {
//   const isActive =
//     preference === theme ||
//     (theme === "system" && preference === "system") ||
//     (theme === currentTheme && preference === "system");

//   return (
//     <button
//       onClick={onClick}
//       className={`flex-1 flex flex-col items-center p-2 rounded-lg border transition-colors ${
//         isActive
//           ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300"
//           : "bg-gray-50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
//       }`}
//       aria-label={`${theme} theme`}
//     >
//       {icon}
//       <span className="text-xs mt-1 capitalize">{theme}</span>
//     </button>
//   );
// };

// export default React.memo(Navbar);



import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser, toggleRole, logout } from "../features/auth/authSlice";
import {
  FiUser,
  FiLogOut,
  FiToggleRight,
  FiSettings,
  FiBriefcase,
  FiHome,
  FiPlusSquare,
  FiMenu,
  FiX
} from "react-icons/fi";
import toast from "react-hot-toast";
import { getNotifications } from "../features/notificationsSlice";
import NotificationBell from "./NotificationBell";
import Refrll from "../assets/Refrll.png";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef();

  const { notifications } = useSelector((state) => state.notifications);

  // Memoized derived values
  const dashboardPath = user?.roles?.seeker 
    ? "/dashboard" 
    : user?.roles?.referrer 
      ? "/dashboard/referrer" 
      : user?.roles === "company" 
        ? "/dashboard/company" 
        : "/login";

  const canSeeJobs = user?.roles?.seeker || user?.roles?.referrer;
  const canPostJobs = user?.roles?.referrer || user?.roles === "company";



  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Role toggle handler
  const handleToggleRole = useCallback(async () => {
    if (!user) return;

    try {
      const currentRole = user.roles.seeker ? "seeker" : "referrer";
      const result = await dispatch(toggleRole(currentRole));

      if (toggleRole.fulfilled.match(result)) {
        const newRole = currentRole === "seeker" ? "referrer" : "seeker";
        await dispatch(fetchUser());
        toast.success(
          `Switched to ${newRole.charAt(0).toUpperCase() + newRole.slice(1)}`
        );
        navigate(newRole === "referrer" ? "/dashboard/referrer" : "/dashboard");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  }, [user, dispatch, navigate]);

  // Logout handler
  const handleLogout = useCallback(() => {
    dispatch(logout());
    toast.success("Logged out");
    navigate("/login");
  }, [dispatch, navigate]);

  // Close all menus
  const closeAllMenus = () => {
    setMenuOpen(false);
    setMobileMenuOpen(false);
  };

  // Navigation handlers
  const navigateTo = (path) => {
    navigate(path);
    closeAllMenus();
  };

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-50 shadow-sm">
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center px-6 py-2">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => navigate(dashboardPath)}
          aria-label="Dashboard"
        >
          <img
            src={Refrll}
            alt="Refrll Logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          {user &&    <NavButton onClick={() => navigate(dashboardPath)}>
            Dashboard
          </NavButton>}
      

          {canSeeJobs && (
            <NavButton onClick={() => navigate("/job/postings")}>
              Jobs
            </NavButton>
          )}

          {canPostJobs && (
            <NavButton onClick={() => navigate("/post-job/:jobId/edit")}>
              Post Jobs
            </NavButton>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

{user &&   <NotificationBell notifications={notifications} /> }

        

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200"
              aria-expanded={menuOpen}
              aria-label="User menu"
            >
              <FiUser className="w-5 h-5 text-gray-700" />
            </button>

            {user &&    <AnimatePresence>
              {menuOpen && (
                <UserMenu
                  user={user}
                  onToggleRole={handleToggleRole}
                  onLogout={handleLogout}
                  navigateTo={navigateTo}
                />
              )}
            </AnimatePresence>}

         
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center px-4 py-3">
        <div
          className="flex items-center"
          onClick={() => navigateTo(dashboardPath)}
        >
          <img
            src={Refrll}
            alt="Refrll Logo"
            className="h-10 w-auto object-contain"
          />
        </div>

        <div className="flex items-center gap-4">
          <NotificationBell notifications={notifications} />

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Open menu"
          >
            <FiMenu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-2xl border-l border-gray-200"
          >
            <div className="p-4 flex justify-between items-center border-b border-gray-200">
              <div className="flex items-center">
                <img
                  src={Refrll}
                  alt="Refrll Logo"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <FiX className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              <MobileNavItem
                icon={<FiHome className="w-5 h-5" />}
                label="Dashboard"
                onClick={() => navigateTo(dashboardPath)}
              />

              {canSeeJobs && (
                <MobileNavItem
                  icon={<FiBriefcase className="w-5 h-5" />}
                  label="Jobs"
                  onClick={() => navigateTo("/job/postings")}
                />
              )}

              {canPostJobs && (
                <MobileNavItem
                  icon={<FiPlusSquare className="w-5 h-5" />}
                  label="Post Jobs"
                  onClick={() => navigateTo("/post-job/:jobId/edit")}
                />
              )}

              <MobileNavItem
                icon={<FiSettings className="w-5 h-5" />}
                label="Settings"
                onClick={() => navigateTo("/settings")}
              />

              {(user?.roles?.seeker || user?.roles?.referrer) && (
                <MobileNavItem
                  icon={<FiToggleRight className="w-5 h-5" />}
                  label={`Switch to ${user?.roles?.seeker ? "Referrer" : "Seeker"}`}
                  onClick={handleToggleRole}
                />
              )}

              <div className="pt-4 border-t border-gray-200">
                <MobileNavItem
                  icon={<FiLogOut className="w-5 h-5 text-red-500" />}
                  label="Sign Out"
                  onClick={handleLogout}
                  className="text-red-600 hover:bg-red-50"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Extracted components
const NavButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer px-3 py-1 rounded-lg hover:bg-blue-50"
  >
    {children}
  </button>
);

const MobileNavItem = ({ icon, label, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors ${className}`}
  >
    <div className="text-blue-500">{icon}</div>
    <span className="font-medium">{label}</span>
  </button>
);

const UserMenu = ({ user, onToggleRole, onLogout, navigateTo }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    className="absolute right-0 mt-2 w-64 origin-top-right bg-white rounded-xl shadow-2xl border border-gray-200 z-50"
  >
    <div className="p-4">
      <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <FiUser className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
            {user?.email || "Guest"}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {(user?.roles?.seeker || user?.roles?.referrer) && (
          <MenuButton
            onClick={onToggleRole}
            icon={
              <FiToggleRight className="w-5 h-5 mr-2 text-blue-600" />
            }
          >
            Switch to {user?.roles?.seeker ? "Referrer" : "Seeker"}
          </MenuButton>
        )}

        {/* <MenuButton
          onClick={() => navigateTo("/settings")}
          icon={
            <FiSettings className="w-5 h-5 mr-2 text-gray-600" />
          }
        >
          Profile Settings
        </MenuButton> */}

        <hr className="border-gray-200 my-2" />

        <MenuButton
          onClick={onLogout}
          icon={<FiLogOut className="w-5 h-5 mr-2" />}
          className="text-red-600 hover:bg-red-50"
        >
          Sign Out
        </MenuButton>
      </div>
    </div>
  </motion.div>
);

const MenuButton = ({ children, icon, className = "", ...props }) => (
  <button
    className={`w-full flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors ${className}`}
    {...props}
  >
    {icon}
    {children}
  </button>
);

export default React.memo(Navbar);