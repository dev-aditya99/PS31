const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    default: "No explanation provided.",
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 5,
    default: 1, // 1 (very easy) and  5 (very hard)
  },
  skillTag: {
    type: String,
    default: "general", // e.g., "loops", "arrays", "probability"
  },
  usedCount: {
    type: Number,
    default: 0, 
  },
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);
