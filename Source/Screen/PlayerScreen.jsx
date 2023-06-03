import React from 'react';
import { useTheme } from '@ui-kitten/components';
import { ScrollView, View } from 'react-native';
import PlayerMain from '../Components/Player/PlayerMain';
import CurrentPlaylist from '../Components/Player/CurrentPlaylist';
import { TopBar } from '../Navigator/TopBar';

function PlayerScreen() {
	const theme = useTheme();

	return (
		<>
			<TopBar subtitle="Player" />
			<ScrollView
				style={{ height: '100%', backgroundColor: theme['background-basic-color-2'] }}
				level="2"
			>
				<PlayerMain />
				<CurrentPlaylist />
				<View style={{ height: 100 }} />
			</ScrollView>
		</>
	);
}

export default PlayerScreen;
