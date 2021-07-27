import * as actions from '../actions'

const initialState = {
    nutritionFacts: [],
    servingSize: 1,
}

const updateNutritionFactsByServingSize = (state = initialState, action) => {
    if (action.type === actions.UPDATE_SERVING) {
        return Object.assign({}, state, {
            nutritionFacts: [...action.payload.nutritionFacts],
        })
    }
    return state
}

export default updateNutritionFactsByServingSize
