import React from 'react';
import PropTypes from 'prop-types';
import RNTrackPlayer from 'react-native-track-player';
import MusicGroup from '../Group/MusicGroup';
import useQueue from './Hooks/useQueue';
import { QueueAccessorySet } from '../Group/GroupItem/Accessories/AccessorySets';
import useCurrentTrackIndex from './Hooks/useCurrentTrackIndex';
import { QueueGroupAccessorySet } from '../Group/Accessories/AccessorySets';

function CurrentPlaylist({ HeaderComponent }) {
	const queue = useQueue();
	const currentTrackIndex = useCurrentTrackIndex();

	return (
		<MusicGroup
			title="Queue"
			musics={queue}
			elementAccessories={QueueAccessorySet}
			groupAccessories={QueueGroupAccessorySet}
			highlightedMusicsIndex={[currentTrackIndex]}
			onMusicElementPress={(_, index) => {
				RNTrackPlayer.skip(index);
			}}
			ListHeaderComponent={HeaderComponent}
		/>
	);
}

CurrentPlaylist.propTypes = {
	HeaderComponent: PropTypes.elementType,
};

CurrentPlaylist.defaultProps = {
	HeaderComponent: () => null,
};

export default CurrentPlaylist;
