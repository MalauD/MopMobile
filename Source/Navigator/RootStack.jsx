import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeNavigator from './Home';
import SearchScreen from '../Screen/SearchScreen';

import ArtistScreen from '../Screen/ArtistScreen';
import AlbumScreen from '../Screen/AlbumScreen';

const RootStackNav = createNativeStackNavigator();

export default function RootStack() {
	return (
		<RootStackNav.Navigator screenOptions={{ headerShown: false }}>
			<RootStackNav.Screen name="Main" component={HomeNavigator} />
			<RootStackNav.Screen name="Search" component={SearchScreen} />
			<RootStackNav.Screen name="Artist" component={ArtistScreen} />
			<RootStackNav.Screen name="Album" component={AlbumScreen} />
		</RootStackNav.Navigator>
	);
}
