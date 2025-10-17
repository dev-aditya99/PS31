const Response = require("../models/Response");
const Progress = require("../models/Progress");
const User = require("../models/User");
const Quiz = require("../models/Quiz");
const { predictNextQuestion, predictCareer } = require("../helper/aiHelper");

const wrapAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Get adaptive next 5 questions
const getNextQuestion = wrapAsync(async (req, res) => {
  const { userId } = req.params;
  const { topic } = req.body;
  console.log("topic", topic);

  const batchSize = 5;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  let progress = await Progress.findOne({ userId });
  if (!progress) progress = await Progress.create({ userId, topics: {} });

  if (!progress.topics[topic]) {
    progress.topics[topic] = {
      servedCount: 0,
      skillScores: {},
      predictedCareers: [],
      currentDifficulty: 1,
    };
  }

  const served = progress.topics[topic].servedCount;
  let questions = [];

  // If first time → generate first batch from AI
  if (served === 0) {
    const aiQuestions = await predictNextQuestion(
      { currentDifficulty: 1 },
      [],
      topic,
      batchSize
    );

    questions = aiQuestions;

    for (const aiQ of aiQuestions) {
      const saved = await Quiz.create({
        topic,
        question: aiQ.question,
        options: aiQ.options,
        correctAnswer: aiQ.correctAnswer,
        difficulty: aiQ.difficulty,
        skillTag: aiQ.skillTag,
        generatedByAI: true,
      });
    }
  }
  // fter each 5 → adapt based on last 5 answers
  else {
    const recentResponses = await Response.find({ userId, topic })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    if (!recentResponses.length)
      return res.status(400).json({ message: "No recent responses found" });

    const accuracy = recentResponses.filter(r => r.correct).length / recentResponses.length;
    const topicProgress = progress.topics[topic];

    topicProgress.currentDifficulty =
      accuracy >= 0.8
        ? Math.min(topicProgress.currentDifficulty + 1, 5)
        : accuracy < 0.5
          ? Math.max(topicProgress.currentDifficulty - 1, 1)
          : topicProgress.currentDifficulty;

    const aiQuestions = await predictNextQuestion(
      topicProgress,
      recentResponses,
      topic,
      batchSize
    );

    for (const aiQ of aiQuestions) {
      const saved = await Quiz.create({
        topic,
        question: aiQ.question,
        options: aiQ.options,
        correctAnswer: aiQ.correctAnswer,
        difficulty: aiQ.difficulty,
        skillTag: aiQ.skillTag,
        generatedByAI: true,
      });
      questions.push(saved);
    }
  }

  progress.topics[topic].servedCount += questions.length;
  await progress.save();

  res.json({
    message: `Next ${batchSize} adaptive questions generated.`,
    currentDifficulty: progress.topics[topic].currentDifficulty,
    questions,
  });
});

// Submit answer and update progress
const submitAnswer = wrapAsync(async (req, res) => {
  const { userId, topic, questionId, selectedOption } = req.body;

  const question = await Quiz.findById(questionId);
  if (!question) return res.status(404).json({ message: "Question not found" });

  const alreadyAnswered = await Response.findOne({ userId, questionId });
  if (alreadyAnswered)
    return res.status(400).json({ message: "Already answered" });

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
    difficulty: question.difficulty,
  });

  let progress = await Progress.findOne({ userId });
  const topicProgress = progress.topics[topic];
  const skillTag = question.skillTag || "general";

  if (!topicProgress.skillScores[skillTag])
    topicProgress.skillScores[skillTag] = { correct: 0, total: 0 };

  topicProgress.skillScores[skillTag].total += 1;
  if (correct) topicProgress.skillScores[skillTag].correct += 1;

  await progress.save();

  res.json({ message: "Answer recorded", correct });
});

// User progress
const getUserProgress = wrapAsync(async (req, res) => {
  const { userId, topic } = req.params;
  const progress = await Progress.findOne({ userId });
  if (!progress || !progress.topics[topic])
    return res.status(404).json({ message: "Progress not found" });
  res.json(progress.topics[topic]);
});

// AI-based Feedback Report
const generateFeedbackReport = wrapAsync(async (req, res) => {
  const { userId, topic } = req.params;

  const progress = await Progress.findOne({ userId });
  if (!progress || !progress.topics[topic])
    return res.status(404).json({ message: "Progress not found" });

  const responses = await Response.find({ userId, topic }).populate("questionId");
  if (responses.length < 20)
    return res.status(400).json({ message: "At least 20 responses needed for feedback." });

  const skillScores = progress.topics[topic].skillScores;
  const skillReport = Object.entries(skillScores).map(([skill, data]) => ({
    skill,
    accuracy: ((data.correct / data.total) * 100).toFixed(2) + "%"
  }));

  const aiFeedback = await predictCareer(skillScores);

  const report = {
    totalQuestions: responses.length,
    correctAnswers: responses.filter(r => r.correct).length,
    incorrectAnswers: responses.filter(r => !r.correct).length,
    skillReport,
    predictedCareers: aiFeedback.careerPaths || [],
    generatedAt: new Date(),
  };

  res.json(report);
});

module.exports = {
  getNextQuestion,
  submitAnswer,
  getUserProgress,
  generateFeedbackReport,
};
