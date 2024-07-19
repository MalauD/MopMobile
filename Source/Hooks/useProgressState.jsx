import React from 'react';
import RNTrackPlayer, { useProgress } from 'react-native-track-player';

export default function useProgressState(refreshRate) {
	const [progress, setProgress] = React.useState({ position: 0, duration: 0 });
	const rnProgress = useProgress(refreshRate);
	React.useEffect(() => {
		setProgress(rnProgress);
	}, [rnProgress]);
	const seekTo = (value) => {
		RNTrackPlayer.seekTo(value);
		setProgress({ ...progress, position: value });
	};

	return [progress, seekTo];
}
