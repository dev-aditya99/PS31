const Response = require("../models/Response");
const Progress = require("../models/Progress");
const User = require("../models/User");
const Quiz = require("../models/Quiz");
const { predictNextQuestion, predictCareer } = require("../helper/aiHelper");

// Helper to wrap async functions
const wrapAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Get next adaptive question
const getNextQuestion = wrapAsync(async (req, res) => {
  const { userId } = req.params;
  const { topic } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  let progress = await Progress.findOne({ userId });
  if (!progress) {
    progress = await Progress.create({ userId, topics: {} });
  }

  if (!progress.topics[topic]) {
    progress.topics[topic] = {
      servedCount: 0,
      skillScores: {},
      predictedCareers: [],
      currentDifficulty: 1,
    };
  }

  let questions = [];

  // First 5 questions → check DB, generate if missing
  if (progress.topics[topic].servedCount < 5) {
    questions = await Quiz.find({ topic }).limit(5 - progress.topics[topic].servedCount);

    if (questions.length < 5) {
      const generateCount = 5 - questions.length;
      for (let i = 0; i < generateCount; i++) {
        const aiQuestion = await predictNextQuestion({ currentDifficulty: 1 }, []);
        const savedQ = await Quiz.create({
          topic,
          question: aiQuestion.question,
          options: aiQuestion.options,
          correctAnswer: aiQuestion.correctAnswer,
          difficulty: aiQuestion.difficulty,
          skillTag: aiQuestion.skillTag,
          generatedByAI: true,
        });
        questions.push(savedQ);
      }
    }
  } else {
    // Next questions → based on user progress + answered
    const answeredQuestions = await Response.find({ userId, topic }).select("questionId");
    const answeredIds = answeredQuestions.map((q) => q.questionId.toString());

    const topicProgress = { currentDifficulty: progress.topics[topic].currentDifficulty || 1 };
    const aiQuestion = await predictNextQuestion(topicProgress, answeredIds);

    const savedQ = await Quiz.create({
      topic,
      question: aiQuestion.question,
      options: aiQuestion.options,
      correctAnswer: aiQuestion.correctAnswer,
      difficulty: aiQuestion.difficulty,
      skillTag: aiQuestion.skillTag,
      generatedByAI: true,
    });
    questions.push(savedQ);
  }

  progress.topics[topic].servedCount += questions.length;
  await progress.save();

  res.json({ questions });
});

// Submit answer
const submitAnswer = wrapAsync(async (req, res) => {
  const { userId, topic, questionId, selectedOption } = req.body;

  const question = await Quiz.findById(questionId);
  if (!question) return res.status(404).json({ message: "Question not found" });

  const alreadyAnswered = await Response.findOne({ userId, questionId });
  if (alreadyAnswered) return res.status(400).json({ message: "Already answered" });

  const correct = question.correctAnswer === selectedOption;

  await Response.create({
    userId,
    topic,
    questionId,
    questionText: question.question,
    options: question.options,
    selectedOption,
    correctAnswer: question.correctAnswer,
    correct,
    skillTag: question.skillTag || "general",
  });

  // Update Progress
  let progress = await Progress.findOne({ userId });
  if (!progress.topics[topic]) {
    progress.topics[topic] = { servedCount: 0, skillScores: {}, predictedCareers: [], currentDifficulty: 1 };
  }

  if (!progress.topics[topic].skillScores) progress.topics[topic].skillScores = {};
  const skillTag = question.skillTag || "general";

  if (!progress.topics[topic].skillScores[skillTag])
    progress.topics[topic].skillScores[skillTag] = { correct: 0, total: 0 };

  progress.topics[topic].skillScores[skillTag].total += 1;
  if (correct) progress.topics[topic].skillScores[skillTag].correct += 1;

  // Update difficulty based on last 10 responses
  const recentResponses = await Response.find({ userId, topic }).sort({ createdAt: -1 }).limit(10);
  const accuracy = recentResponses.filter((r) => r.correct).length / recentResponses.length;
  progress.topics[topic].currentDifficulty =
    accuracy >= 0.8
      ? Math.min((progress.topics[topic].currentDifficulty || 1) + 1, 5)
      : accuracy < 0.5
      ? Math.max((progress.topics[topic].currentDifficulty || 1) - 1, 1)
      : progress.topics[topic].currentDifficulty || 1;

  // Update career prediction
  const careerSuggestion = await predictCareer(progress.topics[topic].skillScores);
  if (careerSuggestion) {
    if (!progress.topics[topic].predictedCareers) progress.topics[topic].predictedCareers = [];
    progress.topics[topic].predictedCareers.push({
      name: careerSuggestion.name,
      confidence: careerSuggestion.confidence,
      predictedAt: new Date(),
    });
  }

  await progress.save();

  res.json({
    message: "Answer recorded",
    correct,
    currentDifficulty: progress.topics[topic].currentDifficulty,
    careerSuggestion,
  });
});

// Get user progress per topic
const getUserProgress = wrapAsync(async (req, res) => {
  const { userId, topic } = req.params;
  const progress = await Progress.findOne({ userId });
  if (!progress || !progress.topics[topic]) return res.status(404).json({ message: "Progress not found" });
  res.json(progress.topics[topic]);
});

// Get AI career recommendation for user
const getCareerRecommendation = wrapAsync(async (req, res) => {
  const { userId } = req.params;
  const progress = await Progress.findOne({ userId });
  if (!progress) return res.status(404).json({ message: "User progress not found" });

  const skillScores = {};
  for (const [topic, data] of progress.topics.entries()) {
    for (const [skill, score] of Object.entries(data.skillScores)) {
      if (!skillScores[skill]) skillScores[skill] = { correct: 0, total: 0 };
      skillScores[skill].correct += score.correct;
      skillScores[skill].total += score.total;
    }
  }

  const careerSuggestion = await predictCareer(skillScores);
  res.json({ careerSuggestion });
});

module.exports = {
  getNextQuestion,
  submitAnswer,
  getUserProgress,
  getCareerRecommendation,
};
