import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Layout } from '@ui-kitten/components';
import MusicGroup from '../Components/Group/MusicGroup';
import { TopBar } from '../Navigator/TopBar';
import { GetPlaylist } from '../Api/Music/Playlist';

function PlaylistScreen({ route }) {
	const { playlistId, playlistName, playlistCreatorUsername } = route.params;

	const [playlistMusics, setPlaylistMusics] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		GetPlaylist(playlistId)
			.then((res) => {
				setPlaylistMusics(res.musics);
				setIsLoading(false);
			})
			.catch(() => {});
	}, [playlistId]);

	return (
		<>
			<TopBar />
			<Layout level="2" style={{ height: '100%' }}>
				<MusicGroup
					title={`${playlistName} by ${playlistCreatorUsername}`}
					musics={playlistMusics}
					isLoading={isLoading}
				/>
			</Layout>
		</>
	);
}

PlaylistScreen.propTypes = {
	route: propTypes.shape({
		params: propTypes.shape({
			playlistId: propTypes.string.isRequired,
			playlistName: propTypes.string.isRequired,
			playlistCreatorUsername: propTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
};

export default PlaylistScreen;
