const Notification = require('../models/Notification');

// ✅ Get all notifications for logged-in user
exports.getNotifications = async (req, res) => {
  
  try {
    const notifications = await Notification.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    console.error('Get Notifications Error:', err);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};

// ✅ Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ message: 'Notification marked as read' });
  } catch (err) {
    console.error('Mark Notification as Read Error:', err);
    res.status(500).json({ message: 'Error updating notification' });
  }
};



exports.markAllRead = async (req, res) => {
   try {
    const userId = req.userId;
    console.log(req.userId)

    const result = await Notification.updateMany(
      { userId: userId, isRead: false },
      { $set: { isRead: true, readAt: new Date() } }
    );

    res.status(200).json({
      message: 'All notifications marked as read.',
      modifiedCount: result.modifiedCount
    });

  } catch (err) {
    console.error('Error marking notifications as read:', err);
    res.status(500).json({ message: 'Server error while marking notifications as read.' });
  }
};