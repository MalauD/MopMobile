import React from 'react';
import { Layout } from '@ui-kitten/components';
import MusicGroup from '../Group/MusicGroup';
import useQueue from './Hooks/useQueue';

function CurrentPlaylist() {
	const queue = useQueue();

	return (
		<Layout level="2" style={{ height: '100%' }}>
			<MusicGroup title="Queue" musics={queue} />
		</Layout>
	);
}

export default CurrentPlaylist;
