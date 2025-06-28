import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const {user,loading} = useSelector((state) => state.user);
const token = localStorage.getItem('token');
  const location = useLocation();

console.log("ProtectedRoute user:", user);
  console.log("ProtectedRoute token:", token);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

    if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  }

  // if (!user) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  // if (!allowedRoles.includes(user.role)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return children;
};

export default ProtectedRoute;

