import React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { View } from 'react-native';
import { AccountScreen } from '../Screen/AccountScreen';
import SuggestionScreen from '../Screen/SuggestionScreen';
import PlayerScreen from '../Screen/PlayerScreen';
import PlayerOverlay from '../Components/Player/PlayerOverlay';
import TrendingScreen from '../Screen/TrendingScreen';
import SearchScreen from '../Screen/SearchScreen';

const { Navigator, Screen } = createBottomTabNavigator();

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

export default function HomeNavigator() {
	return (
		<Navigator
			{...useBottomNavigationState()}
			tabBar={(props) => <BottomTabBar {...props} />}
			screenOptions={() => ({ headerShown: false })}
		>
			<Screen name="Suggestion" component={SuggestionScreen} />
			<Screen name="Trending" component={TrendingScreen} />
			<Screen name="Player" component={PlayerScreen} />
			<Screen name="Account" component={AccountScreen} />
			<Screen name="Search" component={SearchScreen} />
		</Navigator>
	);
}
