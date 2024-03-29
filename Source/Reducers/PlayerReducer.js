import {
	CHANGE_PLAYING_MUSIC,
	ADD_MUSIC,
	CHANGE_PLAYING_ID,
	CLEAR_PLAYLIST,
	ADD_MULTIPLE_MUSICS,
} from '../Action/PlayerAction';

const initialState = {
	Playlist: {
		PlayingId: 0,
		Musics: [],
	},
};

/* eslint-disable default-param-last */
export default function PlayerReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_PLAYING_MUSIC:
			return {
				...state,
				Playlist: {
					Musics: action.RemoveOthers
						? [action.NewMusic]
						: [...state.Playlist.Musics, action.NewMusic],
					PlayingId: action.RemoveOthers ? 0 : state.Playlist.Musics.length,
				},
			};
		case ADD_MUSIC:
			return {
				...state,
				Playlist: {
					Musics: [...state.Playlist.Musics, action.AddedMusic],
					PlayingId: state.Playlist.PlayingId,
				},
			};

		case ADD_MULTIPLE_MUSICS:
			return {
				Playlist: {
					Musics: [...state.Playlist.Musics, ...action.AddedMusics],
					PlayingId: state.Playlist.PlayingId,
				},
			};
		case CHANGE_PLAYING_ID:
			return {
				...state,
				Playlist: {
					PlayingId: action.PlaylistId,
					Musics: state.Playlist.Musics,
				},
			};

		case CLEAR_PLAYLIST:
			return {
				...state,
				Playlist: {
					PlayingId: 0,
					Musics: [],
				},
			};
		default:
			return state;
	}
}
