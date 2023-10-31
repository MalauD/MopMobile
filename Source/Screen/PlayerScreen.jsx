import React from 'react';
import PlayerMain from '../Components/Player/PlayerMain';
import CurrentPlaylist from '../Components/Player/CurrentPlaylist';

function PlayerScreen() {
	return (
		<CurrentPlaylist HeaderComponent={() => <PlayerMain />} />
	);
}

export default PlayerScreen;
