import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServerIpScreen from '../Screen/ServerIpScreen';
import AuthScreen from '../Screen/AuthScreen';
import TopBar from './TopBar';

const AuthNavigator = createNativeStackNavigator();

export default function AuthStack() {
	return (
		<AuthNavigator.Navigator screenOptions={{ header: () => <TopBar logged={false} /> }}>
			<AuthNavigator.Screen name="ServerIp" component={ServerIpScreen} />
			<AuthNavigator.Screen name="Auth" component={AuthScreen} />
		</AuthNavigator.Navigator>
	);
}
