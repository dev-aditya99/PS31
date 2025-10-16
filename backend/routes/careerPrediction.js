const express = require("express");
const router = express.Router();
const { generatePrediction, getPrediction } = require("../controllers/careerController");
const { authMiddleware } = require("../middlewares/authMiddleware"); // optional

// Generate career prediction
router.post("/", authMiddleware, generatePrediction);

// Get latest prediction for user
router.get("/:userId", authMiddleware, getPrediction);

module.exports = router;
