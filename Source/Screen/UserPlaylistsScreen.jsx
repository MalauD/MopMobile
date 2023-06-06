import React, { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import PlaylistGroup from '../Components/Group/PlaylistGroup';
import { GetPlaylistsOf } from '../Api/Music/Playlist';

function UserPlaylistsScreen({ user: { _id, username } }) {
	const [playlists, setPlaylists] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [prevPageEmpty, setPrevPageEmpty] = useState(false);

	const getPlaylists = () => {
		if (prevPageEmpty) return;
		GetPlaylistsOf(_id, currentPage, 10)
			.then((ApiResult) => {
				setPlaylists([...playlists, ...ApiResult.Playlists]);
				setCurrentPage(currentPage + 1);
				setPrevPageEmpty(ApiResult.length === 0);
			})
			.catch(() => {});
	};

	useEffect(() => {
		setIsLoading(true);
		GetPlaylistsOf(_id, 0, 10)
			.then((ApiResult) => {
				setPlaylists(ApiResult.Playlists);
				setIsLoading(false);
			})
			.catch(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<Layout level="2" style={{ height: '100%' }}>
			<PlaylistGroup
				title={`Playlist of ${username}`}
				playlists={playlists}
				isLoading={isLoading}
				onEndReached={getPlaylists}
			/>
		</Layout>
	);
}

UserPlaylistsScreen.propTypes = {
	user: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
	}).isRequired,
};

export default UserPlaylistsScreen;
