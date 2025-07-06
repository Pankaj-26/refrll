
import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { 
  FiBell, FiCheck, FiX, FiClock, FiUser, 
  FiBriefcase, FiMail, FiAlertCircle 
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  getNotifications, 
  markNotificationAsRead,
  markAllNotificationsAsRead 
} from '../features/notificationsSlice';

// Helper to get notification type
const getNotificationType = (title) => {
  if (!title) return 'system';
  
  const lcTitle = title.toLowerCase();
  if (lcTitle.includes('application received')) return 'application';
  if (lcTitle.includes('application submitted')) return 'status';
  if (lcTitle.includes('referral')) return 'referral';
  if (lcTitle.includes('message')) return 'message';
  if (lcTitle.includes('reminder')) return 'reminder';
  
  return 'system';
};

const NotificationCenter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notifications, loading } = useSelector(state => state.notifications);
  const { user } = useSelector(state => state.auth);

  const [filter, setFilter] = useState('all');

  // Transform notifications to include type and proper timestamp
  const transformedNotifications = useMemo(() => {
    return notifications.map(notif => ({
      ...notif,
      id: notif._id,
      type: getNotificationType(notif.title),
      timestamp: notif.createdAt ? new Date(notif.createdAt) : new Date(),
      read: notif.isRead,
    }));
  }, [notifications]);

  // Calculate unread count
  const unreadCount = useMemo(() => {
    return transformedNotifications.filter(notif => !notif.read).length;
  }, [transformedNotifications]);

  // Filter notifications
  const filteredNotifications = useMemo(() => {
    return transformedNotifications.filter(notif => {
      if (filter === 'all') return true;
      if (filter === 'unread') return !notif.read;
      return notif.type === filter;
    });
  }, [transformedNotifications, filter]);

  // FIXED: Proper date grouping logic
  const groupNotificationsByDate = () => {
    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    
    const thisWeekStart = new Date(todayStart);
    thisWeekStart.setDate(thisWeekStart.getDate() - 7);
    
    const groups = {
      today: [],
      yesterday: [],
      thisWeek: [],
      earlier: []
    };
    
    filteredNotifications.forEach(notif => {
      const notifDate = new Date(notif.timestamp);
      
      if (notifDate >= todayStart) {
        groups.today.push(notif);
      } else if (notifDate >= yesterdayStart) {
        groups.yesterday.push(notif);
      } else if (notifDate >= thisWeekStart) {
        groups.thisWeek.push(notif);
      } else {
        groups.earlier.push(notif);
      }
    });
    
    return groups;
  };
  
  const notificationGroups = useMemo(groupNotificationsByDate, [filteredNotifications]);

  // Handle notification click
  const handleNotificationClick = useCallback((notif) => {
    if (!notif.read) {
      dispatch(markNotificationAsRead(notif._id));
    }
    if (notif.link) {
      navigate(notif.link);
    }
  }, [dispatch, navigate]);

  // Mark all as read
  const handleMarkAllAsRead = useCallback(() => {
    dispatch(markAllNotificationsAsRead()).unwrap();
    dispatch(getNotifications());

  }, [dispatch]);

  // Get icon based on notification type
  const getNotificationIcon = useCallback((type) => {
    switch(type) {
      case 'application': return <FiUser className="text-blue-500" />;
      case 'status': return <FiBriefcase className="text-green-500" />;
      case 'referral': return <FiCheck className="text-purple-500" />;
      case 'message': return <FiMail className="text-yellow-500" />;
      case 'reminder': return <FiClock className="text-orange-500" />;
      default: return <FiAlertCircle className="text-indigo-500" />;
    }
  }, []);

  // Format relative time
  const formatTime = useCallback((date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }, []);

  // Load notifications on mount
  useEffect(() => {
  }, [dispatch]);

  useEffect(() => {
  if (user?._id) {
        dispatch(getNotifications());
  }
}, [dispatch, user?._id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FiBell className="w-8 h-8 mr-3" />
              <h1 className="text-2xl font-bold">Notifications</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-white text-blue-600 rounded-full px-3 py-1 font-medium">
                {unreadCount} unread
              </span>
              <button 
                onClick={handleMarkAllAsRead}
                className="bg-white/20 hover:bg-white/30 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              >
                Mark all as read
              </button>
            </div>
          </div>
          
          <p className="mt-4 text-blue-100 max-w-lg">
            Stay updated on your job applications, referrals, and important system updates
          </p>
        </div>
        
        {/* Filter Tabs */}
        <div className="border-b border-gray-200 flex flex-wrap">
          <button 
            className={`px-4 py-3 font-medium text-sm border-b-2 ${filter === 'all' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-3 font-medium text-sm border-b-2 ${filter === 'unread' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setFilter('unread')}
          >
            Unread
          </button>
          <button 
            className={`px-4 py-3 font-medium text-sm border-b-2 ${filter === 'application' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setFilter('application')}
          >
            Applications
          </button>
          <button 
            className={`px-4 py-3 font-medium text-sm border-b-2 ${filter === 'status' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setFilter('status')}
          >
            Status Updates
          </button>
        </div>
        
        {/* Notification List */}
        <div className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto">
          {/* Today */}
          {notificationGroups.today.length > 0 && (
            <div className="py-4">
              <div className="px-6 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Today
              </div>
              {notificationGroups.today.map(notif => (
                <NotificationItem 
                  key={notif._id} 
                  notif={notif} 
                  markAsRead={handleNotificationClick}
                  getNotificationIcon={getNotificationIcon}
                  formatTime={formatTime}
                />
              ))}
            </div>
          )}
          
          {/* Yesterday */}
          {notificationGroups.yesterday.length > 0 && (
            <div className="py-4">
              <div className="px-6 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Yesterday
              </div>
              {notificationGroups.yesterday.map(notif => (
                <NotificationItem 
                  key={notif._id} 
                  notif={notif} 
                  markAsRead={handleNotificationClick}
                  getNotificationIcon={getNotificationIcon}
                  formatTime={formatTime}
                />
              ))}
            </div>
          )}
          
          {/* This Week */}
          {notificationGroups.thisWeek.length > 0 && (
            <div className="py-4">
              <div className="px-6 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                This Week
              </div>
              {notificationGroups.thisWeek.map(notif => (
                <NotificationItem 
                  key={notif._id} 
                  notif={notif} 
                  markAsRead={handleNotificationClick}
                  getNotificationIcon={getNotificationIcon}
                  formatTime={formatTime}
                />
              ))}
            </div>
          )}
          
          {/* Earlier - FIXED RENDERING */}
          {notificationGroups.earlier.length > 0 && (
            <div className="py-4">
              <div className="px-6 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Earlier
              </div>
              {notificationGroups.earlier.map(notif => (
                <NotificationItem 
                  key={notif._id} 
                  notif={notif} 
                  markAsRead={handleNotificationClick}
                  getNotificationIcon={getNotificationIcon}
                  formatTime={formatTime}
                />
              ))}
            </div>
          )}
          
          {/* Empty State */}
          {filteredNotifications.length === 0 && !loading && (
            <div className="py-16 text-center">
              <FiBell className="w-16 h-16 text-gray-300 mx-auto" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No notifications found
              </h3>
              <p className="mt-1 text-gray-500">
                {filter === 'unread' 
                  ? "You're all caught up! No unread notifications."
                  : "No notifications match your current filter."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Optimized Notification Item Component
const NotificationItem = React.memo(({ notif, markAsRead, getNotificationIcon, formatTime }) => {
  return (
    <div 
      className={`px-6 py-4 flex hover:bg-gray-50 transition-colors cursor-pointer ${!notif.read ? 'bg-blue-50' : ''}`}
      onClick={() => markAsRead(notif)}
    >
      <div className="flex-shrink-0 mr-4 mt-1">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          {getNotificationIcon(notif.type)}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <h3 className={`text-sm font-medium ${!notif.read ? 'text-gray-900' : 'text-gray-700'}`}>
            {notif.title}
          </h3>
          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
            {formatTime(notif.timestamp)}
          </span>
        </div>
        
        <p className="mt-1 text-sm text-gray-600">
          {notif.message}
        </p>
        
        {notif.link && (
          <div className="mt-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                markAsRead(notif);
              }}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View Details
            </button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-center">
        {!notif.read && (
          <div className="w-2 h-2 bg-blue-500 rounded-full mb-2"></div>
        )}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            markAsRead(notif);
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          <FiX />
        </button>
      </div>
    </div>
  );
});

export default NotificationCenter;