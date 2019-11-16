import { combineReducers } from 'redux'
import userData from './reducer-user-login'
import savedFoodData from './saved-food-data'
import calculateClientInfo from './reducer-calculate-client-info'
import updatedUserFoodList from './update-food-list'
import foodRecipes from './get-food-recipes'
import * as foods from './reducer-get-food-nutrients'
import * as validation from './reducer-signup-validation'
import dailyDietGoals from './user-daily-diet-goals'

const rootReducer = combineReducers({
    clientInfo: calculateClientInfo,
    foodList: foods.getFoodsFromKeyword,
    nutritionFacts: foods.getNutritionFromSelectedFood,
    dailyDietGoals,
    validationErrors: validation.validateSignUpInput,
    signUpErrors: validation.validateNewEmail,
    userData,
    updatedUserFoodList,
    savedFoodData,
    foodRecipes,
})

export default rootReducer
