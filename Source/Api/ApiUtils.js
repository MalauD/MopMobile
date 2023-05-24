import AsyncStorage from '@react-native-async-storage/async-storage';

export async function GetApiAddress() {
	try {
		const value = await AsyncStorage.getItem('MOPServerIP');
		if (value !== null) {
			return value;
		}
		throw Error('No ip stored in local storage');
	} catch (e) {
		console.error(e);
		throw e;
	}
}
