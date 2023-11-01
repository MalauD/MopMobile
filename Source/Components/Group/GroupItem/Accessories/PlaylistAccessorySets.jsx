import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { Icon, ListItem } from '@ui-kitten/components';
import { DeletePlaylist } from '../../../../Api/Music/Playlist';

function DeletePlaylistAccessory({ hideModal, playlist }) {
	const navigation = useNavigation();

	const onPress = () => {
		DeletePlaylist(playlist._id).then(() => {
			hideModal();
			navigation.goBack();
		});
	};

	return (
		<ListItem
			title="Delete Playlist"
			onPress={onPress}
			accessoryLeft={(evaProps) => <Icon {...evaProps} name="trash-2-outline" />}
		/>
	);
}

DeletePlaylistAccessory.propTypes = {
	hideModal: PropTypes.func.isRequired,
	playlist: PropTypes.shape({
		_id: PropTypes.string.isRequired,
	}).isRequired,
};

const DefaultPlaylistAccesorySet = [];

const OwnPlaylistAccessorySet = [DeletePlaylistAccessory];

export { DefaultPlaylistAccesorySet, OwnPlaylistAccessorySet };
