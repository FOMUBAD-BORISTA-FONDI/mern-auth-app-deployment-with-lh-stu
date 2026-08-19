// Usage: authorize("admin") or authorize("admin", "user")
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. This route requires role(s): ${allowedRoles.join(", ")}`,
      });
    }
    next();
  };
};

module.exports = { authorize };
