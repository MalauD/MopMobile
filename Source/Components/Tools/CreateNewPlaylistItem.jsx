import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@ui-kitten/components';

export default function CreateNewPlaylistItem({ onPress }) {
	return <ListItem level={2} onPress={onPress} title="Create new playlist" />;
}

CreateNewPlaylistItem.propTypes = {
	onPress: PropTypes.func.isRequired,
};
