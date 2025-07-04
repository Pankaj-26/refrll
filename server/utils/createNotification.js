const Notification = require('../models/Notification');

const createNotification = async (userId, title, message, link = '') => {
  try {
   const notification= await Notification.create({ userId, title, message, link });

 
        return notification;
  } catch (err) {
    console.error('Notification creation error:', err.message);
  }
};

module.exports = createNotification;
