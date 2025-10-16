const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    unique: true 
  },

  // per-skill accuracy tracking
  skillScores: {
    type: Map,
    of: {
      correct: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    },
    default: {}
  },

  // rolling accuracy (last N questions)
  recentAccuracy: {
    type: Number,
    default: 1.0, // 0–1 scale
  },

  // current adaptive difficulty target
  currentDifficulty: {
    type: Number,
    min: 1,
    max: 5,
    default: 3,
  },

  
  predictedCareers: [
    {
      name: { type: String },
      confidence: { type: Number, min: 0, max: 1 },
      predictedAt: { type: Date, default: Date.now }
    }
  ],

  // track if default category questions already served
  categoryDefaultsServed: { type: Boolean, default: false },

}, { timestamps: true });

module.exports = mongoose.model("Progress", progressSchema);
