// routes/companyAuthRoutes.js
const express = require('express');
const router = express.Router();
const { signupCompany, signinCompany, getCompanyProfile,updateCompanyProfile } = require('../controllers/companyAuthController');
const companyAuthMiddleware = require('../middlewares/companyAuthMiddleware');
const authMiddleware=require('../middlewares/authMiddleware')

router.post('/signup', signupCompany);
router.post('/signin', signinCompany);
router.get('/me', companyAuthMiddleware, getCompanyProfile);
// routes/companyRoutes.js
// router.put('/update-profile', authMiddleware, updateCompanyProfile);


module.exports = router;
