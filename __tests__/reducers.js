import * as actions from '../client/app/actions'
import axios from 'axios'
import calculateClientInfo from '../client/app/reducers/reducer-calculate-client-info'
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

    expect.assertions(3)
    const data = await getPeoplePromise(mockFetch)
    expect(mockFetch.get.mock.calls.length).toBe(1)
    expect(data.results.length).toBeGreaterThan(2)
    expect(mockFetch.get).toBeCalledWith('https://swapi.co/api/people')
    done()
})

it('reducer reduces client info', () => {
    expect(
        calculateClientInfo(
            {},
            {
                type: actions.CLIENT_INFO,
                info: 'test',
            }
        )
    ).toEqual({
        clientInfo: 'test',
    })
})

it('action gathers client info', () => {
    expect(actions.gatherFitnessInfo({ calories: 100 })).toEqual({
        type: actions.CLIENT_INFO,
        info: { calories: 100 },
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
