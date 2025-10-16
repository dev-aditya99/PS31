const Progress = require("../models/Progress");
const { predictCareer } = require("../helper/aiHelper"); // Gemini AI helper function

// Helper to wrap async functions
const wrapAsync = (fn) => {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Generate career prediction for a user
const generatePrediction = wrapAsync(async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: "User ID is required" });

  // Get user progress
  const progress = await Progress.findOne({ userId });
  if (!progress) return res.status(404).json({ message: "Progress not found" });

  // Use AI to predict career
  const careerSuggestion = await predictCareer(progress.skillScores);

  // Save career prediction in Progress
  if (careerSuggestion) {
    if (!progress.predictedCareers) progress.predictedCareers = [];
    progress.predictedCareers.push({
      name: careerSuggestion.name,
      confidence: careerSuggestion.confidence,
      predictedAt: new Date(),
    });
    await progress.save();
  }

  res.json({ message: "Career prediction generated", careerSuggestion });
});

// Get latest career prediction for a user
const getPrediction = wrapAsync(async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ message: "User ID is required" });

  const progress = await Progress.findOne({ userId });
  if (!progress) return res.status(404).json({ message: "Progress not found" });

  // Get the latest prediction
  const latestPrediction = progress.predictedCareers?.slice(-1)[0] || null;

  res.json({ latestPrediction });
});

// Export all functions
module.exports = {
  generatePrediction,
  getPrediction
};
