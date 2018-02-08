import api from '../utils/api';
import axios from 'axios';
export const KEYWORD= 'KEYWORD';
export const RESOLVED_FOOD_OBJECT = 'RESOLVED_FOOD_OBJECT';
export const REQUEST_SUCCEEDED = 'REQUEST_SUCCEEDED';
export const getFoodSearchKeyword = (keyword) => {
	const encodedURI = window.encodeURI(`https://api.nal.usda.gov/ndb/search/?format=json&api_key=Uexsdv07ZLPp9MU9LUtJQ5iEgASowWwa6s1yEcI8&callback=&max=10&q=${keyword}&sort=r`)
    return (dispatch) => {
    axios.get(encodedURI)
	.then((response) => {
			const foodObjects = response.data.list.item.map((food) => food.name)
			return dispatch({type: REQUEST_SUCCEEDED, payload: foodObjects})
        });
    };
}

export const getFoodNutritionFacts = (food) => {
    const encodedURI = window.encodeURI(`https://api.nal.usda.gov/ndb/reports/?format=json&api_key=Uexsdv07ZLPp9MU9LUtJQ5iEgASowWwa6s1yEcI8&ndbno=${food}&type=f`)
    return (dispatch) => {
        axios.get(encodedURI)
        .then((response) => {
            console.log('response', response)
                const foodObjects = response.data.list.item.map((food) => food.name)
                return dispatch({type: REQUEST_SUCCEEDED, payload: foodObjects})
            });
        };
}

// export const getFoodNutritionFacts = (food) => {
//     console.log('clicked')
//     const encodedURI = window.encodeURI('/foods')
//             return (dispatch) => {
//                 axios.get(encodedURI)
//                 .then((response) => {
//                     console.log('response', response)
//                         // const foodObjects = response.data.list.item.map((food) => food.name)
//                         return dispatch({type: REQUEST_SUCCEEDED, payload: foodObjects})
//                     })
//                     .catch(e => console.error(e));
//                 };
// }
