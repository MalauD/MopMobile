import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TopNavigation, Input, Icon } from '@ui-kitten/components';
import PropTypes from 'prop-types';

const SearchIcon = (props) => <Icon {...props} name="search" />;

const renderTitle = () => {
	const [searchValue, setSearchValue] = useState('');

	return (
		<View style={styles.container}>
			<Text style={styles.title}>MOP</Text>
			<Input
				style={{ flex: 1 }}
				placeholder="Search for musics"
				accessoryLeft={SearchIcon}
				returnKeyType="search"
				onSubmitEditing={() => {}}
				onChangeText={setSearchValue}
				value={searchValue}
			/>
		</View>
	);
};

export const TopBar = ({ title, subtitle }) => {
	return <TopNavigation title={renderTitle} />;
};

const styles = StyleSheet.create({
	title: {
		fontFamily: 'pacifico',
		textShadowColor: 'rgba(204, 80, 108, 1)',
		textShadowOffset: { width: 3, height: 3 },
		textShadowRadius: 1,
		color: '#ffffff',
		fontSize: 20,
		width: 70,
		textAlignVertical: 'top',
	},
	container: {
		flexDirection: 'row',
		alignItems: 'stretch',
		flexWrap: 'wrap',
	},
});

TopBar.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
};

TopBar.defaultProps = {
	title: 'MOP',
	subtitle: '',
};
