const User = require("../models/User");

// This middleware assumes req.user.id is already set by authMiddleware
const teacher = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if role is teacher
    if (user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied. Teachers only." });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = teacher;
