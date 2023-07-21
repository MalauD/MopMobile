import Axios from 'axios';
import { GetApiAddress } from '../ApiUtils';

export function SearchMusic(query, maxResults = 10, page = 0, noIndex = false) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/api/search/music/${query}?maxResults=${maxResults}&page=${page}&noIndex=${noIndex}`)
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

export function SearchAlbum(query, maxResults = 10, page = 0, noIndex = false) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/api/search/album/${query}?maxResults=${maxResults}&page=${page}&noIndex=${noIndex}`)
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

export function SearchArtist(query, maxResults = 10, page = 0, noIndex = false) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/api/search/artist/${query}?maxResults=${maxResults}&page=${page}&noIndex=${noIndex}`)
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
