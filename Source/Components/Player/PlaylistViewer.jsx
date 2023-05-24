import React from 'react';
import { Layout } from '@ui-kitten/components';
import TrackPlayer from './TrackPlayer';
import MusicGroup from '../Group/MusicGroup';
import { CONTEXT_PLAYLIST } from '../Group/Extras/Constants';

class PlaylistViewer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			PlaylistIds: [],
			IsFetching: false,
		};
	}

	componentDidMount = async () => {
		this.setState({ IsFetching: true });
		this.setState({
		//	PlaylistIds: await TrackPlayer.getInstance().GetTracksIds(),
			IsFetching: false,
		});
		//TrackPlayer.getInstance().CustomEvents.on('TrackAdded', this.NewTrackAdded);
	}

	componentWillUnmount() {
		//TrackPlayer.getInstance().CustomEvents.removeListener('TrackAdded', this.NewTrackAdded);
	}

	NewTrackAdded = (Tracks) => {
		this.setState({ IsFetching: true });
		this.setState({ PlaylistIds: Tracks, IsFetching: false });
	}

	render() {
		const { PlaylistIds, IsFetching } = this.state;
		return (
			<Layout level="2" style={{ height: '100%' }}>
				<MusicGroup
					DetailType="Current Playlist"
					ShowDetailType
					ContextType={CONTEXT_PLAYLIST}
					MusicIds={PlaylistIds}
					IsFetching={IsFetching}
				/>
			</Layout>
		);
	}
}

export { PlaylistViewer };
