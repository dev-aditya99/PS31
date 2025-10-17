const express = require("express");
const router = express.Router();
const { getNextQuestion, submitAnswer, getUserProgress, generateFeedbackReport } = require("../controllers/adaptiveController");
const auth = require("../middlewares/auth");

// // Get next AI-based question
router.post("/next/:userId", auth, getNextQuestion);

// // Submit answer and update progress
router.post("/submit", auth, submitAnswer);

// // Get user progress
router.get("/progress/:userId", auth, getUserProgress);

// Get AI feedback report after quiz completion
router.get("/feedback/:userId/:topic", auth, generateFeedbackReport);


module.exports = router;

