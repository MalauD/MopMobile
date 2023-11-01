import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { RemoveFromPlaylist } from '../../../../Api/Music/Playlist';

function AddToPlaylistAccessory({ music, hideModal }) {
	const navigation = useNavigation();

	const onPress = async () => {
		hideModal();
		navigation.navigate('AddToPlaylist', {
			musics: [music],
		});
	};

	return (
		<ListItem
			title="Add to playlist"
			onPress={onPress}
			accessoryLeft={(evaProps) => <Icon {...evaProps} name="folder-add-outline" />}
		/>
	);
}

AddToPlaylistAccessory.propTypes = {
	music: PropTypes.shape({}).isRequired,
	hideModal: PropTypes.func.isRequired,
};

function RemoveFromPlaylistAccessory({ playlistId, musicIndex, hideModal }) {
	const navigation = useNavigation();
	const onPress = async () => {
		RemoveFromPlaylist(playlistId, musicIndex).then(() => {
			navigation.goBack();
			hideModal();
		});
	};

	return (
		<ListItem
			title="Remove from playlist"
			onPress={onPress}
			accessoryLeft={(evaProps) => <Icon {...evaProps} name="minus-circle-outline" />}
		/>
	);
}

RemoveFromPlaylistAccessory.propTypes = {
	playlistId: PropTypes.string.isRequired,
	musicIndex: PropTypes.number.isRequired,
	hideModal: PropTypes.func.isRequired,
};

export { AddToPlaylistAccessory, RemoveFromPlaylistAccessory };
