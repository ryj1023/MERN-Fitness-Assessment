import * as asyncActions from '../actions/async-actions'
import * as actions from '../actions'

const initialState = []

export const getFoodsFromKeyword = (state = [], action) => {
    if (action.type === asyncActions.KEYWORD) {
        return [...action.payload]
    }
    return state
}

export const getNutritionFromSelectedFood = (state = [], action) => {
    if (action.type === actions.SELECTED_FOOD) {
        return [...action.payload]
    } else if (action.type === actions.UPDATE_SERVING) {
        const nutritionFacts = action.payload.initialState
        const servingSize = action.payload.servingSize

        const updatedNutritionFacts = nutritionFacts.reduce((acc, data) => {
            acc.push({
                ...data,
                value:
                    servingSize === 1
                        ? data.value
                        : (data.value * Number(servingSize)).toFixed(2),
            })
            return acc
        }, [])

        return [...updatedNutritionFacts]
    }
    return state
}
