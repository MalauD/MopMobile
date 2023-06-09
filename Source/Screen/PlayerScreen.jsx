import React from 'react';
import PlayerMain from '../Components/Player/PlayerMain';
import CurrentPlaylist from '../Components/Player/CurrentPlaylist';
import { TopBar } from '../Navigator/TopBar';

function PlayerScreen() {
	return (
		<>
			<TopBar subtitle="Player" />
			<CurrentPlaylist HeaderComponent={() => <PlayerMain />} />
		</>
	);
}

export default PlayerScreen;
