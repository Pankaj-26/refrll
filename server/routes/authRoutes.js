// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { signup, signin, getme,logout } = require('../controllers/authControllers');
const authMiddleware = require('../middlewares/authMiddleware');





router.post('/signup', signup);
router.post('/signin', signin);
router.get('/me',authMiddleware, getme);
router.post('/logout', logout);



module.exports = router;
