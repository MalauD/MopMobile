import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';
import AppName from '../../Navigator/AppName';

const styles = StyleSheet.create({
	loading: {
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default function LoadingLayout({ includeLogo = false }) {
	return (
		<Layout style={styles.loading} level="2">
			{includeLogo ? <AppName fontSize={40} width={120} /> : null}
			<Spinner size="giant" />
		</Layout>
	);
}

LoadingLayout.propTypes = {
	includeLogo: PropTypes.bool,
};

LoadingLayout.defaultProps = {
	includeLogo: false,
};
