import Axios from 'axios';

export function GetTrendingMusics(page, maxResults) {
	return new Promise((resolve, reject) => {
		Axios.get(`/api/trending/musics?page=${page}&maxResults=${maxResults}`)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
