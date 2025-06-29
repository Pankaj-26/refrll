
// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
 
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     const token = authHeader.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

   

//     // Attach the entire payload for easier access to roles, email etc.
//     req.user = decoded;
//     req.userId = decoded.userId; 
//     req.userType = decoded.roles; 
    
    
    
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };




// module.exports = authMiddleware;



const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Check for token in cookies first
  let token = req.cookies.accessToken;

 
  
  // Fallback to Authorization header
  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    req.userId = decoded.userId; 
    req.userType = decoded.roles; 
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(403).json({ message: 'Invalid token' });
  }
};

const refreshMiddleware = (req, res, next) => {
  const token = req.cookies.refreshToken;
  
  if (!token) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);


    req.user = decoded;
    req.userId = decoded.userId; 
    req.userType = decoded.roles; 
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

module.exports =  authMiddleware,refreshMiddleware

