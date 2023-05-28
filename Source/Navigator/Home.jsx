import React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { View } from 'react-native';
import { SearchScreen } from '../Screen/SearchScreen';
import { AccountScreen } from '../Screen/AccountScreen';
import { SuggestionScreen } from '../Screen/SuggestionScreen';
import { PreferenceScreen } from '../Screen/PreferenceScreen';
import { PlayerScreen } from '../Screen/PlayerScreen';
import PlayerOverlay from '../Components/Player/PlayerOverlay';

const { Navigator, Screen } = createBottomTabNavigator();

function SearchIcon(props) {
	return <Icon {...props} name="search-outline" />;
}

function SuggestionIcon(props) {
	return <Icon {...props} name="bulb-outline" />;
}

function AccountIcon(props) {
	return <Icon {...props} name="person-outline" />;
}

function SettingsIcon(props) {
	return <Icon {...props} name="settings-outline" />;
}

function PlaylistIcon(props) {
	return <Icon {...props} name="music-outline" />;
}

const useBottomNavigationState = (initialState = 1) => {
	const [selectedIndex, setSelectedIndex] = React.useState(initialState);
	return { selectedIndex, onSelect: setSelectedIndex };
};

function BottomTabBar({ navigation, state }) {
	return (
		<>
			<View style={{ position: 'relative' }}>
				<PlayerOverlay navigation={navigation} />
			</View>
			<BottomNavigation
				appearance="noIndicator"
				selectedIndex={state.index}
				onSelect={(index) => navigation.navigate(state.routeNames[index])}
			>
				<BottomNavigationTab icon={SearchIcon} />
				<BottomNavigationTab icon={SuggestionIcon} />
				<BottomNavigationTab icon={PlaylistIcon} />
				<BottomNavigationTab icon={AccountIcon} />
				<BottomNavigationTab icon={SettingsIcon} />
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

export function HomeNavigator() {
	return (
		<Navigator
			{...useBottomNavigationState()}
			tabBar={(props) => <BottomTabBar {...props} />}
			screenOptions={() => ({ headerShown: false })}
		>
			<Screen name="Search" component={SearchScreen} />
			<Screen name="Suggestion" component={SuggestionScreen} />
			<Screen name="Player" component={PlayerScreen} />
			<Screen name="Account" component={AccountScreen} />
			<Screen name="Preference" component={PreferenceScreen} />
		</Navigator>
	);
}
