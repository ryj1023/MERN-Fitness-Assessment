export const ADD_ANSWER = 'ADD_ANSWER'
export const CLIENT_INFO = 'CLIENT_INFO'
export const KEYWORD = 'KEYWORD'
export const RESOLVED_FOOD_OBJECT = 'RESOLVED_FOOD_OBJECT'
export const CLEAR_FOOD_LIST = 'CLEAR_FOOD_LIST'
export const UPDATED_FOOD_CHART = 'UPDATED_FOOD_CHART'
export const DAILY_DIET_GOALS = 'DAILY_DIET_GOALS'
export const SELECTED_FOOD = 'SELECETED_FOOD'
export const UPDATE_SERVING = 'UPDATE_SERVING'

export const updateNutritionFactsByServing = (
    nutritionFacts,
    servingSize,
    initialState
) => {
    return {
        type: UPDATE_SERVING,
        payload: { nutritionFacts, servingSize, initialState },
    }
}

export const getFoodNutritionFacts = selectedFoodNutients => ({
    type: SELECTED_FOOD,
    payload: selectedFoodNutients,
})

export const addAnswer = answer => ({
    type: ADD_ANSWER,
    answer,
})

export const gatherFitnessInfo = info => {
    return {
        type: CLIENT_INFO,
        info,
    }
}

export const updatedFoodChart = data => {
    return {
        type: UPDATED_FOOD_CHART,
        payload: data,
    }
}

export const getDailyDietGoals = payload => {
    return {
        type: DAILY_DIET_GOALS,
        payload,
    }
}
