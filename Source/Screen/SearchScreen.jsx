import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { Icon, Input, Layout, Button, TabView, Tab } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import debounce from 'lodash.debounce';
import MusicGroup from '../Components/Group/MusicGroup';
import AlbumGroup from '../Components/Group/AlbumGroup';
import ArtistGroup from '../Components/Group/ArtistGroup';
import { SearchMusic, SearchAlbum, SearchArtist } from '../Api/Music/Search';

function SearchIcon(props) {
	return <Icon {...props} name="search" />;
}

function BackButton() {
	const navigation = useNavigation();

	return (
		<Button
			appearance="ghost"
			status="basic"
			style={{ paddingHorizontal: 0, paddingVertical: 0, marginRight: 8 }}
			onPress={() => navigation.goBack()}
			accessoryLeft={(evaProps) => <Icon {...evaProps} name="arrow-back" />}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 8,
		// alignItems: 'stretch',
		//	flexWrap: 'wrap',
	},
});

function SearchTopBar({ onQuickSearch, onSearch, searchType }) {
	const [searchValue, setSearchValue] = useState('');
	const inputRef = useRef(null);

	const handleChange = (newSearchValue) => {
		onQuickSearch(newSearchValue);
	};

	const debounceFunc = useMemo(() => debounce(handleChange, 500), []);

	useEffect(() => {
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
		return () => {
			debounceFunc.cancel();
		};
	}, []);

	useEffect(() => {
		if (searchValue !== '') {
			if (inputRef.current.isFocused()) {
				onQuickSearch(searchValue);
			} else {
				onSearch(searchValue);
			}
		}
	}, [searchType]);

	return (
		<View style={styles.container}>
			<BackButton />
			<Input
				style={{ flex: 1 }}
				placeholder={`Search for ${searchType}`}
				accessoryLeft={SearchIcon}
				returnKeyType="search"
				onSubmitEditing={() => onSearch(searchValue)}
				onChangeText={(newSearchValue) => {
					setSearchValue(newSearchValue);
					if (newSearchValue !== '') {
						debounceFunc(newSearchValue);
					}
				}}
				value={searchValue}
				ref={inputRef}
			/>
		</View>
	);
}

SearchTopBar.propTypes = {
	onQuickSearch: PropTypes.func.isRequired,
	onSearch: PropTypes.func.isRequired,
	searchType: PropTypes.string.isRequired,
};

function indexToSearchType(index) {
	switch (index) {
		case 0:
			return 'musics';
		case 1:
			return 'albums';
		case 2:
			return 'artists';
		default:
			return 'musics';
	}
}

export default function SearchScreen() {
	const navigation = useNavigation();

	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [musics, setMusics] = useState([]);
	const [albums, setAlbums] = useState([]);
	const [artists, setArtists] = useState([]);

	const getSearch = () => {
		switch (selectedIndex) {
			case 0:
				return { SearchFunc: SearchMusic, SetFunc: setMusics, prev: musics };
			case 1:
				return { SearchFunc: SearchAlbum, SetFunc: setAlbums, prev: albums };
			case 2:
				return { SearchFunc: SearchArtist, SetFunc: setArtists, prev: artists };
			default:
				return {};
		}
	};

	const onQuickSearch = (searchValue) => {
		setIsLoading(true);
		const { SearchFunc, SetFunc } = getSearch();
		SearchFunc(searchValue, 14, 0, true).then((res) => {
			SetFunc(res);
			setIsLoading(false);
		});
	};

	const onSearch = (searchValue) => {
		const { SearchFunc, SetFunc, prev } = getSearch();
		SearchFunc(searchValue, 14, 0, false).then((res) => {
			SetFunc([...prev, ...res.filter((d1) => !prev.some((d2) => d1.id === d2.id))]);
		});
	};

	return (
		<>
			<Layout level="1">
				<SearchTopBar
					onQuickSearch={onQuickSearch}
					onSearch={onSearch}
					searchType={indexToSearchType(selectedIndex)}
				/>
			</Layout>
			<Layout level="2" style={{ height: '100%' }}>
				<TabView
					selectedIndex={selectedIndex}
					onSelect={(index) => setSelectedIndex(index)}
				>
					<Tab title="Musics">
						<MusicGroup
							title="Musics"
							hideHeader
							musics={musics}
							isLoading={isLoading}
						/>
					</Tab>
					<Tab title="Albums">
						<AlbumGroup
							title="Albums"
							hideHeader
							albums={albums}
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
					<Tab title="Artists">
						<ArtistGroup
							title="Artists"
							hideHeader
							artists={artists}
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
