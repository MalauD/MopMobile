import { useEffect, useState } from 'react';
import RNTtrackPlayer, { useTrackPlayerEvents, Event } from 'react-native-track-player';

function useCurrentTrackIndex() {
	const [currentTrackIndex, setCurrentTrackIndex] = useState(undefined);

	async function fetchCurrentTrack() {
		const trackId = await RNTtrackPlayer.getCurrentTrack();
		setCurrentTrackIndex(trackId);
	}

	useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
		if (event.type === Event.PlaybackTrackChanged) {
			await fetchCurrentTrack();
		}
	});

	useEffect(() => {
		fetchCurrentTrack();
	}, []);

	return currentTrackIndex;
}

export default useCurrentTrackIndex;
