import React from 'react';
import { Button, Icon, Spinner } from '@ui-kitten/components';
import { usePlaybackState, State } from 'react-native-track-player';
import TrackPlayer from '../TrackPlayer';

function PlayPauseToggle(props) {
	const playerState = usePlaybackState();
	const isLoading = playerState === State.Connecting;
	const isPlaying = playerState === State.Playing;

	const onButtonPress = async () => {
		if (isPlaying) {
			await TrackPlayer.pause();
		} else {
			await TrackPlayer.play();
		}
	};

	if (isLoading) {
		return <Spinner {...props} />;
	}

	const iconName = isPlaying ? 'pause-circle-outline' : 'play-circle-outline';

	return (
		<Button
			onPress={onButtonPress}
			appearance="ghost"
			accessoryLeft={(evaProps) => <Icon {...evaProps} name={iconName} />}
			{...props}
		/>
	);
}

export default PlayPauseToggle;
