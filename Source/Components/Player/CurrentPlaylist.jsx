import React from 'react';
import RNTrackPlayer from 'react-native-track-player';
import MusicGroup from '../Group/MusicGroup';
import useQueue from './Hooks/useQueue';
import { QueueAccessorySet } from '../Group/GroupItem/Accessories/AccessorySets';
import useCurrentTrack from './Hooks/useCurrentTrack';

function CurrentPlaylist() {
	const queue = useQueue();
	const currentTrack = useCurrentTrack();

	return (
		<MusicGroup
			title="Queue"
			musics={queue}
			elementAccessories={QueueAccessorySet}
			highlightedMusics={[currentTrack?._id]}
			onMusicElementPress={(_, index) => {
				RNTrackPlayer.skip(index);
			}}
		/>
	);
}

export default CurrentPlaylist;
