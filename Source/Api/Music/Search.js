import Axios from 'axios';

export const searchMusic = (query, maxResults = 10, page = 0, noIndex = false, signal = null) =>
	Axios.get(`/api/search/music/${encodeURIComponent(query)}`, {
		params: { maxResults, page, noIndex },
		signal,
	}).then((res) => res.data);

export const searchAlbum = (query, maxResults = 10, page = 0, noIndex = false, signal = null) =>
	Axios.get(`/api/search/album/${encodeURIComponent(query)}`, {
		params: { maxResults, page, noIndex },
		signal,
	}).then((res) => res.data);

export const searchArtist = (query, maxResults = 10, page = 0, noIndex = false, signal = null) =>
	Axios.get(`/api/search/artist/${encodeURIComponent(query)}`, {
		params: { maxResults, page, noIndex },
		signal,
	}).then((res) => res.data);
