import Axios from 'axios';

export function SearchMusic(query, maxResults = 10, page = 0, noIndex = false) {
	return new Promise((resolve, reject) => {
		Axios.get(
			`/api/search/music/${query}?maxResults=${maxResults}&page=${page}&noIndex=${noIndex}`
		)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function SearchAlbum(query, maxResults = 10, page = 0, noIndex = false) {
	return new Promise((resolve, reject) => {
		Axios.get(
			`/api/search/album/${query}?maxResults=${maxResults}&page=${page}&noIndex=${noIndex}`
		)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function SearchArtist(query, maxResults = 10, page = 0, noIndex = false) {
	return new Promise((resolve, reject) => {
		Axios.get(
			`/api/search/artist/${query}?maxResults=${maxResults}&page=${page}&noIndex=${noIndex}`
		)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
