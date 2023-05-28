import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Spinner } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import TrackPlayer from './TrackPlayer';

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

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function PlayerGuard({ children }) {
	const playerReady = useSetupPlayer();
	if (!playerReady)
		return (
			<View style={styles.loading}>
				<Spinner size="giant" />
			</View>
		);
	return children;
}

PlayerGuard.propTypes = {
	children: PropTypes.node.isRequired,
};

export default PlayerGuard;
