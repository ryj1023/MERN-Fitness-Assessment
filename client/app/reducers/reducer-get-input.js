
import * as actions from '../actions';

const initialState = {
	answers: [],
};

const answerReducer = (state = initialState, action) => {
	if(action.type === actions.ADD_ANSWER){
		return Object.assign({}, state, {
			answers: [...state.answers, {input: action}]
		})
	}
	return state;
}

export default answerReducer;

