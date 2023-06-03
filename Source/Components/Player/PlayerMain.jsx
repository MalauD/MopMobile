import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Avatar } from '@ui-kitten/components';
import useCurrentTrack from './Hooks/useCurrentTrack';

const styles = StyleSheet.create({
	PlayerMain: {
		flex: 1,
	},
	Avatar: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
});

export default function PlayerMain() {
	const currentTrack = useCurrentTrack();

	if (currentTrack) {
		const { image_url } = currentTrack;
		return (
			<View style={styles.PlayerMain}>
				<Avatar
					ImageComponent={ImageBackground}
					shape="square"
					style={styles.Avatar}
					source={{
						uri: image_url || require('../../Assets/nomusic.jpg'),
					}}
				/>
			</View>
		);
	}

	return null;
}
