import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';
import { Slider } from '@miblanchard/react-native-slider';
import RNTrackPlayer, { useProgress } from 'react-native-track-player';

function secondsToText(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function useProgressState(refreshRate) {
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

export default function PlayerEditableProgressBar() {
	const [progress, seekTo] = useProgressState(1000);
	const theme = useTheme();

	return (
		<>
			<Slider
				containerStyle={{ marginHorizontal: 20, marginVertical: 0 }}
				thumbTintColor={theme['color-info-500']}
				maximumTrackTintColor={theme['color-primary-transparent-600']}
				minimumTrackTintColor={theme['color-info-500']}
				minimumValue={0}
				animateTransitions
				animationType="timing"
				maximumValue={progress.duration}
				value={progress.position}
				onSlidingComplete={(value) => {
					seekTo(value[0]);
				}}
			/>

			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginBottom: 0,
					marginHorizontal: 20,
				}}
			>
				<Text category="s1" appearance="hint" style={{ alignSelf: 'center' }}>
					{secondsToText(progress.position)}
				</Text>
				<Text category="s1" appearance="hint" style={{ alignSelf: 'center' }}>
					{secondsToText(progress.duration)}
				</Text>
			</View>
		</>
	);
}
