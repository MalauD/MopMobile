import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { Icon, Input, Layout, Button, TabView, Tab } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import debounce from 'lodash.debounce';
import MusicGroup from '../Components/Group/MusicGroup';
import AlbumGroup from '../Components/Group/AlbumGroup';
import ArtistGroup from '../Components/Group/ArtistGroup';
import { searchMusic, searchAlbum, searchArtist } from '../Api/Music/Search';

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
	},
});

function SearchTopBar({ onSearch, searchType }) {
	const [searchValue, setSearchValue] = useState('');
	const inputRef = useRef(null);

	const debouncedSearch = useCallback(
		debounce((value) => {
			onSearch(value, true);
		}, 500),
		[onSearch]
	);

	useEffect(() => {
		const timer = setTimeout(() => inputRef.current?.focus(), 0);
		return () => {
			clearTimeout(timer);
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	const handleChangeText = (text) => {
		setSearchValue(text);
		if (text.trim() === '') {
			debouncedSearch.cancel();
			onSearch('', true);
		} else {
			debouncedSearch(text);
		}
	};

	const handleSubmit = () => {
		debouncedSearch.cancel();
		onSearch(searchValue, false);
	};

	return (
		<View style={styles.container}>
			<BackButton />
			<Input
				style={{ flex: 1 }}
				placeholder={`Search for ${searchType}`}
				accessoryLeft={SearchIcon}
				returnKeyType="search"
				onSubmitEditing={handleSubmit}
				onChangeText={handleChangeText}
				value={searchValue}
				ref={inputRef}
			/>
		</View>
	);
}

SearchTopBar.propTypes = {
	onSearch: PropTypes.func.isRequired,
	searchType: PropTypes.string.isRequired,
};

const INDEX_TO_SEARCH_TYPE = ['musics', 'albums', 'artists'];

export default function SearchScreen() {
	const navigation = useNavigation();
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [musics, setMusics] = useState([]);
	const [albums, setAlbums] = useState([]);
	const [artists, setArtists] = useState([]);

	const abortControllerRef = useRef(null);

	const executeSearch = useCallback(
		async (query, isQuickSearch, index = selectedIndex) => {
			if (!query.trim()) {
				if (index === 0) setMusics([]);
				if (index === 1) setAlbums([]);
				if (index === 2) setArtists([]);
				return;
			}

			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
			abortControllerRef.current = new AbortController();

			setIsLoading(true);

			const searchMap = {
				0: { fetcher: searchMusic, setter: setMusics, state: musics },
				1: { fetcher: searchAlbum, setter: setAlbums, state: albums },
				2: { fetcher: searchArtist, setter: setArtists, state: artists },
			};

			const { fetcher, setter, state } = searchMap[index];

			try {
				const res = await fetcher(
					query,
					14,
					0,
					isQuickSearch,
					abortControllerRef.current.signal
				);
				if (isQuickSearch) {
					setter(res);
				} else {
					setter((prev) => [
						...prev,
						...res.filter((item) => !prev.some((existing) => existing.id === item.id)),
					]);
				}
			} catch (error) {
				if (error.name !== 'CanceledError' && error.name !== 'AbortError') {
					// Traitement de l'erreur métier
				}
			} finally {
				setIsLoading(false);
			}
		},
		[selectedIndex, musics, albums, artists]
	);

	const handleTabSelect = (index) => {
		setSelectedIndex(index);
	};

	return (
		<>
			<Layout level="1">
				<SearchTopBar
					onSearch={executeSearch}
					searchType={INDEX_TO_SEARCH_TYPE[selectedIndex] || 'musics'}
				/>
			</Layout>
			<Layout level="2" style={{ flex: 1 }}>
				<TabView selectedIndex={selectedIndex} onSelect={handleTabSelect}>
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
							onAlbumElementPress={(album) => {
								navigation.push('Album', {
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
							onArtistElementPress={(artist) => {
								navigation.push('Artist', {
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
