
import { combineReducers } from 'redux';
import userData from './reducer-user-login';
import questionReducer from './reducer-questions';
import getInputReducer from './reducer-get-input';
import savedFoodData from './saved-food-data'
import calculateClientInfo from './reducer-calculate-client-info';
import updatedUserFoodList from './update-food-list';
import * as foods from './reducer-get-food-nutrients';
import * as validation from './reducer-signup-validation';
import dailyDietGoals from './user-daily-diet-goals';


const rootReducer = combineReducers({
	questions: questionReducer,
	answers: getInputReducer,
	clientInfo: calculateClientInfo,
	foodList: foods.getFoodsFromKeyword,
	nutritionFacts: foods.getNutritionFromSelectedFood,
	/**/
	dailyDietGoals,
	validationErrors: validation.validateSignUpInput,
	signUpErrors: validation.validateNewEmail,
	userData,
	updatedUserFoodList,
	savedFoodData
})

export default rootReducer;