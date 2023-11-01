import React from 'react';
import Axios from 'axios';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootReducer from './Reducers/RootReducer';
import PlayerGuard from './Components/Player/PlayerGuard';
import useAuth from './Hooks/useAuth';
import LoadingLayout from './Components/Tools/LoadingLayout';
import AuthStack from './Navigator/AuthStack';
import Home from './Navigator/Home';

const store = createStore(
	RootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

Axios.defaults.withCredentials = true;

function MainRouter() {
	const { user, loading } = useAuth();

	if (loading) return <LoadingLayout />;

	if (!user) return <AuthStack />;
	return <Home />;
}

export default function App() {
	return (
		<Provider store={store}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<IconRegistry icons={EvaIconsPack} />
				<ApplicationProvider {...eva} theme={eva.dark}>
					<PlayerGuard>
						<NavigationContainer>
							<MainRouter />
						</NavigationContainer>
					</PlayerGuard>
				</ApplicationProvider>
			</GestureHandlerRootView>
		</Provider>
	);
}
