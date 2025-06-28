const NotificationsPage = () => {
  const notifications = [
    { type: 'application', message: 'Your application to Senior React Developer was viewed', date: '2025-05-21' },
    { type: 'status', message: 'Application to Full Stack Engineer was accepted', date: '2025-05-22' }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 pt-20">
      <h1 className="text-2xl font-bold mb-8">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center">
              <p>{notification.message}</p>
              <span className="text-sm text-gray-500">{notification.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;