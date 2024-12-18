import RNTrackPlayer, { Capability, AppKilledPlaybackBehavior, AndroidAudioContentType } from 'react-native-track-player';
import EventEmitter from 'events';
import Axios from 'axios';
import { getCookie } from '../../Api/ApiUtils';

function remove_trailling_slash(url) {
	if (url.endsWith('/')) {
		return url.slice(0, -1);
	}
	return url;
}

const TrackPlayer = {
	Emitter: undefined,
	BaseMusicUrl: undefined,
	MopIdCookie: undefined,

	init: async () => {
		TrackPlayer.Emitter = new EventEmitter();

		TrackPlayer.MopIdCookie = await getCookie('mop-id');

		await RNTrackPlayer.setupPlayer({
			androidAudioContentType: AndroidAudioContentType.Music,
			autoHandleInterruptions: true
		});

		await RNTrackPlayer.updateOptions({
			capabilities: [
				Capability.Play,
				Capability.Pause,
				Capability.SkipToNext,
				Capability.SkipToPrevious,
				Capability.SeekTo,
			],
			compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext],
			android: {
				appKilledPlaybackBehavior:
					AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
			},
		});
	},

	apiMusicToTrack: (apiMusic) => ({
		id: apiMusic._id,
		url: `${remove_trailling_slash(Axios.defaults.baseURL)}/api/music/${apiMusic._id}/audio`,
		title: apiMusic.title,
		artist: apiMusic.artist_name,
		artwork: apiMusic.image_url || `${remove_trailling_slash(Axios.defaults.baseURL)}/Ressources/noMusic.jpg`,
		headers: {
			Cookie: `mop-id=${TrackPlayer.MopIdCookie}`,
		},
	}),

	trackToApiMusic: (track) => ({
		_id: track.id,
		title: track.title,
		artist_name: track.artist,
		image_url: track.artwork || `${remove_trailling_slash(Axios.defaults.baseURL)}/Ressources/noMusic.jpg`,
	}),

	addTrack: async (trackFromApi) => {
		await RNTrackPlayer.add(TrackPlayer.apiMusicToTrack(trackFromApi));
		await RNTrackPlayer.play();
		TrackPlayer.Emitter.emit('tracksAdded', [trackFromApi]);
	},

	addTracks: async (tracksFromApi) => {
		const tracks = tracksFromApi.map((track) => TrackPlayer.apiMusicToTrack(track));
		await RNTrackPlayer.add(tracks);
		await RNTrackPlayer.play();
		TrackPlayer.Emitter.emit('tracksAdded', tracksFromApi);
	},

	play: async () => {
		await RNTrackPlayer.play();
	},

	pause: async () => {
		await RNTrackPlayer.pause();
	},

	removeTracks: async (trackIds) => {
		await RNTrackPlayer.remove(trackIds);
		TrackPlayer.Emitter.emit('tracksRemoved', trackIds);
	},

	removeAllAndPlay: async (trackFromApi) => {
		await RNTrackPlayer.reset();
		await TrackPlayer.addTrack(trackFromApi);
		await TrackPlayer.play();
	},

	removeAllAndPlayMultiple: async (tracksFromApi) => {
		await RNTrackPlayer.reset();
		await TrackPlayer.addTracks(tracksFromApi);
		await TrackPlayer.play();
	},

	playNext: async (trackFromApi) => {
		const track = TrackPlayer.apiMusicToTrack(trackFromApi);
		const nextIndex = (await RNTrackPlayer.getActiveTrackIndex() ?? 0) + 1;
		await RNTrackPlayer.add(track, nextIndex);
	},

	getQueue: async () => {
		const queue = await RNTrackPlayer.getQueue();
		return queue.map((track) => TrackPlayer.trackToApiMusic(track));
	},
};

export default TrackPlayer;
