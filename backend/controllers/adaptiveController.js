const Response = require("../models/Response");
const Progress = require("../models/Progress");
const User = require("../models/User");
const Quiz = require("../models/Quiz");
const { predictNextQuestion, predictCareer } = require("../helper/aiHelper");

// Helper to wrap async functions
const wrapAsync = (fn) => {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Get next adaptive question using AI
const getNextQuestion = wrapAsync(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  // Get or create user's progress
  let progress = await Progress.findOne({ userId });
  if (!progress) {
    progress = await Progress.create({
      userId,
      currentDifficulty: 1,
      categoryDefaultsServed: false,
      skillScores: {},
      predictedCareers: [],
    });
  }

  // Serve default 5 category questions if not served yet
  if (!progress.categoryDefaultsServed) {
    const defaultQuestions = await Quiz.find({ category: user.category }).limit(5);
    progress.categoryDefaultsServed = true;
    await progress.save();
    return res.json({ questions: defaultQuestions, message: "Default category questions served" });
  }

  // Already answered questions
  const answeredQuestions = await Response.find({ userId }).select("questionId");
  const answeredIds = answeredQuestions.map(q => q.questionId.toString());

  // Use AI to predict next question
  const aiQuestion = await predictNextQuestion(progress, answeredIds);

  res.json(aiQuestion);
});

// Submit answer and update progress + career prediction
const submitAnswer = wrapAsync(async (req, res) => {
  const { userId, questionId, selectedOption, timeTaken } = req.body;

  const question = await Quiz.findById(questionId);
  if (!question) return res.status(404).json({ message: "Question not found" });

  const correct = question.correctAnswer === selectedOption;

  // Save response
  await Response.create({ userId, questionId, selectedOption, correct, timeTaken });

  // Update Progress
  let progress = await Progress.findOne({ userId });
  if (!progress) {
    progress = await Progress.create({ userId, currentDifficulty: 1, skillScores: {}, predictedCareers: [] });
  }

  // Update rolling accuracy
  const recentResponses = await Response.find({ userId }).sort({ createdAt: -1 }).limit(10);
  const accuracy = recentResponses.filter(r => r.correct).length / recentResponses.length;
  progress.recentAccuracy = accuracy;

  // Update skillScores
  if (!progress.skillScores[question.skillTag]) progress.skillScores[question.skillTag] = { correct: 0, total: 0 };
  progress.skillScores[question.skillTag].total += 1;
  if (correct) progress.skillScores[question.skillTag].correct += 1;

  // Adjust difficulty
  if (accuracy >= 0.8) progress.currentDifficulty = Math.min(progress.currentDifficulty + 1, 5);
  else if (accuracy < 0.5) progress.currentDifficulty = Math.max(progress.currentDifficulty - 1, 1);

  // Update AI career prediction
  const careerSuggestion = await predictCareer(progress.skillScores);
  if (careerSuggestion) {
    if (!progress.predictedCareers) progress.predictedCareers = [];
    progress.predictedCareers.push({
      name: careerSuggestion.name,
      confidence: careerSuggestion.confidence,
      predictedAt: new Date()
    });
  }

  await progress.save();

  res.json({
    correct,
    explanation: question.explanation,
    currentDifficulty: progress.currentDifficulty,
    careerSuggestion
  });
});

// Get user progress
const getUserProgress = wrapAsync(async (req, res) => {
  const userId = req.params.userId;
  const progress = await Progress.findOne({ userId });
  if (!progress) return res.status(404).json({ message: "Progress not found" });
  res.json(progress);
});

// Get career recommendation using AI
const getCareerRecommendation = wrapAsync(async (req, res) => {
  const userId = req.params.userId;
  const progress = await Progress.findOne({ userId });
  if (!progress) return res.status(404).json({ message: "Progress not found" });

  const careerSuggestion = await predictCareer(progress.skillScores);

  // Save career prediction in progress
  if (careerSuggestion) {
    if (!progress.predictedCareers) progress.predictedCareers = [];
    progress.predictedCareers.push({
      name: careerSuggestion.name,
      confidence: careerSuggestion.confidence,
      predictedAt: new Date()
    });
    await progress.save();
  }

  res.json(careerSuggestion);
});

module.exports = {
  getNextQuestion,
  submitAnswer,
  getUserProgress,
  getCareerRecommendation
};
