// import {combineReducers} from 'redux';
// import QuestionReducer from './reducer_questions';
// import getInputReducer from './reducer_get_input';

// const rootReducer = combineReducers({
// 	questions: QuestionReducer,
// 	answers: getInputReducer

// })

// export default rootReducer;

import { combineReducers } from 'redux';
import QuestionReducer from './reducer-questions';
import getInputReducer from './reducer-get_input';
import calculateClientInfo from './reducer-calculate-client_info';
import foodList from './reducer-get-food-nutrients';

const rootReducer = combineReducers({
	questions: QuestionReducer,
	answers: getInputReducer,
	clientInfo: calculateClientInfo,
	foodList 
})

export default rootReducer;