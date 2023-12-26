import Axios from 'axios';

export function GetUser() {
	return new Promise((resolve, reject) => {
		Axios.get(`/api/me`)
			.then((res) => {
				resolve(res.data.Account);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function GetViewedMusics(page, maxResults) {
	return new Promise((resolve, reject) => {
		Axios.get(`/api/me/history/musics?page=${page}&maxResults=${maxResults}`)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function GetLikedMusics(page, maxResults) {
	return new Promise((resolve, reject) => {
		Axios.get(`/api/me/likes/musics?page=${page}&maxResults=${maxResults}`)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function GetSuggestion(memory, likeHistRatio, novelty, limit) {
	return new Promise((resolve, reject) => {
		Axios.get(
			`/api/me/suggestions?memory=${memory}&likeHistRatio=${likeHistRatio}&novelty=${novelty}&limit=${limit}`
		)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function GetPreferedFormat() {
	return new Promise((resolve, reject) => {
		Axios.get(`/api/me/preferedformat`)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function SetPreferedFormat(format) {
	return new Promise((resolve, reject) => {
		Axios.post(`/api/me/preferedformat`, { format })
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
