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

export function AddToPlaylist(playlistId, musicId) {
	return new Promise((resolve, reject) => {
		Axios.post(`/api/playlist/${playlistId}/musics`, { MusicsId: [musicId] })
			.then(() => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function RemoveFromPlaylist(playlistId, musicIndex) {
	console.log(playlistId, musicIndex);
	return new Promise((resolve, reject) => {
		Axios.delete(`/api/playlist/${playlistId}/musics`, { data: { AtIndex: musicIndex } })
			.then(() => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function CreatePlaylist(name, musicIds, isPublic) {
	return new Promise((resolve, reject) => {
		Axios.post('/api/playlist/create', { Name: name, MusicsId: musicIds, IsPublic:  isPublic})
			.then((res) => {
				resolve(res.data.CreatedPlaylistId);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function DeletePlaylist(id) {
	return new Promise((resolve, reject) => {
		Axios.delete(`/api/playlist/${id}`)
			.then(() => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
}