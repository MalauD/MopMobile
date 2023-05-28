import Axios from 'axios';
import { GetApiAddress } from '../ApiUtils';

export function GetViewedMusics(page, maxResults) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/api/me/history/musics?page=${page}&maxResults=${maxResults}`)
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

export function GetLikedMusics(page, maxResults) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/api/me/likes/musics?page=${page}&maxResults=${maxResults}`)
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

export function GetSuggestion(memory, likeHistRatio, novelty, limit) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/api/me/suggestions?memory=${page}&likeHistRatio=${likeHistRatio}&novelty=${novelty}&limit=${limit}`)
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
