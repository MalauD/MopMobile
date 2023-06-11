import React, { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import PlaylistGroup from '../Components/Group/PlaylistGroup';
import { GetPlaylistsOf } from '../Api/Music/Playlist';
import { TopBar } from '../Navigator/TopBar';

function UserPlaylistsScreen({ route }) {
	const {
		user: { _id, username },
	} = route.params;
	const navigation = useNavigation();

	const [playlists, setPlaylists] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	// const [currentPage, setCurrentPage] = useState(1);
	// const [prevPageEmpty, setPrevPageEmpty] = useState(false);

	// const getPlaylists = () => {
	// 	if (prevPageEmpty) return;
	// 	console.log(currentPage);
	// 	GetPlaylistsOf(_id, currentPage, 10)
	// 		.then((ApiResult) => {
	// 			setPlaylists([...playlists, ...ApiResult.Playlists]);
	// 			setCurrentPage(currentPage + 1);
	// 			setPrevPageEmpty(ApiResult.length === 0);
	// 		})
	// 		.catch(() => {});
	// };

	useEffect(() => {
		setIsLoading(true);
		GetPlaylistsOf(_id, 0, 100)
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
		navigation.navigate('Playlist', {
			playlistId: playlist._id,
			playlistName: playlist.name,
			playlistCreatorUsername: username,
		});
	};

	return (
		<>
			<TopBar />
			<Layout level="2" style={{ height: '100%' }}>
				<PlaylistGroup
					title={`Playlists of ${username}`}
					playlists={playlists}
					isLoading={isLoading}
					onPlaylistElementPress={onPlaylistElementPress}
					// onEndReached={getPlaylists}
				/>
			</Layout>
		</>
	);
}

UserPlaylistsScreen.propTypes = {
	route: PropTypes.shape({
		params: PropTypes.shape({
			user: PropTypes.shape({
				_id: PropTypes.string.isRequired,
				username: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
};

export default UserPlaylistsScreen;
