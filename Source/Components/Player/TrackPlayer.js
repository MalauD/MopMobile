import RNTrackPlayer from 'react-native-track-player';
import EventEmitter from 'events';
import { GetMusicUrl, GetMusicBaseUrl } from '../../Api/Music/Music';

class TrackPlayer {
	static async Init() {
		await RNTrackPlayer.setupPlayer();

		const capabilities = [
			RNTrackPlayer.CAPABILITY_PLAY,
			RNTrackPlayer.CAPABILITY_PAUSE,
			RNTrackPlayer.CAPABILITY_SEEK_TO,
			RNTrackPlayer.CAPABILITY_SKIP_TO_NEXT,
			RNTrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
			RNTrackPlayer.CAPABILITY_STOP,
		];

		const options = {
			capabilities,
			compactCapabilities: capabilities,
			alwaysPauseOnInterruption: true,
		};

		await RNTrackPlayer.updateOptions(options);
	};
}

export default TrackPlayer;
