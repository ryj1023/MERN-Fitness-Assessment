import api from '../utils/api';
import axios from 'axios';
export const ADD_ANSWER = 'ADD_ANSWER';
export const CLIENT_INFO = 'CLIENT_INFO';
export const KEYWORD= 'KEYWORD';
export const RESOLVED_FOOD_OBJECT = 'RESOLVED_FOOD_OBJECT';
export const CLEAR_FOOD_LIST = 'CLEAR_FOOD_LIST'

export const addAnswer = answer => ({
	type: ADD_ANSWER,
	answer
});

export const gatherFitnessInfo = (info) => ({
	type: CLIENT_INFO,
	info
});



