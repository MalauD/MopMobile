import Axios from 'axios';
import { GetApiAddress } from '../ApiUtils';

export function SearchMusic(query) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/Music/Search/Music/Name/${query}`)
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

export function SearchAlbum(query) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/Music/Search/Album/Name/${query}`)
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

export function SearchArtist(query) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/Music/Search/Artist/Name/${query}`)
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
