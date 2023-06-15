import Axios from 'axios';
import { GetApiAddress } from '../ApiUtils';

export function GetMusicById(id) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/Music/Music/id/${id}`)
					.then((res) => {
						resolve(res.data);
					})
					.catch((err) => {
						console.warn(err);
						reject(err);
					});
			})
			.catch((err) => reject(err));
	});
}

export function GetAlbumById(id, getAll = false) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/Music/Album/id/${id}${getAll ? '?mode=all' : ''}`)
					.then((res) => {
						resolve(res.data);
					})
					.catch((err) => {
						console.warn(err);
						reject(err);
					});
			})
			.catch((err) => reject(err));
	});
}

export function GetArtistById(id, getAll = false) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/Music/Artist/id/${id}${getAll ? '?mode=all' : ''}`)
					.then((res) => {
						resolve(res.data);
					})
					.catch((err) => {
						console.warn(err);
						reject(err);
					});
			})
			.catch((err) => reject(err));
	});
}

export function GetFilePathById(id, noLog = false) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/Music/Music/get/${id}?noLog=${noLog}`)
					.then((res) => {
						resolve(`${url}/${res.data.FilePath}`);
					})
					.catch((err) => {
						console.warn(err);
						reject(err);
					});
			})
			.catch((err) => reject(err));
	});
}

export function GetLikedMusics() {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/User/LikedMusics`)
					.then((res) => {
						resolve(res.data);
					})
					.catch((err) => {
						console.warn(err);
						reject(err);
					});
			})
			.catch((err) => reject(err));
	});
}

export function GetViewedMusics() {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/User/ViewedMusics`)
					.then((res) => {
						resolve(res.data);
					})
					.catch((err) => {
						console.warn(err);
						reject(err);
					});
			})
			.catch((err) => reject(err));
	});
}

export function LikeMusic(id) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/api/music/${id}/like`)
					.then(() => {
						resolve();
					})
					.catch((err) => {
						console.warn(err);
						reject(err);
					});
			})
			.catch((err) => reject(err));
	});
}

export function GetMusicUrl(id) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				resolve(`${url}/music/${id}/audio`);
			})
			.catch((err) => reject(err));
	});
}

export function GetRelatedMusics(MusicIds, ExcludeIds, limit) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				const data = {
					Exclude: ExcludeIds,
					MusicIds,
					Limit: limit,
				};
				Axios.post(`${url}/api/related/musics`, data)
					.then((res) => {

						console.log(res);
						resolve(res.data.RelatedMusics);
					})
					.catch((err) => {
						console.warn(err);
						reject(err);
					});
			})
			.catch((err) => reject(err));
	});
}
