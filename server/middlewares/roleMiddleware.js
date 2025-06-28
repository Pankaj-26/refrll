const roleMiddleware = (requiredRole) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // req.user.role should be set from JWT or from DB after authMiddleware
  if (req.user.role !== requiredRole) {
    return res.status(403).json({ message: 'Forbidden: Insufficient role' });
  }

  next();
};

module.exports = roleMiddleware;
