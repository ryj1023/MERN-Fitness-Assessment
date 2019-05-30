const getFoodRecipes = (state = { recipes: [] }, action) => {
    if (action.type === 'RECIPES') {
        return { ...state, recipes: action.payload }
    }
    return state
}

export default getFoodRecipes
