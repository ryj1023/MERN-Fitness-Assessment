// import {combineReducers} from 'redux';
// import QuestionReducer from './reducer_questions';
// import getInputReducer from './reducer_get_input';

// const rootReducer = combineReducers({
// 	questions: QuestionReducer,
// 	answers: getInputReducer

// })

// export default rootReducer;

import { combineReducers } from 'redux';
import QuestionReducer from './reducer_questions';
import getInputReducer from './reducer_get_input';
import calculateClientInfo from './reducer_calculate_client_info';
import foodList from './reducer_get_food_nutrients';

const rootReducer = combineReducers({
	questions: QuestionReducer,
	answers: getInputReducer,
	clientInfo: calculateClientInfo,
	foodList 
})

export default rootReducer;