import { LOG_ACCOUNT, LOG_OUT_ACCOUNT, LIKE_MUSIC, UNLIKE_MUSIC } from '../Action/AccountAction';

const InitialState = null;

export default function UserAccountReducer(state = InitialState, action) {
	switch (action.type) {
		case LOG_ACCOUNT:
			return action.AccountData;
		case LOG_OUT_ACCOUNT:
			return null;
		case LIKE_MUSIC:
			return {
				...state,
				liked_musics: [...state.liked_musics, action.MusicId],
			};
		case UNLIKE_MUSIC:
			return {
				...state,
				liked_musics: state.liked_musics.filter((musicId) => musicId !== action.MusicId),
			};
		default:
			return state;
	}
}
