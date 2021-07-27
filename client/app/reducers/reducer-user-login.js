import * as asyncActions from '../actions/async-actions'

const signInResult = (state = [], action) => {
    if (action.type === asyncActions.ACCOUNT_FOUND) {
        return [...action.payload]
    } else if (action.type === asyncActions.NO_ACCOUNT) {
        return []
    }
    return state
}
export default signInResult
