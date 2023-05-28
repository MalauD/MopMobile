import React from 'react';
import Axios from 'axios';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeNavigator } from './Navigator/Home';
import RootReducer from './Reducers/RootReducer';
import ArtistScreen from './Screen/ArtistScreen';
import AlbumScreen from './Screen/AlbumScreen';
import PlayerGuard from './Components/Player/PlayerGuard';

const store = createStore(
	RootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

Axios.defaults.withCredentials = true;

const RootStack = createNativeStackNavigator();

export default function () {
	return (
		<Provider store={store}>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={eva.dark}>
				<PlayerGuard>
					<NavigationContainer>
						<RootStack.Navigator>
							<RootStack.Screen
								options={{ headerShown: false }}
								name="Main"
								component={HomeNavigator}
							/>
							<RootStack.Screen
								options={{ headerShown: false }}
								name="Artist"
								component={ArtistScreen}
							/>
							<RootStack.Screen
								options={{ headerShown: false }}
								name="Album"
								component={AlbumScreen}
							/>
						</RootStack.Navigator>
					</NavigationContainer>
				</PlayerGuard>
			</ApplicationProvider>
		</Provider>
	);
}
