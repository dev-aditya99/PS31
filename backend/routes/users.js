const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getProfile } = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware"); // optional auth middleware

// Register new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get logged-in user profile
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
