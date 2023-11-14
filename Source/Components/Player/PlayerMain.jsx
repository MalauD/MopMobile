import React from 'react';
import { View, Image } from 'react-native';
import { Button, Icon, Text } from '@ui-kitten/components';
import RNTrackPlayer from 'react-native-track-player';
import useCurrentTrack from './Hooks/useCurrentTrack';
import PlayPauseToggle from './Extras/PlayPauseToggle';
import PlayerEditableProgressBar from './Extras/PlayerEditableProgressBar';

export default function PlayerMain() {
	const currentTrack = useCurrentTrack();

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

				<PlayerEditableProgressBar />

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
						status="basic"
						accessoryLeft={(evaProps) => (
							<Icon {...evaProps} name="skip-back-outline" />
						)}
						onPress={() => {
							RNTrackPlayer.skipToPrevious();
						}}
					/>
					<PlayPauseToggle size="giant" status="basic" />
					<Button
						appearance="ghost"
						size="giant"
						status="basic"
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
