
import { combineReducers } from 'redux';
import userData from './reducer-user-login';
import QuestionReducer from './reducer-questions';
import getInputReducer from './reducer-get-input';
import calculateClientInfo from './reducer-calculate-client-info';
import updatedUserFoodList from './update-food-list';
import * as foods from './reducer-get-food-nutrients';
import * as validation from './reducer-signup-validation';


const rootReducer = combineReducers({
	questions: QuestionReducer,
	answers: getInputReducer,
	clientInfo: calculateClientInfo,
	foodList: foods.getFoodsFromKeyword,
	nutritionFacts: foods.getNutritionFromSelectedFood,
	validationErrors: validation.validateSignUpInput,
	signUpErrors: validation.validateNewEmail,
	userData,
	updatedUserFoodList
})

export default rootReducer;