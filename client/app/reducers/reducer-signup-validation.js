import * as asyncActions from '../actions/async-actions';

export const validateSignUpInput = (state=[], action) => {
        if (action.type === asyncActions.SIGNUP_ERRORS){
                return [...action.payload];
        } else if (action.type === asyncActions.SIGNUP_SUCCESS){
                return action.payload
        }
	return state;
};

export const validateNewEmail = (state = [], action) => {
        if (action.type === asyncActions.DUPLICATE_EMAIL){
                return action.payload;
        } else if (action.type === asyncActions.SIGNUP_SUCCESS){
                return action.payload
        }
	return state; 
}
