import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Layout } from '@ui-kitten/components';
import MusicGroup from '../Components/Group/MusicGroup';
import { GetAlbumById } from '../Api/Music/Music';

function AlbumScreen({ route }) {
	const { albumId, albumName } = route.params;

	const [albumMusics, setAlbumMusics] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		GetAlbumById(albumId)
			.then((res) => {
				setAlbumMusics(res.musics);
				setIsLoading(false);
			})
			.catch(() => {});
	}, [albumId]);

	return (
		<Layout level="2" style={{ height: '100%' }}>
			<MusicGroup title={albumName} musics={albumMusics} isLoading={isLoading} />
		</Layout>
	);
}

AlbumScreen.propTypes = {
	route: propTypes.shape({
		params: propTypes.shape({
			albumId: propTypes.number.isRequired,
			albumName: propTypes.string.isRequired,
			albumCover: propTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
};

export default AlbumScreen;
