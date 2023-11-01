import React, { useEffect, useState } from 'react';
import { Layout, ListItem } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import PlaylistGroup from '../Components/Group/PlaylistGroup';
import { AddToPlaylist, GetPlaylistsOf } from '../Api/Music/Playlist';
import MusicElement from '../Components/Group/GroupItem/MusicElement';

function AddToPlaylistScreen({ route }) {
	const myId = useSelector((state) => state.UserAccountReducer._id);
	const navigation = useNavigation();

	const [playlists, setPlaylists] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

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
		AddToPlaylist(playlist._id, route.params.music._id).then(() => {
			navigation.goBack();
		});
	};

	return (
		<Layout level="1" style={{ height: '100%' }}>
			<ListItem title="Add" />
			<MusicElement music={route.params.music} />
			<PlaylistGroup
				title="to my playlists"
				playlists={playlists}
				isLoading={isLoading}
				onPlaylistElementPress={onPlaylistElementPress}
				// onEndReached={getPlaylists}
			/>
		</Layout>
	);
}

AddToPlaylistScreen.propTypes = {
	route: PropTypes.shape({
		params: PropTypes.shape({
			music: PropTypes.shape({
				_id: PropTypes.number.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
};

export default AddToPlaylistScreen;
