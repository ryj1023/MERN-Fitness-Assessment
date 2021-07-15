import axios from 'axios'
export const KEYWORD = 'KEYWORD'
export const SELECTED_FOOD = 'SELECETED_FOOD'
export const RESOLVED_FOOD_OBJECT = 'RESOLVED_FOOD_OBJECT'
export const REQUEST_SUCCEEDED = 'REQUEST_SUCCEEDED'
export const SIGNUP_ERRORS = 'SIGNUP_ERRORS'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const DUPLICATE_EMAIL = 'DUPLICATE_EMAIL'
export const NO_ACCOUNT = 'NO_ACCOUNT'
export const ACCOUNT_FOUND = 'ACCOUNT_FOUND'
export const UPDATED_FOOD_CHART = 'UPDATED_FOOD_CHART'
export const ERROR_SAVING_FOOD_DATA = 'ERROR_SAVING_FOOD_DATA'
export const FOOD_DATA_SAVED = 'FOOD_DATA_SAVED'
export const RECIPES = 'RECIPES'

export const getFoodSearchKeyword = (keyword, offset = 0) => {
    return async dispatch => {
        const encodedURI = window.encodeURI(`/api/get-food-search-keyword`)
        // const encodedURI = window.encodeURI(
        //     `https://api.nal.usda.gov/ndb/search/?format=json&api_key=Uexsdv07ZLPp9MU9LUtJQ5iEgASowWwa6s1yEcI8&callback=&q=${keyword}&offset=${offset}&sort=r`
        // )
        try {
            const response = await axios.get(encodedURI, {
                params: {
                    keyword,
                    offset,
                },
            })

            let foodObjects = []
            if (response?.data?.foods) {
                foodObjects = response.data.foods.map(food => {
                    return {
                        foodName: food.description,
                        foodID: food.fdcId,
                        manufacturer: food.brandOwner,
                    }
                })
            } else {
                foodObjects = []
                alert('No results found!')
                return
            }
            return dispatch({ type: KEYWORD, payload: foodObjects })
        } catch (err) {
            throw err
        }
    }
}

export const getFoodNutritionFacts = (foodId, foodName) => {
    // const encodedURI = window.encodeURI(
    //     `https://api.nal.usda.gov/ndb/reports/?format=json&api_key=Uexsdv07ZLPp9MU9LUtJQ5iEgASowWwa6s1yEcI8&ndbno=${foodID}&type=f`
    // )
    const encodedURI = window.encodeURI(`/api/get-nutrition-facts`)
    return async dispatch => {
        try {
            const response = await axios.get(encodedURI, {
                params: { foodId },
            })
            console.log('response', response)
            const foodNutrients = response?.data?.foodNutrients || null
            const foodObjects = foodNutrients
                ? response?.data?.foodNutrients.map(food => food)
                : []
            return dispatch({ type: SELECTED_FOOD, payload: foodObjects })
        } catch (err) {
            throw err
        }

        // axios
        //     .get(encodedURI)
        //     .then(response => {
        //         const foodObjects = response.data.report.food.nutrients.map(
        //             food => food
        //         )
        //         return dispatch({ type: SELECTED_FOOD, payload: foodObjects })
        //     })
        //     .catch(err => {
        //         throw err
        //     })
    }
}

export const getUserData = data => {
    const encodedURI = window.encodeURI(`/api/user-data`)
    return dispatch => {
        if (Array.isArray(data))
            return dispatch({ type: UPDATED_FOOD_CHART, payload: data })
        axios
            .get(encodedURI, {
                params: {
                    email: data,
                },
            })
            .then(response => {
                return dispatch({
                    type: UPDATED_FOOD_CHART,
                    payload: response.data[0].user.userDietSummary,
                })
            })
    }
}

export const saveUserData = (dietGoals, userStoredData) => {
    const encodedURI = window.encodeURI(`/api/save`)
    // console.log('userStoredData', userStoredData)
    // const userData = JSON.parse(userStoredData)
    // console.log('userData', userData)
    return () => {
        axios
            .post(encodedURI, {
                dietGoals,
                email: userStoredData.email,
            })
            .then(res => {
                console.log('res.data', res.data.user)
                localStorage.setItem('user', JSON.stringify(res.data.user))
            })
    }
}

export const loginUser = loginData => {
    const encodedURI = window.encodeURI(`/api/login`)
    return dispatch => {
        axios
            .get(encodedURI, {
                params: {
                    email: loginData.email,
                    password: loginData.password,
                },
            })
            .then(response => {
                if (response.data.length > 0) {
                    localStorage.setItem(
                        'user',
                        JSON.stringify(response.data[0].user)
                    )
                    return dispatch({
                        type: ACCOUNT_FOUND,
                        payload: response.data,
                    })
                } else {
                    return dispatch({ type: NO_ACCOUNT })
                }
            })
    }
}

export const validateSignUp = (signUpInfo, dietGoals = null) => {
    const encodedURI = window.encodeURI('/api/validation')
    return dispatch => {
        axios
            .post(encodedURI, {
                email: signUpInfo.email,
                password: signUpInfo.password,
                confirmPassword: signUpInfo.confirmPassword,
            })
            .then(res => {
                if (typeof res.data === 'object') {
                    const errors = res.data.map(err => err.msg)
                    return dispatch({ type: SIGNUP_ERRORS, payload: errors })
                } else if (res.data === 'validated') {
                    const encodedURI = window.encodeURI(
                        '/api/validation/create-user'
                    )
                    axios
                        .post(encodedURI, {
                            email: signUpInfo.email,
                            userName: signUpInfo.userName,
                            password: signUpInfo.password,
                            calories: dietGoals ? dietGoals.calories : null,
                            protein: dietGoals ? dietGoals.protein : null,
                            fat: dietGoals ? dietGoals.fat : null,
                            carbs: dietGoals ? dietGoals.carbs : null,
                            // programs: dietGoals
                            //     ? dietGoals.programs
                            //     : [],
                            propgrams: [],
                        })
                        .then(res => {
                            if (
                                !res.data.user &&
                                res.data.includes('account with this email')
                            ) {
                                return dispatch({
                                    type: DUPLICATE_EMAIL,
                                    payload: res.data,
                                })
                            } else {
                                localStorage.setItem(
                                    'user',
                                    JSON.stringify(res.data.user)
                                )
                                return dispatch({
                                    type: SIGNUP_SUCCESS,
                                    payload: 'success',
                                })
                            }
                        })
                }
            })
    }
}

export const getFeaturedRecipeList = userData => {
    return async dispatch => {
        try {
            const foodKey = ''
            const result = await axios.post(`/api/get-recipe-list`, {
                foodKey,
            })
            return dispatch({ type: RECIPES, payload: result.data.recipes })
        } catch (err) {
            throw err
        }
    }
}
