import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Layout } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import MusicGroup from '../Components/Group/MusicGroup';
import { GetPlaylist } from '../Api/Music/Playlist';
import {
	DefaultAccesorySet,
	OwnPlaylistAccessorySet,
} from '../Components/Group/GroupItem/Accessories/AccessorySets';

function PlaylistScreen({ route }) {
	const myId = useSelector((state) => state.UserAccountReducer._id);
	const { playlistId, playlistName, playlistCreatorUsername } = route.params;
	const [isMine, setIdMine] = useState(false);
	const [playlistMusics, setPlaylistMusics] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		GetPlaylist(playlistId)
			.then((res) => {
				setIdMine(res.creator._id === myId);
				setPlaylistMusics(res.musics);
				setIsLoading(false);
			})
			.catch(() => {});
	}, [playlistId]);

	return (
		<Layout level="2" style={{ height: '100%' }}>
			<MusicGroup
				title={`${playlistName} by ${playlistCreatorUsername}`}
				musics={playlistMusics}
				isLoading={isLoading}
				elementAccessories={isMine ? OwnPlaylistAccessorySet(playlistId) : DefaultAccesorySet}
			/>
		</Layout>
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
