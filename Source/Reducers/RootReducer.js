import { combineReducers } from 'redux';
import UserAccountReducer from './UserAccountReducer';
import PlayerReducer from './PlayerReducer';

export default combineReducers({
	UserAccountReducer,
	PlayerReducer,
});
