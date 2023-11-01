import React, { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import PlaylistGroup from '../Components/Group/PlaylistGroup';
import { AddToPlaylist, GetPlaylistsOf } from '../Api/Music/Playlist';
import CreateNewPlaylistItem from '../Components/Tools/CreateNewPlaylistItem';
import NewPlaylistModal from '../Components/Tools/NewPlaylistModal';

function AddToPlaylistScreen({ route }) {
	const myId = useSelector((state) => state.UserAccountReducer._id);
	const navigation = useNavigation();

	const [playlists, setPlaylists] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		GetPlaylistsOf(myId, 0, 100)
			.then((ApiResult) => {
				setPlaylists(ApiResult.Playlists);
				// setCurrentPage(1);
				setIsLoading(false);
			})
			.catch(() => {
				setIsLoading(false);
			});
	}, []);

	const onPlaylistElementPress = (playlist) => {
		AddToPlaylist(
			playlist._id,
			route.params.musics.map(({ _id }) => _id)
		).then(() => {
			navigation.goBack();
		});
	};

	return (
		<Layout level="1" style={{ height: '100%' }}>
			<PlaylistGroup
				title={`Add ${route.params.musics.length} musics to playlist`}
				playlists={playlists}
				isLoading={isLoading}
				onPlaylistElementPress={onPlaylistElementPress}
				ListFooterComponent={() => (
					<CreateNewPlaylistItem onPress={() => setModalVisible(true)} />
				)}
			/>
			<NewPlaylistModal
				modalVisible={modalVisible}
				onBackdropPress={() => setModalVisible(false)}
				onPlaylistCreated={(playlist) => setPlaylists([...playlists, playlist])}
			/>
		</Layout>
	);
}

AddToPlaylistScreen.propTypes = {
	route: PropTypes.shape({
		params: PropTypes.shape({
			musics: PropTypes.arrayOf(
				PropTypes.shape({
					_id: PropTypes.number.isRequired,
					title: PropTypes.string.isRequired,
					artist_name: PropTypes.string.isRequired,
				})
			).isRequired,
		}).isRequired,
	}).isRequired,
};

export default AddToPlaylistScreen;
