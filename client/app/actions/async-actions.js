import api from '../utils/api';
import axios from 'axios';
export const KEYWORD= 'KEYWORD';
export const SELECTED_FOOD = 'SELECETED_FOOD';
export const RESOLVED_FOOD_OBJECT = 'RESOLVED_FOOD_OBJECT';
export const REQUEST_SUCCEEDED = 'REQUEST_SUCCEEDED';
export const SIGNUP_ERRORS = 'SIGNUP_ERRORS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const DUPLICATE_EMAIL = 'DUPLICATE_EMAIL';
export const NO_ACCOUNT = 'NO_ACCOUNT';
export const ACCOUNT_FOUND = 'ACCOUNT_FOUND';

export const getFoodSearchKeyword = (keyword) => {
	const encodedURI = window.encodeURI(`https://api.nal.usda.gov/ndb/search/?format=json&api_key=Uexsdv07ZLPp9MU9LUtJQ5iEgASowWwa6s1yEcI8&callback=&max=10&q=${keyword}&sort=r`)
    return (dispatch) => {
    axios.get(encodedURI)
	.then((response) => {
            const foodObjects = response.data.list.item.map((food) => {
                return { 
                    foodName: food.name,
                    foodID: food.ndbno
                }
            })
			return dispatch({type: KEYWORD, payload: foodObjects})
        })
        .catch((err) => {
            throw err;
        })
    };
}

export const getFoodNutritionFacts = (food) => {
    const encodedURI = window.encodeURI(`https://api.nal.usda.gov/ndb/reports/?format=json&api_key=Uexsdv07ZLPp9MU9LUtJQ5iEgASowWwa6s1yEcI8&ndbno=${food}&type=f`)
    return (dispatch) => {
        axios.get(encodedURI)
        .then((response) => {
                const foodObjects = response.data.report.food.nutrients.map((food) => food);
                return dispatch({type: SELECTED_FOOD, payload: foodObjects})
            })
        .catch((err)=> {
            throw err
        })
    };
}

export const getUserData = (data) => {
    const encodedURI = window.encodeURI(`/api/users`)
    return (dispatch) => {
        axios.get(encodedURI)
        .then((response) => {
            console.log('response', response)
            });
        };
}

export const saveUserData = (userData) => {
    const encodedURI = window.encodeURI(`/api/save`)
    return (dispatch) => {
        axios.post(encodedURI, {
            userData: userData.dietInfo,
            userName: userData.userName,
        })
    };
}

export const loginUser = (loginData) => {
    const encodedURI = window.encodeURI(`/api/login`)
    return (dispatch) => {
         axios.get(encodedURI, {
            params: {
                email: loginData.email,
                password: loginData.password,
              }, 
        })
        .then((response) => {
            if (response.data.length > 0) {
                return dispatch({type: ACCOUNT_FOUND, payload: response.data})
                } else {
                    return dispatch({type: NO_ACCOUNT})
                }
            });
        };
    }

export const validateSignUp = (signUpInfo) => {
    const encodedURI = window.encodeURI(`/api/validation`)
    return (dispatch) => {
        axios.post(encodedURI, {
            email: signUpInfo.email,
            password: signUpInfo.password,
            confirmPassword: signUpInfo.confirmPassword
        }).then((res) => {
            if (typeof res.data === 'object') {
                const errors = res.data.map((err) => err.msg)
                return dispatch({type: SIGNUP_ERRORS, payload: errors})
            } else if (res.data === 'validated') {
                const encodedURI = window.encodeURI(`/api/validation/email`)
                    axios.post(encodedURI, {
                        email: signUpInfo.email,
                        password: signUpInfo.password,
                    }).then((res) => {
                        console.log('res.data', res.data)
                        if (!res.data.user && res.data.includes('account with this email')) {
                            return dispatch({type: DUPLICATE_EMAIL, payload: res.data})
                        } else {
                            // state change, set session, and redirect
                            const token = res.data.token;
                            localStorage.setItem('jwtToken', token)
                            return dispatch({type: SIGNUP_SUCCESS, payload: 'success'})
                        }
                    })
                // return dispatch({type: SIGNUP_SUCCESS, payload: 'success'})
            }
        })
    }
}

