import { useEffect, useState } from 'react';
import RNTtrackPlayer from 'react-native-track-player';
import TrackPlayer from '../TrackPlayer';

function useQueue() {
	const [queue, setQueue] = useState([]);

	useEffect(() => {
		async function fetchQueue() {
			const currentQueue = await RNTtrackPlayer.getQueue();
			setQueue(currentQueue.map((track) => TrackPlayer.trackToApiMusic(track)));
		}
		fetchQueue();
		TrackPlayer.Emitter.addListener('tracksAdded', fetchQueue);
		TrackPlayer.Emitter.addListener('tracksRemoved', fetchQueue);
	}, []);

	return queue;
}

export default useQueue;
