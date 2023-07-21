import Axios from 'axios';
import { GetApiAddress } from '../ApiUtils';

export function GetAlbumById(id) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/api/album/${id}`)
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

export function GetArtistById(id) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/api/artist/${id}`)
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
