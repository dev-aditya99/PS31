const Progress = require("../models/Progress");
const { predictCareer } = require("../helpers/aiHelper"); // Gemini AI helper function

// Generate career prediction for a user
exports.generatePrediction = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    // Get user progress
    const progress = await Progress.findOne({ userId });
    if (!progress) return res.status(404).json({ message: "Progress not found" });

    // Use AI to predict career
    const careerSuggestion = await predictCareer(progress.skillScores);

    // Save career prediction in Progress
    if (careerSuggestion) {
      progress.predictedCareers.push({
        name: careerSuggestion.name,
        confidence: careerSuggestion.confidence,
        predictedAt: new Date(),
      });
      await progress.save();
    }

    res.json({ message: "Career prediction generated", careerSuggestion });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating career prediction", error: err.message });
  }
};

// Get latest career prediction for a user
exports.getPrediction = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const progress = await Progress.findOne({ userId });
    if (!progress) return res.status(404).json({ message: "Progress not found" });

    // Get the latest prediction
    const latestPrediction = progress.predictedCareers.slice(-1)[0] || null;

    res.json({ latestPrediction });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching career prediction", error: err.message });
  }
};
