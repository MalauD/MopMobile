import { LOG_ACCOUNT, LOG_OUT_ACCOUNT } from '../Action/AccountAction';

const InitialState = {
	IsLogged: false,
};

export default function UserAccountReducer(state = InitialState, action) {
	switch (action.type) {
	case LOG_ACCOUNT:
		return {
			...state,
			IsLogged: true,
		};
	case LOG_OUT_ACCOUNT:
		return {
			...state,
			IsLogged: false,
		};
	default:
		return state;
	}
}
