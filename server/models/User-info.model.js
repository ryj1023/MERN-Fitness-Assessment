const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
  user: {
    userName: String,
    email: String,
    dietInfo: {
      calories: Number,
      protein: Number,
      fat: Number,
      carbs: Number,
    },
    workouts: [String]
  }
});

module.exports = mongoose.model('users', UserDataSchema);
