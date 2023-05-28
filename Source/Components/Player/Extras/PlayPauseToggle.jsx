import React from 'react';
import { Button, Icon, Spinner } from '@ui-kitten/components';
import { usePlaybackState, State } from 'react-native-track-player';
import TrackPlayer from '../TrackPlayer';

function PlayPauseToggle() {
	const playerState = usePlaybackState();
	const isLoading = playerState === State.Buffering;
	const isPlaying = playerState === State.Playing;

	const onButtonPress = async () => {
		if (isPlaying) {
			await TrackPlayer.pause();
		} else {
			await TrackPlayer.play();
		}
	};

	if (isLoading) {
		return <Spinner size="small" />;
	}

	const iconName = isPlaying ? 'pause-circle-outline' : 'play-circle-outline';

	return (
		<Button
			onPress={onButtonPress}
			appearance="ghost"
			accessoryLeft={(evaProps) => <Icon {...evaProps} name={iconName} />}
		/>
	);
}

export default PlayPauseToggle;
