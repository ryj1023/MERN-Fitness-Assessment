import * as actions from '../actions/async_actions';
import api from '../utils/api';

const getFoodSearchKeyword = (state=[], action) => {
	if(action.type === actions.REQUEST_SUCCEEDED){
        return [...state, ...action.payload];
            }
	return state;
};

export default getFoodSearchKeyword;