const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    unique: true 
  },

  // topics map → key = topic name, value = topic progress
  topics: {
    type: Map,
    of: new mongoose.Schema({
      servedCount: { type: Number, default: 0 }, // number of questions served for this topic
      skillScores: {
        type: Map,
        of: {
          correct: { type: Number, default: 0 },
          total: { type: Number, default: 0 }
        },
        default: {}
      },
      currentDifficulty: { type: Number, min: 1, max: 5, default: 1 },
      predictedCareers: [
        {
          name: { type: String },
          confidence: { type: Number, min: 0, max: 1 },
          predictedAt: { type: Date, default: Date.now }
        }
      ]
    }),
    default: {}
  },

  // rolling accuracy (last N questions) global (optional)
  recentAccuracy: {
    type: Number,
    default: 1.0, // 0–1 scale
  }

}, { timestamps: true });

module.exports = mongoose.model("Progress", progressSchema);
