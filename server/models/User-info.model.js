const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
  user: {
    userName: String,
    email: String,
    password: String,
    dietInfo: {
      calories: Number,
      protein: Number,
      fat: Number,
      carbs: Number,
    },
    userDietSummary: Array, 
    workouts: [String]
  }
});

module.exports = mongoose.model('users', UserDataSchema, 'user_data');
