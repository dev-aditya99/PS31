const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['student', 'teacher'], 
    default: 'student' 
   },
  createdAt: {
     type: Date, 
     default: Date.now 
    },
});

let User = mongoose.model('User', userSchema);
module.exports = User;
