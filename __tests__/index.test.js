import React from 'react'
import Home from '../pages'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'

describe('Home Page component', () => {
    /**
     * 
     * user = {
     *  dietInfo: {calories: 3420, protein: 190, fat: 19, carbs: 570},
email: "rjtest01@yahoo.com",
        userDietSummary: [{foodName: "SNACKS, RICE CAKES, BROWN RICE, BUCKWHEAT", foodFacts: [{ derivation: "NONE"
dp: 4
group: "Proximates"
measures: [{label: "cake", eqv: 9, eunit: "g", qty: 1, value: 0.53}], [{label: "cakes", eqv: 18, eunit: "g", qty: 2, value: 1.06}]
name: "Water"
nutrient_id: 255
se: "0.500"
sourcecode: ""
unit: "g"
value: 5.9}],
userName: "rjtest01",
workouts: ["http://www.bodybuilding.com/fun/timothyf.htm","http://bodybuildingindex.com/3-day-split-workout-for-gaining-muscle-mass/","http://www.muscleandfitness.com/workouts/workout-routines/torch-your-fat-workout-routine"]

     * }

     */

    const initialState = { output: 100 }
    const mockStore = configureStore()
    const mockFoodRecipes = [
        {
            f2f_url: 'http://food2fork.com/view/35382',
            image_url:
                'http://static.food2fork.com/Jalapeno2BPopper2BGrilled2BCheese2BSandwich2B12B500fd186186.jpg',
            publisher: 'Closet Cooking',
            publisher_url: 'http://closetcooking.com',
            recipe_id: '35382',
            social_rank: 100,
            source_url:
                'http://www.closetcooking.com/2011/04/jalapeno-popper-grilled-cheese-sandwich.html',
            title: 'Jalapeno Popper Grilled Cheese Sandwich',
        },
        {
            f2f_url: 'http://food2fork.com/view/47024',
            image_url: 'http://static.food2fork.com/icedcoffee5766.jpg',
            publisher: 'The Pioneer Woman',
            publisher_url: 'http://thepioneerwoman.com',
            recipe_id: '47024',
            social_rank: 100,
            source_url:
                'http://thepioneerwoman.com/cooking/2011/06/perfect-iced-coffee/',
            title: 'Perfect Iced Coffee',
        },
    ]
    let store, wrapper
    beforeEach(() => {
        store = mockStore(initialState)
        wrapper = shallow(<Home store={store} foodRecipes={mockFoodRecipes} />)
    })
    it('expect to render Home component', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
