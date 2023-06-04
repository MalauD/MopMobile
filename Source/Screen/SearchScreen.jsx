import React, { useEffect, useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Icon, Input, Layout, Button, TabView, Tab } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import debounce from 'lodash.debounce';
import MusicGroup from '../Components/Group/MusicGroup';
import { SearchMusic } from '../Api/Music/Search';

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

function SearchTopBar({ onQuickSearch, onSearch }) {
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

	return (
		<View style={styles.container}>
			<BackButton />
			<Input
				style={{ flex: 1 }}
				placeholder="Search for musics"
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
};

export default function SearchScreen() {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [musics, setMusics] = useState([]);

	const onQuickSearch = (searchValue) => {
		setIsLoading(true);
		SearchMusic(searchValue, 14, 0, true).then((res) => {
			setMusics(res);
			setIsLoading(false);
		});
	};

	const onSearch = (searchValue) => {
		SearchMusic(searchValue, 14, 0, false).then((res) => {
			setMusics([
				...musics,
				...res.filter((music) => !musics.some((m) => m.id === music.id)),
			]);
		});
	};

	return (
		<>
			<Layout level="1">
				<SearchTopBar onQuickSearch={onQuickSearch} onSearch={onSearch} />
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
				</TabView>
			</Layout>
		</>
	);
}
