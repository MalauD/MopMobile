import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { PlayerSmallControls } from './Extras/PlayerSmallControls';
import { PlayerProgressBar } from './Extras/PlayerProgressBar';

class PlayerOverlay extends React.Component {
	static propTypes = {
		navigation: PropTypes.shape({
			navigate: PropTypes.func,
		}).isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { navigation } = this.props;

		return (
			<View style={{
				position: 'absolute',
				left: 0,
				right: 0,
				bottom: 0,
				padding: '1.5%',
				alignItems: 'center',
			}}
			>
				<PlayerProgressBar />
				<PlayerSmallControls onPress={() => navigation.navigate('Player')} />
			</View>
		);
	}
}

export { PlayerOverlay };
