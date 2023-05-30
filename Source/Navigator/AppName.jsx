import React from 'react';
import { StyleSheet, Text } from 'react-native';

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
});

export default function AppName() {
	return <Text style={styles.title}>MOP</Text>;
}
