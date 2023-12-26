import React from 'react';
import PropTypes from 'prop-types';
import { Layout, StyleService, Text } from '@ui-kitten/components';

const styles = StyleService.create({
	header: {
		padding: 16,
	},
});

export default function Header({ Username, likedMusicCount }) {
	return (
		<Layout style={styles.header} level="1">
			<Text category="h4">{Username}</Text>
			<Text appearance="hint" category="s1">
				{likedMusicCount} liked musics
			</Text>
		</Layout>
	);
}
