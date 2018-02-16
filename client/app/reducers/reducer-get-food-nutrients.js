import * as asyncActions from '../actions/async-actions';
import * as actions from '../actions/index';
import api from '../utils/api';
import { createStore } from 'redux';

const initialState = [];

export const getFoodsFromKeyword = (state=[], action) => {
	if(action.type === asyncActions.KEYWORD){
        return [...action.payload];
        }
	return state;
};

export const getNutritionFromSelectedFood = (state=[], action) => {
    if (action.type === asyncActions.SELECTED_FOOD) {
        return [...action.payload];
    }
    return state;
};

