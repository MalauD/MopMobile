import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';

const styles = StyleSheet.create({
	loading: {
		height: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default function LoadingLayout() {
	return (
		<Layout style={styles.loading} level="2">
			<Spinner size="giant" />
		</Layout>
	);
}
