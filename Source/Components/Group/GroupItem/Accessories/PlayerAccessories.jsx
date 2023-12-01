import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Icon } from '@ui-kitten/components';
import TrackPlayer from '../../../Player/TrackPlayer';

function PlayAccessory({ music, hideModal }) {
	const onPress = async () => {
		await TrackPlayer.removeAllAndPlay(music);
		hideModal();
	};

	return (
		<ListItem
			title="Play"
			onPress={onPress}
			accessoryLeft={(evaProps) => <Icon {...evaProps} name="play-circle-outline" />}
		/>
	);
}

PlayAccessory.propTypes = {
	music: PropTypes.shape({}).isRequired,
	hideModal: PropTypes.func.isRequired,
};

function PlayNextAccessory({ music, hideModal }) {
	const onPress = async () => {
		await TrackPlayer.playNext(music);
		hideModal();
	};

	return (
		<ListItem
			title="Play Next"
			onPress={onPress}
			accessoryLeft={(evaProps) => <Icon {...evaProps} name="arrow-forward-outline" />}
		/>
	);
}

PlayNextAccessory.propTypes = {
	music: PropTypes.shape({}).isRequired,
	hideModal: PropTypes.func.isRequired,
};

function AddToCurrentPlaylistAccessory({ music, hideModal }) {
	const onPress = async () => {
		await TrackPlayer.addTrack(music);
		hideModal();
	};

	return (
		<ListItem
			title="Add to Current Playlist"
			onPress={onPress}
			accessoryLeft={(evaProps) => <Icon {...evaProps} name="plus-circle-outline" />}
		/>
	);
}

AddToCurrentPlaylistAccessory.propTypes = {
	music: PropTypes.shape({}).isRequired,
	hideModal: PropTypes.func.isRequired,
};

function RemoveFromPlayerAccessory({ musicIndex, hideModal }) {
	const onPress = async () => {
		await TrackPlayer.removeTracks([musicIndex]);
		hideModal();
	};

	return (
		<ListItem
			title="Remove from Player"
			onPress={onPress}
			accessoryLeft={(evaProps) => <Icon {...evaProps} name="trash-2-outline" />}
		/>
	);
}

RemoveFromPlayerAccessory.propTypes = {
	musicIndex: PropTypes.number.isRequired,
	hideModal: PropTypes.func.isRequired,
};

export {
	PlayAccessory,
	PlayNextAccessory,
	AddToCurrentPlaylistAccessory,
	RemoveFromPlayerAccessory,
};
