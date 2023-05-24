import React from 'react';
import { Layout } from '@ui-kitten/components';
import { PlayerMain } from '../Components/Player/PlayerMain';
import { PlaylistViewer } from '../Components/Player/PlaylistViewer';
import { TopBar } from '../Navigator/TopBar';

const PlayerScreen = () => (
	<>
		<TopBar subtitle="Player" />
		<Layout style={{ height: '100%' }} level="2">
			<PlayerMain />
			<PlaylistViewer />
		</Layout>
	</>
);

export { PlayerScreen };
