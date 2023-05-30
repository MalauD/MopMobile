import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TrackPlayer from './TrackPlayer';
import LoadingLayout from '../LoadingLayout';

const useSetupPlayer = () => {
	const [playerReady, setPlayerReady] = useState(false);

	useEffect(() => {
		(async () => {
			TrackPlayer.init()
				.then(() => {
					setPlayerReady(true);
				})
				.catch(() => {
					setPlayerReady(true);
				});
		})();
	}, []);
	return playerReady;
};

function PlayerGuard({ children }) {
	const playerReady = useSetupPlayer();
	if (!playerReady) return <LoadingLayout />;
	return children;
}

PlayerGuard.propTypes = {
	children: PropTypes.node.isRequired,
};

export default PlayerGuard;
