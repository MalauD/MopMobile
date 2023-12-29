import { useActiveTrack } from 'react-native-track-player';
import TrackPlayer from '../TrackPlayer';

function useCurrentTrack() {
	const track = useActiveTrack();
	if (track === undefined) return undefined;
	return TrackPlayer.trackToApiMusic(track);
}

export default useCurrentTrack;
