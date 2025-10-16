const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
},
  skills: [{ type: String }],
  predictedCareers: [{ 
    career: String, 
    confidence: Number 
}],
},{timestamps:true}
);

let CareerPrediction = mongoose.model('CareerPrediction', careerSchema);
module.exports = CareerPrediction;
