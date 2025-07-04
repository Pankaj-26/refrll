const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// ✅ Get user notifications
router.get('/', notificationController.getNotifications);

// ✅ Mark notification as read
router.patch('/:id/read', notificationController.markAsRead);

module.exports = router;
