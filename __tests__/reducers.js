import * as actions from '../client/app/actions'
import axios from 'axios'
jest.setTimeout(10000)

const getPeoplePromise = async axios => {
    const { data } = await axios.get('https://swapi.co/api/people')
    return {
        count: data.count,
        results: data.results,
    }
}

// it('should return data from an API', async done => {
//     expect.assertions(2)
//     const data = await getPeoplePromise(axios)
//     expect(data.count).toEqual(87)
//     expect(data.results.length).toBeGreaterThan(2)
//     done()
// })

it('get people returns count and results', async done => {
    const mockFetch = {}
    mockFetch.get = jest.fn().mockReturnValue(
        Promise.resolve({
            data: {
                count: 87,
                results: [1, 2, 3, 4, 5],
            },
        })
    )

    expect.assertions(2)
    const data = await getPeoplePromise(mockFetch)
    expect(mockFetch.get.mock.calls.length).toBe(1)
    expect(data.results.length).toBeGreaterThan(2)
    done()
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
