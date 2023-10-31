import Axios from 'axios';

export function GetPlaylistsOf(id, page, maxResults) {
	return new Promise((resolve, reject) => {
		Axios.get(`/api/user/${id}/playlists?page=${page}&maxResults=${maxResults}`)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function GetPlaylist(id) {
	return new Promise((resolve, reject) => {
		Axios.get(`/api/playlist/${id}`)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
