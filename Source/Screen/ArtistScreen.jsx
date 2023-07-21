import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import propTypes from 'prop-types';
import { Layout, Tab, TabView } from '@ui-kitten/components';
import AlbumGroup from '../Components/Group/AlbumGroup';
import { TopBar } from '../Navigator/TopBar';
import { GetArtistById } from '../Api/Music/Music';
import MusicGroup from '../Components/Group/MusicGroup';
import ArtistGroup from '../Components/Group/ArtistGroup';
import ArtistElement from '../Components/Group/GroupItem/ArtistElement';

function ArtistScreen({ route }) {
	const navigation = useNavigation();

	const { artistId, artistName, artistPicture } = route.params;
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [artistAlbums, setArtistAlbums] = useState([]);
	const [artistTopTracks, setArtistTopTracks] = useState([]);
	const [artistRelatedArtists, setArtistRelatedArtists] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		GetArtistById(artistId)
			.then((res) => {
				setArtistAlbums(res.albums);
				setArtistTopTracks(res.top_tracks);
				setArtistRelatedArtists(res.related_artists);
				setIsLoading(false);
			})
			.catch(() => {});
	}, [artistId]);

	return (
		<>
			<TopBar />

			<Layout level="1" style={{ height: '100%' }}>
				<ArtistElement
					artist={{ _id: artistId, name: artistName, picture: artistPicture }}
					onPress={() => {}}
					index={0}
				/>
				<TabView
					selectedIndex={selectedIndex}
					onSelect={(index) => setSelectedIndex(index)}
					shouldLoadComponent={(index) => index === selectedIndex}
				>
					<Tab title="Top tracks">
						<MusicGroup hideHeader musics={artistTopTracks} isLoading={isLoading} />
					</Tab>
					<Tab title="Albums">
						<AlbumGroup
							hideHeader
							albums={artistAlbums}
							isLoading={isLoading}
							onAlbumElementPress={(album, _) => {
								navigation.navigate('Album', {
									albumId: album._id,
									albumName: album.name,
									albumCover: album.cover,
								});
							}}
						/>
					</Tab>
					<Tab title="Related artists">
						<ArtistGroup
							hideHeader
							artists={artistRelatedArtists}
							isLoading={isLoading}
							onArtistElementPress={(artist, _) => {
								navigation.navigate('Artist', {
									artistId: artist._id,
									artistName: artist.name,
									artistPicture: artist.picture,
								});
							}}
						/>
					</Tab>
				</TabView>
			</Layout>
		</>
	);
}

ArtistScreen.propTypes = {
	route: propTypes.shape({
		params: propTypes.shape({
			artistId: propTypes.number.isRequired,
			artistName: propTypes.string.isRequired,
			artistPicture: propTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
};

export default ArtistScreen;
