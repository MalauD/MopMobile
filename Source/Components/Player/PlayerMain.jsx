import React from 'react';
import { View, Image } from 'react-native';
import { Button, Icon, Text, useTheme } from '@ui-kitten/components';
import { Slider } from '@miblanchard/react-native-slider';
import RNTrackPlayer, { useProgress } from 'react-native-track-player';
import useCurrentTrack from './Hooks/useCurrentTrack';
import PlayPauseToggle from './Extras/PlayPauseToggle';

function secondsToText(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export default function PlayerMain() {
	const currentTrack = useCurrentTrack();
	const progress = useProgress(200);
	const theme = useTheme();

	if (currentTrack) {
		const { image_url, title, artist_name } = currentTrack;
		return (
			<>
				<Image
					style={{
						alignSelf: 'center',
						marginVertical: 10,
						marginHorizontal: 20,
						width: '75%',
						aspectRatio: 1,
					}}
					source={{
						uri: image_url || require('../../Assets/nomusic.jpg'),
					}}
				/>
				<Text category="h6" style={{ marginHorizontal: 20 }}>
					{title}
				</Text>
				<Text category="s1" appearance="hint" style={{ marginHorizontal: 20 }}>
					{artist_name}
				</Text>

				<Slider
					containerStyle={{ marginHorizontal: 20, marginVertical: 0 }}
					thumbTintColor={theme['color-info-500']}
					maximumTrackTintColor={theme['color-primary-transparent-600']}
					minimumTrackTintColor={theme['color-info-500']}
					minimumValue={0}
					maximumValue={progress.duration}
					value={progress.position}
					onSlidingComplete={async (value) => {
						await RNTrackPlayer.seekTo(value[0]);
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

				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-evenly',
						marginBottom: 2,
						alignItems: 'center',
					}}
				>
					<Button
						appearance="ghost"
						size="giant"
						accessoryLeft={(evaProps) => (
							<Icon {...evaProps} name="skip-back-outline" />
						)}
						onPress={() => {
							RNTrackPlayer.skipToPrevious();
						}}
					/>
					<PlayPauseToggle size="giant" />
					<Button
						appearance="ghost"
						size="giant"
						accessoryLeft={(evaProps) => (
							<Icon {...evaProps} name="skip-forward-outline" />
						)}
						onPress={() => {
							RNTrackPlayer.skipToNext();
						}}
					/>
				</View>
			</>
		);
	}

	return null;
}
