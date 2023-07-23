import { useEffect, useState } from 'react';
import RNTtrackPlayer, { useTrackPlayerEvents, Event } from 'react-native-track-player';
import TrackPlayer from '../TrackPlayer';

function useCurrentTrack() {
	const [currentTrack, setCurrentTrack] = useState(undefined);

	async function fetchCurrentTrack() {
		const trackId = await RNTtrackPlayer.getCurrentTrack();
		const track = await RNTtrackPlayer.getTrack(trackId);
		if (track) {
			const music = TrackPlayer.trackToApiMusic(track);
			setCurrentTrack(music);
		} else {
			setCurrentTrack(undefined);
		}
	}

	useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
		if (event.type === Event.PlaybackTrackChanged) {
			if (event.nextTrack == null) {
				setCurrentTrack(undefined);
			} else {
				const track = await RNTtrackPlayer.getTrack(event.nextTrack);
				if (track) {
					const music = TrackPlayer.trackToApiMusic(track);
					setCurrentTrack(music);
				} else {
					setCurrentTrack(undefined);
				}
			}
		}
	});

	useEffect(() => {
		fetchCurrentTrack();
	}, []);

	return currentTrack;
}

export default useCurrentTrack;
