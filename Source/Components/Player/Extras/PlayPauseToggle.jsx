import React from 'react';
import { Button, Icon, Spinner } from '@ui-kitten/components';
import RNTrackPlayer from 'react-native-track-player';
import TrackPlayer from '../TrackPlayer';

const PlayIcon = (props) => <Icon {...props} name="play-circle-outline" />;

const PauseIcon = (props) => <Icon {...props} name="pause-circle-outline" />;

class PlayPauseToggleClass extends React.Component {
	constructor(props) {
		super(props);
		this._IsMounted = false;
		this.state = {
			IsPlaying: false,
			IsLoading: false,
		};
	}

	componentDidMount() {
		this._IsMounted = true;
		this.UpdatePlayingState();
		// TrackPlayer.getInstance().AddEvent('playback-state', ({ state }) => {
		// 	this.UpdatePlayingState(state);
		// });
	}

	componentWillUnmount() {
		this._IsMounted = false;
	}

	OnButtonPress = () => {
		const { IsPlaying, IsLoading } = this.state;
		if (IsLoading) return;

		//IsPlaying ? TrackPlayer.getInstance().Pause() : TrackPlayer.getInstance().Play();
	};

	async UpdatePlayingState(state) {
		if (this._IsMounted) {
			this.setState({
				//		IsPlaying: await TrackPlayer.getInstance().IsPlaying(),
				IsLoading: state === RNTrackPlayer.STATE_BUFFERING,
			});
		}
	}

	render() {
		const { IsPlaying, IsLoading } = this.state;

		if (IsLoading) {
			return <Spinner size="small" />;
		}
		return (
			<Button
				onPress={this.OnButtonPress}
				appearance="ghost"
				accessoryLeft={IsPlaying ? PauseIcon : PlayIcon}
			/>
		);
	}
}

const PlayPauseToggle = (props) => <PlayPauseToggleClass {...props} />;

export { PlayPauseToggle };
