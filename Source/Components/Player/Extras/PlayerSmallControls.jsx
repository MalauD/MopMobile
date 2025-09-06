import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Avatar, useTheme } from '@ui-kitten/components';
import { ImageBackground } from 'react-native';
import PlayPauseToggle from './PlayPauseToggle';
import useCurrentTrack from '../Hooks/useCurrentTrack';

function MusicImage({ image_url }) {
	return (
		<Avatar
			ImageComponent={ImageBackground}
			shape="square"
			source={{
				uri: image_url || require('../../../Assets/nomusic.jpg'),
			}}
		/>
	);
}

MusicImage.propTypes = {
	image_url: PropTypes.string,
};

MusicImage.defaultProps = {
	image_url: undefined,
};

function PlayerSmallControls({ onPress }) {
	const currentMusic = useCurrentTrack();

	if (currentMusic) {
		const { title, artist_name, image_url } = currentMusic;

		return (
			<ListItem
				style={{
					zIndex: 1,
					paddingBottom: 8,
					paddingTop: 6,
					marginTop: 0,
					borderBottomLeftRadius: 10,
					borderBottomRightRadius: 10,
				}}
				title={title}
				description={artist_name}
				accessoryRight={PlayPauseToggle}
				accessoryLeft={() => <MusicImage image_url={image_url} />}
				onPress={onPress}
				disabled
			/>
		);
	}
	return null;
}

PlayerSmallControls.propTypes = {
	onPress: PropTypes.func,
};

PlayerSmallControls.defaultProps = {
	onPress: () => {},
};

export default PlayerSmallControls;
