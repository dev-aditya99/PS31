const Quiz = require("../models/Quiz");

// Admin / Teacher only CRUD 

// Add new question
exports.addQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer, difficulty, skillTag } = req.body;
    if (!question || !options || !correctAnswer)
      return res.status(400).json({ message: "Missing required fields" });

    const newQuestion = await Quiz.create({
      question,
      options,
      correctAnswer,
      difficulty,
      skillTag,
    });

    res.status(201).json({ message: "Question added successfully", newQuestion });
  } catch (error) {
    res.status(500).json({ message: "Error adding question", error: error.message });
  }
};

// Update existing question
exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Quiz.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Question not found" });

    res.status(200).json({ message: "Question updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating question", error: error.message });
  }
};

// Delete question
exports.deleteQuestion = async (req, res) => {
  try {
    const deleted = await Quiz.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Question not found" });

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting question", error: error.message });
  }
};

// Get question by ID (optional for admin / testing)
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Quiz.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: "Error fetching question", error: error.message });
  }
};
