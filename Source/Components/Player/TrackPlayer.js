import RNTrackPlayer, {Capability, AppKilledPlaybackBehavior} from 'react-native-track-player';
import EventEmitter from 'events';
import { GetApiAddress, getCookie } from '../../Api/ApiUtils';

const TrackPlayer = {
	Emitter: undefined,
	BaseMusicUrl: undefined,
	MopIdCookie: undefined,

	init: async () => {
		TrackPlayer.Emitter = new EventEmitter();

		TrackPlayer.BaseMusicUrl = await GetApiAddress();

		TrackPlayer.MopIdCookie = await getCookie('mop-id');

		await RNTrackPlayer.setupPlayer();

		const capabilities = [
			Capability.Play,
			Capability.Pause,
			Capability.SkipToNext,
			Capability.SkipToPrevious,
			Capability.Stop,
			Capability.SeekTo,
		];

		const compactCapabilities = [
			Capability.Play,
			Capability.Pause,
		];

		await RNTrackPlayer.updateOptions({
			capabilities,
			compactCapabilities,
			android: {
				appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
			}
		});
	},

	apiMusicToTrack: (apiMusic) => ({
		id: apiMusic._id,
		url: `${TrackPlayer.BaseMusicUrl}/api/music/${apiMusic._id}/audio`,
		title: apiMusic.title,
		artist: apiMusic.artist_name,
		artwork: apiMusic.image_url,
		headers: {
			Cookie: `mop-id=${TrackPlayer.MopIdCookie}`,
		}
	}),

	trackToApiMusic: (track) => ({
		_id: track.id,
		title: track.title,
		artist_name: track.artist,
		image_url: track.artwork,
	}),

	addTrack: async (trackFromApi) => {
		await RNTrackPlayer.add(TrackPlayer.apiMusicToTrack(trackFromApi));
		TrackPlayer.Emitter.emit('tracksAdded', [trackFromApi]);
	},

	addTracks: async (tracksFromApi) => {
		const tracks = tracksFromApi.map((track) => TrackPlayer.apiMusicToTrack(track));
		await RNTrackPlayer.add(tracks);
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

	playNext: async (trackFromApi) => {
		const track = TrackPlayer.apiMusicToTrack(trackFromApi);
		const nextIndex = await RNTrackPlayer.getCurrentTrack() + 1;
		console.log(nextIndex);
		await RNTrackPlayer.add(track, nextIndex);
	}
}

export default TrackPlayer;
