

const User = require('../models/User');
const path = require('path');
const jwt = require('jsonwebtoken');



const createToken = (user) => {
  const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m'
  });
  
  const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d'
  });
  
  return { accessToken, refreshToken };
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
      linkedin,
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
    user.profile.fullName = name || user.profile.fullName;
    user.profile.experience = experience || user.profile.experience;
    user.profile.skills = skills;
    user.profile.linkedIn = linkedin || user.profile.linkedIn;
    user.profile.github = github || user.profile.github;
    user.profile.company = company || user.profile.company;
    user.profile.location = location || user.profile.location;
    user.profile.phone = phone || user.profile.phone;
user.profile.designation= designation || user.profile.designation
    // Handle resume upload
    if (req.file) {
      user.resume.url = `/uploads/resumes/${req.file.filename}`;
      user.resume.uploadedAt = new Date();
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
      req.userId,  
      {
        $set: {
          'roles.referrer': true,
          'roles.seeker': false,
        }
      },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Generate NEW JWT token with updated roles
    const newToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        roles: user.roles  // Updated roles object
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    res.json({ 
      message: 'Role changed to referrer.',
      user,
      newToken  // Send new token to client
    });
  } catch (error) {
    console.error('upgradeToReferrer error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};


// exports.upgradeToReferrer = async (req, res) => {
//   try {
//     const userId = req.user.userId;
    
//     const user = await User.findByIdAndUpdate(
//       userId,
//       {
//         $set: {
//           'roles.referrer': true,
//           'roles.seeker': false,
//         }
//       },
//       { new: true, runValidators: true }
//     ).select('-password');
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
    
//     const newToken = jwt.sign(
//       {
//         userId: user._id,
//         email: user.email,
//         roles: user.roles
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );
    
//     // Set updated token in cookie
//     res.cookie('accessToken', newToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'Strict',
//       maxAge: 7 * 24 * 60 * 60 * 1000
//     });
    
//     const userData = {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       roles: user.roles,
//       profile: user.profile,
//       resume: user.resume
//     };
    
//     res.json({ 
//       message: 'Role upgraded to referrer.',
//       user: userData
//     });
//   } catch (error) {
//     console.error('upgradeToReferrer error:', error);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };

exports.downgradeToSeeker = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,  
      {
        $set: {
          'roles.referrer': false,
          'roles.seeker': true,
        }
      },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Generate NEW JWT token with updated roles
    const newToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        roles: user.roles  // Updated roles object
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    res.json({ 
      message: 'Role changed to seeker.',
      user,
      newToken  // Send new token to client
    });
  } catch (error) {
    console.error('downgradeToSeeker error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// exports.downgradeToSeeker = async (req, res) => {
//   try {
//     const userId = req.user.userId; // Use req.user.userId from middleware
    
//     const user = await User.findByIdAndUpdate(
//       userId,  
//       {
//         $set: {
//           'roles.referrer': false,
//           'roles.seeker': true,
//         }
//       },
//       { new: true, runValidators: true }
//     ).select('-password');
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
    
//     // Generate new JWT token with updated roles
//     const newToken = jwt.sign(
//       {
//         userId: user._id,
//         email: user.email,
//         roles: user.roles
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' } // Match cookie expiration
//     );
    
//     // Set new token in HTTP-only cookie
//     res.cookie('accessToken', newToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'Strict',
//       maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
//     });
    
//     // Format user response without sensitive data
//     const userData = {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       roles: user.roles,
//       profile: user.profile,
//       resume: user.resume
//     };
    
//     res.json({ 
//       message: 'Role changed to seeker.',
//       user: userData
//     });
//   } catch (error) {
//     console.error('downgradeToSeeker error:', error);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };

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
      resumeUrl: user.resume?.url || "",
      location:user.profile?.location || "",
      designation:user.profile?.designation ||"",
      phone:user.profile?.phone||"",
    };


    res.status(200).json(profile);
  } catch (err) {
    console.error("Error fetching seeker profile:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

