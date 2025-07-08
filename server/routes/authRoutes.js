// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { signup, signin, getme,logout, refresh } = require('../controllers/authControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const jwt =require('jsonwebtoken')
const { forgotPassword, resetPassword } = require('../controllers/authControllers');



router.post('/signup', signup);
router.post('/signin', signin);
router.get('/me',authMiddleware, getme);
router.post('/logout', logout);
router.post('/refresh',refresh);

const createAccessToken = (user) => {
  return jwt.sign(
    { userId: user._id, roles: user.roles }, 
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    { userId: user._id }, 
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};

// Cookie helpers
const setAuthCookies = (res, accessToken, refreshToken) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  };

  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000 // 15 minutes
  });

  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    path: '/api/auth/refresh',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};



router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  async (req, res) => {
    const user = req.user;
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    setAuthCookies(res, accessToken, refreshToken);

    // Redirect to frontend with success or send token response
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);


router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
