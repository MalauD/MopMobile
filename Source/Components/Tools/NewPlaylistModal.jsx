import React from 'react';
import PropTypes from 'prop-types';
import { Input, Layout, Modal, Toggle } from '@ui-kitten/components';
import { Button, View } from 'react-native';
import { useSelector } from 'react-redux';
import { CreatePlaylist } from '../../Api/Music/Playlist';

export default function NewPlaylistModal({ modalVisible, onBackdropPress, onPlaylistCreated }) {
	const user = useSelector((state) => state.UserAccountReducer);
	const [playlistName, setPlaylistName] = React.useState('');
	const [publicPlaylist, setPublicPlaylist] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const onCreate = () => {
		setIsLoading(true);
		CreatePlaylist(playlistName, [], publicPlaylist).then((playlistId) => {
			onBackdropPress();
			onPlaylistCreated({
				_id: playlistId,
				name: playlistName,
				public: publicPlaylist,
				musics: [],
				creator: user,
			});
			setIsLoading(false);
		});
	};

	return (
		<Modal
			visible={modalVisible}
			backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
			shouldUseContainer={false}
			style={{ flexDirection: 'column', justifyContent: 'flex-end' }}
			onBackdropPress={onBackdropPress}
		>
			<View style={{ flex: 1 }} />
			<Layout level="2">
				<View style={{ flexDirection: 'row' }}>
					<Input
						placeholder="Playlist name"
						value={playlistName}
						onChangeText={setPlaylistName}
						style={{ flex: 1, margin: 10 }}
					/>
					<Toggle
						checked={publicPlaylist}
						onChange={setPublicPlaylist}
						style={{ margin: 10 }}
					>
						Public
					</Toggle>
				</View>

				<Button
					title="Create"
					style={{ marginTop: 10 }}
					onPress={onCreate}
					disabled={isLoading}
				/>
			</Layout>
		</Modal>
	);
}

NewPlaylistModal.propTypes = {
	modalVisible: PropTypes.bool.isRequired,
	onBackdropPress: PropTypes.func.isRequired,
	onPlaylistCreated: PropTypes.func.isRequired,
};
