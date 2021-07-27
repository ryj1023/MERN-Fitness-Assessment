import * as actions from '../actions';

const gatherFitnessInfo = (state = {}, action) => {
	if(action.type === actions.CLIENT_INFO){
		return Object.assign({}, state, {
            // clientInfo: { ...action.info }
            clientInfo: action.info
		})
	}
	return state;
}

export default gatherFitnessInfo;