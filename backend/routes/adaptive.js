const express = require("express");
const router = express.Router();
const { getNextQuestion, submitAnswer, getUserProgress, getCareerRecommendation } = require("../controllers/adaptiveController");
const { auth } = require("../middlewares/auth"); 

// // Get next AI-based question
// // router.get("/next/:userId", auth, getNextQuestion);

// // Submit answer and update progress
// router.post("/submit", auth, submitAnswer);

// // Get user progress
// router.get("/progress/:userId", auth, getUserProgress);

// // Get AI career recommendation
// router.get("/career/:userId", auth, getCareerRecommendation);

module.exports = router;

