const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

// Create JWT token
const createToken = (user) => {
  return jwt.sign(
    { userId: user._id, roles: user.roles }, 
    process.env.JWT_SECRET, 
    { expiresIn: '7d' }
  );
};

// Google strategy using token verification
exports.googleAuth = async (req, res) => {
  try {
    const { tokenId } = req.body;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { email, name } = payload;
    
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user
      user = new User({
        name,
        email,
        password: 'google-auth', // Placeholder
        roles: { seeker: true, referrer: false },
        googleId: payload.sub
      });
      await user.save();
    } else if (!user.googleId) {
      // Update existing user with Google ID
      user.googleId = payload.sub;
      await user.save();
    }
    
    const token = createToken(user);
    
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      profile: user.profile,
      resume: user.resume,
    };
    
    res.json({ token, user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Google authentication failed' });
  }
};

// LinkedIn strategy
passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: process.env.LINKEDIN_CALLBACK_URL,
  scope: ['r_liteprofile', 'r_emailaddress'],
  state: true
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
    
    if (!email) {
      return done(new Error('No email found in LinkedIn profile'));
    }
    
    let user = await User.findOne({ email });
    
    if (!user) {
      user = new User({
        name: profile.displayName,
        email,
        password: 'linkedin-auth', // Placeholder
        roles: { seeker: true, referrer: false },
        linkedinId: profile.id
      });
      await user.save();
    } else if (!user.linkedinId) {
      user.linkedinId = profile.id;
      await user.save();
    }
    
    const token = createToken(user);
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      profile: user.profile,
      resume: user.resume,
    };
    
    done(null, { token, user: userData });
  } catch (err) {
    done(err, null);
  }
}));

// LinkedIn authentication route
exports.linkedinAuth = passport.authenticate('linkedin', {
  session: false
});

// LinkedIn callback handler
exports.linkedinCallback = (req, res, next) => {
  passport.authenticate('linkedin', { session: false }, (err, result) => {
    if (err) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=${encodeURIComponent(err.message)}`);
    }
    
    const { token, user } = result;
    res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
  })(req, res, next);
};