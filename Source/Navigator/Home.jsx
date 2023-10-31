import React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, useTheme } from '@ui-kitten/components';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountScreen } from '../Screen/AccountScreen';
import SuggestionScreen from '../Screen/SuggestionScreen';
import PlayerScreen from '../Screen/PlayerScreen';
import PlayerOverlay from '../Components/Player/PlayerOverlay';
import TrendingScreen from '../Screen/TrendingScreen';
import SearchScreen from '../Screen/SearchScreen';
import UserPlaylistsScreen from '../Screen/UserPlaylistsScreen';
import PlaylistScreen from '../Screen/PlaylistScreen';
import AlbumScreen from '../Screen/AlbumScreen';
import ArtistScreen from '../Screen/ArtistScreen';
import TopBar from './TopBar';

const { Navigator, Screen } = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function SuggestionIcon(props) {
	return <Icon {...props} name="bulb-outline" />;
}

function TrendingIcon(props) {
	return <Icon {...props} name="trending-up-outline" />;
}

function AccountIcon(props) {
	return <Icon {...props} name="person-outline" />;
}

function PlaylistIcon(props) {
	return <Icon {...props} name="music-outline" />;
}

const useBottomNavigationState = (initialState = 1) => {
	const [selectedIndex, setSelectedIndex] = React.useState(initialState);
	return { selectedIndex, onSelect: setSelectedIndex };
};

function BottomTabBar({ navigation, state }) {
	const shownState = state.index > 3 ? undefined : state.index;
	return (
		<>
			{state.index !== 2 && (
				<View style={{ position: 'relative' }}>
					<PlayerOverlay navigation={navigation} />
				</View>
			)}
			<BottomNavigation
				appearance="noIndicator"
				selectedIndex={shownState}
				onSelect={(index) => navigation.navigate(state.routeNames[index])}
			>
				<BottomNavigationTab icon={SuggestionIcon} />
				<BottomNavigationTab icon={TrendingIcon} />
				<BottomNavigationTab icon={PlaylistIcon} />
				<BottomNavigationTab icon={AccountIcon} />
			</BottomNavigation>
		</>
	);
}

BottomTabBar.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}).isRequired,
	state: PropTypes.shape({
		index: PropTypes.number,
		routeNames: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
};

function HomeStackWarper({ component }) {
	return (
		<HomeStack.Navigator screenOptions={{ header: () => <TopBar logged /> }}>
			<HomeStack.Screen name="RootStack" component={component} />
			<HomeStack.Screen
				name="Search"
				component={SearchScreen}
				options={{ headerShown: false }}
			/>
			<HomeStack.Screen name="UserPlaylists" component={UserPlaylistsScreen} />
			<HomeStack.Screen name="Playlist" component={PlaylistScreen} />
			<HomeStack.Screen name="Album" component={AlbumScreen} />
			<HomeStack.Screen name="Artist" component={ArtistScreen} />
		</HomeStack.Navigator>
	);
}

HomeStackWarper.propTypes = {
	component: PropTypes.func.isRequired,
};

function WrappedSuggestionScreen() {
	return <HomeStackWarper component={SuggestionScreen} />;
}
function WrappedTrendingScreen() {
	return <HomeStackWarper component={TrendingScreen} />;
}
function WrappedPlayerScreen() {
	return <HomeStackWarper component={PlayerScreen} />;
}
function WrappedAccountScreen() {
	return <HomeStackWarper component={AccountScreen} />;
}

export default function HomeNavigator() {
	const theme = useTheme();

	return (
		<Navigator
			{...useBottomNavigationState()}
			tabBar={(props) => <BottomTabBar {...props} />}
			screenOptions={{ headerShown: false }}
			sceneContainerStyle={{ backgroundColor: theme['background-basic-color-1'] }}
		>
			<Screen name="Suggestion" component={WrappedSuggestionScreen} />
			<Screen name="Trending" component={WrappedTrendingScreen} />
			<Screen name="Player" component={WrappedPlayerScreen} />
			<Screen name="Account" component={WrappedAccountScreen} />
		</Navigator>
	);
}
