const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true 
},
  quizId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Quiz', 
    required: true 
},
  answers: [{
        questionId: { type: mongoose.Schema.Types.ObjectId, 
            ref: "Question", 
            required: true 
        },
        selectedOption: { 
            type: String, 
            required: true 
        },
    }],
  score: { type: Number },
},{
    timestamps:true
});

let Response= mongoose.model('Response', responseSchema);
module.exports = Response;
