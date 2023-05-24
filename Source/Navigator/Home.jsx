import React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	BottomNavigation,
	BottomNavigationTab,
	Icon,
} from '@ui-kitten/components';
import { View } from 'react-native';
import { PlayerOverlay } from '../Components/Player/PlayerOverlay';
import { SearchScreen } from '../Screen/SearchScreen';
import { AccountScreen } from '../Screen/AccountScreen';
import { SuggestionScreen } from '../Screen/SuggestionScreen';
import { PreferenceScreen } from '../Screen/PreferenceScreen';
import { PlayerScreen } from '../Screen/PlayerScreen';

const { Navigator, Screen } = createBottomTabNavigator();

const SearchIcon = (props) => <Icon {...props} name="search-outline" />;

const SuggestionIcon = (props) => <Icon {...props} name="bulb-outline" />;

const AccountIcon = (props) => <Icon {...props} name="person-outline" />;

const SettingsIcon = (props) => <Icon {...props} name="settings-outline" />;

const PlaylistIcon = (props) => <Icon {...props} name="music-outline" />;

const useBottomNavigationState = (initialState = 1) => {
	const [selectedIndex, setSelectedIndex] = React.useState(initialState);
	return { selectedIndex, onSelect: setSelectedIndex };
};

const BottomTabBar = ({ navigation, state }) => (
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

BottomTabBar.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}).isRequired,
	state: PropTypes.shape({
		index: PropTypes.number,
		routeNames: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
};

export const HomeNavigator = () => (
	<Navigator
		{...useBottomNavigationState()}
		tabBar={(props) => <BottomTabBar {...props} />}
		screenOptions={() => ({headerShown: false})}
	>
		<Screen name="Search" component={SearchScreen} />
		<Screen name="Suggestion" component={SuggestionScreen} />
		<Screen name="Player" component={PlayerScreen} />
		<Screen name="Account" component={AccountScreen} />
		<Screen name="Preference" component={PreferenceScreen} />
	</Navigator>
);
