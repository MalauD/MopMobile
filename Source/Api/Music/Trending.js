import Axios from 'axios';
import { GetApiAddress } from '../ApiUtils';

export function GetTrendingMusics(page, maxResults) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/api/trending/musics?page=${page}&maxResults=${maxResults}`)
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