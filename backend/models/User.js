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
  googleId: { 
    type: String, 
    unique: true, 
    sparse: true 
  },
  password: { 
    type: String,
    select:false,
    required: function () {
      return !this.googleId;
    }
  },
  role: { 
    type: String, 
    enum: ['student', 'teacher'], 
    default: 'student' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
