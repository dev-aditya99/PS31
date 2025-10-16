const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  questionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Quiz", 
    required: true 
  },
  topic: { 
    type: String, 
    required: true 
  },
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  selectedOption: { 
    type: String, 
    required: true 
  },
  correctAnswer: {
    type: String,
    required: true
  },
  correct: { 
    type: Boolean, 
    default: false 
  },
  skillTag: {
    type: String,
    default: "general"
  },
  timeTaken: { 
    type: Number, 
    default: 0 // in seconds
  },
}, { timestamps: true });

module.exports = mongoose.model("Response", responseSchema);
