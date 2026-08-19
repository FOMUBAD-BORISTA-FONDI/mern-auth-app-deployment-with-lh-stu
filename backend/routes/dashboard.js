const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/role");

// @route  GET /api/dashboard/admin
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.status(200).json({
    message: `Welcome ${req.user.name}, here is the Admin dashboard. This page will be implemented soon.`,
    role: "admin",
  });
});

// @route  GET /api/dashboard/user
router.get("/user", protect, authorize("user", "admin"), (req, res) => {
  res.status(200).json({
    message: `Welcome ${req.user.name}, here is the User dashboard. This page will be implemented soon.`,
    role: "user",
  });
});

module.exports = router;
