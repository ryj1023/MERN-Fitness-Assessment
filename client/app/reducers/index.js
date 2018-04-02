
import { combineReducers } from 'redux';
import QuestionReducer from './reducer-questions';
import getInputReducer from './reducer-get-input';
import calculateClientInfo from './reducer-calculate-client-info';
import * as foods from './reducer-get-food-nutrients';
import * as validation from './reducer-signup-validation';

const rootReducer = combineReducers({
	questions: QuestionReducer,
	answers: getInputReducer,
	clientInfo: calculateClientInfo,
	foodList: foods.getFoodsFromKeyword,
	nutritionFacts: foods.getNutritionFromSelectedFood,
	validationErrors: validation.validateSignUpInput,
	signUpErrors: validation.validateNewEmail
})

export default rootReducer;