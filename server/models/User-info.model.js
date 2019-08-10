const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId

// const UserDataSchema = new mongoose.Schema({
//   user: {
//     userName: String,
//     email: String,
//     password: String,
//     dietInfo: {
//       calories: Number,
//       protein: Number,
//       fat: Number,
//       carbs: Number,
//     },
//     userDietSummary: Array,
//     workouts: [String]
//   }
// });

const UserDataSchema = new mongoose.Schema({
    user: {
        userName: String,
        email: String,
        password: String,
        dietGoal: {
            calories: Number,
            protein: Number,
            fat: Number,
            carbs: Number,
        },
        selectedFoods: Array,
        workouts: [String],
    },
})

module.exports = mongoose.model('users', UserDataSchema, 'user_data')
