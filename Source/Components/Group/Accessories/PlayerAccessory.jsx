import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from '@ui-kitten/components';
import TrackPlayer from '../../Player/TrackPlayer';

function PlayAllAccessory({ musics }) {
	const onPress = async () => {
		await TrackPlayer.removeAllAndPlayMultiple(musics);
	};

	return (
		<Button
			appearance="ghost"
			status="basic"
			style={{ paddingHorizontal: 0, paddingVertical: 0 }}
			onPress={onPress}
			accessoryLeft={(evaProps) => <Icon {...evaProps} name="play-circle-outline" />}
		/>
	);
}

PlayAllAccessory.propTypes = {
	musics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

function AddAllToCurrentPlaylistAccessory({ musics }) {
	const onPress = async () => {
		await TrackPlayer.addTracks(musics);
	};

	return (
		<Button
			appearance="ghost"
			status="basic"
			style={{ paddingHorizontal: 0, paddingVertical: 0 }}
			onPress={onPress}
			accessoryLeft={(evaProps) => <Icon {...evaProps} name="plus-circle-outline" />}
		/>
	);
}

AddAllToCurrentPlaylistAccessory.propTypes = {
	musics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export { PlayAllAccessory, AddAllToCurrentPlaylistAccessory };
