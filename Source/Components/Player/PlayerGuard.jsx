import React, { useState, useEffect } from 'react';
import TrackPlayer from 'react-native-track-player';

const useSetupPlayer = () => {
	const [playerReady, setPlayerReady] = useState(false);

	useEffect(() => {
		(async () => {
			await TrackPlayer.setupPlayer();
			setPlayerReady(true);
		})();
	}, []);
	return playerReady;
};

const PlayerGuard = ({ children }) => {
	const playerReady = useSetupPlayer();
	if (!playerReady) return null;
	if (children) return children;
	return null;
};

export default PlayerGuard;
