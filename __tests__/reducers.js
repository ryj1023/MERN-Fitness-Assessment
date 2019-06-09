import * as actions from '../client/app/actions'

describe('actions', () => {
    it('should create an action to add a todo', () => {
        const text = 'Finish docs'
        const expectedAction = {
            type: types.ADD_TODO,
            text,
        }
        expect(actions.addTodo(text)).toEqual(expectedAction)
    })
})

/*
 export const addAnswer = answer => ({
	type: ADD_ANSWER,
	answer
});

export const gatherFitnessInfo = (info) => {
	return {
		type: CLIENT_INFO,
		info
	}
};

export const updatedFoodChart = (data) => {
	return {
		type: UPDATED_FOOD_CHART,
		payload: data
	}
}

export const getDailyDietGoals = (payload) => {
	return {
		type: DAILY_DIET_GOALS,
		payload
	}
};
 */
