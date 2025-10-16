const Quiz = require("../models/Quiz");

// Helper to wrap async functions
const wrapAsync = (fn) => {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Add new question (Admin / Teacher only)
const addQuestion = wrapAsync(async (req, res) => {
  const { question, options, correctAnswer, difficulty, skillTag } = req.body;
  if (!question || !options || !correctAnswer) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newQuestion = await Quiz.create({
    question,
    options,
    correctAnswer,
    difficulty,
    skillTag,
  });

  res.status(201).json({ message: "Question added successfully", newQuestion });
});

// Update existing question
const updateQuestion = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const updated = await Quiz.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Question not found" });

  res.status(200).json({ message: "Question updated successfully", updated });
});

// Delete question
const deleteQuestion = wrapAsync(async (req, res) => {
  const deleted = await Quiz.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Question not found" });

  res.status(200).json({ message: "Question deleted successfully" });
});

// Get question by ID (optional for admin / testing)
const getQuestionById = wrapAsync(async (req, res) => {
  const question = await Quiz.findById(req.params.id);
  if (!question) return res.status(404).json({ message: "Question not found" });

  res.status(200).json(question);
});

// Export all functions
module.exports = {
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionById
};
