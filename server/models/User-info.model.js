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
        dietGoals: {},
        selectedFoods: [
            {
                date: String,
                foodId: Number,
                foodName: String,
                servingSize: {
                    // qty: Number,
                    // type: String,
                },
                macroNutrients: {
                    // calories: { qty: Number, measure: String },
                    // protein: { qty: Number, measure: String },
                    // fat: { qty: Number, measure: String },
                    // carbs: { qty: Number, measure: String },
                },
            },
        ],
        workouts: [String],
    },
})

module.exports = mongoose.model('users', UserDataSchema, 'user_data')
