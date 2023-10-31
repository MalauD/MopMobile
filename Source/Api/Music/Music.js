import Axios from 'axios';

export function GetAlbumById(id) {
	return new Promise((resolve, reject) => {
		Axios.get(`/api/album/${id}`)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function GetArtistById(id) {
	return new Promise((resolve, reject) => {
		Axios.get(`/api/artist/${id}`)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function LikeMusic(id) {
	return new Promise((resolve, reject) => {
		Axios.get(`/api/music/${id}/like`)
			.then(() => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function GetRelatedMusics(MusicIds, ExcludeIds, limit) {
	return new Promise((resolve, reject) => {
		const data = {
			Exclude: ExcludeIds,
			MusicIds,
			Limit: limit,
		};
		Axios.post(`/api/related/musics`, data)
			.then((res) => {
				resolve(res.data.RelatedMusics);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
