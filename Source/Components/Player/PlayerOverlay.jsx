import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { State, usePlaybackState } from 'react-native-track-player';
import PlayerSmallControls from './Extras/PlayerSmallControls';
import PlayerProgressBar from './Extras/PlayerProgressBar';

function PlayerOverlay() {
	const navigation = useNavigation();
	const playbackState = usePlaybackState();

	if (playbackState === State.None || playbackState === State.Stopped) return null;
	return (
		<View
			style={{
				position: 'absolute',
				left: 0,
				right: 0,
				bottom: 0,
				padding: '1.5%',
				alignItems: 'center',
			}}
		>
			<PlayerProgressBar />
			<PlayerSmallControls onPress={() => navigation.navigate('Player')} />
		</View>
	);
}

export default PlayerOverlay;
