import * as actions from '../actions'

const getDailyDietGoals = (state = {}, action) => {
    if (action.type === actions.DAILY_DIET_GOALS) {
        return Object.assign({}, state, { ...action.payload })
    }
    return state
}

export default getDailyDietGoals
