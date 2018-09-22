import * as actions from '../actions';

const initialState = {
	updatedUserData: []
}

const updateFoodList = (state = initialState, action) => {
	if(action.type === actions.UPDATED_FOOD_CHART){
		return Object.assign({}, state, {
            	updatedUserData: [...action.payload, action.record],
		})
	}
	return state;
}

export default updateFoodList;