import React from 'react';
import { Easing, View } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';
import { Slider } from '@miblanchard/react-native-slider';
import useProgressState from '../../../Hooks/useProgressState';

function secondsToText(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export default function PlayerEditableProgressBar() {
	const [progress, seekTo] = useProgressState(1000);
	const theme = useTheme();

	return (
		<>
			<Slider
				containerStyle={{ marginHorizontal: 20, marginVertical: 0 }}
				thumbTintColor={theme['color-primary-default']}
				maximumTrackTintColor={theme['color-basic-700']}
				minimumTrackTintColor={theme['color-primary-default']}
				minimumValue={0}
				animateTransitions
				animationType="timing"
				animationConfig={{
					duration: 1000,
					useNativeDriver: true,
					easing: Easing.linear,
				}}
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
					marginTop: 0,
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
