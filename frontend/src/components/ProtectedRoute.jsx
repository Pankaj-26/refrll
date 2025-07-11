


import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../features/auth/authSlice';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const location = useLocation();

  // Fetch user if not already loaded
  useEffect(() => {
    if (!user && !loading && !error) {
      dispatch(fetchUser());
    }
  }, [dispatch, user, loading, error]);

 

  if (loading || (!user && !error)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

 

  // Handle errors (including authentication failures)
  if (error) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }



  // Check if user has required role
  if (user) {

 const hasRequiredRole = allowedRoles.some(role => user.roles[role] === true ||user.roles==='company');





    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;