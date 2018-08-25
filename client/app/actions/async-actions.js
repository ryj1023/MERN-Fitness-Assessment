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
export const FOOD_ITEM_SAVED = 'FOOD_ITEM_SAVED';

// API key 9f0bbbda4cb847039bfa501b34dc58c7

export const saveToUsersFoodList = (foodName, foodFacts, user) => {
    const encodedURI = window.encodeURI(`/api/save-food-item`);
    console.log('before')
    axios.post(encodedURI, {
        userDietSummary: { foodName, foodFacts },
            email: user.email
    }).then(res => {
        console.log('done', res)
        // return dispatch({type: FOOD_ITEM_SAVED, payload: res.data})
    })
    // return (dispatch) => {
    //     console.log('after')
    //     axios.post(encodedURI, {
    //         userDietSummary: { foodName, foodFacts },
    //             email: user.email
    //     }).then(res => {
    //         console.log('done', res)
    //     })
    // }
};

export const getFoodSearchKeyword = (keyword, offset = 0) => {
	const encodedURI = window.encodeURI(`https://api.nal.usda.gov/ndb/search/?format=json&api_key=Uexsdv07ZLPp9MU9LUtJQ5iEgASowWwa6s1yEcI8&callback=&max=100&q=${keyword}&offset=${offset}&sort=r`)
    return (dispatch) => {
    axios.get(encodedURI)
	.then((response) => {
            const foodObjects = response.data.list.item.map((food) => {
                return { 
                    foodName: food.name,
                    foodID: food.ndbno
                }
            })
            console.log('foodObjects', foodObjects.length)
			return dispatch({type: KEYWORD, payload: foodObjects})
        })
        .catch((err) => {
            console.log('err', err)
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
    const encodedURI = window.encodeURI(`/api/save`);
    console.log('dispatching')
    return () => {
        axios.post(encodedURI, {
        userData: userData.dietInfo,
        userName: userData.userName,
        }).then(res => {
            console.log('done', res)
        })
    }

    // return () => {
    //     console.log('dispatched')
    //     axios.post(encodedURI, {
    //         userData: userData.dietInfo,
    //         userName: userData.userName,
    //     })
    // };
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
    const encodedURI = window.encodeURI('/api/validation');
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
                 const userSubmittedData = JSON.parse(localStorage.getItem('submittedUserMetrics'));
                const encodedURI = window.encodeURI('/api/validation/create-user')
                    axios.post(encodedURI, {
                        email: signUpInfo.email,
                        userName: signUpInfo.userName,
                        password: signUpInfo.password,
                        calories: userSubmittedData ? userSubmittedData.calories : null,
                        protein: userSubmittedData ? userSubmittedData.protein : null,
                        fat: userSubmittedData ? userSubmittedData.fat : null,
                        carbs: userSubmittedData ? userSubmittedData.carbs : null,
                        programs: userSubmittedData ? userSubmittedData.programs : [],
                    }).then((res) => {
                        if (!res.data.user && res.data.includes('account with this email')) {
                            return dispatch({type: DUPLICATE_EMAIL, payload: res.data})
                        } else {
                            localStorage.setItem('user', JSON.stringify(res.data.user));
                            return dispatch({type: SIGNUP_SUCCESS, payload: 'success'})
                        }
                    })
            }
        })
    }
}

