import React from 'react';
import { TopNavigation, Button, Icon } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import AppName from './AppName';

function SearchButton() {
	const navigation = useNavigation();

	return (
		<Button
			appearance="ghost"
			status="basic"
			style={{ paddingHorizontal: 0, paddingVertical: 0 }}
			onPress={() => navigation.push('Search')}
			accessoryLeft={(evaProps) => <Icon {...evaProps} name="search" />}
		/>
	);
}

function accessoryRight() {
	return <SearchButton />;
}

export default function TopBar({ logged }) {
	return <TopNavigation title={AppName} accessoryRight={logged ? accessoryRight : null} />;
}

TopBar.propTypes = {
	logged: PropTypes.bool,
};

TopBar.defaultProps = {
	logged: true,
};
