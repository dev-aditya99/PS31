const express = require("express");
const router = express.Router();
const { generatePrediction, getPrediction } = require("../controllers/careerController");
const auth= require("../middlewares/auth") // optional

// Generate career prediction
router.post("/", auth, generatePrediction);

// // Get latest prediction for user
router.get("/:userId",auth, getPrediction);

module.exports = router;
