import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useProgress } from 'react-native-track-player';
import { withStyles } from '@ui-kitten/components';

function ProgressBar({ eva }) {
	const progress = useProgress(200);

	return (
		<View
			style={{
				zIndex: 100,
				height: 2,
				width: '100%',
				flexDirection: 'row',
				paddingBottom: 0,
				marginBottom: 0,
			}}
		>
			<View
				style={{
					borderTopLeftRadius: 10,
					flex: progress.position,
					backgroundColor: eva.style.ProgressColor,
				}}
			/>
			<View
				style={{
					borderTopRightRadius: 10,
					flex: progress.duration - progress.position,
					backgroundColor: 'transparent',
				}}
			/>
		</View>
	);
}

ProgressBar.propTypes = {
	eva: PropTypes.shape({
		style: PropTypes.shape({ ProgressColor: PropTypes.string }),
	}).isRequired,
};

const PlayerProgressBar = withStyles(ProgressBar, (theme) => ({
	ProgressColor: theme['color-info-transparent-default-border'],
}));

export default PlayerProgressBar;
