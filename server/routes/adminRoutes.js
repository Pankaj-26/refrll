const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protect route - only admin users can access
router.get('/stats', authMiddleware, adminController.getAdminStats);

router.get('/company-jobs', authMiddleware, adminController.getCompanyJobs);

module.exports = router;



