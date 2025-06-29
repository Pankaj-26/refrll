

// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const Company = require('../models/Company');

// const createToken = (user) => {
//   return jwt.sign({ userId: user._id, roles: user.roles }, process.env.JWT_SECRET, {
//     expiresIn: '7d',
//   });
// };


// // Helper function to set HTTP-only cookie

// // const createToken = (user) => {
// //   const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
// //     expiresIn: '15m'
// //   });
  
// //   const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {
// //     expiresIn: '7d'
// //   });
  
// //   return { accessToken, refreshToken };
// // };

// // Set both cookies
// // const setAuthCookies = (res, tokens) => {
// //   res.cookie('accessToken', tokens.accessToken, {
// //     httpOnly: true,
// //     secure: process.env.NODE_ENV === 'production',
// //     sameSite: 'Strict',
// //     maxAge: 15 * 60 * 1000 // 15 minutes
// //   });
  
// //   res.cookie('refreshToken', tokens.refreshToken, {
// //     httpOnly: true,
// //     secure: process.env.NODE_ENV === 'production',
// //     sameSite: 'Strict',
// //     path: '/api/auth/refresh',
// //     maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
// //   });
// // };
// const setAuthCookie = (res, token) => {
//   res.cookie('accessToken', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'Strict',
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//   });
// };

// exports.signup = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     user = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await user.save();

//     const token = createToken(user);
//     setAuthCookie(res, token);


//     const userData = {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       roles: user.roles,
//       profile: user.profile,
//       resume: user.resume,
//     };

   
//     res.status(201).json({token,user: userData });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



// exports.signin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Try find User first
//     const user = await User.findOne({ email });

//     if (user) {
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//       const token = createToken(user);
//       setAuthCookie(res, token);

      

//       const userData = {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         roles: user.roles,
//         profile: user.profile,
//         resume: user.resume,
//         userType: 'User', 
//       };
    


//       return res.status(200).json({token,user: userData });
//     }

//     // If no user, try find Company
//     const company = await Company.findOne({ email });
//     if (company) {
//       const isMatch = await bcrypt.compare(password, company.password);
//       if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//       const token = createToken(company);

//      setAuthCookie(res, token);

//       const companyData = {
//         id: company._id,
//         name: company.name,
//         email: company.email,
//         roles:company.roles,
//         userType: 'Company'
        
//       };
      

//       return res.status(200).json({token,company: companyData });
//     }

//     // Neither user nor company found
//     return res.status(400).json({ message: 'Invalid credentials' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



// // exports.getme = async (req, res) => {

// //    const { userId, roles } = req.user;

// //   if (roles === 'company') {
// //       const company = await Company.findById(userId).select('-password');
// //       if (!company) return res.status(404).json({ message: 'Company not found' });

// //       const companyData = {
// //         id: company._id,
// //         name: company.name,
// //         email: company.email,
// //         description:company.description,
// //         website: company.website,
// //         roles:company.roles,
// //       };

// //       return res.json({ user: companyData });
// //     }


// //   try {
// //     const user = await User.findById(req.userId).select('-password');
// //     if (!user) return res.status(404).json({ message: 'User not found' });

// //     const userData = {
// //       id: user._id,
// //       name: user.name,
// //       email: user.email,
// //       roles: user.roles,
// //       profile: user.profile,
// //       resume: user.resume,
// //     };

// //     res.json({ user: userData });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };

// // the above one is the one which was working initially 


// exports.getme = async (req, res) => {
//   try {
//     const { userId, roles } = req.user;

//     // Handle company user
//     if (roles === 'company') {
//       const company = await Company.findById(userId).select('-password');
//       if (!company) return res.status(404).json({ message: 'Company not found' });

//       return res.json({ 
//         user: {
//           id: company._id,
//           name: company.name,
//           email: company.email,
//           description: company.description,
//           website: company.website,
//           roles: company.roles,
//           userType: 'company'
//         }
//       });
//     }

//     // Handle regular users
//     const user = await User.findById(userId).select('-password');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json({ 
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         roles: user.roles,
//         profile: user.profile,
//         resume: user.resume,
//         userType: 'user'
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.logout = (req, res) => {
//   res.clearCookie('accessToken', {
//     httpOnly: true,
//     // secure: process.env.NODE_ENV === 'production',
//     sameSite: 'Strict',
//   });
//   res.status(200).json({ message: 'Logged out successfully' });
// };







const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Company = require('../models/Company');

// Token creation helpers
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

const clearAuthCookies = (res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  });
  
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    path: '/api/auth/refresh'
  });
};

// User data formatter
const formatUserData = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  roles: user.roles,
  ...(user.profile && { profile: user.profile }),
  ...(user.resume && { resume: user.resume }),
  userType: user.constructor.modelName
});

// Auth services
// exports.signup = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     if (await User.findOne({ email })) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const user = new User({
//       name,
//       email,
//       password: await bcrypt.hash(password, 10)
//     });

//     await user.save();

//     const accessToken = createAccessToken(user);
//     const refreshToken = createRefreshToken(user);
//     setAuthCookies(res, accessToken, refreshToken);

//     res.status(201).json({ user: formatUserData(user) });
//   } catch (err) {
//     console.error('Signup error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

exports.signup = async (req, res) => {
  const { name, email, password,isCompany } = req.body;

  console.log(isCompany)

  if (isCompany) {
  
        try {
          let company = await Company.findOne({ email });
          if (company) return res.status(400).json({ message: 'Company already exists' });
      
          const hashedPassword = await bcrypt.hash(password, 10);
      
          company = new Company({
            name,
            email,
            password: hashedPassword,
            
          });
      
          await company.save();
      
          const accessToken = createAccessToken(company);
          const refreshToken = createRefreshToken(company);
          setAuthCookies(res, accessToken, refreshToken);
      
          res.status(201).json({company: { id: company._id, name: company.name, email: company.email } });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Server error' });
        }
      
  }else{

  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await user.save();

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    setAuthCookies(res, accessToken, refreshToken);

    res.status(201).json({ user: formatUserData(user) });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }

}
};



exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Try User collection first
    let entity = await User.findOne({ email });
    let entityType = 'User';

    // Try Company collection if not found
    if (!entity) {
      entity = await Company.findOne({ email });
      entityType = 'Company';
      if (!entity) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    }

    // Verify password
    if (!(await bcrypt.compare(password, entity.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate tokens
    const accessToken = createAccessToken(entity);
    const refreshToken = createRefreshToken(entity);
    setAuthCookies(res, accessToken, refreshToken);

    // Respond with formatted entity data
    const responseData = {
      [entityType.toLowerCase()]: formatUserData(entity)
    };

    res.status(200).json(responseData);
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    
    // Find user in either collection
    let user = await User.findById(decoded.userId);
    if (!user) user = await Company.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Rotate refresh token (optional but recommended)
    const newAccessToken = createAccessToken(user);
    const newRefreshToken = createRefreshToken(user);
    setAuthCookies(res, newAccessToken, newRefreshToken);

    res.status(200).json({ message: 'Tokens refreshed successfully' });
  } catch (err) {
    console.error('Refresh error:', err);
    clearAuthCookies(res);
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

exports.getme = async (req, res) => {
  try {
    const { userId, roles } = req.user;
    let entity;

    if (roles === 'company') {
      entity = await Company.findById(userId).select('-password');
    } else {
      entity = await User.findById(userId).select('-password');
    }

    if (!entity) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: formatUserData(entity) });
  } catch (err) {
    console.error('GetMe error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = (req, res) => {
  clearAuthCookies(res);
  res.status(200).json({ message: 'Logged out successfully' });
};



