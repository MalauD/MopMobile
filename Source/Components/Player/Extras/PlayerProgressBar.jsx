import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useProgress } from 'react-native-track-player';
import { withStyles } from '@ui-kitten/components';

const ProgressBar = ({ eva }) => {
	const progress = useProgress();

	return (
		<View
			style={{
				zIndex: 100,
				height: 1,
				width: '100%',
				flexDirection: 'row',
			}}
		>
			<View
				style={{
					flex: progress.position,
					backgroundColor: eva.style.ProgressColor,
				}}
			/>
			<View
				style={{
					flex: progress.duration - progress.position,
					backgroundColor: 'transparent',
				}}
			/>
		</View>
	);
};

ProgressBar.propTypes = {
	eva: PropTypes.shape({
		style: PropTypes.shape({ ProgressColor: PropTypes.string }),
	}).isRequired,
};

const PlayerProgressBar = withStyles(ProgressBar, (theme) => ({
	ProgressColor: theme['color-info-transparent-default-border'],
}));

export { PlayerProgressBar };
