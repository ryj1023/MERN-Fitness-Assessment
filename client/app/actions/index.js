import api from '../utils/api';
import axios from 'axios';
export const ADD_ANSWER = 'ADD_ANSWER';
export const CLIENT_INFO = 'CLIENT_INFO';
export const KEYWORD= 'KEYWORD';
export const RESOLVED_FOOD_OBJECT = 'RESOLVED_FOOD_OBJECT';

export const addAnswer = answer => ({
	type: ADD_ANSWER,
	answer
});

export const gatherFitnessInfo = (info) => ({
	type: CLIENT_INFO,
	info
});

// export const getFoodSearchKeyword = (keyword) => ({
// 	type: KEYWORD,
// 	keyword
// })

// export const getFoodSearchKeyword = (keyword) => {
// 	const encodedURI = window.encodeURI(`https://api.nal.usda.gov/ndb/search/?format=json&api_key=Uexsdv07ZLPp9MU9LUtJQ5iEgASowWwa6s1yEcI8&callback=&max=10&q=${keyword}&sort=r`)
// 	return axios.get(encodedURI)
// 	.then((response) => {
// 			const foodObjects = response.data.list.item.map((food) => food)
// 			return dispatch(resolveGetFood(foodObjects))
// 		});
// }

// export const resolveGetFood = (foods) => {
// 	return {
// 		type: 'RESOLVED_FOOD_OBJECT ',
// 		foods
// 	}
// }

