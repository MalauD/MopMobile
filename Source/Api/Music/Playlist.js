import Axios from 'axios';
import { GetApiAddress } from '../ApiUtils';

export function GetPlaylistsOf(id, page, maxResults) {
    return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/api/user/${id}/playlists?page=${page}&maxResults=${maxResults}`)
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
