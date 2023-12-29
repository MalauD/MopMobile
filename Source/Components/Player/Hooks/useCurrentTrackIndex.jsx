import { useEffect, useState } from 'react';
import RNTtrackPlayer, { useTrackPlayerEvents, Event } from 'react-native-track-player';

function useCurrentTrackIndex() {
	const [currentTrackIndex, setCurrentTrackIndex] = useState(undefined);

	async function fetchCurrentTrack() {
		const trackId = await RNTtrackPlayer.getActiveTrackIndex();
		setCurrentTrackIndex(trackId);
	}

	useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
		if (event.type === Event.PlaybackActiveTrackChanged) {
			await fetchCurrentTrack();
		}
	});

	useEffect(() => {
		fetchCurrentTrack();
	}, []);

	return currentTrackIndex;
}

export default useCurrentTrackIndex;
