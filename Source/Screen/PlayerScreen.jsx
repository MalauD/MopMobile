import React from 'react';
import { Layout } from '@ui-kitten/components';
import PlayerMain from '../Components/Player/PlayerMain';
import CurrentPlaylist from '../Components/Player/CurrentPlaylist';
import { TopBar } from '../Navigator/TopBar';

function PlayerScreen() {
	return (
		<>
			<TopBar subtitle="Player" />
			<Layout style={{ height: '100%' }} level="2">
				<PlayerMain />
				<CurrentPlaylist />
			</Layout>
		</>
	);
}

export default PlayerScreen;
