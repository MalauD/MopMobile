import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
	title: {
		fontFamily: 'pacifico',
		textShadowColor: 'rgba(204, 80, 108, 1)',
		textShadowOffset: { width: 3, height: 3 },
		textShadowRadius: 1,
		color: '#ffffff',
		fontSize: 20,
		width: 100,
		textAlignVertical: 'top',
	},
});

export default function AppName({ fontSize = 20, width }) {
	return <Text style={{ ...styles.title, ...{ fontSize, width } }}>MOP</Text>;
}

AppName.propTypes = {
	fontSize: PropTypes.number,
	width: PropTypes.number,
};

AppName.defaultProps = {
	fontSize: 20,
	width: 70,
};
