import * as actions from '../actions';

const initialState = {
	foodList: []
}

const updateFoodList = (state = initialState, action) => {
	if(action.type === actions.UPDATED_FOOD_CHART){
		return Object.assign({}, state, {
			foodList: [...action.payload],
		})
	}
	return state;
}

export default updateFoodList;