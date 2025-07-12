

const User = require('../models/User');
const path = require('path');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');



// Enhanced token creation
const createTokens = (entity) => {
  const accessToken = jwt.sign(
    { userId: entity._id, roles: entity.roles },
    process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { userId: entity._id },
    process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  return { accessToken, refreshToken };
};

// Cookie management helpers
const setAuthCookies = (res, accessToken, refreshToken) => {
  // Access token cookie (short-lived)
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 15 * 60 * 1000 // 15 minutes
  });
  
  // Refresh token cookie (long-lived)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    path: '/api/auth/refresh', // Only sent to refresh endpoint
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

const clearAuthCookies = (res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  });
  
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/api/auth/refresh'
  });
};




exports.updateSeekerProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userType=req.userType;
    const user = await User.findById(userId);
    

    if (!user || ! userType.seeker) {
      return res.status(403).json({ message: 'Unauthorized or not a seeker' });
    }

    const {
      name,
      experience,
      linkedIn,
      github,
      company,
      location,
      phone,
     designation,
    } = req.body;
    
  

    // Handle skills: ensure it's an array
    let skills = req.body.skills;
    if (typeof skills === "string") {
      skills = skills.split(',').map(s => s.trim());
    } else if (!Array.isArray(skills)) {
      skills = []; // fallback
    }

    // Update seeker profile fields
    user.profile.fullName = name 
    user.profile.experience = experience 
    user.profile.skills = skills;
    user.profile.linkedIn = linkedIn
    user.profile.github = github
    user.profile.company = company
    user.profile.location = location 
    user.profile.phone = phone 
user.profile.designation= designation
    
 


 if (req.file) {
       if (user.resume && user.resume.public_id) {
      await cloudinary.uploader.destroy(user.resume.public_id, { resource_type: 'raw' });
    }
       user.resume = {
      url: req.file.path, 
      public_id: req.file.filename, 
      uploadedAt: new Date(),
    };

    }

   

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      profile: user.profile,
      resumeUrl: user.resume.url,
    });

  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};



exports.upgradeToReferrer = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId, // Changed from req.userId to req.user.userId
      {
        $set: {
          'roles.referrer': true,
          'roles.seeker': false,
        }
      },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate new tokens with updated roles
    const { accessToken, refreshToken } = createTokens(user);
    setAuthCookies(res, accessToken, refreshToken);
    
    res.json({ 
      message: 'Role changed to referrer.',
      user,
      accessToken // Send new token to client
    });
  } catch (error) {
    console.error('upgradeToReferrer error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};



exports.downgradeToSeeker = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId, // Changed from req.userId to req.user.userId
      {
        $set: {
          'roles.referrer': false,
          'roles.seeker': true,
        }
      },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate new tokens with updated roles
    const { accessToken, refreshToken } = createTokens(user);
    setAuthCookies(res, accessToken, refreshToken);
    
    res.json({ 
      message: 'Role changed to seeker.',
      user,
      accessToken // Send new token to client
    });
  } catch (error) {
    console.error('downgradeToSeeker error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};



exports.getSeekerProfile = async (req, res) => {

 
  try {
    const user = await User.findById(req.userId).lean();
     

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user?.roles && !user.roles.seeker) {
      return res.status(403).json({ message: "Only seekers can access this profile" });
    }

    const profile = {
      email: user.email,
      fullName: user.name || "",
      experience: user.profile?.experience || "",
      skills: user.profile?.skills || [],
      linkedIn: user.profile?.linkedIn || "",
      github: user.profile?.github || "",
      company: user.profile?.company || "",
      resume: user.resume?.url || "",
      location:user.profile?.location || "",
      designation:user.profile?.designation ||"",
      phone:user.profile?.phone||"",
      profileImg: user.profile?.profileImg || null, 
    };



    res.status(200).json(profile);
  } catch (err) {
    console.error("Error fetching seeker profile:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

