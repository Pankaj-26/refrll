// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  upgradeToReferrer,
  downgradeToSeeker,
  updateSeekerProfile,
  getSeekerProfile
} = require('../controllers/userController');



router.put('/upgradeToReferrer', authMiddleware, upgradeToReferrer);
router.put('/downgradeToSeeker', authMiddleware, downgradeToSeeker);
const upload = require('../middlewares/uploadMiddleware');


// PATCH /api/users/profile
router.patch(
  '/profile',
  authMiddleware,
  upload.single('resume'),
  updateSeekerProfile
);

router.get("/profile", authMiddleware, getSeekerProfile);


module.exports = router;
