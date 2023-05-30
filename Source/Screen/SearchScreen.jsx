import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Icon, TopNavigation, Input, Layout, Button, TabView, Tab } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
			onPress={() => navigation.navigate('Search')}
			accessoryLeft={(evaProps) => <Icon {...evaProps} name="arrow-back" />}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'stretch',
		flexWrap: 'wrap',
	},
});

function TopNavigationTitle() {
	const [searchValue, setSearchValue] = useState('');
	const inputRef = useRef(null);

	useEffect(() => {
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	}, []);

	return (
		<View style={styles.container}>
			<BackButton />
			<Input
				style={{ flex: 1 }}
				placeholder="Search for musics"
				accessoryLeft={SearchIcon}
				returnKeyType="search"
				onSubmitEditing={() => {}}
				onChangeText={setSearchValue}
				value={searchValue}
				ref={inputRef}
			/>
		</View>
	);
}

export default function SearchScreen() {
	const [selectedIndex, setSelectedIndex] = useState(0);

	return (
		<>
			<TopNavigation title={TopNavigationTitle} accessoryLeft={SearchIcon} />
			<Layout level="2" style={{ height: '100%' }}>
				<TabView
					selectedIndex={selectedIndex}
					onSelect={(index) => setSelectedIndex(index)}
				>
					<Tab title="Musics" />
					<Tab title="Albums" />
					<Tab title="Artists" />
				</TabView>
			</Layout>
		</>
	);
}
